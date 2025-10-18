// Modal para modificar dirección de entrega

import { useState } from 'react';
import { Order, ShippingInfo } from '@/types/order';
import { updateOrderShippingAddress } from '@/app/lib/orders';
import Modal from './Modal';

interface AddressChangeModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: Order;
}

export default function AddressChangeModal({ isOpen, onClose, order }: AddressChangeModalProps) {
  const [formData, setFormData] = useState<ShippingInfo>({
    nombre: order.shippingAddress.nombre,
    direccion: order.shippingAddress.direccion,
    ciudad: order.shippingAddress.ciudad,
    codigoPostal: order.shippingAddress.codigoPostal,
    pais: order.shippingAddress.pais,
    telefono: order.shippingAddress.telefono || ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Validar si se puede cambiar la dirección
  const canChangeAddress = ['confirmado', 'preparando'].includes(order.estado);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // Simular validación
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Actualizar dirección en localStorage
      const success = updateOrderShippingAddress(order.id, formData);
      
      if (success) {
        setIsSubmitting(false);
        setSubmitted(true);
      } else {
        setError('No se pudo actualizar la dirección. Inténtalo de nuevo.');
        setIsSubmitting(false);
      }
    } catch (err) {
      setError('Error al procesar la solicitud. Inténtalo de nuevo.');
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      nombre: order.shippingAddress.nombre,
      direccion: order.shippingAddress.direccion,
      ciudad: order.shippingAddress.ciudad,
      codigoPostal: order.shippingAddress.codigoPostal,
      pais: order.shippingAddress.pais,
      telefono: order.shippingAddress.telefono || ''
    });
    setSubmitted(false);
    setError(null);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  if (!canChangeAddress) {
    return (
      <Modal
        isOpen={isOpen}
        onClose={handleClose}
        title="No se puede modificar la dirección"
        size="md"
      >
        <div className="text-center space-y-6">
          <div className="inline-block h-20 w-20 rounded-full bg-orange-500/20 flex items-center justify-center">
            <svg className="h-10 w-10 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold text-white mb-2">Dirección no modificable</h3>
            <p className="text-white/70">
              Tu pedido ya está en proceso de envío y no se puede modificar la dirección de entrega.
            </p>
          </div>

          <div className="rounded-xl bg-white/5 border border-white/10 p-4 text-left">
            <h4 className="font-semibold text-white mb-2">Estado actual:</h4>
            <p className="text-sm text-white/70 mb-3">
              <span className="font-medium">{order.estado.charAt(0).toUpperCase() + order.estado.slice(1)}</span>
            </p>
            <h4 className="font-semibold text-white mb-2">¿Qué puedes hacer?</h4>
            <ul className="text-sm text-white/70 space-y-1">
              <li>• Contactar con el transportista directamente</li>
              <li>• Solicitar cambio de dirección en su web</li>
              <li>• Programar nueva entrega</li>
            </ul>
          </div>

          <button
            onClick={handleClose}
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-medium hover:bg-white/10 transition-all duration-200"
          >
            Entendido
          </button>
        </div>
      </Modal>
    );
  }

  if (submitted) {
    return (
      <Modal
        isOpen={isOpen}
        onClose={handleClose}
        title="Dirección Actualizada"
        size="md"
      >
        <div className="text-center space-y-6">
          <div className="inline-block h-20 w-20 rounded-full bg-green-500/20 flex items-center justify-center">
            <svg className="h-10 w-10 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold text-white mb-2">¡Dirección actualizada!</h3>
            <p className="text-white/70">
              La nueva dirección se aplicará a tu pedido. Recibirás una confirmación por email.
            </p>
          </div>

          <div className="rounded-xl bg-white/5 border border-white/10 p-4 text-left">
            <h4 className="font-semibold text-white mb-2">Nueva dirección:</h4>
            <div className="text-sm text-white/70">
              <p className="font-medium">{formData.nombre}</p>
              <p>{formData.direccion}</p>
              <p>{formData.codigoPostal} {formData.ciudad}</p>
              <p>{formData.pais}</p>
              {formData.telefono && <p className="mt-2">Tel: {formData.telefono}</p>}
            </div>
          </div>

          <div className="rounded-xl bg-blue-500/10 border border-blue-500/20 p-4">
            <p className="text-sm text-blue-300">
              <span className="font-semibold">Nota:</span> El cambio se reflejará en las próximas 24 horas. 
              Si el pedido ya está en preparación, es posible que no se pueda aplicar.
            </p>
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
      title="Modificar Dirección de Entrega"
      size="md"
    >
      <div className="space-y-6">
        {/* Información del pedido */}
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

        {/* Dirección actual */}
        <div className="rounded-xl bg-white/5 border border-white/10 p-4">
          <h3 className="font-semibold text-white mb-2">Dirección Actual</h3>
          <div className="text-sm text-white/70">
            <p className="font-medium">{order.shippingAddress.nombre}</p>
            <p>{order.shippingAddress.direccion}</p>
            <p>{order.shippingAddress.codigoPostal} {order.shippingAddress.ciudad}</p>
            <p>{order.shippingAddress.pais}</p>
            {order.shippingAddress.telefono && <p className="mt-2">Tel: {order.shippingAddress.telefono}</p>}
          </div>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Error */}
          {error && (
            <div className="rounded-xl bg-red-500/10 border border-red-500/20 p-4">
              <div className="flex items-center gap-2">
                <svg className="h-5 w-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-red-400 font-medium">Error</p>
              </div>
              <p className="text-red-300 text-sm mt-1">{error}</p>
            </div>
          )}

          {/* Nombre */}
          <div>
            <label className="block text-sm font-medium text-white/60 mb-2">
              Nombre completo *
            </label>
            <input
              type="text"
              value={formData.nombre}
              onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
              required
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-violet-400 transition-all"
              placeholder="Nombre completo"
            />
          </div>

          {/* Dirección */}
          <div>
            <label className="block text-sm font-medium text-white/60 mb-2">
              Dirección *
            </label>
            <input
              type="text"
              value={formData.direccion}
              onChange={(e) => setFormData({ ...formData, direccion: e.target.value })}
              required
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-violet-400 transition-all"
              placeholder="Calle, número, piso, puerta"
            />
          </div>

          {/* Ciudad y código postal */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-white/60 mb-2">
                Ciudad *
              </label>
              <input
                type="text"
                value={formData.ciudad}
                onChange={(e) => setFormData({ ...formData, ciudad: e.target.value })}
                required
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-violet-400 transition-all"
                placeholder="Madrid"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white/60 mb-2">
                Código Postal *
              </label>
              <input
                type="text"
                value={formData.codigoPostal}
                onChange={(e) => setFormData({ ...formData, codigoPostal: e.target.value })}
                required
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-violet-400 transition-all"
                placeholder="28001"
              />
            </div>
          </div>

          {/* País */}
          <div>
            <label className="block text-sm font-medium text-white/60 mb-2">
              País *
            </label>
            <input
              type="text"
              value={formData.pais}
              onChange={(e) => setFormData({ ...formData, pais: e.target.value })}
              required
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-violet-400 transition-all"
              placeholder="España"
            />
          </div>

          {/* Teléfono */}
          <div>
            <label className="block text-sm font-medium text-white/60 mb-2">
              Teléfono de contacto
            </label>
            <input
              type="tel"
              value={formData.telefono}
              onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-violet-400 transition-all"
              placeholder="+34 600 000 000"
            />
          </div>

          {/* Nota importante */}
          <div className="rounded-xl bg-yellow-500/10 border border-yellow-500/20 p-4">
            <div className="flex items-start gap-2">
              <svg className="h-5 w-5 text-yellow-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              <div>
                <p className="text-yellow-300 font-medium text-sm">Importante</p>
                <p className="text-yellow-200 text-sm mt-1">
                  El cambio de dirección solo es posible si el pedido está en estado "Confirmado" o "Preparando". 
                  Una vez enviado, deberás contactar directamente con el transportista.
                </p>
              </div>
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
              disabled={isSubmitting}
              className="flex-1 px-4 py-3 rounded-xl bg-gradient-to-r from-violet-500 to-cyan-500 text-white font-semibold hover:shadow-lg hover:shadow-violet-500/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Actualizando...
                </>
              ) : (
                'Actualizar Dirección'
              )}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
}




