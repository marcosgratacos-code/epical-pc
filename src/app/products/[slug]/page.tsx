
"use client";

import Image from "next/image";
import Link from "next/link";
import { getProductBySlug, PRODUCTS } from "../../lib/products";
import BackButton from "../../components/BackButton";
import Accordion from "../../components/Accordion";
import ReviewSection from "../../components/ReviewSection";
import ImageGalleryZoom from "../../components/ImageGalleryZoom";
import { useCart } from "../../context/cart-context";
import { useState, use } from "react";

type Props = { params: Promise<{ slug: string }> };

export default function ProductPage({ params }: Props) {
  const { add } = useCart();
  const [toast, setToast] = useState<{ show: boolean; msg: string }>({ show: false, msg: "" });
  const resolvedParams = use(params);
  const product = getProductBySlug(resolvedParams.slug);
  if (!product) {
    return (
      <main className="min-h-screen bg-black text-white mx-auto max-w-6xl p-6">
        <BackButton />
        <h1 className="mt-4 text-2xl font-bold">Producto no encontrado</h1>
        <p className="text-white/60 mt-2">El producto solicitado no existe.</p>
      </main>
    );
  }

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

  return (
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

        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          {/* Galería con Zoom */}
          <ImageGalleryZoom images={gallery} productName={product.name} />

          {/* Info + CTA */}
          <section>
            <h1 className="text-3xl font-extrabold">{product.name}</h1>
            <div className="mt-2 flex flex-wrap items-center gap-2 text-sm">
              {product.tag && (
                <span className="rounded-full bg-white text-black px-2 py-0.5 font-bold">{product.tag}</span>
              )}
              <span className={product.inStock ? "text-green-400" : "text-rose-400"}>
                {product.inStock ? "En stock" : "Sin stock"}
              </span>
              <span className="text-white/40">•</span>
              <span className="text-white/70">Garantía 3 años · Envío 24/48h</span>
            </div>

            <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <div className="text-3xl font-extrabold">{eur(product.price)}</div>
                  <div className="text-xs text-white/60">IVA incl. · Devolución 30 días</div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={handleAdd}
                    className="rounded-xl bg-white px-5 py-3 font-semibold text-black hover:bg-white/90 disabled:opacity-60"
                    disabled={!product.inStock}
                    title={product.inStock ? "Añadir al carrito" : "Sin stock"}
                  >
                    Añadir al carrito
                  </button>
                </div>
              </div>
            </div>


            {/* Descripción larga */}
            {product.longDesc?.length ? (
              <Accordion title="Descripción" defaultOpen>
                <div className="space-y-3 text-white/80">
                  {product.longDesc.map((p: string) => (
                    <p key={p}>{p}</p>
                  ))}
                </div>
              </Accordion>
            ) : null}

            {/* Especificaciones */}
            <Accordion title="Especificaciones" defaultOpen>
              <ul className="grid gap-2 md:grid-cols-2 text-sm text-white/80">
                {product.specs.map((s: string) => (
                  <li key={s} className="rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2">• {s}</li>
                ))}
              </ul>
            </Accordion>

            {/* Sobre el producto */}
            {product.about?.length ? (
              <Accordion title="Sobre el producto" defaultOpen={false}>
                <ul className="grid gap-2 md:grid-cols-2 text-sm text-white/80">
                  {product.about.map((a: string) => (
                    <li key={a} className="rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2">• {a}</li>
                  ))}
                </ul>
              </Accordion>
            ) : null}

            {/* Tecnología */}
            {product.tech?.length ? (
              <Accordion title="Tecnología" defaultOpen={false}>
                <ul className="grid gap-2 md:grid-cols-2 text-sm text-white/80">
                  {product.tech.map((t: string) => (
                    <li key={t} className="rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2">• {t}</li>
                  ))}
                </ul>
              </Accordion>
            ) : null}

            {/* Comparar con otros EPICAL */}
            {(() => {
              const others = PRODUCTS.filter((p) => p.slug !== product.slug).slice(0, 3);
              const eur = (n: number) =>
                new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR" }).format(n);

              return (
                <div className="mt-8">
                  <h3 className="mb-3 text-lg font-semibold">Comparar</h3>
                  <div className="grid gap-4 md:grid-cols-3">
                    {others.map((o) => (
                      <Link
                        key={o.id}
                        href={`/products/${o.slug}`}
                        className="group rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition hover:border-white/20"
                      >
                        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-white/10">
                          <Image src={o.image} alt={o.name} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-contain" />
                        </div>
                        <div className="mt-3 flex items-center justify-between gap-2">
                          <div className="min-w-0">
                            <div className="truncate font-semibold">{o.name}</div>
                            <div className="text-sm text-white/60">{eur(o.price)}</div>
                          </div>
                          <span className="rounded-lg bg-white/10 px-2 py-1 text-xs">
                            {o.inStock ? "En stock" : "Sin stock"}
                          </span>
                        </div>
                        <ul className="mt-2 space-y-1 text-sm text-white/70">
                          {o.specs.slice(0, 3).map((s) => (
                            <li key={s}>• {s}</li>
                          ))}
                        </ul>
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })()}

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {[
                "Windows + drivers + BIOS al día",
                "Montaje limpio y control acústico",
                "Informe de pruebas y temperaturas",
                "Soporte por WhatsApp",
              ].map((b) => (
                <div key={b} className="rounded-xl border border-white/10 bg-white/[0.03] p-3 text-sm text-white/70">
                  {b}
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Sección de Reseñas */}
        <div className="mt-12">
          <ReviewSection productId={product.id} productName={product.name} />
        </div>
      </div>

      {/* Toast de confirmación */}
      {toast.show && (
        <div className="fixed bottom-20 left-1/2 z-50 -translate-x-1/2 rounded-xl border border-white/20 bg-black/90 px-4 py-2 text-sm backdrop-blur">
          {toast.msg}
        </div>
      )}

      {/* CTA móvil pegajosa */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-black/80 backdrop-blur md:hidden">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 p-3">
          <div>
            <div className="text-lg font-extrabold">{eur(product.price)}</div>
            <div className="text-xs text-white/60">{product.inStock ? "En stock" : "Sin stock"}</div>
          </div>
          <button onClick={handleAdd} className="rounded-xl bg-white px-4 py-2 font-semibold text-black" disabled={!product.inStock}>
            Añadir
          </button>
        </div>
      </div>
    </main>
  );
}
