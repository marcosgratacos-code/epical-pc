"use client";

import { useCompare } from "../context/compare-context";
import Link from "next/link";

export default function CompareFloatingButton() {
  const { compareCount, clearCompare } = useCompare();

  if (compareCount === 0) return null;

  return (
    <div className="fixed bottom-24 right-6 z-40 animate-fade-in-scale">
      <div className="rounded-2xl border border-white/20 bg-black/95 backdrop-blur-xl shadow-2xl overflow-hidden">
        <div className="p-4">
          <div className="flex items-center justify-between gap-3 mb-3">
            <div className="flex items-center gap-2">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-cyan-500 via-blue-500 to-violet-500 flex items-center justify-center">
                <span className="text-white font-bold">{compareCount}</span>
              </div>
              <div>
                <div className="text-sm font-semibold text-white">Comparar</div>
                <div className="text-xs text-white/60">
                  {compareCount}/3 productos
                </div>
              </div>
            </div>
            <button
              onClick={clearCompare}
              className="h-8 w-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
              aria-label="Limpiar comparación"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <Link
            href="/comparador"
            className="block w-full px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-500 to-violet-500 text-white text-center font-semibold hover:shadow-lg hover:shadow-violet-500/50 transition-all duration-300"
          >
            Comparar ahora
          </Link>
        </div>
      </div>
    </div>
  );
}

