// Modal con información de contacto del transportista

import { Order } from '@/types/order';
import Modal from './Modal';

interface TransportContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: Order;
}

interface TransportInfo {
  name: string;
  phone: string;
  website: string;
  trackingUrl: string;
  email?: string;
  description: string;
}

const getTransportInfo = (transportista?: string): TransportInfo => {
  switch (transportista?.toLowerCase()) {
    case 'seur':
      return {
        name: 'SEUR',
        phone: '902 101 010',
        website: 'https://www.seur.com',
        trackingUrl: 'https://www.seur.com/es/seguimiento-envio',
        email: 'info@seur.com',
        description: 'SEUR es una empresa de mensajería y paquetería española con amplia cobertura nacional e internacional.'
      };
    case 'mrw':
      return {
        name: 'MRW',
        phone: '900 300 400',
        website: 'https://www.mrw.es',
        trackingUrl: 'https://www.mrw.es/seguimiento',
        email: 'info@mrw.es',
        description: 'MRW es una empresa de transporte urgente y mensajería con más de 40 años de experiencia.'
      };
    case 'correos':
      return {
        name: 'Correos',
        phone: '902 197 197',
        website: 'https://www.correos.es',
        trackingUrl: 'https://www.correos.es/es/es/tracking',
        email: 'info@correos.es',
        description: 'Correos es el servicio postal oficial de España con cobertura nacional e internacional.'
      };
    default:
      return {
        name: 'Transportista',
        phone: '900 000 000',
        website: '#',
        trackingUrl: '#',
        description: 'Información de contacto del transportista asignado a tu pedido.'
      };
  }
};

export default function TransportContactModal({ isOpen, onClose, order }: TransportContactModalProps) {
  const transportInfo = getTransportInfo(order.transportista);

  const copyTrackingNumber = () => {
    navigator.clipboard.writeText(order.numeroSeguimiento);
    // Aquí podrías mostrar un toast de confirmación
  };

  const openWebsite = () => {
    window.open(transportInfo.website, '_blank');
  };

  const openTracking = () => {
    window.open(transportInfo.trackingUrl, '_blank');
  };

  const callPhone = () => {
    window.open(`tel:${transportInfo.phone}`);
  };

  const sendEmail = () => {
    if (transportInfo.email) {
      const subject = `Consulta sobre envío ${order.numeroSeguimiento}`;
      const body = `Hola,\n\nTengo una consulta sobre mi envío con número de seguimiento: ${order.numeroSeguimiento}\n\nPedido: ${order.id}\n\nGracias.`;
      window.open(`mailto:${transportInfo.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Contactar con ${transportInfo.name}`}
      size="md"
    >
      <div className="space-y-6">
        {/* Información del transportista */}
        <div className="rounded-xl bg-white/5 border border-white/10 p-4">
          <div className="flex items-start gap-4">
            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
              <span className="text-xl">🚚</span>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-white text-lg">{transportInfo.name}</h3>
              <p className="text-sm text-white/70 mt-1">{transportInfo.description}</p>
            </div>
          </div>
        </div>

        {/* Información del envío */}
        <div className="rounded-xl bg-white/5 border border-white/10 p-4">
          <h3 className="font-semibold text-white mb-3">Información de tu Envío</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-white/60">Número de seguimiento:</span>
              <span className="font-mono text-cyan-400">{order.numeroSeguimiento}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/60">Pedido:</span>
              <span className="text-white">#{order.id}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/60">Estado:</span>
              <span className="text-white">{order.estado.charAt(0).toUpperCase() + order.estado.slice(1)}</span>
            </div>
          </div>
        </div>

        {/* Opciones de contacto */}
        <div className="space-y-3">
          <h3 className="font-semibold text-white">Opciones de Contacto</h3>
          
          {/* Teléfono */}
          <button
            onClick={callPhone}
            className="w-full flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all group"
          >
            <div className="h-10 w-10 rounded-lg bg-green-500/20 flex items-center justify-center group-hover:bg-green-500/30 transition-all">
              <span className="text-lg">📞</span>
            </div>
            <div className="flex-1 text-left">
              <p className="font-medium text-white">Llamar por teléfono</p>
              <p className="text-sm text-white/60">{transportInfo.phone}</p>
            </div>
            <svg className="h-5 w-5 text-white/40 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Email */}
          {transportInfo.email && (
            <button
              onClick={sendEmail}
              className="w-full flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all group"
            >
              <div className="h-10 w-10 rounded-lg bg-blue-500/20 flex items-center justify-center group-hover:bg-blue-500/30 transition-all">
                <span className="text-lg">📧</span>
              </div>
              <div className="flex-1 text-left">
                <p className="font-medium text-white">Enviar email</p>
                <p className="text-sm text-white/60">{transportInfo.email}</p>
              </div>
              <svg className="h-5 w-5 text-white/40 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}

          {/* Web de seguimiento */}
          <button
            onClick={openTracking}
            className="w-full flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all group"
          >
            <div className="h-10 w-10 rounded-lg bg-purple-500/20 flex items-center justify-center group-hover:bg-purple-500/30 transition-all">
              <span className="text-lg">🔍</span>
            </div>
            <div className="flex-1 text-left">
              <p className="font-medium text-white">Rastrear en su web</p>
              <p className="text-sm text-white/60">Abrir página de seguimiento</p>
            </div>
            <svg className="h-5 w-5 text-white/40 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </button>

          {/* Web principal */}
          <button
            onClick={openWebsite}
            className="w-full flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all group"
          >
            <div className="h-10 w-10 rounded-lg bg-orange-500/20 flex items-center justify-center group-hover:bg-orange-500/30 transition-all">
              <span className="text-lg">🌐</span>
            </div>
            <div className="flex-1 text-left">
              <p className="font-medium text-white">Visitar web oficial</p>
              <p className="text-sm text-white/60">{transportInfo.website}</p>
            </div>
            <svg className="h-5 w-5 text-white/40 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </button>
        </div>

        {/* Copiar número de seguimiento */}
        <div className="rounded-xl bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-white mb-1">Número de Seguimiento</h3>
              <p className="text-sm text-white/70">Copia el número para facilitar la consulta</p>
            </div>
            <button
              onClick={copyTrackingNumber}
              className="px-4 py-2 rounded-lg bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 hover:bg-cyan-500/30 transition-all text-sm font-medium"
            >
              Copiar
            </button>
          </div>
        </div>

        {/* Consejos */}
        <div className="rounded-xl bg-white/5 border border-white/10 p-4">
          <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
            <span>💡</span>
            Consejos para contactar
          </h3>
          <ul className="space-y-2 text-sm text-white/70">
            <li className="flex items-start gap-2">
              <span className="text-green-400 mt-0.5">•</span>
              Ten a mano el número de seguimiento
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-400 mt-0.5">•</span>
              Explica claramente tu consulta o problema
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-400 mt-0.5">•</span>
              Los horarios de atención suelen ser de 9:00 a 18:00
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-400 mt-0.5">•</span>
              Para urgencias, llama por teléfono
            </li>
          </ul>
        </div>

        {/* Acciones */}
        <div className="flex gap-3 pt-4">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-medium hover:bg-white/10 transition-all duration-200"
          >
            Cerrar
          </button>
        </div>
      </div>
    </Modal>
  );
}

















