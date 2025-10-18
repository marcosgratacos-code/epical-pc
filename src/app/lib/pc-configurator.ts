// Tipos para el configurador de PC - Actualizado Octubre 2025

export interface PCComponent {
  id: string;
  name: string;
  category: 'cpu' | 'gpu' | 'ram' | 'storage' | 'motherboard' | 'psu' | 'case' | 'cooling';
  price: number;
  specs: string[];
  image: string;
  compatibility?: string[];
  recommended?: boolean;
}

export interface PCConfiguration {
  cpu: PCComponent | null;
  gpu: PCComponent | null;
  ram: PCComponent | null;
  storage: PCComponent | null;
  motherboard: PCComponent | null;
  psu: PCComponent | null;
  case: PCComponent | null;
  cooling: PCComponent | null;
}

export interface PCBuild {
  id: string;
  name: string;
  description: string;
  components: PCConfiguration;
  totalPrice: number;
  targetUse: 'gaming' | 'streaming' | 'workstation' | 'budget';
  image: string;
}

// Datos de componentes ACTUALIZADOS - Octubre 2025
export const COMPONENTS: PCComponent[] = [
  // === CPUs AMD ===
  {
    id: 'cpu-9950x',
    name: 'AMD Ryzen 9 9950X',
    category: 'cpu',
    price: 650,
    specs: ['16 cores / 32 threads', '4.3 GHz base / 5.7 GHz boost', '64MB L3 cache', 'Socket AM5', 'TDP 170W'],
    image: '/cpu-9950x.jpg',
    recommended: true
  },
  {
    id: 'cpu-9800x3d',
    name: 'AMD Ryzen 7 9800X3D',
    category: 'cpu',
    price: 520,
    specs: ['8 cores / 16 threads', '4.7 GHz base / 5.2 GHz boost', '96MB L3 cache 3D V-Cache', 'Socket AM5'],
    image: '/cpu-9800x3d.jpg',
    recommended: true
  },
  {
    id: 'cpu-7700x',
    name: 'AMD Ryzen 7 7700X',
    category: 'cpu',
    price: 320,
    specs: ['8 cores / 16 threads', '4.5 GHz base / 5.4 GHz boost', '32MB L3 cache', 'Socket AM5'],
    image: '/cpu-7700x.jpg'
  },
  {
    id: 'cpu-7600x',
    name: 'AMD Ryzen 5 7600X',
    category: 'cpu',
    price: 250,
    specs: ['6 cores / 12 threads', '4.7 GHz base / 5.3 GHz boost', '32MB L3 cache', 'Socket AM5'],
    image: '/cpu-7600x.jpg'
  },

  // === CPUs Intel ===
  {
    id: 'cpu-ultra9-285k',
    name: 'Intel Core Ultra 9 285K',
    category: 'cpu',
    price: 620,
    specs: ['24 cores (8P+16E)', '3.7 GHz base / 5.7 GHz boost', '36MB L3 cache', 'Socket LGA1851', 'Arrow Lake'],
    image: '/cpu-ultra9-285k.jpg',
    recommended: true
  },
  {
    id: 'cpu-ultra7-265k',
    name: 'Intel Core Ultra 7 265K',
    category: 'cpu',
    price: 450,
    specs: ['20 cores (8P+12E)', '3.9 GHz base / 5.5 GHz boost', '30MB L3 cache', 'Socket LGA1851'],
    image: '/cpu-ultra7-265k.jpg'
  },
  {
    id: 'cpu-ultra5-245k',
    name: 'Intel Core Ultra 5 245K',
    category: 'cpu',
    price: 310,
    specs: ['14 cores (6P+8E)', '4.2 GHz base / 5.2 GHz boost', '24MB L3 cache', 'Socket LGA1851'],
    image: '/cpu-ultra5-245k.jpg'
  },
  {
    id: 'cpu-i5-14600k',
    name: 'Intel Core i5-14600K',
    category: 'cpu',
    price: 280,
    specs: ['14 cores (6P+8E)', '3.5 GHz base / 5.3 GHz boost', '24MB L3 cache', 'Socket LGA1700'],
    image: '/cpu-i5-14600k.jpg'
  },

  // === GPUs NVIDIA RTX 50 Series ===
  {
    id: 'gpu-rtx5090',
    name: 'NVIDIA GeForce RTX 5090',
    category: 'gpu',
    price: 1999,
    specs: ['24GB GDDR7', '21760 CUDA cores', 'Boost 2.7 GHz', 'PCIe 5.0', 'Ray Tracing Gen 4', 'DLSS 4'],
    image: '/gpu-rtx5090.jpg',
    recommended: true
  },
  {
    id: 'gpu-rtx5080',
    name: 'NVIDIA GeForce RTX 5080',
    category: 'gpu',
    price: 1299,
    specs: ['16GB GDDR7', '10752 CUDA cores', 'Boost 2.6 GHz', 'PCIe 5.0', 'Ray Tracing Gen 4', 'DLSS 4'],
    image: '/gpu-rtx5080.jpg',
    recommended: true
  },
  {
    id: 'gpu-rtx5070ti',
    name: 'NVIDIA GeForce RTX 5070 Ti',
    category: 'gpu',
    price: 799,
    specs: ['16GB GDDR7', '8960 CUDA cores', 'Boost 2.5 GHz', 'PCIe 5.0', 'Ray Tracing Gen 4', 'DLSS 4'],
    image: '/gpu-rtx5070ti.jpg',
    recommended: true
  },
  {
    id: 'gpu-rtx5070',
    name: 'NVIDIA GeForce RTX 5070',
    category: 'gpu',
    price: 649,
    specs: ['12GB GDDR7', '6400 CUDA cores', 'Boost 2.5 GHz', 'PCIe 5.0', 'Ray Tracing Gen 4', 'DLSS 4'],
    image: '/gpu-rtx5070.jpg'
  },
  {
    id: 'gpu-rtx5060ti',
    name: 'NVIDIA GeForce RTX 5060 Ti',
    category: 'gpu',
    price: 449,
    specs: ['8GB GDDR7', '4864 CUDA cores', 'Boost 2.4 GHz', 'PCIe 5.0', 'DLSS 4'],
    image: '/gpu-rtx5060ti.jpg'
  },
  {
    id: 'gpu-rtx5060',
    name: 'NVIDIA GeForce RTX 5060',
    category: 'gpu',
    price: 329,
    specs: ['8GB GDDR7', '3584 CUDA cores', 'Boost 2.3 GHz', 'PCIe 5.0', 'DLSS 4'],
    image: '/gpu-rtx5060.jpg'
  },

  // === GPUs AMD Radeon RX 9000 Series ===
  {
    id: 'gpu-rx9070xt',
    name: 'AMD Radeon RX 9070 XT',
    category: 'gpu',
    price: 749,
    specs: ['16GB GDDR6', '5120 Stream Processors', 'Boost 2.8 GHz', 'PCIe 5.0', 'Ray Tracing RDNA 4', 'FSR 4'],
    image: '/gpu-rx9070xt.jpg'
  },
  {
    id: 'gpu-rx9070',
    name: 'AMD Radeon RX 9070',
    category: 'gpu',
    price: 599,
    specs: ['12GB GDDR6', '4096 Stream Processors', 'Boost 2.7 GHz', 'PCIe 5.0', 'Ray Tracing RDNA 4', 'FSR 4'],
    image: '/gpu-rx9070.jpg'
  },
  {
    id: 'gpu-rx7600xt',
    name: 'AMD Radeon RX 7600 XT',
    category: 'gpu',
    price: 349,
    specs: ['16GB GDDR6', '2048 Stream Processors', 'Boost 2.5 GHz', 'PCIe 4.0', 'FSR 3'],
    image: '/gpu-rx7600xt.jpg'
  },

  // === RAM DDR5 ===
  {
    id: 'ram-64gb-ddr5-7200',
    name: '64GB DDR5-7200 CL34',
    category: 'ram',
    price: 320,
    specs: ['64GB (2x32GB)', 'DDR5-7200 MHz', 'CL34-45-45-90', 'AMD EXPO / Intel XMP 3.0', 'RGB'],
    image: '/ram-64gb.jpg',
    recommended: true
  },
  {
    id: 'ram-32gb-ddr5-7200',
    name: '32GB DDR5-7200 CL36',
    category: 'ram',
    price: 180,
    specs: ['32GB (2x16GB)', 'DDR5-7200 MHz', 'CL36-46-46-96', 'AMD EXPO / Intel XMP 3.0', 'RGB'],
    image: '/ram-32gb.jpg',
    recommended: true
  },
  {
    id: 'ram-32gb-ddr5-6400',
    name: '32GB DDR5-6400 CL32',
    category: 'ram',
    price: 150,
    specs: ['32GB (2x16GB)', 'DDR5-6400 MHz', 'CL32-39-39-84', 'AMD EXPO / Intel XMP 3.0'],
    image: '/ram-32gb.jpg'
  },
  {
    id: 'ram-32gb-ddr5-6000',
    name: '32GB DDR5-6000 CL30',
    category: 'ram',
    price: 140,
    specs: ['32GB (2x16GB)', 'DDR5-6000 MHz', 'CL30-36-36-76', 'AMD EXPO / Intel XMP 3.0'],
    image: '/ram-32gb.jpg'
  },
  {
    id: 'ram-16gb-ddr5-6000',
    name: '16GB DDR5-6000 CL30',
    category: 'ram',
    price: 85,
    specs: ['16GB (2x8GB)', 'DDR5-6000 MHz', 'CL30-36-36-76', 'AMD EXPO / Intel XMP 3.0'],
    image: '/ram-16gb.jpg'
  },

  // === Storage NVMe Gen5 ===
  {
    id: 'ssd-4tb-nvme-gen5',
    name: '4TB NVMe Gen5 SSD',
    category: 'storage',
    price: 450,
    specs: ['4TB NVMe PCIe 5.0', '14000 MB/s read', '12000 MB/s write', 'Gen5 x4', 'DRAM Cache'],
    image: '/ssd-4tb.jpg',
    recommended: true
  },
  {
    id: 'ssd-2tb-nvme-gen5',
    name: '2TB NVMe Gen5 SSD',
    category: 'storage',
    price: 220,
    specs: ['2TB NVMe PCIe 5.0', '14000 MB/s read', '12000 MB/s write', 'Gen5 x4', 'DRAM Cache'],
    image: '/ssd-2tb.jpg',
    recommended: true
  },
  {
    id: 'ssd-2tb-nvme-gen4',
    name: '2TB NVMe Gen4 SSD',
    category: 'storage',
    price: 150,
    specs: ['2TB NVMe PCIe 4.0', '7400 MB/s read', '6800 MB/s write', 'Gen4 x4', 'DRAM Cache'],
    image: '/ssd-2tb.jpg'
  },
  {
    id: 'ssd-1tb-nvme-gen4',
    name: '1TB NVMe Gen4 SSD',
    category: 'storage',
    price: 90,
    specs: ['1TB NVMe PCIe 4.0', '7000 MB/s read', '6500 MB/s write', 'Gen4 x4'],
    image: '/ssd-1tb.jpg'
  },

  // === Motherboards AMD ===
  {
    id: 'mb-x870e-gaming',
    name: 'X870E Gaming WiFi 7',
    category: 'motherboard',
    price: 420,
    specs: ['AMD X870E', 'Socket AM5', 'DDR5 up to 8000MHz', 'PCIe 5.0 x16 + Gen5 M.2', 'WiFi 7', 'USB 4.0'],
    image: '/mb-x870e.jpg',
    compatibility: ['cpu-9950x', 'cpu-9800x3d', 'cpu-7700x', 'cpu-7600x'],
    recommended: true
  },
  {
    id: 'mb-b850-wifi',
    name: 'B850 Gaming WiFi',
    category: 'motherboard',
    price: 230,
    specs: ['AMD B850', 'Socket AM5', 'DDR5 up to 6400MHz', 'PCIe 5.0 x16', 'WiFi 6E'],
    image: '/mb-b850.jpg',
    compatibility: ['cpu-9950x', 'cpu-9800x3d', 'cpu-7700x', 'cpu-7600x']
  },

  // === Motherboards Intel ===
  {
    id: 'mb-z890-gaming',
    name: 'Z890 Gaming WiFi 7',
    category: 'motherboard',
    price: 450,
    specs: ['Intel Z890', 'Socket LGA1851', 'DDR5 up to 8400MHz', 'PCIe 5.0 x16 + Gen5 M.2', 'WiFi 7', 'Thunderbolt 5'],
    image: '/mb-z890.jpg',
    compatibility: ['cpu-ultra9-285k', 'cpu-ultra7-265k', 'cpu-ultra5-245k'],
    recommended: true
  },
  {
    id: 'mb-b760-wifi',
    name: 'B760 Gaming WiFi',
    category: 'motherboard',
    price: 180,
    specs: ['Intel B760', 'Socket LGA1700', 'DDR5 up to 5600MHz', 'PCIe 5.0 x16', 'WiFi 6E'],
    image: '/mb-b760.jpg',
    compatibility: ['cpu-i5-14600k']
  },

  // === PSUs ===
  {
    id: 'psu-1200w-titanium',
    name: '1200W 80+ Titanium',
    category: 'psu',
    price: 350,
    specs: ['1200W', '80+ Titanium (94% efficiency)', 'Fully modular', 'PCIe 5.0 12VHPWR cables', '135mm fan'],
    image: '/psu-1200w.jpg',
    recommended: true
  },
  {
    id: 'psu-1000w-platinum',
    name: '1000W 80+ Platinum',
    category: 'psu',
    price: 220,
    specs: ['1000W', '80+ Platinum (92% efficiency)', 'Fully modular', 'PCIe 5.0 ready', '140mm fan'],
    image: '/psu-1000w.jpg',
    recommended: true
  },
  {
    id: 'psu-850w-gold',
    name: '850W 80+ Gold',
    category: 'psu',
    price: 130,
    specs: ['850W', '80+ Gold (90% efficiency)', 'Fully modular', 'PCIe 5.0 ready'],
    image: '/psu-850w.jpg'
  },
  {
    id: 'psu-750w-gold',
    name: '750W 80+ Gold',
    category: 'psu',
    price: 100,
    specs: ['750W', '80+ Gold (90% efficiency)', 'Semi-modular', 'PCIe 5.0 adapters included'],
    image: '/psu-750w.jpg'
  },

  // === Cases ===
  {
    id: 'case-full-tower-rgb',
    name: 'Full Tower Gaming RGB',
    category: 'case',
    price: 240,
    specs: ['Full Tower E-ATX', 'Tempered glass panels', '10x RGB ARGB fans included', 'USB 4.0 Type-C', 'Cable management'],
    image: '/case-full.jpg',
    recommended: true
  },
  {
    id: 'case-mid-tower-airflow',
    name: 'Mid Tower Airflow',
    category: 'case',
    price: 120,
    specs: ['Mid Tower ATX', 'Mesh front panel', '4x 120mm fans included', 'USB 3.2 Type-C', 'Excellent airflow'],
    image: '/case-mid.jpg',
    recommended: true
  },
  {
    id: 'case-mid-tower-rgb',
    name: 'Mid Tower RGB',
    category: 'case',
    price: 100,
    specs: ['Mid Tower ATX', 'Tempered glass', '3x RGB fans', 'USB 3.0', 'Cable management'],
    image: '/case-mid.jpg'
  },

  // === Cooling ===
  {
    id: 'cooler-aio-360-argb',
    name: '360mm AIO Liquid RGB',
    category: 'cooling',
    price: 200,
    specs: ['360mm radiator', '3x 120mm ARGB fans', 'RGB pump head', 'Intel/AMD compatible', 'Quiet operation <25dB'],
    image: '/cooler-aio360.jpg',
    recommended: true
  },
  {
    id: 'cooler-aio-280',
    name: '280mm AIO Liquid',
    category: 'cooling',
    price: 140,
    specs: ['280mm radiator', '2x 140mm fans', 'RGB pump', 'Intel/AMD compatible', 'Low noise'],
    image: '/cooler-aio280.jpg'
  },
  {
    id: 'cooler-air-dual-tower',
    name: 'Dual Tower Air Cooler',
    category: 'cooling',
    price: 90,
    specs: ['Dual tower design', '2x 140mm fans', 'RGB lighting', '250W TDP', 'Very quiet'],
    image: '/cooler-air.jpg'
  },
  {
    id: 'cooler-air-tower',
    name: 'Tower Air Cooler',
    category: 'cooling',
    price: 50,
    specs: ['Single tower', '120mm fan', 'RGB', '180W TDP', 'Budget friendly'],
    image: '/cooler-air.jpg'
  }
];

