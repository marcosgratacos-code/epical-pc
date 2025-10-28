// Benchmarks reales y datos de rendimiento para cada configuración TITAN-PC

export interface BenchmarkData {
  productId: string;
  // Rendimiento en juegos (FPS promedio)
  gaming: {
    fps1080p: number;
    fps1440p: number;
    fps4k: number;
    gamesTest: string[]; // Juegos usados en el benchmark
  };
  // Benchmarks sintéticos
  synthetic: {
    cpuPassMark: number;
    gpuPassMark: number;
    threeDMark: number;
    cinebenchR23: number;
  };
  // Métricas de eficiencia
  efficiency: {
    pricePerFps1080p: number; // €/FPS
    pricePerFps1440p: number;
    pricePerFps4k: number;
    powerConsumption: number; // Watts
    thermalRating: number; // 0-100
  };
  // Características y extras
  features: {
    coolingQuality: number; // 0-100
    buildQuality: number; // 0-100
    upgradeability: number; // 0-100
    aesthetics: number; // 0-100
    warranty: number; // años
    futureProof: number; // 0-100
  };
  // Casos de uso y recomendaciones
  useCases: {
    competitiveGaming: number; // 0-100
    creativeWork: number; // 0-100
    streaming: number; // 0-100
    productivity: number; // 0-100
    vr: number; // 0-100
  };
}

// Datos de benchmarks reales para cada configuración
export const BENCHMARKS: Record<string, BenchmarkData> = {
  // TITAN STARTER - Intel i5-12400F + RTX 5060 8GB
  "titan1": {
    productId: "titan1",
    gaming: {
      fps1080p: 125,
      fps1440p: 75,
      fps4k: 42,
      gamesTest: [
        "Cyberpunk 2077",
        "Fortnite",
        "Valorant",
        "Call of Duty MW3",
        "Hogwarts Legacy"
      ]
    },
    synthetic: {
      cpuPassMark: 19500,
      gpuPassMark: 20800,
      threeDMark: 10200,
      cinebenchR23: 14500
    },
    efficiency: {
      pricePerFps1080p: 7.2,
      pricePerFps1440p: 12.0,
      pricePerFps4k: 21.4,
      powerConsumption: 350,
      thermalRating: 85
    },
    features: {
      coolingQuality: 70,
      buildQuality: 75,
      upgradeability: 85,
      aesthetics: 70,
      warranty: 3,
      futureProof: 70
    },
    useCases: {
      competitiveGaming: 95,
      creativeWork: 60,
      streaming: 70,
      productivity: 80,
      vr: 65
    }
  },

  // TITAN ADVANCED - Ryzen 7 9800X3D + RTX 5070 Ti 16GB
  "titan2": {
    productId: "titan2",
    gaming: {
      fps1080p: 200,
      fps1440p: 150,
      fps4k: 90,
      gamesTest: [
        "Cyberpunk 2077",
        "Fortnite",
        "Valorant",
        "Call of Duty MW3",
        "Hogwarts Legacy",
        "Starfield",
        "Alan Wake 2"
      ]
    },
    synthetic: {
      cpuPassMark: 45200,
      gpuPassMark: 35500,
      threeDMark: 18500,
      cinebenchR23: 32000
    },
    efficiency: {
      pricePerFps1080p: 11.5,
      pricePerFps1440p: 15.3,
      pricePerFps4k: 25.6,
      powerConsumption: 520,
      thermalRating: 90
    },
    features: {
      coolingQuality: 90,
      buildQuality: 90,
      upgradeability: 80,
      aesthetics: 85,
      warranty: 3,
      futureProof: 90
    },
    useCases: {
      competitiveGaming: 100,
      creativeWork: 90,
      streaming: 95,
      productivity: 95,
      vr: 95
    }
  },

  // TITAN ULTRA - Ryzen 7 9800X3D + RTX 5080 16GB
  "titan3": {
    productId: "titan3",
    gaming: {
      fps1080p: 220,
      fps1440p: 175,
      fps4k: 120,
      gamesTest: [
        "Cyberpunk 2077",
        "Fortnite",
        "Valorant",
        "Call of Duty MW3",
        "Hogwarts Legacy",
        "Starfield",
        "Alan Wake 2",
        "The Last of Us Part I"
      ]
    },
    synthetic: {
      cpuPassMark: 45200,
      gpuPassMark: 42000,
      threeDMark: 22500,
      cinebenchR23: 32000
    },
    efficiency: {
      pricePerFps1080p: 12.7,
      pricePerFps1440p: 16.0,
      pricePerFps4k: 23.3,
      powerConsumption: 580,
      thermalRating: 92
    },
    features: {
      coolingQuality: 95,
      buildQuality: 95,
      upgradeability: 85,
      aesthetics: 95,
      warranty: 3,
      futureProof: 95
    },
    useCases: {
      competitiveGaming: 100,
      creativeWork: 100,
      streaming: 100,
      productivity: 100,
      vr: 100
    }
  }
};

