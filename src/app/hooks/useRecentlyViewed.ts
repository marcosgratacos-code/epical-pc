"use client";

import { useState, useEffect } from "react";
import { type Product } from "../lib/products";

const MAX_RECENT_ITEMS = 5;
const STORAGE_KEY = "epical-recently-viewed";

export function useRecentlyViewed() {
  const [recentlyViewed, setRecentlyViewed] = useState<Product[]>([]);

  // Cargar desde localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setRecentlyViewed(JSON.parse(stored));
      }
    } catch (error) {
      console.error("Error loading recently viewed:", error);
    }
  }, []);

  const addToRecentlyViewed = (product: Product) => {
    setRecentlyViewed((prev) => {
      // Filtrar el producto actual si ya existe
      const filtered = prev.filter((p) => p.id !== product.id);
      
      // Agregar al inicio
      const updated = [product, ...filtered].slice(0, MAX_RECENT_ITEMS);
      
      // Guardar en localStorage
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch (error) {
        console.error("Error saving recently viewed:", error);
      }
      
      return updated;
    });
  };

  const clearRecentlyViewed = () => {
    setRecentlyViewed([]);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error("Error clearing recently viewed:", error);
    }
  };

  return {
    recentlyViewed,
    addToRecentlyViewed,
    clearRecentlyViewed,
  };
}

