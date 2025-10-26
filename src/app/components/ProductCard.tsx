"use client";

import Image from "next/image";
import Link from "next/link";
import { Product } from "../lib/products";
import { useWishlist } from "../context/wishlist-context";
import { useCompare } from "../context/compare-context";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function ProductCard({ p }: {
  p: Product;
}) {
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { addToCompare, isInCompare, removeFromCompare } = useCompare();
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  const isWishlistActive = isClient ? isInWishlist(p.id) : false;
  const isCompareActive = isClient ? isInCompare(p.id) : false;

  const handleWishlist = () => {
    toggleWishlist(p.id);
  };

  const handleCompare = () => {
    if (isCompareActive) {
      removeFromCompare(p.id);
    } else {
      addToCompare(p);
    }
  };

  return (
    <motion.div
      layout
      className="relative group rounded-2xl border border-white/10 bg-gradient-to-br from-neutral-900/90 to-neutral-800/70 hover:border-white/20 hover:shadow-[0_0_25px_-8px_rgba(80,80,255,0.3)] transition-all duration-300 flex flex-col overflow-hidden"
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
    >
      {/* Imagen */}
      <Link href={`/products/${p.slug}`} className="block">
        <div className="relative aspect-[4/3] w-full overflow-hidden">
          <Image
            src={p.image}
            alt={`${p.name} - PC gaming personalizado por TITAN-PC`}
            fill
            sizes="(max-width:1024px) 100vw, 33vw"
            className="object-contain transition-transform duration-500 group-hover:scale-110"
            priority={false}
          />
        </div>
      </Link>

      {/* Contenido */}
      <div className="flex flex-col justify-between flex-1 p-5">
        <div>
          <Link href={`/products/${p.slug}`} className="block hover:text-violet-400 transition-colors">
            <h3 className="text-lg font-bold text-white truncate">{p.name}</h3>
          </Link>
          <p className="text-sm text-white/60 mt-2 line-clamp-2">
            {p.specs.slice(0, 2).join(" • ")}
          </p>
        </div>

        <div className="mt-4">
          <p className="text-blue-400 font-semibold text-xl">
            {p.price.toLocaleString("es-ES", {
              style: "currency",
              currency: "EUR",
              minimumFractionDigits: 0,
            })}
          </p>

          {p.inStock ? (
            <p className="text-emerald-400 text-sm mt-1 flex items-center gap-1">
              <span className="inline-block w-2 h-2 bg-emerald-400 rounded-full" />
              En stock · Envío 24/48 h
            </p>
          ) : (
            <p className="text-rose-400 text-sm mt-1">Agotado temporalmente</p>
          )}
        </div>

        {/* CTA */}
        <div className="mt-6 flex gap-3">
          <Link
            href={`/products/${p.slug}`}
            className="flex-1 rounded-xl bg-white text-black font-semibold px-4 py-3 hover:bg-white/90 focus:outline-none focus:ring-2 focus:ring-violet-400 transition-all duration-200 hover:scale-[1.02] text-center"
          >
            Ver detalles
          </Link>

          <button
            onClick={handleCompare}
            aria-label={isCompareActive ? "Quitar de comparación" : "Añadir a comparación"}
            className={`p-3 rounded-xl border transition-all ${
              isCompareActive
                ? "bg-violet-500/20 border-violet-400/50 text-violet-300"
                : "bg-white/5 border-white/10 hover:bg-white/10 text-white/70"
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </button>

          <button
            onClick={handleWishlist}
            aria-label={isWishlistActive ? "Quitar de favoritos" : "Añadir a favoritos"}
            className={`p-3 rounded-xl border transition-all ${
              isWishlistActive
                ? "bg-red-500/20 border-red-400/50 text-red-300"
                : "bg-white/5 border-white/10 hover:bg-white/10 text-white/70"
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill={isWishlistActive ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </button>
        </div>
      </div>

    </motion.div>
  );
}
