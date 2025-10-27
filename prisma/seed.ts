import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();

async function main() {
  const items = [
    {
      slug: "titan-starter",
      sku: "titan1",
      name: "TITAN STARTER",
      shortName: "Starter",
      price: 90000,
      inStock: true,
      stockQty: 10,
      tag: "OFERTA" as const,
      imageUrl: "/epical_hero_setup.jpg",
      images: JSON.stringify(["/epical_hero_setup.jpg", "/cableado-limpio-01.jpg"]),
      description: "Excelente relación calidad/precio para un PC con componentes de primeras marcas",
      cpu: "Intel Core i5-12400F",
      gpu: "RTX 5060 8GB",
      ram: "16GB DDR5",
      storage: "1TB NVMe",
      psu: "550W Bronze",
      case: "MSI MAG Forge M100R",
    },
    {
      slug: "titan-advanced",
      sku: "titan2",
      name: "TITAN ADVANCED",
      shortName: "Advanced",
      price: 230000,
      inStock: true,
      stockQty: 5,
      tag: "NUEVO" as const,
      imageUrl: "/logo-sin-fondo.png",
      images: JSON.stringify(["/logo-sin-fondo.png", "/advanced-internals-01.jpg"]),
      description: "PC polivalente de alto rendimiento: juegos 1440p/4K, streaming y edición",
      cpu: "AMD Ryzen 7 9800X3D",
      gpu: "RTX 5070 Ti 16GB",
      ram: "32GB DDR5",
      storage: "1TB NVMe",
      psu: "850W Gold",
      case: "MSI MAG Forge M100R",
    },
    {
      slug: "titan-ultra",
      sku: "titan3",
      name: "TITAN ULTRA",
      shortName: "Ultra",
      price: 280000,
      inStock: true,
      stockQty: 3,
      tag: "TOP_VENTAS" as const,
      imageUrl: "/ultra-angle-01.jpg",
      images: JSON.stringify(["/ultra-angle-01.jpg", "/cableado-limpio-01.jpg"]),
      description: "La opción para quienes lo quieren todo: 4K alto framerate, VR y cargas pesadas",
      cpu: "AMD Ryzen 7 9800X3D",
      gpu: "RTX 5080 16GB",
      ram: "64GB DDR5",
      storage: "2TB NVMe",
      psu: "850W Gold",
      case: "Corsair 3500X",
    },
  ];
  
  for (const it of items) {
    await db.product.upsert({
      where: { slug: it.slug },
      update: it,
      create: it,
    });
  }
  
  console.log("✅ Seed completado - Productos insertados");
}

main()
  .catch((e) => {
    console.error("❌ Error en seed:", e);
    process.exit(1);
  })
  .finally(() => db.$disconnect());
