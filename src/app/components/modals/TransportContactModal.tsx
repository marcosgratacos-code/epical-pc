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
        <div className="rounded-xl bg-neutral-50 border border-neutral-200 p-4">
          <div className="flex items-start gap-4">
            <div className="h-12 w-12 rounded-xl bg-neutral-50 flex items-center justify-center">
              <span className="text-xl">🚚</span>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-neutral-900 text-lg">{transportInfo.name}</h3>
              <p className="text-sm text-neutral-600 mt-1">{transportInfo.description}</p>
            </div>
          </div>
        </div>

        {/* Información del envío */}
        <div className="rounded-xl bg-neutral-50 border border-neutral-200 p-4">
          <h3 className="font-semibold text-neutral-900 mb-3">Información de tu Envío</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-neutral-500">Número de seguimiento:</span>
              <span className="font-mono text-blue-600">{order.numeroSeguimiento}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-500">Pedido:</span>
              <span className="text-neutral-900">#{order.id}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-500">Estado:</span>
              <span className="text-neutral-900">{order.estado.charAt(0).toUpperCase() + order.estado.slice(1)}</span>
            </div>
          </div>
        </div>

        {/* Opciones de contacto */}
        <div className="space-y-3">
          <h3 className="font-semibold text-neutral-900">Opciones de Contacto</h3>
          
          {/* Teléfono */}
          <button
            onClick={callPhone}
            className="w-full flex items-center gap-3 p-4 rounded-xl bg-neutral-50 border border-neutral-200 hover:bg-neutral-100 transition-all group"
          >
            <div className="h-10 w-10 rounded-lg bg-green-100 flex items-center justify-center group-hover:bg-green-100 transition-all">
              <span className="text-lg">📞</span>
            </div>
            <div className="flex-1 text-left">
              <p className="font-medium text-neutral-900">Llamar por teléfono</p>
              <p className="text-sm text-neutral-500">{transportInfo.phone}</p>
            </div>
            <svg className="h-5 w-5 text-neutral-400 group-hover:text-neutral-900 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Email */}
          {transportInfo.email && (
            <button
              onClick={sendEmail}
              className="w-full flex items-center gap-3 p-4 rounded-xl bg-neutral-50 border border-neutral-200 hover:bg-neutral-100 transition-all group"
            >
              <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center group-hover:bg-blue-100 transition-all">
                <span className="text-lg">📧</span>
              </div>
              <div className="flex-1 text-left">
                <p className="font-medium text-neutral-900">Enviar email</p>
                <p className="text-sm text-neutral-500">{transportInfo.email}</p>
              </div>
              <svg className="h-5 w-5 text-neutral-400 group-hover:text-neutral-900 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}

          {/* Web de seguimiento */}
          <button
            onClick={openTracking}
            className="w-full flex items-center gap-3 p-4 rounded-xl bg-neutral-50 border border-neutral-200 hover:bg-neutral-100 transition-all group"
          >
            <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center group-hover:bg-blue-100 transition-all">
              <span className="text-lg">🔍</span>
            </div>
            <div className="flex-1 text-left">
              <p className="font-medium text-neutral-900">Rastrear en su web</p>
              <p className="text-sm text-neutral-500">Abrir página de seguimiento</p>
            </div>
            <svg className="h-5 w-5 text-neutral-400 group-hover:text-neutral-900 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </button>

          {/* Web principal */}
          <button
            onClick={openWebsite}
            className="w-full flex items-center gap-3 p-4 rounded-xl bg-neutral-50 border border-neutral-200 hover:bg-neutral-100 transition-all group"
          >
            <div className="h-10 w-10 rounded-lg bg-orange-100 flex items-center justify-center group-hover:bg-orange-100 transition-all">
              <span className="text-lg">🌐</span>
            </div>
            <div className="flex-1 text-left">
              <p className="font-medium text-neutral-900">Visitar web oficial</p>
              <p className="text-sm text-neutral-500">{transportInfo.website}</p>
            </div>
            <svg className="h-5 w-5 text-neutral-400 group-hover:text-neutral-900 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </button>
        </div>

        {/* Copiar número de seguimiento */}
        <div className="rounded-xl bg-neutral-50 border border-blue-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-neutral-900 mb-1">Número de Seguimiento</h3>
              <p className="text-sm text-neutral-600">Copia el número para facilitar la consulta</p>
            </div>
            <button
              onClick={copyTrackingNumber}
              className="px-4 py-2 rounded-lg bg-blue-100 text-blue-600 border border-blue-300 hover:bg-blue-100 transition-all text-sm font-medium"
            >
              Copiar
            </button>
          </div>
        </div>

        {/* Consejos */}
        <div className="rounded-xl bg-neutral-50 border border-neutral-200 p-4">
          <h3 className="font-semibold text-neutral-900 mb-3 flex items-center gap-2">
            <span>💡</span>
            Consejos para contactar
          </h3>
          <ul className="space-y-2 text-sm text-neutral-600">
            <li className="flex items-start gap-2">
              <span className="text-green-700 mt-0.5">•</span>
              Ten a mano el número de seguimiento
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-700 mt-0.5">•</span>
              Explica claramente tu consulta o problema
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-700 mt-0.5">•</span>
              Los horarios de atención suelen ser de 9:00 a 18:00
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-700 mt-0.5">•</span>
              Para urgencias, llama por teléfono
            </li>
          </ul>
        </div>

        {/* Acciones */}
        <div className="flex gap-3 pt-4">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-3 rounded-xl bg-neutral-50 border border-neutral-200 text-neutral-900 font-medium hover:bg-neutral-100 transition-all duration-200"
          >
            Cerrar
          </button>
        </div>
      </div>
    </Modal>
  );
}

















