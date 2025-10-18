"use client";

import { useState, useEffect } from "react";
import { PRODUCTS, type Product } from "../lib/products";
import { useCart } from "../context/cart-context";
import { 
  saveComparison, 
  getComparisons, 
  deleteComparison,
  downloadComparisonAsJSON,
  compareSpecs,
  determineBestInCategory,
  calculateProductScore,
  type Comparison
} from "../lib/comparator";
import Image from "next/image";
import Link from "next/link";
import BackButton from "../components/BackButton";
import ComparisonCharts from "../components/ComparisonCharts";

export default function ComparadorPage() {
  const { add } = useCart();
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [savedComparisons, setSavedComparisons] = useState<Comparison[]>([]);
  const [comparisonName, setComparisonName] = useState("");
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [showLoadModal, setShowLoadModal] = useState(false);

  // Cargar comparaciones guardadas
  useEffect(() => {
    setSavedComparisons(getComparisons());
  }, []);

  const toggleProduct = (productId: string) => {
    if (selectedProducts.includes(productId)) {
      setSelectedProducts(selectedProducts.filter(id => id !== productId));
    } else if (selectedProducts.length < 3) {
      setSelectedProducts([...selectedProducts, productId]);
    }
  };

  const products = selectedProducts
    .map(id => PRODUCTS.find(p => p.id === id))
    .filter(Boolean) as Product[];

  const handleSaveComparison = () => {
    if (!comparisonName.trim() || selectedProducts.length === 0) return;
    
    saveComparison(comparisonName, selectedProducts);
    setSavedComparisons(getComparisons());
    setShowSaveModal(false);
    setComparisonName("");
  };

  const handleLoadComparison = (comparison: Comparison) => {
    setSelectedProducts(comparison.products);
    setShowLoadModal(false);
  };

  const handleDeleteComparison = (id: string) => {
    deleteComparison(id);
    setSavedComparisons(getComparisons());
  };

  const handleExport = () => {
    if (products.length === 0) return;
    const comparison = {
      id: `temp-${Date.now()}`,
      name: 'Comparación actual',
      products: selectedProducts,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    downloadComparisonAsJSON(comparison, products);
  };

  const specs = compareSpecs(products);
  const bestPrice = determineBestInCategory(products, 'price');
  const bestPerformance = determineBestInCategory(products, 'performance');
  const bestValue = determineBestInCategory(products, 'value');

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="border-b border-white/10 bg-gradient-to-br from-violet-500/10 to-cyan-500/10">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <BackButton />
          <div className="mt-6">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-violet-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Comparador de PCs
            </h1>
            <p className="text-white/60 mt-2">
              Compara hasta 3 PCs gaming y encuentra el perfecto para ti
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Selector de productos */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-white">
              Selecciona productos ({selectedProducts.length}/3)
            </h2>
            <div className="flex gap-2">
              <button
                onClick={() => setShowLoadModal(true)}
                className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all text-sm font-medium"
              >
                📂 Cargar comparación
              </button>
              {selectedProducts.length > 0 && (
                <>
                  <button
                    onClick={() => setShowSaveModal(true)}
                    className="px-4 py-2 rounded-lg bg-violet-500/20 text-violet-400 border border-violet-500/30 hover:bg-violet-500/30 transition-all text-sm font-medium"
                  >
                    💾 Guardar comparación
                  </button>
                  <button
                    onClick={handleExport}
                    className="px-4 py-2 rounded-lg bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 hover:bg-cyan-500/30 transition-all text-sm font-medium"
                  >
                    📥 Exportar JSON
                  </button>
                </>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {PRODUCTS.map(product => (
              <button
                key={product.id}
                onClick={() => toggleProduct(product.id)}
                disabled={!selectedProducts.includes(product.id) && selectedProducts.length >= 3}
                className={`text-left p-4 rounded-xl border transition-all ${
                  selectedProducts.includes(product.id)
                    ? 'border-violet-500/50 bg-violet-500/10'
                    : 'border-white/10 bg-white/5 hover:bg-white/10'
                } ${!selectedProducts.includes(product.id) && selectedProducts.length >= 3 ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <div className="flex items-start gap-3">
                  <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-white truncate">{product.name}</h3>
                    <p className="text-violet-400 font-medium">
                      {product.price.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}
                    </p>
                  </div>
                  {selectedProducts.includes(product.id) && (
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-violet-500 flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Gráficas de comparación */}
        {products.length > 0 && (
          <ComparisonCharts products={products} />
        )}

        {/* Tabla de comparación */}
        {products.length > 0 && (
          <div className="space-y-6 mt-8">
            {/* Badges de mejor en cada categoría */}
            {products.length > 1 && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {products.map(product => (
                  <div key={product.id} className="rounded-xl border border-white/10 bg-white/5 p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="relative w-12 h-12">
                        <Image src={product.image} alt={product.name} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-contain" />
                      </div>
                      <span className="font-semibold text-sm">{product.name}</span>
                    </div>
                    <div className="space-y-2">
                      {product.id === bestPrice && (
                        <span className="inline-block px-2 py-1 rounded-full bg-green-500/20 text-green-400 text-xs font-medium">
                          💰 Mejor precio
                        </span>
                      )}
                      {product.id === bestPerformance && (
                        <span className="inline-block px-2 py-1 rounded-full bg-blue-500/20 text-blue-400 text-xs font-medium ml-2">
                          ⚡ Mejor rendimiento
                        </span>
                      )}
                      {product.id === bestValue && (
                        <span className="inline-block px-2 py-1 rounded-full bg-violet-500/20 text-violet-400 text-xs font-medium ml-2">
                          🎯 Mejor relación calidad-precio
                        </span>
                      )}
                    </div>
                    <div className="mt-3">
                      <div className="text-xs text-white/60 mb-1">Puntuación global</div>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-violet-500 to-cyan-500 transition-all duration-500"
                            style={{ width: `${calculateProductScore(product)}%` }}
                          />
                        </div>
                        <span className="text-sm font-bold text-violet-400">
                          {calculateProductScore(product)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Tabla de comparación */}
            <div className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="px-4 py-3 text-left text-white/60 font-medium sticky left-0 bg-white/5 backdrop-blur-sm">
                        Especificación
                      </th>
                      {products.map(product => (
                        <th key={product.id} className="px-4 py-3 text-center min-w-[200px]">
                          <div className="space-y-2">
                            <div className="relative w-24 h-24 mx-auto">
                              <Image src={product.image} alt={product.name} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-contain" />
                            </div>
                            <div className="font-semibold text-white">{product.name}</div>
                            <div className="text-violet-400 font-bold">
                              {product.price.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}
                            </div>
                            <button
                              onClick={() => add(product.id)}
                              className="w-full px-3 py-2 rounded-lg bg-gradient-to-r from-violet-500 to-cyan-500 text-white text-sm font-semibold hover:shadow-lg transition-all"
                            >
                              Añadir al carrito
                            </button>
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {specs.map((spec, index) => (
                      <tr key={index} className="border-b border-white/10">
                        <td className="px-4 py-3 text-white/80 font-medium sticky left-0 bg-white/5 backdrop-blur-sm">
                          {spec.category}
                        </td>
                        {products.map(product => (
                          <td key={product.id} className="px-4 py-3 text-center text-white/70">
                            {spec.products[product.id]?.value || '-'}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Estado vacío */}
        {products.length === 0 && (
          <div className="text-center py-16">
            <div className="inline-block h-24 w-24 rounded-full bg-gradient-to-br from-violet-500/20 to-cyan-500/20 flex items-center justify-center mb-6">
              <svg className="h-12 w-12 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Selecciona productos para comparar</h3>
            <p className="text-white/60 max-w-md mx-auto">
              Elige hasta 3 PCs gaming de la lista superior para ver una comparación detallada de sus especificaciones.
            </p>
          </div>
        )}
      </div>

      {/* Modal para guardar comparación */}
      {showSaveModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowSaveModal(false)} />
          <div className="relative bg-black border border-white/10 rounded-2xl p-6 max-w-md w-full animate-fade-in-scale">
            <h3 className="text-xl font-bold text-white mb-4">Guardar comparación</h3>
            <input
              type="text"
              value={comparisonName}
              onChange={(e) => setComparisonName(e.target.value)}
              placeholder="Nombre de la comparación..."
              className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-violet-400 mb-4"
            />
            <div className="flex gap-3">
              <button
                onClick={() => setShowSaveModal(false)}
                className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-medium hover:bg-white/10 transition-all"
              >
                Cancelar
              </button>
              <button
                onClick={handleSaveComparison}
                disabled={!comparisonName.trim()}
                className="flex-1 px-4 py-3 rounded-xl bg-gradient-to-r from-violet-500 to-cyan-500 text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-all"
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal para cargar comparación */}
      {showLoadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowLoadModal(false)} />
          <div className="relative bg-black border border-white/10 rounded-2xl p-6 max-w-2xl w-full animate-fade-in-scale">
            <h3 className="text-xl font-bold text-white mb-4">Comparaciones guardadas</h3>
            {savedComparisons.length === 0 ? (
              <p className="text-white/60 text-center py-8">No hay comparaciones guardadas</p>
            ) : (
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {savedComparisons.map(comparison => (
                  <div key={comparison.id} className="flex items-center justify-between p-4 rounded-lg bg-white/5 border border-white/10">
                    <div className="flex-1">
                      <h4 className="font-semibold text-white">{comparison.name}</h4>
                      <p className="text-sm text-white/60">
                        {comparison.products.length} productos • {new Date(comparison.createdAt).toLocaleDateString('es-ES')}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleLoadComparison(comparison)}
                        className="px-3 py-2 rounded-lg bg-violet-500/20 text-violet-400 text-sm font-medium hover:bg-violet-500/30 transition-all"
                      >
                        Cargar
                      </button>
                      <button
                        onClick={() => handleDeleteComparison(comparison.id)}
                        className="px-3 py-2 rounded-lg bg-red-500/20 text-red-400 text-sm font-medium hover:bg-red-500/30 transition-all"
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <button
              onClick={() => setShowLoadModal(false)}
              className="mt-4 w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-medium hover:bg-white/10 transition-all"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}