import { Build } from '@/types/parts';

export interface CompatResult {
  ok: boolean;
  errors: string[];
  warnings: string[];
  tips: string[];
}

export function checkCompatibility(b: Build): CompatResult {
  const errors: string[] = [];
  const warnings: string[] = [];
  const tips: string[] = [];

  // CPU ↔ Placa
  if (b.cpu && b.mb && b.cpu.socket !== b.mb.socket) {
    errors.push(`La CPU (${b.cpu.socket}) no encaja con la placa (${b.mb.socket}).`);
  }

  // RAM gen
  if (b.mb && b.ram && b.mb.ramGen !== b.ram.ramGen) {
    errors.push(`La RAM ${b.ram.ramGen} no es compatible con la placa ${b.mb.ramGen}.`);
  }

  // RAM MHz techo
  if (b.mb && b.ram && b.mb.ramMaxMHz && b.ram.mhz > b.mb.ramMaxMHz) {
    warnings.push(`La RAM (${b.ram.mhz} MHz) supera el máximo estable de la placa (${b.mb.ramMaxMHz} MHz).`);
  }

  // GPU longitud ↔ caja
  if (b.gpu && b.case && b.case.maxGpuLenMM && b.gpu.lengthMM && b.gpu.lengthMM > b.case.maxGpuLenMM) {
    errors.push('La GPU no cabe en la caja (longitud).');
  }

  // AIO ↔ caja
  if (b.cooler?.type === 'AIO' && b.cooler.radMM === 360 && b.case && !b.case.supports360Rad) {
    warnings.push('La caja no soporta radiador de 360mm. Considera 240mm o cambiar caja.');
  }

  // Cooler ↔ Socket
  if (b.cpu && b.cooler && !b.cooler.compatibleSockets.includes(b.cpu.socket)) {
    errors.push(`El cooler no es compatible con el socket ${b.cpu.socket}.`);
  }

  // PSU potencia
  const estW = estimateSystemWatts(b);
  if (b.psu && estW && b.psu.watts < estW * 1.25) {
    warnings.push(`PSU justa (${b.psu.watts}W). Recomendado ≥ ${Math.ceil(estW * 1.5)}W para estabilidad.`);
  }

  // PCIe 5.0 GPU ↔ placa
  if (b.gpu && b.mb && b.gpu.pcieGen > b.mb.pcieX16Gen) {
    tips.push(`La GPU es Gen ${b.gpu.pcieGen} y la placa Gen ${b.mb.pcieX16Gen}. No afecta rendimiento real, pero toma nota.`);
  }

  // PSU ATX 3.1 con GPU de alta gama
  if (b.gpu && b.psu && b.gpu.tgpW && b.gpu.tgpW >= 300 && !b.psu.pcie5_12vhpwr) {
    tips.push('Considera una PSU con conector PCIe 5.0 12VHPWR para GPUs de alta gama.');
  }

  // Refrigeración CPU de alto TDP
  if (b.cpu && b.cooler && b.cpu.tdpW > 120 && b.cooler.type === 'Air' && b.cooler.tdpSupportW && b.cooler.tdpSupportW < b.cpu.tdpW) {
    warnings.push(`CPU de ${b.cpu.tdpW}W. El cooler de aire soporta ${b.cooler.tdpSupportW}W. Considera AIO 240/360mm.`);
  }

  // Almacenamiento mínimo
  if (!b.storage || b.storage.length === 0) {
    warnings.push('No has seleccionado almacenamiento. Necesitas al menos un SSD/HDD.');
  }

  return { ok: errors.length === 0, errors, warnings, tips };
}

export function estimateSystemWatts(b: Build): number {
  const cpu = b.cpu?.tdpW ?? 65;
  const gpu = b.gpu?.tgpW ?? 0;
  const storage = (b.storage?.length ?? 0) * 5;
  const fans = (b.case?.fansIncluded ?? 3) * 3;
  const cooler = b.cooler?.type === 'AIO' ? 20 : 5;
  const others = 30; // placa, RAM, USB, etc.
  
  return cpu + gpu + storage + fans + cooler + others;
}

export function getCompletionPercentage(b: Build): number {
  const required = ['cpu', 'mb', 'ram', 'gpu', 'psu', 'case', 'cooler'];
  const completed = required.filter(k => b[k as keyof Build]).length;
  const storageBonus = (b.storage && b.storage.length > 0) ? 1 : 0;
  return Math.round(((completed + storageBonus) / (required.length + 1)) * 100);
}

