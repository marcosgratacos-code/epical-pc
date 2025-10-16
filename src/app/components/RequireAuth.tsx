"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";

interface RequireAuthProps {
  children: React.ReactNode;
  pageName?: string;
}

export default function RequireAuth({ children, pageName = "esta página" }: RequireAuthProps) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      // Redirigir después de 3 segundos
      const timer = setTimeout(() => {
        router.push(`/auth/signin?callbackUrl=${encodeURIComponent(window.location.pathname)}`);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="h-20 w-20 rounded-full bg-gradient-to-br from-cyan-400 via-blue-500 to-violet-500 animate-spin"></div>
          <p className="text-white/60">Cargando...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center p-4 relative overflow-hidden">
        {/* Efectos de fondo */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl animate-soft-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-red-500/20 rounded-full blur-3xl animate-soft-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="max-w-lg w-full relative z-10">
          {/* Icono de bloqueo */}
          <div className="text-center mb-8 animate-fade-in-scale">
            <div className="inline-block relative">
              <div className="absolute inset-0 bg-orange-500/20 blur-3xl animate-soft-pulse"></div>
              <div className="relative h-32 w-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center shadow-2xl shadow-orange-500/50">
                <svg
                  className="h-16 w-16 text-white animate-fade-in-scale"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
            </div>

            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-orange-400 via-red-500 to-pink-400 bg-clip-text text-transparent animate-fade-in-up">
              Acceso Restringido
            </h1>

            <p className="text-xl text-white/70 mb-2 animate-fade-in-up-delay-1">
              Necesitas iniciar sesión
            </p>

            <p className="text-sm text-white/50 animate-fade-in-up-delay-2">
              Para acceder a {pageName} debes tener una cuenta
            </p>
          </div>

          {/* Card de información */}
          <div className="rounded-2xl border border-orange-500/20 bg-gradient-to-br from-orange-500/10 to-transparent p-8 backdrop-blur-sm mb-6 animate-fade-in-up-delay-2">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-3">
              <span className="text-3xl">🔐</span>
              ¿Por qué necesito iniciar sesión?
            </h2>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="h-8 w-8 rounded-full bg-orange-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-sm">🛡️</span>
                </div>
                <div>
                  <h3 className="font-semibold text-white text-sm">Protección de datos</h3>
                  <p className="text-xs text-white/60 mt-1">
                    Tu información personal y pedidos están seguros en tu cuenta
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="h-8 w-8 rounded-full bg-violet-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-sm">✨</span>
                </div>
                <div>
                  <h3 className="font-semibold text-white text-sm">Experiencia personalizada</h3>
                  <p className="text-xs text-white/60 mt-1">
                    Guarda tus preferencias, favoritos y configuraciones
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="h-8 w-8 rounded-full bg-cyan-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-sm">📦</span>
                </div>
                <div>
                  <h3 className="font-semibold text-white text-sm">Gestión de pedidos</h3>
                  <p className="text-xs text-white/60 mt-1">
                    Accede a tu historial, seguimiento y garantías
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Botones de acción */}
          <div className="space-y-3 animate-fade-in-up-delay-3">
            <Link
              href={`/auth/signin?callbackUrl=${encodeURIComponent(typeof window !== 'undefined' ? window.location.pathname : '/')}`}
              className="block w-full px-6 py-4 rounded-xl bg-gradient-to-r from-violet-500 to-cyan-500 text-white font-semibold text-center hover:shadow-lg hover:shadow-violet-500/50 transition-all duration-300"
            >
              🔓 Iniciar Sesión
            </Link>

            <Link
              href="/"
              className="block w-full px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-medium text-center hover:bg-white/10 hover:border-white/20 transition-all duration-300"
            >
              🏠 Volver al inicio
            </Link>
          </div>

          {/* Contador de redirección */}
          <div className="mt-6 p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 text-center animate-fade-in-up-delay-3">
            <p className="text-xs text-blue-400">
              Serás redirigido automáticamente en 3 segundos...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

