"use client";

import Link from "next/link";
import { useCart } from "../context/cart-context";
import { useWishlist } from "../context/wishlist-context";
import GoogleSignInButton from "./GoogleSignInButton";
import NotificationBell from "./NotificationBell";
import MobileMenu from "./MobileMenu";
import GlobalSearch from "./GlobalSearch";
import SafeCount from "./SafeCount";
import { useState } from "react";

export default function SiteHeader() {
  const { openCart, cart } = useCart();
  const { wishlistCount } = useWishlist();
  const totalItems = Object.values(cart).reduce((a: number, b: number) => a + b, 0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-[100] bg-black/95 backdrop-blur-xl border-b border-white/10">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 gap-4">
          {/* Hamburger Menu - Mobile */}
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg border border-white/20 hover:border-white/40 hover:bg-white/10 transition-all duration-200"
            aria-label="Abrir menú"
          >
            <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          {/* Logo */}
          <Link
            href="/"
            className="text-2xl font-bold focus:outline-none focus:ring-2 focus:ring-violet-400 rounded-md px-1 hover-lift"
            aria-label="Ir al inicio"
          >
            <span className="text-white">EPICAL</span>
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 bg-clip-text text-transparent animate-gradient-shift">
              -PC
            </span>
          </Link>

          {/* Nav - Desktop */}
          <nav className="hidden md:flex gap-4 text-sm text-white/80" aria-label="Navegación principal">
            <Link href="/productos" className="px-2 py-1 hover:text-white transition-colors">
              Productos
            </Link>
            <Link href="/pc-a-medida" className="px-2 py-1 hover:text-white transition-colors">
              Configurar PC
            </Link>
            <Link href="/ventajas" className="px-2 py-1 hover:text-white transition-colors">
              Ventajas
            </Link>
            <Link href="/contacto" className="px-2 py-1 hover:text-white transition-colors">
              Contacto
            </Link>
            <Link href="/faq" className="px-2 py-1 hover:text-white transition-colors">
              FAQ
            </Link>
          </nav>

          {/* Acciones del lado derecho */}
          <div className="flex items-center gap-3">
            {/* Búsqueda */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all duration-200"
              aria-label="Buscar productos"
            >
              <svg className="h-4 w-4 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>

            {/* Usuario */}
            <GoogleSignInButton />

            {/* Notificaciones */}
            <NotificationBell />

            {/* Favoritos */}
            <Link
              href="/favoritos"
              className="rounded-lg border border-white/20 px-3 py-2 text-sm hover:border-white/40 transition-all duration-200 hover:bg-white/5"
              aria-label="Ver favoritos"
            >
              <span className="inline-flex items-center gap-1">
                <span>❤️</span>
                <SafeCount value={wishlistCount} fallback={0} />
              </span>
            </Link>

            {/* Carrito */}
            <Link
              href="/cesta"
              className="rounded-lg border border-white/20 px-3 py-2 text-sm hover:border-white/40 transition-all duration-200 hover:bg-white/5"
              aria-label="Ver cesta"
            >
              <span className="inline-flex items-center gap-1">
                <span>🛒</span>
                <SafeCount value={totalItems} fallback={0} />
              </span>
            </Link>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />

      {/* Global Search */}
      <GlobalSearch isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}