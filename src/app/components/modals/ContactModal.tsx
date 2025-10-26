// Modal para contactar con soporte TITAN

import { useState } from 'react';
import { Order } from '@/types/order';
import Modal from './Modal';

interface SupportMessage {
  id: string;
  orderId: string;
  subject: string;
  message: string;
  timestamp: string;
  status: 'pending' | 'resolved';
}

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  order?: Order;
}

const subjects = [
  { id: 'shipping', label: 'Problema con envío', icon: '🚚' },
  { id: 'modify', label: 'Modificar pedido', icon: '✏️' },
  { id: 'return', label: 'Devolución', icon: '↩️' },
  { id: 'technical', label: 'Soporte técnico', icon: '🔧' },
  { id: 'payment', label: 'Problema de pago', icon: '💳' },
  { id: 'other', label: 'Otro', icon: '❓' }
];

export default function ContactModal({ isOpen, onClose, order }: ContactModalProps) {
  const [formData, setFormData] = useState({
    subject: '',
    message: '',
    email: '',
    phone: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simular envío
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Guardar mensaje en localStorage
    const supportMessage: SupportMessage = {
      id: `support-${Date.now()}`,
      orderId: order?.id || 'N/A',
      subject: formData.subject,
      message: formData.message,
      timestamp: new Date().toISOString(),
      status: 'pending'
    };

    const existingMessages = JSON.parse(localStorage.getItem('supportMessages') || '[]');
    existingMessages.push(supportMessage);
    localStorage.setItem('supportMessages', JSON.stringify(existingMessages));

    setIsSubmitting(false);
    setSubmitted(true);
  };

  const resetForm = () => {
    setFormData({
      subject: '',
      message: '',
      email: '',
      phone: ''
    });
    setSubmitted(false);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const sendEmail = () => {
    const subject = `Soporte TITAN - ${formData.subject || 'Consulta'}`;
    const body = `Pedido: ${order?.id || 'N/A'}
Asunto: ${formData.subject || 'Consulta'}
Mensaje: ${formData.message || ''}

Email: ${formData.email || 'No proporcionado'}
Teléfono: ${formData.phone || 'No proporcionado'}`;
    
    window.open(`mailto:epicalpc@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
  };

  const openWhatsApp = () => {
    const message = `Hola, tengo una consulta sobre mi pedido ${order?.id || ''}`;
    window.open(`https://wa.me/34600000000?text=${encodeURIComponent(message)}`);
  };

  if (submitted) {
    return (
      <Modal
        isOpen={isOpen}
        onClose={handleClose}
        title="Mensaje Enviado"
        size="md"
      >
        <div className="text-center space-y-6">
          <div className="inline-block h-20 w-20 rounded-full bg-green-500/20 flex items-center justify-center">
            <svg className="h-10 w-10 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold text-white mb-2">¡Mensaje enviado correctamente!</h3>
            <p className="text-white/70">
              Hemos recibido tu consulta y te responderemos en las próximas 24 horas.
            </p>
          </div>

          <div className="rounded-xl bg-white/5 border border-white/10 p-4">
            <h4 className="font-semibold text-white mb-2">¿Necesitas ayuda inmediata?</h4>
            <div className="flex gap-3">
              <button
                onClick={sendEmail}
                className="flex-1 px-4 py-2 rounded-lg bg-blue-500/20 text-blue-400 border border-blue-500/30 hover:bg-blue-500/30 transition-all text-sm"
              >
                📧 Email
              </button>
              <button
                onClick={openWhatsApp}
                className="flex-1 px-4 py-2 rounded-lg bg-green-500/20 text-green-400 border border-green-500/30 hover:bg-green-500/30 transition-all text-sm"
              >
                💬 WhatsApp
              </button>
            </div>
          </div>

          <button
            onClick={handleClose}
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-medium hover:bg-white/10 transition-all duration-200"
          >
            Cerrar
          </button>
        </div>
      </Modal>
    );
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Contactar con Soporte"
      size="md"
    >
      <div className="space-y-6">
        {/* Información del pedido */}
        {order && (
          <div className="rounded-xl bg-white/5 border border-white/10 p-4">
            <h3 className="font-semibold text-white mb-2">Información del Pedido</h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <span className="text-white/60">Pedido:</span>
                <span className="text-white ml-2">#{order.id}</span>
              </div>
              <div>
                <span className="text-white/60">Estado:</span>
                <span className="text-white ml-2">{order.estado}</span>
              </div>
            </div>
          </div>
        )}

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Asunto */}
          <div>
            <label className="block text-sm font-medium text-white/60 mb-2">
              Asunto *
            </label>
            <select
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              required
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-violet-400 transition-all"
            >
              <option value="">Selecciona un asunto</option>
              {subjects.map(subject => (
                <option key={subject.id} value={subject.label}>
                  {subject.icon} {subject.label}
                </option>
              ))}
            </select>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-white/60 mb-2">
              Email de contacto
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-violet-400 transition-all"
              placeholder="tu@email.com"
            />
          </div>

          {/* Teléfono */}
          <div>
            <label className="block text-sm font-medium text-white/60 mb-2">
              Teléfono (opcional)
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-violet-400 transition-all"
              placeholder="+34 600 000 000"
            />
          </div>

          {/* Mensaje */}
          <div>
            <label className="block text-sm font-medium text-white/60 mb-2">
              Mensaje *
            </label>
            <textarea
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              required
              rows={4}
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-violet-400 transition-all resize-none"
              placeholder="Describe tu consulta o problema..."
            />
          </div>

          {/* Botones de acción rápida */}
          <div className="rounded-xl bg-gradient-to-r from-violet-500/10 to-cyan-500/10 border border-violet-500/20 p-4">
            <h4 className="font-semibold text-white mb-3">¿Necesitas ayuda inmediata?</h4>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={sendEmail}
                className="px-3 py-2 rounded-lg bg-blue-500/20 text-blue-400 border border-blue-500/30 hover:bg-blue-500/30 transition-all text-sm"
              >
                📧 Email
              </button>
              <button
                type="button"
                onClick={openWhatsApp}
                className="px-3 py-2 rounded-lg bg-green-500/20 text-green-400 border border-green-500/30 hover:bg-green-500/30 transition-all text-sm"
              >
                💬 WhatsApp
              </button>
              <button
                type="button"
                className="px-3 py-2 rounded-lg bg-purple-500/20 text-purple-400 border border-purple-500/30 hover:bg-purple-500/30 transition-all text-sm"
              >
                💬 Chat
              </button>
            </div>
          </div>

          {/* Botones */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-medium hover:bg-white/10 transition-all duration-200"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSubmitting || !formData.subject || !formData.message}
              className="flex-1 px-4 py-3 rounded-xl bg-gradient-to-r from-violet-500 to-cyan-500 text-white font-semibold hover:shadow-lg hover:shadow-violet-500/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Enviando...
                </>
              ) : (
                'Enviar Mensaje'
              )}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
}

















