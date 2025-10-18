"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import BackButton from "@/app/components/BackButton";
import { findOrderBySessionId, formatDateOnly } from "@/app/lib/orders";
import { Order } from "@/types/order";
import { useCart } from "@/app/context/cart-context";

function ExitoContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const { clearCart } = useCart();

  useEffect(() => {
    if (sessionId) {
      // Buscar el pedido creado por el webhook
      const foundOrder = findOrderBySessionId(sessionId);
      
      if (foundOrder) {
        setOrder(foundOrder);
        // Limpiar el carrito después del pago exitoso
        clearCart();
      } else {
        // Si no se encuentra el pedido, esperar un poco más
        // (el webhook podría tardar unos segundos)
        setTimeout(() => {
          const retryOrder = findOrderBySessionId(sessionId);
          if (retryOrder) {
            setOrder(retryOrder);
            clearCart();
          }
        }, 2000);
      }
      
      setLoading(false);
    }
  }, [sessionId, clearCart]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="h-20 w-20 rounded-full bg-gradient-to-br from-green-400 to-emerald-500"></div>
          <p className="text-white/60">Cargando información del pedido...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <BackButton />
        
        {/* Animación de éxito */}
        <div className="text-center mb-8 animate-fade-in-scale">
          <div className="inline-block relative">
            <div className="absolute inset-0 bg-green-500/20 blur-3xl animate-soft-pulse"></div>
            <div className="relative h-32 w-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center shadow-2xl shadow-green-500/50">
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
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-green-400 via-emerald-500 to-cyan-400 bg-clip-text text-transparent animate-fade-in-up">
            ¡Pago Completado!
          </h1>
          
          <p className="text-xl text-white/70 mb-2 animate-fade-in-up-delay-1">
            Tu pedido ha sido confirmado con éxito
          </p>
          
          {order && (
            <div className="space-y-2 animate-fade-in-up-delay-2">
              <p className="text-sm text-white/50">
                Número de pedido: <span className="font-mono font-bold text-cyan-400">{order.id}</span>
              </p>
              <p className="text-sm text-white/50">
                Número de seguimiento: <span className="font-mono font-bold text-violet-400">{order.numeroSeguimiento}</span>
              </p>
              <p className="text-sm text-white/50">
                Fecha: <span className="font-semibold text-white">{formatDateOnly(order.fecha)}</span>
              </p>
              <p className="text-sm text-white/50">
                Total: <span className="font-bold text-green-400">{order.total}€</span>
              </p>
            </div>
          )}
        </div>

        {/* Card de información */}
        <div className="rounded-2xl border border-green-500/20 bg-gradient-to-br from-green-500/10 to-transparent p-8 backdrop-blur-sm mb-6 animate-fade-in-up-delay-2">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
            <span className="text-3xl">📦</span>
            ¿Qué sigue ahora?
          </h2>

          <div className="space-y-4">
            <div className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/10">
              <div className="h-10 w-10 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-xl">📧</span>
              </div>
              <div>
                <h3 className="font-semibold text-white mb-1">Confirmación por email</h3>
                <p className="text-sm text-white/60">
                  Te hemos enviado un email con los detalles de tu pedido y el número de seguimiento.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/10">
              <div className="h-10 w-10 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-xl">⚙️</span>
              </div>
              <div>
                <h3 className="font-semibold text-white mb-1">Preparando tu pedido</h3>
                <p className="text-sm text-white/60">
                  Nuestro equipo comenzará a preparar y montar tu PC gaming con componentes de primera calidad.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/10">
              <div className="h-10 w-10 rounded-full bg-violet-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-xl">🚚</span>
              </div>
              <div>
                <h3 className="font-semibold text-white mb-1">Envío en 24-48h</h3>
                <p className="text-sm text-white/60">
                  Una vez montado y validado térmicamente, tu PC será enviado de forma segura. Te notificaremos cuando salga.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/10">
              <div className="h-10 w-10 rounded-full bg-cyan-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-xl">🎮</span>
              </div>
              <div>
                <h3 className="font-semibold text-white mb-1">¡A disfrutar!</h3>
                <p className="text-sm text-white/60">
                  Tu PC llegará listo para enchufar y jugar. Incluye garantía de 3 años y soporte técnico.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Acciones */}
        <div className="grid md:grid-cols-3 gap-4 animate-fade-in-up-delay-3">
          <Link
            href="/pedidos"
            className="px-6 py-4 rounded-xl bg-gradient-to-r from-violet-500 to-cyan-500 text-white font-semibold text-center hover:shadow-lg hover:shadow-violet-500/50 transition-all duration-300 flex items-center justify-center gap-2"
          >
            <span>📋</span>
            Ver Pedidos
          </Link>
          
          {order && (
            <Link
              href={`/seguimiento?pedido=${order.id}`}
              className="px-6 py-4 rounded-xl bg-white/5 border border-white/10 text-white font-semibold text-center hover:bg-white/10 hover:border-white/20 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <span>📦</span>
              Rastrear Pedido
            </Link>
          )}
          
          <Link
            href="/"
            className="px-6 py-4 rounded-xl bg-white/5 border border-white/10 text-white font-semibold text-center hover:bg-white/10 hover:border-white/20 transition-all duration-300 flex items-center justify-center gap-2"
          >
            <span>🏠</span>
            Volver al inicio
          </Link>
        </div>

        {/* Nota de soporte */}
        <div className="mt-8 p-6 rounded-xl bg-white/5 border border-white/10 text-center animate-fade-in-up-delay-3">
          <p className="text-sm text-white/60">
            ¿Necesitas ayuda? Contáctanos en{" "}
            <a
              href="mailto:epicalpc@gmail.com"
              className="text-cyan-400 hover:text-cyan-300 underline"
            >
              epicalpc@gmail.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function PagoExitoPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="h-20 w-20 rounded-full bg-gradient-to-br from-green-400 to-emerald-500"></div>
          <p className="text-white/60">Cargando...</p>
        </div>
      </div>
    }>
      <ExitoContent />
    </Suspense>
  );
}

