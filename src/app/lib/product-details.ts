// Ficha técnica por componente. Solo datos verificables del fabricante o derivados
// del nombre exacto del componente que figura en lib/products.ts.
// Si un dato no se conoce con certeza, no se incluye.

export type HardwareItem = {
  part: string; // categoría visible
  name: string; // modelo exacto, igual que en las especificaciones
  facts: string[]; // datos técnicos
};

export const PHOTO_ANGLES = [
  { id: "frontal", label: "Frontal" },
  { id: "lateral-izquierdo", label: "Lateral izquierdo" },
  { id: "lateral-derecho", label: "Lateral derecho" },
  { id: "trasera", label: "Trasera" },
  { id: "interior", label: "Interior" },
  { id: "detalle", label: "Detalle" },
] as const;

export type PhotoAngleId = (typeof PHOTO_ANGLES)[number]["id"];

export const HARDWARE: Record<string, HardwareItem[]> = {
  "titan-starter": [
    { part: "Gráfica", name: "Palit GeForce RTX 5060 Dual 8GB GDDR7", facts: ["8 GB GDDR7", "Arquitectura NVIDIA Blackwell", "Compatible con DLSS 4"] },
    { part: "Procesador", name: "Intel Core i5-12400F", facts: ["6 núcleos / 12 hilos", "2,5 GHz base, hasta 4,4 GHz en turbo", "Socket LGA1700", "Sin gráficos integrados"] },
    { part: "Placa base", name: "Gigabyte B760M E DDR5", facts: ["Chipset Intel B760", "Socket LGA1700", "Memoria DDR5", "Formato Micro-ATX"] },
    { part: "Memoria", name: "Corsair Vengeance DDR5 5200 MHz 16 GB (2x8 GB)", facts: ["16 GB en dos módulos de 8 GB", "DDR5 a 5200 MHz"] },
    { part: "Almacenamiento", name: "Kingston NV3 NVMe PCIe 4.0 1 TB", facts: ["1 TB", "NVMe sobre PCIe 4.0"] },
    { part: "Refrigeración", name: "Tempest Cooler 4Pipes 120 mm", facts: ["Disipador de aire", "Ventilador de 120 mm", "4 heatpipes"] },
    { part: "Caja", name: "MSI MAG Forge M100R RGB", facts: ["Iluminación RGB"] },
    { part: "Fuente", name: "MSI MAG A550BN 550 W", facts: ["550 W", "Certificación 80 Plus Bronze"] },
  ],
  "titan-advanced": [
    { part: "Gráfica", name: "MSI GeForce RTX 5070 Ti Ventus 3X OC 16GB", facts: ["16 GB GDDR7", "Arquitectura NVIDIA Blackwell", "Triple ventilador", "Compatible con DLSS 4"] },
    { part: "Procesador", name: "AMD Ryzen 7 9800X3D", facts: ["8 núcleos / 16 hilos", "4,7 GHz base, hasta 5,2 GHz en turbo", "96 MB de caché L3 con 3D V-Cache", "Socket AM5"] },
    { part: "Placa base", name: "ASUS PRIME B850M-A WIFI", facts: ["Chipset AMD B850", "Socket AM5", "Memoria DDR5", "Wi-Fi integrado", "Formato Micro-ATX"] },
    { part: "Memoria", name: "Corsair Vengeance RGB DDR5 6000 MHz 32 GB (2x16 GB)", facts: ["32 GB en dos módulos de 16 GB", "DDR5 a 6000 MHz", "Iluminación RGB"] },
    { part: "Almacenamiento", name: "Kingston NV3 NVMe PCIe 4.0 1 TB", facts: ["1 TB", "NVMe sobre PCIe 4.0"] },
    { part: "Refrigeración", name: "Corsair Nautilus 360 RS ARGB", facts: ["Refrigeración líquida AIO", "Radiador de 360 mm", "Iluminación ARGB"] },
    { part: "Caja", name: "MSI MAG Forge M100R RGB", facts: ["Iluminación RGB"] },
    { part: "Fuente", name: "Corsair RM850e 850 W", facts: ["850 W", "Certificación 80 Plus Gold", "Cableado modular"] },
  ],
  "titan-ultra": [
    { part: "Gráfica", name: "Palit GeForce RTX 5080 GamingPro V1 16GB", facts: ["16 GB GDDR7", "Arquitectura NVIDIA Blackwell", "Compatible con DLSS 4"] },
    { part: "Procesador", name: "AMD Ryzen 7 9800X3D", facts: ["8 núcleos / 16 hilos", "4,7 GHz base, hasta 5,2 GHz en turbo", "96 MB de caché L3 con 3D V-Cache", "Socket AM5"] },
    { part: "Placa base", name: "ASUS PRIME B850M-A WIFI", facts: ["Chipset AMD B850", "Socket AM5", "Memoria DDR5", "Wi-Fi integrado", "Formato Micro-ATX"] },
    { part: "Memoria", name: "Corsair Vengeance RGB DDR5 6000 MHz 64 GB (2x32 GB)", facts: ["64 GB en dos módulos de 32 GB", "DDR5 a 6000 MHz", "Iluminación RGB"] },
    { part: "Almacenamiento", name: "Samsung 990 EVO Plus 2 TB", facts: ["2 TB", "NVMe sobre PCIe 4.0"] },
    { part: "Refrigeración", name: "Corsair Nautilus 360 RS ARGB", facts: ["Refrigeración líquida AIO", "Radiador de 360 mm", "Iluminación ARGB"] },
    { part: "Caja", name: "Corsair 3500X LX-R RGB iCUE LINK", facts: ["Formato semitorre", "Iluminación RGB iCUE LINK"] },
    { part: "Fuente", name: "Corsair RM850e 850 W", facts: ["850 W", "Certificación 80 Plus Gold", "Cableado modular"] },
  ],
};
