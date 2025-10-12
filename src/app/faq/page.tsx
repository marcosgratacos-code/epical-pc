"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

export const metadata = {
  title: "FAQ | EPICAL-PC",
  description:
    "Preguntas frecuentes sobre EPICAL-PC: garantía, envío, montaje, sistemas operativos, devoluciones, soporte y pedidos a medida.",
};

type QA = { q: string; a: string; tag?: string };

const FAQS: QA[] = [
  {
    q: "¿Qué incluye el montaje?",
    a: "Montaje completo, cableado limpio, perfiles XMP/EXPO aplicados, drivers/BIOS al día, validación térmica (stress CPU/GPU) y curvas PWM ajustadas. Entregamos informe con temperaturas y estabilidad.",
    tag: "montaje",
  },
  {
    q: "¿El PC llega listo para usar?",
    a: "Sí. Puedes pedirlo con Windows instalado (opcional) o sin sistema operativo. En ambos casos se entrega con drivers y BIOS verificados.",
    tag: "uso",
  },
  {
    q: "¿Cuál es la garantía?",
    a: "3 años de garantía con recogida y entrega. Si aparece un problema, te atendemos nosotros directamente: diagnóstico, equivalencias por stock y reparación ágil.",
    tag: "garantia",
  },
  {
    q: "¿Cuánto tarda el envío?",
    a: "Normalmente 24/48h laborables tras la validación y pruebas, según stock. Te avisamos si hay alguna espera para que decidas equivalencia o mantener la pieza.",
    tag: "envio",
  },
  {
    q: "¿Puedo pedir un PC a medida?",
    a: "Claro. Rellena un brief rápido y te proponemos 2–3 opciones comparadas (FPS/tiempos) con precio cerrado. Aquí puedes empezar: /pc-a-medida",
    tag: "amedida",
  },
  {
    q: "¿Instaláis Windows?",
    a: "Es opcional. Si quieres, lo entregamos instalado y configurado. Si no, te lo mandamos sin sistema para que lo actives tú. Te dejamos drivers/BIOS listos igualmente.",
    tag: "windows",
  },
  {
    q: "¿Hacéis undervolt o ajustes acústicos?",
    a: "Sí, cuando tiene sentido para tu equipo. Priorizamos estabilidad + temperaturas + silencio y lo documentamos en el informe.",
    tag: "ajustes",
  },
  {
    q: "¿Qué pasa si una pieza no está en stock?",
    a: "Te proponemos equivalencia misma gama/prestaciones o esperar. Nunca cambiamos piezas sin que lo apruebes.",
    tag: "stock",
  },
  {
    q: "¿Admitís devoluciones?",
    a: "Sí, 30 días. El equipo debe devolverse en buen estado y con sus accesorios. Te ayudamos con la logística.",
    tag: "devoluciones",
  },
  {
    q: "¿Cómo funciona el soporte tras la compra?",
    a: "Soporte cercano por email/WhatsApp. Hablas con quien lo montó y probó. Actualizaciones de BIOS/drivers, dudas de rendimiento y ayuda con perfiles.",
    tag: "soporte",
  },
];

const CATEGORIES = [
  { id: "basico", label: "Básico", match: ["montaje", "uso", "windows"] },
  { id: "envio", label: "Envío/Stock", match: ["envio", "stock"] },
  { id: "garantia", label: "Garantía/Devoluciones", match: ["garantia", "devoluciones"] },
  { id: "pro", label: "Ajustes/Soporte", match: ["ajustes", "soporte"] },
  { id: "amedida", label: "PC a medida", match: ["amedida"] },
];

