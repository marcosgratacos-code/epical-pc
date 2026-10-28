import Image from "next/image";
import Link from "next/link";
import { PRODUCTS, type Product } from "./lib/products";
import Reveal from "./components/Reveal";

/* Todos los datos de producto salen del catálogo (lib/products.ts). */
const bySlug = (slug: string) => PRODUCTS.find((p) => p.slug === slug);
const eur = (n: number) =>
  n.toLocaleString("es-ES", { style: "currency", currency: "EUR", minimumFractionDigits: 0 });
const specOf = (p: Product, prefix: string) =>
  p.specs.find((s) => s.startsWith(prefix + " "))?.slice(prefix.length + 1) ?? "";
const gpuModel = (p: Product) => /RTX \d{4}( Ti)?/.exec(specOf(p, "GPU"))?.[0] ?? specOf(p, "GPU");
const cpuModel = (p: Product) =>
  /Ryzen \d \d{4}(X3D)?|Core i\d-\d+F?/.exec(specOf(p, "CPU"))?.[0] ?? specOf(p, "CPU");
const ramSize = (p: Product) => /\((\d+x\d+GB)\)|\b(\d+GB)\b/.exec(specOf(p, "RAM"))?.[2] ?? "";
const ssdSize = (p: Product) => /\b(\d+(TB|GB))\b/.exec(specOf(p, "SSD"))?.[1] ?? "";

/* Solo TITAN ADVANCED tiene hoy una imagen de producto real en /public.
   El resto usa imágenes provisionales y no se muestran como foto. */
const HAS_REAL_PHOTO = new Set(["titan2"]);

const PROCESS = [
  {
    t: "Validación térmica",
    d: "Cada equipo pasa pruebas de estrés y estabilidad antes de salir del taller.",
  },
  {
    t: "Montaje y refrigeración",
    d: "Cableado ordenado y ventiladores ajustados para rendir sin ruido.",
  },
  {
    t: "Informe de pruebas",
    d: "Recibes el resultado de temperaturas y estabilidad de tu equipo.",
  },
];

