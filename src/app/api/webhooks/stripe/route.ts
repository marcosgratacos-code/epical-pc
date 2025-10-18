import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/app/lib/stripe";
import Stripe from "stripe";
import { createOrderFromStripeSession, saveOrderToStorage } from "@/app/lib/orders";
import { OrderItem, ShippingInfo } from "@/types/order";
import { PRODUCTS } from "@/app/lib/products";

export async function POST(req: NextRequest) {
  // Verificar si Stripe está configurado
  if (!stripe) {
    return NextResponse.json(
      { error: "Stripe no está configurado" },
      { status: 503 }
    );
  }

  const body = await req.text();
  const signature = req.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json(
      { error: "No signature provided" },
      { status: 400 }
    );
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET || ""
    );
  } catch (err: unknown) {
    console.error("⚠️  Webhook signature verification failed:", err);
    return NextResponse.json(
      { error: `Webhook Error: ${err instanceof Error ? err.message : 'Unknown error'}` },
      { status: 400 }
    );
  }

  // Manejar el evento
  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      console.log("✅ Pago completado:", session.id);
      
      try {
        // Extraer información del pedido
        const customerEmail = session.customer_details?.email || session.customer_email || '';
        const metadata = session.metadata;
        const cartItems = metadata?.cartItems ? JSON.parse(metadata.cartItems) : {};
        
        // Obtener información de envío
        const shippingDetails = session.shipping_details;
        const shippingAddress: ShippingInfo = {
          nombre: shippingDetails?.name || '',
          direccion: shippingDetails?.address?.line1 || '',
          ciudad: shippingDetails?.address?.city || '',
          codigoPostal: shippingDetails?.address?.postal_code || '',
          pais: shippingDetails?.address?.country || '',
          telefono: session.customer_details?.phone || ''
        };
        
        // Convertir items del carrito a OrderItems
        const productos: OrderItem[] = Object.entries(cartItems).map(([productId, quantity]) => {
          const product = PRODUCTS.find(p => p.id === productId);
          if (!product) {
            throw new Error(`Producto no encontrado: ${productId}`);
          }
          
          return {
            id: product.id,
            nombre: product.name,
            cantidad: quantity as number,
            precio: product.price,
            imagen: product.image,
            descripcion: product.desc
          };
        });
        
        // Calcular total
        const total = productos.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
        
        // Crear el pedido
        const order = createOrderFromStripeSession(
          session.id,
          customerEmail,
          shippingAddress,
          productos,
          total
        );
        
        // Guardar el pedido
        saveOrderToStorage(order);
        
        console.log("📦 Pedido creado:", order.id);
        console.log("📧 Email del cliente:", customerEmail);
        console.log("💰 Total:", total);
        console.log("📦 Productos:", productos.length);
        
        // Aquí podrías también:
        // - Enviar email de confirmación
        // - Actualizar inventario
        // - Notificar al equipo de logística
        // - etc.
        
      } catch (error) {
        console.error("❌ Error al procesar pedido:", error);
        // En producción, deberías manejar este error apropiadamente
        // Por ejemplo, enviar una notificación al equipo técnico
      }
      
      break;
    }
    
    case "payment_intent.succeeded": {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      console.log("💳 PaymentIntent exitoso:", paymentIntent.id);
      break;
    }
    
    case "payment_intent.payment_failed": {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      console.log("❌ PaymentIntent fallido:", paymentIntent.id);
      break;
    }
    
    default:
      console.log(`Evento no manejado: ${event.type}`);
  }

  return NextResponse.json({ received: true });
}