export default function FAQPage() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<string>("all");
  const [open, setOpen] = useState<number | null>(0);

  const list = useMemo(() => {
    const term = q.trim().toLowerCase();
    return FAQS.filter((item) => {
      const byCat =
        cat === "all" ||
        CATEGORIES.find((c) => c.id === cat)?.match?.includes(item.tag ?? "") ||
        (cat === "all" && true);
      const byText =
        !term || item.q.toLowerCase().includes(term) || item.a.toLowerCase().includes(term);
      return byCat && byText;
    });
  }, [q, cat]);

  return (
    <main className="min-h-screen bg-black text-white">
      {/* HERO */}
      <section className="border-b border-white/10 bg-[radial-gradient(80%_120%_at_0%_0%,rgba(56,189,248,.12),transparent),radial-gradient(80%_120%_at_100%_0%,rgba(139,92,246,.12),transparent)]">
        <div className="mx-auto max-w-7xl px-6 py-10">
          <nav className="mb-2 text-xs text-white/60">
            <Link href="/" className="hover:text-white">Inicio</Link>
            <span className="px-2">/</span>
            <span className="text-white">FAQ</span>
          </nav>

          <h1 className="text-4xl font-extrabold leading-tight">Preguntas frecuentes</h1>
          <p className="mt-3 max-w-2xl text-white/80">
            Resolvemos lo típico: garantía, envío, montaje, sistemas, devoluciones y soporte. Si te
            queda alguna duda, contáctanos cuando quieras.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/#productos" className="rounded-xl bg-white px-5 py-2 font-semibold text-black hover:bg-white/90">
              Ver montajes
            </Link>
            <Link href="/pc-a-medida" className="rounded-xl border border-white/20 px-5 py-2 font-semibold hover:border-white/40">
              PC a medida
            </Link>
            <a
              href="mailto:epicalpc@gmail.com?subject=Consulta%20FAQ%20EPICAL-PC"
              className="rounded-xl border border-white/20 px-5 py-2 font-semibold hover:border-white/40"
            >
              Contacto
            </a>
          </div>
        </div>
      </section>

      {/* BUSCADOR + FILTROS */}
      <section className="mx-auto max-w-7xl px-6 py-6">
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
          <div className="grid gap-3 md:grid-cols-[2fr_1fr]">
            <div>
              <label className="block text-xs text-white/60">Buscar</label>
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Escribe garantía, envío, Windows, a medida…"
                className="mt-1 w-full rounded-xl border border-white/10 bg-black px-3 py-2 outline-none focus:border-violet-400"
              />
            </div>
            <div>
              <label className="block text-xs text-white/60">Filtrar por categoría</label>
              <select
                value={cat}
                onChange={(e) => setCat(e.target.value)}
                className="mt-1 w-full rounded-xl border border-white/10 bg-black px-3 py-2 outline-none focus:border-violet-400"
              >
                <option value="all">Todas</option>
                {CATEGORIES.map((c) => (
                  <option key={c.id} value={c.id}>{c.label}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="mt-2 text-xs text-white/60">{list.length} resultado{list.length !== 1 ? "s" : ""}</div>
        </div>
      </section>

      {/* LISTA FAQ (acordeón) */}
      <section className="mx-auto max-w-7xl px-6 pb-16">
        <div className="space-y-3">
          {list.map((item, idx) => {
            const isOpen = open === idx;
            return (
              <div
                key={item.q}
                className="rounded-2xl border border-white/10 bg-white/[0.03]"
              >
                <button
                  className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left"
                  onClick={() => setOpen(isOpen ? null : idx)}
                  aria-expanded={isOpen}
                >
                  <span className="font-semibold">{item.q}</span>
                  <span className="text-white/60">{isOpen ? "–" : "+"}</span>
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 text-white/80">
                    <p>{item.a}</p>
                    {/* CTA contextual */}
                    {item.tag === "amedida" && (
                      <div className="mt-3">
                        <Link href="/pc-a-medida" className="inline-block rounded-xl bg-white px-4 py-2 font-semibold text-black hover:bg-white/90">
                          Pide tu propuesta a medida
                        </Link>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* ayuda extra */}
        <div className="mt-8 rounded-2xl border border-white/10 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-violet-500/10 p-6">
          <h3 className="text-lg font-bold">¿No ves tu duda?</h3>
          <p className="mt-1 text-white/80">
            Escríbenos y te respondemos rápido. Si lo prefieres, te llamamos y te ayudamos a elegir.
          </p>
          <div className="mt-3 flex flex-wrap gap-3">
            <a href="mailto:epicalpc@gmail.com?subject=Duda%20FAQ%20EPICAL-PC" className="rounded-xl border border-white/20 px-5 py-2 font-semibold hover:border-white/40">Email</a>
            <Link href="/pc-a-medida" className="rounded-xl bg-white px-5 py-2 font-semibold text-black hover:bg-white/90">PC a medida</Link>
            <Link href="/#productos" className="rounded-xl border border-white/20 px-5 py-2 font-semibold hover:border-white/40">Ver montajes</Link>
          </div>
        </div>
      </section>

      {/* JSON-LD para SEO (FAQPage) */}
      <script
        type="application/ld+json"
        // Nota: no uses JSON a mano; generamos desde el array
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: FAQS.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          }),
        }}
      />
    </main>
  );
}
