"use client";

import Image from "next/image";
import { BuildState } from "@/types/build";
import { useBuildValidatorWithSuggestions } from "@/app/hooks/useBuildValidator";

function Badge({ ok }: { ok: boolean }) {
  return (
    <span className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-xs
      ${ok ? "bg-emerald-500/15 text-emerald-300 border border-emerald-500/30"
           : "bg-rose-500/15 text-rose-300 border border-rose-500/30"}`}>
      {ok ? "✓" : "!"}
    </span>
  );
}

export default function BuildValidatorPanel({ 
  build, 
  onReplace 
}: { 
  build: BuildState; 
  onReplace?: (key: string, product: any) => void;
}) {
  const { issues, requiredWatts, ok, suggestions, loading } = useBuildValidatorWithSuggestions(build);

  return (
    <aside className="rounded-2xl border border-white/10 bg-neutral-900/70 p-4 md:p-5 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Validador de compatibilidad</h3>
        <div className={`text-sm px-2 py-1 rounded-md whitespace-nowrap ${ok ? "bg-emerald-500/20 text-emerald-300" : "bg-amber-500/20 text-amber-300"}`}>
          {ok ? "Build compatible" : "Revisión necesaria"}
        </div>
      </div>

      <div className="mt-3 space-y-3">
        {issues.map((i) => (
          <div key={i.key} className="border-t border-white/5 pt-3 first:border-t-0">
            <div className="flex items-start gap-2 text-sm">
              <Badge ok={i.ok} />
              <span className={`flex-1 ${i.severity === "error" ? "text-rose-300" : i.severity === "warn" ? "text-amber-300" : "text-white/80"}`}>
                {i.message}
              </span>
            </div>
            
            {/* Mostrar sugerencias si hay error y tenemos sugerencias */}
            {!i.ok && suggestions[i.key]?.length > 0 && onReplace && (
              <div className="mt-3 space-y-2">
                <div className="text-xs text-white/60">💡 Sugerencias compatibles:</div>
                <div className="grid grid-cols-1 gap-2">
                  {suggestions[i.key].slice(0, 2).map((s: any) => (
                    <button
                      key={s.product.slug}
                      onClick={() => onReplace(i.key, s.product)}
                      className="group flex items-center gap-2 p-2.5 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 transition-all"
                    >
                      <div className="relative w-12 h-12 rounded overflow-hidden bg-white/5 flex-shrink-0">
                        {s.product.image && (
                          <Image 
                            src={s.product.image} 
                            alt={s.product.name} 
                            fill 
                            className="object-contain" 
                            sizes="48px" 
                          />
                        )}
                      </div>
                      <div className="flex-1 text-left min-w-0">
                        <div className="font-medium text-sm text-white/90 group-hover:text-white truncate">
                          {s.product.name}
                        </div>
                        <div className="text-blue-400 text-xs">
                          {s.product.price?.toLocaleString("es-ES", { style: "currency", currency: "EUR" })}
                        </div>
                      </div>
                      <svg className="w-4 h-4 text-white/40 group-hover:text-blue-400 group-hover:translate-x-0.5 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            {/* Loading state */}
            {!i.ok && loading && !suggestions[i.key] && onReplace && (
              <div className="mt-3 text-xs text-white/50 flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white/20 border-t-white/60 rounded-full animate-spin"></div>
                Buscando sugerencias...
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-4 rounded-xl bg-white/5 border border-white/10 p-3 text-sm">
        <div className="flex items-center justify-between">
          <span className="text-white/70">PSU recomendada</span>
          <span className="font-semibold text-blue-300">{requiredWatts} W</span>
        </div>
        {build.psu?.specs?.psuWatts && (
          <div className="mt-1 text-xs text-white/60">
            Tu PSU: {build.psu.specs.psuWatts} W
          </div>
        )}
      </div>
    </aside>
  );
}
