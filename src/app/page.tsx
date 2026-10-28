import { PRODUCTS } from "./lib/products";
import ProductCard from "./components/ProductCard";
import TestimonialsSection from "./components/TestimonialsSection";
import AnimatedStats from "./components/AnimatedStats";
import HowItWorks from "./components/HowItWorks";
import TrustBadges from "./components/TrustBadges";
import Image from "next/image";
import Link from "next/link";
import { Check } from "lucide-react";

const CATEGORIES = [
  { t: "PC Gaming", d: "Rendimiento extremo para jugadores" },
  { t: "Packs Gaming", d: "PC completo con periféricos" },
  { t: "PC Edición", d: "Potencia para creadores" },
  { t: "PC Oficina", d: "Fiables y silenciosos" },
];

const HIGHLIGHTS = [
  { t: "Gráfica que rinde de verdad", d: "RTX 5070 Ti con 16GB. Tirarás juegos en 1440p o 4K sin ralentizaciones." },
  { t: "Procesador para FPS máximos", d: "AMD Ryzen 7 9800X3D con esa caché 3D que tanto gusta a los gamers." },
  { t: "Hecho aquí, en nuestro taller", d: "Lo montamos, lo probamos durante horas y te lo enviamos con 3 años de garantía." },
];

const PROCESS = [
  {
    t: "Validación térmica",
    d: "Cada PC pasa por pruebas de estrés completas. Registramos temperaturas en situaciones reales y ajustamos cada ventilador para el máximo rendimiento sin ruido.",
  },
  {
    t: "Montaje profesional",
    d: "Cableado limpio, vibraciones controladas y ventiladores configurados con perfiles PWM personalizados. Potencia sin sacrificar silencio.",
  },
  {
    t: "Configurado para ti",
    d: "Windows ya instalado y activado. Drivers actualizados, BIOS configurado y memoria funcionando a máxima velocidad. Solo conectas y listo.",
  },
];

const btnPrimary =
  "inline-flex items-center justify-center rounded-full bg-neutral-900 px-7 py-3.5 text-sm font-medium text-white hover:bg-neutral-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 transition-colors";
const btnSecondary =
  "inline-flex items-center justify-center rounded-full border border-neutral-300 bg-white px-7 py-3.5 text-sm font-medium text-neutral-900 hover:bg-neutral-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 transition-colors";

