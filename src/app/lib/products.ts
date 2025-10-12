// app/lib/products.ts
export type Product = {
  id: string;
  slug: string;
  name: string;
  price: number;
  image: string;
  specs: string[];
  tag?: string;
  rating?: number;
  inStock?: boolean;
  desc?: string;
};

export const PRODUCTS: Product[] = [
  {
    id: "epic1",
    slug: "epical-starter",
    name: "EPICAL STARTER",
    price: 999,
    image: "/logo-epical.png",
    specs: ["Ryzen 5 / i5", "RTX 5060 8GB", "16GB DDR5", "1TB NVMe"],
    tag: "Oferta",
    rating: 4.7,
    inStock: true,
    desc: "Equipo equilibrado para 1080p/1440p. Silencioso y eficiente.",
  },
  {
    id: "epic2",
    slug: "epical-advanced",
    name: "EPICAL ADVANCED",
    price: 2150,
    image: "/logo-sin-fondo.png",
    specs: ["Ryzen 7 7800X3D ", "RTX 5070 Ti", "32GB DDR5", "2TB NVMe"],
    tag: "Nuevo",
    rating: 4.9,
    inStock: true,
    desc: "Rendimiento excelente para streaming y edición. 1440p/4K.",
  },
  {
    id: "epic3",
    slug: "epical-ultra",
    name: "EPICAL ULTRA",
    price: 2800,
    image: "/logo-epical.png",
    specs: ["Ryzen 9 / i9", "RTX 5080", "64GB DDR5", "2TB NVMe samsung evo"],
    tag: "Top Ventas",
    rating: 5,
    inStock: true,
    desc: "La bestia. 4K alto framerate, VR, proyectos pesados sin sudar.",
  },
];

export const getProductBySlug = (slug: string) =>
  PRODUCTS.find(p => p.slug === slug) || null;