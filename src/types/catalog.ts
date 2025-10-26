export type NormalizedSpecs = {
  // CPU
  cpuSocket?: "AM4" | "AM5" | "LGA1700" | "LGA1851" | string;
  cpuTdpW?: number;         // TDP estimado
  cpuGen?: string;          // e.g. "Ryzen 7000", "Intel 14th"

  // Motherboard
  moboSocket?: string;
  moboChipset?: string;     // B650, X670, Z790…
  ramType?: "DDR4" | "DDR5";
  ramMaxSpeedMT?: number;   // p.ej. 7600
  ramSlots?: number;        // nº ranuras
  pcieVersion?: 3 | 4 | 5;
  m2Slots?: number;

  // RAM
  kitCapacityGB?: number;   // 32
  kitModules?: number;      // 2
  ramSpeedMT?: number;      // 6000
  ramTypeMod?: "DDR4" | "DDR5";

  // GPU
  gpuLengthMM?: number;
  gpuTdpW?: number;
  pcieGen?: 3 | 4 | 5;

  // Case
  caseGpuMaxMM?: number;
  caseCoolerMaxMM?: number;
  caseRadiatorTopMM?: 240 | 280 | 360 | number;
  caseRadiatorFrontMM?: 240 | 280 | 360 | number;

  // Cooler
  coolerType?: "AIR" | "AIO";
  coolerHeightMM?: number;
  aioRadiatorMM?: 240 | 280 | 360 | number;
  coolerTdpW?: number;

  // PSU
  psuWatts?: number;
  psu80Plus?: "Bronze" | "Gold" | "Platinum" | "Titanium";

  // Storage
  formFactor?: "M2" | "2.5" | "3.5";
  interface?: "NVMe" | "SATA";

  // Monitor/Periféricos (opc)
  panelSizeInch?: number;
  refreshHz?: number;
  resolution?: "1080p" | "1440p" | "4K";
};

export type CatalogProduct = {
  _id: string;
  slug: string;
  name: string;
  price: number;
  image?: string;
  stock?: boolean;
  categories: string[]; // p.ej. ["PC-Prebuilt"], ["Motherboard"], ["GPU"], ["PSU"], ["RAM"], ["Cooler"], ["Case"], ["Storage"], ["Peripheral"]
  specs: NormalizedSpecs;
};
