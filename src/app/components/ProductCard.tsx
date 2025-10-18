import Image from "next/image";
import Link from "next/link";
import { Product } from "../lib/products";
import { useWishlist } from "../context/wishlist-context";
import { useCompare } from "../context/compare-context";
import { useState, useEffect } from "react";
import StarRating from "./StarRating";
import { getReviewStats } from "../lib/reviews";

export default function ProductCard({ p, onAdd, onInfo }: {
  p: Product;
  onAdd: (id: string) => void;
  onInfo?: (p: Product) => void;
}) {
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { addToCompare, isInCompare, removeFromCompare, compareCount } = useCompare();
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [reviewStats, setReviewStats] = useState({ totalReviews: 0, averageRating: 0 });
  
  // Cargar estadísticas de reseñas solo en el cliente
  useEffect(() => {
    const stats = getReviewStats(p.id);
    setReviewStats(stats);
  }, [p.id]);

  const handleWishlistToggle = () => {
    toggleWishlist(p.id);
    const isInList = isInWishlist(p.id);
    setToastMessage(isInList ? 'Añadido a favoritos' : 'Eliminado de favoritos');
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  const handleCompareToggle = () => {
    if (isInCompare(p.id)) {
      removeFromCompare(p.id);
      setToastMessage('Eliminado de comparación');
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000);
    } else {
      const added = addToCompare(p);
      if (added) {
        setToastMessage('Añadido a comparación');
        setShowToast(true);
        setTimeout(() => setShowToast(false), 2000);
      } else {
        setToastMessage(compareCount >= 3 ? 'Máximo 3 productos' : 'Ya está en comparación');
        setShowToast(true);
        setTimeout(() => setShowToast(false), 2000);
      }
    }
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-3 md:p-4 flex flex-col gap-3 animate-card-hover hover-lift hover-glow group relative">
      {/* Estrellas de valoración y botones de acción */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
        {/* Estrellas de valoración */}
        {reviewStats.totalReviews > 0 && (
          <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-black/50 backdrop-blur-sm border border-white/20">
            <StarRating 
              rating={reviewStats.averageRating} 
              totalReviews={reviewStats.totalReviews}
              size="sm"
              showCount={true}
            />
          </div>
        )}
        
        {/* Botones de acción */}
        <div className="flex gap-2">
          {/* Botón de comparar */}
          <button
            onClick={handleCompareToggle}
            className={`p-2 rounded-full backdrop-blur-sm border transition-all duration-200 group/compare touch-target ${
              isInCompare(p.id)
                ? 'bg-violet-500/50 border-violet-400/50'
                : 'bg-black/50 border-white/20 hover:bg-black/70'
            }`}
            aria-label={isInCompare(p.id) ? "Quitar de comparación" : "Añadir a comparación"}
          >
            <svg 
              className={`h-5 w-5 transition-all duration-200 ${
                isInCompare(p.id) 
                  ? 'text-violet-100' 
                  : 'text-white/70 group-hover/compare:text-violet-400'
              }`} 
              fill="none"
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </button>
          
          {/* Botón de wishlist */}
          <button
            onClick={handleWishlistToggle}
            className="p-2 rounded-full bg-black/50 backdrop-blur-sm border border-white/20 hover:bg-black/70 transition-all duration-200 group/wishlist touch-target"
            aria-label={isInWishlist(p.id) ? "Quitar de favoritos" : "Añadir a favoritos"}
          >
            <svg 
              className={`h-5 w-5 transition-all duration-200 ${
                isInWishlist(p.id) 
                  ? 'text-red-400 fill-current' 
                  : 'text-white/70 group-hover/wishlist:text-red-400'
              }`} 
              fill={isInWishlist(p.id) ? 'currentColor' : 'none'} 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Toast de confirmación */}
      {showToast && (
        <div className="absolute top-16 right-4 z-20 px-3 py-2 rounded-lg bg-green-500/90 text-white text-sm font-medium animate-fade-in-scale">
          {toastMessage}
        </div>
      )}

      {/* Enlace a la página de detalles - imagen clickeable */}
      <Link href={`/products/${p.slug}`} className="block">
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-white/10 cursor-pointer">
          <Image 
            src={p.image} 
            alt={`${p.name} - PC gaming personalizado por EPICAL-PC`} 
            fill 
            className="object-contain transform group-hover:scale-110 transition-transform duration-500 ease-out" 
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          {/* Overlay con icono de información */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="rounded-full bg-white/20 backdrop-blur-sm p-3">
              <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>
      </Link>
      
      <div className="flex-1">
        <div className="flex items-center justify-between gap-2">
          <div className="min-w-0 flex-1">
            {/* Enlace al nombre del producto */}
            <Link href={`/products/${p.slug}`} className="block hover:text-violet-400 transition-colors">
              <div className="truncate font-semibold">{p.name}</div>
            </Link>
            <div className="text-sm text-white/60">{p.price.toLocaleString("es-ES", { style: "currency", currency: "EUR" })}</div>
          </div>
          <span className={`rounded-lg px-2 py-1 text-xs transition-all duration-300 ${p.inStock ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
            {p.inStock ? "En stock" : "Sin stock"}
          </span>
        </div>
        <ul className="mt-2 space-y-1 text-sm text-white/70">
          {p.specs.slice(0, 3).map((s, index) => (
            <li key={s} className={`transform transition-all duration-300 hover:translate-x-1 hover:text-white stagger-${index + 1}`}>• {s}</li>
          ))}
        </ul>
      </div>
      
      <div className="flex gap-2 mt-3">
        <button
          onClick={() => onAdd(p.id)}
          className="flex-1 rounded-xl bg-white px-4 py-3 font-semibold text-black hover:bg-white/90 focus:outline-none focus:ring-2 focus:ring-violet-400 transform hover:scale-105 transition-all duration-200 hover:shadow-lg touch-target min-h-[44px]"
          disabled={!p.inStock}
        >
          Añadir
        </button>
        <Link
          href={`/products/${p.slug}`}
          className="rounded-xl border border-white/20 px-4 py-3 font-semibold hover:border-white/40 focus:outline-none focus:ring-2 focus:ring-violet-400 transform hover:scale-105 transition-all duration-200 hover:shadow-lg hover-glow flex items-center justify-center touch-target min-h-[44px]"
        >
          Ver
        </Link>
        {onInfo && (
          <button
            onClick={() => onInfo(p)}
            className="rounded-xl border border-white/20 px-4 py-3 font-semibold hover:border-white/40 focus:outline-none focus:ring-2 focus:ring-violet-400 transform hover:scale-105 transition-all duration-200 hover:shadow-lg hover-glow touch-target"
          >
            Info
          </button>
        )}
      </div>
    </div>
  );
}
