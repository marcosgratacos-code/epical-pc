
"use client";

import { PRODUCTS, type Product } from "./lib/products";
import ProductCard from "./components/ProductCard";
import TestimonialsSection from "./components/TestimonialsSection";
import AnimatedStats from "./components/AnimatedStats";
import HowItWorks from "./components/HowItWorks";
import TrustBadges from "./components/TrustBadges";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useCart } from "./context/cart-context";
//
/* =========================
   Carrito (Drawer mejorado)
   ========================= */
/* =========================
   Página
   ========================= */
export default function Page() {
  const { add } = useCart();
  // toast
  const [toast, setToast] = useState<{ show: boolean; msg: string }>({ show: false, msg: "" });

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  // Función para añadir al carrito usando el contexto global
  const handleAdd = (id: string) => {
    add(id);
    const prod = PRODUCTS.find((p: Product) => p.id === id);
    setToast({ show: true, msg: `${prod?.name ?? "Producto"} añadido` });
    setTimeout(() => setToast({ show: false, msg: "" }), 1200);
  };

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Promo con TRES colores */}
      <div className="w-full bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-violet-500/20 border-b border-white/10">
        <div className="mx-auto max-w-7xl p-2 text-center text-sm">
          <b>-5% Epical Weeks</b> con cupón <b>EQW</b> · Envío 24/48h · 3 años de garantía
        </div>
      </div>





      {/* Hero */}
      <section id="hero" className="relative mx-auto grid max-w-7xl items-center gap-8 p-6 md:gap-12 md:p-8 md:grid-cols-2 lg:max-w-8xl xl:max-w-none xl:px-8 xl:gap-16">
        <div className="animate-fade-in-up">
          <p className="inline rounded-full border border-white/10 px-3 py-1 text-xs text-white/80 animate-fade-in-up-delay-1">Nuevo · Serie EPICAL 2025</p>
          <h1 className="mt-4 text-4xl font-extrabold leading-tight md:text-6xl lg:text-7xl animate-fade-in-up-delay-2">
            Potencia extrema, <span className="text-white/70">diseño impecable</span>
            <br />
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 bg-clip-text text-transparent animate-gradient-shift">
              PCs personalizados que hacen historia
            </span>
          </h1>
          <p className="mt-6 text-lg text-white/70 md:text-xl lg:text-2xl animate-fade-in-up-delay-3">
            Montajes de alto rendimiento con validación térmica, control acústico y perfiles XMP/EXPO probados.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:gap-4 lg:gap-6">
            <button
              onClick={() => scrollTo("productos")}
              className="rounded-xl bg-white px-8 py-4 font-semibold text-black hover:bg-white/90 focus:outline-none focus:ring-2 focus:ring-violet-400 hover-lift hover-glow touch-target text-lg"
            >
              Ver montajes
            </button>
            <Link
              href="/pc-a-medida"
              className="rounded-xl border border-white/20 px-8 py-4 font-semibold hover:border-white/40 focus:outline-none focus:ring-2 focus:ring-violet-400 hover-lift hover-glow touch-target text-center text-lg"
            >
              PC a medida
            </Link>
          </div>

          <ul className="mt-6 grid grid-cols-1 gap-2 text-sm text-white/70 sm:grid-cols-2 md:grid-cols-3">
            {["3 años de garantía","Envío 24/48h","Montaje y test incluidos","Soporte WhatsApp","Devolución 30 días","Pago a plazos"].map((t, index) => (
              <li key={t} className={`rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 animate-fade-in-scale stagger-${index + 1}`}>{t}</li>
            ))}
          </ul>
        </div>

        <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-white/10 animate-fade-in-right group md:aspect-[4/3]">
          <Image 
            src="/corsair-logo.webp" 
            alt="Corsair Partner EPICAL-PC" 
            fill 
            sizes="(min-width: 768px) 50vw, 100vw" 
            className="object-contain opacity-90 transform group-hover:scale-110 transition-transform duration-700 ease-out" 
            priority 
          />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(56,189,248,0.15),transparent_40%),radial-gradient(circle_at_80%_60%,rgba(139,92,246,0.15),transparent_35%)]" />
          
          {/* Partículas decorativas */}
          <div className="particle absolute top-1/4 left-1/4 animate-soft-pulse"></div>
          <div className="particle absolute top-3/4 right-1/4 animate-soft-pulse" style={{animationDelay: '1s'}}></div>
          <div className="particle absolute top-1/2 right-1/3 animate-soft-pulse" style={{animationDelay: '2s'}}></div>
        </div>
      </section>

      {/* Estadísticas Animadas */}
      <AnimatedStats />

      {/* Trust Badges */}
      <TrustBadges />

      {/* Cómo Funciona */}
      <HowItWorks />

      {/* Categorías rápidas */}
      <section className="mx-auto max-w-7xl p-6 lg:max-w-8xl xl:max-w-none xl:px-8">
        <h2 className="text-2xl font-bold mb-6 text-center lg:text-3xl">
          <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 bg-clip-text text-transparent">
            Encuentra tu PC perfecto
          </span>
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { t: "PC Gaming", d: "240 FPS en eSports", icon: "🎮" },
            { t: "Packs Gaming", d: "PC + periféricos", icon: "🖱️" },
            { t: "PC Edición", d: "Premiere, Blender", icon: "🎬" },
            { t: "PC Oficina", d: "Silenciosos y fiables", icon: "💼" },
          ].map((c, index) => (
            <button
              key={c.t}
              onClick={() => scrollTo("productos")}
              className={`rounded-2xl border border-white/10 bg-gradient-to-tr from-white/[0.04] to-white/[0.02] p-6 text-left hover:border-white/20 focus:outline-none focus:ring-2 focus:ring-violet-400 hover-lift hover-glow animate-fade-in-scale stagger-${index + 1} group`}
            >
              <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">{c.icon}</div>
              <div className="text-lg font-semibold mb-1">{c.t}</div>
              <div className="text-sm text-white/60">{c.d}</div>
            </button>
          ))}
        </div>
      </section>


      {/* Productos */}
      <section id="productos" className="mx-auto max-w-7xl p-6 md:p-8 lg:max-w-8xl xl:max-w-none xl:px-8">
        <h2 className="mb-8 text-2xl font-semibold text-white/90 md:text-3xl lg:text-4xl md:mb-12">Montajes destacados</h2>
        
        {/* EPICAL ADVANCED destacado */}
        <div className="grid gap-4 md:gap-8 lg:grid-cols-2 lg:items-center">
          {/* Producto a la izquierda */}
          <div className="order-2 lg:order-1">
            {(() => {
              const advancedProduct = PRODUCTS.find(p => p.id === "epic2");
              if (!advancedProduct) return null;
              
              return (
                <ProductCard key={advancedProduct.id} p={advancedProduct} onAdd={handleAdd} />
              );
            })()}
          </div>
          
          {/* Descripción a la derecha */}
          <div className="order-1 lg:order-2">
            <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-cyan-500/10 via-blue-500/10 to-violet-500/10 p-4 md:p-8">
              <div className="mb-4">
                <span className="inline-block rounded-full bg-gradient-to-r from-cyan-400 to-violet-400 px-4 py-2 text-sm font-semibold text-black">
                  Selección Especial
                </span>
              </div>
              
              <h3 className="mb-4 text-2xl font-bold">
                <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 bg-clip-text text-transparent">
                  EPICAL ADVANCED
                </span>
              </h3>
              
              <p className="mb-6 text-lg text-white/80">
                Nuestra recomendación estrella para usuarios que buscan el equilibrio perfecto entre rendimiento y valor.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="mt-1 h-2 w-2 rounded-full bg-cyan-400"></div>
                  <div>
                    <h4 className="font-semibold text-white">Rendimiento excepcional</h4>
                    <p className="text-sm text-white/70">RTX 5070 Ti con 16GB para gaming 1440p/4K y edición profesional</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="mt-1 h-2 w-2 rounded-full bg-blue-400"></div>
                  <div>
                    <h4 className="font-semibold text-white">CPU de última generación</h4>
                    <p className="text-sm text-white/70">AMD Ryzen 7 9800X3D con cache 3D para FPS máximos</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="mt-1 h-2 w-2 rounded-full bg-violet-400"></div>
                  <div>
                    <h4 className="font-semibold text-white">Montaje profesional</h4>
                    <p className="text-sm text-white/70">Validación térmica, control acústico y garantía de 3 años</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 flex flex-wrap gap-3">
                <button
                  onClick={() => handleAdd("epic2")}
                  className="rounded-xl bg-white px-6 py-3 font-semibold text-black hover:bg-white/90 focus:outline-none focus:ring-2 focus:ring-violet-400"
                >
                  Añadir al carrito
                </button>
                <Link
                  href="/productos"
                  className="rounded-xl border border-white/20 px-6 py-3 font-semibold hover:border-white/40 focus:outline-none focus:ring-2 focus:ring-violet-400"
                >
                  Ver todos los productos
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ventajas */}
      <section id="ventajas" className="mx-auto max-w-7xl p-6 my-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 bg-clip-text text-transparent">
            Por qué EPICAL-PC
          </span>
        </h2>
        <p className="text-center text-white/70 mb-12 max-w-2xl mx-auto">
          No somos un ensamblador más. Cada PC pasa por nuestro proceso de validación profesional
        </p>
        <div className="grid gap-6 md:grid-cols-3">
          {[
            { 
              icon: "🌡️",
              t: "Validación térmica real", 
              d: "Stress de CPU/GPU, logging de temperaturas y curva de ventiladores optimizada para silencio y rendimiento." 
            },
            { 
              icon: "🔇",
              t: "Silencio y estabilidad", 
              d: "Montaje limpio, control de vibraciones y perfiles PWM probados. Tu PC será potente pero silencioso." 
            },
            { 
              icon: "⚡",
              t: "Listo para jugar/crear", 
              d: "Windows activado, drivers actualizados, BIOS optimizado y perfiles XMP/EXPO aplicados desde el primer encendido." 
            },
          ].map((v, index) => (
            <div 
              key={v.t} 
              className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent p-6 backdrop-blur-sm hover:border-white/20 transition-all duration-300 hover:scale-105 group"
              style={{
                animation: "fadeInUp 0.6s ease-out forwards",
                animationDelay: `${index * 0.1}s`,
                opacity: 0,
              }}
            >
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">{v.icon}</div>
              <div className="mb-3 font-bold text-lg text-white">{v.t}</div>
              <div className="text-sm text-white/70 leading-relaxed">{v.d}</div>
            </div>
          ))}
        </div>

        <style jsx>{`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}</style>
      </section>

      {/* Testimonios */}
      <TestimonialsSection />

      {/* CTA */}
      <section id="cta" className="mx-auto max-w-7xl p-6 pb-16">
        <div className="rounded-2xl border border-white/10 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-violet-500/10 p-6 text-center">
          <h3 className="text-2xl font-bold">¿Listo para tu EPICAL-PC?</h3>
          <p className="mt-2 text-white/70">Escríbenos por WhatsApp o pide tu PC a medida ahora.</p>
          <div className="mt-4 flex flex-wrap justify-center gap-3">
            <a href="https://wa.me/34XXXXXXXXX" target="_blank" rel="noreferrer" className="rounded-xl bg-white px-5 py-2 font-semibold text-black hover:bg-white/90">WhatsApp</a>
            <Link href="/pc-a-medida" className="rounded-xl border border-white/20 px-5 py-2 font-semibold hover:border-white/40">PC a medida</Link>
            <Link href="/contacto" className="rounded-xl border border-white/20 px-5 py-2 font-semibold hover:border-white/40">Contacto</Link>
          </div>
        </div>
      </section>

      {/* Toast de confirmación */}
      {toast.show && (
        <div className="fixed bottom-20 left-1/2 z-50 -translate-x-1/2 rounded-xl border border-white/20 bg-black/90 px-4 py-2 text-sm backdrop-blur animate-fade-in-scale hover-glow">
          {toast.msg}
        </div>
      )}

      {/* Footer Mejorado */}
      <footer className="border-t border-white/10 bg-gradient-to-b from-transparent to-white/5 mt-20">
        <div className="mx-auto max-w-7xl p-6 py-12">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            {/* Logo y descripción */}
            <div className="md:col-span-1">
              <Link href="/" className="text-2xl font-bold block mb-4">
                <span className="text-white">EPICAL</span>
                <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 bg-clip-text text-transparent">-PC</span>
              </Link>
              <p className="text-sm text-white/60 leading-relaxed">
                PCs gaming personalizados con montaje profesional y validación térmica real.
              </p>
              <div className="flex gap-3 mt-4">
                <a href="#" className="h-8 w-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
                  <span className="text-sm">𝕏</span>
                </a>
                <a href="#" className="h-8 w-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
                  <span className="text-sm">IG</span>
                </a>
                <a href="#" className="h-8 w-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
                  <span className="text-sm">YT</span>
                </a>
              </div>
            </div>

            {/* Productos */}
            <div>
              <h3 className="font-semibold text-white mb-4">Productos</h3>
              <ul className="space-y-2 text-sm text-white/60">
                <li><Link href="/productos" className="hover:text-white transition-colors">Todos los PCs</Link></li>
                <li><Link href="/pc-a-medida" className="hover:text-white transition-colors">PC a medida</Link></li>
                <li><Link href="/comparador" className="hover:text-white transition-colors">Comparador</Link></li>
                <li><Link href="/calculadora-gaming" className="hover:text-white transition-colors">Calculadora Gaming</Link></li>
              </ul>
            </div>

            {/* Soporte */}
            <div>
              <h3 className="font-semibold text-white mb-4">Soporte</h3>
              <ul className="space-y-2 text-sm text-white/60">
                <li><Link href="/faq" className="hover:text-white transition-colors">Preguntas frecuentes</Link></li>
                <li><Link href="/contacto" className="hover:text-white transition-colors">Contacto</Link></li>
                <li><Link href="/seguimiento" className="hover:text-white transition-colors">Seguimiento de envío</Link></li>
                <li><Link href="/ventajas" className="hover:text-white transition-colors">Garantías</Link></li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="font-semibold text-white mb-4">Legal</h3>
              <ul className="space-y-2 text-sm text-white/60">
                <li><a href="#" className="hover:text-white transition-colors">Aviso legal</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Política de privacidad</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Política de cookies</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Condiciones de venta</a></li>
              </ul>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-white/10 pt-8 text-center text-xs text-white/50">
            <p>© {new Date().getFullYear()} EPICAL-PC. Todos los derechos reservados.</p>
            <p className="mt-2">Montaje profesional · Validación térmica · 3 años de garantía</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
