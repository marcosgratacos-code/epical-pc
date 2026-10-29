"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";

// Valores de referencia aproximados (estimaciones, no mediciones de TITAN-PC)
const GAMES_DATABASE = [
  {
    id: "cyberpunk",
    name: "Cyberpunk 2077",
    image: "https://cdn.akamai.steamstatic.com/steam/apps/1091500/header.jpg",
    categories: ["AAA", "Ray Tracing", "Open World"],
    supportsDLSS4: true,
    benchmarks: {
      "RTX 5060": { "1080p": 88, "1440p": 58, "4K": 28 },
      "RTX 5070": { "1080p": 133, "1440p": 93, "4K": 48 },
      "RTX 5080": { "1080p": 178, "1440p": 133, "4K": 78 }
    },
    dlss4Boost: {
      "RTX 5060": { "1080p": 4.0, "1440p": 4.0, "4K": 4.0 },
      "RTX 5070": { "1080p": 4.0, "1440p": 4.0, "4K": 4.0 },
      "RTX 5080": { "1080p": 4.0, "1440p": 4.0, "4K": 4.0 }
    }
  },
  {
    id: "elden-ring",
    name: "Elden Ring",
    image: "https://cdn.akamai.steamstatic.com/steam/apps/1245620/header.jpg",
    categories: ["AAA", "Souls-like", "Open World"],
    supportsDLSS4: true,
    benchmarks: {
      "RTX 5060": { "1080p": 86, "1440p": 62, "4K": 30 },
      "RTX 5070": { "1080p": 126, "1440p": 94, "4K": 50 },
      "RTX 5080": { "1080p": 166, "1440p": 126, "4K": 74 }
    },
    dlss4Boost: {
      "RTX 5060": { "1080p": 4.0, "1440p": 4.0, "4K": 4.0 },
      "RTX 5070": { "1080p": 4.0, "1440p": 4.0, "4K": 4.0 },
      "RTX 5080": { "1080p": 4.0, "1440p": 4.0, "4K": 4.0 }
    }
  },
  {
    id: "valorant",
    name: "Valorant",
    image: "https://cdn.akamai.steamstatic.com/steam/apps/1270790/header.jpg",
    categories: ["Competitive", "FPS", "Esports"],
    supportsDLSS4: false,
    benchmarks: {
      "RTX 5060": { "1080p": 384, "1440p": 336, "4K": 168 },
      "RTX 5070": { "1080p": 504, "1440p": 432, "4K": 240 },
      "RTX 5080": { "1080p": 624, "1440p": 540, "4K": 336 }
    }
  },
  {
    id: "call-of-duty",
    name: "Call of Duty: Modern Warfare III",
    image: "https://cdn.akamai.steamstatic.com/steam/apps/2519060/header.jpg",
    categories: ["AAA", "FPS", "Multiplayer"],
    supportsDLSS4: true,
    benchmarks: {
      "RTX 5060": { "1080p": 78, "1440p": 58, "4K": 26 },
      "RTX 5070": { "1080p": 114, "1440p": 86, "4K": 46 },
      "RTX 5080": { "1080p": 150, "1440p": 114, "4K": 70 }
    },
    dlss4Boost: {
      "RTX 5060": { "1080p": 4.0, "1440p": 4.0, "4K": 4.0 },
      "RTX 5070": { "1080p": 4.0, "1440p": 4.0, "4K": 4.0 },
      "RTX 5080": { "1080p": 4.0, "1440p": 4.0, "4K": 4.0 }
    }
  },
  {
    id: "spider-man",
    name: "Marvel&apos;s Spider-Man Remastered",
    image: "https://cdn.akamai.steamstatic.com/steam/apps/1817070/header.jpg",
    categories: ["AAA", "Action", "Open World"],
    supportsDLSS4: true,
    benchmarks: {
      "RTX 5060": { "1080p": 74, "1440p": 50, "4K": 22 },
      "RTX 5070": { "1080p": 106, "1440p": 78, "4K": 38 },
      "RTX 5080": { "1080p": 138, "1440p": 106, "4K": 62 }
    },
    dlss4Boost: {
      "RTX 5060": { "1080p": 4.0, "1440p": 4.0, "4K": 4.0 },
      "RTX 5070": { "1080p": 4.0, "1440p": 4.0, "4K": 4.0 },
      "RTX 5080": { "1080p": 4.0, "1440p": 4.0, "4K": 4.0 }
    }
  },
  {
    id: "hogwarts",
    name: "Hogwarts Legacy",
    image: "https://cdn.akamai.steamstatic.com/steam/apps/990080/header.jpg",
    categories: ["AAA", "RPG", "Open World"],
    supportsDLSS4: true,
    benchmarks: {
      "RTX 5060": { "1080p": 62, "1440p": 46, "4K": 22 },
      "RTX 5070": { "1080p": 90, "1440p": 70, "4K": 34 },
      "RTX 5080": { "1080p": 118, "1440p": 94, "4K": 50 }
    },
    dlss4Boost: {
      "RTX 5060": { "1080p": 4.0, "1440p": 4.0, "4K": 4.0 },
      "RTX 5070": { "1080p": 4.0, "1440p": 4.0, "4K": 4.0 },
      "RTX 5080": { "1080p": 4.0, "1440p": 4.0, "4K": 4.0 }
    }
  }
];

