"use client";

import { useState, useEffect } from "react";
import { PRODUCTS, type Product } from "../lib/products";
import Image from "next/image";
import Link from "next/link";

// Categorías de especificaciones para comparar
const SPEC_CATEGORIES = [
  {
    id: "general",
    name: "General",
    icon: "🖥️",
    specs: ["name", "price", "rating", "tag", "desc"]
  },
  {
    id: "gpu",
    name: "GPU",
    icon: "🎮",
    specs: ["gpu_model", "gpu_memory", "gpu_performance"]
  },
  {
    id: "cpu",
    name: "CPU",
    icon: "⚡",
    specs: ["cpu_model", "cpu_cores", "cpu_performance"]
  },
  {
    id: "memory",
    name: "Memoria",
    icon: "💾",
    specs: ["ram_capacity", "ram_speed", "storage_capacity", "storage_type"]
  },
  {
    id: "cooling",
    name: "Refrigeración",
    icon: "❄️",
    specs: ["cooler_type", "case_type", "airflow"]
  },
  {
    id: "power",
    name: "Alimentación",
    icon: "🔌",
    specs: ["psu_wattage", "psu_efficiency", "power_consumption"]
  }
];

// Función para extraer especificaciones específicas de los specs
const extractSpecValue = (product: Product, specKey: string): string => {
  const spec = product.specs.find(s => s.toLowerCase().includes(specKey.toLowerCase()));
  if (!spec) return "N/A";
  
  // Extraer valores específicos
  switch (specKey) {
    case "gpu_model":
      return spec.split(" ").slice(0, 3).join(" ");
    case "gpu_memory":
      const gpuMem = spec.match(/(\d+)GB/);
      return gpuMem ? `${gpuMem[1]}GB` : "N/A";
    case "cpu_model":
      return spec.split(" ").slice(0, 3).join(" ");
    case "cpu_cores":
      const cores = spec.match(/(\d+)-core|(\d+) cores/i);
      return cores ? (cores[1] || cores[2]) : "N/A";
    case "ram_capacity":
      const ram = spec.match(/(\d+)GB/);
      return ram ? `${ram[1]}GB` : "N/A";
    case "ram_speed":
      const speed = spec.match(/(\d+)\s*MT|(\d+)\s*MHz/i);
      return speed ? `${speed[1] || speed[2]} MT/s` : "N/A";
    case "storage_capacity":
      const storage = spec.match(/(\d+)TB|(\d+)GB/);
      return storage ? `${storage[1] || storage[2]}${storage[1] ? 'TB' : 'GB'}` : "N/A";
    case "storage_type":
      if (spec.includes("NVMe")) return "NVMe SSD";
      if (spec.includes("SSD")) return "SSD";
      if (spec.includes("HDD")) return "HDD";
      return "SSD";
    case "cooler_type":
      if (spec.includes("360")) return "Líquida 360mm";
      if (spec.includes("240")) return "Líquida 240mm";
      if (spec.includes("líquida") || spec.includes("RL")) return "Líquida";
      return "Aire";
    case "psu_wattage":
      const wattage = spec.match(/(\d+)W/);
      return wattage ? `${wattage[1]}W` : "N/A";
    case "psu_efficiency":
      if (spec.includes("80+ Gold")) return "80+ Gold";
      if (spec.includes("80+ Bronze")) return "80+ Bronze";
      if (spec.includes("80+")) return "80+";
      return "N/A";
    default:
      return spec;
  }
};

// Función para calcular valor por precio
const calculateValueScore = (product: Product): number => {
  const price = product.price;
  const rating = product.rating || 4;
  
  // Score basado en rating y precio
  const baseScore = rating * 20; // 4.5 = 90 puntos base
  const pricePenalty = Math.max(0, (price - 1500) / 100); // Penalización por precio alto
  
  return Math.max(0, Math.min(100, baseScore - pricePenalty));
};

// Función para obtener recomendación
const getRecommendation = (products: Product[]): { winner: Product; reason: string } => {
  if (products.length === 0) return { winner: PRODUCTS[0], reason: "" };
  
  const scores = products.map(p => ({
    product: p,
    score: calculateValueScore(p),
    price: p.price,
    rating: p.rating || 0
  }));
  
  scores.sort((a, b) => b.score - a.score);
  const winner = scores[0].product;
  
  let reason = "";
  if (winner.price < 1500) {
    reason = "Mejor relación calidad-precio";
  } else if (winner.rating && winner.rating >= 4.8) {
    reason = "Máxima calidad y rendimiento";
  } else {
    reason = "Equilibrio perfecto entre precio y características";
  }
  
  return { winner, reason };
};

