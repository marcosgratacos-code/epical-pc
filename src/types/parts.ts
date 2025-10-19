export type Socket = 'AM4' | 'AM5' | 'LGA1700' | 'LGA1851';
export type PciGen = 3 | 4 | 5;
export type RamGen = 'DDR4' | 'DDR5';
export type WifiStd = 'WiFi 6' | 'WiFi 6E' | 'WiFi 7';

export interface Price {
  eur: number;
  isOrientative?: boolean;
}

export interface StatBadge {
  label: string;
  tone: 'success' | 'warning' | 'info' | 'neutral';
}

export interface PartBase {
  id: string;
  name: string;
  brand?: string;
  images?: string[];
  price: Price;
  stock?: 'in_stock' | 'low' | 'oos';
  recommended?: boolean;
  badges?: StatBadge[];
}

export interface CPU extends PartBase {
  socket: Socket;
  cores: number;
  threads: number;
  baseGHz: number;
  boostGHz: number;
  tdpW: number;
  gen?: string;
  has3DCache?: boolean;
}

export interface Motherboard extends PartBase {
  socket: Socket;
  chipset: string;
  ramGen: RamGen;
  ramMaxMHz?: number;
  m2SlotsGen: PciGen[];
  pcieX16Gen: PciGen;
  wifi?: WifiStd;
  usbC?: boolean;
}

export interface RAM extends PartBase {
  capacityGB: number;
  kit: string;
  ramGen: RamGen;
  mhz: number;
  cl: number;
  expoXmp?: 'EXPO' | 'XMP' | 'EXPO|XMP';
  rgb?: boolean;
}

export interface GPU extends PartBase {
  vramGB: number;
  pcieGen: PciGen;
  lengthMM?: number;
  tgpW?: number;
}

export interface Storage extends PartBase {
  type: 'NVME' | 'SATA';
  capacityTB: number;
  readMBs?: number;
  writeMBs?: number;
  pcieGen?: PciGen;
}

export interface PSU extends PartBase {
  watts: number;
  standard: 'ATX 3.0' | 'ATX 3.1';
  pcie5_12vhpwr?: boolean;
  efficiency80?: 'Gold' | 'Platinum' | 'Titanium';
}

export interface Case extends PartBase {
  maxGpuLenMM?: number;
  supports360Rad?: boolean;
  fansIncluded?: number;
}

export interface Cooler extends PartBase {
  type: 'AIO' | 'Air';
  radMM?: 120 | 240 | 280 | 360;
  tdpSupportW?: number;
  compatibleSockets: Socket[];
}

export interface Build {
  cpu?: CPU;
  mb?: Motherboard;
  ram?: RAM;
  gpu?: GPU;
  storage?: Storage[];
  psu?: PSU;
  case?: Case;
  cooler?: Cooler;
  profile?: UserProfile;
  notes?: string;
}

export type UserProfile = 
  | 'Esports 1080p'
  | '4K Ultra'
  | 'Edición Vídeo'
  | 'IA/LLM'
  | 'Ofimática Silenciosa';

export type PartCategory = 'cpu' | 'mb' | 'ram' | 'gpu' | 'storage' | 'psu' | 'case' | 'cooler';

