"use client";

// Modal profesional para explicar precios orientativos

import { useState } from 'react';

interface PriceInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PriceInfoModal({ isOpen, onClose }: PriceInfoModalProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      icon: '🎯',
      title: '¿Qué significa "precios orientativos"?',
      content: 'Los precios que ves son estimaciones basadas en el mercado actual. Son una guía para ayudarte a planificar tu presupuesto.',
      details: [
        'Basados en precios de mercado actuales',
        'Incluyen márgenes de fluctuación normales',
        'Actualizados regularmente por nuestro equipo'
      ]
    },
    {
      icon: '📊',
      title: '¿Por qué pueden cambiar?',
      content: 'El mercado de componentes PC es muy dinámico. Los precios fluctúan por varios factores:',
      details: [
        'Disponibilidad de stock en tiempo real',
        'Fluctuaciones del mercado internacional',
        'Ofertas especiales de proveedores',
        'Cambios en tipos de cambio (importaciones)'
      ]
    },
    {
      icon: '💎',
      title: 'Nuestro compromiso contigo',
      content: 'En TITAN-PC trabajamos para ofrecerte siempre el mejor precio posible:',
      details: [
        'Propuesta personalizada sin compromiso',
        'Transparencia total en precios finales',
        'Garantía de precio durante 7 días',
        'Sin costes ocultos ni sorpresas'
      ]
    },
    {
      icon: '🚀',
      title: '¿Qué recibirás?',
      content: 'Al finalizar tu configuración, te enviaremos una propuesta completa con:',
      details: [
        'Precio final exacto de cada componente',
        'Disponibilidad real en stock',
        'Tiempo estimado de montaje',
        'Opciones de financiación disponibles'
      ]
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  if (!isOpen) return null;

  const currentSlideData = slides[currentSlide];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-white backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-2xl bg-gradient-to-br from-black/95 to-black/90 border border-neutral-200 rounded-3xl shadow-2xl animate-fade-in-scale overflow-hidden">
        {/* Header */}
        <div className="bg-neutral-50 p-6 border-b border-neutral-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-neutral-50 flex items-center justify-center">
                <span className="text-2xl">{currentSlideData.icon}</span>
              </div>
              <div>
                <h2 className="text-xl font-bold text-neutral-900">Precios Orientativos</h2>
                <p className="text-neutral-500 text-sm">Entiende cómo funcionan nuestros precios</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-neutral-100 hover:bg-neutral-200 transition-colors"
            >
              <svg className="h-6 w-6 text-neutral-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Slide content */}
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-neutral-900 mb-4">
              {currentSlideData.title}
            </h3>
            <p className="text-neutral-700 text-lg leading-relaxed mb-6">
              {currentSlideData.content}
            </p>
            
            {/* Details list */}
            <div className="space-y-3">
              {currentSlideData.details.map((detail, index) => (
                <div key={index} className="flex items-start gap-3 p-3 rounded-xl bg-neutral-50 border border-neutral-200">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-neutral-900 flex items-center justify-center text-white">
                    <span className="text-neutral-900 text-sm font-bold">{index + 1}</span>
                  </div>
                  <p className="text-neutral-800 text-sm text-left">{detail}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between">
            <button
              onClick={prevSlide}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-neutral-50 border border-neutral-200 text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900 transition-all"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Anterior
            </button>

            {/* Dots indicator */}
            <div className="flex gap-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    currentSlide === index 
                      ? 'bg-neutral-900 w-8 text-white' 
                      : 'bg-neutral-300 hover:bg-white/60'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={nextSlide}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-neutral-50 border border-neutral-200 text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900 transition-all"
            >
              Siguiente
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-neutral-50 p-4 border-t border-neutral-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-neutral-500 text-sm">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Slide {currentSlide + 1} de {slides.length}
            </div>
            <button
              onClick={onClose}
              className="px-6 py-2 rounded-xl bg-neutral-900 text-white font-semibold hover:shadow-lg hover:shadow-black/10 transition-all duration-300"
            >
              Entendido
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

















