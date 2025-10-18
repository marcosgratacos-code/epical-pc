'use client';

import { useConfigStore } from '@/store/configurator';
import { useRouter } from 'next/navigation';
import { checkCompatibility, getCompletionPercentage } from '@/lib/compat';
import { calculateSavings, getAutoBadges } from '@/lib/recommend';
import Link from 'next/link';
import { useState } from 'react';

export default function ResumenPage() {
  const { build, priceTotal, recommendedPrice, reset } = useConfigStore();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  
  const compat = checkCompatibility(build);
  const completion = getCompletionPercentage(build);
  const savings = calculateSavings(priceTotal, recommendedPrice);
  const badges = getAutoBadges(build);

  const handleSubmitQuote = async () => {
    setIsSubmitting(true);
    
    try {
      // Simular envío de cotización
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setSubmitted(true);
    } catch (error) {
      console.error('Error enviando cotización:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    reset();
    router.push('/configurador');
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
        <div className="max-w-2xl w-full text-center">
          <div className="mb-8">
            <div className="inline-block relative">
              <div className="absolute inset-0 bg-green-500/20 blur-3xl animate-soft-pulse"></div>
              <svg
                className="w-24 h-24 text-green-400 relative z-10 animate-bounce-in"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h1 className="mt-6 text-4xl font-extrabold bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
              ¡Configuración Enviada!
            </h1>
            <p className="mt-3 text-lg text-white/80">
              Hemos recibido tu configuración. Te enviaremos una propuesta final con disponibilidad y precio cerrado en las próximas 24 horas.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 mb-8">
            <h2 className="text-xl font-bold mb-4">Próximos pasos</h2>
            <div className="space-y-3 text-left">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-sm font-bold">1</div>
                <span className="text-white/80">Revisaremos la disponibilidad de todos los componentes</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-sm font-bold">2</div>
                <span className="text-white/80">Te enviaremos un presupuesto final con precio cerrado</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-sm font-bold">3</div>
                <span className="text-white/80">Si aceptas, procederemos con el montaje y envío</span>
              </div>
            </div>
          </div>

          <div className="flex gap-4 justify-center">
            <Link
              href="/"
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-500 to-violet-500 text-white font-semibold hover:shadow-lg hover:shadow-violet-500/50 transition-all"
            >
              Volver al inicio
            </Link>
            <button
              onClick={handleReset}
              className="px-6 py-3 rounded-xl border border-white/20 hover:border-white/40 hover:bg-white/5 transition-all text-white/80 hover:text-white"
            >
              Nueva configuración
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="sticky top-0 z-50 border-b border-white/10 bg-black/95 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <Link 
              href="/configurador/8-caja"
              className="flex items-center gap-2 text-white/60 hover:text-white transition-colors"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Anterior
            </Link>

            <div className="flex items-center gap-4">
              <div className="text-sm text-white/60">
                Resumen final
              </div>
            </div>
          </div>

          {/* Progress bar */}
          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-green-500 to-emerald-500 transition-all duration-500"
              style={{ width: '100%' }}
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-[1fr_400px] gap-8">
          {/* Contenido principal */}
          <div>
            {/* Título */}
            <div className="mb-8">
              <h1 className="text-4xl font-extrabold mb-3">
                <span className="bg-gradient-to-r from-green-400 via-emerald-500 to-cyan-500 bg-clip-text text-transparent">
                  Resumen de tu Configuración
                </span>
              </h1>
              <p className="text-lg text-white/70">
                Revisa todos los componentes seleccionados antes de enviar tu solicitud de cotización.
              </p>
            </div>

            {/* Lista de componentes */}
            <div className="space-y-6">
              {build.cpu && (
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                  <h3 className="text-xl font-bold mb-3">Procesador</h3>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold">{build.cpu.name}</div>
                      <div className="text-sm text-white/60">{build.cpu.cores}C/{build.cpu.threads}T • Hasta {build.cpu.boostGHz} GHz</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">{build.cpu.price.eur.toFixed(2)} €</div>
                    </div>
                  </div>
                </div>
              )}

              {build.mb && (
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                  <h3 className="text-xl font-bold mb-3">Placa Base</h3>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold">{build.mb.name}</div>
                      <div className="text-sm text-white/60">{build.mb.chipset} • {build.mb.ramGen} • PCIe {build.mb.pcieX16Gen}.0</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">{build.mb.price.eur.toFixed(2)} €</div>
                    </div>
                  </div>
                </div>
              )}

              {build.ram && (
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                  <h3 className="text-xl font-bold mb-3">Memoria RAM</h3>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold">{build.ram.name}</div>
                      <div className="text-sm text-white/60">{build.ram.capacityGB}GB • {build.ram.mhz} MHz • CL{build.ram.cl}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">{build.ram.price.eur.toFixed(2)} €</div>
                    </div>
                  </div>
                </div>
              )}

              {build.gpu && (
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                  <h3 className="text-xl font-bold mb-3">Tarjeta Gráfica</h3>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold">{build.gpu.name}</div>
                      <div className="text-sm text-white/60">{build.gpu.vramGB}GB VRAM • PCIe {build.gpu.pcieGen}.0 • {build.gpu.tgpW}W TGP</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">{build.gpu.price.eur.toFixed(2)} €</div>
                    </div>
                  </div>
                </div>
              )}

              {build.storage && build.storage.length > 0 && (
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                  <h3 className="text-xl font-bold mb-3">Almacenamiento</h3>
                  <div className="space-y-3">
                    {build.storage.map((item) => (
                      <div key={item.id} className="flex items-center justify-between">
                        <div>
                          <div className="font-semibold">{item.name}</div>
                          <div className="text-sm text-white/60">{item.capacityTB}TB {item.type}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold">{item.price.eur.toFixed(2)} €</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {build.cooler && (
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                  <h3 className="text-xl font-bold mb-3">Refrigeración</h3>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold">{build.cooler.name}</div>
                      <div className="text-sm text-white/60">
                        {build.cooler.type === 'AIO' ? `AIO ${build.cooler.radMM}mm` : 'Aire'} • Hasta {build.cooler.tdpSupportW}W TDP
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">{build.cooler.price.eur.toFixed(2)} €</div>
                    </div>
                  </div>
                </div>
              )}

              {build.psu && (
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                  <h3 className="text-xl font-bold mb-3">Fuente de Alimentación</h3>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold">{build.psu.name}</div>
                      <div className="text-sm text-white/60">{build.psu.watts}W • {build.psu.standard} • 80+ {build.psu.efficiency80}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">{build.psu.price.eur.toFixed(2)} €</div>
                    </div>
                  </div>
                </div>
              )}

              {build.case && (
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                  <h3 className="text-xl font-bold mb-3">Caja</h3>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold">{build.case.name}</div>
                      <div className="text-sm text-white/60">
                        GPU hasta {build.case.maxGpuLenMM}mm • {build.case.fansIncluded} ventiladores
                        {build.case.supports360Rad && ' • Soporta AIO 360mm'}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">{build.case.price.eur.toFixed(2)} €</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Panel lateral */}
          <div className="space-y-6">
            {/* Precio total */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <h3 className="text-xl font-bold mb-4">Precio Total</h3>
              <div className="text-4xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 bg-clip-text text-transparent mb-2">
                {priceTotal.toFixed(2)} €
              </div>
              <div className="text-sm text-white/60 mb-4">Precio orientativo • IVA incluido</div>
              
              {savings > 0 && (
                <div className="text-sm text-green-400 mb-4">
                  ✓ Ahorro de {savings.toFixed(2)} € vs. configuración recomendada
                </div>
              )}

              {/* Badges */}
              {badges.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {badges.map((badge, i) => (
                    <span 
                      key={i}
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        badge.tone === 'success' ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
                        badge.tone === 'warning' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
                        badge.tone === 'info' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' :
                        'bg-white/10 text-white/60 border border-white/20'
                      }`}
                    >
                      {badge.label}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Compatibilidad */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <h3 className="text-xl font-bold mb-4">Compatibilidad</h3>
              
              {compat.errors.length > 0 && (
                <div className="mb-4">
                  <div className="text-sm font-semibold text-red-400 mb-2">⚠️ Errores</div>
                  {compat.errors.map((e, i) => (
                    <div key={i} className="text-xs text-red-300 mb-1">• {e}</div>
                  ))}
                </div>
              )}

              {compat.warnings.length > 0 && (
                <div className="mb-4">
                  <div className="text-sm font-semibold text-amber-400 mb-2">⚡ Advertencias</div>
                  {compat.warnings.map((w, i) => (
                    <div key={i} className="text-xs text-amber-300 mb-1">• {w}</div>
                  ))}
                </div>
              )}

              {compat.tips.length > 0 && (
                <div className="mb-4">
                  <div className="text-sm font-semibold text-blue-400 mb-2">💡 Recomendaciones</div>
                  {compat.tips.map((t, i) => (
                    <div key={i} className="text-xs text-blue-300 mb-1">• {t}</div>
                  ))}
                </div>
              )}

              {compat.ok && compat.warnings.length === 0 && compat.tips.length === 0 && (
                <div className="text-green-400 text-sm">✓ Configuración compatible</div>
              )}
            </div>

            {/* Botones */}
            <div className="space-y-3">
              <button
                onClick={handleSubmitQuote}
                disabled={!compat.ok || isSubmitting}
                className="w-full rounded-xl py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold disabled:opacity-40 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-green-500/50 transition-all duration-300"
              >
                {isSubmitting ? 'Enviando...' : 'Enviar Configuración'}
              </button>
              
              <button
                onClick={handleReset}
                className="w-full rounded-xl py-3 px-4 border border-white/20 hover:border-white/40 hover:bg-white/5 transition-all text-white/80 hover:text-white"
              >
                Nueva configuración
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