// Builds predefinidos ACTUALIZADOS para Octubre 2025
export const PREDEFINED_BUILDS: PCBuild[] = [
  {
    id: 'ultra-enthusiast',
    name: 'Ultra Enthusiast 2025',
    description: 'Lo mejor de lo mejor: 4K Ultra, Ray Tracing máximo, creación de contenido profesional',
    targetUse: 'workstation',
    image: '/build-ultra.jpg',
    components: {
      cpu: COMPONENTS.find(c => c.id === 'cpu-9950x') || null,
      gpu: COMPONENTS.find(c => c.id === 'gpu-rtx5090') || null,
      ram: COMPONENTS.find(c => c.id === 'ram-64gb-ddr5-7200') || null,
      storage: COMPONENTS.find(c => c.id === 'ssd-4tb-nvme-gen5') || null,
      motherboard: COMPONENTS.find(c => c.id === 'mb-x870e-gaming') || null,
      psu: COMPONENTS.find(c => c.id === 'psu-1200w-titanium') || null,
      case: COMPONENTS.find(c => c.id === 'case-full-tower-rgb') || null,
      cooling: COMPONENTS.find(c => c.id === 'cooler-aio-360-argb') || null
    },
    totalPrice: 0
  },
  {
    id: 'gaming-pro-x3d',
    name: 'Gaming Pro X3D',
    description: 'Máximo FPS con Ryzen X3D: perfecto para 1440p/4K gaming competitivo',
    targetUse: 'gaming',
    image: '/build-gaming-pro.jpg',
    components: {
      cpu: COMPONENTS.find(c => c.id === 'cpu-9800x3d') || null,
      gpu: COMPONENTS.find(c => c.id === 'gpu-rtx5080') || null,
      ram: COMPONENTS.find(c => c.id === 'ram-32gb-ddr5-6400') || null,
      storage: COMPONENTS.find(c => c.id === 'ssd-2tb-nvme-gen5') || null,
      motherboard: COMPONENTS.find(c => c.id === 'mb-b850-wifi') || null,
      psu: COMPONENTS.find(c => c.id === 'psu-1000w-platinum') || null,
      case: COMPONENTS.find(c => c.id === 'case-mid-tower-airflow') || null,
      cooling: COMPONENTS.find(c => c.id === 'cooler-aio-280') || null
    },
    totalPrice: 0
  },
  {
    id: 'streaming-intel',
    name: 'Streaming Intel Ultra',
    description: 'Streaming + gaming simultáneo con Intel Core Ultra, NVIDIA RTX',
    targetUse: 'streaming',
    image: '/build-streaming.jpg',
    components: {
      cpu: COMPONENTS.find(c => c.id === 'cpu-ultra9-285k') || null,
      gpu: COMPONENTS.find(c => c.id === 'gpu-rtx5070ti') || null,
      ram: COMPONENTS.find(c => c.id === 'ram-32gb-ddr5-7200') || null,
      storage: COMPONENTS.find(c => c.id === 'ssd-2tb-nvme-gen4') || null,
      motherboard: COMPONENTS.find(c => c.id === 'mb-z890-gaming') || null,
      psu: COMPONENTS.find(c => c.id === 'psu-850w-gold') || null,
      case: COMPONENTS.find(c => c.id === 'case-mid-tower-rgb') || null,
      cooling: COMPONENTS.find(c => c.id === 'cooler-air-dual-tower') || null
    },
    totalPrice: 0
  },
  {
    id: 'budget-1440p',
    name: 'Budget 1440p Gaming',
    description: 'Excelente rendimiento 1440p a precio accesible',
    targetUse: 'budget',
    image: '/build-budget.jpg',
    components: {
      cpu: COMPONENTS.find(c => c.id === 'cpu-7600x') || null,
      gpu: COMPONENTS.find(c => c.id === 'gpu-rtx5060ti') || null,
      ram: COMPONENTS.find(c => c.id === 'ram-16gb-ddr5-6000') || null,
      storage: COMPONENTS.find(c => c.id === 'ssd-1tb-nvme-gen4') || null,
      motherboard: COMPONENTS.find(c => c.id === 'mb-b850-wifi') || null,
      psu: COMPONENTS.find(c => c.id === 'psu-750w-gold') || null,
      case: COMPONENTS.find(c => c.id === 'case-mid-tower-rgb') || null,
      cooling: COMPONENTS.find(c => c.id === 'cooler-air-tower') || null
    },
    totalPrice: 0
  }
];

