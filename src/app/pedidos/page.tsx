"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import BackButton from "../components/BackButton";
import Link from "next/link";

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
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [filtroEstado, setFiltroEstado] = useState<string>("todos");

  // Ya no redirigimos automáticamente

  useEffect(() => {
    // Cargar pedidos del localStorage o API
    const pedidosGuardados = localStorage.getItem("userOrders");
    if (pedidosGuardados) {
      setPedidos(JSON.parse(pedidosGuardados));
    } else {
      // Pedidos de ejemplo
      const pedidosEjemplo: Pedido[] = [
        {
          id: "EP-2025-001",
          fecha: "2025-01-15",
          total: 2300,
          estado: "entregado",
          numeroSeguimiento: "ES123456789",
          productos: [
            {
              nombre: "EPICAL ADVANCED",
              cantidad: 1,
              precio: 2300,
              imagen: "/logo-sin-fondo.png",
            },
          ],
        },
        {
          id: "EP-2025-002",
          fecha: "2025-02-10",
          total: 900,
          estado: "enviado",
          numeroSeguimiento: "ES987654321",
          productos: [
            {
              nombre: "EPICAL STARTER",
              cantidad: 1,
              precio: 900,
              imagen: "/epical_hero_setup.jpg",
            },
          ],
        },
      ];
      setPedidos(pedidosEjemplo);
    }
  }, []);

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="h-20 w-20 rounded-full bg-gradient-to-br from-cyan-400 via-blue-500 to-violet-500"></div>
          <p className="text-white/60">Cargando pedidos...</p>
        </div>
      </div>
    );
  }

  // Mostrar mensaje amigable si no hay sesión
  if (!session) {
    return (
      <div className="min-h-screen bg-black text-white">
        <div className="border-b border-white/10 bg-gradient-to-br from-cyan-500/10 to-blue-500/10">
          <div className="max-w-4xl mx-auto px-4 py-8">
            <BackButton />
            <div className="text-center mt-12">
              <div className="inline-block h-24 w-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center shadow-2xl shadow-orange-500/50 animate-fade-in-scale">
                <svg className="h-12 w-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-orange-400 via-red-500 to-pink-400 bg-clip-text text-transparent">
                Inicia sesión para ver tus pedidos
              </h1>
              <p className="text-white/60 mb-8 max-w-md mx-auto">
                Crea una cuenta para realizar compras y ver el historial de tus pedidos.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/auth/signin?callbackUrl=/pedidos"
                  className="px-8 py-4 rounded-xl bg-gradient-to-r from-violet-500 to-cyan-500 text-white font-semibold hover:shadow-lg hover:shadow-violet-500/50 transition-all duration-300"
                >
                  🔓 Iniciar Sesión
                </Link>
                <Link
                  href="/productos"
                  className="px-8 py-4 rounded-xl bg-white/5 border border-white/10 text-white font-semibold hover:bg-white/10 transition-all duration-300"
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

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case "entregado":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      case "enviado":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "procesando":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "pendiente":
        return "bg-orange-500/20 text-orange-400 border-orange-500/30";
      case "cancelado":
        return "bg-red-500/20 text-red-400 border-red-500/30";
      default:
        return "bg-white/20 text-white border-white/30";
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
      : pedidos.filter((p) => p.estado === filtroEstado);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="border-b border-white/10 bg-gradient-to-br from-cyan-500/10 to-blue-500/10">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <BackButton />
          <div className="flex items-center justify-between mt-6">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 bg-clip-text text-transparent">
                Mis Pedidos
              </h1>
              <p className="text-white/60 mt-2">
                Gestiona y rastrea todos tus pedidos
              </p>
            </div>

            {/* Resumen rápido */}
            <div className="hidden md:flex gap-4">
              <div className="text-center px-6 py-3 rounded-xl bg-white/5 border border-white/10">
                <p className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  {pedidos.length}
                </p>
                <p className="text-xs text-white/50">Total Pedidos</p>
              </div>
              <div className="text-center px-6 py-3 rounded-xl bg-white/5 border border-white/10">
                <p className="text-2xl font-bold bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
                  {pedidos.filter((p) => p.estado === "entregado").length}
                </p>
                <p className="text-xs text-white/50">Entregados</p>
              </div>
              <div className="text-center px-6 py-3 rounded-xl bg-white/5 border border-white/10">
                <p className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                  {pedidos.filter((p) => p.estado === "enviado").length}
                </p>
                <p className="text-xs text-white/50">En Camino</p>
              </div>
            </div>
          </div>

          {/* Filtros */}
          <div className="flex flex-wrap gap-3 mt-6">
            <button
              onClick={() => setFiltroEstado("todos")}
              className={`px-4 py-2 rounded-xl font-medium transition-all ${
                filtroEstado === "todos"
                  ? "bg-gradient-to-r from-violet-500 to-cyan-500 text-white shadow-lg shadow-violet-500/30"
                  : "bg-white/5 border border-white/10 text-white/60 hover:bg-white/10 hover:text-white"
              }`}
            >
              Todos ({pedidos.length})
            </button>
            <button
              onClick={() => setFiltroEstado("entregado")}
              className={`px-4 py-2 rounded-xl font-medium transition-all ${
                filtroEstado === "entregado"
                  ? "bg-green-500/30 text-green-400 border border-green-500/50"
                  : "bg-white/5 border border-white/10 text-white/60 hover:bg-white/10 hover:text-white"
              }`}
            >
              Entregados ({pedidos.filter((p) => p.estado === "entregado").length})
            </button>
            <button
              onClick={() => setFiltroEstado("enviado")}
              className={`px-4 py-2 rounded-xl font-medium transition-all ${
                filtroEstado === "enviado"
                  ? "bg-blue-500/30 text-blue-400 border border-blue-500/50"
                  : "bg-white/5 border border-white/10 text-white/60 hover:bg-white/10 hover:text-white"
              }`}
            >
              En camino ({pedidos.filter((p) => p.estado === "enviado").length})
            </button>
            <button
              onClick={() => setFiltroEstado("procesando")}
              className={`px-4 py-2 rounded-xl font-medium transition-all ${
                filtroEstado === "procesando"
                  ? "bg-yellow-500/30 text-yellow-400 border border-yellow-500/50"
                  : "bg-white/5 border border-white/10 text-white/60 hover:bg-white/10 hover:text-white"
              }`}
            >
              Procesando ({pedidos.filter((p) => p.estado === "procesando").length})
            </button>
          </div>
        </div>
      </div>

      {/* Contenido */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {pedidosFiltrados.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">📦</div>
            <h2 className="text-2xl font-bold text-white/80 mb-2">
              No hay pedidos
            </h2>
            <p className="text-white/50 mb-6">
              {filtroEstado === "todos"
                ? "Aún no has realizado ningún pedido"
                : `No tienes pedidos con estado "${filtroEstado}"`}
            </p>
            <Link
              href="/productos"
              className="inline-block px-6 py-3 rounded-xl bg-gradient-to-r from-violet-500 to-cyan-500 text-white font-semibold hover:shadow-lg hover:shadow-violet-500/50 transition-all duration-300"
            >
              Ver Productos
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {pedidosFiltrados.map((pedido) => (
              <div
                key={pedido.id}
                className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent p-6 backdrop-blur-sm hover:border-white/20 transition-all duration-300 group"
              >
                {/* Header del pedido */}
                <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-white/10">
                  <div>
                    <h3 className="text-xl font-bold text-white">
                      Pedido #{pedido.id}
                    </h3>
                    <p className="text-sm text-white/50">
                      {new Date(pedido.fecha).toLocaleDateString("es-ES", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
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
                    <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-violet-500 bg-clip-text text-transparent">
                      {pedido.total}€
                    </span>
                  </div>
                </div>

                {/* Productos */}
                <div className="py-4 space-y-3">
                  {pedido.productos.map((producto, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-4 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all"
                    >
                      <img
                        src={producto.imagen}
                        alt={producto.nombre}
                        className="h-16 w-16 rounded-lg object-cover ring-2 ring-white/10"
                      />
                      <div className="flex-1">
                        <p className="font-semibold text-white">
                          {producto.nombre}
                        </p>
                        <p className="text-sm text-white/50">
                          Cantidad: {producto.cantidad}
                        </p>
                      </div>
                      <p className="text-lg font-bold text-white">
                        {producto.precio}€
                      </p>
                    </div>
                  ))}
                </div>

                {/* Acciones */}
                <div className="flex flex-wrap gap-3 pt-4 border-t border-white/10">
                  {pedido.numeroSeguimiento && (
                    <Link
                      href={`/seguimiento?pedido=${pedido.id}`}
                      className="flex-1 px-4 py-2 rounded-xl bg-gradient-to-r from-violet-500 to-cyan-500 text-white font-semibold text-center hover:shadow-lg hover:shadow-violet-500/50 transition-all duration-300"
                    >
                      📦 Rastrear Pedido
                    </Link>
                  )}
                  <button className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white/70 hover:bg-white/10 hover:text-white transition-all font-medium">
                    Ver Detalles
                  </button>
                  <button className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white/70 hover:bg-white/10 hover:text-white transition-all font-medium">
                    Descargar Factura
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

