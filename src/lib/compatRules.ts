import { CatalogProduct } from "@/types/catalog";

const PLUS_ORDER = ["Bronze", "Gold", "Platinum", "Titanium"] as const;

export function isCpuMoboCompatible(cpu: CatalogProduct, mobo: CatalogProduct) {
  return (
    cpu.specs.cpuSocket &&
    mobo.specs.moboSocket &&
    cpu.specs.cpuSocket.toUpperCase() === mobo.specs.moboSocket.toUpperCase()
  );
}

export function isRamCompatibleWithMobo(ram: CatalogProduct, mobo: CatalogProduct) {
  const typeOk =
    !!ram.specs.ramTypeMod &&
    !!mobo.specs.ramType &&
    ram.specs.ramTypeMod === mobo.specs.ramType;
  const speedOk =
    !mobo.specs.ramMaxSpeedMT ||
    !ram.specs.ramSpeedMT ||
    ram.specs.ramSpeedMT <= mobo.specs.ramMaxSpeedMT + 200; // pequeño margen XMP/EXPO
  return typeOk && speedOk;
}

export function isGpuFitsCase(gpu: CatalogProduct, pcCase: CatalogProduct) {
  if (!gpu.specs.gpuLengthMM || !pcCase.specs.caseGpuMaxMM) return true; // desconocido → permitir
  return gpu.specs.gpuLengthMM <= pcCase.specs.caseGpuMaxMM;
}

export function isCoolerFitsCase(cooler: CatalogProduct, pcCase: CatalogProduct) {
  if (cooler.specs.coolerType === "AIR") {
    if (!cooler.specs.coolerHeightMM || !pcCase.specs.caseCoolerMaxMM) return true;
    return cooler.specs.coolerHeightMM <= pcCase.specs.caseCoolerMaxMM;
  }
  if (cooler.specs.coolerType === "AIO") {
    const rads = [cooler.specs.aioRadiatorMM].filter(Boolean) as number[];
    const caseRads = [pcCase.specs.caseRadiatorTopMM, pcCase.specs.caseRadiatorFrontMM]
      .filter(Boolean) as number[];
    return rads.some(r => caseRads.some(cr => r <= cr));
  }
  return true;
}

export function isStorageCompatible(drive: CatalogProduct, mobo: CatalogProduct) {
  if (drive.specs.formFactor === "M2" && mobo.specs.m2Slots && mobo.specs.m2Slots > 0) return true;
  if (drive.specs.formFactor === "2.5" || drive.specs.formFactor === "3.5") return true; // asumimos bahías
  return true;
}

// Estimación de potencia necesaria con margen
export function estimateRequiredWatts(parts: CatalogProduct[]) {
  const sumTdp =
    parts.reduce((acc, p) => {
      const cpu = p.specs.cpuTdpW ?? 0;
      const gpu = p.specs.gpuTdpW ?? 0;
      const cooler = p.specs.coolerTdpW ?? 0;
      return acc + cpu + gpu + cooler;
    }, 0) + 50; // placa + discos + ventiladores aproximados

  const headroom = Math.ceil(sumTdp * 1.35); // 35% margen
  // redondeo a múltiplos estándar
  const brackets = [550, 650, 750, 850, 1000, 1200, 1500];
  return brackets.find(b => headroom <= b) ?? 1500;
}

export function isPsuSufficient(psu: CatalogProduct, requiredWatts: number) {
  return !!psu.specs.psuWatts && psu.specs.psuWatts >= requiredWatts;
}

export function plusRank(v?: string) {
  return v ? PLUS_ORDER.indexOf(v as any) : -1;
}
