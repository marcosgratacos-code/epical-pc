
"use client";

import { PRODUCTS, type Product } from "./lib/products";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";


// Opciones válidas de GPU centralizadas
type GPU = "all" | "5060" | "5070" | "5080";
const OPTIONS: { value: GPU; label: string }[] = [
  { value: "all", label: "Todas" },
  { value: "5060", label: "RTX 5060" },
  { value: "5070", label: "RTX 5070" },
  { value: "5080", label: "RTX 5080" },
];

/* =========================
   Utils
   ========================= */
const eur = (n: number) =>
  new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR" }).format(n);

// Solo acepta valores válidos de GPU (case-insensitive)
const hasGPU = (p: Product, gpu: GPU): boolean => {
  if (gpu === "all") return true;
  return p.specs.some((spec: string) => spec.toLowerCase().includes(gpu));
};

/* =========================
   UI: Toast
   ========================= */


/* =========================
   ProductCard
   ========================= */
import Link from "next/link";
function ProductCard({
  p,
  onAdd,
  onInfo,
}: {
  p: Product;
  onAdd: (id: string) => void;
  onInfo: (prod: Product) => void;
}) {
  return (
    <Link
      href={`/products/${p.slug}`}
      className="block group"
      tabIndex={-1}
      aria-label={`Ir a la ficha de ${p.name}`}
      prefetch={false}
    >
      <article
        className="group relative rounded-2xl border border-white/10 bg-white/[0.04] p-4 transition hover:-translate-y-0.5 hover:border-white/20 focus-within:ring-2 focus-within:ring-violet-400"
        aria-label={`Producto: ${p.name}`}
      >
        {p.tag && (
          <span className="absolute left-4 top-4 z-10 rounded-full bg-white text-black text-xs font-bold px-2 py-1">
            {p.tag}
          </span>
        )}

        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl">
          <Image
            src={p.image}
            alt={`Imagen de ${p.name}`}
            fill
            sizes="(min-width: 768px) 33vw, 100vw"
            className="object-contain transition duration-300 group-hover:scale-[1.03]"
          />
        </div>

        <div className="mt-4 flex items-start justify-between gap-3">
          <h3 className="text-lg font-semibold">{p.name}</h3>
          <span className="rounded-lg bg-white/10 px-2 py-1 text-sm">{eur(p.price)}</span>
        </div>

        <div className="mt-1 text-xs text-white/60" aria-label="Valoración y stock">
          ⭐ {(p.rating ?? 4.8).toFixed(1)} · {p.inStock ? "En stock" : "Agotado"}
        </div>

        <ul className="mt-2 space-y-1 text-sm text-white/70">
          {p.specs.map((s: string) => (
            <li key={s}>• {s}</li>
          ))}
        </ul>

        <div className="mt-4 flex gap-2">
          <button
            onClick={e => { e.stopPropagation(); e.preventDefault(); onAdd(p.id); }}
            className="flex-1 rounded-xl bg-white px-4 py-2 text-center font-semibold text-black hover:bg-white/90 disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-violet-400"
            disabled={!p.inStock}
            aria-label={p.inStock ? `Añadir ${p.name} al carrito` : `${p.name} no disponible`}
          >
            {p.inStock ? "Añadir" : "No disponible"}
          </button>
          <button
            onClick={e => { e.stopPropagation(); e.preventDefault(); onInfo(p); }}
            className="flex-1 rounded-xl border border-white/20 px-4 py-2 text-center font-semibold hover:border-white/40 focus:outline-none focus:ring-2 focus:ring-violet-400"
            aria-label={`Ver información de ${p.name}`}
          >
            Info
          </button>
        </div>
      </article>
    </Link>
  );
}

/* =========================
   Carrito (Drawer)
   ========================= */
