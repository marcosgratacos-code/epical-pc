"use client";

import Image from "next/image";
import Link from "next/link";
import { Product } from "../../lib/products";
import BackButton from "../../components/BackButton";
import Accordion from "../../components/Accordion";
import ReviewSection from "../../components/ReviewSection";
import ImageGalleryZoom from "../../components/ImageGalleryZoom";
import { useCart } from "../../context/cart-context";
import { useRecentlyViewed } from "../../hooks/useRecentlyViewed";
import { useState, useEffect } from "react";
import StructuredData from "../../components/StructuredData";

interface ProductPageClientProps {
  product: Product;
}

export default function ProductPageClient({ product }: ProductPageClientProps) {
  const { add } = useCart();
  const { addToRecentlyViewed } = useRecentlyViewed();
  const [toast, setToast] = useState<{ show: boolean; msg: string }>({ show: false, msg: "" });
  
  // Agregar a vistos recientemente
  useEffect(() => {
    if (product) {
      addToRecentlyViewed(product);
    }
  }, [product, addToRecentlyViewed]);

  const gallery: string[] =
    Array.isArray((product as { images?: string[] }).images) && (product as { images: string[] }).images.length
      ? (product as { images: string[] }).images
      : [product.image];

  const eur = (n: number) =>
    new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR" }).format(n);

  const handleAdd = () => {
    add(product.id);
    setToast({ show: true, msg: `${product.name} añadido al carrito` });
    setTimeout(() => setToast({ show: false, msg: "" }), 1200);
  };

  // Structured data para SEO
  const structuredData = {
    "@context": "https://schema.org/",
    "@type": "Product",
    name: product.name,
    image: product.image,
    description: product.desc || product.name,
    brand: {
      "@type": "Brand",
      name: "EPICAL-PC",
    },
    offers: {
      "@type": "Offer",
      url: `https://epical-pc.com/products/${product.slug}`,
      priceCurrency: "EUR",
      price: product.price,
      availability: product.inStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      seller: {
        "@type": "Organization",
        name: "EPICAL-PC",
      },
    },
    aggregateRating: product.rating
      ? {
          "@type": "AggregateRating",
          ratingValue: product.rating,
          bestRating: "5",
          worstRating: "1",
        }
      : undefined,
  };

  const breadcrumbData = {
    "@context": "https://schema.org/",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Inicio",
        item: "https://epical-pc.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Productos",
        item: "https://epical-pc.com/productos",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: product.name,
        item: `https://epical-pc.com/products/${product.slug}`,
      },
    ],
  };

  return (
    <>
      <StructuredData data={structuredData} />
      <StructuredData data={breadcrumbData} />
      
      <main className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-7xl p-6">
        {/* barra superior: volver + migas */}
        <div className="mb-4 flex items-center justify-between">
          <BackButton />
          <nav className="text-sm text-white/60">
            <Link href="/" className="hover:text-white">Inicio</Link>
            <span className="mx-2">/</span>
            <Link href="/#productos" className="hover:text-white">Montajes</Link>
            <span className="mx-2">/</span>
            <span className="text-white">{product.name}</span>
          </nav>
        </div>

        {/* grid producto */}
        <div className="grid gap-8 lg:grid-cols-2">
          {/* galería */}
          <div>
            <ImageGalleryZoom images={gallery} productName={product.name} />
          </div>

          {/* info del producto */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-extrabold md:text-4xl leading-tight">
                {product.name}
              </h1>
              <p className="mt-2 text-white/70">{product.desc || product.name}</p>
            </div>

            <div className="flex items-baseline gap-4">
              <span className="text-4xl font-bold text-white">
                {eur(product.price)}
              </span>
              <span className={`rounded-lg px-3 py-1 text-sm transition-all duration-300 ${product.inStock ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                {product.inStock ? "✓ En stock" : "Sin stock"}
              </span>
            </div>

            <div>
              <h3 className="mb-3 font-semibold text-lg">Especificaciones</h3>
              <ul className="space-y-2 text-white/80">
                {product.specs.map((s, index) => (
                  <li key={s} className={`flex items-start transform transition-all duration-300 hover:translate-x-1 hover:text-white stagger-${index + 1}`}>
                    <span className="mr-2 text-cyan-400">✓</span>
                    {s}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleAdd}
                disabled={!product.inStock}
                className="flex-1 rounded-xl bg-white px-6 py-4 font-semibold text-black hover:bg-white/90 focus:outline-none focus:ring-2 focus:ring-violet-400 disabled:cursor-not-allowed disabled:bg-white/20 disabled:text-white/40 transform hover:scale-105 transition-all duration-200 hover:shadow-lg"
              >
                {product.inStock ? "Añadir al carrito" : "Sin stock"}
              </button>
              <Link
                href="/#productos"
                className="rounded-xl border border-white/20 px-6 py-4 font-semibold hover:border-white/40 focus:outline-none focus:ring-2 focus:ring-violet-400 transform hover:scale-105 transition-all duration-200 hover:shadow-lg hover-glow flex items-center justify-center"
              >
                Explorar más
              </Link>
            </div>

            <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent p-6 backdrop-blur-sm">
              <h3 className="mb-4 font-semibold text-lg">Ventajas EPICAL-PC</h3>
              <ul className="space-y-3 text-sm text-white/80">
                {[
                  "✓ 3 años de garantía completa",
                  "✓ Envío 24-48h asegurado",
                  "✓ Montaje profesional + testeo",
                  "✓ Soporte técnico WhatsApp",
                  "✓ Financiación sin intereses",
                  "✓ Devolución 30 días",
                ].map((item, index) => (
                  <li key={item} className={`transform transition-all duration-300 hover:translate-x-1 stagger-${index + 1}`}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Detalles adicionales */}
        <div className="mt-12">
          <Accordion title="Descripción completa">
            <p className="leading-relaxed text-white/80">
              El <b>{product.name}</b> es un PC gaming de alto rendimiento diseñado para
              ofrecer la mejor experiencia en tus juegos favoritos. Con componentes de
              última generación cuidadosamente seleccionados y probados, garantizamos
              estabilidad, rendimiento y durabilidad.
            </p>
            <p className="mt-4 leading-relaxed text-white/80">
              Cada componente ha sido optimizado para trabajar en perfecta armonía.
              Realizamos test de estrés, validación térmica y configuración de perfiles
              XMP/EXPO antes del envío. Incluye Windows 11 Pro activado, drivers
              instalados y actualizaciones al día.
            </p>
          </Accordion>

          <Accordion title="Garantía y devoluciones">
            <p className="leading-relaxed text-white/80">
              Ofrecemos <b>3 años de garantía completa</b> en todos nuestros montajes.
              Si tienes cualquier problema técnico, nuestro equipo te asistirá por
              WhatsApp y gestionaremos la reparación o sustitución del equipo sin coste
              adicional.
            </p>
            <p className="mt-4 leading-relaxed text-white/80">
              Además, dispones de <b>30 días</b> para devoluciones sin preguntas.
              Si no quedas satisfecho, te devolvemos el 100% del importe.
            </p>
          </Accordion>

          <Accordion title="Envío y montaje">
            <p className="leading-relaxed text-white/80">
              Realizamos el montaje profesional con gestión de cables premium, aplicamos
              pasta térmica de alta calidad y configuramos la BIOS para máximo
              rendimiento y estabilidad.
            </p>
            <p className="mt-4 leading-relaxed text-white/80">
              El envío se realiza en <b>24-48h</b> en embalaje reforzado con protección
              ESD. Recibirás tu PC listo para conectar y usar, sin necesidad de
              instalaciones adicionales.
            </p>
          </Accordion>
        </div>

        {/* Sección de reseñas */}
        <div className="mt-12">
          <ReviewSection productId={product.id} productName={product.name} />
        </div>
      </div>

      {/* Toast de confirmación */}
      {toast.show && (
        <div className="fixed bottom-20 left-1/2 z-50 -translate-x-1/2 rounded-xl border border-white/20 bg-black/90 px-4 py-2 text-sm backdrop-blur animate-fade-in-scale">
          {toast.msg}
        </div>
      )}
    </main>
    </>
  );
}

