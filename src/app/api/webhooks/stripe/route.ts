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
      
      // Aquí puedes:
      // - Guardar el pedido en base de datos
      // - Enviar email de confirmación
      // - Actualizar inventario
      // - etc.
      
      const metadata = session.metadata;
      console.log("Metadata del pedido:", metadata);
      
      // Ejemplo de lo que podrías hacer:
      // await saveOrderToDatabase({
      //   sessionId: session.id,
      //   customerEmail: session.customer_details?.email,
      //   amount: session.amount_total,
      //   items: JSON.parse(metadata?.cartItems || '{}'),
      // });
      
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

