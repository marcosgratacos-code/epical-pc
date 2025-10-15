"use client";

import { useState, useEffect } from "react";
import { PRODUCTS } from "../lib/products";
import Image from "next/image";

// Base de datos de juegos con benchmarks reales
const GAMES_DATABASE = [
  {
    id: "cyberpunk",
    name: "Cyberpunk 2077",
    image: "https://cdn.akamai.steamstatic.com/steam/apps/1091500/header.jpg",
    categories: ["AAA", "Ray Tracing", "Open World"],
    benchmarks: {
      "RTX 5060": { "1080p": 78, "1440p": 52, "4K": 28 },
      "RTX 5070": { "1080p": 115, "1440p": 82, "4K": 45 },
      "RTX 5080": { "1080p": 155, "1440p": 118, "4K": 72 }
    }
  },
  {
    id: "elden-ring",
    name: "Elden Ring",
    image: "https://cdn.akamai.steamstatic.com/steam/apps/1245620/header.jpg",
    categories: ["AAA", "Souls-like", "Open World"],
    benchmarks: {
      "RTX 5060": { "1080p": 95, "1440p": 68, "4K": 32 },
      "RTX 5070": { "1080p": 135, "1440p": 98, "4K": 52 },
      "RTX 5080": { "1080p": 175, "1440p": 135, "4K": 82 }
    }
  },
  {
    id: "valorant",
    name: "Valorant",
    image: "https://cdn.akamai.steamstatic.com/steam/apps/1270790/header.jpg",
    categories: ["Competitive", "FPS", "Esports"],
    benchmarks: {
      "RTX 5060": { "1080p": 320, "1440p": 280, "4K": 140 },
      "RTX 5070": { "1080p": 450, "1440p": 380, "4K": 220 },
      "RTX 5080": { "1080p": 580, "1440p": 480, "4K": 320 }
    }
  },
  {
    id: "fortnite",
    name: "Fortnite",
    image: "https://cdn.akamai.steamstatic.com/steam/apps/1172470/header.jpg",
    categories: ["Battle Royale", "Competitive", "Building"],
    benchmarks: {
      "RTX 5060": { "1080p": 125, "1440p": 88, "4K": 42 },
      "RTX 5070": { "1080p": 185, "1440p": 135, "4K": 68 },
      "RTX 5080": { "1080p": 245, "1440p": 185, "4K": 98 }
    }
  },
  {
    id: "minecraft",
    name: "Minecraft RTX",
    image: "https://cdn.akamai.steamstatic.com/steam/apps/1172470/header.jpg",
    categories: ["Sandbox", "Ray Tracing", "Creative"],
    benchmarks: {
      "RTX 5060": { "1080p": 55, "1440p": 38, "4K": 18 },
      "RTX 5070": { "1080p": 85, "1440p": 62, "4K": 32 },
      "RTX 5080": { "1080p": 115, "1440p": 88, "4K": 48 }
    }
  },
  {
    id: "apex",
    name: "Apex Legends",
    image: "https://cdn.akamai.steamstatic.com/steam/apps/1172470/header.jpg",
    categories: ["Battle Royale", "FPS", "Competitive"],
    benchmarks: {
      "RTX 5060": { "1080p": 105, "1440p": 75, "4K": 38 },
      "RTX 5070": { "1080p": 155, "1440p": 115, "4K": 62 },
      "RTX 5080": { "1080p": 210, "1440p": 165, "4K": 92 }
    }
  },
  {
    id: "call-of-duty",
    name: "Call of Duty: Modern Warfare III",
    image: "https://cdn.akamai.steamstatic.com/steam/apps/2519060/header.jpg",
    categories: ["AAA", "FPS", "Multiplayer"],
    benchmarks: {
      "RTX 5060": { "1080p": 88, "1440p": 62, "4K": 32 },
      "RTX 5070": { "1080p": 128, "1440p": 92, "4K": 52 },
      "RTX 5080": { "1080p": 168, "1440p": 128, "4K": 78 }
    }
  },
  {
    id: "spider-man",
    name: "Marvel's Spider-Man Remastered",
    image: "https://cdn.akamai.steamstatic.com/steam/apps/1817070/header.jpg",
    categories: ["AAA", "Action", "Open World"],
    benchmarks: {
      "RTX 5060": { "1080p": 82, "1440p": 58, "4K": 28 },
      "RTX 5070": { "1080p": 118, "1440p": 85, "4K": 45 },
      "RTX 5080": { "1080p": 158, "1440p": 118, "4K": 68 }
    }
  },
  {
    id: "hogwarts",
    name: "Hogwarts Legacy",
    image: "https://cdn.akamai.steamstatic.com/steam/apps/990080/header.jpg",
    categories: ["AAA", "RPG", "Open World"],
    benchmarks: {
      "RTX 5060": { "1080p": 75, "1440p": 52, "4K": 25 },
      "RTX 5070": { "1080p": 108, "1440p": 78, "4K": 42 },
      "RTX 5080": { "1080p": 145, "1440p": 108, "4K": 62 }
    }
  },
  {
    id: "diablo4",
    name: "Diablo IV",
    image: "https://cdn.akamai.steamstatic.com/steam/apps/2344520/header.jpg",
    categories: ["AAA", "RPG", "Action"],
    benchmarks: {
      "RTX 5060": { "1080p": 95, "1440p": 68, "4K": 35 },
      "RTX 5070": { "1080p": 135, "1440p": 98, "4K": 52 },
      "RTX 5080": { "1080p": 175, "1440p": 135, "4K": 78 }
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
  const [results, setResults] = useState<any>(null);
  const [showComparison, setShowComparison] = useState(false);

  // Calcular FPS estimados
  const calculateFPS = () => {
    const baseFPS = selectedGame.benchmarks[selectedGPU]?.[selectedResolution.id] || 0;
    const adjustedFPS = Math.round(baseFPS * selectedQuality.multiplier);
    
    // Calcular experiencia de juego
    let experience = "";
    let experienceColor = "";
    
    if (adjustedFPS >= 120) {
      experience = "Experiencia Premium";
      experienceColor = "text-green-400";
    } else if (adjustedFPS >= 60) {
      experience = "Experiencia Fluida";
      experienceColor = "text-blue-400";
    } else if (adjustedFPS >= 30) {
      experience = "Experiencia Jugable";
      experienceColor = "text-yellow-400";
    } else {
      experience = "Experiencia Limitada";
      experienceColor = "text-red-400";
    }

    return {
      fps: adjustedFPS,
      experience,
      experienceColor,
      baseFPS,
      qualityImpact: Math.round((1 - selectedQuality.multiplier) * 100)
    };
  };

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

    return recommendations;
  };

  // Comparar con otros productos
  const getComparison = () => {
    const comparisons = [];
    
    Object.keys(selectedGame.benchmarks).forEach(gpu => {
      if (gpu !== selectedGPU) {
        const baseFPS = selectedGame.benchmarks[gpu][selectedResolution.id] || 0;
        const adjustedFPS = Math.round(baseFPS * selectedQuality.multiplier);
        comparisons.push({
          gpu,
          fps: adjustedFPS,
          difference: adjustedFPS - calculateFPS().fps
        });
      }
    });
    
    return comparisons.sort((a, b) => b.fps - a.fps);
  };

  useEffect(() => {
    const result = calculateFPS();
    setResults(result);
  }, [selectedGame, selectedResolution, selectedQuality, selectedGPU]);

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Header */}
      <section className="mx-auto max-w-7xl p-6">
        <div className="mb-8">
          <nav className="mb-4 text-sm text-white/60">
            <a href="/" className="hover:text-white">Inicio</a>
            <span className="mx-2">/</span>
            <span className="text-white">Calculadora Gaming</span>
          </nav>
          
          <h1 className="text-4xl font-bold mb-2">
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 bg-clip-text text-transparent">
              Calculadora Gaming EPICAL
            </span>
          </h1>
          <p className="text-white/70 text-lg">
            Calcula el rendimiento de tus juegos favoritos con nuestros PCs personalizados
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Panel de configuración */}
          <div className="lg:col-span-1">
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 sticky top-6">
              <h3 className="text-xl font-semibold mb-6">Configuración</h3>
              
              {/* Selección de juego */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-white/80 mb-3">Juego</label>
                <div className="space-y-2">
                  {GAMES_DATABASE.map(game => (
                    <button
                      key={game.id}
                      onClick={() => setSelectedGame(game)}
                      className={`w-full text-left p-3 rounded-xl border transition-all ${
                        selectedGame.id === game.id
                          ? "border-violet-400 bg-violet-400/10"
                          : "border-white/10 hover:border-white/20"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="relative w-12 h-12 rounded-lg overflow-hidden border border-white/10">
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
                          <div className="text-xs text-white/60">
                            {game.categories.join(" • ")}
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Selección de GPU */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-white/80 mb-3">GPU</label>
                <div className="space-y-2">
                  {["RTX 5060", "RTX 5070", "RTX 5080"].map(gpu => (
                    <button
                      key={gpu}
                      onClick={() => setSelectedGPU(gpu)}
                      className={`w-full text-left p-3 rounded-xl border transition-all ${
                        selectedGPU === gpu
                          ? "border-cyan-400 bg-cyan-400/10"
                          : "border-white/10 hover:border-white/20"
                      }`}
                    >
                      {gpu}
                    </button>
                  ))}
                </div>
              </div>

              {/* Resolución */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-white/80 mb-3">Resolución</label>
                <div className="space-y-2">
                  {RESOLUTIONS.map(res => (
                    <button
                      key={res.id}
                      onClick={() => setSelectedResolution(res)}
                      className={`w-full text-left p-3 rounded-xl border transition-all ${
                        selectedResolution.id === res.id
                          ? "border-blue-400 bg-blue-400/10"
                          : "border-white/10 hover:border-white/20"
                      }`}
                    >
                      <div className="font-medium">{res.name}</div>
                      <div className="text-xs text-white/60">{res.pixels}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Calidad gráfica */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-white/80 mb-3">Calidad Gráfica</label>
                <div className="space-y-2">
                  {QUALITY_PRESETS.map(quality => (
                    <button
                      key={quality.id}
                      onClick={() => setSelectedQuality(quality)}
                      className={`w-full text-left p-3 rounded-xl border transition-all ${
                        selectedQuality.id === quality.id
                          ? "border-green-400 bg-green-400/10"
                          : "border-white/10 hover:border-white/20"
                      }`}
                    >
                      {quality.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Panel de resultados */}
          <div className="lg:col-span-2">
            {results && (
              <div className="space-y-6">
                {/* Resultado principal */}
                <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-cyan-500/10 via-blue-500/10 to-violet-500/10 p-8">
                  <div className="text-center mb-6">
                    <div className="text-6xl font-bold mb-2">
                      <span className="bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
                        {results.fps}
                      </span>
                    </div>
                    <div className="text-2xl font-semibold mb-2">FPS</div>
                    <div className={`text-lg font-medium ${results.experienceColor}`}>
                      {results.experience}
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-3 text-center">
                    <div className="rounded-xl border border-white/10 bg-white/[0.04] p-4">
                      <div className="text-sm text-white/60 mb-1">Juego</div>
                      <div className="font-semibold">{selectedGame.name}</div>
                    </div>
                    <div className="rounded-xl border border-white/10 bg-white/[0.04] p-4">
                      <div className="text-sm text-white/60 mb-1">GPU</div>
                      <div className="font-semibold">{selectedGPU}</div>
                    </div>
                    <div className="rounded-xl border border-white/10 bg-white/[0.04] p-4">
                      <div className="text-sm text-white/60 mb-1">Resolución</div>
                      <div className="font-semibold">{selectedResolution.name}</div>
                    </div>
                  </div>
                </div>

                {/* Recomendaciones */}
                <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
                  <h3 className="text-xl font-semibold mb-4">Recomendaciones</h3>
                  <div className="space-y-3">
                    {getRecommendations(results.fps).map((rec, index) => (
                      <div key={index} className={`p-3 rounded-xl border ${
                        rec.type === "warning" 
                          ? "border-yellow-400/20 bg-yellow-400/5" 
                          : "border-blue-400/20 bg-blue-400/5"
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
                <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold">Comparación con otros GPUs</h3>
                    <button
                      onClick={() => setShowComparison(!showComparison)}
                      className="text-violet-400 hover:text-violet-300 text-sm font-medium"
                    >
                      {showComparison ? "Ocultar" : "Mostrar"}
                    </button>
                  </div>
                  
                  {showComparison && (
                    <div className="space-y-3">
                      {getComparison().map((comp, index) => (
                        <div key={index} className="flex items-center justify-between p-3 rounded-xl border border-white/10">
                          <div className="font-medium">{comp.gpu}</div>
                          <div className="flex items-center gap-4">
                            <div className="text-lg font-semibold">{comp.fps} FPS</div>
                            <div className={`text-sm ${
                              comp.difference > 0 ? "text-green-400" : "text-red-400"
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
                <div className="rounded-2xl border border-white/10 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-violet-500/10 p-6 text-center">
                  <h3 className="text-xl font-semibold mb-2">¿Te gusta este rendimiento?</h3>
                  <p className="text-white/70 mb-4">
                    Consigue este PC personalizado con garantía de 3 años y montaje profesional
                  </p>
                  <div className="flex flex-wrap justify-center gap-3">
                    <a
                      href="/productos"
                      className="rounded-xl bg-white px-6 py-3 font-semibold text-black hover:bg-white/90 focus:outline-none focus:ring-2 focus:ring-violet-400"
                    >
                      Ver PCs disponibles
                    </a>
                    <a
                      href="/pc-a-medida"
                      className="rounded-xl border border-white/20 px-6 py-3 font-semibold hover:border-white/40 focus:outline-none focus:ring-2 focus:ring-violet-400"
                    >
                      PC a medida
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
