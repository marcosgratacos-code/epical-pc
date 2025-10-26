"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";

export default function GoogleSignInButton() {
  const { data: session, status } = useSession();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Manejo silencioso de errores de autenticación
  useEffect(() => {
    if (status === "unauthenticated") {
      // Usuario no autenticado, esto es normal
      return;
    }
  }, [status]);

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
                referrerPolicy="no-referrer"
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
          <div className="absolute right-0 top-full mt-2 w-72 rounded-2xl border border-white/10 bg-black backdrop-blur-xl py-2 shadow-2xl shadow-violet-500/10 z-50 overflow-hidden animate-fade-in-up">
            {/* Header del usuario */}
            <div className="px-4 py-4 border-b border-white/10 bg-gradient-to-br from-violet-500/15 to-cyan-500/15 backdrop-blur-sm">
              <div className="flex items-center gap-3">
                {userImage ? (
                  <img 
                    src={userImage} 
                    alt={userName}
                    className="h-12 w-12 rounded-full ring-2 ring-violet-400/50 shadow-lg shadow-violet-500/30"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="h-12 w-12 rounded-full bg-gradient-to-br from-cyan-400 via-blue-500 to-violet-500 flex items-center justify-center text-lg font-bold text-white ring-2 ring-violet-400/50 shadow-lg shadow-violet-500/30">
                    {userInitial}
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-white truncate">{userName}</p>
                  <p className="text-xs text-white/60 truncate">{userEmail}</p>
                </div>
                {/* Badge de estado */}
                <div className="h-2 w-2 rounded-full bg-green-400 shadow-lg shadow-green-400/50 animate-pulse"></div>
              </div>
            </div>

            {/* Opciones del menú */}
            <div className="py-2">
              <Link
                href="/perfil"
                onClick={() => setIsDropdownOpen(false)}
                className="group flex items-center gap-3 w-full px-4 py-3 text-left text-sm text-white hover:bg-gradient-to-r hover:from-violet-500/25 hover:to-cyan-500/25 focus:outline-none transition-all duration-300 hover:shadow-lg hover:shadow-violet-500/10 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-violet-500/0 to-cyan-500/0 group-hover:from-violet-500/5 group-hover:to-cyan-500/5 transition-all duration-300"></div>
                <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-violet-500/25 to-violet-500/15 flex items-center justify-center group-hover:from-violet-500/35 group-hover:to-violet-500/25 transition-all duration-300 group-hover:scale-105 shadow-lg shadow-violet-500/20">
                  <svg className="h-5 w-5 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div className="flex-1 relative z-10">
                  <p className="font-semibold group-hover:text-violet-300 transition-colors">Mi Perfil</p>
                  <p className="text-xs text-white/60 group-hover:text-white/70 transition-colors">Gestiona tu cuenta</p>
                </div>
                <svg className="h-4 w-4 text-white/40 group-hover:text-violet-400 group-hover:translate-x-1 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              
              <Link
                href="/pedidos"
                onClick={() => setIsDropdownOpen(false)}
                className="group flex items-center gap-3 w-full px-4 py-3 text-left text-sm text-white hover:bg-gradient-to-r hover:from-cyan-500/25 hover:to-blue-500/25 focus:outline-none transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 to-blue-500/0 group-hover:from-cyan-500/5 group-hover:to-blue-500/5 transition-all duration-300"></div>
                <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-cyan-500/25 to-cyan-500/15 flex items-center justify-center group-hover:from-cyan-500/35 group-hover:to-cyan-500/25 transition-all duration-300 group-hover:scale-105 shadow-lg shadow-cyan-500/20">
                  <svg className="h-5 w-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                </div>
                <div className="flex-1 relative z-10">
                  <p className="font-semibold group-hover:text-cyan-300 transition-colors">Mis Pedidos</p>
                  <p className="text-xs text-white/60 group-hover:text-white/70 transition-colors">Historial de compras</p>
                </div>
                <svg className="h-4 w-4 text-white/40 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              
              <Link
                href="/seguimiento"
                onClick={() => setIsDropdownOpen(false)}
                className="group flex items-center gap-3 w-full px-4 py-3 text-left text-sm text-white hover:bg-gradient-to-r hover:from-blue-500/25 hover:to-purple-500/25 focus:outline-none transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/5 group-hover:to-purple-500/5 transition-all duration-300"></div>
                <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-500/25 to-blue-500/15 flex items-center justify-center group-hover:from-blue-500/35 group-hover:to-blue-500/25 transition-all duration-300 group-hover:scale-105 shadow-lg shadow-blue-500/20">
                  <svg className="h-5 w-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                  </svg>
                </div>
                <div className="flex-1 relative z-10">
                  <p className="font-semibold group-hover:text-blue-300 transition-colors">Seguimiento</p>
                  <p className="text-xs text-white/60 group-hover:text-white/70 transition-colors">Rastrea tus envíos</p>
                </div>
                <svg className="h-4 w-4 text-white/40 group-hover:text-blue-400 group-hover:translate-x-1 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>

              {/* Botón Admin - Solo para marcosgratacos@gmail.com */}
              {userEmail === "marcosgratacos@gmail.com" && (
                <Link
                  href="/admin"
                  onClick={() => setIsDropdownOpen(false)}
                  className="group flex items-center gap-3 w-full px-4 py-3 text-left text-sm text-white hover:bg-gradient-to-r hover:from-amber-500/25 hover:to-orange-500/25 focus:outline-none transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/10 relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-500/0 to-orange-500/0 group-hover:from-amber-500/5 group-hover:to-orange-500/5 transition-all duration-300"></div>
                  <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-amber-500/25 to-amber-500/15 flex items-center justify-center group-hover:from-amber-500/35 group-hover:to-amber-500/25 transition-all duration-300 group-hover:scale-105 shadow-lg shadow-amber-500/20">
                    <svg className="h-5 w-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div className="flex-1 relative z-10">
                    <p className="font-semibold group-hover:text-amber-300 transition-colors">Panel Admin</p>
                    <p className="text-xs text-white/60 group-hover:text-white/70 transition-colors">Gestión del sitio</p>
                  </div>
                  <svg className="h-4 w-4 text-white/40 group-hover:text-amber-400 group-hover:translate-x-1 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              )}
            </div>
            
            <hr className="my-2 border-white/10" />
            
            {/* Separador mejorado */}
            <div className="mx-4 my-3 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
            
            {/* Logout button */}
            <div className="px-2 pb-2">
              <button
                onClick={() => {
                  setIsDropdownOpen(false);
                  signOut();
                }}
                className="group flex items-center gap-3 w-full px-4 py-3 rounded-xl text-left text-sm text-red-400 hover:bg-gradient-to-r hover:from-red-500/20 hover:to-red-600/20 focus:outline-none transition-all duration-300 hover:shadow-lg hover:shadow-red-500/20 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-red-500/0 to-red-600/0 group-hover:from-red-500/10 group-hover:to-red-600/10 transition-all duration-300"></div>
                <div className="h-10 w-10 rounded-xl bg-red-500/15 flex items-center justify-center group-hover:bg-red-500/25 group-hover:scale-105 transition-all duration-300 shadow-lg shadow-red-500/20">
                  <svg className="h-5 w-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                </div>
                <p className="font-semibold group-hover:text-red-300 transition-colors relative z-10">Cerrar Sesión</p>
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

