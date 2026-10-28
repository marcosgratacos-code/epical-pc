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
      <aside className="hidden lg:block sticky top-24 w-full rounded-2xl p-6 bg-neutral-100 border border-neutral-200 backdrop-blur-xl shadow-2xl">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold">Tu Configuración</h3>
          <div className="text-sm text-neutral-500">{completion}% completo</div>
        </div>

        {/* Progress bar */}
        <div className="h-2 bg-neutral-100 rounded-full overflow-hidden mb-6">
          <div 
            className="h-full bg-neutral-900 transition-all duration-500 text-white"
            style={{ width: `${completion}%` }}
          />
        </div>

        {/* Listado de partes */}
        <div className="space-y-3 mb-6 max-h-[300px] overflow-y-auto">
          {parts.map((part) => (
            <div key={part.key} className="flex items-start gap-2">
              <div className={`mt-1 h-2 w-2 rounded-full flex-shrink-0 ${part.value ? 'bg-green-400' : 'bg-neutral-200'}`} />
              <div className="flex-1 min-w-0">
                <div className="text-xs text-neutral-400 uppercase">{part.label}</div>
                {Array.isArray(part.value) ? (
                  part.value.length > 0 ? (
                    part.value.map((item: any, idx: number) => (
                      <div key={idx} className="text-sm text-neutral-700 truncate">
                        {item.name}
                      </div>
                    ))
                  ) : (
                    <div className="text-sm text-neutral-400">No seleccionado</div>
                  )
                ) : part.value ? (
                  <div className="text-sm text-neutral-700 truncate">{part.value.name}</div>
                ) : (
                  <div className="text-sm text-neutral-400">No seleccionado</div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Precio */}
        <div className="border-t border-neutral-200 pt-4 mb-4">
          <div className="flex items-baseline justify-between mb-1">
            <span className="text-lg font-semibold">Precio estimado</span>
            <span className="text-3xl font-bold text-neutral-900">
              {priceTotal.toFixed(2)} €
            </span>
          </div>
          {savings > 0 && (
            <div className="text-sm text-green-700">
              ✓ Ahorro de {savings.toFixed(2)} € vs. recomendado
            </div>
          )}
          <div className="text-xs text-neutral-400 mt-1">Precio orientativo · IVA incl.</div>
        </div>

        {/* Badges */}
        {badges.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {badges.map((badge, i) => (
              <span 
                key={i}
                className={`px-2 py-1 rounded-full text-xs font-medium ${
                  badge.tone === 'success' ? 'bg-green-100 text-green-700 border border-green-200' :
                  badge.tone === 'warning' ? 'bg-amber-100 text-amber-700 border border-amber-200' :
                  badge.tone === 'info' ? 'bg-blue-100 text-blue-600 border border-blue-300' :
                  'bg-neutral-100 text-neutral-500 border border-neutral-300'
                }`}
              >
                {badge.label}
              </span>
            ))}
          </div>
        )}

        {/* Errores */}
        {compat.errors.length > 0 && (
          <div className="mb-4 rounded-xl bg-red-50 border border-red-200 p-3">
            <div className="text-sm font-semibold text-red-700 mb-2">⚠️ Errores de compatibilidad</div>
            {compat.errors.map((e, i) => (
              <div key={i} className="text-xs text-red-700 mb-1">• {e}</div>
            ))}
          </div>
        )}

        {/* Advertencias */}
        {compat.warnings.length > 0 && (
          <div className="mb-4 rounded-xl bg-amber-50 border border-amber-200 p-3">
            <div className="text-sm font-semibold text-amber-700 mb-2">⚡ Advertencias</div>
            {compat.warnings.map((w, i) => (
              <div key={i} className="text-xs text-amber-700 mb-1">• {w}</div>
            ))}
          </div>
        )}

        {/* Tips */}
        {compat.tips.length > 0 && (
          <div className="mb-4 rounded-xl bg-blue-50 border border-blue-300 p-3">
            <div className="text-sm font-semibold text-blue-600 mb-2">💡 Recomendaciones</div>
            {compat.tips.map((t, i) => (
              <div key={i} className="text-xs text-blue-600 mb-1">• {t}</div>
            ))}
          </div>
        )}

        {/* Botones */}
        {step > 0 && !isLastStep && (
          <button
            onClick={onNext}
            disabled={!compat.ok || !canProceed}
            className="w-full rounded-xl py-3 px-4 bg-neutral-900 text-white font-semibold disabled:opacity-40 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-black/10 transition-all duration-300"
            title={!compat.ok ? 'Resuelve los errores de compatibilidad' : ''}
          >
            {!compat.ok ? 'Resolver errores para continuar' : 'Siguiente paso'}
          </button>
        )}

        {isLastStep && (
          <Link
            href="/configurador/resumen"
            className="block w-full text-center rounded-xl py-3 px-4 bg-neutral-900 text-white font-semibold hover:shadow-lg hover:shadow-green-500/50 transition-all duration-300"
          >
            Ver Resumen y Enviar
          </Link>
        )}
      </aside>

      {/* Mobile - Bottom Sheet */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-neutral-100 border-t border-neutral-200 backdrop-blur-xl">
        {/* Header siempre visible */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full p-4 flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <div className="text-lg font-bold">{priceTotal.toFixed(2)} €</div>
            <div className="text-xs text-neutral-500">{completion}% completo</div>
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
              <div className="mb-3 rounded-xl bg-red-50 border border-red-200 p-3">
                <div className="text-sm font-semibold text-red-700 mb-2">⚠️ Errores</div>
                {compat.errors.map((e, i) => (
                  <div key={i} className="text-xs text-red-700">• {e}</div>
                ))}
              </div>
            )}

            {/* Partes */}
            <div className="space-y-2 mb-4">
              {parts.filter(p => p.value).map((part) => (
                <div key={part.key} className="text-sm">
                  <span className="text-neutral-400">{part.label}: </span>
                  <span className="text-neutral-900">{Array.isArray(part.value) ? `${part.value.length} items` : part.value?.name || 'N/A'}</span>
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
                className="w-full rounded-xl py-3 bg-neutral-900 text-white font-semibold disabled:opacity-40"
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

