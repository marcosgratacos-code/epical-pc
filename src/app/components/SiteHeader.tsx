"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { PRODUCTS } from "../lib/products";

const eur = (n: number) =>
  new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR" }).format(n);

export default function SiteHeader() {
  const [cart, setCart] = useState<Record<string, number>>({});

  // Carga el carrito desde localStorage para mostrar cantidad y subtotal
  useEffect(() => {
    try {
      const raw = localStorage.getItem("epical-cart");
      if (raw) setCart(JSON.parse(raw));
    } catch {}
    // escucha cambios del carrito en otras páginas/pestañas
    const onStorage = () => {
      try {
        const raw = localStorage.getItem("epical-cart");
        if (raw) setCart(JSON.parse(raw));
      } catch {}
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const totalItems = useMemo(() => Object.values(cart).reduce((a, b) => a + b, 0), [cart]);
  const subtotal = useMemo(() => {
    return Object.entries(cart).reduce((acc, [id, qty]) => {
      const prod = PRODUCTS.find((x) => x.id === id);
      return acc + (prod ? prod.price * qty : 0);
    }, 0);
  }, [cart]);

  return (
  <header className="sticky top-0 z-[100] bg-black border-b border-white/10">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-bold focus:outline-none focus:ring-2 focus:ring-violet-400 rounded-md px-1"
          aria-label="Ir al inicio"
        >
          <span className="text-white">EPICAL</span>
          <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 bg-clip-text text-transparent">
            -PC
          </span>
        </Link>

        {/* Nav */}
        <nav className="hidden md:flex gap-4 text-sm text-white/80" aria-label="Navegación principal">
          <Link href="/#productos" className="rounded-md px-2 py-1 hover:text-white focus:outline-none focus:ring-2 focus:ring-violet-400">
            Montajes
          </Link>
          <Link href="/ventajas" className="rounded-md px-2 py-1 hover:text-white focus:outline-none focus:ring-2 focus:ring-violet-400">
            Ventajas
          </Link>
          <Link href="/pc-a-medida" className="rounded-md px-2 py-1 hover:text-white focus:outline-none focus:ring-2 focus:ring-violet-400">
            PC a medida
          </Link>
          <a
            href="mailto:epicalpc@gmail.com?subject=Consulta%20EPICAL-PC"
            className="rounded-md px-2 py-1 hover:text-white focus:outline-none focus:ring-2 focus:ring-violet-400"
          >
            Contacto
          </a>
        </nav>

        {/* CTA + Carrito */}
        <div className="flex items-center gap-2">
          <Link
            href="/pc-a-medida"
            className="rounded-xl bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 px-3 py-1 text-sm font-semibold text-black/90 hover:opacity-90"
          >
            PC a medida
          </Link>

          <div
            className="rounded-xl border border-white/20 px-3 py-1 text-sm text-white hover:border-white/40"
            title="Resumen del carrito"
            aria-label="Resumen del carrito"
          >
            🛒 <b>{totalItems}</b> <span className="text-white/80">· {eur(subtotal)}</span>
          </div>
        </div>
      </div>
    </header>
  );
}
