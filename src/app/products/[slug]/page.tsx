import { prisma } from "@/lib/prisma";
import ProductPageClient from "./ProductPageClient";
import { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ slug: string }> };

// Generar metadata dinámica
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  
  try {
    const product = await prisma.product.findUnique({
      where: { slug: resolvedParams.slug },
    });

    if (!product) {
      return {
        title: "Producto no encontrado | TITAN-PC",
        description: "El producto que buscas no existe",
      };
    }

    const title = `${product.name} | TITAN-PC - PC Gaming Personalizado`;
    const description = `${product.description || product.name} - ${(product.price / 100).toLocaleString("es-ES", { style: "currency", currency: "EUR" })}. ${[product.cpu, product.gpu, product.ram].filter(Boolean).join(", ")}. Garantía 3 años, envío 24-48h.`;
    const url = `https://titan-pc.com/products/${product.slug}`;

    return {
      title,
      description,
      keywords: `${product.name}, PC gaming, ${[product.cpu, product.gpu, product.ram].filter(Boolean).join(", ")}, TITAN-PC`,
      openGraph: {
        title,
        description,
        url,
        siteName: "TITAN-PC",
        images: [
          {
            url: product.imageUrl || "/logo.png",
            width: 1200,
            height: 630,
            alt: product.name,
          },
        ],
        locale: "es_ES",
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: [product.imageUrl || "/logo.png"],
      },
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Producto | TITAN-PC",
      description: "PC Gaming Personalizado",
    };
  }
}

export default async function ProductDetailPage({ params }: Props) {
  const resolvedParams = await params;
  
  try {
    const product = await prisma.product.findUnique({
      where: { slug: resolvedParams.slug },
    });

    if (!product) {
      notFound();
    }

    // Convertir producto de Prisma a formato Product
    const formattedProduct = {
      id: product.id,
      slug: product.slug,
      name: product.name,
      price: product.price / 100, // convertir centavos a euros
      image: product.imageUrl || "",
      images: product.images ? JSON.parse(product.images) : [],
      specs: [
        product.cpu,
        product.gpu,
        product.ram,
        product.storage,
        product.psu,
        product.case,
      ].filter(Boolean) as string[],
      tag: product.tag || undefined,
      inStock: product.inStock,
      desc: product.description || undefined,
      stockQty: product.stockQty,
    };

    return <ProductPageClient product={formattedProduct} />;
  } catch (error) {
    console.error("Error fetching product:", error);
    notFound();
  }
}
