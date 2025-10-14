// app/lib/products.ts
export type Product = {
  id: string;
  slug: string;
  name: string;
  price: number;
  image: string;      // portada de la ficha
  images?: string[];  // galería (opcional)
  specs: string[];
  tag?: string;
  rating?: number;
  inStock?: boolean;
  desc?: string;
  longDesc?: string[];
  about?: string[];
  tech?: string[];
};

export const PRODUCTS: Product[] = [
  /* =========================
     CONFIG 2: INTEL + RTX 5060  → EPICAL STARTER
     PVP: 900 €
  ========================= */
  {
    id: "epic1",
    slug: "epical-starter",
    name: "EPICAL STARTER",
    price: 900, // ← ajustado
  image: "/epical_hero_setup.jpg",
  images: ["/epical_hero_setup.jpg", "/cableado-limpio-01.jpg"],
    tag: "Oferta",
    rating: 4.7,
    inStock: true,
    desc: "Buen 1080p/1440p para jugar y uso general. Muy equilibrado y silencioso.",
    specs: [
      "GPU Palit GeForce RTX 5060 Dual 8GB GDDR7",
      "CPU Intel Core i5-12400F",
      "Placa MSI PRO B760M-E DDR5 (LGA1700)",
      "RAM Corsair Vengeance DDR5 5200 16GB (2x8)",
      "SSD Kingston NV3 1TB NVMe PCIe 4.0",
      "Disipador Tempest Cooler 4pipes 120mm",
      "Caja MSI MAG Forge 100R",
      "Fuente MSI MAG A550BN 550W 80+ Bronze",
    ],
    longDesc: [
      "Excelente relación calidad/precio para un PC con componentes de primeras marcas y montaje cuidado. Ideal para jugar a 1080p/1440p, estudiar y tareas del día a día.",
      "La RTX 5060 8GB ofrece muy buen rendimiento en eSports y títulos modernos con ajustes equilibrados. El SSD NVMe y la DDR5 mantienen el sistema muy ágil.",
    ],
    about: [
      "Windows no incluido por defecto (podemos entregarlo instalado/activado).",
      "Garantía 3 años y validación térmica previa al envío.",
      "Envío 24/48h según stock. Posibles equivalencias de componentes si hubiera roturas (misma gama/rendimiento).",
    ],
    tech: [
      "NVIDIA DLSS 4 para más FPS con IA.",
      "Ray Tracing acelerado por hardware.",
      "NVIDIA Reflex para baja latencia en competitivos.",
    ],
  },

  /* =========================
     CONFIG 1: AMD + RTX 5070 Ti  → EPICAL ADVANCED
     PVP: 2300 €
  ========================= */
  {
    id: "epic2",
    slug: "epical-advanced",
    name: "EPICAL ADVANCED",
    price: 2300, // ← ajustado
  image: "/advanced-angle-01.jpg",
  images: ["/advanced-angle-01.jpg", "/advanced-internals-01.jpg"],
    tag: "Nuevo",
    rating: 4.9,
    inStock: true,
    desc: "Pensado para 1440p/4K, streaming y edición con gran fluidez.",
    specs: [
      "GPU MSI GeForce RTX 5070 Ti Ventus 3X OC 16GB",
      "CPU AMD Ryzen 7 9800X3D",
      "Placa ASUS PRIME B650M-A WIFI (AM5, DDR5)",
      "RAM Corsair Vengeance RGB DDR5 6000 32GB (2x16)",
      "SSD Kingston NV3 1TB NVMe PCIe 4.0",
      "RL Corsair Nautilus 360 ARGB",
      "Caja MSI MAG Forge 100R ARGB",
      "Fuente Corsair RM850e 850W 80+ Gold (2025)",
    ],
    longDesc: [
      "PC polivalente de alto rendimiento: juegos 1440p/4K, streaming y edición. El Ryzen 7 9800X3D destaca por sus FPS, mientras que los 32GB DDR5 y el NVMe aceleran tu flujo de trabajo.",
      "La RTX 5070 Ti rinde fuerte en ray tracing y, con DLSS 4, alcanzas tasas de refresco muy elevadas. Montaje silencioso y validado: listo para crear y competir.",
    ],
    about: [
      "Windows no incluido por defecto (opción de entrega instalado/activado, drivers y BIOS al día).",
      "3 años de garantía + informe de pruebas (temperaturas/estabilidad).",
      "Envío 24/48h. Componentes equivalentes en caso de falta puntual de stock.",
    ],
    tech: [
      "DLSS 4: generación de frames y superresolución por IA.",
      "Ray Tracing de última generación para iluminación realista.",
      "NVIDIA Reflex 2 para latencia ultrabaja.",
      "Aceleración de IA en apps de creación y productividad.",
    ],
  },

  /* =========================
     CONFIG 3: AMD + RTX 5080  → EPICAL ULTRA
     PVP: 2800 €
  ========================= */
  {
    id: "epic3",
    slug: "epical-ultra",
    name: "EPICAL ULTRA",
    price: 2800, // ← ajustado
  image: "/ultra-angle-01.jpg",
  images: ["/ultra-angle-01.jpg", "/cableado-limpio-01.jpg"],
    tag: "Top Ventas",
    rating: 5,
    inStock: true,
    desc: "4K alto framerate, VR y proyectos pesados sin despeinarse.",
    specs: [
      "GPU Palit GeForce RTX 5080 GamingPro V1 16GB",
      "CPU AMD Ryzen 7 9800X3D",
      "Placa ASUS PRIME B650M-A WIFI (AM5, DDR5)",
      "RAM Corsair Vengeance RGB DDR5 6400 64GB (2x32)",
      "SSD Samsung 990 EVO 1TB NVMe PCIe 5.0",
      "RL Corsair Nautilus 360 ARGB",
      "Caja Lian Li O11 Dynamic EVO",
      "Fuente Corsair RM850e 850W 80+ Gold (2025)",
    ],
    longDesc: [
      "La opción para quienes lo quieren todo: 4K alto framerate, VR fluida y cargas de trabajo pesadas. CPU tope de gama, 64GB DDR5 y NVMe de alta calidad para render, edición avanzada y multitarea extrema.",
      "Con la RTX 5080, el ray tracing a máxima calidad y DLSS 4 son la norma. Montaje premium con control acústico y flujo de aire optimizado.",
    ],
    about: [
      "Entrega con drivers, perfiles XMP/EXPO y BIOS al día.",
      "Garantía 3 años y soporte cercano.",
      "Envío 24/48h según stock. Equivalencias de componentes si fuera necesario.",
    ],
    tech: [
      "DLSS 4: IA para máxima fluidez en 4K.",
      "Ray Tracing a nivel cinematográfico.",
      "NVIDIA Reflex para respuesta inmediata en esports.",
      "Aceleración de IA para creación, productividad y apps de nueva generación.",
    ],
  },
];

export function getProductBySlug(slug: string): Product | null {
  return PRODUCTS.find((p) => p.slug === slug) || null;
}