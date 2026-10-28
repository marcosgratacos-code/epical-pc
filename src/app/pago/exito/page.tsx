"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import BackButton from "@/app/components/BackButton";
import Confetti from "@/app/components/Confetti";
import { findOrderBySessionId, formatDateOnly } from "@/app/lib/orders";
import { Order } from "@/types/order";
import { useCart } from "@/app/context/cart-context";

function ExitoContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [showConfetti, setShowConfetti] = useState(false);
  const { clearCart } = useCart();

  useEffect(() => {
    if (sessionId) {
      // Buscar el pedido creado por el webhook
      const foundOrder = findOrderBySessionId(sessionId);
      
      if (foundOrder) {
        setOrder(foundOrder);
        // Limpiar el carrito después del pago exitoso
        clearCart();
        // Activar confetti
        setShowConfetti(true);
      } else {
        // Si no se encuentra el pedido, esperar un poco más
        // (el webhook podría tardar unos segundos)
        setTimeout(() => {
          const retryOrder = findOrderBySessionId(sessionId);
          if (retryOrder) {
            setOrder(retryOrder);
            clearCart();
            setShowConfetti(true);
          }
        }, 2000);
      }
      
      setLoading(false);
    }
  }, [sessionId, clearCart]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white text-neutral-900 flex items-center justify-center p-4">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="h-20 w-20 rounded-full bg-neutral-900 text-white"></div>
          <p className="text-neutral-500">Cargando información del pedido...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Confetti active={showConfetti} duration={5000} />
      <div className="min-h-screen bg-white text-neutral-900 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full">
          <BackButton />
        
        {/* Animación de éxito */}
        <div className="text-center mb-8 animate-fade-in-scale">
          <div className="inline-block relative">
            <div className="absolute inset-0 bg-green-100 blur-3xl animate-soft-pulse"></div>
            <div className="relative h-32 w-32 mx-auto mb-6 rounded-full bg-neutral-900 flex items-center justify-center shadow-2xl shadow-green-500/50 text-white">
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

          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-neutral-900 animate-fade-in-up">
            ¡Pago Completado!
          </h1>
          
          <p className="text-xl text-neutral-600 mb-2 animate-fade-in-up-delay-1">
            Tu pedido ha sido confirmado con éxito
          </p>
          
          {order && (
            <div className="space-y-2 animate-fade-in-up-delay-2">
              <p className="text-sm text-neutral-500">
                Número de pedido: <span className="font-mono font-bold text-blue-600">{order.id}</span>
              </p>
              <p className="text-sm text-neutral-500">
                Número de seguimiento: <span className="font-mono font-bold text-blue-600">{order.numeroSeguimiento}</span>
              </p>
              <p className="text-sm text-neutral-500">
                Fecha: <span className="font-semibold text-neutral-900">{formatDateOnly(order.fecha)}</span>
              </p>
              <p className="text-sm text-neutral-500">
                Total: <span className="font-bold text-green-700">{order.total}€</span>
              </p>
            </div>
          )}
        </div>

        {/* Card de información */}
        <div className="rounded-2xl border border-green-200 bg-neutral-50 p-8 backdrop-blur-sm mb-6 animate-fade-in-up-delay-2">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
            <span className="text-3xl">📦</span>
            ¿Qué sigue ahora?
          </h2>

          <div className="space-y-4">
            <div className="flex items-start gap-4 p-4 rounded-xl bg-neutral-50 border border-neutral-200">
              <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-xl">📧</span>
              </div>
              <div>
                <h3 className="font-semibold text-neutral-900 mb-1">Confirmación por email</h3>
                <p className="text-sm text-neutral-500">
                  Te hemos enviado un email con los detalles de tu pedido y el número de seguimiento.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-xl bg-neutral-50 border border-neutral-200">
              <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-xl">⚙️</span>
              </div>
              <div>
                <h3 className="font-semibold text-neutral-900 mb-1">Preparando tu pedido</h3>
                <p className="text-sm text-neutral-500">
                  Nuestro equipo comenzará a preparar y montar tu PC gaming con componentes de primera calidad.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-xl bg-neutral-50 border border-neutral-200">
              <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-xl">🚚</span>
              </div>
              <div>
                <h3 className="font-semibold text-neutral-900 mb-1">Envío en 24-48h</h3>
                <p className="text-sm text-neutral-500">
                  Una vez montado y validado térmicamente, tu PC será enviado de forma segura. Te notificaremos cuando salga.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-xl bg-neutral-50 border border-neutral-200">
              <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-xl">🎮</span>
              </div>
              <div>
                <h3 className="font-semibold text-neutral-900 mb-1">¡A disfrutar!</h3>
                <p className="text-sm text-neutral-500">
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
            className="px-6 py-4 rounded-xl bg-neutral-900 text-white font-semibold text-center hover:shadow-lg hover:shadow-black/10 transition-all duration-300 flex items-center justify-center gap-2"
          >
            <span>📋</span>
            Ver Pedidos
          </Link>
          
          {order && (
            <Link
              href={`/seguimiento?pedido=${order.id}`}
              className="px-6 py-4 rounded-xl bg-neutral-50 border border-neutral-200 text-neutral-900 font-semibold text-center hover:bg-neutral-100 hover:border-neutral-300 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <span>📦</span>
              Rastrear Pedido
            </Link>
          )}
          
          <Link
            href="/"
            className="px-6 py-4 rounded-xl bg-neutral-50 border border-neutral-200 text-neutral-900 font-semibold text-center hover:bg-neutral-100 hover:border-neutral-300 transition-all duration-300 flex items-center justify-center gap-2"
          >
            <span>🏠</span>
            Volver al inicio
          </Link>
        </div>

        {/* Nota de soporte */}
        <div className="mt-8 p-6 rounded-xl bg-neutral-50 border border-neutral-200 text-center animate-fade-in-up-delay-3">
          <p className="text-sm text-neutral-500">
            ¿Necesitas ayuda? Contáctanos en{" "}
            <a
              href="mailto:epicalpc@gmail.com"
              className="text-blue-600 hover:text-blue-600 underline"
            >
              epicalpc@gmail.com
            </a>
          </p>
        </div>
      </div>
      </div>
    </>
  );
}

export default function PagoExitoPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="h-20 w-20 rounded-full bg-neutral-900 text-white"></div>
          <p className="text-neutral-500">Cargando...</p>
        </div>
      </div>
    }>
      <ExitoContent />
    </Suspense>
  );
}

