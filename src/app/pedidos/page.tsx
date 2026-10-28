"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import BackButton from "../components/BackButton";
import Link from "next/link";
import { getOrdersFromStorage, calculateOrderStats, getOrderStatusColor, getOrderStatusIcon, formatDateOnly } from "@/app/lib/orders";
import { Order } from "@/types/order";
import OrderDetailsModal from "../components/modals/OrderDetailsModal";
import { generateInvoiceFromOrder } from "@/app/lib/invoice";
import ReviewForm from "../components/ReviewForm";
import { canUserReviewProduct } from "@/app/lib/reviews";

interface Pedido {
  id: string;
  fecha: string;
  total: number;
  estado: "pendiente" | "procesando" | "enviado" | "entregado" | "cancelado";
  productos: {
    nombre: string;
    cantidad: number;
    precio: number;
    imagen: string;
  }[];
  numeroSeguimiento?: string;
}

export default function PedidosPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [pedidos, setPedidos] = useState<Order[]>([]);
  const [filtroEstado, setFiltroEstado] = useState<string>("todos");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [selectedProductForReview, setSelectedProductForReview] = useState<{id: string, name: string} | null>(null);

  useEffect(() => {
    // Cargar pedidos reales del localStorage
    const pedidosReales = getOrdersFromStorage();
    setPedidos(pedidosReales);
  }, []);

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="h-20 w-20 rounded-full bg-neutral-900 text-white"></div>
          <p className="text-neutral-500">Cargando pedidos...</p>
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <h1 className="text-4xl font-bold mb-4 text-neutral-900">
                Inicia sesión para ver tus pedidos
              </h1>
              <p className="text-neutral-500 mb-8 max-w-md mx-auto">
                Crea una cuenta para realizar compras y ver el historial de tus pedidos.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/auth/signin?callbackUrl=/pedidos"
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

  const stats = calculateOrderStats(pedidos);

  const handleViewDetails = (pedido: Order) => {
    setSelectedOrder(pedido);
    setIsDetailsModalOpen(true);
  };

  const handleDownloadInvoice = (pedido: Order) => {
    generateInvoiceFromOrder(pedido);
  };

  const closeDetailsModal = () => {
    setIsDetailsModalOpen(false);
    setSelectedOrder(null);
  };

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case "entregado":
        return "bg-green-100 text-green-700 border-green-200";
      case "enviado":
        return "bg-blue-100 text-blue-600 border-blue-300";
      case "procesando":
        return "bg-yellow-100 text-yellow-400 border-yellow-200";
      case "pendiente":
        return "bg-orange-100 text-orange-700 border-orange-200";
      case "cancelado":
        return "bg-red-100 text-red-700 border-red-200";
      default:
        return "bg-neutral-200 text-neutral-900 border-neutral-400";
    }
  };

  const getEstadoIcon = (estado: string) => {
    switch (estado) {
      case "entregado":
        return "✅";
      case "enviado":
        return "📦";
      case "procesando":
        return "⚙️";
      case "pendiente":
        return "⏳";
      case "cancelado":
        return "❌";
      default:
        return "📋";
    }
  };

  const pedidosFiltrados =
    filtroEstado === "todos"
      ? pedidos
      : filtroEstado === "enviado"
      ? pedidos.filter((p) => ["enviado", "en_reparto"].includes(p.estado))
      : filtroEstado === "procesando"
      ? pedidos.filter((p) => ["confirmado", "preparando"].includes(p.estado))
      : pedidos.filter((p) => p.estado === filtroEstado);

  return (
    <div className="min-h-screen bg-white text-neutral-900">
      {/* Header */}
      <div className="border-b border-neutral-200 bg-neutral-50">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <BackButton />
          <div className="flex items-center justify-between mt-6">
            <div>
              <h1 className="text-3xl font-bold text-neutral-900">
                Mis Pedidos
              </h1>
              <p className="text-neutral-500 mt-2">
                Gestiona y rastrea todos tus pedidos
              </p>
            </div>

            {/* Resumen rápido */}
            <div className="hidden md:flex gap-4">
              {(() => {
                const stats = calculateOrderStats(pedidos);
                return (
                  <>
                    <div className="text-center px-6 py-3 rounded-xl bg-neutral-50 border border-neutral-200">
                      <p className="text-2xl font-bold text-neutral-900">
                        {stats.totalPedidos}
                      </p>
                      <p className="text-xs text-neutral-500">Total Pedidos</p>
                    </div>
                    <div className="text-center px-6 py-3 rounded-xl bg-neutral-50 border border-neutral-200">
                      <p className="text-2xl font-bold text-neutral-900">
                        {stats.entregados}
                      </p>
                      <p className="text-xs text-neutral-500">Entregados</p>
                    </div>
                    <div className="text-center px-6 py-3 rounded-xl bg-neutral-50 border border-neutral-200">
                      <p className="text-2xl font-bold text-neutral-900">
                        {stats.enCamino}
                      </p>
                      <p className="text-xs text-neutral-500">En Camino</p>
                    </div>
                  </>
                );
              })()}
            </div>
          </div>

          {/* Filtros */}
          <div className="flex flex-wrap gap-3 mt-6">
            <button
              onClick={() => setFiltroEstado("todos")}
              className={`px-4 py-2 rounded-xl font-medium transition-all ${
                filtroEstado === "todos"
                  ? "bg-neutral-900 text-white shadow-lg shadow-black/10"
                  : "bg-neutral-50 border border-neutral-200 text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900"
              }`}
            >
              Todos ({pedidos.length})
            </button>
            {(() => {
              const stats = calculateOrderStats(pedidos);
              return (
                <>
                  <button
                    onClick={() => setFiltroEstado("entregado")}
                    className={`px-4 py-2 rounded-xl font-medium transition-all ${
                      filtroEstado === "entregado"
                        ? "bg-green-100 text-green-700 border border-green-300"
                        : "bg-neutral-50 border border-neutral-200 text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900"
                    }`}
                  >
                    Entregados ({stats.entregados})
                  </button>
                  <button
                    onClick={() => setFiltroEstado("enviado")}
                    className={`px-4 py-2 rounded-xl font-medium transition-all ${
                      filtroEstado === "enviado"
                        ? "bg-blue-100 text-blue-600 border border-blue-300"
                        : "bg-neutral-50 border border-neutral-200 text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900"
                    }`}
                  >
                    En camino ({stats.enCamino})
                  </button>
                  <button
                    onClick={() => setFiltroEstado("procesando")}
                    className={`px-4 py-2 rounded-xl font-medium transition-all ${
                      filtroEstado === "procesando"
                        ? "bg-yellow-100 text-yellow-400 border border-yellow-300"
                        : "bg-neutral-50 border border-neutral-200 text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900"
                    }`}
                  >
                    Procesando ({stats.procesando})
                  </button>
                </>
              );
            })()}
          </div>
        </div>
      </div>

      {/* Contenido */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {pedidosFiltrados.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">📦</div>
            <h2 className="text-2xl font-bold text-neutral-700 mb-2">
              No hay pedidos
            </h2>
            <p className="text-neutral-500 mb-6">
              {filtroEstado === "todos"
                ? "Aún no has realizado ningún pedido"
                : `No tienes pedidos con estado "${filtroEstado}"`}
            </p>
            <Link
              href="/productos"
              className="inline-block px-6 py-3 rounded-xl bg-neutral-900 text-white font-semibold hover:shadow-lg hover:shadow-black/10 transition-all duration-300"
            >
              Ver Productos
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {pedidosFiltrados.map((pedido) => (
              <div
                key={pedido.id}
                className="rounded-2xl border border-neutral-200 bg-neutral-50 p-6 backdrop-blur-sm hover:border-neutral-300 transition-all duration-300 group"
              >
                {/* Header del pedido */}
                <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-neutral-200">
                  <div>
                    <h3 className="text-xl font-bold text-neutral-900">
                      Pedido #{pedido.id}
                    </h3>
                    <p className="text-sm text-neutral-500">
                      {formatDateOnly(pedido.fecha)}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <span
                      className={`px-4 py-2 rounded-xl border font-semibold text-sm ${getEstadoColor(
                        pedido.estado
                      )}`}
                    >
                      {getEstadoIcon(pedido.estado)}{" "}
                      {pedido.estado.charAt(0).toUpperCase() +
                        pedido.estado.slice(1)}
                    </span>
                    <span className="text-2xl font-bold text-neutral-900">
                      {pedido.total}€
                    </span>
                  </div>
                </div>

                {/* Productos */}
                <div className="py-4 space-y-3">
                  {pedido.productos.map((producto, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-4 p-3 rounded-xl bg-neutral-50 hover:bg-neutral-100 transition-all"
                    >
                      <img
                        src={producto.imagen}
                        alt={producto.nombre}
                        className="h-16 w-16 rounded-lg object-cover ring-2 ring-neutral-200"
                      />
                      <div className="flex-1">
                        <p className="font-semibold text-neutral-900">
                          {producto.nombre}
                        </p>
                        <p className="text-sm text-neutral-500">
                          Cantidad: {producto.cantidad}
                        </p>
                      </div>
                      <p className="text-lg font-bold text-neutral-900">
                        {producto.precio}€
                      </p>
                    </div>
                  ))}
                </div>

                {/* Acciones */}
                <div className="flex flex-wrap gap-3 pt-4 border-t border-neutral-200">
                  {pedido.numeroSeguimiento && (
                    <Link
                      href={`/seguimiento?pedido=${pedido.id}`}
                      className="flex-1 px-4 py-2 rounded-xl bg-neutral-900 text-white font-semibold text-center hover:shadow-lg hover:shadow-black/10 transition-all duration-300"
                    >
                      📦 Rastrear Pedido
                    </Link>
                  )}
                  <button 
                    onClick={() => handleViewDetails(pedido)}
                    className="px-4 py-2 rounded-xl bg-neutral-50 border border-neutral-200 text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 transition-all font-medium"
                  >
                    Ver Detalles
                  </button>
                  <button 
                    onClick={() => handleDownloadInvoice(pedido)}
                    className="px-4 py-2 rounded-xl bg-neutral-50 border border-neutral-200 text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 transition-all font-medium"
                  >
                    Descargar Factura
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal de detalles */}
      {selectedOrder && (
        <OrderDetailsModal
          isOpen={isDetailsModalOpen}
          onClose={closeDetailsModal}
          order={selectedOrder}
        />
      )}
    </div>
  );
}

