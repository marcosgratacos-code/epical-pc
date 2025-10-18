"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface Notification {
  id: string;
  tipo: "pedido" | "chat" | "sistema" | "promocion";
  titulo: string;
  mensaje: string;
  fecha: Date;
  leida: boolean;
  link?: string;
  icono?: string;
}

interface NotificationsContextType {
  notificaciones: Notification[];
  noLeidas: number;
  agregarNotificacion: (notificacion: Omit<Notification, "id" | "fecha" | "leida">) => void;
  marcarComoLeida: (id: string) => void;
  marcarTodasComoLeidas: () => void;
  eliminarNotificacion: (id: string) => void;
  limpiarTodas: () => void;
}

const NotificationsContext = createContext<NotificationsContextType | undefined>(undefined);

const STORAGE_KEY = "epical_notificaciones";

export function NotificationsProvider({ children }: { children: ReactNode }) {
  const [notificaciones, setNotificaciones] = useState<Notification[]>([]);
  const [noLeidas, setNoLeidas] = useState(0);

  // Cargar notificaciones del localStorage
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        // Convertir fechas de string a Date
        const notifs = parsed.map((n: any) => ({
          ...n,
          fecha: new Date(n.fecha),
        }));
        setNotificaciones(notifs);
      } catch (e) {
        console.error("Error al cargar notificaciones:", e);
      }
    }
  }, []);

  // Guardar notificaciones en localStorage
  useEffect(() => {
    if (notificaciones.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(notificaciones));
    }
    // Actualizar contador de no leídas
    setNoLeidas(notificaciones.filter((n) => !n.leida).length);
  }, [notificaciones]);

  const agregarNotificacion = (notificacion: Omit<Notification, "id" | "fecha" | "leida">) => {
    const nuevaNotificacion: Notification = {
      ...notificacion,
      id: Date.now().toString(),
      fecha: new Date(),
      leida: false,
    };
    setNotificaciones((prev) => [nuevaNotificacion, ...prev]);
    
    // Mostrar notificación del sistema si el navegador lo permite
    if ("Notification" in window && Notification.permission === "granted") {
      new Notification(notificacion.titulo, {
        body: notificacion.mensaje,
        icon: "/logo-epical.png",
        badge: "/logo-epical.png",
      });
    }
  };

  const marcarComoLeida = (id: string) => {
    setNotificaciones((prev) =>
      prev.map((n) => (n.id === id ? { ...n, leida: true } : n))
    );
  };

  const marcarTodasComoLeidas = () => {
    setNotificaciones((prev) => prev.map((n) => ({ ...n, leida: true })));
  };

  const eliminarNotificacion = (id: string) => {
    setNotificaciones((prev) => prev.filter((n) => n.id !== id));
  };

  const limpiarTodas = () => {
    setNotificaciones([]);
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <NotificationsContext.Provider
      value={{
        notificaciones,
        noLeidas,
        agregarNotificacion,
        marcarComoLeida,
        marcarTodasComoLeidas,
        eliminarNotificacion,
        limpiarTodas,
      }}
    >
      {children}
    </NotificationsContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationsContext);
  if (!context) {
    throw new Error("useNotifications debe usarse dentro de NotificationsProvider");
  }
  return context;
}

