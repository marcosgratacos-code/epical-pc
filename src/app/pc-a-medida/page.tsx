"use client";

import Link from "next/link";
import { useState } from "react";
import PCConfigurator from "../components/PCConfigurator";
import { PCConfiguration } from "../lib/pc-configurator";
import BackButton from "../components/BackButton";
import Gallery from "../components/Gallery";

export default function PCMedidaPage() {
  const [configuration, setConfiguration] = useState<PCConfiguration | null>(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const [showConfigurator, setShowConfigurator] = useState(false);

  const handleConfigurationChange = (config: PCConfiguration, price: number) => {
    setConfiguration(config);
    setTotalPrice(price);
  };

  const handleRequestQuote = () => {
    if (!configuration) return;
    
    // Crear mensaje para WhatsApp con la configuración
    const configText = Object.entries(configuration)
      .filter(([_, component]) => component !== null)
      .map(([category, component]) => `${category.toUpperCase()}: ${component?.name}`)
      .join('\n');
    
    const message = `Hola! Me interesa esta configuración de PC:\n\n${configText}\n\nPrecio total: ${totalPrice.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}\n\n¿Podrían enviarme una propuesta detallada?`;
    
    const whatsappUrl = `https://wa.me/34XXXXXXXXX?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="border-b border-white/10 bg-gradient-to-br from-violet-500/10 to-cyan-500/10">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <BackButton />
          <div className="mt-6">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-violet-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
              PC a Medida
            </h1>
            <p className="text-white/60 mt-2">
              Breve express, propuesta comparada y montaje con validación real
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {!showConfigurator ? (
          /* Pantalla inicial con información */
          <div className="space-y-8">
            {/* Confianza */}
            <div className="flex flex-wrap gap-2 text-xs">
              <span className="inline-flex items-center gap-1 rounded-full border border-white/15 bg-white/[0.04] px-3 py-1.5">
                ✅ 3 años de garantía
              </span>
              <span className="inline-flex items-center gap-1 rounded-full border border-white/15 bg-white/[0.04] px-3 py-1.5">
                🧪 Validación térmica real
              </span>
              <span className="inline-flex items-center gap-1 rounded-full border border-white/15 bg-white/[0.04] px-3 py-1.5">
                🔇 Curvas PWM silenciosas
              </span>
              <span className="inline-flex items-center gap-1 rounded-full border border-white/15 bg-white/[0.04] px-3 py-1.5">
                🧰 Precio cerrado
              </span>
            </div>

            {/* Introducción */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-8 text-center">
              <h2 className="text-2xl font-bold text-white mb-4">¿Por qué elegir EPICAL-PC?</h2>
              <p className="text-white/80 max-w-2xl mx-auto mb-8">
                Te lo entregamos <b>listo, silencioso y estable</b>, con 3 años de garantía y precio cerrado.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <div className="h-16 w-16 rounded-full bg-gradient-to-br from-violet-500/20 to-cyan-500/20 flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🧪</span>
                  </div>
                  <h3 className="font-semibold text-white mb-2">Validación Térmica</h3>
                  <p className="text-white/70 text-sm">Stress testing real y optimización de temperaturas</p>
                </div>
                <div className="text-center">
                  <div className="h-16 w-16 rounded-full bg-gradient-to-br from-violet-500/20 to-cyan-500/20 flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🔇</span>
                  </div>
                  <h3 className="font-semibold text-white mb-2">Silencio Garantizado</h3>
                  <p className="text-white/70 text-sm">Curvas PWM optimizadas para máximo silencio</p>
                </div>
                <div className="text-center">
                  <div className="h-16 w-16 rounded-full bg-gradient-to-br from-violet-500/20 to-cyan-500/20 flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🛡️</span>
                  </div>
                  <h3 className="font-semibold text-white mb-2">3 Años Garantía</h3>
                  <p className="text-white/70 text-sm">Garantía completa en componentes y montaje</p>
                </div>
              </div>
              
              <div className="flex flex-wrap justify-center gap-3">
                <button
                  onClick={() => setShowConfigurator(true)}
                  className="px-8 py-4 rounded-xl bg-gradient-to-r from-violet-500 to-cyan-500 text-white font-semibold hover:shadow-lg hover:shadow-violet-500/50 transition-all duration-300 touch-target"
                >
                  🚀 Configurar Mi PC
                </button>
                <Link
                  href="/#productos"
                  className="px-8 py-4 rounded-xl bg-white/5 border border-white/10 text-white font-semibold hover:bg-white/10 transition-all duration-300 flex items-center"
                >
                  Ver montajes predefinidos
                </Link>
              </div>
            </div>

            {/* Comparativa */}
            <section className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <h2 className="text-xl font-semibold mb-4">Por qué a medida con EPICAL</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left py-2 text-white/60"></th>
                      <th className="text-center py-2 text-cyan-400">EPICAL a medida</th>
                      <th className="text-center py-2 text-white/40">Otras marcas</th>
                    </tr>
                  </thead>
                  <tbody className="text-white/70">
                    <tr className="border-b border-white/10">
                      <td className="py-2">Validación térmica real</td>
                      <td className="text-center">✅</td>
                      <td className="text-center text-white/30">❌</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-2">Curvas PWM silenciosas</td>
                      <td className="text-center">✅</td>
                      <td className="text-center text-white/30">❌</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-2">Precio cerrado</td>
                      <td className="text-center">✅</td>
                      <td className="text-center text-white/30">⚠️ A veces</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-2">Garantía 3 años</td>
                      <td className="text-center">✅</td>
                      <td className="text-center text-white/30">⚠️ 1-2 años</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-2">Drivers + BIOS listos</td>
                      <td className="text-center">✅</td>
                      <td className="text-center text-white/30">❌</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Galería de montajes */}
            <section>
              <h2 className="text-xl font-semibold mb-4">Montajes reales</h2>
              <Gallery 
                images={[
                  { src: "/epical_hero_setup.jpg", alt: "Setup gaming EPICAL-PC" },
                  { src: "/cableado-limpio-01.jpg", alt: "Cable management profesional" },
                  { src: "/workbench-assembly.jpg", alt: "Montaje en banco de trabajo" },
                  { src: "/advanced-internals-01.jpg", alt: "Interior EPICAL ADVANCED" },
                  { src: "/ultra-angle-01.jpg", alt: "EPICAL ULTRA vista angular" },
                  { src: "/before-after-cable-management.jpg", alt: "Antes y después del cableado" }
                ]}
                title="Galería de Montajes EPICAL-PC"
              />
            </section>

            {/* Proceso */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-8">
              <h2 className="text-2xl font-bold text-white mb-6 text-center">Nuestro Proceso</h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="h-12 w-12 rounded-full bg-violet-500/20 text-violet-400 flex items-center justify-center mx-auto mb-3 font-bold">
                    1
                  </div>
                  <h3 className="font-semibold text-white mb-2">Configura o Consulta</h3>
                  <p className="text-white/70 text-sm">Elige tus componentes con nuestro configurador o cuéntanos lo que necesitas</p>
                </div>
                <div className="text-center">
                  <div className="h-12 w-12 rounded-full bg-violet-500/20 text-violet-400 flex items-center justify-center mx-auto mb-3 font-bold">
                    2
                  </div>
                  <h3 className="font-semibold text-white mb-2">Propuesta Express</h3>
                  <p className="text-white/70 text-sm">Recibe propuesta personalizada y consejos en menos de 24h</p>
                </div>
                <div className="text-center">
                  <div className="h-12 w-12 rounded-full bg-violet-500/20 text-violet-400 flex items-center justify-center mx-auto mb-3 font-bold">
                    3
                  </div>
                  <h3 className="font-semibold text-white mb-2">Montaje Profesional</h3>
                  <p className="text-white/70 text-sm">Montaje profesional con validación térmica y curvas PWM</p>
                </div>
                <div className="text-center">
                  <div className="h-12 w-12 rounded-full bg-violet-500/20 text-violet-400 flex items-center justify-center mx-auto mb-3 font-bold">
                    4
                  </div>
                  <h3 className="font-semibold text-white mb-2">Entrega Rápida</h3>
                  <p className="text-white/70 text-sm">PC listo para usar en 24-48h según stock</p>
                </div>
              </div>
            </div>

            {/* CTA Final */}
            <div className="rounded-2xl border border-white/10 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-violet-500/10 p-8 text-center">
              <h3 className="text-2xl font-bold mb-4">¿Listo para tu EPICAL-PC?</h3>
              <p className="text-white/70 mb-6">
                Escríbenos por WhatsApp o pide tu PC a medida ahora.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <a
                  href="https://wa.me/34XXXXXXXXX"
                  target="_blank"
                  rel="noreferrer"
                  className="px-6 py-3 rounded-xl bg-white text-black font-semibold hover:bg-white/90 focus:outline-none focus:ring-2 focus:ring-violet-400"
                >
                  WhatsApp
                </a>
                <button
                  onClick={() => setShowConfigurator(true)}
                  className="px-6 py-3 rounded-xl border border-white/20 font-semibold hover:border-white/40 focus:outline-none focus:ring-2 focus:ring-violet-400"
                >
                  Configurar PC
                </button>
                <a
                  href="mailto:epicalpc@gmail.com?subject=Quiero%20mi%20EPICAL-PC"
                  className="px-6 py-3 rounded-xl border border-white/20 font-semibold hover:border-white/40 focus:outline-none focus:ring-2 focus:ring-violet-400"
                >
                  Email
                </a>
              </div>
            </div>
          </div>
        ) : (
          /* Configurador */
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">Configurador de PC</h2>
              <button
                onClick={() => setShowConfigurator(false)}
                className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white/70 hover:bg-white/10 transition-all"
              >
                ← Volver
              </button>
            </div>

            <PCConfigurator onConfigurationChange={handleConfigurationChange} />

            {/* Botón de solicitar presupuesto */}
            {configuration && totalPrice > 0 && (
              <div className="rounded-2xl border border-white/10 bg-gradient-to-r from-violet-500/10 to-cyan-500/10 p-6 text-center">
                <h3 className="text-xl font-bold text-white mb-4">¿Listo para tu PC?</h3>
                <p className="text-white/70 mb-6">
                  Precio estimado: <span className="text-violet-400 font-bold text-lg">
                    {totalPrice.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}
                  </span>
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={handleRequestQuote}
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-violet-500 to-cyan-500 text-white font-semibold hover:shadow-lg hover:shadow-violet-500/50 transition-all duration-300 touch-target"
                  >
                    📱 Solicitar Presupuesto por WhatsApp
                  </button>
                  <a
                    href="mailto:epicalpc@gmail.com?subject=Consulta%20PC%20a%20medida"
                    className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-semibold hover:bg-white/10 transition-all duration-300 touch-target"
                  >
                    📧 Contactar por Email
                  </a>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}