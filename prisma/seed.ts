import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();

async function main() {
  const items = [
    {
      slug: "titan-starter",
      sku: "titan1",
      name: "TITAN STARTER",
      shortName: "titan1",
      price: 90000,
      inStock: true,
      tag: "OFERTA" as const,
      imageUrl: "https://picsum.photos/seed/starter/400/300",
    },
    {
      slug: "titan-advanced",
      sku: "titan2",
      name: "TITAN ADVANCED",
      shortName: "titan2",
      price: 230000,
      inStock: true,
      tag: "NUEVO" as const,
      imageUrl: "https://picsum.photos/seed/advanced/400/300",
    },
    {
      slug: "titan-ultra",
      sku: "titan3",
      name: "TITAN ULTRA",
      shortName: "titan3",
      price: 280000,
      inStock: true,
      tag: "TOP_VENTAS" as const,
      imageUrl: "https://picsum.photos/seed/ultra/400/300",
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
