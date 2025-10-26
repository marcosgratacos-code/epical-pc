// Utilidades para gestión de pedidos y seguimiento

import { Order, OrderItem, TrackingEvent, OrderStatus, ShippingInfo } from '@/types/order';

const STORAGE_KEY = 'userOrders';

/**
 * Genera un ID único de pedido en formato EP-YYYY-XXX
 */
export function generateOrderId(): string {
  const year = new Date().getFullYear();
  const timestamp = Date.now().toString().slice(-6);
  return `EP-${year}-${timestamp}`;
}

/**
 * Genera un número de seguimiento único
 */
export function generateTrackingNumber(): string {
  const prefix = 'ES';
  const random = Math.random().toString(36).substring(2, 11).toUpperCase();
  return `${prefix}${random}`;
}

/**
 * Genera un ID único
 */
export function generateUniqueId(): string {
  return Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
}

/**
 * Crea eventos iniciales de seguimiento para un nuevo pedido
 */
export function createInitialTrackingEvents(): TrackingEvent[] {
  const now = new Date();
  const fechaEstimada = new Date(now.getTime() + 5 * 24 * 60 * 60 * 1000); // +5 días

  return [
    {
      id: `event-${Date.now()}-1`,
      fecha: now.toISOString(),
      descripcion: 'Pedido confirmado',
      ubicacion: 'Madrid, España',
      completado: true,
      detalles: 'Tu pedido ha sido recibido y confirmado'
    },
    {
      id: `event-${Date.now()}-2`,
      fecha: new Date(now.getTime() + 24 * 60 * 60 * 1000).toISOString(), // +1 día
      descripcion: 'En preparación',
      ubicacion: 'Centro logístico TITAN',
      completado: false,
      detalles: 'Estamos preparando tu pedido para el envío'
    },
    {
      id: `event-${Date.now()}-3`,
      fecha: new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000).toISOString(), // +2 días
      descripcion: 'Enviado',
      ubicacion: 'Madrid, España',
      completado: false,
      detalles: 'Tu pedido ha sido enviado'
    },
    {
      id: `event-${Date.now()}-4`,
      fecha: new Date(now.getTime() + 4 * 24 * 60 * 60 * 1000).toISOString(), // +4 días
      descripcion: 'En reparto',
      ubicacion: 'Centro de distribución local',
      completado: false,
      detalles: 'Tu pedido está en camino'
    },
    {
      id: `event-${Date.now()}-5`,
      fecha: fechaEstimada.toISOString(),
      descripcion: 'Entregado',
      ubicacion: 'Tu dirección',
      completado: false,
      detalles: 'Tu pedido ha sido entregado'
    }
  ];
}

/**
 * Calcula el porcentaje de progreso basado en el estado del pedido
 */
export function getOrderProgressPercentage(estado: OrderStatus): number {
  switch (estado) {
    case "confirmado":
      return 20;
    case "preparando":
      return 40;
    case "enviado":
      return 60;
    case "en_reparto":
      return 80;
    case "entregado":
      return 100;
    case "cancelado":
      return 0;
    default:
      return 0;
  }
}

/**
 * Obtiene el color del estado para mostrar en la UI
 */
export function getOrderStatusColor(estado: OrderStatus): string {
  switch (estado) {
    case "confirmado":
      return "bg-blue-500/20 text-blue-400 border-blue-500/30";
    case "preparando":
      return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
    case "enviado":
      return "bg-purple-500/20 text-purple-400 border-purple-500/30";
    case "en_reparto":
      return "bg-orange-500/20 text-orange-400 border-orange-500/30";
    case "entregado":
      return "bg-green-500/20 text-green-400 border-green-500/30";
    case "cancelado":
      return "bg-red-500/20 text-red-400 border-red-500/30";
    default:
      return "bg-white/20 text-white border-white/30";
  }
}

/**
 * Obtiene el icono del estado para mostrar en la UI
 */
export function getOrderStatusIcon(estado: OrderStatus): string {
  switch (estado) {
    case "confirmado":
      return "✅";
    case "preparando":
      return "⚙️";
    case "enviado":
      return "📦";
    case "en_reparto":
      return "🚚";
    case "entregado":
      return "🏠";
    case "cancelado":
      return "❌";
    default:
      return "📋";
  }
}

/**
 * Guarda un pedido en localStorage
 */
