"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

interface QuickFiltersProps {
  onFilterChange: (filters: FilterState) => void;
}

export interface FilterState {
  priceRange: [number, number];
  inStockOnly: boolean;
  minRating: number;
}

const PRICE_RANGES = [
  { label: "Todos", min: 0, max: Infinity },
  { label: "Hasta 1.000€", min: 0, max: 1000 },
  { label: "1.000€ - 2.000€", min: 1000, max: 2000 },
  { label: "2.000€ - 3.000€", min: 2000, max: 3000 },
  { label: "Más de 3.000€", min: 3000, max: Infinity },
];

export default function QuickFilters({ onFilterChange }: QuickFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [selectedPriceRange, setSelectedPriceRange] = useState(0);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [minRating, setMinRating] = useState(0);

  // Cargar filtros desde URL
  useEffect(() => {
    const priceMin = searchParams.get("priceMin");
    const priceMax = searchParams.get("priceMax");
    const stock = searchParams.get("stock");
    const rating = searchParams.get("rating");

    if (priceMin && priceMax) {
      const min = parseInt(priceMin);
      const max = priceMax === "Infinity" ? Infinity : parseInt(priceMax);
      const rangeIndex = PRICE_RANGES.findIndex(
        (r) => r.min === min && r.max === max
      );
      if (rangeIndex !== -1) setSelectedPriceRange(rangeIndex);
    }

    if (stock === "true") setInStockOnly(true);
    if (rating) setMinRating(parseInt(rating));
  }, [searchParams]);

  // Actualizar filtros
  useEffect(() => {
    const range = PRICE_RANGES[selectedPriceRange];
    onFilterChange({
      priceRange: [range.min, range.max],
      inStockOnly,
      minRating,
    });

    // Actualizar URL
    const params = new URLSearchParams();
    if (selectedPriceRange !== 0) {
      params.set("priceMin", range.min.toString());
      params.set("priceMax", range.max === Infinity ? "Infinity" : range.max.toString());
    }
    if (inStockOnly) params.set("stock", "true");
    if (minRating > 0) params.set("rating", minRating.toString());

    const queryString = params.toString();
    router.replace(queryString ? `?${queryString}` : window.location.pathname, {
      scroll: false,
    });
  }, [selectedPriceRange, inStockOnly, minRating, onFilterChange, router]);

  const clearFilters = () => {
    setSelectedPriceRange(0);
    setInStockOnly(false);
    setMinRating(0);
  };

  const hasActiveFilters = selectedPriceRange !== 0 || inStockOnly || minRating > 0;

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-white flex items-center gap-2">
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
          Filtros rápidos
        </h3>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="text-sm text-white/60 hover:text-white transition-colors"
          >
            Limpiar
          </button>
        )}
      </div>

      {/* Rango de precio */}
      <div>
        <label className="block text-sm text-white/80 mb-2">Rango de precio</label>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
          {PRICE_RANGES.map((range, index) => (
            <button
              key={index}
              onClick={() => setSelectedPriceRange(index)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                selectedPriceRange === index
                  ? "bg-gradient-to-r from-cyan-500 via-blue-500 to-violet-500 text-white"
                  : "bg-white/5 text-white/70 hover:bg-white/10 hover:text-white"
              }`}
            >
              {range.label}
            </button>
          ))}
        </div>
      </div>

      {/* Otros filtros */}
      <div className="flex flex-wrap gap-3">
        {/* Solo en stock */}
        <button
          onClick={() => setInStockOnly(!inStockOnly)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
            inStockOnly
              ? "bg-green-500/20 text-green-400 border border-green-500/30"
              : "bg-white/5 text-white/70 hover:bg-white/10 hover:text-white border border-white/10"
          }`}
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          Solo en stock
        </button>

        {/* Valoración mínima */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-white/70">Valoración mínima:</span>
          <div className="flex gap-1">
            {[0, 3, 4, 5].map((rating) => (
              <button
                key={rating}
                onClick={() => setMinRating(rating)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  minRating === rating
                    ? "bg-gradient-to-r from-cyan-500 via-blue-500 to-violet-500 text-white"
                    : "bg-white/5 text-white/70 hover:bg-white/10 hover:text-white"
                }`}
              >
                {rating === 0 ? "Todas" : `${rating}★+`}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

