"use client";

import ProductCard from "../components/ProductCard";
import AdvancedSearch from "../components/AdvancedSearch";
import Link from "next/link";
import { useState } from "react";
import BackButton from "../components/BackButton";

type Product = {
  id: string;
  slug: string;
  name: string;
  price: number;
  image: string;
  images?: string[];
  specs: string[];
  tag?: string;
  inStock: boolean;
  desc?: string;
  stockQty: number;
};

export default function ProductosClient({ products }: { products: Product[] }) {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);

  return (
    <div className="min-h-screen bg-white text-neutral-900">
      {/* Header */}
      <div className="border-b border-neutral-200 bg-neutral-50">
        <div className="max-w-6xl mx-auto px-4 py-4 md:py-8 lg:max-w-8xl xl:max-w-none xl:px-8">
          <BackButton />
          <div className="mt-4 md:mt-6">
            <h1 className="text-2xl md:text-4xl font-bold text-neutral-900">
              PCs Gaming
            </h1>
            <p className="text-sm md:text-base text-neutral-500 mt-2">
              Descubre nuestra colección completa de PCs gaming personalizados
            </p>
          </div>
        </div>
      </div>

      {/* Contenido */}
      <div className="max-w-6xl mx-auto px-4 py-4 md:py-8">
        {/* Búsqueda avanzada */}
        <div className="mb-6 md:mb-8">
          <AdvancedSearch 
            products={products} 
            onFilteredProducts={setFilteredProducts}
          />
        </div>

        {/* Grid de productos */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-8 md:py-16">
            <div className="inline-block h-16 w-16 md:h-24 md:w-24 rounded-full bg-neutral-50 flex items-center justify-center mb-4 md:mb-6">
              <svg className="h-8 w-8 md:h-12 md:w-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-neutral-900 mb-3 md:mb-4">No se encontraron productos</h2>
            <p className="text-sm md:text-base text-neutral-500 mb-6 md:mb-8">
              Intenta ajustar los filtros de búsqueda para encontrar lo que buscas.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} p={product} />
            ))}
          </div>
        )}

        {/* CTA adicional */}
        <div className="mt-8 md:mt-12 rounded-2xl border border-neutral-200 bg-neutral-50 p-4 md:p-8 text-center">
          <h3 className="text-lg md:text-xl font-bold text-neutral-900 mb-3 md:mb-4">¿No encuentras lo que buscas?</h3>
          <p className="text-sm md:text-base text-neutral-600 mb-4 md:mb-6">
            Crea tu PC gaming perfecto con nuestro configurador personalizado
          </p>
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
            <Link
              href="/pc-a-medida"
              className="px-4 md:px-6 py-3 rounded-xl bg-neutral-900 text-white font-semibold hover:shadow-lg hover:shadow-black/10 transition-all duration-300 touch-target"
            >
              Configurar PC a Medida
            </Link>
            <Link
              href="/comparador"
              className="px-4 md:px-6 py-3 rounded-xl bg-neutral-50 border border-neutral-200 text-neutral-900 font-semibold hover:bg-neutral-100 transition-all duration-300 touch-target"
            >
              Comparar Productos
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

