"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Product } from "../../lib/products";
import { POLICIES } from "../../lib/policies";
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
  const [showBar, setShowBar] = useState(false);

  // Barra de compra fija: aparece al pasar la primera pantalla
  useEffect(() => {
    const onScroll = () => setShowBar(window.scrollY > 520);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  
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

      {/* Barra de compra fija */}
      <div
        className={`fixed inset-x-0 top-[57px] z-[90] border-b border-black/10 bg-white/85 backdrop-blur-xl transition-all duration-300 ${
          showBar ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-2 opacity-0"
        }`}
        aria-hidden={!showBar}
      >
        <div className="container-content flex h-14 items-center justify-between gap-4">
          <p className="min-w-0 truncate text-base font-semibold tracking-tight">{product.name}</p>
          <div className="flex shrink-0 items-center gap-4">
            <span className="text-sm text-muted">{eur(product.price)}</span>
            <button
              onClick={handleAdd}
              disabled={!product.inStock}
              tabIndex={showBar ? 0 : -1}
              className="btn btn-primary !min-h-9 !px-4 !py-1.5 !text-sm"
            >
              {product.inStock ? "Comprar" : "Sin stock"}
            </button>
          </div>
        </div>
      </div>
      
      <AnimatePresence mode="wait">
        {!leaving && (
          <motion.main
            key={product.slug}
            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -30, filter: "blur(8px)" }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="min-h-screen bg-white text-neutral-900"
          >
          <div className="mx-auto max-w-7xl p-6">
            {/* barra superior: volver + migas */}
            <div className="mb-4 flex items-center justify-between">
              <button
                onClick={handleBack}
                className="text-neutral-600 hover:text-neutral-900 flex items-center gap-2 transition-colors"
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
              <nav className="text-sm text-neutral-500">
                <Link href="/" className="hover:text-neutral-900">Inicio</Link>
                <span className="mx-2">/</span>
                <Link href="/#productos" className="hover:text-neutral-900">Montajes</Link>
                <span className="mx-2">/</span>
                <span className="text-neutral-900">{product.name}</span>
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
                  <p className="mt-2 text-neutral-600">{product.desc || product.name}</p>
                </div>

                <div className="flex items-baseline gap-4">
                  <span className="text-4xl font-bold text-neutral-900">
                    {eur(product.price)}
                  </span>
                  <span className={`rounded-lg px-3 py-1 text-sm transition-all duration-300 ${product.inStock ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {product.inStock ? "✓ En stock" : "Sin stock"}
                  </span>
                </div>

                <div>
                  <h3 className="mb-3 font-semibold text-lg">Especificaciones</h3>
                  <ul className="space-y-2 text-neutral-700">
                    {product.specs.map((s, index) => (
                      <li key={s} className={`flex items-start transform transition-all duration-300 hover:translate-x-1 hover:text-neutral-900 stagger-${index + 1}`}>
                        <span className="mr-2 text-blue-600">✓</span>
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={handleAdd}
                    disabled={!product.inStock}
                    className="flex-1 rounded-xl bg-neutral-900 px-6 py-4 font-semibold text-white hover:bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-blue-600 disabled:cursor-not-allowed disabled:bg-neutral-200 disabled:text-white/40 transform hover:scale-105 transition-all duration-200 hover:shadow-lg"
                  >
                    {product.inStock ? "Añadir al carrito" : "Sin stock"}
                  </button>
                  <Link
                    href="/#productos"
                    className="rounded-xl border border-neutral-300 px-6 py-4 font-semibold hover:border-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-600 transform hover:scale-105 transition-all duration-200 hover:shadow-lg hover-glow flex items-center justify-center"
                  >
                    Explorar más
                  </Link>
                </div>

                <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-6 backdrop-blur-sm">
                  <h3 className="mb-4 font-semibold text-lg">Ventajas TITAN-PC</h3>
                  <ul className="space-y-3 text-sm text-neutral-700">
                    {[
                      `✓ ${POLICIES.warrantyYears} años de garantía completa`,
                      `✓ Envío ${POLICIES.shippingTime}`,
                      "✓ Montaje profesional + testeo",
                      ...(POLICIES.returnDays ? [`✓ Devolución ${POLICIES.returnDays} días`] : []),
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
                <p className="leading-relaxed text-neutral-700">
                  El <b>{product.name}</b> es un PC gaming de alto rendimiento diseñado para
                  ofrecer la mejor experiencia en tus juegos favoritos. Con componentes de
                  última generación cuidadosamente seleccionados y probados, garantizamos
                  estabilidad, rendimiento y durabilidad.
                </p>
                <p className="mt-4 leading-relaxed text-neutral-700">
                  Cada componente ha sido optimizado para trabajar en perfecta armonía.
                  Realizamos test de estrés, validación térmica y configuración de perfiles
                  XMP/EXPO antes del envío. Windows no se incluye por defecto: podemos
                  entregarlo instalado y activado. Drivers y BIOS al día.
                </p>
              </Accordion>

              <Accordion title="Garantía y devoluciones">
                <p className="leading-relaxed text-neutral-700">
                  Ofrecemos <b>3 años de garantía completa</b> en todos nuestros montajes.
                  Si tienes cualquier problema técnico, nuestro equipo te asistirá por
                  WhatsApp y gestionaremos la reparación o sustitución del equipo sin coste
                  adicional.
                </p>
                {POLICIES.returnDays ? (
                  <p className="mt-4 leading-relaxed text-neutral-700">
                    Además, dispones de <b>{POLICIES.returnDays} días</b> para devoluciones.
                  </p>
                ) : (
                  <p className="mt-4 leading-relaxed text-neutral-700">
                    Consulta las condiciones de desistimiento y devolución en la página de contacto.
                  </p>
                )}
              </Accordion>

              <Accordion title="Envío y montaje">
                <p className="leading-relaxed text-neutral-700">
                  Realizamos el montaje profesional con gestión de cables premium, aplicamos
                  pasta térmica de alta calidad y configuramos la BIOS para máximo
                  rendimiento y estabilidad.
                </p>
                <p className="mt-4 leading-relaxed text-neutral-700">
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
              className="text-neutral-900 text-lg font-semibold"
            >
              Regresando…
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

