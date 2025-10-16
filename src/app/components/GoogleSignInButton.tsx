"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";

export default function GoogleSignInButton() {
  const { data: session, status } = useSession();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Cerrar dropdown al hacer click fuera
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // No mostrar nada mientras carga
  if (status === "loading") {
    return (
      <div className="h-10 w-10 rounded-full bg-white/10 animate-pulse"></div>
    );
  }

  if (session) {
    const userInitial = session.user?.name?.charAt(0) || session.user?.email?.charAt(0) || "U";
    const userName = session.user?.name || session.user?.email?.split('@')[0] || "Usuario";
    const userEmail = session.user?.email || "";
    const userImage = session.user?.image;

    return (
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="group flex items-center gap-2 rounded-xl border border-white/20 px-3 py-1.5 text-sm hover:border-violet-400/50 focus:outline-none focus:ring-2 focus:ring-violet-400 transition-all duration-300 hover:shadow-lg hover:shadow-violet-500/20 bg-gradient-to-br from-white/5 to-transparent hover:from-violet-500/10 hover:to-cyan-500/10"
        >
          {/* Avatar con imagen o inicial */}
          <div className="relative h-7 w-7 rounded-full overflow-hidden ring-2 ring-white/20 group-hover:ring-violet-400/50 transition-all duration-300">
            {userImage ? (
              <img 
                src={userImage} 
                alt={userName}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="h-full w-full bg-gradient-to-br from-cyan-400 via-blue-500 to-violet-500 flex items-center justify-center text-xs font-bold text-white">
                {userInitial}
              </div>
            )}
          </div>
          
          {/* Nombre (solo desktop) */}
          <span className="hidden md:inline text-sm font-medium text-white/80 group-hover:text-white transition-colors max-w-[120px] truncate">
            {userName}
          </span>
          
          {/* Icono flecha con animación */}
          <svg 
            className={`h-4 w-4 text-white/60 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {/* Dropdown Menu Premium */}
        {isDropdownOpen && (
          <div className="absolute right-0 top-full mt-2 w-72 rounded-2xl border border-white/10 bg-gradient-to-b from-black/98 to-black/95 backdrop-blur-xl py-2 shadow-2xl shadow-violet-500/10 z-50 overflow-hidden animate-slideDown">
            {/* Header del usuario */}
            <div className="px-4 py-3 border-b border-white/10 bg-gradient-to-br from-violet-500/10 to-cyan-500/10">
              <div className="flex items-center gap-3">
                {userImage ? (
                  <img 
                    src={userImage} 
                    alt={userName}
                    className="h-12 w-12 rounded-full ring-2 ring-violet-400/50"
                  />
                ) : (
                  <div className="h-12 w-12 rounded-full bg-gradient-to-br from-cyan-400 via-blue-500 to-violet-500 flex items-center justify-center text-lg font-bold text-white ring-2 ring-violet-400/50">
                    {userInitial}
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-white truncate">{userName}</p>
                  <p className="text-xs text-white/50 truncate">{userEmail}</p>
                </div>
              </div>
            </div>

            {/* Opciones del menú */}
            <div className="py-2">
              <Link
                href="/perfil"
                onClick={() => setIsDropdownOpen(false)}
                className="group flex items-center gap-3 w-full px-4 py-2.5 text-left text-sm text-white hover:bg-gradient-to-r hover:from-violet-500/20 hover:to-cyan-500/20 focus:outline-none transition-all duration-200"
              >
                <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-violet-500/20 to-violet-500/10 flex items-center justify-center group-hover:from-violet-500/30 group-hover:to-violet-500/20 transition-all">
                  <span className="text-lg">👤</span>
                </div>
                <div className="flex-1">
                  <p className="font-medium">Mi Perfil</p>
                  <p className="text-xs text-white/50">Gestiona tu cuenta</p>
                </div>
                <svg className="h-4 w-4 text-white/30 group-hover:text-white/60 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              
              <Link
                href="/pedidos"
                onClick={() => setIsDropdownOpen(false)}
                className="group flex items-center gap-3 w-full px-4 py-2.5 text-left text-sm text-white hover:bg-gradient-to-r hover:from-cyan-500/20 hover:to-blue-500/20 focus:outline-none transition-all duration-200"
              >
                <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-cyan-500/20 to-cyan-500/10 flex items-center justify-center group-hover:from-cyan-500/30 group-hover:to-cyan-500/20 transition-all">
                  <span className="text-lg">🛒</span>
                </div>
                <div className="flex-1">
                  <p className="font-medium">Mis Pedidos</p>
                  <p className="text-xs text-white/50">Historial de compras</p>
                </div>
                <svg className="h-4 w-4 text-white/30 group-hover:text-white/60 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              
              <Link
                href="/seguimiento"
                onClick={() => setIsDropdownOpen(false)}
                className="group flex items-center gap-3 w-full px-4 py-2.5 text-left text-sm text-white hover:bg-gradient-to-r hover:from-blue-500/20 hover:to-purple-500/20 focus:outline-none transition-all duration-200"
              >
                <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-blue-500/20 to-blue-500/10 flex items-center justify-center group-hover:from-blue-500/30 group-hover:to-blue-500/20 transition-all">
                  <span className="text-lg">📦</span>
                </div>
                <div className="flex-1">
                  <p className="font-medium">Seguimiento</p>
                  <p className="text-xs text-white/50">Rastrea tus envíos</p>
                </div>
                <svg className="h-4 w-4 text-white/30 group-hover:text-white/60 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
            
            <hr className="my-2 border-white/10" />
            
            {/* Logout button */}
            <div className="px-2 pb-2">
              <button
                onClick={() => {
                  setIsDropdownOpen(false);
                  signOut();
                }}
                className="group flex items-center gap-3 w-full px-4 py-2.5 rounded-lg text-left text-sm text-red-400 hover:bg-red-500/10 focus:outline-none transition-all duration-200 hover:shadow-lg hover:shadow-red-500/20"
              >
                <div className="h-9 w-9 rounded-lg bg-red-500/10 flex items-center justify-center group-hover:bg-red-500/20 transition-all">
                  <span className="text-lg">🚪</span>
                </div>
                <p className="font-medium">Cerrar Sesión</p>
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Botón de login mejorado
  return (
    <Link
      href="/auth/signin"
      className="group flex items-center gap-2 rounded-xl border border-white/20 px-4 py-2 text-sm font-semibold text-white hover:border-violet-400/50 focus:outline-none focus:ring-2 focus:ring-violet-400 transition-all duration-300 hover:shadow-lg hover:shadow-violet-500/20 bg-gradient-to-br from-white/5 to-transparent hover:from-violet-500/10 hover:to-cyan-500/10"
    >
      <div className="relative h-6 w-6 rounded-full bg-gradient-to-br from-cyan-400 via-blue-500 to-violet-500 flex items-center justify-center ring-2 ring-white/20 group-hover:ring-violet-400/50 transition-all">
        <svg 
          className="h-3.5 w-3.5 text-white" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" 
          />
        </svg>
      </div>
      <span className="hidden md:inline text-white/80 group-hover:text-white transition-colors">
        Iniciar sesión
      </span>
      <svg 
        className="h-4 w-4 text-white/60 group-hover:text-white transition-colors hidden sm:inline" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M9 5l7 7-7 7" 
        />
      </svg>
    </Link>
  );
}

