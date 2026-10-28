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
          ? 'border-blue-600 bg-blue-50 shadow-lg shadow-black/10' 
          : 'border-neutral-200 bg-neutral-50 hover:border-neutral-300'
      } ${isComparing ? 'ring-2 ring-blue-600' : ''}`}
    >
      {/* Checkbox comparar */}
      {onCompare && (
        <div className="absolute top-4 left-4 z-10">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={isComparing}
              onChange={onCompare}
              className="h-4 w-4 rounded border-neutral-300 bg-neutral-100 text-cyan-500 focus:ring-2 focus:ring-blue-600"
            />
            <span className="text-xs text-neutral-500">Comparar</span>
          </label>
        </div>
      )}

      {/* Badges */}
      <div className="flex flex-wrap gap-2 mb-3">
        {part.recommended && (
          <span className="px-2 py-1 rounded-full text-xs font-semibold bg-neutral-900 text-white">
            Recomendado
          </span>
        )}
        {part.stock === 'low' && (
          <span className="px-2 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-700 border border-amber-200">
            Pocas unidades
          </span>
        )}
        {part.stock === 'oos' && (
          <span className="px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700 border border-red-200">
            Sin stock
          </span>
        )}
        {part.badges?.map((badge, i) => (
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

      {/* Imagen */}
      {part.images && part.images.length > 0 && !imageError ? (
        <div className="relative aspect-[4/3] w-full mb-4 rounded-xl overflow-hidden bg-neutral-50">
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
        <div className="aspect-[4/3] w-full mb-4 rounded-xl bg-neutral-50 flex items-center justify-center">
          <svg className="h-16 w-16 text-neutral-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
          </svg>
        </div>
      )}

      {/* Información */}
      <div className="mb-3">
        {part.brand && (
          <div className="text-xs text-neutral-400 uppercase mb-1">{part.brand}</div>
        )}
        <h3 className="font-semibold text-neutral-900 mb-2 line-clamp-2">{part.name}</h3>
        
        {/* Detalles específicos */}
        {details && (
          <div className="text-sm text-neutral-600 space-y-1 mb-3">
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
            <div className="text-xs text-neutral-400">Orientativo</div>
          )}
        </div>
        
        {onSelect && (
          <button
            onClick={onSelect}
            disabled={part.stock === 'oos'}
            className={`px-4 py-2 rounded-xl font-semibold transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed ${
              selected
                ? 'bg-neutral-200 text-neutral-900'
                : 'bg-neutral-900 text-white hover:shadow-lg hover:shadow-black/10'
            }`}
          >
            {selected ? 'Seleccionado' : 'Elegir'}
          </button>
        )}
      </div>
    </div>
  );
}

