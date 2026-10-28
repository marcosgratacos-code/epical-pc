"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function SignInContent() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  const error = searchParams.get("error");

  return (
    <main className="min-h-screen bg-white text-neutral-900 flex items-center justify-center relative overflow-hidden">
      {/* Efectos de fondo */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-100 rounded-full blur-3xl animate-soft-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-100 rounded-full blur-3xl animate-soft-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="max-w-md w-full mx-4 relative z-10">
        {/* Logo animado */}
        <div className="text-center mb-8 animate-fade-in-up">
          <div className="inline-block">
            <h1 className="text-5xl font-bold mb-3">
              <span className="text-neutral-900">TITAN</span>
              <span className="text-neutral-900">
                -PC
              </span>
            </h1>
            <div className="h-1 bg-neutral-900 rounded-full animate-gradient-shift text-white"></div>
          </div>
        </div>

        {/* Card principal */}
        <div className="rounded-2xl border border-neutral-200 bg-neutral-50 backdrop-blur-xl p-8 shadow-2xl shadow-black/10 animate-fade-in-up-delay-1">
          <h2 className="text-2xl font-bold text-center mb-2">
            Bienvenido de vuelta
          </h2>
          
          <p className="text-neutral-500 text-center mb-8">
            Inicia sesión para acceder a tu cuenta
          </p>

          {/* Mensaje de error */}
          {error && (
            <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 animate-fade-in-scale">
              <div className="flex items-center gap-3">
                <span className="text-2xl">⚠️</span>
                <div>
                  <p className="text-sm font-semibold text-red-700">Error al iniciar sesión</p>
                  <p className="text-xs text-red-700 mt-1">
                    {error === "Configuration" 
                      ? "Google OAuth no está configurado correctamente"
                      : "Hubo un problema al iniciar sesión. Inténtalo de nuevo."}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Botón de Google */}
          <button
            onClick={() => signIn("google", { callbackUrl })}
            className="group w-full flex items-center justify-center gap-3 rounded-xl bg-neutral-900 px-6 py-4 text-white font-semibold hover:bg-neutral-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-600 hover:shadow-lg hover:shadow-white/20 hover:scale-[1.02]"
          >
            <svg className="h-6 w-6 transition-transform group-hover:scale-110" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Continuar con Google
          </button>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-neutral-200"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-3 text-neutral-500">O también puedes</span>
            </div>
          </div>

          {/* Botones alternativos */}
          <div className="space-y-3">
            <Link
              href="/productos"
              className="block w-full px-6 py-3 rounded-xl bg-neutral-50 border border-neutral-200 text-neutral-900 text-center font-medium hover:bg-neutral-100 hover:border-neutral-300 transition-all duration-300"
            >
              🛍️ Explorar productos
            </Link>
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-neutral-500 mb-2">
              ¿Todavía no tienes cuenta?
            </p>
            <p className="text-xs text-green-700">
              ✨ Se creará automáticamente al iniciar sesión con Google
            </p>
          </div>

          <p className="text-xs text-neutral-400 text-center mt-6 leading-relaxed">
            Al continuar, aceptas nuestros{" "}
            <a href="#" className="text-blue-600 hover:text-blue-600 underline">
              Términos de Servicio
            </a>{" "}
            y{" "}
            <a href="#" className="text-blue-600 hover:text-blue-600 underline">
              Política de Privacidad
            </a>
          </p>
        </div>

        {/* Beneficios */}
        <div className="mt-8 grid grid-cols-3 gap-4 text-center animate-fade-in-up-delay-2">
          {[
            { 
              icon: "🛒", 
              text: "Carrito guardado",
              desc: "Nunca pierdas tus productos"
            },
            { 
              icon: "📦", 
              text: "Historial",
              desc: "Todos tus pedidos" 
            },
            { 
              icon: "🎁", 
              text: "Ofertas",
              desc: "Descuentos exclusivos" 
            },
          ].map((f, idx) => (
            <div 
              key={f.text} 
              className="group rounded-xl border border-neutral-200 bg-neutral-50 backdrop-blur-sm p-4 hover:border-blue-300 hover:bg-neutral-100 transition-all duration-300 hover:scale-105 cursor-default"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <div className="text-3xl mb-2 group-hover:scale-110 transition-transform duration-300">
                {f.icon}
              </div>
              <div className="text-sm font-semibold text-neutral-900 mb-1">{f.text}</div>
              <div className="text-xs text-neutral-500">{f.desc}</div>
            </div>
          ))}
        </div>

        {/* Link de regreso */}
        <Link
          href="/"
          className="group flex items-center justify-center gap-2 mt-6 text-sm text-neutral-500 hover:text-neutral-900 transition-all duration-300 animate-fade-in-up-delay-3"
        >
          <svg 
            className="h-4 w-4 transition-transform group-hover:-translate-x-1" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Volver al inicio
        </Link>

        {/* Nota de seguridad */}
        <div className="mt-6 p-4 rounded-xl bg-blue-50 border border-blue-200 animate-fade-in-up-delay-3">
          <div className="flex items-center gap-3">
            <div className="text-2xl">🔒</div>
            <div>
              <p className="text-xs font-semibold text-blue-600">100% Seguro</p>
              <p className="text-xs text-blue-600 mt-0.5">
                Tus datos están protegidos con encriptación de nivel bancario
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default function SignIn() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="h-20 w-20 rounded-full bg-neutral-900 text-white"></div>
          <p className="text-neutral-500">Cargando...</p>
        </div>
      </div>
    }>
      <SignInContent />
    </Suspense>
  );
}

