"use client";

import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import BackButton from "../components/BackButton";
import Link from "next/link";

interface Seguimiento {
  pedidoId: string;
  numeroSeguimiento: string;
  producto: string;
  estado: "confirmado" | "preparando" | "enviado" | "en_reparto" | "entregado";
  fechaPedido: string;
  fechaEntregadaEstimada: string;
  transportista: string;
  eventos: {
    fecha: string;
    descripcion: string;
    ubicacion: string;
    completado: boolean;
  }[];
}

function SeguimientoContent() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const pedidoId = searchParams.get("pedido");

  const [seguimiento, setSeguimiento] = useState<Seguimiento | null>(null);
  const [numeroRastreo, setNumeroRastreo] = useState("");

  // Ya no redirigimos automáticamente

  useEffect(() => {
    // Si viene un pedido ID, cargar su seguimiento
    if (pedidoId) {
      // Simular datos de seguimiento
      const seguimientoEjemplo: Seguimiento = {
        pedidoId: pedidoId,
        numeroSeguimiento: "ES987654321",
        producto: "EPICAL STARTER",
        estado: "en_reparto",
        fechaPedido: "2025-02-10",
        fechaEntregadaEstimada: "2025-02-16",
        transportista: "SEUR",
        eventos: [
          {
            fecha: "2025-02-10 10:30",
            descripcion: "Pedido confirmado",
            ubicacion: "Madrid, España",
            completado: true,
          },
          {
            fecha: "2025-02-11 14:20",
            descripcion: "En preparación",
            ubicacion: "Centro logístico EPICAL",
            completado: true,
          },
          {
            fecha: "2025-02-12 09:15",
            descripcion: "Enviado",
            ubicacion: "Madrid, España",
            completado: true,
          },
          {
            fecha: "2025-02-15 08:45",
            descripcion: "En reparto",
            ubicacion: "Centro de distribución local",
            completado: true,
          },
          {
            fecha: "Estimado: 2025-02-16",
            descripcion: "Entregado",
            ubicacion: "Tu dirección",
            completado: false,
          },
        ],
      };
      setSeguimiento(seguimientoEjemplo);
      setNumeroRastreo(seguimientoEjemplo.numeroSeguimiento);
    }
  }, [pedidoId]);

  const buscarPedido = () => {
    if (!numeroRastreo) return;

    // Simular búsqueda
    const seguimientoEjemplo: Seguimiento = {
      pedidoId: "EP-2025-002",
      numeroSeguimiento: numeroRastreo,
      producto: "EPICAL ADVANCED",
      estado: "enviado",
      fechaPedido: "2025-02-08",
      fechaEntregadaEstimada: "2025-02-14",
      transportista: "MRW",
      eventos: [
        {
          fecha: "2025-02-08 11:00",
          descripcion: "Pedido confirmado",
          ubicacion: "Madrid, España",
          completado: true,
        },
        {
          fecha: "2025-02-09 16:30",
          descripcion: "En preparación",
          ubicacion: "Centro logístico EPICAL",
          completado: true,
        },
        {
          fecha: "2025-02-10 10:00",
          descripcion: "Enviado",
          ubicacion: "Madrid, España",
          completado: true,
        },
        {
          fecha: "Estimado: 2025-02-13",
          descripcion: "En reparto",
          ubicacion: "Centro de distribución local",
          completado: false,
        },
        {
          fecha: "Estimado: 2025-02-14",
          descripcion: "Entregado",
          ubicacion: "Tu dirección",
          completado: false,
        },
      ],
    };
    setSeguimiento(seguimientoEjemplo);
  };

  const getEstadoPorcentaje = (estado: string) => {
    switch (estado) {
      case "confirmado":
        return 20;
      case "preparando":
        return 40;
      case "enviado":
        return 60;
      case "en_reparto":
        return 80;
      case "entregado":
        return 100;
      default:
        return 0;
    }
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="h-20 w-20 rounded-full bg-gradient-to-br from-cyan-400 via-blue-500 to-violet-500"></div>
          <p className="text-white/60">Cargando seguimiento...</p>
        </div>
      </div>
    );
  }

  // Mostrar mensaje amigable si no hay sesión
  if (!session) {
    return (
      <div className="min-h-screen bg-black text-white">
        <div className="border-b border-white/10 bg-gradient-to-br from-blue-500/10 to-purple-500/10">
          <div className="max-w-4xl mx-auto px-4 py-8">
            <BackButton />
            <div className="text-center mt-12">
              <div className="inline-block h-24 w-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center shadow-2xl shadow-orange-500/50 animate-fade-in-scale">
                <svg className="h-12 w-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
              </div>
              <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-orange-400 via-red-500 to-pink-400 bg-clip-text text-transparent">
                Inicia sesión para rastrear envíos
              </h1>
              <p className="text-white/60 mb-8 max-w-md mx-auto">
                Crea una cuenta para realizar pedidos y hacer seguimiento de tus envíos en tiempo real.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/auth/signin?callbackUrl=/seguimiento"
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

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="border-b border-white/10 bg-gradient-to-br from-blue-500/10 to-purple-500/10">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <BackButton />
          <div className="mt-6">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 bg-clip-text text-transparent">
              Seguimiento de Envío
            </h1>
            <p className="text-white/60 mt-2">
              Rastrea tu pedido en tiempo real
            </p>
          </div>
        </div>
      </div>

      {/* Buscador */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent p-6 backdrop-blur-sm mb-8">
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
              className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-violet-400 transition-all"
            />
            <button
              onClick={buscarPedido}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-violet-500 to-cyan-500 text-white font-semibold hover:shadow-lg hover:shadow-violet-500/50 transition-all duration-300"
            >
              Buscar
            </button>
          </div>
        </div>

        {/* Información del pedido */}
        {seguimiento && (
          <div className="space-y-6 animate-fade-in-up">
            {/* Resumen */}
            <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent p-6 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-white">
                    {seguimiento.producto}
                  </h3>
                  <p className="text-white/50 mt-1">
                    Pedido #{seguimiento.pedidoId}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-white/50">Número de seguimiento</p>
                  <p className="text-lg font-mono font-bold bg-gradient-to-r from-cyan-400 to-violet-500 bg-clip-text text-transparent">
                    {seguimiento.numeroSeguimiento}
                  </p>
                </div>
              </div>

              {/* Barra de progreso */}
              <div className="relative">
                <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 transition-all duration-1000 ease-out relative"
                    style={{
                      width: `${getEstadoPorcentaje(seguimiento.estado)}%`,
                    }}
                  >
                    <div className="absolute inset-0 bg-white/30 animate-shimmer"></div>
                  </div>
                </div>
                <p className="text-sm text-white/60 mt-2 text-center">
                  {getEstadoPorcentaje(seguimiento.estado)}% completado
                </p>
              </div>

              {/* Info adicional */}
              <div className="grid md:grid-cols-3 gap-4 mt-6">
                <div className="text-center p-4 rounded-xl bg-white/5">
                  <p className="text-white/50 text-sm mb-1">Fecha de pedido</p>
                  <p className="font-semibold text-white">
                    {new Date(seguimiento.fechaPedido).toLocaleDateString(
                      "es-ES"
                    )}
                  </p>
                </div>
                <div className="text-center p-4 rounded-xl bg-white/5">
                  <p className="text-white/50 text-sm mb-1">Entrega estimada</p>
                  <p className="font-semibold text-white">
                    {new Date(
                      seguimiento.fechaEntregadaEstimada
                    ).toLocaleDateString("es-ES")}
                  </p>
                </div>
                <div className="text-center p-4 rounded-xl bg-white/5">
                  <p className="text-white/50 text-sm mb-1">Transportista</p>
                  <p className="font-semibold text-white">
                    {seguimiento.transportista}
                  </p>
                </div>
              </div>
            </div>

            {/* Timeline de eventos */}
            <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent p-6 backdrop-blur-sm">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <span className="text-2xl">📍</span>
                Historial de seguimiento
              </h3>

              <div className="space-y-6">
                {seguimiento.eventos.map((evento, idx) => (
                  <div key={idx} className="flex gap-4 group">
                    {/* Timeline line */}
                    <div className="flex flex-col items-center">
                      <div
                        className={`h-10 w-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                          evento.completado
                            ? "bg-gradient-to-br from-cyan-400 via-blue-500 to-violet-500 border-violet-400 shadow-lg shadow-violet-500/50"
                            : "bg-white/10 border-white/30"
                        }`}
                      >
                        {evento.completado ? (
                          <svg
                            className="h-5 w-5 text-white"
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
                      {idx < seguimiento.eventos.length - 1 && (
                        <div
                          className={`h-full w-0.5 my-1 ${
                            evento.completado
                              ? "bg-gradient-to-b from-violet-400 to-white/20"
                              : "bg-white/20"
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
                            ? "bg-gradient-to-br from-violet-500/10 to-cyan-500/10 border-white/20 group-hover:border-violet-400/50"
                            : "bg-white/5 border-white/10"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <h4 className="font-semibold text-white text-lg">
                              {evento.descripcion}
                            </h4>
                            <p className="text-sm text-white/60 mt-1">
                              📍 {evento.ubicacion}
                            </p>
                          </div>
                          <p className="text-sm text-white/50 whitespace-nowrap">
                            {evento.fecha}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Acciones */}
            <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent p-6 backdrop-blur-sm">
              <h3 className="text-lg font-bold mb-4">¿Necesitas ayuda?</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <button className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:border-white/20 transition-all font-medium text-left">
                  📞 Contactar con el transportista
                </button>
                <button className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:border-white/20 transition-all font-medium text-left">
                  💬 Hablar con soporte EPICAL
                </button>
                <button className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:border-white/20 transition-all font-medium text-left">
                  📋 Modificar dirección de entrega
                </button>
                <button className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:border-white/20 transition-all font-medium text-left">
                  ❓ Preguntas frecuentes
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function SeguimientoPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="h-20 w-20 rounded-full bg-gradient-to-br from-cyan-400 via-blue-500 to-violet-500"></div>
          <p className="text-white/60">Cargando...</p>
        </div>
      </div>
    }>
      <SeguimientoContent />
    </Suspense>
  );
}

