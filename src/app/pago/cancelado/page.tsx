"use client";

import Link from "next/link";
import BackButton from "@/app/components/BackButton";

export default function PagoCanceladoPage() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <BackButton />
        
        {/* Animación de cancelación */}
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
                  strokeWidth={3}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-orange-400 via-red-500 to-pink-400 bg-clip-text text-transparent animate-fade-in-up">
            Pago Cancelado
          </h1>
          
          <p className="text-xl text-white/70 mb-2 animate-fade-in-up-delay-1">
            Has cancelado el proceso de pago
          </p>
          
          <p className="text-sm text-white/50 animate-fade-in-up-delay-2">
            No se ha realizado ningún cargo a tu tarjeta
          </p>
        </div>

        {/* Card de información */}
        <div className="rounded-2xl border border-orange-500/20 bg-gradient-to-br from-orange-500/10 to-transparent p-8 backdrop-blur-sm mb-6 animate-fade-in-up-delay-2">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
            <span className="text-3xl">💭</span>
            ¿Qué ha pasado?
          </h2>

          <div className="space-y-4">
            <div className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/10">
              <div className="h-10 w-10 rounded-full bg-orange-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-xl">🛒</span>
              </div>
              <div>
                <h3 className="font-semibold text-white mb-1">Tu carrito sigue intacto</h3>
                <p className="text-sm text-white/60">
                  Los productos que seleccionaste siguen en tu carrito esperándote. Puedes completar la compra cuando quieras.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/10">
              <div className="h-10 w-10 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-xl">💳</span>
              </div>
              <div>
                <h3 className="font-semibold text-white mb-1">No se realizó ningún cargo</h3>
                <p className="text-sm text-white/60">
                  Tu método de pago no ha sido cargado. El proceso de pago se canceló antes de completarse.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/10">
              <div className="h-10 w-10 rounded-full bg-violet-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-xl">🔒</span>
              </div>
              <div>
                <h3 className="font-semibold text-white mb-1">Tus datos están seguros</h3>
                <p className="text-sm text-white/60">
                  Todos tus datos están protegidos con encriptación de nivel bancario. Puedes intentar el pago de nuevo con confianza.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Razones comunes */}
        <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent p-6 backdrop-blur-sm mb-6 animate-fade-in-up-delay-3">
          <h3 className="text-lg font-bold mb-4">Razones comunes para cancelar:</h3>
          <ul className="space-y-2 text-sm text-white/70">
            <li className="flex items-center gap-2">
              <span className="text-cyan-400">•</span>
              Necesitas revisar los detalles del pedido
            </li>
            <li className="flex items-center gap-2">
              <span className="text-cyan-400">•</span>
              Prefieres usar otro método de pago
            </li>
            <li className="flex items-center gap-2">
              <span className="text-cyan-400">•</span>
              Quieres añadir más productos al carrito
            </li>
            <li className="flex items-center gap-2">
              <span className="text-cyan-400">•</span>
              Necesitas consultar con alguien antes de comprar
            </li>
          </ul>
        </div>

        {/* Acciones */}
        <div className="grid md:grid-cols-2 gap-4 animate-fade-in-up-delay-3">
          <button
            onClick={() => {
              // Abrir el carrito
              window.dispatchEvent(new CustomEvent("openCart"));
            }}
            className="px-6 py-4 rounded-xl bg-gradient-to-r from-violet-500 to-cyan-500 text-white font-semibold text-center hover:shadow-lg hover:shadow-violet-500/50 transition-all duration-300 flex items-center justify-center gap-2"
          >
            <span>🛒</span>
            Intentar de nuevo
          </button>
          
          <Link
            href="/productos"
            className="px-6 py-4 rounded-xl bg-white/5 border border-white/10 text-white font-semibold text-center hover:bg-white/10 hover:border-white/20 transition-all duration-300 flex items-center justify-center gap-2"
          >
            <span>🛍️</span>
            Seguir comprando
          </Link>
        </div>

        <Link
          href="/"
          className="block mt-4 px-6 py-4 rounded-xl bg-white/5 border border-white/10 text-white font-semibold text-center hover:bg-white/10 hover:border-white/20 transition-all duration-300 animate-fade-in-up-delay-3"
        >
          <span>🏠</span> Volver al inicio
        </Link>

        {/* Nota de soporte */}
        <div className="mt-8 p-6 rounded-xl bg-white/5 border border-white/10 text-center animate-fade-in-up-delay-3">
          <p className="text-sm text-white/60 mb-2">
            ¿Tuviste algún problema durante el pago?
          </p>
          <a
            href="mailto:epicalpc@gmail.com?subject=Problema%20con%20el%20pago"
            className="text-cyan-400 hover:text-cyan-300 underline text-sm"
          >
            Contáctanos y te ayudamos →
          </a>
        </div>
      </div>
    </div>
  );
}