// Calcular precio total
export function calculateTotalPrice(config: PCConfiguration): number {
  return Object.values(config).reduce((total, component) => {
    return total + (component?.price || 0);
  }, 0);
}

// Verificar compatibilidad
export function checkCompatibility(config: PCConfiguration): string[] {
  const warnings: string[] = [];
  
  // Verificar CPU y Motherboard
  if (config.cpu && config.motherboard) {
    const cpuCompatible = config.motherboard.compatibility?.includes(config.cpu.id);
    if (cpuCompatible === false) {
      warnings.push('⚠️ CPU y Motherboard no son compatibles. Verifica el socket.');
    }
  }
  
  // Verificar potencia PSU
  if (config.psu && config.gpu && config.cpu) {
    const psuWattage = parseInt(config.psu.name.match(/(\d+)W/)?.[1] || '0');
    const estimatedPower = estimatePowerConsumption(config);
    const recommendedPSU = estimatedPower * 1.3; // 30% margen de seguridad
    
    if (psuWattage < recommendedPSU) {
      warnings.push(`⚠️ PSU podría ser insuficiente. Recomendado: ${Math.ceil(recommendedPSU)}W o superior.`);
    }
  }
  
  // Verificar RAM para CPUs de gama alta
  if (config.cpu && config.ram) {
    const isHighEndCPU = config.cpu.id.includes('9950x') || config.cpu.id.includes('ultra9');
    const ramCapacity = parseInt(config.ram.name.match(/(\d+)GB/)?.[1] || '0');
    
    if (isHighEndCPU && ramCapacity < 32) {
      warnings.push('💡 Para CPUs de gama alta se recomienda al menos 32GB RAM.');
    }
  }
  
  return warnings;
}

// Estimar consumo de energía
function estimatePowerConsumption(config: PCConfiguration): number {
  let total = 0;
  
  // CPUs
  if (config.cpu) {
    const cpuId = config.cpu.id;
    if (cpuId.includes('9950x') || cpuId.includes('ultra9')) total += 250;
    else if (cpuId.includes('9800x3d') || cpuId.includes('ultra7')) total += 180;
    else if (cpuId.includes('7700x') || cpuId.includes('ultra5')) total += 140;
    else total += 120;
  }
  
  // GPUs
  if (config.gpu) {
    const gpuId = config.gpu.id;
    if (gpuId.includes('5090')) total += 575;
    else if (gpuId.includes('5080')) total += 360;
    else if (gpuId.includes('5070ti')) total += 285;
    else if (gpuId.includes('5070')) total += 220;
    else if (gpuId.includes('5060')) total += 170;
    else if (gpuId.includes('9070')) total += 250;
    else total += 150;
  }
  
  // Otros componentes
  if (config.ram) total += 20;
  if (config.storage) total += 10;
  if (config.motherboard) total += 80;
  if (config.cooling) total += 30;
  
  return total;
}