export function saveOrderToStorage(order: Order): void {
  try {
    const existingOrders = getOrdersFromStorage();
    const updatedOrders = [...existingOrders, order];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedOrders));
  } catch (error) {
    console.error('Error al guardar pedido:', error);
  }
}

/**
 * Obtiene todos los pedidos del localStorage
 */
export function getOrdersFromStorage(): Order[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error al cargar pedidos:', error);
    return [];
  }
}

/**
 * Busca un pedido por ID
 */
export function findOrderById(orderId: string): Order | null {
  const orders = getOrdersFromStorage();
  return orders.find(order => order.id === orderId) || null;
}

/**
 * Busca un pedido por número de seguimiento
 */
export function findOrderByTrackingNumber(trackingNumber: string): Order | null {
  const orders = getOrdersFromStorage();
  return orders.find(order => order.numeroSeguimiento === trackingNumber) || null;
}

/**
 * Busca un pedido por session ID de Stripe
 */
export function findOrderBySessionId(sessionId: string): Order | null {
  const orders = getOrdersFromStorage();
  return orders.find(order => order.sessionId === sessionId) || null;
}

/**
 * Actualiza el estado de un pedido
 */
export function updateOrderStatus(orderId: string, nuevoEstado: OrderStatus, evento?: TrackingEvent): boolean {
  try {
    const orders = getOrdersFromStorage();
    const orderIndex = orders.findIndex(order => order.id === orderId);
    
    if (orderIndex === -1) return false;
    
    orders[orderIndex].estado = nuevoEstado;
    
    if (evento) {
      orders[orderIndex].eventos.push({
        ...evento,
        id: `event-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
      });
    }
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
    return true;
  } catch (error) {
    console.error('Error al actualizar estado del pedido:', error);
    return false;
  }
}

/**
 * Actualiza la dirección de envío de un pedido
 */
export function updateOrderShippingAddress(orderId: string, nuevaDireccion: ShippingInfo): boolean {
  try {
    const orders = getOrdersFromStorage();
    const orderIndex = orders.findIndex(order => order.id === orderId);
    
    if (orderIndex === -1) {
      console.error(`Pedido ${orderId} no encontrado`);
      return false;
    }

    orders[orderIndex].shippingAddress = nuevaDireccion;
    
    // Añadir evento de cambio de dirección
    const evento: TrackingEvent = {
      id: generateUniqueId(),
      fecha: new Date().toISOString(),
      descripcion: "Dirección de envío modificada",
      ubicacion: nuevaDireccion.ciudad || "Online",
      completado: true,
      detalles: `Nueva dirección: ${nuevaDireccion.direccion}, ${nuevaDireccion.ciudad}`
    };
    
    orders[orderIndex].eventos.push(evento);

    localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
    return true;
  } catch (error) {
    console.error("Error al actualizar dirección de envío:", error);
    return false;
  }
}

/**
 * Calcula estadísticas de pedidos
 */
export function calculateOrderStats(orders: Order[]) {
  return {
    totalPedidos: orders.length,
    entregados: orders.filter(o => o.estado === 'entregado').length,
    enCamino: orders.filter(o => ['enviado', 'en_reparto'].includes(o.estado)).length,
    procesando: orders.filter(o => ['confirmado', 'preparando'].includes(o.estado)).length,
    cancelados: orders.filter(o => o.estado === 'cancelado').length
  };
}

/**
 * Crea un pedido desde los datos de Stripe
 */
export function createOrderFromStripeSession(
  sessionId: string,
  customerEmail: string,
  shippingAddress: ShippingInfo,
  productos: OrderItem[],
  total: number
): Order {
  const orderId = generateOrderId();
  const trackingNumber = generateTrackingNumber();
  const eventos = createInitialTrackingEvents();
  
  return {
    id: orderId,
    sessionId,
    fecha: new Date().toISOString(),
    total,
    estado: 'confirmado',
    numeroSeguimiento: trackingNumber,
    customerEmail,
    shippingAddress,
    productos,
    eventos,
    fechaEntregadaEstimada: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
    transportista: 'SEUR'
  };
}

/**
 * Formatea una fecha para mostrar en la UI
 */
export function formatDateForDisplay(dateString: string): string {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  } catch (error) {
    return dateString;
  }
}

/**
 * Formatea una fecha solo con fecha (sin hora)
 */
export function formatDateOnly(dateString: string): string {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  } catch (error) {
    return dateString;
  }
}
