"use client";

// Página de contacto profesional

import { useState } from 'react';
import BackButton from '../components/BackButton';
import Image from 'next/image';

export default function ContactoPage() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    asunto: '',
    mensaje: '',
    tipoConsulta: 'general'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simular envío (aquí podrías integrar con un servicio real)
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Crear el email con los datos del formulario
      const emailSubject = `[${formData.tipoConsulta.toUpperCase()}] ${formData.asunto}`;
      const emailBody = `
Hola TITAN-PC,

Me pongo en contacto con ustedes por el siguiente motivo:

Tipo de consulta: ${formData.tipoConsulta}
Asunto: ${formData.asunto}

Mensaje:
${formData.mensaje}

---
Datos de contacto:
- Nombre: ${formData.nombre}
- Email: ${formData.email}
- Teléfono: ${formData.telefono}

Gracias por su atención.

Saludos cordiales,
${formData.nombre}
      `.trim();

      // Abrir cliente de email
      const mailtoUrl = `mailto:epicalpc@gmail.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
      window.location.href = mailtoUrl;
      
      setSubmitStatus('success');
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const quickActions = [
    {
      icon: '📞',
      title: 'WhatsApp',
      description: 'Respuesta inmediata',
      action: () => window.open('https://wa.me/34612345678?text=Hola%20TITAN-PC,%20me%20interesa%20configurar%20un%20PC%20a%20medida', '_blank'),
      color: 'from-green-500 to-green-600'
    },
    {
      icon: '💬',
      title: 'Chat en vivo',
      description: 'Soporte técnico',
      action: () => {
        // Aquí podrías abrir el chat widget
        const chatButton = document.querySelector('[aria-label="Abrir chat"]') as HTMLButtonElement;
        if (chatButton) chatButton.click();
      },
      color: 'from-violet-500 to-violet-600'
    },
    {
      icon: '📧',
      title: 'Email directo',
      description: 'epicalpc@gmail.com',
      action: () => window.location.href = 'mailto:epicalpc@gmail.com',
      color: 'from-blue-500 to-blue-600'
    }
  ];

  const contactInfo = [
    {
      icon: '🏢',
      title: 'Oficina',
      details: ['Calle Tecnología 123', '28001 Madrid, España'],
      color: 'text-blue-600'
    },
    {
      icon: '⏰',
      title: 'Horarios',
      details: ['Lunes a Viernes: 9:00 - 18:00', 'Sábados: 10:00 - 14:00'],
      color: 'text-green-700'
    },
    {
      icon: '🚚',
      title: 'Envíos',
      details: ['Peninsular: 24-48h', 'Islas: 3-5 días laborables'],
      color: 'text-blue-600'
    }
  ];

  return (
    <main className="min-h-screen bg-white text-neutral-900">
      <section className="mx-auto max-w-7xl p-6">
        <BackButton />
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">
            <span className="text-neutral-900">
              Contacta con TITAN-PC
            </span>
          </h1>
          <p className="text-neutral-600 text-lg max-w-2xl mx-auto">
            ¿Tienes dudas sobre tu configuración? ¿Necesitas asesoramiento técnico? 
            Estamos aquí para ayudarte a crear el PC perfecto para ti.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Formulario de contacto */}
          <div className="lg:col-span-2">
            <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-8">
              <h2 className="text-2xl font-bold text-neutral-900 mb-6">Envíanos un mensaje</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="nombre" className="block text-sm font-medium text-neutral-700 mb-2">
                      Nombre completo *
                    </label>
                    <input
                      type="text"
                      id="nombre"
                      name="nombre"
                      required
                      value={formData.nombre}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl bg-neutral-50 border border-neutral-200 text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all"
                      placeholder="Tu nombre completo"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl bg-neutral-50 border border-neutral-200 text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all"
                      placeholder="tu@email.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="telefono" className="block text-sm font-medium text-neutral-700 mb-2">
                      Teléfono
                    </label>
                    <input
                      type="tel"
                      id="telefono"
                      name="telefono"
                      value={formData.telefono}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl bg-neutral-50 border border-neutral-200 text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all"
                      placeholder="+34 612 345 678"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="tipoConsulta" className="block text-sm font-medium text-neutral-700 mb-2">
                      Tipo de consulta
                    </label>
                    <select
                      id="tipoConsulta"
                      name="tipoConsulta"
                      value={formData.tipoConsulta}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl bg-neutral-50 border border-neutral-200 text-neutral-900 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all"
                    >
                      <option value="general">Consulta general</option>
                      <option value="configuracion">Configuración PC</option>
                      <option value="pedido">Estado de pedido</option>
                      <option value="soporte">Soporte técnico</option>
                      <option value="garantia">Garantía</option>
                      <option value="devolucion">Devolución</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="asunto" className="block text-sm font-medium text-neutral-700 mb-2">
                    Asunto *
                  </label>
                  <input
                    type="text"
                    id="asunto"
                    name="asunto"
                    required
                    value={formData.asunto}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl bg-neutral-50 border border-neutral-200 text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all"
                    placeholder="Resumen de tu consulta"
                  />
                </div>

                <div>
                  <label htmlFor="mensaje" className="block text-sm font-medium text-neutral-700 mb-2">
                    Mensaje *
                  </label>
                  <textarea
                    id="mensaje"
                    name="mensaje"
                    required
                    rows={6}
                    value={formData.mensaje}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl bg-neutral-50 border border-neutral-200 text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all resize-none"
                    placeholder="Cuéntanos en detalle qué necesitas..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-8 py-4 rounded-xl bg-neutral-900 text-white font-semibold hover:shadow-lg hover:shadow-black/10 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed touch-target"
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-neutral-400 border-t-neutral-900 rounded-full animate-spin"></div>
                      Enviando...
                    </div>
                  ) : (
                    '📧 Enviar Mensaje'
                  )}
                </button>

                {submitStatus === 'success' && (
                  <div className="p-4 rounded-xl bg-green-50 border border-green-200 text-green-700 text-center">
                    ✅ ¡Mensaje enviado! Se abrirá tu cliente de email para completar el envío.
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-center">
                    ❌ Error al enviar. Inténtalo de nuevo o contacta directamente por WhatsApp.
                  </div>
                )}
              </form>
            </div>
          </div>

          {/* Sidebar con información de contacto */}
          <div className="space-y-6">
            {/* Acciones rápidas */}
            <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-6">
              <h3 className="text-xl font-bold text-neutral-900 mb-4">Contacto rápido</h3>
              <div className="space-y-3">
                {quickActions.map((action, index) => (
                  <button
                    key={index}
                    onClick={action.action}
                    className={`w-full p-4 rounded-xl bg-neutral-50 ${action.color} text-neutral-900 font-semibold hover:shadow-lg transition-all duration-300 touch-target`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{action.icon}</span>
                      <div className="text-left">
                        <div className="font-bold">{action.title}</div>
                        <div className="text-sm opacity-90">{action.description}</div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Información de contacto */}
            <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-6">
              <h3 className="text-xl font-bold text-neutral-900 mb-4">Información</h3>
              <div className="space-y-4">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <span className="text-2xl">{info.icon}</span>
                    <div>
                      <h4 className={`font-semibold ${info.color}`}>{info.title}</h4>
                      {info.details.map((detail, i) => (
                        <p key={i} className="text-neutral-600 text-sm">{detail}</p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Garantía destacada */}
            <div className="rounded-2xl border border-green-200 bg-green-50 p-6">
              <div className="text-center">
                <div className="text-4xl mb-3">🛡️</div>
                <h3 className="text-lg font-bold text-green-700 mb-2">Garantía TITAN</h3>
                <p className="text-green-700 text-sm">
                  3 años de garantía completa en todos nuestros montajes con validación térmica real.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ rápida */}
        <div className="mt-16 rounded-2xl border border-neutral-200 bg-neutral-50 p-8">
          <h2 className="text-2xl font-bold text-center text-neutral-900 mb-8">Preguntas frecuentes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200">
                <h4 className="font-semibold text-neutral-900 mb-2">¿Cuánto tarda el montaje?</h4>
                <p className="text-neutral-600 text-sm">Entre 2-5 días laborables, dependiendo de la complejidad y disponibilidad de componentes.</p>
              </div>
              <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200">
                <h4 className="font-semibold text-neutral-900 mb-2">¿Hacen envíos a toda España?</h4>
                <p className="text-neutral-600 text-sm">Sí, enviamos a toda la península e islas con seguro incluido.</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200">
                <h4 className="font-semibold text-neutral-900 mb-2">¿Qué incluye la validación térmica?</h4>
                <p className="text-neutral-600 text-sm">Pruebas de estrés, medición de temperaturas y optimización de curvas PWM para máximo rendimiento y silencio.</p>
              </div>
              <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200">
                <h4 className="font-semibold text-neutral-900 mb-2">¿Puedo cambiar componentes después?</h4>
                <p className="text-neutral-600 text-sm">Sí, ofrecemos servicio de actualización y mantenimiento con descuentos para clientes.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

















