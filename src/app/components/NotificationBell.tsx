"use client";

import { useState, useEffect, useRef } from "react";
import { useNotifications } from "../context/notifications-context";
import Link from "next/link";

export default function NotificationBell() {
  const { notificaciones, noLeidas, marcarComoLeida, marcarTodasComoLeidas, eliminarNotificacion } = useNotifications();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Cerrar dropdown al hacer click fuera
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Solicitar permiso para notificaciones del navegador
  useEffect(() => {
    if ("Notification" in window && Notification.permission === "default") {
      Notification.requestPermission();
    }
  }, []);

  const getIconoNotificacion = (tipo: string) => {
    switch (tipo) {
      case "pedido":
        return "📦";
      case "chat":
        return "💬";
      case "promocion":
        return "🎉";
      default:
        return "🔔";
    }
  };

  const formatFecha = (fecha: Date) => {
    const ahora = new Date();
    const diff = ahora.getTime() - fecha.getTime();
    const minutos = Math.floor(diff / 60000);
    const horas = Math.floor(diff / 3600000);
    const dias = Math.floor(diff / 86400000);

    if (minutos < 1) return "Ahora";
    if (minutos < 60) return `Hace ${minutos}m`;
    if (horas < 24) return `Hace ${horas}h`;
    if (dias < 7) return `Hace ${dias}d`;
    return fecha.toLocaleDateString("es-ES", { day: "numeric", month: "short" });
  };

  const handleNotificacionClick = (notificacion: any) => {
    marcarComoLeida(notificacion.id);
    if (notificacion.link) {
      setIsOpen(false);
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Botón de campana */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-full hover:bg-white/10 transition-all duration-200 touch-target"
        aria-label={`Notificaciones (${noLeidas} sin leer)`}
      >
        <svg
          className="h-6 w-6 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
          />
        </svg>

        {/* Badge de contador */}
        {noLeidas > 0 && (
          <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-gradient-to-r from-red-500 to-pink-500 text-xs font-bold text-white flex items-center justify-center animate-fade-in-scale shadow-lg">
            {noLeidas > 9 ? "9+" : noLeidas}
          </span>
        )}
      </button>

      {/* Dropdown de notificaciones */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 md:w-96 bg-black border border-white/10 rounded-2xl shadow-2xl z-50 animate-fade-in-scale origin-top-right max-h-[80vh] flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-white/10">
            <h3 className="text-lg font-semibold text-white">Notificaciones</h3>
            {noLeidas > 0 && (
              <button
                onClick={marcarTodasComoLeidas}
                className="text-xs text-violet-400 hover:text-violet-300 transition-colors"
              >
                Marcar todas como leídas
              </button>
            )}
          </div>

          {/* Lista de notificaciones */}
          <div className="overflow-y-auto flex-1">
            {notificaciones.length === 0 ? (
              <div className="p-8 text-center">
                <div className="inline-block h-16 w-16 rounded-full bg-white/5 flex items-center justify-center mb-3">
                  <svg
                    className="h-8 w-8 text-white/40"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                    />
                  </svg>
                </div>
                <p className="text-white/60 text-sm">No tienes notificaciones</p>
              </div>
            ) : (
              <div className="divide-y divide-white/10">
                {notificaciones.map((notif) => (
                  <div
                    key={notif.id}
                    className={`p-4 hover:bg-white/5 transition-colors ${
                      !notif.leida ? "bg-violet-500/5" : ""
                    }`}
                  >
                    <div className="flex gap-3">
                      {/* Icono */}
                      <div className="flex-shrink-0">
                        <div
                          className={`h-10 w-10 rounded-full flex items-center justify-center ${
                            !notif.leida
                              ? "bg-gradient-to-br from-violet-500/20 to-cyan-500/20"
                              : "bg-white/5"
                          }`}
                        >
                          <span className="text-xl">
                            {notif.icono || getIconoNotificacion(notif.tipo)}
                          </span>
                        </div>
                      </div>

                      {/* Contenido */}
                      <div className="flex-1 min-w-0">
                        {notif.link ? (
                          <Link
                            href={notif.link}
                            onClick={() => handleNotificacionClick(notif)}
                            className="block"
                          >
                            <h4
                              className={`font-semibold text-sm mb-1 ${
                                !notif.leida ? "text-white" : "text-white/80"
                              }`}
                            >
                              {notif.titulo}
                            </h4>
                            <p className="text-xs text-white/60 line-clamp-2">
                              {notif.mensaje}
                            </p>
                            <p className="text-xs text-white/40 mt-1">
                              {formatFecha(notif.fecha)}
                            </p>
                          </Link>
                        ) : (
                          <>
                            <h4
                              className={`font-semibold text-sm mb-1 ${
                                !notif.leida ? "text-white" : "text-white/80"
                              }`}
                            >
                              {notif.titulo}
                            </h4>
                            <p className="text-xs text-white/60 line-clamp-2">
                              {notif.mensaje}
                            </p>
                            <p className="text-xs text-white/40 mt-1">
                              {formatFecha(notif.fecha)}
                            </p>
                          </>
                        )}
                      </div>

                      {/* Botones de acción */}
                      <div className="flex flex-col gap-1">
                        {!notif.leida && (
                          <button
                            onClick={() => marcarComoLeida(notif.id)}
                            className="p-1 rounded hover:bg-white/10 transition-colors"
                            aria-label="Marcar como leída"
                          >
                            <svg
                              className="h-4 w-4 text-violet-400"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          </button>
                        )}
                        <button
                          onClick={() => eliminarNotificacion(notif.id)}
                          className="p-1 rounded hover:bg-white/10 transition-colors"
                          aria-label="Eliminar notificación"
                        >
                          <svg
                            className="h-4 w-4 text-white/40 hover:text-red-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer con acciones */}
          {notificaciones.length > 0 && (
            <div className="p-3 border-t border-white/10">
              <Link
                href="/perfil?tab=notificaciones"
                onClick={() => setIsOpen(false)}
                className="block text-center text-sm text-violet-400 hover:text-violet-300 transition-colors"
              >
                Ver todas las notificaciones
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