function CartDrawer({
  open,
  onClose,
  cart,
  setCart,
}: {
  open: boolean;
  onClose: () => void;
  cart: Record<string, number>;
  setCart: React.Dispatch<React.SetStateAction<Record<string, number>>>;
}) {
  const items = useMemo(
    () =>
      Object.entries(cart)
        .map(([id, qty]) => {
          const p = PRODUCTS.find((x: Product) => x.id === id);
          return p ? { ...p, qty } : null;
        })
        .filter(Boolean) as (Product & { qty: number })[],
    [cart]
  );

  const subtotal = useMemo(() => items.reduce((a, it) => a + it.price * it.qty, 0), [items]);

  const inc = (id: string) => setCart((prev) => ({ ...prev, [id]: (prev[id] ?? 0) + 1 }));
  const dec = (id: string) =>
    setCart((prev) => {
      const next = { ...prev };
      if (!next[id]) return prev;
      next[id] = Math.max(0, next[id] - 1);
      if (next[id] === 0) delete next[id];
      return next;
    });
  const remove = (id: string) =>
    setCart((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
  const clear = () => setCart({});

  if (!open) return null;

  return (
    <aside
      className="fixed inset-0 z-50 flex"
      role="dialog"
      aria-modal="true"
      aria-label="Carrito de compra"
      onKeyDown={(e) => e.key === "Escape" && onClose()}
    >
      <div className="w-full bg-black/60" onClick={onClose} aria-hidden />
      <div className="ml-auto h-full w-full max-w-md bg-black border-l border-white/10 p-4 overflow-y-auto">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-lg font-semibold">Tu carrito</h3>
          <button
            onClick={onClose}
            className="rounded-lg border border-white/20 px-3 py-1 text-sm hover:border-white/40 focus:outline-none focus:ring-2 focus:ring-violet-400"
            aria-label="Cerrar carrito"
          >
            Cerrar
          </button>
        </div>

        {items.length === 0 ? (
          <p className="text-white/70">Tu carrito está vacío.</p>
        ) : (
          <ul className="space-y-3">
            {items.map((it) => (
              <li key={it.id} className="flex gap-3 rounded-xl border border-white/10 p-3">
                <div className="relative h-16 w-16 overflow-hidden rounded-lg border border-white/10">
                  <Image src={it.image} alt={`Miniatura de ${it.name}`} fill sizes="64px" className="object-contain" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="truncate font-semibold">{it.name}</p>
                      <p className="text-xs text-white/60">{eur(it.price)}</p>
                    </div>
                    <button
                      onClick={() => remove(it.id)}
                      className="rounded-md border border-white/20 px-2 py-1 text-xs hover:border-white/40 focus:outline-none focus:ring-2 focus:ring-violet-400"
                      aria-label={`Quitar ${it.name} del carrito`}
                    >
                      Quitar
                    </button>
                  </div>

                  <div className="mt-2 flex items-center gap-2">
                    <button
                      onClick={() => dec(it.id)}
                      className="rounded-md border border-white/20 px-2 py-1 hover:border-white/40 focus:outline-none focus:ring-2 focus:ring-violet-400"
                      aria-label={`Disminuir cantidad de ${it.name}`}
                    >
                      −
                    </button>
                    <span aria-live="polite" className="w-6 text-center">
                      {it.qty}
                    </span>
                    <button
                      onClick={() => inc(it.id)}
                      className="rounded-md border border-white/20 px-2 py-1 hover:border-white/40 focus:outline-none focus:ring-2 focus:ring-violet-400"
                      aria-label={`Aumentar cantidad de ${it.name}`}
                    >
                      +
                    </button>

                    <span className="ml-auto text-sm text-white/80">{eur(it.price * it.qty)}</span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-4 border-t border-white/10 pt-4">
          <div className="flex items-center justify-between">
            <span className="text-white/70">Subtotal</span>
            <span className="font-semibold">{eur(subtotal)}</span>
          </div>
          <div className="mt-3 flex gap-2">
            <button
              onClick={clear}
              className="flex-1 rounded-xl border border-white/20 px-4 py-2 font-semibold hover:border-white/40 focus:outline-none focus:ring-2 focus:ring-violet-400"
              aria-label="Vaciar carrito"
            >
              Vaciar
            </button>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                alert("Demo: aquí iría tu checkout.");
              }}
              className="flex-1 rounded-xl bg-white px-4 py-2 text-center font-semibold text-black hover:bg-white/90 focus:outline-none focus:ring-2 focus:ring-violet-400"
              aria-label="Proceder al pago"
            >
              Pagar
            </a>
          </div>
        </div>
      </div>
    </aside>
  );
}

/* =========================
   Página
   ========================= */
export default function Page() {
  // carrito
  const [cart, setCart] = useState<Record<string, number>>({});
  // modales
  const [info, setInfo] = useState<Product | null>(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [customOpen, setCustomOpen] = useState(false); // NUEVO
  // toast
  const [toast, setToast] = useState<{ show: boolean; msg: string }>({ show: false, msg: "" });
  // filtros + búsqueda
  const [q, setQ] = useState("");
  const [gpu, setGpu] = useState<GPU>("all");
  const [price, setPrice] = useState<[number, number]>([0, 3000]);
  const searchRef = useRef<HTMLInputElement>(null);

  // Persistencia carrito
  useEffect(() => {
    try {
      const raw = localStorage.getItem("epical-cart");
      if (raw) setCart(JSON.parse(raw));
    } catch {}
  }, []);
  useEffect(() => {
    try {
      localStorage.setItem("epical-cart", JSON.stringify(cart));
    } catch {}
  }, [cart]);

  // Atajos
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "/") {
        e.preventDefault();
        searchRef.current?.focus();
      }
      if (e.key.toLowerCase() === "c") setCartOpen(true);
      if (e.key.toLowerCase() === "m") setCustomOpen(true); // abrir modal a medida
      if (e.key === "Escape") setCartOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const totalItems = useMemo(() => Object.values(cart).reduce((a, b) => a + b, 0), [cart]);
  const subtotal = useMemo(() => {
    return Object.entries(cart).reduce((acc, [id, qty]) => {
  const prod = PRODUCTS.find((x: Product) => x.id === id);
      return acc + (prod ? prod.price * qty : 0);
    }, 0);
  }, [cart]);

  const add = (id: string) => {
    setCart((prev) => ({ ...prev, [id]: (prev[id] ?? 0) + 1 }));
  const prod = PRODUCTS.find((p: Product) => p.id === id);
    setToast({ show: true, msg: `${prod?.name ?? "Producto"} añadido` });
    setTimeout(() => setToast((t) => ({ ...t, show: false })), 1200);
    setCartOpen(true);
  };

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
            <button
              onClick={() => setCustomOpen(true)}
              className="rounded-xl border border-white/20 px-4 py-2 font-semibold hover:border-white/40 focus:outline-none focus:ring-2 focus:ring-violet-400"
            >
              PC a medida (M)
            </button>
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
              <ProductCard key={p.id} p={p} onAdd={add} onInfo={(prod) => setInfo(prod)} />
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
            <button onClick={() => setCustomOpen(true)} className="rounded-xl border border-white/20 px-5 py-2 font-semibold hover:border-white/40">PC a medida</button>
            <a href="mailto:epicalpc@gmail.com?subject=Quiero%20mi%20EPICAL-PC" className="rounded-xl border border-white/20 px-5 py-2 font-semibold hover:border-white/40">Email</a>
          </div>
        </div>
      </section>

      {/* Footer */}

      <footer className="border-t border-white/10 py-8 text-center text-xs text-white/50">
        © {new Date().getFullYear()} Epical-PC · Aviso legal · Privacidad · Cookies
      </footer>
    </main>
  );
}
