"use client";

import { useWishlist } from "../context/wishlist-context";
import { PRODUCTS } from "../lib/products";
import ProductCard from "../components/ProductCard";
import { useCart } from "../context/cart-context";
import BackButton from "../components/BackButton";
import Link from "next/link";
import { useState } from "react";

export default function WishlistPage() {
  const { wishlist, clearWishlist } = useWishlist();
  const { add } = useCart();
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  // Filtrar productos que están en la wishlist
  const wishlistProducts = PRODUCTS.filter(product => wishlist.includes(product.id));

  const handleAdd = (id: string) => {
    add(id);
    const product = PRODUCTS.find(p => p.id === id);
    // Aquí podrías añadir un toast de confirmación
  };

  const handleClearWishlist = () => {
    clearWishlist();
    setShowClearConfirm(false);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="border-b border-white/10 bg-gradient-to-br from-violet-500/10 to-cyan-500/10">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <BackButton />
          <div className="mt-6">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-violet-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Mis Favoritos
            </h1>
            <p className="text-white/60 mt-2">
              {wishlistProducts.length === 0 
                ? "No tienes productos en tu lista de favoritos" 
                : `${wishlistProducts.length} producto${wishlistProducts.length !== 1 ? 's' : ''} guardado${wishlistProducts.length !== 1 ? 's' : ''}`
              }
            </p>
          </div>
        </div>
      </div>

      {/* Contenido */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {wishlistProducts.length === 0 ? (
          /* Estado vacío */
          <div className="text-center py-16">
            <div className="inline-block h-24 w-24 rounded-full bg-gradient-to-br from-violet-500/20 to-cyan-500/20 flex items-center justify-center mb-6">
              <svg className="h-12 w-12 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">Tu lista de favoritos está vacía</h2>
            <p className="text-white/60 mb-8 max-w-md mx-auto">
              Añade productos a tu lista de favoritos haciendo clic en el corazón ❤️ de cualquier producto.
            </p>
            <Link
              href="/productos"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-violet-500 to-cyan-500 text-white font-semibold hover:shadow-lg hover:shadow-violet-500/50 transition-all duration-300"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              Explorar Productos
            </Link>
          </div>
        ) : (
          /* Lista de productos */
          <>
            {/* Acciones */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <h2 className="text-xl font-semibold text-white">
                  Productos Favoritos ({wishlistProducts.length})
                </h2>
                <button
                  onClick={() => setShowClearConfirm(true)}
                  className="px-4 py-2 rounded-lg bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30 transition-all text-sm font-medium"
                >
                  Limpiar Lista
                </button>
              </div>
              
              <Link
                href="/productos"
                className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all text-sm font-medium"
              >
                Ver Todos los Productos
              </Link>
            </div>

            {/* Grid de productos */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {wishlistProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  p={product}
                  onAdd={handleAdd}
                />
              ))}
            </div>

            {/* CTA adicional */}
            <div className="mt-12 rounded-2xl border border-white/10 bg-gradient-to-r from-violet-500/10 to-cyan-500/10 p-8 text-center">
              <h3 className="text-xl font-bold text-white mb-4">¿No encuentras lo que buscas?</h3>
              <p className="text-white/70 mb-6">
                Explora nuestra colección completa de PCs gaming personalizados
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/productos"
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-violet-500 to-cyan-500 text-white font-semibold hover:shadow-lg hover:shadow-violet-500/50 transition-all duration-300"
                >
                  Ver Todos los Productos
                </Link>
                <Link
                  href="/pc-a-medida"
                  className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-semibold hover:bg-white/10 transition-all duration-300"
                >
                  PC a Medida
                </Link>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Modal de confirmación para limpiar lista */}
      {showClearConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowClearConfirm(false)} />
          <div className="relative bg-black border border-white/10 rounded-2xl p-6 max-w-md w-full">
            <h3 className="text-xl font-bold text-white mb-4">¿Limpiar lista de favoritos?</h3>
            <p className="text-white/70 mb-6">
              Esta acción eliminará todos los productos de tu lista de favoritos. No se puede deshacer.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowClearConfirm(false)}
                className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-medium hover:bg-white/10 transition-all duration-200"
              >
                Cancelar
              </button>
              <button
                onClick={handleClearWishlist}
                className="flex-1 px-4 py-3 rounded-xl bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30 transition-all duration-200 font-medium"
              >
                Limpiar Lista
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


