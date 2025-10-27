import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/app/lib/stripe";
import Stripe from "stripe";

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
        const customerName = session.customer_details?.name || '';
        const metadata = session.metadata || {};
        
        // Obtener información de envío
        const shippingDetails = session.shipping_details;
        const shippingInfo = {
          nombre: shippingDetails?.name || customerName,
          direccion: shippingDetails?.address?.line1 || '',
          ciudad: shippingDetails?.address?.city || '',
          codigoPostal: shippingDetails?.address?.postal_code || '',
          pais: shippingDetails?.address?.country || 'ES',
          telefono: session.customer_details?.phone || ''
        };
        
        // Obtener line items del checkout para saber qué se compró
        const sessionWithItems = await stripe.checkout.sessions.retrieve(session.id, {
          expand: ['line_items']
        });
        
        const items = (sessionWithItems.line_items?.data || []).map(item => {
          const price = item.price;
          const product = price?.product;
          
          return {
            id: product?.metadata?.productId || (typeof product === 'string' ? product : 'unknown'),
            nombre: (typeof product === 'object' ? product?.name : '') || '',
            nombreCompleto: item.description || '',
            cantidad: item.quantity || 0,
            precio: item.amount_total ? (item.amount_total / 100) : 0,
            image: price?.product && typeof price.product === 'object' ? (price.product.images?.[0] || '') : '',
          };
        });
        
        const total = sessionWithItems.amount_total ? (sessionWithItems.amount_total / 100) : 0;
        
        // Llamar a nuestra API de órdenes para crear el pedido en BD
        const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';
        const orderResponse = await fetch(`${baseUrl}/api/orders`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            sessionId: session.id,
            customerEmail,
            customerName,
            shippingInfo,
            items,
            total,
          }),
        });

        if (!orderResponse.ok) {
          throw new Error('Error creando orden en BD');
        }

        const order = await orderResponse.json();
        
        console.log("📦 Pedido creado en BD:", order.id);
        console.log("📧 Email del cliente:", customerEmail);
        console.log("💰 Total:", total);
        console.log("📦 Productos:", items.length);
        
      } catch (error) {
        console.error("❌ Error al procesar pedido:", error);
        // En producción, deberías enviar una notificación al equipo técnico
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
