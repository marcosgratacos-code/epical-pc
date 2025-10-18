"use client";

import { useState, useEffect, useRef } from "react";
import { PRODUCTS, type Product } from "../lib/products";
import Link from "next/link";
import Image from "next/image";

interface GlobalSearchProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function GlobalSearch({ isOpen, onClose }: GlobalSearchProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus al abrir
  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
      setQuery("");
      setResults([]);
    }
  }, [isOpen]);

  // Atajo de teclado Ctrl+K o Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        if (!isOpen) {
          // Abrir búsqueda desde el padre
          const searchBtn = document.getElementById("global-search-trigger");
          searchBtn?.click();
        }
      }
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Búsqueda en tiempo real
  useEffect(() => {
    if (query.trim().length < 2) {
      setResults([]);
      return;
    }

    const searchQuery = query.toLowerCase();
    const filtered = PRODUCTS.filter((product) => {
      const nameMatch = product.name.toLowerCase().includes(searchQuery);
      const descMatch = product.desc?.toLowerCase().includes(searchQuery);
      const specsMatch = product.specs.some((spec) =>
        spec.toLowerCase().includes(searchQuery)
      );
      return nameMatch || descMatch || specsMatch;
    });

    setResults(filtered.slice(0, 5)); // Máximo 5 resultados
  }, [query]);

  if (!isOpen) return null;

  const eur = (n: number) =>
    new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR" }).format(n);

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 z-[999] bg-black/80 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Search Panel */}
      <div className="fixed top-20 left-1/2 -translate-x-1/2 z-[1000] w-[90vw] max-w-2xl animate-fade-in-scale">
        <div className="rounded-2xl border border-white/20 bg-black/95 backdrop-blur-xl shadow-2xl overflow-hidden">
          {/* Search Input */}
          <div className="flex items-center gap-3 p-4 border-b border-white/10">
            <svg className="h-5 w-5 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              ref={inputRef}
              type="text"
              placeholder="Buscar productos, componentes..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 bg-transparent text-white placeholder:text-white/40 outline-none"
            />
            <kbd className="hidden sm:inline-block px-2 py-1 text-xs rounded bg-white/10 text-white/60 border border-white/20">
              ESC
            </kbd>
          </div>

          {/* Results */}
          <div className="max-h-[60vh] overflow-y-auto">
            {query.trim().length < 2 ? (
              <div className="p-8 text-center text-white/40">
                <svg className="h-16 w-16 mx-auto mb-4 text-white/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <p>Escribe al menos 2 caracteres para buscar</p>
                <p className="text-sm mt-2">Prueba con: RTX, Intel, Gaming...</p>
              </div>
            ) : results.length === 0 ? (
              <div className="p-8 text-center text-white/40">
                <svg className="h-16 w-16 mx-auto mb-4 text-white/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p>No se encontraron resultados para "{query}"</p>
                <p className="text-sm mt-2">Intenta con otros términos</p>
              </div>
            ) : (
              <div className="p-2">
                {results.map((product) => (
                  <Link
                    key={product.id}
                    href={`/products/${product.slug}`}
                    onClick={onClose}
                    className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/10 transition-colors group"
                  >
                    <div className="relative h-16 w-16 flex-shrink-0 rounded-lg overflow-hidden border border-white/10">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        sizes="64px"
                        className="object-contain"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-white group-hover:text-cyan-400 transition-colors truncate">
                        {product.name}
                      </div>
                      <div className="text-sm text-white/60 truncate">
                        {product.desc}
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-sm font-bold text-white">{eur(product.price)}</span>
                        {product.inStock && (
                          <span className="text-xs px-2 py-0.5 rounded-full bg-green-500/20 text-green-400 border border-green-500/30">
                            En stock
                          </span>
                        )}
                      </div>
                    </div>
                    <svg className="h-5 w-5 text-white/40 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between p-3 border-t border-white/10 text-xs text-white/40">
            <span>
              {results.length > 0 && `${results.length} resultado${results.length > 1 ? "s" : ""}`}
            </span>
            <div className="flex gap-2">
              <kbd className="px-2 py-1 rounded bg-white/10 border border-white/20">⌘K</kbd>
              <span>para buscar</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

