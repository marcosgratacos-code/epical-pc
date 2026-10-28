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

  const iconBtn = (active: boolean, activeClass: string) =>
    `p-3 rounded-full border transition-colors ${
      active ? activeClass : "border-neutral-200 text-neutral-600 hover:bg-neutral-100"
    }`;

  return (
    <motion.div
      layout
      className="relative group rounded-3xl border border-neutral-200 bg-white hover:shadow-[0_12px_40px_-12px_rgba(0,0,0,0.15)] transition-shadow duration-300 flex flex-col overflow-hidden"
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
    >
      {/* Imagen */}
      <Link href={`/products/${p.slug}`} className="block">
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-50">
          <Image
            src={p.image}
            alt={`${p.name} - PC gaming personalizado por TITAN-PC`}
            fill
            sizes="(max-width:1024px) 100vw, 33vw"
            className="object-contain p-6 mix-blend-multiply transition-transform duration-500 group-hover:scale-105"
            priority={false}
          />
        </div>
      </Link>

      {/* Contenido */}
      <div className="flex flex-col justify-between flex-1 p-6">
        <div>
          <Link href={`/products/${p.slug}`} className="block transition-colors hover:text-blue-600">
            <h3 className="text-lg font-semibold text-neutral-900 truncate">{p.name}</h3>
          </Link>
          <p className="text-sm mt-2 line-clamp-2 text-neutral-500">
            {p.specs.slice(0, 2).join(" • ")}
          </p>
        </div>

        <div className="mt-4">
          <p className="font-semibold text-xl text-neutral-900">
            {p.price.toLocaleString("es-ES", {
              style: "currency",
              currency: "EUR",
              minimumFractionDigits: 0,
            })}
          </p>

          {p.inStock ? (
            <p className="text-sm mt-1 flex items-center gap-1.5 text-emerald-700">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500" />
              En stock · Envío 24/48 h
            </p>
          ) : (
            <p className="text-sm mt-1 text-rose-600">Agotado temporalmente</p>
          )}
        </div>

        {/* CTA */}
        <div className="mt-6 flex gap-3">
          <Link
            href={`/products/${p.slug}`}
            className="flex-1 rounded-full bg-neutral-900 text-white font-medium px-4 py-3 hover:bg-neutral-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 transition-colors text-center"
          >
            Ver detalles
          </Link>

          <button
            onClick={handleCompare}
            aria-label={isCompareActive ? "Quitar de comparación" : "Añadir a comparación"}
            className={iconBtn(isCompareActive, "border-blue-600 bg-blue-50 text-blue-700")}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </button>

          <button
            onClick={handleWishlist}
            aria-label={isWishlistActive ? "Quitar de favoritos" : "Añadir a favoritos"}
            className={iconBtn(isWishlistActive, "border-red-300 bg-red-50 text-red-600")}
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
