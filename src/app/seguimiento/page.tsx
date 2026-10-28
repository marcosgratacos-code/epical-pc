"use client";

import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import BackButton from "../components/BackButton";
import Link from "next/link";
import { findOrderById, findOrderByTrackingNumber, formatDateForDisplay, getOrderProgressPercentage, getOrderStatusColor, getOrderStatusIcon } from "@/app/lib/orders";
import { Order } from "@/types/order";
import TransportContactModal from "../components/modals/TransportContactModal";
import ContactModal from "../components/modals/ContactModal";
import AddressChangeModal from "../components/modals/AddressChangeModal";
import FAQModal from "../components/modals/FAQModal";

function SeguimientoContent() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const pedidoId = searchParams.get("pedido");

  const [order, setOrder] = useState<Order | null>(null);
  const [numeroRastreo, setNumeroRastreo] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Estados para modales
  const [isTransportModalOpen, setIsTransportModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [isFAQModalOpen, setIsFAQModalOpen] = useState(false);

  useEffect(() => {
    // Si viene un pedido ID, cargar su seguimiento
    if (pedidoId) {
      const foundOrder = findOrderById(pedidoId);
      if (foundOrder) {
        setOrder(foundOrder);
        setNumeroRastreo(foundOrder.numeroSeguimiento);
      } else {
        setError("Pedido no encontrado");
      }
    }
  }, [pedidoId]);

  const buscarPedido = () => {
    if (!numeroRastreo.trim()) return;
    
    setLoading(true);
    setError(null);
    
    // Buscar por número de seguimiento
    const foundOrder = findOrderByTrackingNumber(numeroRastreo.trim());
    
    if (foundOrder) {
      setOrder(foundOrder);
    } else {
      setError("No se encontró ningún pedido con ese número de seguimiento");
    }
    
    setLoading(false);
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="h-20 w-20 rounded-full bg-neutral-900 text-white"></div>
          <p className="text-neutral-500">Cargando seguimiento...</p>
        </div>
      </div>
    );
  }

  // Mostrar mensaje amigable si no hay sesión
  if (!session) {
    return (
      <div className="min-h-screen bg-white text-neutral-900">
        <div className="border-b border-neutral-200 bg-neutral-50">
          <div className="max-w-4xl mx-auto px-4 py-8">
            <BackButton />
            <div className="text-center mt-12">
              <div className="inline-block h-24 w-24 mx-auto mb-6 rounded-full bg-neutral-900 flex items-center justify-center shadow-2xl shadow-orange-500/50 animate-fade-in-scale text-white">
                <svg className="h-12 w-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
              </div>
              <h1 className="text-4xl font-bold mb-4 text-neutral-900">
                Inicia sesión para rastrear envíos
              </h1>
              <p className="text-neutral-500 mb-8 max-w-md mx-auto">
                Crea una cuenta para realizar pedidos y hacer seguimiento de tus envíos en tiempo real.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/auth/signin?callbackUrl=/seguimiento"
                  className="px-8 py-4 rounded-xl bg-neutral-900 text-white font-semibold hover:shadow-lg hover:shadow-black/10 transition-all duration-300"
                >
                  🔓 Iniciar Sesión
                </Link>
                <Link
                  href="/productos"
                  className="px-8 py-4 rounded-xl bg-neutral-50 border border-neutral-200 text-neutral-900 font-semibold hover:bg-neutral-100 transition-all duration-300"
                >
                  🛍️ Ver Productos
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-neutral-900">
      {/* Header */}
      <div className="border-b border-neutral-200 bg-neutral-50">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <BackButton />
          <div className="mt-6">
            <h1 className="text-3xl font-bold text-neutral-900">
              Seguimiento de Envío
            </h1>
            <p className="text-neutral-500 mt-2">
              Rastrea tu pedido en tiempo real
            </p>
          </div>
        </div>
      </div>

      {/* Buscador */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-6 backdrop-blur-sm mb-8">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <span className="text-2xl">🔍</span>
            Buscar por número de seguimiento
          </h2>
          <div className="flex gap-3">
            <input
              type="text"
              value={numeroRastreo}
              onChange={(e) => setNumeroRastreo(e.target.value)}
              placeholder="Ej: ES123456789"
              className="flex-1 px-4 py-3 rounded-xl bg-neutral-50 border border-neutral-200 text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
            />
            <button
              onClick={buscarPedido}
              disabled={loading}
              className="px-6 py-3 rounded-xl bg-neutral-900 text-white font-semibold hover:shadow-lg hover:shadow-black/10 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {loading ? (
                <>
                  <div className="h-4 w-4 border-2 border-neutral-400 border-t-neutral-900 rounded-full animate-spin"></div>
                  Buscando...
                </>
              ) : (
                'Buscar'
              )}
            </button>
          </div>
        </div>

        {/* Mensaje de error */}
        {error && (
          <div className="rounded-2xl border border-red-200 bg-neutral-50 p-6 backdrop-blur-sm mb-8">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center">
                <span className="text-xl">❌</span>
              </div>
              <div>
                <h3 className="font-semibold text-red-700">Error</h3>
                <p className="text-sm text-neutral-500">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Información del pedido */}
        {order && (
          <div className="space-y-6 animate-fade-in-up">
            {/* Resumen */}
            <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-6 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-neutral-900">
                    {order.productos.map(p => p.nombre).join(', ')}
                  </h3>
                  <p className="text-neutral-500 mt-1">
                    Pedido #{order.id}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-neutral-500">Número de seguimiento</p>
                  <p className="text-lg font-mono font-bold text-neutral-900">
                    {order.numeroSeguimiento}
                  </p>
                </div>
              </div>

              {/* Barra de progreso */}
              <div className="relative">
                <div className="h-3 bg-neutral-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-neutral-900 transition-all duration-1000 ease-out relative text-white"
                    style={{
                      width: `${getOrderProgressPercentage(order.estado)}%`,
                    }}
                  >
                    <div className="absolute inset-0 bg-neutral-300 animate-shimmer"></div>
                  </div>
                </div>
                <p className="text-sm text-neutral-500 mt-2 text-center">
                  {getOrderProgressPercentage(order.estado)}% completado
                </p>
              </div>

              {/* Info adicional */}
              <div className="grid md:grid-cols-3 gap-4 mt-6">
                <div className="text-center p-4 rounded-xl bg-neutral-50">
                  <p className="text-neutral-500 text-sm mb-1">Fecha de pedido</p>
                  <p className="font-semibold text-neutral-900">
                    {formatDateForDisplay(order.fecha)}
                  </p>
                </div>
                <div className="text-center p-4 rounded-xl bg-neutral-50">
                  <p className="text-neutral-500 text-sm mb-1">Entrega estimada</p>
                  <p className="font-semibold text-neutral-900">
                    {order.fechaEntregadaEstimada ? formatDateForDisplay(order.fechaEntregadaEstimada) : 'Por confirmar'}
                  </p>
                </div>
                <div className="text-center p-4 rounded-xl bg-neutral-50">
                  <p className="text-neutral-500 text-sm mb-1">Transportista</p>
                  <p className="font-semibold text-neutral-900">
                    {order.transportista || 'Por asignar'}
                  </p>
                </div>
              </div>
            </div>

            {/* Timeline de eventos */}
            <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-6 backdrop-blur-sm">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <span className="text-2xl">📍</span>
                Historial de seguimiento
              </h3>

              <div className="space-y-6">
                {order.eventos.map((evento, idx) => (
                  <div key={evento.id} className="flex gap-4 group">
                    {/* Timeline line */}
                    <div className="flex flex-col items-center">
                      <div
                        className={`h-10 w-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                          evento.completado
                            ? "bg-neutral-900 border-blue-600 shadow-lg shadow-black/10 text-white"
                            : "bg-neutral-100 border-neutral-400"
                        }`}
                      >
                        {evento.completado ? (
                          <svg
                            className="h-5 w-5 text-neutral-900"
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
                        ) : (
                          <div className="h-3 w-3 rounded-full bg-white/50"></div>
                        )}
                      </div>
                      {idx < order.eventos.length - 1 && (
                        <div
                          className={`h-full w-0.5 my-1 ${
                            evento.completado
                              ? "bg-neutral-900 text-white"
                              : "bg-neutral-200"
                          }`}
                          style={{ minHeight: "40px" }}
                        ></div>
                      )}
                    </div>

                    {/* Contenido */}
                    <div
                      className={`flex-1 pb-6 transition-all duration-300 ${
                        evento.completado ? "opacity-100" : "opacity-60"
                      }`}
                    >
                      <div
                        className={`p-4 rounded-xl border transition-all duration-300 ${
                          evento.completado
                            ? "bg-neutral-50 border-neutral-300 group-hover:border-blue-300"
                            : "bg-neutral-50 border-neutral-200"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <h4 className="font-semibold text-neutral-900 text-lg">
                              {evento.descripcion}
                            </h4>
                            <p className="text-sm text-neutral-500 mt-1">
                              📍 {evento.ubicacion}
                            </p>
                            {evento.detalles && (
                              <p className="text-xs text-neutral-500 mt-1">
                                {evento.detalles}
                              </p>
                            )}
                          </div>
                          <p className="text-sm text-neutral-500 whitespace-nowrap">
                            {formatDateForDisplay(evento.fecha)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Acciones */}
            <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-6 backdrop-blur-sm">
              <h3 className="text-lg font-bold mb-4">¿Necesitas ayuda?</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <button 
                  onClick={() => setIsTransportModalOpen(true)}
                  className="px-4 py-3 rounded-xl bg-neutral-50 border border-neutral-200 text-neutral-900 hover:bg-neutral-100 hover:border-neutral-300 transition-all font-medium text-left"
                >
                  📞 Contactar con el transportista
                </button>
                <button 
                  onClick={() => setIsContactModalOpen(true)}
                  className="px-4 py-3 rounded-xl bg-neutral-50 border border-neutral-200 text-neutral-900 hover:bg-neutral-100 hover:border-neutral-300 transition-all font-medium text-left"
                >
                  💬 Hablar con soporte TITAN
                </button>
                <button 
                  onClick={() => setIsAddressModalOpen(true)}
                  className="px-4 py-3 rounded-xl bg-neutral-50 border border-neutral-200 text-neutral-900 hover:bg-neutral-100 hover:border-neutral-300 transition-all font-medium text-left"
                >
                  📋 Modificar dirección de entrega
                </button>
                <button 
                  onClick={() => setIsFAQModalOpen(true)}
                  className="px-4 py-3 rounded-xl bg-neutral-50 border border-neutral-200 text-neutral-900 hover:bg-neutral-100 hover:border-neutral-300 transition-all font-medium text-left"
                >
                  ❓ Preguntas frecuentes
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modales */}
      {order && (
        <>
          <TransportContactModal
            isOpen={isTransportModalOpen}
            onClose={() => setIsTransportModalOpen(false)}
            order={order}
          />
          <ContactModal
            isOpen={isContactModalOpen}
            onClose={() => setIsContactModalOpen(false)}
            order={order}
          />
          <AddressChangeModal
            isOpen={isAddressModalOpen}
            onClose={() => setIsAddressModalOpen(false)}
            order={order}
          />
        </>
      )}
      
      <FAQModal
        isOpen={isFAQModalOpen}
        onClose={() => setIsFAQModalOpen(false)}
      />
    </div>
  );
}

export default function SeguimientoPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="h-20 w-20 rounded-full bg-neutral-900 text-white"></div>
          <p className="text-neutral-500">Cargando...</p>
        </div>
      </div>
    }>
      <SeguimientoContent />
    </Suspense>
  );
}

