"use client";

import Link from "next/link";
import { useState } from "react";
import Gallery from "../components/Gallery";

const eur = (n: number) =>
  new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR" }).format(n);

export default function PCMedidaPage() {
  const [sent, setSent] = useState(false);

  return (
    <main className="min-h-screen bg-black text-white">
      {/* HERO */}
      <section className="border-b border-white/10 bg-[radial-gradient(80%_120%_at_0%_0%,rgba(56,189,248,.12),transparent),radial-gradient(80%_120%_at_100%_0%,rgba(139,92,246,.12),transparent)]">
        <div className="mx-auto max-w-7xl px-6 py-10">
          <nav className="mb-2 text-xs text-white/60">
            <Link href="/" className="hover:text-white">Inicio</Link>
            <span className="px-2">/</span>
            <span className="text-white">PC a medida</span>
          </nav>

          <h1 className="text-4xl font-extrabold leading-tight">
            PC a medida <span className="text-white/70">para lo que tú haces</span>
          </h1>
          <p className="mt-3 max-w-2xl text-white/80">
            Breve express, propuesta comparada y <b>montaje con validación real</b>. Te
            lo entregamos <b>listo, silencioso y estable</b>, con 3 años de garantía y
            precio cerrado.
          </p>

          {/* confianza */}
          <div className="mt-5 flex flex-wrap gap-2 text-xs">
            <span className="inline-flex items-center gap-1 rounded-full border border-white/15 bg-white/[0.04] px-2 py-1">✅ 3 años de garantía</span>
            <span className="inline-flex items-center gap-1 rounded-full border border-white/15 bg-white/[0.04] px-2 py-1">🧪 Validación térmica real</span>
            <span className="inline-flex items-center gap-1 rounded-full border border-white/15 bg-white/[0.04] px-2 py-1">🔇 Curvas PWM silenciosas</span>
            <span className="inline-flex items-center gap-1 rounded-full border border-white/15 bg-white/[0.04] px-2 py-1">🧰 Precio cerrado</span>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/#productos" className="rounded-xl bg-white px-5 py-2 font-semibold text-black hover:bg-white/90">
              Ver montajes
            </Link>
            <a href="#brief" className="rounded-xl border border-white/20 px-5 py-2 font-semibold hover:border-white/40">
              Pedir propuesta
            </a>
          </div>
        </div>
      </section>

      {/* COMPARATIVA */}
      <section className="mx-auto max-w-7xl px-6 py-8">
        <h2 className="mb-4 text-xl font-semibold">Por qué a medida con EPICAL</h2>
        <div className="overflow-x-auto rounded-2xl border border-white/10">
          <table className="min-w-[760px] w-full border-separate border-spacing-0 bg-black text-sm">
            <thead className="bg-white/[0.03] text-left">
              <tr>
                <th className="p-3">Qué te importa</th>
                <th className="p-3">EPICAL-PC (a medida)</th>
                <th className="p-3">PC genérico</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Rendimiento real para TU uso", "✅ Ajuste de CPU/GPU, RAM, caja y flujo de aire según juegos/soft.", "⚠️ Config estándar de catálogo."],
                ["Silencio y temperaturas", "✅ Curvas PWM y reporte de temperaturas sostenidas.", "❌ Sin ajuste acústico ni informe."],
                ["Listo para usar", "✅ BIOS, drivers, Windows (opcional) al día.", "⚠️ Depende del almacén, sin personalización."],
                ["Precio cerrado", "✅ Sin sorpresas; equivalencia si falta stock.", "⚠️ Extras y sustituciones poco claras."],
                ["Soporte cercano", "✅ Hablas con quien lo montó y probó.", "⚠️ Soporte genérico."],
              ].map((r, i) => (
                <tr key={r[0]} className={i % 2 ? "bg-white/[0.02]" : ""}>
                  <td className="p-3 text-white/80">{r[0]}</td>
                  <td className="p-3 font-medium">{r[1]}</td>
                  <td className="p-3 text-white/70">{r[2]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* PROCESO */}
      <section className="mx-auto max-w-7xl px-6 py-6">
        <h2 className="mb-4 text-xl font-semibold">Cómo trabajamos</h2>
        <ol className="grid gap-4 md:grid-cols-3">
          {[
            { t: "1) Brief express", d: "Uso, presupuesto, estética, tamaño y objetivo de ruido." },
            { t: "2) Propuesta cerrada", d: "2–3 opciones con FPS/tiempos y precio final. Pros y contras claros." },
            { t: "3) Montaje + validación", d: "Stress CPU/GPU, curvas PWM, informe de temps/estabilidad." },
          ].map((x) => (
            <li key={x.t} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
              <div className="mb-1 font-semibold">{x.t}</div>
              <p className="text-white/80">{x.d}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* PRESUPUESTOS ORIENTATIVOS */}
      <section className="mx-auto max-w-7xl px-6 py-6">
        <h2 className="mb-4 text-xl font-semibold">¿De cuánto hablamos?</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {[
            { t: "Starter", p: 900, d: "1080p alto • eSports • oficina/estudio." },
            { t: "Advanced", p: 2300, d: "1440p/4K • streaming/edición ágil • silencio." },
            { t: "Ultra", p: 2800, d: "4K alto framerate • VR • proyectos pesados." },
          ].map((c) => (
            <div key={c.t} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
              <div className="mb-1 font-semibold">{c.t}</div>
              <div className="text-2xl font-extrabold">{eur(c.p)}</div>
              <div className="mt-1 text-white/80">{c.d}</div>
            </div>
          ))}
        </div>
        <p className="mt-2 text-xs text-white/50">
          * Son rangos orientativos. Si encuentras una config equivalente más barata, la igualamos o te explicamos la diferencia.
        </p>
      </section>

      {/* MUESTRAS / GALERÍA */}
      <section className="mx-auto max-w-7xl px-6 py-8">
        <Gallery
          title="Muestras reales"
          images={[
            { src: "/cableado-limpio-01.jpg", alt: "Cableado limpio y flujo de aire" },
            { src: "/before-after-cable-management.jpg", alt: "Antes/Después cableado" },
            { src: "/validacion-termica-graph.png", alt: "Validación térmica (gráfico)" },
            { src: "/curvas-pwm-silencio.png", alt: "Curvas PWM silenciosas" },
            { src: "/workbench-assembly.jpg", alt: "Mesa de montaje EPICAL" },
            { src: "/epical-hero-setup.jpg", alt: "Setup EPICAL" },
          ]}
        />
      </section>

      {/* FORMULARIO (brief) */}
      <section id="brief" className="mx-auto max-w-7xl px-6 pb-16">
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          <h2 className="text-xl font-semibold">Cuéntanos lo justo y te mandamos propuesta</h2>
          <p className="mt-1 text-white/70">
            Te enviaremos 2–3 opciones comparadas con rendimiento esperado y precio cerrado.
          </p>

          <form
            className="mt-4 grid gap-3 md:grid-cols-2"
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
              setTimeout(() => setSent(false), 4000);
            }}
          >
            <div className="md:col-span-2">
              <label className="block text-xs text-white/60">Email</label>
              <input
                required
                type="email"
                placeholder="tu@email.com"
                className="mt-1 w-full rounded-xl border border-white/10 bg-black px-3 py-2 outline-none focus:border-violet-400"
              />
            </div>

            <div>
              <label className="block text-xs text-white/60">Presupuesto</label>
              <input
                type="number"
                min={400}
                placeholder="1200"
                className="mt-1 w-full rounded-xl border border-white/10 bg-black px-3 py-2 outline-none focus:border-violet-400"
              />
            </div>

            <div>
              <label className="block text-xs text-white/60">Uso principal</label>
              <select className="mt-1 w-full rounded-xl border border-white/10 bg-black px-3 py-2 focus:border-violet-400">
                <option>Gaming</option>
                <option>Streaming/Edición</option>
                <option>Oficina/Estudio</option>
                <option>Mixto</option>
              </select>
            </div>

            <div>
              <label className="block text-xs text-white/60">Estética</label>
              <select className="mt-1 w-full rounded-xl border border-white/10 bg-black px-3 py-2 focus:border-violet-400">
                <option>RGB</option>
                <option>Minimal (negro)</option>
                <option>Compacto (pequeño)</option>
                <option>Me es indiferente</option>
              </select>
            </div>

            <div>
              <label className="block text-xs text-white/60">Objetivo de ruido</label>
              <select className="mt-1 w-full rounded-xl border border-white/10 bg-black px-3 py-2 focus:border-violet-400">
                <option>Muy silencioso</option>
                <option>Equilibrado</option>
                <option>Me da igual</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs text-white/60">Comentarios</label>
              <textarea
                rows={4}
                placeholder="Juegos/soft que usas, tamaño de caja, puertos, requisitos concretos..."
                className="mt-1 w-full rounded-xl border border-white/10 bg-black px-3 py-2 outline-none focus:border-violet-400"
              />
            </div>

            <div className="md:col-span-2">
              <button className="w-full rounded-xl bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 px-4 py-2 font-semibold text-black/90 hover:opacity-90">
                Quiero mi propuesta
              </button>
              {sent && (
                <div className="mt-2 text-sm text-white/70">
                  ¡Hecho! Te contactaremos en breve con 2–3 opciones. (Demo)
                </div>
              )}
            </div>
          </form>
        </div>
      </section>

      {/* CTA final */}
      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="rounded-2xl border border-white/10 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-violet-500/10 p-6 text-center">
          <h3 className="text-2xl font-bold">¿Listo para tu PC perfecto?</h3>
          <p className="mt-2 text-white/70">Te lo entregamos probado, silencioso y listo para usar.</p>
          <div className="mt-4 flex flex-wrap justify-center gap-3">
            <a href="#brief" className="rounded-xl bg-white px-5 py-2 font-semibold text-black hover:bg-white/90">Pedir propuesta</a>
            <Link href="/#productos" className="rounded-xl border border-white/20 px-5 py-2 font-semibold hover:border-white/40">Ver montajes</Link>
          </div>
        </div>
      </section>

      {/* CTA pegajosa móvil */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-black/80 backdrop-blur md:hidden">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 p-3">
          <div className="text-sm">
            <div className="font-semibold">¿Te ayudamos a elegir?</div>
            <div className="text-white/60">Respuesta rápida y propuesta cerrada</div>
          </div>
          <a href="#brief" className="rounded-xl bg-white px-4 py-2 font-semibold text-black">Pedir propuesta</a>
        </div>
      </div>
    </main>
  );
}
