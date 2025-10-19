"use client";

import Link from "next/link";
import { useCart } from "../context/cart-context";
import { useWishlist } from "../context/wishlist-context";
import GoogleSignInButton from "./GoogleSignInButton";
import NotificationBell from "./NotificationBell";
import MobileMenu from "./MobileMenu";
import GlobalSearch from "./GlobalSearch";
import { useState, useRef, useEffect } from "react";

export default function SiteHeader() {
  const { openCart, cart } = useCart();
  const { wishlistCount } = useWishlist();
  const totalItems = Object.values(cart).reduce((a: number, b: number) => a + b, 0);
  const [isVentajasDropdownOpen, setIsVentajasDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setIsVentajasDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsVentajasDropdownOpen(false);
    }, 150); // 150ms de delay
  };
  if (!isClient) {
    return (
      <header className="sticky top-0 z-[100] bg-black/95 backdrop-blur-xl border-b border-white/10">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 gap-4">
          <div className="text-2xl font-bold text-white">EPICAL-PC</div>
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 bg-white/10 rounded animate-pulse"></div>
            <div className="h-8 w-8 bg-white/10 rounded animate-pulse"></div>
          </div>
        </div>
      </header>
    );
  }

  return (
    <>
      <header className="sticky top-0 z-[100] bg-black/95 backdrop-blur-xl border-b border-white/10">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 gap-4">
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

               {/* Nav - Desktop Simplificado */}
               <nav className="hidden md:flex gap-4 text-sm text-white/80" aria-label="Navegación principal">
                 <Link href="/productos" className="px-2 py-1 hover:text-white">
                   Productos
                 </Link>
                 <Link href="/configurador" className="px-2 py-1 hover:text-white bg-gradient-to-r from-cyan-500/20 to-violet-500/20 border border-cyan-500/30">
                   🛠️ Configurador
                 </Link>
                 
                 {/* Ventajas con dropdown */}
                 <div 
                   className="relative" 
                   ref={dropdownRef}
                   onMouseEnter={handleMouseEnter}
                   onMouseLeave={handleMouseLeave}
                 >
                   <button className="px-2 py-1 hover:text-white flex items-center gap-1">
                     Ventajas
                     <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                     </svg>
                   </button>
                   
                   {/* Dropdown Menu */}
                   {isVentajasDropdownOpen && (
                     <div 
                       className="absolute top-full left-0 mt-1 w-48 border border-white/10 bg-black/95 py-2 z-50"
                       onMouseEnter={handleMouseEnter}
                       onMouseLeave={handleMouseLeave}
                     >
                       <Link
                         href="/ventajas"
                         onClick={() => setIsVentajasDropdownOpen(false)}
                         className="block w-full px-4 py-2 text-left text-sm text-white hover:bg-white/10"
                       >
                         ✨ Ventajas EPICAL
                       </Link>
                       <Link
                         href="/calculadora-gaming"
                         onClick={() => setIsVentajasDropdownOpen(false)}
                         className="block w-full px-4 py-2 text-left text-sm text-white hover:bg-white/10"
                       >
                         🎮 Calculadora Gaming
                       </Link>
                       <Link
                         href="/comparador"
                         onClick={() => setIsVentajasDropdownOpen(false)}
                         className="block w-full px-4 py-2 text-left text-sm text-white hover:bg-white/10"
                       >
                         ⚖️ Comparador
                       </Link>
                     </div>
                   )}
                 </div>
                 
                 <Link href="/pc-a-medida" className="px-2 py-1 hover:text-white">
                   PC a medida
                 </Link>
                 <Link href="/contacto" className="px-2 py-1 hover:text-white">
                   Contacto
                 </Link>
                 <a href="/faq" className="px-2 py-1 hover:text-white">
                   FAQ
                 </a>
               </nav>

          {/* Búsqueda - Desktop Optimizada */}
          <button
            id="global-search-trigger"
            onClick={() => setIsSearchOpen(true)}
            className="hidden lg:flex items-center gap-3 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all duration-200 group flex-1 max-w-md"
            aria-label="Buscar productos"
          >
            <svg className="h-4 w-4 text-white/40 group-hover:text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <span className="text-sm text-white/40 group-hover:text-white/60">Buscar productos...</span>
            <kbd className="ml-auto px-2 py-0.5 text-xs rounded bg-white/10 text-white/40 border border-white/20 group-hover:bg-white/20 group-hover:text-white/60">⌘K</kbd>
          </button>

          {/* Acciones - Desktop Optimizadas */}
          <div className="hidden lg:flex items-center gap-3">
            <GoogleSignInButton />
            <NotificationBell />
            <Link
              href="/favoritos"
              className="rounded-xl border border-white/20 px-4 py-2 text-sm hover:border-white/40 hover-lift hover-glow transform hover:scale-105 transition-all duration-200 relative touch-target hover:bg-white/5"
              aria-label="Ver favoritos"
            >
              ❤️ <b>{wishlistCount}</b>
            </Link>
            <button
              onClick={openCart}
              className="rounded-xl border border-white/20 px-4 py-2 text-sm hover:border-white/40 hover-lift hover-glow transform hover:scale-105 transition-all duration-200 hover:bg-white/5"
              aria-label="Abrir carrito"
            >
              🛒 <b>{totalItems}</b>
            </button>
          </div>

          {/* Acciones - Mobile */}
          <div className="flex md:hidden items-center gap-1">
            {/* Búsqueda móvil */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="rounded-lg border border-white/20 px-2 py-2 text-sm hover:border-white/40 hover-lift hover-glow transition-all duration-200"
              aria-label="Buscar"
            >
              🔍
            </button>
            
            {/* Carrito móvil */}
            <button
              onClick={openCart}
              className="rounded-lg border border-white/20 px-2 py-2 text-sm hover:border-white/40 hover-lift hover-glow transition-all duration-200"
              aria-label="Abrir carrito"
            >
              🛒 <b>{totalItems}</b>
            </button>
            
            {/* Hamburger Menu - Mobile */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="rounded-lg border border-white/20 px-2 py-2 text-sm hover:border-white/40 hover-lift hover-glow transition-all duration-200"
              aria-label="Abrir menú"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
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
