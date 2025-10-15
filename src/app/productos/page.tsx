"use client";

import { PRODUCTS, type Product } from "../lib/products";
import ProductCard from "../components/ProductCard";
import Link from "next/link";
import { useRef, useState } from "react";
import { useCart } from "../context/cart-context";

// Opciones válidas de GPU centralizadas
type GPU = "all" | "5060" | "5070" | "5080";
const OPTIONS: { value: GPU; label: string }[] = [
  { value: "all", label: "Todas" },
  { value: "5060", label: "RTX 5060" },
  { value: "5070", label: "RTX 5070" },
  { value: "5080", label: "RTX 5080" },
];

// Filtra productos por GPU
function hasGPU(p: Product, gpu: string) {
  if (gpu === "all") return true;
  return p.specs.some((s) => s.toLowerCase().includes(gpu));
}

export default function ProductosPage() {
  const { add } = useCart();
  
  // Estado para filtros y búsqueda
  const [q, setQ] = useState("");
  const [gpu, setGpu] = useState<GPU>("all");
  const [price, setPrice] = useState<[number, number]>([0, 3000]);
  const [sortBy, setSortBy] = useState<"name" | "price" | "rating">("name");
  const searchRef = useRef<HTMLInputElement>(null);

  // Toast para confirmaciones
  const [toast, setToast] = useState<{ show: boolean; msg: string }>({ show: false, msg: "" });

  // Filtrar y ordenar productos
  const filtered = PRODUCTS.filter((p: Product) => {
    const matchesQ =
      !q ||
      p.name.toLowerCase().includes(q.toLowerCase()) ||
      p.specs.join(" ").toLowerCase().includes(q.toLowerCase());
    const matchesGpu = hasGPU(p, gpu);
    const matchesPrice = p.price >= price[0] && p.price <= price[1];
    return matchesQ && matchesGpu && matchesPrice;
  }).sort((a, b) => {
    switch (sortBy) {
      case "price":
        return a.price - b.price;
      case "rating":
        return (b.rating || 0) - (a.rating || 0);
      case "name":
      default:
        return a.name.localeCompare(b.name);
    }
  });

  // Función para añadir al carrito
  const handleAdd = (id: string) => {
    add(id);
    const prod = PRODUCTS.find((p: Product) => p.id === id);
    setToast({ show: true, msg: `${prod?.name ?? "Producto"} añadido al carrito` });
    setTimeout(() => setToast({ show: false, msg: "" }), 2000);
  };

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Header de la página */}
      <section className="mx-auto max-w-7xl p-6">
        <div className="mb-8">
          <nav className="mb-4 text-sm text-white/60">
            <Link href="/" className="hover:text-white">Inicio</Link>
            <span className="mx-2">/</span>
            <span className="text-white">Productos</span>
          </nav>
          
          <h1 className="text-4xl font-bold mb-2">
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 bg-clip-text text-transparent">
              Montajes EPICAL-PC
            </span>
          </h1>
          <p className="text-white/70 text-lg">
            PCs personalizados de alto rendimiento con validación térmica y montaje profesional
          </p>
        </div>

        {/* Filtros y búsqueda */}
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 mb-8">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {/* Búsqueda */}
            <div className="lg:col-span-2">
              <label htmlFor="search" className="block text-sm font-medium text-white/80 mb-2">
                Buscar productos
              </label>
              <input
                id="search"
                ref={searchRef}
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Busca por nombre, GPU, RAM, CPU..."
                className="w-full rounded-xl border border-white/10 bg-black px-4 py-3 outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-400/20"
              />
            </div>

            {/* Filtro GPU */}
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">GPU</label>
              <select
                className="w-full rounded-xl border border-white/10 bg-black px-4 py-3 focus:border-violet-400 focus:ring-2 focus:ring-violet-400/20"
                value={gpu}
                onChange={(e) => setGpu(e.target.value as GPU)}
              >
                {OPTIONS.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>

            {/* Ordenar */}
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">Ordenar por</label>
              <select
                className="w-full rounded-xl border border-white/10 bg-black px-4 py-3 focus:border-violet-400 focus:ring-2 focus:ring-violet-400/20"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as "name" | "price" | "rating")}
              >
                <option value="name">Nombre</option>
                <option value="price">Precio</option>
                <option value="rating">Valoración</option>
              </select>
            </div>
          </div>

          {/* Filtros de precio */}
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">Precio mínimo</label>
              <input
                type="number"
                min={0}
                value={price[0]}
                onChange={(e) => setPrice([Number(e.target.value || 0), price[1]])}
                className="w-full rounded-xl border border-white/10 bg-black px-4 py-3 focus:border-violet-400 focus:ring-2 focus:ring-violet-400/20"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">Precio máximo</label>
              <input
                type="number"
                min={price[0]}
                value={price[1]}
                onChange={(e) => setPrice([price[0], Number(e.target.value || 0)])}
                className="w-full rounded-xl border border-white/10 bg-black px-4 py-3 focus:border-violet-400 focus:ring-2 focus:ring-violet-400/20"
              />
            </div>
            <div className="flex items-end">
              <button
                onClick={() => {
                  setQ("");
                  setGpu("all");
                  setPrice([0, 3000]);
                  setSortBy("name");
                  searchRef.current?.focus();
                }}
                className="w-full rounded-xl border border-white/20 px-4 py-3 text-sm font-medium hover:border-white/40 hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-violet-400"
              >
                Limpiar filtros
              </button>
            </div>
          </div>

          {/* Resultados */}
          <div className="mt-4 text-sm text-white/60">
            {filtered.length} producto{filtered.length !== 1 ? "s" : ""} encontrado{filtered.length !== 1 ? "s" : ""}
          </div>
        </div>

        {/* Grid de productos */}
        {filtered.length === 0 ? (
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-12 text-center">
            <div className="text-white/60 mb-4">
              <svg className="mx-auto h-16 w-16 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <h3 className="text-xl font-semibold mb-2">No se encontraron productos</h3>
              <p>Prueba ajustando los filtros de búsqueda</p>
            </div>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((p: Product) => (
              <ProductCard key={p.id} p={p} onAdd={handleAdd} />
            ))}
          </div>
        )}

        {/* CTA adicional */}
        <section className="mt-16 rounded-2xl border border-white/10 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-violet-500/10 p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">¿No encuentras lo que buscas?</h3>
          <p className="text-white/70 mb-6">
            Crea tu PC personalizado con nuestros componentes de última generación
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/pc-a-medida"
              className="rounded-xl bg-white px-6 py-3 font-semibold text-black hover:bg-white/90 focus:outline-none focus:ring-2 focus:ring-violet-400"
            >
              PC a medida
            </Link>
            <a
              href="mailto:epicalpc@gmail.com?subject=Consulta%20PC%20personalizado"
              className="rounded-xl border border-white/20 px-6 py-3 font-semibold hover:border-white/40 focus:outline-none focus:ring-2 focus:ring-violet-400"
            >
              Contactar
            </a>
          </div>
        </section>
      </section>

      {/* Toast de confirmación */}
      {toast.show && (
        <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-xl border border-white/20 bg-black/90 px-6 py-3 text-sm backdrop-blur">
          {toast.msg}
        </div>
      )}
    </main>
  );
}
