


import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { getProductBySlug, PRODUCTS } from "../../lib/products";
import BackButton from "../../components/BackButton";
import Accordion from "../../components/Accordion";

type Props = { params: { slug: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = getProductBySlug(params.slug);
  if (!p) {
    return {
      title: "Producto no encontrado | EPICAL-PC",
      description: "El producto solicitado no existe en el catálogo de EPICAL-PC.",
    };
  }
  return {
    title: `${p.name} | EPICAL-PC`,
    description: p.desc ?? "PC EPICAL de alto rendimiento.",
    openGraph: {
      title: p.name,
      description: p.desc ?? "",
      images: p.image ? [{ url: p.image }] : [],
    },
  };
}


export default function ProductPage({ params }: Props) {
  const product = getProductBySlug(params.slug);
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
          {/* Galería */}
          <section className="rounded-2xl border border-white/10 p-4">
            <div className="grid gap-4 md:grid-cols-[96px_1fr]">
              <ul className="order-2 flex gap-3 md:order-1 md:flex-col">
                {gallery.map((img, i) => (
                  <li key={img + i} className="relative h-16 w-16 overflow-hidden rounded-lg border border-white/10">
                    <Image src={img} alt={`${product.name} mini ${i + 1}`} fill className="object-contain" />
                  </li>
                ))}
              </ul>

              <div className="order-1 relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-white/10 md:order-2">
                <Image
                  src={gallery[0]}
                  alt={product.name}
                  fill
                  className="object-contain"
                  sizes="(max-width:1024px) 100vw, 50vw"
                  priority
                />
                {/* tu halo EPICAL */}
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(56,189,248,0.08),transparent_40%),radial-gradient(circle_at_80%_60%,rgba(139,92,246,0.08),transparent_35%)]" />
              </div>
            </div>
          </section>

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
                    className="rounded-xl bg-white px-5 py-3 font-semibold text-black hover:bg-white/90 disabled:opacity-60"
                    disabled={!product.inStock}
                    title={product.inStock ? "Añadir (pendiente de carrito global)" : "Sin stock"}
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
                          <Image src={o.image} alt={o.name} fill className="object-contain" />
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
      </div>

      {/* CTA móvil pegajosa */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-black/80 backdrop-blur md:hidden">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 p-3">
          <div>
            <div className="text-lg font-extrabold">{eur(product.price)}</div>
            <div className="text-xs text-white/60">{product.inStock ? "En stock" : "Sin stock"}</div>
          </div>
          <button className="rounded-xl bg-white px-4 py-2 font-semibold text-black" disabled={!product.inStock}>
            Añadir
          </button>
        </div>
      </div>
    </main>
  );
}