export default function Page() {
  const ultra = bySlug("titan-ultra");
  const advanced = bySlug("titan-advanced");
  const starter = bySlug("titan-starter");
  const family = [starter, advanced, ultra].filter(Boolean) as Product[];

  return (
    <main id="contenido">
      {/* Promo */}
      <div className="bg-night text-white">
        <p className="mx-auto max-w-wide px-4 py-2 text-center text-xs sm:text-sm">
          <b className="font-semibold">-5% Epical Weeks</b> con cupón <b className="font-semibold">EQW</b>
        </p>
      </div>

      {/* 1 · Hero */}
      <section className="section-light overflow-hidden pt-16 text-center md:pt-24" aria-labelledby="hero-title">
        <div className="container-content">
          <Reveal>
            <h1 id="hero-title" className="text-display text-ink">
              Potencia sin límites.
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-5 max-w-2xl text-subhead text-muted">
              Diseñado para rendir. Construido para impresionar.
            </p>
          </Reveal>
          <Reveal delay={0.2} className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-2">
            <Link href="/productos" className="btn btn-primary">
              Comprar
            </Link>
            <a href="#titan-advanced" className="btn-link">
              Descubrir <span aria-hidden="true">›</span>
            </a>
          </Reveal>
        </div>

        {advanced && (
          <Reveal delay={0.15} className="relative mx-auto mt-10 w-full max-w-[1000px] px-4">
            <div className="relative aspect-[5/4] w-full sm:aspect-[16/11]">
              <Image
                src={advanced.image}
                alt={`${advanced.name}, PC gaming de TITAN-PC`}
                fill
                priority
                sizes="(min-width: 1024px) 1000px, 100vw"
                className="object-contain mix-blend-multiply"
              />
            </div>
            <p className="pb-10 text-sm text-muted">
              {advanced.name} · {gpuModel(advanced)} · {cpuModel(advanced)}
            </p>
          </Reveal>
        )}
      </section>

      {/* 2 · TITAN ULTRA */}
      {ultra && (
        <section className="section section-dark" aria-labelledby="ultra-title">
          <div className="container-content text-center">
            <Reveal>
              <p className="text-lg font-semibold text-[#f5f5f7]">{ultra.name}</p>
              <h2 id="ultra-title" className="mt-2 text-headline">
                Gaming 4K, sin concesiones.
              </h2>
              <p className="mx-auto mt-5 max-w-2xl text-subhead text-muted">{ultra.desc}</p>
            </Reveal>

            <Reveal delay={0.1}>
              <dl className="mx-auto mt-14 grid max-w-4xl grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4">
                {[
                  ["Gráfica", gpuModel(ultra)],
                  ["Procesador", cpuModel(ultra)],
                  ["Memoria", `${ramSize(ultra)} DDR5`],
                  ["Almacenamiento", `${ssdSize(ultra)} NVMe`],
                ].map(([label, value]) => (
                  <div key={label}>
                    <dt className="text-sm text-muted">{label}</dt>
                    <dd className="mt-1 text-2xl font-semibold tracking-tight md:text-[1.75rem]">{value}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>

            <Reveal delay={0.15} className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-2">
              <Link href={`/products/${ultra.slug}`} className="btn btn-on-dark">
                Comprar
              </Link>
              <Link href={`/products/${ultra.slug}`} className="btn-link btn-link-on-dark">
                Descubrir <span aria-hidden="true">›</span>
              </Link>
            </Reveal>
            <p className="mt-6 text-sm text-muted">Desde {eur(ultra.price)}</p>
          </div>
        </section>
      )}

      {/* 3 · TITAN ADVANCED */}
      {advanced && (
        <section id="titan-advanced" className="section section-gray scroll-mt-16" aria-labelledby="advanced-title">
          <div className="container-content text-center">
            <Reveal>
              <p className="text-lg font-semibold">{advanced.name}</p>
              <h2 id="advanced-title" className="mt-2 text-headline">
                Hecho para ir más allá.
              </h2>
              <p className="mx-auto mt-5 max-w-2xl text-subhead text-muted">{advanced.desc}</p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-2">
                <Link href={`/products/${advanced.slug}`} className="btn btn-primary">
                  Comprar
                </Link>
                <Link href={`/products/${advanced.slug}`} className="btn-link">
                  Descubrir <span aria-hidden="true">›</span>
                </Link>
              </div>
              <p className="mt-4 text-sm text-muted">Desde {eur(advanced.price)}</p>
            </Reveal>

            <Reveal delay={0.1} className="relative mx-auto mt-6 aspect-[5/4] w-full max-w-[860px] sm:aspect-[16/11]">
              <Image
                src={advanced.image}
                alt={`${advanced.name}: interior con ${gpuModel(advanced)} y ${cpuModel(advanced)}`}
                fill
                sizes="(min-width: 900px) 860px, 100vw"
                className="object-contain mix-blend-multiply"
              />
            </Reveal>
          </div>
        </section>
      )}

      {/* 4 · Familia TITAN */}
      <section className="section section-light" aria-labelledby="family-title">
        <div className="container-wide">
          <Reveal className="mb-10 px-1">
            <h2 id="family-title" className="text-headline">
              Conoce la familia TITAN.
            </h2>
          </Reveal>

          <ul className="-mx-6 flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-6 [scrollbar-width:none] md:mx-0 md:grid md:grid-cols-3 md:overflow-visible md:px-0 [&::-webkit-scrollbar]:hidden">
            {family.map((p, i) => (
              <li key={p.id} className="min-w-[82%] snap-center sm:min-w-[46%] md:min-w-0">
                <Reveal delay={i * 0.08} className="card flex h-full flex-col overflow-hidden">
                  <Link
                    href={`/products/${p.slug}`}
                    className="relative block aspect-[4/3] bg-surface focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                    aria-label={`Ver ${p.name}`}
                  >
                    {HAS_REAL_PHOTO.has(p.id) ? (
                      <Image
                        src={p.image}
                        alt={`${p.name}, PC gaming de TITAN-PC`}
                        fill
                        sizes="(min-width: 768px) 33vw, 82vw"
                        className="object-contain p-6 mix-blend-multiply"
                      />
                    ) : (
                      <span className="absolute inset-0 flex flex-col items-center justify-center gap-1 text-center">
                        <span className="text-4xl font-semibold tracking-tight text-ink">{gpuModel(p)}</span>
                        <span className="text-sm text-muted">{cpuModel(p)}</span>
                      </span>
                    )}
                  </Link>
                  <div className="flex flex-1 flex-col p-7">
                    <h3 className="text-2xl font-semibold tracking-tight">{p.name}</h3>
                    <p className="mt-2 flex-1 text-[0.9375rem] leading-relaxed text-muted">{p.desc}</p>
                    <ul className="mt-5 space-y-1 text-sm text-ink/80">
                      <li>{gpuModel(p)}</li>
                      <li>{cpuModel(p)}</li>
                      <li>
                        {ramSize(p)} DDR5 · {ssdSize(p)} NVMe
                      </li>
                    </ul>
                    <p className="mt-5 text-lg font-semibold">Desde {eur(p.price)}</p>
                    <div className="mt-4 flex items-center gap-6">
                      <Link href={`/products/${p.slug}`} className="btn btn-primary !px-5">
                        Comprar
                      </Link>
                      <Link href={`/products/${p.slug}`} className="btn-link">
                        Descubrir <span aria-hidden="true">›</span>
                      </Link>
                    </div>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>

          <div className="mt-6 text-center">
            <Link href="/comparador" className="btn-link">
              Comparar modelos <span aria-hidden="true">›</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 5 · Fabricados con precisión */}
      <section className="section section-dark" aria-labelledby="precision-title">
        <div className="container-content">
          <Reveal className="max-w-3xl">
            <h2 id="precision-title" className="text-headline">
              Fabricados con precisión.
            </h2>
            <p className="mt-5 text-subhead text-muted">
              Cada TITAN se monta y se prueba en nuestro taller antes de enviarse.
            </p>
          </Reveal>
          <ul className="mt-14 grid gap-10 md:grid-cols-3">
            {PROCESS.map((s, i) => (
              <li key={s.t} className="border-t border-white/20 pt-6">
                <Reveal delay={i * 0.08}>
                  <h3 className="text-xl font-semibold tracking-tight">{s.t}</h3>
                  <p className="mt-3 leading-relaxed text-muted">{s.d}</p>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 6 · Configura tu TITAN */}
      <section className="section section-light" aria-labelledby="config-title">
        <div className="container-content text-center">
          <Reveal>
            <h2 id="config-title" className="text-headline">
              Configura tu TITAN.
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-subhead text-muted">
              Elige procesador, placa base, memoria, gráfica, almacenamiento, refrigeración, fuente y caja.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-2">
              <Link href="/pc-a-medida" className="btn btn-primary">
                Empezar
              </Link>
              <Link href="/contacto" className="btn-link">
                Hablar con nosotros <span aria-hidden="true">›</span>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 7 · Garantía y soporte */}
      <section className="section section-gray" aria-labelledby="support-title">
        <div className="container-content">
          <Reveal className="max-w-3xl">
            <h2 id="support-title" className="text-headline">
              Garantía y soporte.
            </h2>
          </Reveal>
          <ul className="mt-12 grid gap-5 md:grid-cols-3">
            {[
              { t: "3 años de garantía", d: "En todos los equipos TITAN." },
              { t: "Envío en 24/48 h", d: "Según stock. Te enviamos el seguimiento del pedido." },
              {
                t: "Windows opcional",
                d: "No va incluido por defecto. Podemos entregarlo instalado y activado.",
              },
            ].map((c, i) => (
              <li key={c.t}>
                <Reveal delay={i * 0.08} className="card h-full p-8">
                  <h3 className="text-xl font-semibold tracking-tight">{c.t}</h3>
                  <p className="mt-3 leading-relaxed text-muted">{c.d}</p>
                </Reveal>
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <Link href="/faq" className="btn-link">
              Preguntas frecuentes <span aria-hidden="true">›</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
