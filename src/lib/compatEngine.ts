import { CatalogProduct } from "@/types/catalog";
import {
  isCpuMoboCompatible,
  isRamCompatibleWithMobo,
  isGpuFitsCase,
  isCoolerFitsCase,
  estimateRequiredWatts,
  isPsuSufficient,
  plusRank
} from "./compatRules";

type Bucket = "CPU" | "Motherboard" | "RAM" | "GPU" | "Cooler" | "PSU" | "Storage" | "Case" | "Peripheral";

export type UpgradeSuggestion = {
  reason: string;
  score: number;
  product: CatalogProduct;
  bucket: Bucket;
};

export function buildUpgradeList(base: CatalogProduct, catalog: CatalogProduct[], coMap?: Map<string, number>) {
  // 1) Identificar piezas del PC base (si es prebuilt agrega sub-specs del propio PC)
  const mobo = catalog.find(p => p.categories.includes("Motherboard") && p.specs.moboSocket === base.specs.moboSocket) || null;
  const pcCase = catalog.find(p => p.categories.includes("Case")) || null; // si el prebuilt guarda la caja exacta, mejor

  // 2) estimación de watts (si base no tiene psuWatts)
  const requiredWatts = estimateRequiredWatts([base]);

  const suggestions: UpgradeSuggestion[] = [];

  for (const p of catalog) {
    if (p.slug === base.slug || p.stock === false) continue;

    const co = coMap?.get(p.slug) ?? 0; // opcional (de tu modelo de co-ocurrencia)

    // CPU
    if (p.categories.includes("CPU") && mobo) {
      if (isCpuMoboCompatible(p, mobo)) {
        const perfProxy = p.price; // si tienes bench, úsalo aquí
        suggestions.push({
          bucket: "CPU",
          product: p,
          score: 100 + perfProxy * 0.01 + co,
          reason: `Mismo socket ${p.specs.cpuSocket}. Upgrade de CPU.`,
        });
      }
      continue;
    }

    // RAM
    if (p.categories.includes("RAM") && mobo) {
      if (isRamCompatibleWithMobo(p, mobo)) {
        const isBigger = (p.specs.kitCapacityGB ?? 0) >= 32; // heurística
        const faster = (p.specs.ramSpeedMT ?? 0) >= (mobo.specs.ramMaxSpeedMT ?? 0) - 200;
        const baseScore = 70 + (isBigger ? 10 : 0) + (faster ? 5 : 0);
        suggestions.push({
          bucket: "RAM",
          product: p,
          score: baseScore + co,
          reason: `${p.specs.ramTypeMod} compatible. ${p.specs.kitCapacityGB}GB ${p.specs.ramSpeedMT}MT/s`,
        });
      }
      continue;
    }

    // GPU (encaje en caja y pcie)
    if (p.categories.includes("GPU") && pcCase) {
      if (isGpuFitsCase(p, pcCase)) {
        const perfProxy = p.price;
        suggestions.push({
          bucket: "GPU",
          product: p,
          score: 95 + perfProxy * 0.01 + co,
          reason: `Cabe en tu caja (${p.specs.gpuLengthMM}mm). Upgrade de GPU.`,
        });
      }
      continue;
    }

    // Cooler
    if (p.categories.includes("Cooler") && pcCase) {
      if (isCoolerFitsCase(p, pcCase)) {
        const isAio = p.specs.coolerType === "AIO";
        suggestions.push({
          bucket: "Cooler",
          product: p,
          score: 60 + (isAio ? 10 : 0) + co,
          reason: isAio ? `AIO ${p.specs.aioRadiatorMM}mm compatible con tu caja` : `Aire ${p.specs.coolerHeightMM}mm compatible`,
        });
      }
      continue;
    }

    // PSU (suficiente y con buena certificación)
    if (p.categories.includes("PSU")) {
      if (isPsuSufficient(p, requiredWatts)) {
        suggestions.push({
          bucket: "PSU",
          product: p,
          score: 65 + plusRank(p.specs.psu80Plus) * 5 + co,
          reason: `Suficiente para ${requiredWatts}W. ${p.specs.psu80Plus ?? ""}`,
        });
      }
      continue;
    }

    // Storage
    if (p.categories.includes("Storage") && mobo) {
      suggestions.push({
        bucket: "Storage",
        product: p,
        score: 40 + (p.specs.interface === "NVMe" ? 10 : 0) + co,
        reason: p.specs.formFactor === "M2" ? "M.2 NVMe para máxima velocidad" : "Almacenamiento adicional",
      });
      continue;
    }

    // Periféricos (siempre sugeribles, pondera por co-ocurrencia)
    if (p.categories.includes("Peripheral")) {
      suggestions.push({
        bucket: "Peripheral",
        product: p,
        score: 30 + co,
        reason: "Periférico recomendado por otros compradores",
      });
      continue;
    }
  }

  // ordenar dentro de cada bucket y limitar
  const byBucket = Object.groupBy(suggestions, s => s.bucket) as Record<string, UpgradeSuggestion[]>;
  (Object.keys(byBucket) as (keyof typeof byBucket)[]).forEach((b) => {
    byBucket[b]?.sort((a, b) => b.score - a.score);
    byBucket[b] = byBucket[b]?.slice(0, 4); // top 4 por categoría
  });

  // lista plana ordenada por score global
  const flat = suggestions.sort((a, b) => b.score - a.score).slice(0, 12);
  return { flat, byBucket };
}
