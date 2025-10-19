'use client';

import { useConfigStore } from '@/store/configurator';
import { checkCompatibility, getCompletionPercentage } from '@/lib/compat';
import { calculateSavings, getAutoBadges } from '@/lib/recommend';
import Link from 'next/link';
import { useState } from 'react';

interface SummaryStickyProps {
  onNext?: () => void;
  canProceed?: boolean;
  isLastStep?: boolean;
}

export default function SummarySticky({ onNext, canProceed = true, isLastStep = false }: SummaryStickyProps) {
  const { build, priceTotal, recommendedPrice, step } = useConfigStore();
  const compat = checkCompatibility(build);
  const completion = getCompletionPercentage(build);
  const savings = calculateSavings(priceTotal, recommendedPrice);
  const badges = getAutoBadges(build);
  const [isExpanded, setIsExpanded] = useState(false);

  const parts = [
    { key: 'cpu', label: 'Procesador', value: build.cpu },
    { key: 'mb', label: 'Placa Base', value: build.mb },
    { key: 'ram', label: 'Memoria RAM', value: build.ram },
    { key: 'gpu', label: 'Tarjeta Gráfica', value: build.gpu },
    { key: 'storage', label: 'Almacenamiento', value: build.storage },
    { key: 'cooler', label: 'Refrigeración', value: build.cooler },
    { key: 'psu', label: 'Fuente', value: build.psu },
    { key: 'case', label: 'Caja', value: build.case },
  ];

  return (
    <>
      {/* Desktop - Sticky */}
      <aside className="hidden lg:block sticky top-24 w-full rounded-2xl p-6 bg-neutral-900/80 border border-white/10 backdrop-blur-xl shadow-2xl">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold">Tu Configuración</h3>
          <div className="text-sm text-white/60">{completion}% completo</div>
        </div>

        {/* Progress bar */}
        <div className="h-2 bg-white/10 rounded-full overflow-hidden mb-6">
          <div 
            className="h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-violet-500 transition-all duration-500"
            style={{ width: `${completion}%` }}
          />
        </div>

        {/* Listado de partes */}
        <div className="space-y-3 mb-6 max-h-[300px] overflow-y-auto">
          {parts.map((part) => (
            <div key={part.key} className="flex items-start gap-2">
              <div className={`mt-1 h-2 w-2 rounded-full flex-shrink-0 ${part.value ? 'bg-green-400' : 'bg-white/20'}`} />
              <div className="flex-1 min-w-0">
                <div className="text-xs text-white/40 uppercase">{part.label}</div>
                {Array.isArray(part.value) ? (
                  part.value.length > 0 ? (
                    part.value.map((item: any, idx: number) => (
                      <div key={idx} className="text-sm text-white/80 truncate">
                        {item.name}
                      </div>
                    ))
                  ) : (
                    <div className="text-sm text-white/40">No seleccionado</div>
                  )
                ) : part.value ? (
                  <div className="text-sm text-white/80 truncate">{part.value.name}</div>
                ) : (
                  <div className="text-sm text-white/40">No seleccionado</div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Precio */}
        <div className="border-t border-white/10 pt-4 mb-4">
          <div className="flex items-baseline justify-between mb-1">
            <span className="text-lg font-semibold">Precio estimado</span>
            <span className="text-3xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 bg-clip-text text-transparent">
              {priceTotal.toFixed(2)} €
            </span>
          </div>
          {savings > 0 && (
            <div className="text-sm text-green-400">
              ✓ Ahorro de {savings.toFixed(2)} € vs. recomendado
            </div>
          )}
          <div className="text-xs text-white/40 mt-1">Precio orientativo · IVA incl.</div>
        </div>

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

        {/* Errores */}
        {compat.errors.length > 0 && (
          <div className="mb-4 rounded-xl bg-red-500/10 border border-red-500/30 p-3">
            <div className="text-sm font-semibold text-red-400 mb-2">⚠️ Errores de compatibilidad</div>
            {compat.errors.map((e, i) => (
              <div key={i} className="text-xs text-red-300 mb-1">• {e}</div>
            ))}
          </div>
        )}

        {/* Advertencias */}
        {compat.warnings.length > 0 && (
          <div className="mb-4 rounded-xl bg-amber-500/10 border border-amber-500/30 p-3">
            <div className="text-sm font-semibold text-amber-400 mb-2">⚡ Advertencias</div>
            {compat.warnings.map((w, i) => (
              <div key={i} className="text-xs text-amber-300 mb-1">• {w}</div>
            ))}
          </div>
        )}

        {/* Tips */}
        {compat.tips.length > 0 && (
          <div className="mb-4 rounded-xl bg-blue-500/10 border border-blue-500/30 p-3">
            <div className="text-sm font-semibold text-blue-400 mb-2">💡 Recomendaciones</div>
            {compat.tips.map((t, i) => (
              <div key={i} className="text-xs text-blue-300 mb-1">• {t}</div>
            ))}
          </div>
        )}

        {/* Botones */}
        {step > 0 && !isLastStep && (
          <button
            onClick={onNext}
            disabled={!compat.ok || !canProceed}
            className="w-full rounded-xl py-3 px-4 bg-gradient-to-r from-cyan-500 via-blue-500 to-violet-500 text-white font-semibold disabled:opacity-40 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-violet-500/50 transition-all duration-300"
            title={!compat.ok ? 'Resuelve los errores de compatibilidad' : ''}
          >
            {!compat.ok ? 'Resolver errores para continuar' : 'Siguiente paso'}
          </button>
        )}

        {isLastStep && (
          <Link
            href="/configurador/resumen"
            className="block w-full text-center rounded-xl py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold hover:shadow-lg hover:shadow-green-500/50 transition-all duration-300"
          >
            Ver Resumen y Enviar
          </Link>
        )}
      </aside>

      {/* Mobile - Bottom Sheet */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-neutral-900/95 border-t border-white/10 backdrop-blur-xl">
        {/* Header siempre visible */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full p-4 flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <div className="text-lg font-bold">{priceTotal.toFixed(2)} €</div>
            <div className="text-xs text-white/60">{completion}% completo</div>
          </div>
          <svg 
            className={`h-5 w-5 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
          </svg>
        </button>

        {/* Contenido expandible */}
        {isExpanded && (
          <div className="p-4 pt-0 max-h-[70vh] overflow-y-auto">
            {/* Alertas */}
            {compat.errors.length > 0 && (
              <div className="mb-3 rounded-xl bg-red-500/10 border border-red-500/30 p-3">
                <div className="text-sm font-semibold text-red-400 mb-2">⚠️ Errores</div>
                {compat.errors.map((e, i) => (
                  <div key={i} className="text-xs text-red-300">• {e}</div>
                ))}
              </div>
            )}

            {/* Partes */}
            <div className="space-y-2 mb-4">
              {parts.filter(p => p.value).map((part) => (
                <div key={part.key} className="text-sm">
                  <span className="text-white/40">{part.label}: </span>
                  <span className="text-white">{Array.isArray(part.value) ? `${part.value.length} items` : part.value?.name || 'N/A'}</span>
                </div>
              ))}
            </div>

            {/* Botón siguiente */}
            {step > 0 && !isLastStep && (
              <button
                onClick={() => {
                  setIsExpanded(false);
                  onNext?.();
                }}
                disabled={!compat.ok || !canProceed}
                className="w-full rounded-xl py-3 bg-gradient-to-r from-cyan-500 via-blue-500 to-violet-500 text-white font-semibold disabled:opacity-40"
              >
                Siguiente
              </button>
            )}
          </div>
        )}
      </div>
    </>
  );
}