export default function ProductComparator() {
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
  const [activeCategory, setActiveCategory] = useState(SPEC_CATEGORIES[0].id);
  const [showRecommendation, setShowRecommendation] = useState(false);

  // Función para añadir/quitar productos
  const toggleProduct = (product: Product) => {
    setSelectedProducts(prev => {
      const isSelected = prev.some(p => p.id === product.id);
      if (isSelected) {
        return prev.filter(p => p.id !== product.id);
      } else if (prev.length < 3) {
        return [...prev, product];
      }
      return prev;
    });
  };

  // Función para limpiar selección
  const clearSelection = () => {
    setSelectedProducts([]);
    setShowRecommendation(false);
  };

  // Función para exportar comparación
  const exportComparison = () => {
    const data = {
      products: selectedProducts.map(p => ({
        name: p.name,
        price: p.price,
        specs: p.specs
      })),
      timestamp: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `comparacion-epical-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const recommendation = getRecommendation(selectedProducts);

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Header */}
      <section className="mx-auto max-w-7xl p-6">
        <div className="mb-8">
          <nav className="mb-4 text-sm text-white/60">
            <Link href="/" className="hover:text-white">Inicio</Link>
            <span className="mx-2">/</span>
            <span className="text-white">Comparador</span>
          </nav>
          
          <h1 className="text-4xl font-bold mb-2">
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 bg-clip-text text-transparent">
              Comparador de PCs EPICAL
            </span>
          </h1>
          <p className="text-white/70 text-lg">
            Compara hasta 3 PCs personalizados y encuentra el perfecto para ti
          </p>
        </div>

        {/* Controles */}
        <div className="mb-8 flex flex-wrap gap-4 items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="text-sm text-white/60">
              {selectedProducts.length}/3 productos seleccionados
            </div>
            {selectedProducts.length > 0 && (
              <>
                <button
                  onClick={clearSelection}
                  className="text-sm text-red-400 hover:text-red-300"
                >
                  Limpiar selección
                </button>
                <button
                  onClick={exportComparison}
                  className="text-sm text-blue-400 hover:text-blue-300"
                >
                  Exportar comparación
                </button>
              </>
            )}
          </div>
          
          {selectedProducts.length >= 2 && (
            <button
              onClick={() => setShowRecommendation(!showRecommendation)}
              className={`px-4 py-2 rounded-xl border text-sm font-medium transition-all ${
                showRecommendation
                  ? "border-violet-400 bg-violet-400/10 text-violet-400"
                  : "border-white/20 hover:border-white/40"
              }`}
            >
              {showRecommendation ? "Ocultar recomendación" : "Ver recomendación"}
            </button>
          )}
        </div>

        {/* Recomendación */}
        {showRecommendation && selectedProducts.length >= 2 && (
          <div className="mb-8 rounded-2xl border border-violet-400/20 bg-gradient-to-r from-violet-500/10 to-cyan-500/10 p-6">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">🏆</span>
              <h3 className="text-xl font-semibold">Nuestra Recomendación</h3>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <h4 className="text-lg font-semibold text-violet-400 mb-2">
                  {recommendation.winner.name}
                </h4>
                <p className="text-white/70 mb-2">{recommendation.reason}</p>
                <div className="text-2xl font-bold">
                  {recommendation.winner.price.toLocaleString()}€
                </div>
              </div>
              <div className="flex justify-end">
                <button
                  onClick={() => toggleProduct(recommendation.winner)}
                  className="rounded-xl bg-violet-400 px-6 py-3 font-semibold text-black hover:bg-violet-300 focus:outline-none focus:ring-2 focus:ring-violet-400"
                >
                  Ver detalles
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="grid gap-8 lg:grid-cols-4">
          {/* Lista de productos */}
          <div className="lg:col-span-1">
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 sticky top-6">
              <h3 className="text-xl font-semibold mb-6">Seleccionar PCs</h3>
              <div className="space-y-3">
                {PRODUCTS.map(product => {
                  const isSelected = selectedProducts.some(p => p.id === product.id);
                  const isDisabled = !isSelected && selectedProducts.length >= 3;
                  
                  return (
                    <button
                      key={product.id}
                      onClick={() => toggleProduct(product)}
                      disabled={isDisabled}
                      className={`w-full text-left p-4 rounded-xl border transition-all ${
                        isSelected
                          ? "border-cyan-400 bg-cyan-400/10"
                          : isDisabled
                          ? "border-white/5 bg-white/[0.02] opacity-50 cursor-not-allowed"
                          : "border-white/10 hover:border-white/20 hover:bg-white/[0.02]"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-4 h-4 rounded-full border-2 ${
                          isSelected ? "border-cyan-400 bg-cyan-400" : "border-white/30"
                        }`} />
                        <div className="flex-1">
                          <div className="font-medium text-sm">{product.name}</div>
                          <div className="text-xs text-white/60">
                            {product.price.toLocaleString()}€
                          </div>
                        </div>
                        {product.tag && (
                          <span className="text-xs px-2 py-1 rounded-full bg-violet-400/20 text-violet-400">
                            {product.tag}
                          </span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Comparación */}
          <div className="lg:col-span-3">
            {selectedProducts.length === 0 ? (
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-12 text-center">
                <div className="text-white/60 mb-4">
                  <svg className="mx-auto h-16 w-16 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  <h3 className="text-xl font-semibold mb-2">Selecciona PCs para comparar</h3>
                  <p>Elige hasta 3 productos para ver una comparación detallada</p>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Categorías de especificaciones */}
                <div className="flex flex-wrap gap-2">
                  {SPEC_CATEGORIES.map(category => (
                    <button
                      key={category.id}
                      onClick={() => setActiveCategory(category.id)}
                      className={`px-4 py-2 rounded-xl border text-sm font-medium transition-all ${
                        activeCategory === category.id
                          ? "border-violet-400 bg-violet-400/10 text-violet-400"
                          : "border-white/10 hover:border-white/20"
                      }`}
                    >
                      <span className="mr-2">{category.icon}</span>
                      {category.name}
                    </button>
                  ))}
                </div>

                {/* Tabla de comparación */}
                <div className="rounded-2xl border border-white/10 bg-white/[0.04] overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-white/10">
                          <th className="text-left p-4 font-semibold">Especificación</th>
                          {selectedProducts.map(product => (
                            <th key={product.id} className="text-center p-4 min-w-[200px]">
                              <div className="space-y-2">
                                <div className="relative aspect-[4/3] w-full max-w-[120px] mx-auto overflow-hidden rounded-xl border border-white/10">
                                  <Image 
                                    src={product.image} 
                                    alt={product.name}
                                    fill
                                    className="object-cover"
                                  />
                                </div>
                                <div className="font-semibold text-sm">{product.name}</div>
                                <div className="text-lg font-bold text-cyan-400">
                                  {product.price.toLocaleString()}€
                                </div>
                                {product.tag && (
                                  <span className="text-xs px-2 py-1 rounded-full bg-violet-400/20 text-violet-400">
                                    {product.tag}
                                  </span>
                                )}
                              </div>
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {SPEC_CATEGORIES.find(c => c.id === activeCategory)?.specs.map(specKey => (
                          <tr key={specKey} className="border-b border-white/5">
                            <td className="p-4 font-medium text-white/80">
                              {specKey.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                            </td>
                            {selectedProducts.map(product => (
                              <td key={product.id} className="p-4 text-center text-sm">
                                {specKey === "name" ? product.name :
                                 specKey === "price" ? `${product.price.toLocaleString()}€` :
                                 specKey === "rating" ? (product.rating ? `⭐ ${product.rating}` : "N/A") :
                                 specKey === "tag" ? (product.tag || "N/A") :
                                 specKey === "desc" ? product.desc :
                                 extractSpecValue(product, specKey)}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Acciones */}
                <div className="flex flex-wrap gap-4 justify-center">
                  {selectedProducts.map(product => (
                    <Link
                      key={product.id}
                      href={`/products/${product.slug}`}
                      className="rounded-xl border border-white/20 px-6 py-3 font-semibold hover:border-white/40 focus:outline-none focus:ring-2 focus:ring-violet-400"
                    >
                      Ver {product.name}
                    </Link>
                  ))}
                  <Link
                    href="/pc-a-medida"
                    className="rounded-xl bg-white px-6 py-3 font-semibold text-black hover:bg-white/90 focus:outline-none focus:ring-2 focus:ring-violet-400"
                  >
                    PC a medida
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
