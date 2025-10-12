import { getProductBySlug } from "../../lib/products";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const product = getProductBySlug(params.slug);
  if (!product) {
    return {
      title: "Producto no encontrado",
      description: "El producto solicitado no existe en el catálogo de Epical-PC."
    };
  }
  return {
    title: `${product.name} | EPICAL-PC`,
    description: product.desc || undefined
  };
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = getProductBySlug(params.slug);
  if (!product) {
    return (
      <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-8">
        <h1 className="text-2xl font-bold mb-4">Producto no encontrado</h1>
        <Link href="/" className="underline text-blue-400">Volver al catálogo</Link>
      </main>
    );
  }
  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center p-8">
      <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
      <div className="relative w-full max-w-md aspect-[4/3] mb-6">
        <Image src={product.image} alt={product.name} fill className="object-contain rounded-xl border border-white/10" />
      </div>
      <div className="mb-2 text-xl font-semibold">{product.price.toLocaleString("es-ES", { style: "currency", currency: "EUR" })}</div>
      <div className="mb-4 text-white/80">{product.desc}</div>
      <ul className="mb-8 list-disc list-inside text-white/70">
        {product.specs.map((s: string) => (
          <li key={s}>{s}</li>
        ))}
      </ul>
      <Link href="/" className="underline text-blue-400">Volver al catálogo</Link>
    </main>
  );
}
