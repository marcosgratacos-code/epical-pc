"use client";

// Componente de testimonios de clientes

import { useState, useEffect } from 'react';

interface Testimonial {
  id: string;
  name: string;
  avatar?: string;
  rating: number;
  comment: string;
  product: string;
  date: string;
  verified: boolean;
}

const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Carlos M.',
    rating: 5,
    comment: 'Increíble PC gaming. El montaje es impecable y las temperaturas son excelentes. EPICAL-PC superó todas mis expectativas.',
    product: 'EPICAL ULTRA',
    date: '2024-01-15',
    verified: true
  },
  {
    id: '2',
    name: 'Ana R.',
    rating: 5,
    comment: 'Servicio excepcional desde el primer contacto. Mi PC llegó perfectamente configurado y funcionando al 100%.',
    product: 'EPICAL ADVANCED',
    date: '2024-01-10',
    verified: true
  },
  {
    id: '3',
    name: 'Miguel L.',
    rating: 5,
    comment: 'La calidad del montaje es profesional. Se nota que saben lo que hacen. Recomiendo totalmente EPICAL-PC.',
    product: 'EPICAL STARTER',
    date: '2024-01-08',
    verified: true
  },
  {
    id: '4',
    name: 'Sofia G.',
    rating: 5,
    comment: 'PC gaming perfecto para mi setup. Las especificaciones son exactas y el rendimiento es espectacular.',
    product: 'EPICAL ULTRA',
    date: '2024-01-05',
    verified: true
  },
  {
    id: '5',
    name: 'David P.',
    rating: 5,
    comment: 'Excelente relación calidad-precio. El soporte técnico es muy profesional y resolvieron todas mis dudas.',
    product: 'EPICAL ADVANCED',
    date: '2024-01-03',
    verified: true
  },
  {
    id: '6',
    name: 'Laura M.',
    rating: 5,
    comment: 'Mi PC gaming soñado hecho realidad. EPICAL-PC me ayudó a elegir la configuración perfecta para mis necesidades.',
    product: 'EPICAL STARTER',
    date: '2024-01-01',
    verified: true
  }
];

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  // Marcar como montado
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToTestimonial = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  // Auto-play
  useEffect(() => {
    if (!isMounted || !isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, isMounted]);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <svg
        key={i}
        className={`h-5 w-5 ${i < rating ? 'text-yellow-400 fill-current' : 'text-white/20'}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <section className="py-16 bg-gradient-to-br from-violet-500/5 to-cyan-500/5">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-violet-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent mb-4">
            Lo que dicen nuestros clientes
          </h2>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Miles de gamers confían en EPICAL-PC para sus setups perfectos
          </p>
        </div>

        {/* Testimonial principal */}
        <div className="relative">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-8 md:p-12 backdrop-blur-sm">
            <div className="flex items-start gap-6">
              {/* Avatar */}
              <div className="flex-shrink-0">
                <div className="h-16 w-16 rounded-full bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center text-white font-bold text-xl">
                  {getInitials(testimonials[currentIndex].name)}
                </div>
              </div>

              {/* Contenido */}
              <div className="flex-1">
                {/* Rating */}
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex">
                    {renderStars(testimonials[currentIndex].rating)}
                  </div>
                  {testimonials[currentIndex].verified && (
                    <span className="px-2 py-1 rounded-full bg-green-500/20 text-green-400 text-xs font-medium border border-green-500/30">
                      ✓ Verificado
                    </span>
                  )}
                </div>

                {/* Comentario */}
                <blockquote className="text-white/90 text-lg md:text-xl leading-relaxed mb-4">
                  "{testimonials[currentIndex].comment}"
                </blockquote>

                {/* Info del cliente */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-white">{testimonials[currentIndex].name}</p>
                    <p className="text-white/60 text-sm">
                      Comprador de {testimonials[currentIndex].product}
                    </p>
                  </div>
                  <p className="text-white/50 text-sm">
                    {new Date(testimonials[currentIndex].date).toLocaleDateString('es-ES')}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Controles de navegación */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prevTestimonial}
              className="p-3 rounded-full bg-white/10 border border-white/20 hover:bg-white/20 transition-all duration-200 touch-target"
              aria-label="Testimonial anterior"
            >
              <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Indicadores */}
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToTestimonial(index)}
                  className={`h-3 w-3 rounded-full transition-all duration-200 ${
                    index === currentIndex
                      ? 'bg-violet-400 w-8'
                      : 'bg-white/20 hover:bg-white/40'
                  }`}
                  aria-label={`Ir al testimonial ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextTestimonial}
              className="p-3 rounded-full bg-white/10 border border-white/20 hover:bg-white/20 transition-all duration-200 touch-target"
              aria-label="Siguiente testimonial"
            >
              <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Grid de testimonios adicionales */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.slice(0, 3).map((testimonial, index) => (
            <div
              key={testimonial.id}
              className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm hover:bg-white/10 transition-all duration-200"
            >
              <div className="flex items-center gap-2 mb-3">
                <div className="flex">
                  {renderStars(testimonial.rating)}
                </div>
                {testimonial.verified && (
                  <span className="px-2 py-1 rounded-full bg-green-500/20 text-green-400 text-xs font-medium">
                    ✓
                  </span>
                )}
              </div>
              
              <p className="text-white/80 text-sm leading-relaxed mb-4">
                "{testimonial.comment}"
              </p>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-white text-sm">{testimonial.name}</p>
                  <p className="text-white/50 text-xs">{testimonial.product}</p>
                </div>
                <p className="text-white/40 text-xs">
                  {new Date(testimonial.date).toLocaleDateString('es-ES')}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <p className="text-white/70 mb-6">
            ¿Quieres ser el siguiente en compartir tu experiencia?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:epicalpc@gmail.com?subject=Testimonial%20de%20cliente"
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-violet-500 to-cyan-500 text-white font-semibold hover:shadow-lg hover:shadow-violet-500/50 transition-all duration-300 touch-target"
            >
              Compartir mi experiencia
            </a>
            <a
              href="/productos"
              className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-semibold hover:bg-white/10 transition-all duration-300 touch-target"
            >
              Ver nuestros productos
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
