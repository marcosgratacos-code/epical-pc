import { getProductBySlug } from "@/app/lib/products";
import ProductPageClient from "./ProductPageClient";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import fs from "node:fs";
import path from "node:path";
import { PHOTO_ANGLES } from "@/app/lib/product-details";

// Fotos reales: public/productos/<slug>/<ángulo>.(jpg|jpeg|png|webp|avif)
// Solo se muestran las que existen; no se sustituyen por imágenes de otros equipos.
function realShots(slug: string) {
  const dir = path.join(process.cwd(), "public", "productos", slug);
  let files: string[] = [];
  try { files = fs.readdirSync(dir); } catch { return []; }
  return PHOTO_ANGLES.flatMap((a) => {
    const f = files.find((n) => n.toLowerCase().startsWith(a.id + ".") && /[.](jpe?g|png|webp|avif)$/i.test(n));
    return f ? [{ id: a.id, label: a.label, src: `/productos/${slug}/${f}` }] : [];
  });
}

type Props = { params: Promise<{ slug: string }> };

// Generar metadata dinámica
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const product = getProductBySlug(resolvedParams.slug);

  if (!product) {
    return {
      title: "Producto no encontrado | TITAN-PC",
      description: "El producto que buscas no existe",
    };
  }

  const title = `${product.name} | TITAN-PC - PC Gaming Personalizado`;
  const description = `${product.desc || product.name} - ${product.price.toLocaleString("es-ES", { style: "currency", currency: "EUR" })}. ${product.specs.slice(0, 3).join(", ")}. Garantía 3 años, envío 24-48h.`;
  const url = `https://titan-pc.com/products/${product.slug}`;

  return {
    title,
    description,
    keywords: `${product.name}, PC gaming, ${product.specs.join(", ")}, TITAN-PC`,
    openGraph: {
      title,
      description,
      url,
      siteName: "TITAN-PC",
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
    notFound();
  }

  return <ProductPageClient product={product} shots={realShots(product.slug)} />;
}