// Configuraciones de resolución
const RESOLUTIONS = [
  { id: "1080p", name: "1080p", pixels: "1920×1080", multiplier: 1 },
  { id: "1440p", name: "1440p", pixels: "2560×1440", multiplier: 1.78 },
  { id: "4K", name: "4K", pixels: "3840×2160", multiplier: 4 }
];

// Configuraciones de calidad gráfica
const QUALITY_PRESETS = [
  { id: "low", name: "Bajo", multiplier: 1.2 },
  { id: "medium", name: "Medio", multiplier: 1.0 },
  { id: "high", name: "Alto", multiplier: 0.8 },
  { id: "ultra", name: "Ultra", multiplier: 0.6 },
  { id: "rt", name: "Ray Tracing", multiplier: 0.4 }
];

export default function GamingCalculator() {
  const [selectedGame, setSelectedGame] = useState(GAMES_DATABASE[0]);
  const [selectedResolution, setSelectedResolution] = useState(RESOLUTIONS[0]);
  const [selectedQuality, setSelectedQuality] = useState(QUALITY_PRESETS[2]);
  const [selectedGPU, setSelectedGPU] = useState("RTX 5070");
    const [results, setResults] = useState<{
    fps: number;
    experience: string;
    experienceColor: string;
    baseFPS: number;
    qualityImpact: number;
    dlssEnabled: boolean;
  } | null>(null);
  const [showComparison, setShowComparison] = useState(false);

  // Calcular FPS estimados con DLSS 4
  const calculateFPS = useCallback(() => {
    const baseFPS = selectedGame.benchmarks[selectedGPU as keyof typeof selectedGame.benchmarks]?.[selectedResolution.id as keyof typeof selectedGame.benchmarks[keyof typeof selectedGame.benchmarks]] || 0;
    let adjustedFPS = Math.round(baseFPS * selectedQuality.multiplier);
    
    
    // Calcular experiencia de juego
    let experience = "";
    let experienceColor = "";
    
    if (adjustedFPS >= 120) {
      experience = "Experiencia Premium";
      experienceColor = "text-green-700";
    } else if (adjustedFPS >= 60) {
      experience = "Experiencia Fluida";
      experienceColor = "text-blue-600";
    } else if (adjustedFPS >= 30) {
      experience = "Experiencia Jugable";
      experienceColor = "text-yellow-400";
    } else {
      experience = "Experiencia Limitada";
      experienceColor = "text-red-700";
    }

    return {
      fps: adjustedFPS,
      experience,
      experienceColor,
      baseFPS,
      qualityImpact: Math.round((1 - selectedQuality.multiplier) * 100),
      dlssEnabled: false
    };
  }, [selectedGame, selectedGPU, selectedResolution, selectedQuality]);

  // Obtener recomendaciones
  const getRecommendations = (fps: number) => {
    const recommendations = [];
    
    if (fps < 60) {
      recommendations.push({
        type: "warning",
        message: "Considera reducir la resolución o calidad gráfica para mejor rendimiento"
      });
    }
    
    if (fps > 120 && selectedResolution.id !== "4K") {
      recommendations.push({
        type: "info",
        message: "Puedes aumentar la resolución para mejor calidad visual"
      });
    }
    
    if (selectedQuality.id === "rt" && fps < 60) {
      recommendations.push({
        type: "warning",
        message: "Ray Tracing reduce significativamente el rendimiento"
      });
    }

    if (selectedGame.supportsDLSS4) {
      recommendations.push({
        type: "info",
        message: "Este juego admite DLSS 4. El efecto depende del juego y la tarjeta (Multi Frame Generation solo en la serie RTX 50) y no está incluido en la estimación."
      });
    }

    return recommendations;
  };

  // Comparar con otros productos
  const getComparison = () => {
    const comparisons: Array<{
      gpu: string;
      fps: number;
      experience: string;
      difference: number;
    }> = [];
    
    Object.keys(selectedGame.benchmarks).forEach(gpu => {
      if (gpu !== selectedGPU) {
        const baseFPS = selectedGame.benchmarks[gpu as keyof typeof selectedGame.benchmarks][selectedResolution.id as keyof typeof selectedGame.benchmarks[keyof typeof selectedGame.benchmarks]] || 0;
        let adjustedFPS = Math.round(baseFPS * selectedQuality.multiplier);
        
        
        comparisons.push({
          gpu,
          fps: adjustedFPS,
          experience: adjustedFPS >= 60 ? "Fluido" : adjustedFPS >= 30 ? "Jugable" : "Lento",
          difference: adjustedFPS - calculateFPS().fps
        });
      }
    });
    
    return comparisons.sort((a, b) => b.fps - a.fps);
  };

  useEffect(() => {
    const result = calculateFPS();
    setResults(result);
  }, [selectedGame, selectedResolution, selectedQuality, selectedGPU, calculateFPS]);

  return (
    <main className="min-h-screen bg-white text-neutral-900">
      {/* Header */}
      <section className="mx-auto max-w-7xl p-6">
        <div className="mb-8">
          <nav className="mb-4 text-sm text-neutral-500">
            <Link href="/" className="hover:text-neutral-900">Inicio</Link>
            <span className="mx-2">/</span>
            <span className="text-neutral-900">Calculadora Gaming</span>
          </nav>
          
          <h1 className="text-4xl font-bold mb-2">
            <span className="text-neutral-900">
              Calculadora Gaming TITAN
            </span>
          </h1>
          <p className="text-neutral-600 text-lg">
            Estima el rendimiento orientativo de tus juegos favoritos
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Panel de configuración */}
          <div className="lg:col-span-1">
            <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-6 sticky top-6">
              <h3 className="text-xl font-semibold mb-6">Configuración</h3>
              
              {/* Selección de juego */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-neutral-700 mb-3">Juego</label>
                <div className="space-y-2">
                  {GAMES_DATABASE.map(game => (
                    <button
                      key={game.id}
                      onClick={() => setSelectedGame(game)}
                      className={`w-full text-left p-3 rounded-xl border transition-all ${
                        selectedGame.id === game.id
                          ? "border-blue-600 bg-blue-50"
                          : "border-neutral-200 hover:border-neutral-300"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="relative w-12 h-12 rounded-lg overflow-hidden border border-neutral-200">
                          <Image
                            src={game.image}
                            alt={game.name}
                            fill
                            className="object-cover"
                            sizes="48px"
                          />
                        </div>
                        <div>
                          <div className="font-medium">{game.name}</div>
                          <div className="text-xs text-neutral-500">
                            {game.categories.join(" • ")}
                          </div>
                          {game.supportsDLSS4 && (
                            <div className="text-xs text-blue-600">✓ DLSS 4</div>
                          )}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Selección de GPU */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-neutral-700 mb-3">GPU</label>
                <div className="space-y-2">
                  {["RTX 5060", "RTX 5070", "RTX 5080"].map(gpu => (
                    <button
                      key={gpu}
                      onClick={() => setSelectedGPU(gpu)}
                      className={`w-full text-left p-3 rounded-xl border transition-all ${
                        selectedGPU === gpu
                          ? "border-blue-600 bg-blue-50"
                          : "border-neutral-200 hover:border-neutral-300"
                      }`}
                    >
                      {gpu}
                    </button>
                  ))}
                </div>
              </div>

              {/* Resolución */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-neutral-700 mb-3">Resolución</label>
                <div className="space-y-2">
                  {RESOLUTIONS.map(res => (
                    <button
                      key={res.id}
                      onClick={() => setSelectedResolution(res)}
                      className={`w-full text-left p-3 rounded-xl border transition-all ${
                        selectedResolution.id === res.id
                          ? "border-blue-600 bg-blue-50"
                          : "border-neutral-200 hover:border-neutral-300"
                      }`}
                    >
                      <div className="font-medium">{res.name}</div>
                      <div className="text-xs text-neutral-500">{res.pixels}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Calidad gráfica */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-neutral-700 mb-3">Calidad Gráfica</label>
                <div className="space-y-2">
                  {QUALITY_PRESETS.map(quality => (
                    <button
                      key={quality.id}
                      onClick={() => setSelectedQuality(quality)}
                      className={`w-full text-left p-3 rounded-xl border transition-all ${
                        selectedQuality.id === quality.id
                          ? "border-green-400 bg-green-50"
                          : "border-neutral-200 hover:border-neutral-300"
                      }`}
                    >
                      {quality.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* DLSS 4: informativo, sin multiplicador numérico */}
              {selectedGame.supportsDLSS4 && (
                <p className="mb-6 rounded-xl border border-neutral-200 bg-white p-3 text-xs leading-relaxed text-neutral-600">
                  Este juego admite DLSS 4. No se suma a la estimación: la mejora real varía según el juego, la resolución y la tarjeta.
                </p>
              )}
            </div>
          </div>

          {/* Panel de resultados */}
          <div className="lg:col-span-2">
            {results && (
              <div className="space-y-6">
                {/* Resultado principal */}
                <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-8">
                  <div className="text-center mb-6">
                    <div className="text-6xl font-bold mb-2">
                      <span className="text-neutral-900">
                        {results.fps}
                      </span>
                    </div>
                    <div className="text-2xl font-semibold mb-2">FPS estimados</div>
                    <div className={`text-lg font-medium ${results.experienceColor}`}>
                      {results.experience}
                    </div>
                    <div className="mt-3 inline-flex items-center rounded-full border border-neutral-300 bg-white px-3 py-1 text-xs font-medium text-neutral-700">
                      Estimación · sin medición propia de TITAN-PC
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-3 text-center">
                    <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-4">
                      <div className="text-sm text-neutral-500 mb-1">Juego</div>
                      <div className="font-semibold">{selectedGame.name}</div>
                    </div>
                    <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-4">
                      <div className="text-sm text-neutral-500 mb-1">GPU</div>
                      <div className="font-semibold">{selectedGPU}</div>
                    </div>
                    <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-4">
                      <div className="text-sm text-neutral-500 mb-1">Resolución</div>
                      <div className="font-semibold">{selectedResolution.name}</div>
                    </div>
                  </div>
                </div>

                {/* Recomendaciones */}
                <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-6">
                  <h3 className="text-xl font-semibold mb-4">Recomendaciones</h3>
                  <div className="space-y-3">
                    {getRecommendations(results.fps).map((rec, index) => (
                      <div key={index} className={`p-3 rounded-xl border ${
                        rec.type === "warning" 
                          ? "border-yellow-200 bg-yellow-50" 
                          : "border-blue-200 bg-blue-50"
                      }`}>
                        <div className="flex items-center gap-2">
                          <span className="text-lg">
                            {rec.type === "warning" ? "⚠️" : "💡"}
                          </span>
                          <span className="text-sm">{rec.message}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Comparación con otros GPUs */}
                <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold">Comparación con otros GPUs</h3>
                    <button
                      onClick={() => setShowComparison(!showComparison)}
                      className="text-blue-600 hover:text-blue-600 text-sm font-medium"
                    >
                      {showComparison ? "Ocultar" : "Mostrar"}
                    </button>
                  </div>
                  
                  {showComparison && (
                    <div className="space-y-3">
                      {getComparison().map((comp, index) => (
                        <div key={index} className="flex items-center justify-between p-3 rounded-xl border border-neutral-200">
                          <div className="font-medium">{comp.gpu}</div>
                          <div className="flex items-center gap-4">
                            <div className="text-lg font-semibold">{comp.fps} FPS</div>
                            <div className={`text-sm ${
                              comp.difference > 0 ? "text-green-700" : "text-red-700"
                            }`}>
                              {comp.difference > 0 ? "+" : ""}{comp.difference}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* CTA para comprar */}
                <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-6 text-center">
                  <h3 className="text-xl font-semibold mb-2">¿Te gusta este rendimiento?</h3>
                  <p className="text-neutral-600 mb-4">
                    Consigue este PC personalizado con garantía de 3 años y montaje profesional
                  </p>
                  <div className="flex flex-wrap justify-center gap-3">
                    <a
                      href="/productos"
                      className="rounded-xl bg-neutral-900 px-6 py-3 font-semibold text-white hover:bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    >
                      Ver PCs disponibles
                    </a>
                    <a
                      href="/pc-a-medida"
                      className="rounded-xl border border-neutral-300 px-6 py-3 font-semibold hover:border-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    >
                      PC a medida
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Información sobre datos reales de 2025 */}
        <div className="mt-8 rounded-xl border border-neutral-200 bg-neutral-50 p-6">
          <h3 className="mb-4 text-lg font-semibold text-neutral-900">Cómo interpretar estos resultados</h3>
          <dl className="mb-5 grid gap-3 text-sm sm:grid-cols-3">
            <div className="rounded-lg bg-white p-3"><dt className="text-xs uppercase tracking-wide text-neutral-500">Tipo de dato</dt><dd className="mt-1 font-medium text-neutral-900">Estimación</dd></div>
            <div className="rounded-lg bg-white p-3"><dt className="text-xs uppercase tracking-wide text-neutral-500">Mediciones propias</dt><dd className="mt-1 font-medium text-neutral-900">Ninguna publicada</dd></div>
            <div className="rounded-lg bg-white p-3"><dt className="text-xs uppercase tracking-wide text-neutral-500">Método</dt><dd className="mt-1 font-medium text-neutral-900">FPS de referencia × resolución × calidad</dd></div>
          </dl>
          <div className="space-y-3 text-sm text-neutral-600">
            <p>• Los FPS son <strong>estimaciones orientativas</strong>, no mediciones realizadas por TITAN-PC.</p>
            <p>• Se extrapolan a partir de referencias de otras tarjetas gráficas y pueden diferir del resultado real.</p>
            <p>• La mejora con DLSS 4 depende del juego, la resolución y la configuración; no es un multiplicador fijo.</p>
            <p>• El rendimiento también varía con el procesador, la memoria, los controladores y la versión del juego.</p>
            <p>• Fuentes: no hay mediciones propias ni se citan reseñas concretas. Cuando TITAN-PC publique pruebas medidas (juego, versión, ajustes y fecha), se mostrarán aquí separadas de las estimaciones.</p>
          </div>
        </div>
      </section>
    </main>
  );
}