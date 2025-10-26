"use client";

import { useState, useMemo } from "react";
import { useRecentlyViewed } from "../hooks/useRecentlyViewed";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export default function VistosRecientementePage() {
  const { recentlyViewed } = useRecentlyViewed();
  const [orden, setOrden] = useState("reciente"); // "reciente" | "precioAsc" | "precioDesc"

  const productos = useMemo(() => {
    if (!recentlyViewed) return [];
    switch (orden) {
      case "precioAsc":
        return [...recentlyViewed].sort((a, b) => (a.price || 0) - (b.price || 0));
      case "precioDesc":
        return [...recentlyViewed].sort((a, b) => (b.price || 0) - (a.price || 0));
      default:
        return recentlyViewed;
    }
  }, [recentlyViewed, orden]);

  if (!productos || productos.length === 0) {
    return (
      <main className="mx-auto max-w-5xl px-4 py-20 text-center text-white">
        <h1 className="text-3xl font-bold mb-4">No has visto ningún producto aún</h1>
        <Link
          href="/productos"
          className="inline-block mt-4 rounded-xl bg-gradient-to-r from-violet-500 to-cyan-400 text-black font-semibold px-6 py-3 hover:scale-[1.03] transition-all duration-300"
        >
          Ir a productos
        </Link>
      </main>
    );
  }

  return (
    <main className="max-w-6xl mx-auto px-4 py-10 text-white">
      <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
        <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
          Vistos recientemente
        </h1>

        <select
          value={orden}
          onChange={(e) => setOrden(e.target.value)}
          className="rounded-lg bg-white/10 border border-white/10 px-3 py-2 text-sm focus:outline-none"
        >
          <option value="reciente">Más recientes</option>
          <option value="precioAsc">Precio: menor a mayor</option>
          <option value="precioDesc">Precio: mayor a menor</option>
        </select>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {productos.map((item, index) => (
          <motion.div
            key={item.slug || item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.04, duration: 0.4 }}
            whileHover={{ scale: 1.05 }}
            className="rounded-2xl border border-white/10 bg-gradient-to-br from-neutral-900/80 to-neutral-800/60 overflow-hidden hover:border-white/20 transition-all duration-300"
          >
            <Link href={`/products/${item.slug}`}>
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src={item.image || "/logo-epical.png"}
                  alt={item.name}
                  fill
                  sizes="(max-width:1024px) 100vw, 20vw"
                  className="object-contain transition-transform duration-500 hover:scale-110"
                />
              </div>
              <div className="p-3">
                <h3 className="text-sm text-white font-semibold truncate">
                  {item.name}
                </h3>
                {item.price && (
                  <p className="text-blue-400 font-medium text-sm mt-1">
                    {item.price.toLocaleString("es-ES", {
                      style: "currency",
                      currency: "EUR",
                      minimumFractionDigits: 0,
                    })}
                  </p>
                )}
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      <div className="flex justify-center mt-12">
        <Link
          href="/productos"
          className="rounded-xl bg-gradient-to-r from-violet-500 to-cyan-400 text-black font-semibold px-6 py-3 hover:scale-[1.03] transition-all duration-300"
        >
          Volver a productos
        </Link>
      </div>
    </main>
  );
}