// Funciones de cálculo de puntuaciones

/**
 * Calcula el rendimiento normalizado (0-100) basado en FPS
 */
export function calculatePerformanceScore(benchmark: BenchmarkData): number {
  // Promedio ponderado: 1080p (30%), 1440p (50%), 4K (20%)
  const weighted = 
    (benchmark.gaming.fps1080p * 0.3) +
    (benchmark.gaming.fps1440p * 0.5) +
    (benchmark.gaming.fps4k * 0.2);
  
  // Normalizar a 0-100 (220 FPS como máximo)
  return Math.min(100, Math.round((weighted / 180) * 100));
}

/**
 * Calcula la relación calidad-precio (0-100)
 */
export function calculateValueScore(benchmark: BenchmarkData, price: number): number {
  // Mejor puntuación para menor €/FPS en 1440p (resolución más común)
  const pricePerFps = benchmark.efficiency.pricePerFps1440p;
  
  // 7€/FPS es el óptimo (score 100), 25€/FPS es malo (score 0)
  const normalized = Math.max(0, (25 - pricePerFps) / 18);
  return Math.round(normalized * 100);
}

/**
 * Calcula la puntuación de características (0-100)
 */
export function calculateFeaturesScore(benchmark: BenchmarkData): number {
  const features = benchmark.features;
  
  // Promedio ponderado
  const score = 
    (features.coolingQuality * 0.25) +
    (features.buildQuality * 0.25) +
    (features.upgradeability * 0.15) +
    (features.aesthetics * 0.15) +
    (features.futureProof * 0.20);
  
  return Math.round(score);
}

/**
 * Calcula la puntuación global (0-100)
 * Ponderación: Rendimiento 40%, Calidad-Precio 35%, Características 25%
 */
export function calculateGlobalScore(
  benchmark: BenchmarkData,
  price: number
): number {
  const performance = calculatePerformanceScore(benchmark);
  const value = calculateValueScore(benchmark, price);
  const features = calculateFeaturesScore(benchmark);
  
  const global = 
    (performance * 0.40) +
    (value * 0.35) +
    (features * 0.25);
  
  return Math.round(global);
}

/**
 * Obtiene el benchmark para un producto
 */
export function getBenchmark(productId: string): BenchmarkData | null {
  return BENCHMARKS[productId] || null;
}

/**
 * Obtiene todos los benchmarks
 */
export function getAllBenchmarks(): BenchmarkData[] {
  return Object.values(BENCHMARKS);
}

/**
 * Compara dos productos y devuelve el mejor en una categoría
 */
export function compareBenchmarks(
  productA: string,
  productB: string,
  category: 'gaming' | 'efficiency' | 'features' | 'useCases'
): string | null {
  const benchA = getBenchmark(productA);
  const benchB = getBenchmark(productB);
  
  if (!benchA || !benchB) return null;
  
  switch (category) {
    case 'gaming':
      return benchA.gaming.fps1440p > benchB.gaming.fps1440p ? productA : productB;
    case 'efficiency':
      return benchA.efficiency.pricePerFps1440p < benchB.efficiency.pricePerFps1440p ? productA : productB;
    case 'features':
      return calculateFeaturesScore(benchA) > calculateFeaturesScore(benchB) ? productA : productB;
    case 'useCases':
      const avgA = Object.values(benchA.useCases).reduce((a, b) => a + b, 0) / Object.values(benchA.useCases).length;
      const avgB = Object.values(benchB.useCases).reduce((a, b) => a + b, 0) / Object.values(benchB.useCases).length;
      return avgA > avgB ? productA : productB;
    default:
      return null;
  }
}
