
"use client";
// Opciones válidas de GPU centralizadas
type GPU = "all" | "5060" | "5070" | "5080";
const OPTIONS: { value: GPU; label: string }[] = [
  { value: "all", label: "Todas" },
  { value: "5060", label: "RTX 5060" },
  { value: "5070", label: "RTX 5070" },
  { value: "5080", label: "RTX 5080" },
];

import { PRODUCTS, type Product } from "./lib/products";
import ProductCard from "./components/ProductCard";
// Filtra productos por GPU
function hasGPU(p: Product, gpu: string) {
  if (gpu === "all") return true;
  return p.specs.some((s) => s.toLowerCase().includes(gpu));
}
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { useCart } from "./context/cart-context";
//
/* =========================
   Carrito (Drawer mejorado)
   ========================= */
/* =========================
   Página
   ========================= */
export default function Page() {
  const { add } = useCart();
  // toast
  const [toast, setToast] = useState<{ show: boolean; msg: string }>({ show: false, msg: "" });
  // filtros + búsqueda
  const [q, setQ] = useState("");
  const [gpu, setGpu] = useState<GPU>("all");
  const [price, setPrice] = useState<[number, number]>([0, 3000]);
  const searchRef = useRef<HTMLInputElement>(null);

  // Atajos
  // (mantener solo los atajos relevantes, sin lógica de carrito local)
  // ...

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  const filtered = PRODUCTS.filter((p: Product) => {
    const matchesQ =
      !q ||
      p.name.toLowerCase().includes(q.toLowerCase()) ||
      p.specs.join(" ").toLowerCase().includes(q.toLowerCase());
    const matchesGpu = hasGPU(p, gpu);
    const matchesPrice = p.price >= price[0] && p.price <= price[1];
    return matchesQ && matchesGpu && matchesPrice;
  });

  // Nueva función para añadir al carrito usando el contexto global
  const handleAdd = (id: string) => {
    add(id);
    const prod = PRODUCTS.find((p: Product) => p.id === id);
    setToast({ show: true, msg: `${prod?.name ?? "Producto"} añadido` });
    setTimeout(() => setToast({ show: false, msg: "" }), 1200);
  };

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Promo con TRES colores */}
      <div className="w-full bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-violet-500/20 border-b border-white/10">
        <div className="mx-auto max-w-7xl p-2 text-center text-sm">
          <b>-5% Epical Weeks</b> con cupón <b>EQW</b> · Envío 24/48h · 3 años de garantía
        </div>
      </div>





      {/* Hero */}
      <section id="hero" className="relative mx-auto grid max-w-7xl items-center gap-6 p-6 md:grid-cols-2">
        <div>
          <p className="inline rounded-full border border-white/10 px-3 py-1 text-xs text-white/80">Nuevo · Serie EPICAL 2025</p>
          <h1 className="mt-3 text-4xl font-extrabold leading-tight md:text-5xl">
            Potencia extrema, <span className="text-white/70">diseño impecable</span>
            <br />
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 bg-clip-text text-transparent">
              PCs personalizados que hacen historia
            </span>
          </h1>
          <p className="mt-4 text-white/70">
            Montajes de alto rendimiento con validación térmica, control acústico y perfiles XMP/EXPO probados.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <button
              onClick={() => scrollTo("productos")}
              className="rounded-xl bg-white px-4 py-2 font-semibold text-black hover:bg-white/90 focus:outline-none focus:ring-2 focus:ring-violet-400"
            >
              Ver montajes
            </button>
            <Link
              href="/pc-a-medida"
              className="rounded-xl border border-white/20 px-4 py-2 font-semibold hover:border-white/40 focus:outline-none focus:ring-2 focus:ring-violet-400"
            >
              PC a medida
            </Link>
          </div>

          <ul className="mt-6 grid grid-cols-2 gap-3 text-sm text-white/70 md:grid-cols-3">
            {["3 años de garantía","Envío 24/48h","Montaje y test incluidos","Soporte WhatsApp","Devolución 30 días","Pago a plazos"].map((t) => (
              <li key={t} className="rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2">{t}</li>
            ))}
          </ul>
        </div>

        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-white/10">
          <Image src="/epical_hero_setup.jpg" alt="EPICAL-PC Hero" fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover opacity-90" priority />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(56,189,248,0.15),transparent_40%),radial-gradient(circle_at_80%_60%,rgba(139,92,246,0.15),transparent_35%)]" />
        </div>
      </section>

      {/* Categorías rápidas */}
      <section className="mx-auto max-w-7xl p-6">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { t: "PC Gaming", d: "240 FPS en eSports" },
            { t: "Packs Gaming", d: "PC + periféricos" },
            { t: "PC Edición", d: "Premiere, Blender" },
            { t: "PC Oficina", d: "Silenciosos y fiables" },
          ].map((c) => (
            <button
              key={c.t}
              onClick={() => scrollTo("productos")}
              className="rounded-2xl border border-white/10 bg-gradient-to-tr from-white/[0.04] to-white/[0.02] p-4 text-left hover:border-white/20 focus:outline-none focus:ring-2 focus:ring-violet-400"
            >
              <div className="text-sm text-white/60">{c.d}</div>
              <div className="mt-1 text-lg font-semibold">{c.t}</div>
            </button>
          ))}
        </div>
      </section>

      {/* Buscador + filtros */}
      <section className="mx-auto max-w-7xl p-6">
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div className="flex-1">
              <label htmlFor="search" className="block text-xs text-white/60">Buscar (atajo / )</label>
              <input
                id="search"
                ref={searchRef}
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Busca por nombre, GPU, RAM…"
                className="mt-1 w-full rounded-xl border border-white/10 bg-black px-3 py-2 outline-none focus:border-violet-400"
              />
            </div>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
              <div>
                <label className="block text-xs text-white/60">GPU</label>
                <select
                  className="mt-1 w-full rounded-xl border border-white/10 bg-black px-3 py-2 focus:border-violet-400"
                  value={gpu}
                  onChange={(e) => setGpu(e.target.value as GPU)}
                >
                  {OPTIONS.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs text-white/60">Precio mín.</label>
                <input
                  type="number"
                  min={0}
                  value={price[0]}
                  onChange={(e) => setPrice([Number(e.target.value || 0), price[1]])}
                  className="mt-1 w-full rounded-xl border border-white/10 bg-black px-3 py-2 focus:border-violet-400"
                />
              </div>
              <div>
                <label className="block text-xs text-white/60">Precio máx.</label>
                <input
                  type="number"
                  min={price[0]}
                  value={price[1]}
                  onChange={(e) => setPrice([price[0], Number(e.target.value || 0)])}
                  className="mt-1 w-full rounded-xl border border-white/10 bg-black px-3 py-2 focus:border-violet-400"
                />
              </div>
            </div>
          </div>
          <div className="mt-3 text-xs text-white/60">
            {filtered.length} resultado{filtered.length !== 1 ? "s" : ""} · Pulsa <kbd className="rounded border border-white/20 px-1">c</kbd> carrito · <kbd className="rounded border border-white/20 px-1">m</kbd> a medida
          </div>
        </div>
      </section>

      {/* Productos */}
      <section id="productos" className="mx-auto max-w-7xl p-6">
        <h2 className="mb-4 text-xl font-semibold text-white/90">Montajes destacados</h2>
        {filtered.length === 0 ? (
          <div className="rounded-2xl border border-white/10 p-6 text-white/70">No hay resultados con esos filtros.</div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((p: Product) => (
              <ProductCard key={p.id} p={p} onAdd={handleAdd} />
            ))}
          </div>
        )}
      </section>

      {/* Ventajas */}
      <section id="ventajas" className="mx-auto max-w-7xl p-6">
        <h2 className="mb-4 text-xl font-semibold text-white/90">Por qué EPICAL-PC</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {[
            { t: "Validación térmica real", d: "Stress de CPU/GPU, logging de temperaturas y curva de ventiladores optimizada." },
            { t: "Silencio y estabilidad", d: "Montaje limpio, control de vibraciones y perfiles PWM probados." },
            { t: "Listo para jugar/crear", d: "Windows activado, drivers, BIOS y perfiles XMP/EXPO aplicados." },
          ].map((v) => (
            <div key={v.t} className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-sm">
              <div className="mb-1 font-semibold">{v.t}</div>
              <div className="text-white/70">{v.d}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Opiniones */}
      <section id="opiniones" className="mx-auto max-w-7xl p-6">
        <h2 className="mb-4 text-xl font-semibold text-white/90">Qué dicen</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {[
            { n: "Alex G.", t: "Streaming y gaming brutal. Silencio total. 10/10" },
            { n: "Sara R.", t: "Montaje perfecto y soporte por WhatsApp al minuto." },
            { n: "Javi M.", t: "Mi 7800X3D a 4800MT. Vuela. Repetiré para mi estudio." },
          ].map((o) => (
            <div key={o.n} className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-sm">
              <div className="mb-1 font-semibold">{o.n}</div>
              <div className="text-white/70">{o.t}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section id="cta" className="mx-auto max-w-7xl p-6 pb-16">
        <div className="rounded-2xl border border-white/10 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-violet-500/10 p-6 text-center">
          <h3 className="text-2xl font-bold">¿Listo para tu EPICAL-PC?</h3>
          <p className="mt-2 text-white/70">Escríbenos por WhatsApp o pide tu PC a medida ahora.</p>
          <div className="mt-4 flex flex-wrap justify-center gap-3">
            <a href="https://wa.me/34XXXXXXXXX" target="_blank" rel="noreferrer" className="rounded-xl bg-white px-5 py-2 font-semibold text-black hover:bg-white/90">WhatsApp</a>
            <Link href="/pc-a-medida" className="rounded-xl border border-white/20 px-5 py-2 font-semibold hover:border-white/40">PC a medida</Link>
            <a href="mailto:epicalpc@gmail.com?subject=Quiero%20mi%20EPICAL-PC" className="rounded-xl border border-white/20 px-5 py-2 font-semibold hover:border-white/40">Email</a>
          </div>
        </div>
      </section>

      {/* Toast de confirmación */}
      {toast.show && (
        <div className="fixed bottom-20 left-1/2 z-50 -translate-x-1/2 rounded-xl border border-white/20 bg-black/90 px-4 py-2 text-sm backdrop-blur">
          {toast.msg}
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-white/10 py-8 text-center text-xs text-white/50">
        © {new Date().getFullYear()} Epical-PC · Aviso legal · Privacidad · Cookies
      </footer>
    </main>
  );
}
