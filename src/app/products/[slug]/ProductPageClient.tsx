"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Product } from "../../lib/products";
import BackButton from "../../components/BackButton";
import Accordion from "../../components/Accordion";
import ReviewSection from "../../components/ReviewSection";
import ImageGalleryZoom from "../../components/ImageGalleryZoom";
import { useCart } from "../../context/cart-context";
import { useRecentlyViewed } from "../../hooks/useRecentlyViewed";
import { useViewSession } from "../../hooks/useViewSession";
import { useState, useEffect, useRef } from "react";
import StructuredData from "../../components/StructuredData";
import { motion, AnimatePresence } from "framer-motion";
import RecentlyViewed from "../../components/RecentlyViewed";
// Temporalmente comentado - componentes async no se pueden usar en client components
// import ProductRecommendations from "./Recommendations.server";
// import Complements from "./Complements.server";
// import Upgrades from "./Upgrades.server";

interface ProductPageClientProps {
  product: Product;
}

export default function ProductPageClient({ product }: ProductPageClientProps) {
  const router = useRouter();
  const { data: session } = useSession();
  const userId = session?.user?.email || session?.user?.id;
  const { add } = useCart();
  const { addToRecentlyViewed } = useRecentlyViewed(userId);
  const sessionId = useViewSession();
  const added = useRef(false);
  const [leaving, setLeaving] = useState(false);
  
  // ✅ Añadir solo una vez por producto
  useEffect(() => {
    if (!product?.slug || added.current || !sessionId) return;
    added.current = true;

    // 1) UI local/DB breve (ya lo tienes)
    addToRecentlyViewed(product);

    // 2) Evento de vista granular (para recomendaciones)
    fetch("/api/track/view", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug: product.slug, sessionId }),
    }).catch(() => {});
  }, [product?.slug, sessionId, addToRecentlyViewed, product]);

  const gallery: string[] =
    Array.isArray((product as { images?: string[] }).images) && (product as { images: string[] }).images.length
      ? (product as { images: string[] }).images
      : [product.image];

  const eur = (n: number) =>
    new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR" }).format(n);

  const handleAdd = async () => {
    try {
      console.log("Añadiendo producto al carrito:", product.id);
      add(product.id);
      console.log("Redirigiendo a /cesta...");
      // Redirigir a la cesta inmediatamente
      await router.push("/cesta");
    } catch (error) {
      console.error("Error al añadir al carrito:", error);
    }
  };

  const handleBack = () => {
    setLeaving(true);
    setTimeout(() => router.back(), 400);
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
      name: "TITAN-PC",
    },
    offers: {
      "@type": "Offer",
      url: `https://titan-pc.com/products/${product.slug}`,
      priceCurrency: "EUR",
      price: product.price,
      availability: product.inStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      seller: {
        "@type": "Organization",
        name: "TITAN-PC",
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
        item: "https://titan-pc.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Productos",
        item: "https://titan-pc.com/productos",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: product.name,
        item: `https://titan-pc.com/products/${product.slug}`,
      },
    ],
  };

  return (
    <>
      <StructuredData data={structuredData} />
      <StructuredData data={breadcrumbData} />
      
      <AnimatePresence mode="wait">
        {!leaving && (
          <motion.main
            key={product.slug}
            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -30, filter: "blur(8px)" }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="min-h-screen bg-black text-white"
          >
          <div className="mx-auto max-w-7xl p-6">
            {/* barra superior: volver + migas */}
            <div className="mb-4 flex items-center justify-between">
              <button
                onClick={handleBack}
                className="text-white/70 hover:text-white flex items-center gap-2 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M15 18l-6-6 6-6" />
                </svg>
                Volver
              </button>
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
                  <h3 className="mb-4 font-semibold text-lg">Ventajas TITAN-PC</h3>
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
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="mt-12"
            >
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
            </motion.section>

                                                {/* Sección de reseñas */}
            <div className="mt-12">
              <ReviewSection productId={product.id} productName={product.name} />
            </div>

            {/* Componentes de recomendaciones temporalmente deshabilitados
                - ProductRecommendations
                - Complements  
                - Upgrades
                Estos son server components y no funcionan dentro de client components */}

            {/* Vistos recientemente */}
            <RecentlyViewed />
          </div>
          </motion.main>
        )}

        {/* Overlay de salida animado */}
        {leaving && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(8px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="text-white text-lg font-semibold"
            >
              Regresando…
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

