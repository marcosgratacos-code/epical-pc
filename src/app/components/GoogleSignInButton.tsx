"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";

export default function GoogleSignInButton({ light = false }: { light?: boolean }) {
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
      <div className={`h-10 w-10 rounded-full animate-pulse ${light ? "bg-neutral-100" : "bg-neutral-100"}`}></div>
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
          className={
            light
              ? "group flex items-center gap-2 rounded-full border border-neutral-200 px-3 py-1.5 text-sm text-neutral-900 hover:bg-neutral-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 transition-colors"
              : "group flex items-center gap-2 rounded-xl border border-neutral-300 px-3 py-1.5 text-sm hover:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all duration-300 hover:shadow-lg hover:shadow-black/10 bg-neutral-50"
          }
        >
          {/* Avatar con imagen o inicial */}
          <div className="relative h-7 w-7 rounded-full overflow-hidden ring-2 ring-neutral-300 group-hover:ring-blue-300 transition-all duration-300">
            {userImage ? (
              <img 
                src={userImage} 
                alt={userName}
                className="h-full w-full object-cover"
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="h-full w-full bg-neutral-900 flex items-center justify-center text-xs font-bold text-white">
                {userInitial}
              </div>
            )}
          </div>
          
          {/* Nombre (solo desktop) */}
          <span className={`hidden md:inline text-sm font-medium transition-colors max-w-[120px] truncate ${light ? "text-neutral-700" : "text-neutral-700 group-hover:text-neutral-900"}`}>
            {userName}
          </span>
          
          {/* Icono flecha con animación */}
          <svg 
            className={`h-4 w-4 transition-transform duration-300 ${light ? "text-neutral-400" : "text-neutral-500"} ${isDropdownOpen ? 'rotate-180' : ''}`}
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {/* Dropdown Menu Premium */}
        {isDropdownOpen && (
          <div className="absolute right-0 top-full mt-2 w-72 rounded-2xl border border-neutral-200 bg-white backdrop-blur-xl py-2 shadow-2xl shadow-black/10 z-50 overflow-hidden animate-fade-in-up">
            {/* Header del usuario */}
            <div className="px-4 py-4 border-b border-neutral-200 bg-neutral-50 backdrop-blur-sm">
              <div className="flex items-center gap-3">
                {userImage ? (
                  <img 
                    src={userImage} 
                    alt={userName}
                    className="h-12 w-12 rounded-full ring-2 ring-blue-300 shadow-lg shadow-black/10"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="h-12 w-12 rounded-full bg-neutral-900 flex items-center justify-center text-lg font-bold text-white ring-2 ring-blue-300 shadow-lg shadow-black/10">
                    {userInitial}
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-neutral-900 truncate">{userName}</p>
                  <p className="text-xs text-neutral-500 truncate">{userEmail}</p>
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
                className="group flex items-center gap-3 w-full px-4 py-3 text-left text-sm text-neutral-900 focus:outline-none transition-all duration-300 hover:shadow-lg hover:shadow-black/10 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-neutral-50 transition-all duration-300"></div>
                <div className="h-10 w-10 rounded-xl bg-neutral-50 flex items-center justify-center transition-all duration-300 group-hover:scale-105 shadow-lg shadow-black/10">
                  <svg className="h-5 w-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div className="flex-1 relative z-10">
                  <p className="font-semibold group-hover:text-blue-600 transition-colors">Mi Perfil</p>
                  <p className="text-xs text-neutral-500 group-hover:text-neutral-600 transition-colors">Gestiona tu cuenta</p>
                </div>
                <svg className="h-4 w-4 text-neutral-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              
              <Link
                href="/pedidos"
                onClick={() => setIsDropdownOpen(false)}
                className="group flex items-center gap-3 w-full px-4 py-3 text-left text-sm text-neutral-900 focus:outline-none transition-all duration-300 hover:shadow-lg hover:shadow-black/10 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-neutral-50 transition-all duration-300"></div>
                <div className="h-10 w-10 rounded-xl bg-neutral-50 flex items-center justify-center transition-all duration-300 group-hover:scale-105 shadow-lg shadow-black/10">
                  <svg className="h-5 w-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                </div>
                <div className="flex-1 relative z-10">
                  <p className="font-semibold group-hover:text-blue-600 transition-colors">Mis Pedidos</p>
                  <p className="text-xs text-neutral-500 group-hover:text-neutral-600 transition-colors">Historial de compras</p>
                </div>
                <svg className="h-4 w-4 text-neutral-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              
              <Link
                href="/seguimiento"
                onClick={() => setIsDropdownOpen(false)}
                className="group flex items-center gap-3 w-full px-4 py-3 text-left text-sm text-neutral-900 focus:outline-none transition-all duration-300 hover:shadow-lg hover:shadow-black/10 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-neutral-50 transition-all duration-300"></div>
                <div className="h-10 w-10 rounded-xl bg-neutral-50 flex items-center justify-center transition-all duration-300 group-hover:scale-105 shadow-lg shadow-black/10">
                  <svg className="h-5 w-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                  </svg>
                </div>
                <div className="flex-1 relative z-10">
                  <p className="font-semibold group-hover:text-blue-600 transition-colors">Seguimiento</p>
                  <p className="text-xs text-neutral-500 group-hover:text-neutral-600 transition-colors">Rastrea tus envíos</p>
                </div>
                <svg className="h-4 w-4 text-neutral-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>

              {/* Botón Admin - Solo para marcosgratacos@gmail.com */}
              {userEmail === "marcosgratacos@gmail.com" && (
                <Link
                  href="/admin"
                  onClick={() => setIsDropdownOpen(false)}
                  className="group flex items-center gap-3 w-full px-4 py-3 text-left text-sm text-neutral-900 focus:outline-none transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/10 relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-neutral-50 transition-all duration-300"></div>
                  <div className="h-10 w-10 rounded-xl bg-neutral-50 flex items-center justify-center transition-all duration-300 group-hover:scale-105 shadow-lg shadow-amber-500/20">
                    <svg className="h-5 w-5 text-amber-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div className="flex-1 relative z-10">
                    <p className="font-semibold group-hover:text-amber-700 transition-colors">Panel Admin</p>
                    <p className="text-xs text-neutral-500 group-hover:text-neutral-600 transition-colors">Gestión del sitio</p>
                  </div>
                  <svg className="h-4 w-4 text-neutral-400 group-hover:text-amber-700 group-hover:translate-x-1 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              )}
            </div>
            
            <hr className="my-2 border-neutral-200" />
            
            {/* Separador mejorado */}
            <div className="mx-4 my-3 h-px bg-neutral-50"></div>
            
            {/* Logout button */}
            <div className="px-2 pb-2">
              <button
                onClick={() => {
                  setIsDropdownOpen(false);
                  signOut();
                }}
                className="group flex items-center gap-3 w-full px-4 py-3 rounded-xl text-left text-sm text-red-700 focus:outline-none transition-all duration-300 hover:shadow-lg hover:shadow-red-500/20 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-neutral-50 transition-all duration-300"></div>
                <div className="h-10 w-10 rounded-xl bg-red-100 flex items-center justify-center group-hover:bg-red-100 group-hover:scale-105 transition-all duration-300 shadow-lg shadow-red-500/20">
                  <svg className="h-5 w-5 text-red-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                </div>
                <p className="font-semibold group-hover:text-red-700 transition-colors relative z-10">Cerrar Sesión</p>
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  if (light) {
    return (
      <Link
        href="/auth/signin"
        className="inline-flex h-10 items-center gap-2 whitespace-nowrap rounded-full bg-neutral-900 px-3 text-sm font-medium text-white hover:bg-neutral-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 transition-colors sm:px-4"
        aria-label="Iniciar sesión"
      >
        <svg className="h-[18px] w-[18px] sm:hidden" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
        <span className="hidden sm:inline">Iniciar sesión</span>
      </Link>
    );
  }

  // Botón de login mejorado
  return (
    <Link
      href="/auth/signin"
      className="group flex items-center gap-2 rounded-xl border border-neutral-300 px-4 py-2 text-sm font-semibold text-neutral-900 hover:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all duration-300 hover:shadow-lg hover:shadow-black/10 bg-neutral-50"
    >
      <div className="relative h-6 w-6 rounded-full bg-neutral-900 flex items-center justify-center ring-2 ring-neutral-300 group-hover:ring-blue-300 transition-all text-white">
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
      <span className="hidden md:inline text-neutral-700 group-hover:text-neutral-900 transition-colors">
        Iniciar sesión
      </span>
      <svg 
        className="h-4 w-4 text-neutral-500 group-hover:text-neutral-900 transition-colors hidden sm:inline" 
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

