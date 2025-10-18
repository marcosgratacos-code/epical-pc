// Tipos para el sistema de gestión de pedidos y envíos

export interface OrderItem {
  id: string;
  nombre: string;
  cantidad: number;
  precio: number;
  imagen: string;
  descripcion?: string;
}

export interface ShippingInfo {
  nombre: string;
  direccion: string;
  ciudad: string;
  codigoPostal: string;
  pais: string;
  telefono?: string;
}

export interface TrackingEvent {
  id: string;
  fecha: string;
  descripcion: string;
  ubicacion: string;
  completado: boolean;
  detalles?: string;
}

export type OrderStatus = 
  | "confirmado" 
  | "preparando" 
  | "enviado" 
  | "en_reparto" 
  | "entregado" 
  | "cancelado";

export interface Order {
  id: string;
  sessionId: string;
  fecha: string;
  total: number;
  estado: OrderStatus;
  numeroSeguimiento: string;
  customerEmail: string;
  shippingAddress: ShippingInfo;
  productos: OrderItem[];
  eventos: TrackingEvent[];
  fechaEntregadaEstimada?: string;
  transportista?: string;
  notas?: string;
}

export interface OrderSummary {
  totalPedidos: number;
  entregados: number;
  enCamino: number;
  procesando: number;
  cancelados: number;
}

// Tipos para la API
export interface CreateOrderRequest {
  sessionId: string;
  customerEmail: string;
  shippingAddress: ShippingInfo;
  productos: OrderItem[];
  total: number;
}

export interface UpdateOrderStatusRequest {
  orderId: string;
  nuevoEstado: OrderStatus;
  evento?: Omit<TrackingEvent, 'id'>;
}

export interface TrackingSearchResult {
  encontrado: boolean;
  pedido?: Order;
  mensaje?: string;
}


