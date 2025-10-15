"use client";

import Link from "next/link";
import { useCart } from "../context/cart-context";
import GoogleSignInButton from "./GoogleSignInButton";

export default function SiteHeader() {
  const { openCart, cart } = useCart();
  const totalItems = Object.values(cart).reduce((a: number, b: number) => a + b, 0);
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
          <Link href="/productos" className="rounded-md px-2 py-1 hover:text-white focus:outline-none focus:ring-2 focus:ring-violet-400">
            Productos
          </Link>
          <Link href="/calculadora-gaming" className="rounded-md px-2 py-1 hover:text-white focus:outline-none focus:ring-2 focus:ring-violet-400">
            Calculadora Gaming
          </Link>
          <Link href="/comparador" className="rounded-md px-2 py-1 hover:text-white focus:outline-none focus:ring-2 focus:ring-violet-400">
            Comparador
          </Link>
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

        {/* Auth + Carrito */}
        <div className="flex items-center gap-2">
          <GoogleSignInButton />
          <button
            onClick={openCart}
            className="rounded-xl border border-white/20 px-3 py-1 text-sm hover:border-white/40"
            aria-label="Abrir carrito"
          >
            🛒 <b>{totalItems}</b>
          </button>
        </div>
      </div>
    </header>
  );
}
