import { prisma } from "@/lib/prisma";
import ProductosClient from "./ProductosClient";

async function getProducts() {
  try {
    const products = await prisma.product.findMany({
      orderBy: { createdAt: "desc" },
    });
    return products;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

export default async function ProductosPage() {
  const products = await getProducts();
  
  // Convertir productos de Prisma a formato Product
  const formattedProducts = products.map((p) => ({
    id: p.id,
    slug: p.slug,
    name: p.name,
    price: p.price / 100, // convertir centavos a euros
    image: p.imageUrl || "",
    images: p.images ? JSON.parse(p.images) : [],
    specs: [
      p.cpu,
      p.gpu,
      p.ram,
      p.storage,
      p.psu,
      p.case,
    ].filter(Boolean) as string[],
    tag: p.tag || undefined,
    inStock: p.inStock,
    desc: p.description || undefined,
    stockQty: p.stockQty,
  }));

  return <ProductosClient products={formattedProducts} />;
}
