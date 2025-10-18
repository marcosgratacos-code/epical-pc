"use client";

import { Product } from "../lib/products";

interface ComparisonChartsProps {
  products: Product[];
}

export default function ComparisonCharts({ products }: ComparisonChartsProps) {
  if (products.length === 0) return null;

  // Calcular puntuaciones relativas
  const maxPrice = Math.max(...products.map(p => p.price));
  const scores = products.map(p => ({
    name: p.name,
    price: ((maxPrice - p.price) / maxPrice) * 100, // Invertido: menor precio = mejor
    performance: calculatePerformanceScore(p),
    features: calculateFeaturesScore(p),
    value: calculateValueScore(p),
  }));

  const categories = ['Precio', 'Rendimiento', 'Características', 'Relación calidad-precio'];
  
  return (
    <div className="space-y-8">
      {/* Gráficas de barras por categoría */}
      <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent p-6 backdrop-blur-sm">
        <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
          <span>📊</span>
          <span>Comparación Visual</span>
        </h3>
        
        <div className="space-y-6">
          {/* Precio */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-semibold text-sm text-white/90">💰 Precio (menor es mejor)</h4>
            </div>
            <div className="space-y-2">
              {products.map((product, index) => (
                <div key={product.id} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-white/70">{product.name}</span>
                    <span className="font-semibold text-violet-400">
                      {product.price.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}
                    </span>
                  </div>
                  <div className="relative h-8 bg-white/5 rounded-lg overflow-hidden">
                    <div
                      className="absolute inset-y-0 left-0 bg-gradient-to-r from-green-500 to-emerald-400 transition-all duration-500"
                      style={{ 
                        width: `${scores[index].price}%`,
                        animationDelay: `${index * 0.1}s`,
                      }}
                    >
                      <div className="absolute inset-0 bg-white/20 animate-shimmer"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Rendimiento estimado */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-semibold text-sm text-white/90">⚡ Rendimiento Estimado</h4>
            </div>
            <div className="space-y-2">
              {products.map((product, index) => (
                <div key={product.id} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-white/70">{product.name}</span>
                    <span className="font-semibold text-blue-400">
                      {Math.round(scores[index].performance)}/100
                    </span>
                  </div>
                  <div className="relative h-8 bg-white/5 rounded-lg overflow-hidden">
                    <div
                      className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-500"
                      style={{ 
                        width: `${scores[index].performance}%`,
                        animationDelay: `${index * 0.1}s`,
                      }}
                    >
                      <div className="absolute inset-0 bg-white/20 animate-shimmer"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Características */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-semibold text-sm text-white/90">✨ Características</h4>
            </div>
            <div className="space-y-2">
              {products.map((product, index) => (
                <div key={product.id} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-white/70">{product.name}</span>
                    <span className="font-semibold text-violet-400">
                      {Math.round(scores[index].features)}/100
                    </span>
                  </div>
                  <div className="relative h-8 bg-white/5 rounded-lg overflow-hidden">
                    <div
                      className="absolute inset-y-0 left-0 bg-gradient-to-r from-violet-500 to-purple-400 transition-all duration-500"
                      style={{ 
                        width: `${scores[index].features}%`,
                        animationDelay: `${index * 0.1}s`,
                      }}
                    >
                      <div className="absolute inset-0 bg-white/20 animate-shimmer"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Relación calidad-precio */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-semibold text-sm text-white/90">🎯 Relación Calidad-Precio</h4>
            </div>
            <div className="space-y-2">
              {products.map((product, index) => (
                <div key={product.id} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-white/70">{product.name}</span>
                    <span className="font-semibold text-cyan-400">
                      {Math.round(scores[index].value)}/100
                    </span>
                  </div>
                  <div className="relative h-8 bg-white/5 rounded-lg overflow-hidden">
                    <div
                      className="absolute inset-y-0 left-0 bg-gradient-to-r from-cyan-500 to-teal-400 transition-all duration-500"
                      style={{ 
                        width: `${scores[index].value}%`,
                        animationDelay: `${index * 0.1}s`,
                      }}
                    >
                      <div className="absolute inset-0 bg-white/20 animate-shimmer"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Recomendaciones por uso */}
      <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-violet-500/10 to-cyan-500/10 p-6 backdrop-blur-sm">
        <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
          <span>🎮</span>
          <span>Recomendaciones por Uso</span>
        </h3>
        
        <div className="grid md:grid-cols-3 gap-4">
          {/* Gaming Competitivo */}
          <div className="p-4 rounded-xl bg-black/30 border border-white/10">
            <div className="flex items-center gap-2 mb-3">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-red-500/20 to-orange-500/20 flex items-center justify-center">
                <span className="text-xl">🎯</span>
              </div>
              <div>
                <h4 className="font-semibold text-sm">Gaming Competitivo</h4>
                <p className="text-xs text-white/60">eSports / FPS</p>
              </div>
            </div>
            <div className="text-sm text-white/80">
              {getBestForGaming(products)?.name || 'N/A'}
            </div>
            <p className="text-xs text-white/60 mt-2">
              Alto rendimiento en 1080p/1440p con tasas de refresco elevadas
            </p>
          </div>

          {/* Streaming / Creación */}
          <div className="p-4 rounded-xl bg-black/30 border border-white/10">
            <div className="flex items-center gap-2 mb-3">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center">
                <span className="text-xl">📹</span>
              </div>
              <div>
                <h4 className="font-semibold text-sm">Streaming / Creación</h4>
                <p className="text-xs text-white/60">Multi-tarea</p>
              </div>
            </div>
            <div className="text-sm text-white/80">
              {getBestForCreation(products)?.name || 'N/A'}
            </div>
            <p className="text-xs text-white/60 mt-2">
              CPU potente y RAM generosa para edición y streaming simultáneo
            </p>
          </div>

          {/* Mejor Valor */}
          <div className="p-4 rounded-xl bg-black/30 border border-white/10">
            <div className="flex items-center gap-2 mb-3">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-green-500/20 to-emerald-500/20 flex items-center justify-center">
                <span className="text-xl">💎</span>
              </div>
              <div>
                <h4 className="font-semibold text-sm">Mejor Valor</h4>
                <p className="text-xs text-white/60">Calidad-Precio</p>
              </div>
            </div>
            <div className="text-sm text-white/80">
              {getBestValue(products)?.name || 'N/A'}
            </div>
            <p className="text-xs text-white/60 mt-2">
              Mejor relación entre rendimiento y precio
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Funciones helper para calcular puntuaciones
function calculatePerformanceScore(product: Product): number {
  // Basado en el precio y specs (simplificado)
  let score = 50; // Base score
  
  // Bonus por CPU de alta gama
  const specs = product.specs.join(' ').toLowerCase();
  if (specs.includes('9800x3d') || specs.includes('14900k')) score += 25;
  else if (specs.includes('9700x') || specs.includes('14700')) score += 20;
  else if (specs.includes('12400') || specs.includes('7600')) score += 10;
  
  // Bonus por GPU
  if (specs.includes('5070 ti') || specs.includes('4080')) score += 25;
  else if (specs.includes('5060') || specs.includes('4060 ti')) score += 15;
  else if (specs.includes('4060')) score += 10;
  
  return Math.min(100, score);
}

function calculateFeaturesScore(product: Product): number {
  const specs = product.specs.join(' ').toLowerCase();
  let score = 40;
  
  // Bonus por características premium
  if (specs.includes('rgb')) score += 10;
  if (specs.includes('32gb')) score += 15;
  else if (specs.includes('16gb')) score += 10;
  if (specs.includes('1tb') || specs.includes('2tb')) score += 10;
  if (specs.includes('nvme')) score += 10;
  if (specs.includes('modular')) score += 10;
  if (specs.includes('wifi')) score += 5;
  
  return Math.min(100, score);
}

function calculateValueScore(product: Product): number {
  const performance = calculatePerformanceScore(product);
  const features = calculateFeaturesScore(product);
  const priceScore = (1 - (product.price / 3000)) * 100; // Normalizado a 3000€ max
  
  return (performance * 0.4 + features * 0.3 + priceScore * 0.3);
}

function getBestForGaming(products: Product[]): Product | null {
  if (products.length === 0) return null;
  return products.reduce((best, current) => 
    calculatePerformanceScore(current) > calculatePerformanceScore(best) ? current : best
  );
}

function getBestForCreation(products: Product[]): Product | null {
  if (products.length === 0) return null;
  return products.reduce((best, current) => {
    const currentSpecs = current.specs.join(' ').toLowerCase();
    const bestSpecs = best.specs.join(' ').toLowerCase();
    
    const currentRAM = currentSpecs.includes('32gb') ? 32 : 16;
    const bestRAM = bestSpecs.includes('32gb') ? 32 : 16;
    
    return currentRAM > bestRAM ? current : best;
  });
}

function getBestValue(products: Product[]): Product | null {
  if (products.length === 0) return null;
  return products.reduce((best, current) => 
    calculateValueScore(current) > calculateValueScore(best) ? current : best
  );
}

