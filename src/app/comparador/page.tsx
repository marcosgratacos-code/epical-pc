"use client";

import { useState } from "react";
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
    specs: ["gpu_brand", "gpu_model", "gpu_memory", "gpu_performance"]
  },
  {
    id: "cpu",
    name: "CPU",
    icon: "⚡",
    specs: ["cpu_brand", "cpu_model", "cpu_cores", "cpu_performance"]
  },
  {
    id: "memory",
    name: "Memoria",
    icon: "💾",
    specs: ["ram_brand", "ram_model", "ram_capacity", "ram_speed", "storage_brand", "storage_capacity", "storage_type"]
  },
  {
    id: "motherboard",
    name: "Placa Base",
    icon: "🔧",
    specs: ["motherboard_model", "socket_type", "wifi_support"]
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
  },
  {
    id: "features",
    name: "Características",
    icon: "✨",
    specs: ["dlss_support", "ray_tracing", "warranty", "delivery"]
  }
];

// Función para extraer especificaciones específicas de los specs
const extractSpecValue = (product: Product, specKey: string): string => {
  const specs = product.specs;
  
  // Extraer valores específicos basados en las especificaciones reales
  switch (specKey) {
    case "gpu_model":
      const gpuSpec = specs.find(s => s.includes("GPU") || s.includes("GeForce"));
      if (!gpuSpec) return "N/A";
      const gpuParts = gpuSpec.split("GPU ")[1]?.split(" ");
      return gpuParts ? `${gpuParts[0]} ${gpuParts[1]} ${gpuParts[2]}` : "N/A";
      
    case "gpu_brand":
      const gpuBrandSpec = specs.find(s => s.includes("GPU") || s.includes("GeForce"));
      if (!gpuBrandSpec) return "N/A";
      const gpuBrand = gpuBrandSpec.split("GPU ")[1]?.split(" ")[0];
      return gpuBrand || "N/A";
      
    case "gpu_memory":
      const gpuMemSpec = specs.find(s => s.includes("GPU") || s.includes("GeForce"));
      if (!gpuMemSpec) return "N/A";
      const gpuMem = gpuMemSpec.match(/(\d+)GB/);
      return gpuMem ? `${gpuMem[1]}GB GDDR7` : "N/A";
      
    case "gpu_performance":
      if (product.id === "epic1") return "1080p/1440p Gaming";
      if (product.id === "epic2") return "1440p/4K Gaming + Streaming";
      if (product.id === "epic3") return "4K Ultra + VR + Edición";
      return "N/A";
      
    case "cpu_model":
      const cpuSpec = specs.find(s => s.includes("CPU") || s.includes("Intel") || s.includes("AMD"));
      if (!cpuSpec) return "N/A";
      const cpuParts = cpuSpec.split("CPU ")[1]?.split(" ");
      return cpuParts ? `${cpuParts[0]} ${cpuParts[1]} ${cpuParts[2]}` : "N/A";
      
    case "cpu_brand":
      const cpuBrandSpec = specs.find(s => s.includes("CPU") || s.includes("Intel") || s.includes("AMD"));
      if (!cpuBrandSpec) return "N/A";
      const cpuBrand = cpuBrandSpec.split("CPU ")[1]?.split(" ")[0];
      return cpuBrand || "N/A";
      
    case "cpu_cores":
      if (product.id === "epic1") return "6 cores / 12 threads";
      if (product.id === "epic2") return "8 cores / 16 threads";
      if (product.id === "epic3") return "8 cores / 16 threads";
      return "N/A";
      
    case "cpu_performance":
      if (product.id === "epic1") return "Gaming + Uso General";
      if (product.id === "epic2") return "Gaming + Streaming + Edición";
      if (product.id === "epic3") return "Gaming + Edición Avanzada";
      return "N/A";
      
    case "ram_capacity":
      const ramSpec = specs.find(s => s.includes("RAM"));
      if (!ramSpec) return "N/A";
      const ram = ramSpec.match(/(\d+)GB/);
      return ram ? `${ram[1]}GB` : "N/A";
      
    case "ram_speed":
      const ramSpeedSpec = specs.find(s => s.includes("RAM"));
      if (!ramSpeedSpec) return "N/A";
      const speed = ramSpeedSpec.match(/(\d+)\s*MHz/i);
      return speed ? `${speed[1]}MHz` : "N/A";
      
    case "ram_brand":
      const ramBrandSpec = specs.find(s => s.includes("RAM"));
      if (!ramBrandSpec) return "N/A";
      // Extraer marca después de "RAM "
      const ramBrandMatch = ramBrandSpec.match(/RAM\s+([A-Za-z]+)\s+([A-Za-z]+)/);
      return ramBrandMatch ? `${ramBrandMatch[1]} ${ramBrandMatch[2]}` : "N/A";
      
    case "ram_model":
      const ramModelSpec = specs.find(s => s.includes("RAM"));
      if (!ramModelSpec) return "N/A";
      // Extraer modelo completo después de "RAM "
      const ramModelMatch = ramModelSpec.match(/RAM\s+(.+?)\s+\d+MHz/);
      return ramModelMatch ? ramModelMatch[1] : "N/A";
      
    case "storage_capacity":
      const storageSpec = specs.find(s => s.includes("SSD") || s.includes("NVMe"));
      if (!storageSpec) return "N/A";
      const storage = storageSpec.match(/(\d+)TB|(\d+)GB/);
      return storage ? `${storage[1] || storage[2]}${storage[1] ? 'TB' : 'GB'}` : "N/A";
      
    case "storage_type":
      const storageTypeSpec = specs.find(s => s.includes("SSD") || s.includes("NVMe"));
      if (!storageTypeSpec) return "N/A";
      if (storageTypeSpec.includes("PCIe 5.0")) return "NVMe PCIe 5.0";
      if (storageTypeSpec.includes("PCIe 4.0")) return "NVMe PCIe 4.0";
      if (storageTypeSpec.includes("NVMe")) return "NVMe SSD";
      if (storageTypeSpec.includes("SSD")) return "SSD";
      return "SSD";
      
    case "storage_brand":
      const storageBrandSpec = specs.find(s => s.includes("SSD"));
      if (!storageBrandSpec) return "N/A";
      // Extraer marca después de "SSD "
      const storageBrandMatch = storageBrandSpec.match(/SSD\s+([A-Za-z]+)\s+([A-Za-z]+)/);
      return storageBrandMatch ? `${storageBrandMatch[1]} ${storageBrandMatch[2]}` : "N/A";
      
    case "cooler_type":
      const coolerSpec = specs.find(s => s.includes("RL") || s.includes("Disipador") || s.includes("líquida"));
      if (!coolerSpec) return "Aire";
      if (coolerSpec.includes("360")) return "Líquida 360mm ARGB";
      if (coolerSpec.includes("240")) return "Líquida 240mm";
      if (coolerSpec.includes("RL") || coolerSpec.includes("líquida")) return "Líquida";
      return "Aire";
      
    case "case_type":
      const caseSpec = specs.find(s => s.includes("Caja"));
      if (!caseSpec) return "N/A";
      const caseParts = caseSpec.split("Caja ")[1]?.split(" ");
      return caseParts ? `${caseParts[0]} ${caseParts[1]} ${caseParts[2]}` : "N/A";
      
    case "airflow":
      if (product.id === "epic1") return "Básico";
      if (product.id === "epic2") return "Optimizado";
      if (product.id === "epic3") return "Premium";
      return "N/A";
      
    case "psu_wattage":
      const psuSpec = specs.find(s => s.includes("Fuente"));
      if (!psuSpec) return "N/A";
      const wattage = psuSpec.match(/(\d+)W/);
      return wattage ? `${wattage[1]}W` : "N/A";
      
    case "psu_efficiency":
      const psuEffSpec = specs.find(s => s.includes("Fuente"));
      if (!psuEffSpec) return "N/A";
      if (psuEffSpec.includes("80+ Gold")) return "80+ Gold";
      if (psuEffSpec.includes("80+ Bronze")) return "80+ Bronze";
      if (psuEffSpec.includes("80+")) return "80+";
      return "N/A";
      
    case "power_consumption":
      if (product.id === "epic1") return "~400W";
      if (product.id === "epic2") return "~650W";
      if (product.id === "epic3") return "~750W";
      return "N/A";
      
    case "motherboard_model":
      const mbSpec = specs.find(s => s.includes("Placa"));
      if (!mbSpec) return "N/A";
      const mbParts = mbSpec.split("Placa ")[1]?.split(" ");
      return mbParts ? `${mbParts[0]} ${mbParts[1]} ${mbParts[2]}` : "N/A";
      
    case "socket_type":
      if (product.id === "epic1") return "LGA1700 (Intel)";
      if (product.id === "epic2") return "AM5 (AMD)";
      if (product.id === "epic3") return "AM5 (AMD)";
      return "N/A";
      
    case "wifi_support":
      const wifiSpec = specs.find(s => s.includes("Placa"));
      if (!wifiSpec) return "N/A";
      return wifiSpec.includes("WIFI") ? "WiFi 6E" : "No";
      
    case "dlss_support":
      return "DLSS 4";
      
    case "ray_tracing":
      return "Ray Tracing Hardware";
      
    case "warranty":
      return "3 años";
      
    case "delivery":
      return "24/48h";
      
    default:
      return "N/A";
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
const getRecommendation = (products: Product[]): { winner: Product; reason: string; details: string[] } => {
  if (products.length === 0) return { winner: PRODUCTS[0], reason: "", details: [] };
  
  const scores = products.map(p => ({
    product: p,
    score: calculateValueScore(p),
    price: p.price,
    rating: p.rating || 0
  }));
  
  scores.sort((a, b) => b.score - a.score);
  const winner = scores[0].product;
  
  let reason = "";
  let details: string[] = [];
  
  if (winner.id === "epic1") {
    reason = "Mejor relación calidad-precio para gaming 1080p/1440p";
    details = [
      "RTX 5060 ideal para eSports y juegos modernos",
      "Intel i5-12400F con excelente rendimiento",
      "16GB DDR5 para multitarea fluida",
      "Perfecto para estudiantes y gamers casuales"
    ];
  } else if (winner.id === "epic2") {
    reason = "Equilibrio perfecto entre rendimiento y valor";
    details = [
      "RTX 5070 Ti para gaming 1440p/4K",
      "Ryzen 7 9800X3D con cache 3D para FPS máximos",
      "32GB DDR5 para streaming y edición",
      "Ideal para creadores de contenido y gamers serios"
    ];
  } else if (winner.id === "epic3") {
    reason = "Máximo rendimiento para usuarios exigentes";
    details = [
      "RTX 5080 para 4K ultra y VR",
      "64GB DDR5 para proyectos pesados",
      "SSD PCIe 5.0 de última generación",
      "Perfecto para profesionales y entusiastas"
    ];
  }
  
  return { winner, reason, details };
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

  // Función para exportar comparación en PDF (texto plano)
  const exportComparisonPDF = () => {
    const content = `
COMPARACIÓN DE PCs EPICAL
========================
Fecha: ${new Date().toLocaleDateString('es-ES')}
Hora: ${new Date().toLocaleTimeString('es-ES')}

PRODUCTOS COMPARADOS:
${selectedProducts.map((p, i) => `
${i + 1}. ${p.name}
   Precio: ${p.price}€
   Etiqueta: ${p.tag}
   Valoración: ${p.rating}/5
   Descripción: ${p.desc}
   
   ESPECIFICACIONES:
${p.specs.map(spec => `   • ${spec}`).join('\n')}
`).join('\n')}

RECOMENDACIÓN:
${recommendation.winner ? `
🏆 PRODUCTO RECOMENDADO: ${recommendation.winner.name}
💰 Precio: ${recommendation.winner.price}€
📝 Razón: ${recommendation.reason}

DETALLES ADICIONALES:
${recommendation.details.map(detail => `• ${detail}`).join('\n')}
` : 'No hay productos seleccionados para comparar'}

RESUMEN:
• Total de productos: ${selectedProducts.length}
• Rango de precios: ${Math.min(...selectedProducts.map(p => p.price))}€ - ${Math.max(...selectedProducts.map(p => p.price))}€
• Precio promedio: ${Math.round(selectedProducts.reduce((sum, p) => sum + p.price, 0) / selectedProducts.length)}€

---
Generado por EPICAL-PC Comparador
https://epical-pc.vercel.app/comparador
    `.trim();
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `comparacion-epical-${Date.now()}.txt`;
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
                  onClick={exportComparisonPDF}
                  className="text-sm text-blue-400 hover:text-blue-300"
                >
                  📋 Exportar comparación
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
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <h4 className="text-lg font-semibold text-violet-400 mb-2">
                  {recommendation.winner.name}
                </h4>
                <p className="text-white/70 mb-4">{recommendation.reason}</p>
                <div className="text-2xl font-bold mb-4">
                  {recommendation.winner.price.toLocaleString()}€
                </div>
                <div className="space-y-2">
                  {recommendation.details.map((detail, index) => (
                    <div key={index} className="flex items-start gap-2 text-sm text-white/80">
                      <span className="text-violet-400 mt-0.5">•</span>
                      <span>{detail}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex flex-col justify-center items-center gap-4">
                <div className="relative aspect-[4/3] w-full max-w-[200px] overflow-hidden rounded-xl border border-white/10">
                  <Image 
                    src={recommendation.winner.image} 
                    alt={recommendation.winner.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <Link
                  href={`/products/${recommendation.winner.slug}`}
                  className="rounded-xl bg-violet-400 px-6 py-3 font-semibold text-black hover:bg-violet-300 focus:outline-none focus:ring-2 focus:ring-violet-400"
                >
                  Ver detalles completos
                </Link>
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
