"use client";

import { useState } from 'react';
import BackButton from "../components/BackButton";

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: 'general' | 'envios' | 'garantia' | 'montaje' | 'pagos';
}

const faqs: FAQ[] = [
  // General
  {
    id: '1',
    question: '¿Qué hace diferente a TITAN-PC?',
    answer: 'TITAN-PC se especializa en montaje profesional con validación térmica real. Realizamos stress testing completo, optimización de curvas PWM para silencio máximo, y cableado profesional. Cada PC se entrega listo para usar con Windows activado, drivers instalados y perfiles XMP/EXPO aplicados.',
    category: 'general'
  },
  {
    id: '2',
    question: '¿Puedo personalizar completamente mi PC?',
    answer: '¡Por supuesto! Ofrecemos PCs completamente personalizables. Puedes elegir cada componente desde nuestro configurador online o contactarnos para una configuración específica. Siempre te asesoramos para asegurar compatibilidad y rendimiento óptimo.',
    category: 'general'
  },
  {
    id: '3',
    question: '¿Qué incluye el precio del PC?',
    answer: 'El precio incluye: montaje profesional, validación térmica, instalación de Windows, drivers actualizados, configuración BIOS/XMP, cableado limpio, garantía de 3 años, y envío. No hay costes ocultos.',
    category: 'general'
  },

  // Envíos
  {
    id: '4',
    question: '¿Cuánto tardan los envíos?',
    answer: 'Los envíos se realizan en 24-48 horas laborables una vez completado el montaje y validación. Te enviamos el número de seguimiento por email y puedes rastrear tu pedido en tiempo real.',
    category: 'envios'
  },
  {
    id: '5',
    question: '¿Puedo cambiar la dirección de envío?',
    answer: 'Sí, puedes modificar la dirección de envío si el pedido aún no está en preparación. Si ya está en proceso, contacta con nosotros inmediatamente por WhatsApp.',
    category: 'envios'
  },
  {
    id: '6',
    question: '¿Qué hago si no estoy en casa para recibir el pedido?',
    answer: 'El transportista intentará entregar en horario comercial. Si no estás disponible, dejarán un aviso para recogida en oficina o reprogramar entrega. También puedes autorizar entrega a un vecino.',
    category: 'envios'
  },
  {
    id: '7',
    question: '¿Los gastos de envío están incluidos?',
    answer: 'Sí, el envío está incluido en el precio del PC. No cobramos gastos de envío adicionales para pedidos dentro de España peninsular.',
    category: 'envios'
  },

  // Garantía
  {
    id: '8',
    question: '¿Qué cubre la garantía de 3 años?',
    answer: 'La garantía cubre todos los componentes del PC y el montaje. Incluye reparación o sustitución de componentes defectuosos, mantenimiento del montaje, y soporte técnico. Es una garantía completa sin costes adicionales.',
    category: 'garantia'
  },
  {
    id: '9',
    question: '¿Qué pasa si un componente falla?',
    answer: 'Si un componente falla dentro del período de garantía, lo reparamos o sustituimos sin coste. Te enviamos un componente de reemplazo o recogemos el PC para reparación en nuestras instalaciones.',
    category: 'garantia'
  },
  {
    id: '10',
    question: '¿Puedo ampliar mi PC después?',
    answer: 'Sí, todos nuestros PCs están diseñados para ser ampliables. Te asesoramos sobre compatibilidad y puedes traer tu PC para ampliaciones con descuento en mano de obra.',
    category: 'garantia'
  },

  // Montaje
  {
    id: '11',
    question: '¿Qué es la validación térmica?',
    answer: 'La validación térmica incluye stress testing completo con Prime95 y FurMark, logging de temperaturas durante 2 horas, optimización de curvas PWM de ventiladores, y ajuste de voltajes para máximo rendimiento y silencio.',
    category: 'montaje'
  },
  {
    id: '12',
    question: '¿Por qué es importante el cableado limpio?',
    answer: 'El cableado limpio mejora el flujo de aire, reduce temperaturas, facilita el mantenimiento futuro, y proporciona una estética profesional. También reduce interferencias electromagnéticas.',
    category: 'montaje'
  },
  {
    id: '13',
    question: '¿Mi PC viene listo para usar?',
    answer: 'Sí, tu PC llega completamente configurado: Windows activado, drivers instalados, BIOS optimizado, perfiles XMP/EXPO aplicados, y software básico instalado. Solo necesitas conectarlo y empezar a usar.',
    category: 'montaje'
  },

  // Pagos
  {
    id: '14',
    question: '¿Qué métodos de pago aceptan?',
    answer: 'Aceptamos tarjetas de crédito/débito (Visa, Mastercard), PayPal, transferencia bancaria, y financiación a través de nuestros partners. Todos los pagos son seguros y procesados por Stripe.',
    category: 'pagos'
  },
  {
    id: '15',
    question: '¿Puedo pagar a plazos?',
    answer: 'Sí, ofrecemos financiación sin intereses hasta 12 meses para pedidos superiores a 1000€. También tenemos opciones de financiación más largas con nuestros partners financieros.',
    category: 'pagos'
  },
  {
    id: '16',
    question: '¿Cuándo se cobra el pago?',
    answer: 'El pago se procesa cuando confirmamos tu pedido y comenzamos el montaje. Si pagas por transferencia, el montaje comienza una vez recibido el pago.',
    category: 'pagos'
  }
];

