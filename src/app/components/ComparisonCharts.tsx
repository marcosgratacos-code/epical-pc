"use client";

import { Product } from "../lib/products";
import { 
  getBenchmark, 
  calculatePerformanceScore, 
  calculateValueScore, 
  calculateFeaturesScore 
} from "../lib/benchmarks";

interface ComparisonChartsProps {
  products: Product[];
}

export default function ComparisonCharts({ products }: ComparisonChartsProps) {
  if (products.length === 0) return null;

  // Calcular puntuaciones usando benchmarks reales
  const maxPrice = Math.max(...products.map(p => p.price));
  const scores = products.map(p => {
    const benchmark = getBenchmark(p.id);
    
    return {
      name: p.name,
      price: ((maxPrice - p.price) / maxPrice) * 100, // Invertido: menor precio = mejor
      performance: benchmark ? calculatePerformanceScore(benchmark) : 50,
      features: benchmark ? calculateFeaturesScore(benchmark) : 50,
      value: benchmark ? calculateValueScore(benchmark, p.price) : 50,
      benchmark: benchmark
    };
  });

  const categories = ['Precio', 'Rendimiento', 'Características', 'Relación calidad-precio'];
  
  return (
    <div className="space-y-8">
      {/* Gráficas de barras por categoría */}
      <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-6 backdrop-blur-sm">
        <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
          <span>📊</span>
          <span>Comparación Visual</span>
        </h3>
        
        <div className="space-y-6">
          {/* Precio */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-semibold text-sm text-neutral-800">💰 Precio (menor es mejor)</h4>
            </div>
            <div className="space-y-2">
              {products.map((product, index) => (
                <div key={product.id} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-neutral-600">{product.name}</span>
                    <span className="font-semibold text-blue-600">
                      {product.price.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}
                    </span>
                  </div>
                  <div className="relative h-8 bg-neutral-50 rounded-lg overflow-hidden">
                    <div
                      className="absolute inset-y-0 left-0 bg-neutral-900 transition-all duration-500 text-white"
                      style={{ 
                        width: `${scores[index].price}%`,
                        animationDelay: `${index * 0.1}s`,
                      }}
                    >
                      <div className="absolute inset-0 bg-neutral-200 animate-shimmer"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Rendimiento estimado */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-semibold text-sm text-neutral-800">⚡ Rendimiento Estimado</h4>
            </div>
            <div className="space-y-2">
              {products.map((product, index) => (
                <div key={product.id} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-neutral-600">{product.name}</span>
                    <span className="font-semibold text-blue-600">
                      {Math.round(scores[index].performance)}/100
                    </span>
                  </div>
                  <div className="relative h-8 bg-neutral-50 rounded-lg overflow-hidden">
                    <div
                      className="absolute inset-y-0 left-0 bg-neutral-900 transition-all duration-500 text-white"
                      style={{ 
                        width: `${scores[index].performance}%`,
                        animationDelay: `${index * 0.1}s`,
                      }}
                    >
                      <div className="absolute inset-0 bg-neutral-200 animate-shimmer"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Características */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-semibold text-sm text-neutral-800">✨ Características</h4>
            </div>
            <div className="space-y-2">
              {products.map((product, index) => (
                <div key={product.id} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-neutral-600">{product.name}</span>
                    <span className="font-semibold text-blue-600">
                      {Math.round(scores[index].features)}/100
                    </span>
                  </div>
                  <div className="relative h-8 bg-neutral-50 rounded-lg overflow-hidden">
                    <div
                      className="absolute inset-y-0 left-0 bg-neutral-900 transition-all duration-500 text-white"
                      style={{ 
                        width: `${scores[index].features}%`,
                        animationDelay: `${index * 0.1}s`,
                      }}
                    >
                      <div className="absolute inset-0 bg-neutral-200 animate-shimmer"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Relación calidad-precio */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-semibold text-sm text-neutral-800">🎯 Relación Calidad-Precio</h4>
            </div>
            <div className="space-y-2">
              {products.map((product, index) => (
                <div key={product.id} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-neutral-600">{product.name}</span>
                    <span className="font-semibold text-blue-600">
                      {Math.round(scores[index].value)}/100
                    </span>
                  </div>
                  <div className="relative h-8 bg-neutral-50 rounded-lg overflow-hidden">
                    <div
                      className="absolute inset-y-0 left-0 bg-neutral-900 transition-all duration-500 text-white"
                      style={{ 
                        width: `${scores[index].value}%`,
                        animationDelay: `${index * 0.1}s`,
                      }}
                    >
                      <div className="absolute inset-0 bg-neutral-200 animate-shimmer"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Rendimiento detallado (FPS) */}
      <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-6 backdrop-blur-sm">
        <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
          <span>🎯</span>
          <span>Rendimiento en Juegos (FPS Promedio)</span>
        </h3>
        
        <div className="grid md:grid-cols-3 gap-4">
          {products.map((product, index) => {
            const benchmark = scores[index].benchmark;
            if (!benchmark) return null;
            
            return (
              <div key={product.id} className="p-4 rounded-xl bg-neutral-50 border border-neutral-200">
                <div className="mb-4">
                  <h4 className="font-semibold text-neutral-900">{product.name}</h4>
                  <p className="text-xs text-neutral-500">Estimación orientativa</p>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-neutral-600">1080p Ultra</span>
                      <span className="text-sm font-bold text-green-700">{benchmark.gaming.fps1080p} FPS</span>
                    </div>
                    <div className="h-1.5 bg-neutral-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-neutral-900 text-white"
                        style={{ width: `${(benchmark.gaming.fps1080p / 240) * 100}%` }}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-neutral-600">1440p Ultra</span>
                      <span className="text-sm font-bold text-blue-600">{benchmark.gaming.fps1440p} FPS</span>
                    </div>
                    <div className="h-1.5 bg-neutral-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-neutral-900 text-white"
                        style={{ width: `${(benchmark.gaming.fps1440p / 200) * 100}%` }}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-neutral-600">4K Ultra</span>
                      <span className="text-sm font-bold text-blue-600">{benchmark.gaming.fps4k} FPS</span>
                    </div>
                    <div className="h-1.5 bg-neutral-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-neutral-900 text-white"
                        style={{ width: `${(benchmark.gaming.fps4k / 140) * 100}%` }}
                      />
                    </div>
                  </div>
                  
                  <div className="pt-2 border-t border-neutral-200">
                    <div className="text-xs text-neutral-500">
                      €/FPS (1440p): <span className="text-blue-600 font-semibold">{benchmark.efficiency.pricePerFps1440p.toFixed(2)}€</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="mt-4 p-3 rounded-lg bg-neutral-50 border border-neutral-200">
          <p className="text-xs text-neutral-500">
            💡 <strong>Nota:</strong> Los FPS y las puntuaciones son estimaciones orientativas, no mediciones realizadas por TITAN-PC. Pueden diferir del rendimiento real.
          </p>
        </div>
      </div>

      {/* Recomendaciones por uso */}
      <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-6 backdrop-blur-sm">
        <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
          <span>🎮</span>
          <span>Recomendaciones por Uso</span>
        </h3>
        
        <div className="grid md:grid-cols-3 gap-4">
          {/* Gaming Competitivo */}
          <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200">
            <div className="flex items-center gap-2 mb-3">
              <div className="h-10 w-10 rounded-full bg-neutral-50 flex items-center justify-center">
                <span className="text-xl">🎯</span>
              </div>
              <div>
                <h4 className="font-semibold text-sm">Gaming Competitivo</h4>
                <p className="text-xs text-neutral-500">eSports / FPS</p>
              </div>
            </div>
            <div className="text-sm text-neutral-700">
              {getBestForGaming(products)?.name || 'N/A'}
            </div>
            <p className="text-xs text-neutral-500 mt-2">
              Alto rendimiento en 1080p/1440p con tasas de refresco elevadas
            </p>
          </div>

          {/* Streaming / Creación */}
          <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200">
            <div className="flex items-center gap-2 mb-3">
              <div className="h-10 w-10 rounded-full bg-neutral-50 flex items-center justify-center">
                <span className="text-xl">📹</span>
              </div>
              <div>
                <h4 className="font-semibold text-sm">Streaming / Creación</h4>
                <p className="text-xs text-neutral-500">Multi-tarea</p>
              </div>
            </div>
            <div className="text-sm text-neutral-700">
              {getBestForCreation(products)?.name || 'N/A'}
            </div>
            <p className="text-xs text-neutral-500 mt-2">
              CPU potente y RAM generosa para edición y streaming simultáneo
            </p>
          </div>

          {/* Mejor Valor */}
          <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200">
            <div className="flex items-center gap-2 mb-3">
              <div className="h-10 w-10 rounded-full bg-neutral-50 flex items-center justify-center">
                <span className="text-xl">💎</span>
              </div>
              <div>
                <h4 className="font-semibold text-sm">Mejor Valor</h4>
                <p className="text-xs text-neutral-500">Calidad-Precio</p>
              </div>
            </div>
            <div className="text-sm text-neutral-700">
              {getBestValue(products)?.name || 'N/A'}
            </div>
            <p className="text-xs text-neutral-500 mt-2">
              Mejor relación entre rendimiento y precio
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Funciones helper basadas en benchmarks reales
function getBestForGaming(products: Product[]): Product | null {
  if (products.length === 0) return null;
  
  return products.reduce((best, current) => {
    const currentBench = getBenchmark(current.id);
    const bestBench = getBenchmark(best.id);
    
    if (!currentBench) return best;
    if (!bestBench) return current;
    
    // Comparar por FPS en 1440p (resolución más común)
    return currentBench.gaming.fps1440p > bestBench.gaming.fps1440p ? current : best;
  });
}

function getBestForCreation(products: Product[]): Product | null {
  if (products.length === 0) return null;
  
  return products.reduce((best, current) => {
    const currentBench = getBenchmark(current.id);
    const bestBench = getBenchmark(best.id);
    
    if (!currentBench) return best;
    if (!bestBench) return current;
    
    // Mejor para creación: mayor puntuación en useCases.creativeWork
    return currentBench.useCases.creativeWork > bestBench.useCases.creativeWork ? current : best;
  });
}

function getBestValue(products: Product[]): Product | null {
  if (products.length === 0) return null;
  
  return products.reduce((best, current) => {
    const currentBench = getBenchmark(current.id);
    const bestBench = getBenchmark(best.id);
    
    if (!currentBench) return best;
    if (!bestBench) return current;
    
    const currentValue = calculateValueScore(currentBench, current.price);
    const bestValue = calculateValueScore(bestBench, best.price);
    
    return currentValue > bestValue ? current : best;
  });
}

