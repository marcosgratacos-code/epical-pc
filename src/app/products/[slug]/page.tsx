import { getProductBySlug } from "../../lib/products";
import ProductPageClient from "./ProductPageClient";
import { Metadata } from "next";

type Props = { params: Promise<{ slug: string }> };

// Generar metadata dinámica
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const product = getProductBySlug(resolvedParams.slug);
  
  if (!product) {
    return {
      title: "Producto no encontrado | EPICAL-PC",
      description: "El producto que buscas no existe",
    };
  }

  const title = `${product.name} | EPICAL-PC - PC Gaming Personalizado`;
  const description = `${product.desc || product.name} - ${product.price.toLocaleString("es-ES", { style: "currency", currency: "EUR" })}. ${product.specs.slice(0, 3).join(", ")}. Garantía 3 años, envío 24-48h.`;
  const url = `https://epical-pc.com/products/${product.slug}`;

  return {
    title,
    description,
    keywords: `${product.name}, PC gaming, ${product.specs.join(", ")}, EPICAL-PC`,
    openGraph: {
      title,
      description,
      url,
      siteName: "EPICAL-PC",
      images: [
        {
          url: product.image,
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
      images: [product.image],
    },
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const resolvedParams = await params;
  const product = getProductBySlug(resolvedParams.slug);

  if (!product) {
    return (
      <main className="min-h-screen bg-black text-white mx-auto max-w-6xl p-6">
        <h1 className="mt-4 text-2xl font-bold">Producto no encontrado</h1>
        <p className="text-white/60 mt-2">El producto solicitado no existe.</p>
      </main>
    );
  }

  return <ProductPageClient product={product} />;
}
