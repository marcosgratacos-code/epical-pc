"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRecentlyViewed } from "../hooks/useRecentlyViewed";

export default function RecentlyViewed() {
  const { recentlyViewed } = useRecentlyViewed();

  if (!recentlyViewed || recentlyViewed.length === 0) return null;

  return (
    <section className="mt-20 mb-12">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent mb-6">
          Vistos recientemente
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
          {recentlyViewed.slice(0, 5).map((item, index) => (
            <motion.div
              key={item.slug || item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.4 }}
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

        {/* Botón "Ver todos" */}
        <div className="flex justify-center mt-10">
          <Link
            href="/vistos-recientemente"
            className="rounded-xl bg-gradient-to-r from-violet-500 to-cyan-400 text-black font-semibold px-6 py-3 hover:scale-[1.03] transition-all duration-300"
          >
            Ver todos
          </Link>
        </div>
      </div>
    </section>
  );
}
