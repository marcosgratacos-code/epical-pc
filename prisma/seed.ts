import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();

async function main() {
  const items = [
    {
      slug: "epical-starter",
      sku: "epic1",
      name: "EPICAL STARTER",
      shortName: "epic1",
      price: 90000,
      inStock: true,
      tag: "OFERTA" as const,
      imageUrl: "https://picsum.photos/seed/starter/400/300",
    },
    {
      slug: "epical-advanced",
      sku: "epic2",
      name: "EPICAL ADVANCED",
      shortName: "epic2",
      price: 230000,
      inStock: true,
      tag: "NUEVO" as const,
      imageUrl: "https://picsum.photos/seed/advanced/400/300",
    },
    {
      slug: "epical-ultra",
      sku: "epic3",
      name: "EPICAL ULTRA",
      shortName: "epic3",
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