const categories = [
  { id: 'all', name: 'Todas', icon: '📋' },
  { id: 'general', name: 'General', icon: '❓' },
  { id: 'envios', name: 'Envíos', icon: '📦' },
  { id: 'garantia', name: 'Garantía', icon: '🛡️' },
  { id: 'montaje', name: 'Montaje', icon: '🔧' },
  { id: 'pagos', name: 'Pagos', icon: '💳' }
];

export default function FAQPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [openFAQ, setOpenFAQ] = useState<string | null>(null);

  const filteredFAQs = faqs.filter(faq => {
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleFAQ = (faqId: string) => {
    setOpenFAQ(openFAQ === faqId ? null : faqId);
  };

  return (
    <div className="min-h-screen bg-white text-neutral-900">
      {/* Header */}
      <div className="border-b border-neutral-200 bg-neutral-50">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <BackButton />
          <div className="mt-6 text-center">
            <h1 className="text-4xl font-bold text-neutral-900">
              Preguntas Frecuentes
            </h1>
            <p className="text-neutral-500 mt-2">
              Encuentra respuestas a las dudas más comunes sobre nuestros PCs gaming
            </p>
          </div>
        </div>
      </div>

      {/* Contenido */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Búsqueda */}
        <div className="mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar preguntas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 pl-10 rounded-xl bg-neutral-50 border border-neutral-200 text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
            />
            <svg className="absolute left-3 top-3.5 h-5 w-5 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* Categorías */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  selectedCategory === category.id
                    ? 'bg-blue-100 text-blue-600 border border-blue-300'
                    : 'bg-neutral-50 text-neutral-600 border border-neutral-200 hover:bg-neutral-100'
                }`}
              >
                <span className="mr-2">{category.icon}</span>
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* FAQs */}
        <div className="space-y-4">
          {filteredFAQs.length === 0 ? (
            <div className="text-center py-12">
              <div className="inline-block h-16 w-16 rounded-full bg-neutral-50 flex items-center justify-center mb-4">
                <svg className="h-8 w-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-neutral-900 mb-2">No se encontraron preguntas</h3>
              <p className="text-neutral-500 mb-6">
                Intenta ajustar los filtros de búsqueda o contacta con nosotros directamente.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="https://wa.me/34XXXXXXXXX"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-xl bg-neutral-900 text-white font-semibold hover:shadow-lg hover:shadow-black/10 transition-all duration-300 touch-target"
                >
                  📱 Contactar por WhatsApp
                </a>
                <a
                  href="mailto:epicalpc@gmail.com"
                  className="px-6 py-3 rounded-xl bg-neutral-50 border border-neutral-200 text-neutral-900 font-semibold hover:bg-neutral-100 transition-all duration-300 touch-target"
                >
                  📧 Enviar Email
                </a>
              </div>
            </div>
          ) : (
            filteredFAQs.map((faq) => (
              <div
                key={faq.id}
                className="rounded-xl border border-neutral-200 bg-neutral-50 overflow-hidden"
              >
                <button
                  onClick={() => toggleFAQ(faq.id)}
                  className="w-full px-6 py-4 text-left hover:bg-neutral-50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-neutral-900 pr-4">{faq.question}</h3>
                    <svg
                      className={`h-5 w-5 text-neutral-500 transition-transform ${
                        openFAQ === faq.id ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </button>
                
                {openFAQ === faq.id && (
                  <div className="px-6 pb-4 border-t border-neutral-200">
                    <p className="text-neutral-700 leading-relaxed pt-4">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {/* CTA de contacto */}
        <div className="mt-12 rounded-2xl border border-neutral-200 bg-neutral-50 p-8 text-center">
          <h3 className="text-xl font-bold text-neutral-900 mb-4">¿No encuentras tu respuesta?</h3>
          <p className="text-neutral-600 mb-6">
            Nuestro equipo de soporte está aquí para ayudarte con cualquier duda
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/34XXXXXXXXX"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-xl bg-neutral-900 text-white font-semibold hover:shadow-lg hover:shadow-black/10 transition-all duration-300 touch-target"
            >
              📱 Chat por WhatsApp
            </a>
            <a
              href="mailto:epicalpc@gmail.com?subject=Consulta%20FAQ"
              className="px-6 py-3 rounded-xl bg-neutral-50 border border-neutral-200 text-neutral-900 font-semibold hover:bg-neutral-100 transition-all duration-300 touch-target"
            >
              📧 Enviar Email
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

















