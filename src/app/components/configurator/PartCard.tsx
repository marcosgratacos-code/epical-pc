'use client';

import { PartBase } from '@/types/parts';
import Image from 'next/image';
import { useState } from 'react';

interface PartCardProps {
  part: PartBase;
  selected?: boolean;
  onSelect?: () => void;
  onCompare?: () => void;
  isComparing?: boolean;
  details?: React.ReactNode;
}

export default function PartCard({ 
  part, 
  selected, 
  onSelect, 
  onCompare, 
  isComparing,
  details 
}: PartCardProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <div 
      className={`relative rounded-2xl border p-4 transition-all duration-300 hover:shadow-lg ${
        selected 
          ? 'border-violet-500 bg-violet-500/10 shadow-lg shadow-violet-500/20' 
          : 'border-white/10 bg-white/[0.03] hover:border-white/20'
      } ${isComparing ? 'ring-2 ring-cyan-400' : ''}`}
    >
      {/* Checkbox comparar */}
      {onCompare && (
        <div className="absolute top-4 left-4 z-10">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={isComparing}
              onChange={onCompare}
              className="h-4 w-4 rounded border-white/20 bg-white/10 text-cyan-500 focus:ring-2 focus:ring-cyan-500"
            />
            <span className="text-xs text-white/60">Comparar</span>
          </label>
        </div>
      )}

      {/* Badges */}
      <div className="flex flex-wrap gap-2 mb-3">
        {part.recommended && (
          <span className="px-2 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-cyan-500 to-violet-500 text-white">
            Recomendado
          </span>
        )}
        {part.stock === 'low' && (
          <span className="px-2 py-1 rounded-full text-xs font-medium bg-amber-500/20 text-amber-400 border border-amber-500/30">
            Pocas unidades
          </span>
        )}
        {part.stock === 'oos' && (
          <span className="px-2 py-1 rounded-full text-xs font-medium bg-red-500/20 text-red-400 border border-red-500/30">
            Sin stock
          </span>
        )}
        {part.badges?.map((badge, i) => (
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

      {/* Imagen */}
      {part.images && part.images.length > 0 && !imageError ? (
        <div className="relative aspect-[4/3] w-full mb-4 rounded-xl overflow-hidden bg-white/5">
          <Image
            src={part.images[0]}
            alt={part.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-contain"
            onError={() => setImageError(true)}
          />
        </div>
      ) : (
        <div className="aspect-[4/3] w-full mb-4 rounded-xl bg-white/5 flex items-center justify-center">
          <svg className="h-16 w-16 text-white/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
          </svg>
        </div>
      )}

      {/* Información */}
      <div className="mb-3">
        {part.brand && (
          <div className="text-xs text-white/40 uppercase mb-1">{part.brand}</div>
        )}
        <h3 className="font-semibold text-white mb-2 line-clamp-2">{part.name}</h3>
        
        {/* Detalles específicos */}
        {details && (
          <div className="text-sm text-white/70 space-y-1 mb-3">
            {details}
          </div>
        )}
      </div>

      {/* Precio y botón */}
      <div className="flex items-end justify-between gap-3">
        <div>
          <div className="text-2xl font-bold">
            {part.price.eur.toFixed(2)} €
          </div>
          {part.price.isOrientative && (
            <div className="text-xs text-white/40">Orientativo</div>
          )}
        </div>
        
        {onSelect && (
          <button
            onClick={onSelect}
            disabled={part.stock === 'oos'}
            className={`px-4 py-2 rounded-xl font-semibold transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed ${
              selected
                ? 'bg-white/20 text-white'
                : 'bg-gradient-to-r from-cyan-500 via-blue-500 to-violet-500 text-white hover:shadow-lg hover:shadow-violet-500/50'
            }`}
          >
            {selected ? 'Seleccionado' : 'Elegir'}
          </button>
        )}
      </div>
    </div>
  );
}

