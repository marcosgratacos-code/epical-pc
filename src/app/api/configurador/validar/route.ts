import { NextRequest, NextResponse } from "next/server";
import { evaluate } from "@/lib/configurator";
import { SelectionSchema } from "@/lib/configurator-schema";
import { applyRateLimit, getClientIp, rl_anon_100req_1h } from "@/lib/ratelimit";

export async function POST(req: NextRequest) {
  const rl = await applyRateLimit(`cfg:${getClientIp(req)}`, rl_anon_100req_1h);
  if (!rl.success) return NextResponse.json({ error: "Demasiadas peticiones" }, { status: 429 });
  const parsed = SelectionSchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "Selección no válida" }, { status: 400 });
  return NextResponse.json(evaluate(parsed.data));
}
