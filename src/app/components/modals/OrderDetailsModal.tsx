// Modal para mostrar detalles completos del pedido

import { Order } from '@/types/order';
import { formatDateForDisplay, getOrderStatusColor, getOrderStatusIcon } from '@/app/lib/orders';
import Modal from './Modal';

interface OrderDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: Order;
}

export default function OrderDetailsModal({ isOpen, onClose, order }: OrderDetailsModalProps) {
  const subtotal = order.productos.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
  const envio = subtotal >= 1000 ? 0 : 14.9;
  const iva = subtotal * 0.21;
  const total = subtotal + iva + envio;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Detalles del Pedido #${order.id}`}
      size="lg"
    >
      <div className="space-y-6">
        {/* Información del pedido */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Estado y fechas */}
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200">
              <h3 className="font-semibold text-neutral-900 mb-3">Estado del Pedido</h3>
              <div className="flex items-center gap-3">
                <span className={`px-3 py-2 rounded-lg border font-medium text-sm ${getOrderStatusColor(order.estado)}`}>
                  {getOrderStatusIcon(order.estado)} {order.estado.charAt(0).toUpperCase() + order.estado.slice(1)}
                </span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200">
              <h3 className="font-semibold text-neutral-900 mb-3">Fechas</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-neutral-500">Fecha de pedido:</span>
                  <span className="text-neutral-900">{formatDateForDisplay(order.fecha)}</span>
                </div>
                {order.fechaEntregadaEstimada && (
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Entrega estimada:</span>
                    <span className="text-neutral-900">{formatDateForDisplay(order.fechaEntregadaEstimada)}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Seguimiento */}
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200">
              <h3 className="font-semibold text-neutral-900 mb-3">Seguimiento</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-neutral-500">Número de seguimiento:</span>
                  <span className="font-mono text-blue-600">{order.numeroSeguimiento}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Transportista:</span>
                  <span className="text-neutral-900">{order.transportista || 'Por asignar'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Productos */}
        <div className="rounded-xl bg-neutral-50 border border-neutral-200 p-4">
          <h3 className="font-semibold text-neutral-900 mb-4">Productos</h3>
          <div className="space-y-3">
            {order.productos.map((producto, idx) => (
              <div key={idx} className="flex items-center gap-4 p-3 rounded-lg bg-neutral-50">
                <img
                  src={producto.imagen}
                  alt={producto.nombre}
                  className="h-16 w-16 rounded-lg object-cover ring-2 ring-neutral-200"
                />
                <div className="flex-1">
                  <h4 className="font-medium text-neutral-900">{producto.nombre}</h4>
                  {producto.descripcion && (
                    <p className="text-sm text-neutral-500 mt-1">{producto.descripcion}</p>
                  )}
                  <p className="text-sm text-neutral-500 mt-1">Cantidad: {producto.cantidad}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-neutral-900">{producto.precio}€</p>
                  <p className="text-sm text-neutral-500">Total: {(producto.precio * producto.cantidad)}€</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dirección de envío */}
        <div className="rounded-xl bg-neutral-50 border border-neutral-200 p-4">
          <h3 className="font-semibold text-neutral-900 mb-4">Dirección de Envío</h3>
          <div className="text-sm text-neutral-700">
            <p className="font-medium">{order.shippingAddress.nombre}</p>
            <p>{order.shippingAddress.direccion}</p>
            <p>{order.shippingAddress.codigoPostal} {order.shippingAddress.ciudad}</p>
            <p>{order.shippingAddress.pais}</p>
            {order.shippingAddress.telefono && (
              <p className="mt-2 text-neutral-500">Tel: {order.shippingAddress.telefono}</p>
            )}
          </div>
        </div>

        {/* Resumen de precios */}
        <div className="rounded-xl bg-neutral-50 border border-neutral-200 p-4">
          <h3 className="font-semibold text-neutral-900 mb-4">Resumen de Precios</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-neutral-500">Subtotal:</span>
              <span className="text-neutral-900">{subtotal.toFixed(2)}€</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-500">Envío:</span>
              <span className="text-neutral-900">{envio === 0 ? 'Gratis' : `${envio}€`}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-500">IVA (21%):</span>
              <span className="text-neutral-900">{iva.toFixed(2)}€</span>
            </div>
            <div className="flex justify-between pt-2 border-t border-neutral-200">
              <span className="font-semibold text-neutral-900">Total:</span>
              <span className="font-bold text-green-700">{total.toFixed(2)}€</span>
            </div>
          </div>
        </div>

        {/* Historial de eventos */}
        <div className="rounded-xl bg-neutral-50 border border-neutral-200 p-4">
          <h3 className="font-semibold text-neutral-900 mb-4">Historial del Pedido</h3>
          <div className="space-y-3">
            {order.eventos.map((evento, idx) => (
              <div key={evento.id} className="flex items-start gap-3">
                <div className={`h-6 w-6 rounded-full flex items-center justify-center flex-shrink-0 mt-1 ${
                  evento.completado 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-neutral-100 text-neutral-500'
                }`}>
                  {evento.completado ? '✓' : '○'}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-neutral-900">{evento.descripcion}</p>
                  <p className="text-xs text-neutral-500">{evento.ubicacion}</p>
                  <p className="text-xs text-neutral-500">{formatDateForDisplay(evento.fecha)}</p>
                </div>
              </div>
            ))}
          </div>
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