export default function Page() {
  const advancedProduct = PRODUCTS.find((p) => p.id === "titan2");

  return (
    <main className="min-h-screen bg-white text-neutral-900">
      {/* Promo */}
      <div className="bg-neutral-900 text-white">
        <p className="mx-auto max-w-7xl px-4 py-2 text-center text-xs sm:text-sm">
          <b className="font-semibold">-5% Epical Weeks</b> con cupón <b className="font-semibold">EQW</b>
          <span className="hidden sm:inline"> · Envío 24/48h · 3 años de garantía</span>
        </p>
      </div>

      {/* Hero */}
      <section id="hero" className="mx-auto grid max-w-6xl items-center gap-12 px-6 pb-20 pt-16 md:pb-28 md:pt-24 lg:grid-cols-2">
        <div>
          <p className="text-sm font-medium text-blue-600">Serie TITAN 2025</p>
          <h1 className="mt-4 text-4xl font-semibold leading-[1.05] tracking-tight text-balance sm:text-5xl lg:text-6xl">
            PCs gaming hechos a mano, para jugadores de verdad.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-neutral-500">
            No vendemos cajas con componentes. Cada PC sale de nuestro taller probado, optimizado y listo para darlo todo en partidas competitivas.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <a href="#productos" className={btnPrimary}>
              Ver PCs disponibles
            </a>
            <Link href="/pc-a-medida" className={btnSecondary}>
              Diseña el tuyo
            </Link>
          </div>
          <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-sm text-neutral-500">
            {["Montaje y test incluidos", "Soporte WhatsApp", "Pago a plazos"].map((t) => (
              <li key={t} className="flex items-center gap-1.5">
                <Check className="h-4 w-4 text-neutral-900" aria-hidden="true" />
                {t}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative aspect-square w-full overflow-hidden rounded-[2rem] bg-neutral-50 ring-1 ring-neutral-200">
          <Image
            src="/logo-sin-fondo.png"
            alt="TITAN ADVANCED, PC gaming de TITAN-PC"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-contain p-8 mix-blend-multiply md:p-12"
            priority
          />
        </div>
      </section>

      <TrustBadges />

      <AnimatedStats />

      {/* Categorías */}
      <section className="mx-auto max-w-6xl px-6 pb-20 md:pb-28">
        <div className="mb-10 max-w-2xl">
          <p className="text-sm font-medium text-blue-600">Categorías</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">Qué tipo de PC necesitas</h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {CATEGORIES.map((c) => (
            <Link
              key={c.t}
              href="/productos"
              className="group rounded-3xl border border-neutral-200 bg-white p-6 transition-colors hover:bg-neutral-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
            >
              <div className="text-lg font-semibold">{c.t}</div>
              <div className="mt-2 text-sm text-neutral-500">{c.d}</div>
              <div className="mt-6 text-sm font-medium text-neutral-900 transition-transform group-hover:translate-x-1">→</div>
            </Link>
          ))}
        </div>
      </section>

      <HowItWorks />

      {/* Producto destacado */}
      <section id="productos" className="border-t border-neutral-200 bg-neutral-50">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
          <div className="mb-12 max-w-2xl">
            <p className="text-sm font-medium text-blue-600">Selección especial</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">PCs listos para jugar</h2>
          </div>

          <div className="grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-16">
            {advancedProduct && <ProductCard p={advancedProduct} tone="light" />}

            <div>
              <h3 className="text-2xl font-semibold tracking-tight md:text-3xl">TITAN ADVANCED</h3>
              <p className="mt-4 text-lg leading-relaxed text-neutral-500">
                El PC gaming que más vendemos. Potencia de sobra para jugar en 1440p y mantener FPS altos sin problemas de temperatura.
              </p>

              <ul className="mt-8 space-y-6">
                {HIGHLIGHTS.map((h) => (
                  <li key={h.t} className="flex gap-4">
                    <Check className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" aria-hidden="true" />
                    <div>
                      <h4 className="font-medium">{h.t}</h4>
                      <p className="mt-1 text-sm leading-relaxed text-neutral-500">{h.d}</p>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <Link href="/products/titan-advanced" className={btnPrimary}>
                  Ver producto
                </Link>
                <Link href="/productos" className={btnSecondary}>
                  Ver todos los productos
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ventajas */}
      <section id="ventajas" className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <div className="mb-12 max-w-2xl">
          <p className="text-sm font-medium text-blue-600">Así funcionamos</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
            Cada ordenador se monta, se prueba y sale listo para jugar
          </h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {PROCESS.map((v) => (
            <div key={v.t} className="rounded-3xl border border-neutral-200 p-8">
              <h3 className="text-lg font-semibold">{v.t}</h3>
              <p className="mt-3 text-sm leading-relaxed text-neutral-500">{v.d}</p>
            </div>
          ))}
        </div>
      </section>

      <TestimonialsSection />

      {/* CTA */}
      <section id="cta" className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <div className="rounded-[2rem] bg-neutral-900 px-8 py-16 text-center text-white md:px-16">
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">¿Quieres tu PC gaming ya?</h2>
          <p className="mt-3 text-neutral-400">Háblanos por WhatsApp o configura el que quieras.</p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <a
              href="https://wa.me/34XXXXXXXXX"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-white px-7 py-3.5 text-sm font-medium text-neutral-900 hover:bg-neutral-200 transition-colors"
            >
              WhatsApp
            </a>
            <Link
              href="/pc-a-medida"
              className="inline-flex items-center justify-center rounded-full border border-white/30 px-7 py-3.5 text-sm font-medium text-white hover:bg-white/10 transition-colors"
            >
              PC a medida
            </Link>
            <Link
              href="/contacto"
              className="inline-flex items-center justify-center rounded-full px-7 py-3.5 text-sm font-medium text-neutral-300 hover:text-white transition-colors"
            >
              Contacto
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-neutral-200 bg-neutral-50">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="grid gap-10 md:grid-cols-4">
            <div>
              <Link href="/" className="text-xl font-semibold tracking-tight">
                TITAN<span className="text-blue-600">-PC</span>
              </Link>
              <p className="mt-4 max-w-xs text-sm leading-relaxed text-neutral-500">
                PCs gaming personalizados con montaje profesional y validación térmica real.
              </p>
              <p className="mt-4 text-xs text-neutral-400">
                En TITAN-PC montamos ordenadores personalizados con componentes de alta gama para gamers, creadores y entornos exigentes.
              </p>
            </div>

            <div>
              <h3 className="text-sm font-semibold">Productos</h3>
              <ul className="mt-4 space-y-3 text-sm text-neutral-500">
                <li><Link href="/productos" className="hover:text-neutral-900 transition-colors">Todos los PCs</Link></li>
                <li><Link href="/pc-a-medida" className="hover:text-neutral-900 transition-colors">PC a medida</Link></li>
                <li><Link href="/comparador" className="hover:text-neutral-900 transition-colors">Comparador</Link></li>
                <li><Link href="/calculadora-gaming" className="hover:text-neutral-900 transition-colors">Calculadora Gaming</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold">Soporte</h3>
              <ul className="mt-4 space-y-3 text-sm text-neutral-500">
                <li><Link href="/faq" className="hover:text-neutral-900 transition-colors">Preguntas frecuentes</Link></li>
                <li><Link href="/contacto" className="hover:text-neutral-900 transition-colors">Contacto</Link></li>
                <li><Link href="/seguimiento" className="hover:text-neutral-900 transition-colors">Seguimiento de envío</Link></li>
                <li><Link href="/ventajas" className="hover:text-neutral-900 transition-colors">Garantías</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold">Legal</h3>
              <ul className="mt-4 space-y-3 text-sm text-neutral-500">
                <li><a href="#" className="hover:text-neutral-900 transition-colors">Aviso legal</a></li>
                <li><a href="#" className="hover:text-neutral-900 transition-colors">Política de privacidad</a></li>
                <li><a href="#" className="hover:text-neutral-900 transition-colors">Política de cookies</a></li>
                <li><a href="#" className="hover:text-neutral-900 transition-colors">Condiciones de venta</a></li>
              </ul>
            </div>
          </div>

          <div className="mt-12 flex flex-col gap-2 border-t border-neutral-200 pt-8 text-xs text-neutral-400 sm:flex-row sm:justify-between">
            <p>© {new Date().getFullYear()} TITAN-PC. Todos los derechos reservados.</p>
            <p>Montaje profesional · Validación térmica · 3 años de garantía</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
