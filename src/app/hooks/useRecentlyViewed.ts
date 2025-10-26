"use client";

import { useEffect, useRef, useState, useCallback } from "react";

export type Product = {
  id: string;
  slug: string;
  name: string;
  price?: number;
  image?: string;
};

const STORAGE_KEY = "epical_recently_viewed_v5";

export function useRecentlyViewed(userId?: string) {
  const [recentlyViewed, setRecentlyViewed] = useState<Product[]>([]);
  const loaded = useRef(false);

  // 🔹 Carga inicial: localStorage + merge con servidor si hay usuario
  useEffect(() => {
    if (loaded.current) return;
    loaded.current = true;

    const loadAndSync = async () => {
      try {
        const localRaw = localStorage.getItem(STORAGE_KEY);
        const localData: Product[] = localRaw ? JSON.parse(localRaw) : [];

        if (userId) {
          // 🔸 Carga del servidor
          const res = await fetch(`/api/recently-viewed?userId=${userId}`);
          const serverData: Product[] = await res.json();

          // 🔸 Fusionar sin duplicar
          const merged: Product[] = [
            ...localData,
            ...serverData.filter(
              (sv) => !localData.some((lc) => lc.slug === sv.slug)
            ),
          ].slice(0, 20);

          setRecentlyViewed(merged);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));

          // 🔸 Subir los productos locales que no estaban en el servidor
          for (const prod of localData) {
            if (!serverData.some((s) => s.slug === prod.slug)) {
              await fetch("/api/recently-viewed", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId, product: prod }),
              });
            }
          }
        } else {
          // 🔸 Usuario no logueado → solo local
          setRecentlyViewed(localData);
        }
      } catch (err) {
        console.error("Error al cargar vistos:", err);
      }
    };

    loadAndSync();
  }, [userId]);

  // 🔹 Añadir producto
  const addToRecentlyViewed = useCallback(
    async (product: Product) => {
      if (!product?.slug) return;

      setRecentlyViewed((prev) => {
        const exists = prev.some((p) => p.slug === product.slug);
        if (exists) return prev;
        const updated = [product, ...prev].slice(0, 20);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        return updated;
      });

      // 🔸 Si hay usuario, guardar en el servidor
      if (userId) {
        try {
          await fetch("/api/recently-viewed", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId, product }),
          });
        } catch (err) {
          console.error("Error sincronizando con DB:", err);
        }
      }
    },
    [userId]
  );

  const clearRecentlyViewed = useCallback(() => {
    setRecentlyViewed([]);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {}
  }, []);

  return { recentlyViewed, addToRecentlyViewed, clearRecentlyViewed };
}

