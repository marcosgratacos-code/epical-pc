import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";
import { evaluate, CATEGORY_LABEL } from "@/lib/configurator";
import { SelectionSchema } from "@/lib/configurator-schema";
import { COMPANY } from "@/lib/company";
import { applyRateLimit, getClientIp, rl_strict_5req_1m } from "@/lib/ratelimit";
import { assertSameOrigin } from "@/lib/security";

const Body = z.object({
  selection: SelectionSchema,
  nombre: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(150),
  telefono: z.string().trim().max(30).optional(),
  notas: z.string().trim().max(1000).optional(),
});

const ENTITIES: Record<string, string> = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ENTITIES[c]);

export async function POST(req: NextRequest) {
  if (!assertSameOrigin(req)) return NextResponse.json({ error: "Origen no permitido" }, { status: 403 });
  const rl = await applyRateLimit(`cfgq:${getClientIp(req)}`, rl_strict_5req_1m);
  if (!rl.success) return NextResponse.json({ error: "Demasiadas peticiones" }, { status: 429 });

  const parsed = Body.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "Datos no válidos" }, { status: 400 });
  const { selection, nombre, email, telefono, notas } = parsed.data;

  // El precio y la compatibilidad se recalculan aquí; nunca se confía en el cliente
  const ev = evaluate(selection);
  if (!ev.ok) {
    return NextResponse.json({ error: "La configuración no es válida", errors: ev.errors, missing: ev.missing }, { status: 422 });
  }

  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json({ error: "El envío automático no está disponible ahora mismo.", fallbackEmail: COMPANY.email }, { status: 503 });
  }

  const leadId = `CFG-${Date.now().toString(36).toUpperCase()}`;
  const rows = ev.lines
    .map((l) => `<tr><td>${esc(CATEGORY_LABEL[l.category])}</td><td>${esc(l.name)}</td><td style="text-align:right">${l.price} €</td></tr>`)
    .join("");
  const html = `<h2>Solicitud de presupuesto ${leadId}</h2>
    <p><b>${esc(nombre)}</b> · ${esc(email)}${telefono ? " · " + esc(telefono) : ""}</p>
    <table cellpadding="6">${rows}</table>
    <p><b>Total componentes (orientativo): ${ev.total} €</b></p>
    ${ev.warnings.length ? `<p>Avisos: ${ev.warnings.map(esc).join(" · ")}</p>` : ""}
    ${notas ? `<p>Notas: ${esc(notas)}</p>` : ""}`;
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const r = await resend.emails.send({
      from: process.env.RESEND_FROM || "TITAN-PC <noreply@titan-pc.com>",
      to: COMPANY.email,
      replyTo: email,
      subject: `Presupuesto ${leadId} · ${nombre}`,
      html,
    });
    if (r.error) throw new Error(r.error.message);
  } catch (e) {
    console.error("Error enviando presupuesto", e);
    return NextResponse.json({ error: "No se pudo enviar la solicitud.", fallbackEmail: COMPANY.email }, { status: 502 });
  }
  return NextResponse.json({ ok: true, leadId, total: ev.total });
}
