"use client";

import Link from "next/link";
import { useCart } from "../context/cart-context";
import GoogleSignInButton from "./GoogleSignInButton";
import { useState, useRef } from "react";

export default function SiteHeader() {
  const { openCart, cart } = useCart();
  const totalItems = Object.values(cart).reduce((a: number, b: number) => a + b, 0);
  const [isVentajasDropdownOpen, setIsVentajasDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

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
  return (
    <header className="sticky top-0 z-[100] bg-black border-b border-white/10">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
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

               {/* Nav */}
               <nav className="hidden md:flex gap-4 text-sm text-white/80" aria-label="Navegación principal">
                 <Link href="/productos" className="rounded-md px-2 py-1 hover:text-white focus:outline-none focus:ring-2 focus:ring-violet-400 hover-lift">
                   Productos
                 </Link>
                 
                 {/* Ventajas con dropdown */}
                 <div 
                   className="relative" 
                   ref={dropdownRef}
                   onMouseEnter={handleMouseEnter}
                   onMouseLeave={handleMouseLeave}
                 >
                   <button
                     className="rounded-md px-2 py-1 hover:text-white focus:outline-none focus:ring-2 focus:ring-violet-400 flex items-center gap-1"
                   >
                     Ventajas
                     <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                     </svg>
                   </button>
                   
                   {/* Dropdown Menu */}
                   {isVentajasDropdownOpen && (
                     <div 
                       className="absolute top-full left-0 mt-1 w-48 rounded-xl border border-white/10 bg-black/95 backdrop-blur-sm py-2 shadow-lg z-50"
                       onMouseEnter={handleMouseEnter}
                       onMouseLeave={handleMouseLeave}
                     >
                       <Link
                         href="/ventajas"
                         onClick={() => setIsVentajasDropdownOpen(false)}
                         className="block w-full px-4 py-2 text-left text-sm text-white hover:bg-white/10 focus:outline-none focus:bg-white/10"
                       >
                         ✨ Ventajas EPICAL
                       </Link>
                       <Link
                         href="/calculadora-gaming"
                         onClick={() => setIsVentajasDropdownOpen(false)}
                         className="block w-full px-4 py-2 text-left text-sm text-white hover:bg-white/10 focus:outline-none focus:bg-white/10"
                       >
                         🎮 Calculadora Gaming
                       </Link>
                       <Link
                         href="/comparador"
                         onClick={() => setIsVentajasDropdownOpen(false)}
                         className="block w-full px-4 py-2 text-left text-sm text-white hover:bg-white/10 focus:outline-none focus:bg-white/10"
                       >
                         ⚖️ Comparador
                       </Link>
                     </div>
                   )}
                 </div>
                 
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
            className="rounded-xl border border-white/20 px-3 py-1 text-sm hover:border-white/40 hover-lift hover-glow transform hover:scale-105 transition-all duration-200"
            aria-label="Abrir carrito"
          >
            🛒 <b>{totalItems}</b>
          </button>
        </div>
      </div>
    </header>
  );
}
