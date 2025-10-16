import { NextRequest, NextResponse } from "next/server";
import { stripe, checkStripeConfig } from "@/app/lib/stripe";
import { PRODUCTS } from "@/app/lib/products";

export async function POST(req: NextRequest) {
  try {
    // Verificar si Stripe está configurado
    if (!stripe) {
      return NextResponse.json(
        { 
          error: "Sistema de pagos no configurado",
          message: "Stripe no está configurado. Por favor, configura las claves de Stripe en .env.local. Consulta CONFIGURAR_STRIPE.md para instrucciones."
        },
        { status: 503 }
      );
    }

    checkStripeConfig();

    const { cartItems } = await req.json();

    if (!cartItems || Object.keys(cartItems).length === 0) {
      return NextResponse.json(
        { error: "El carrito está vacío" },
        { status: 400 }
      );
    }

    // Crear line items para Stripe
    const lineItems = Object.entries(cartItems).map(([productId, quantity]) => {
      const product = PRODUCTS.find((p) => p.id === productId);
      
      if (!product) {
        throw new Error(`Producto no encontrado: ${productId}`);
      }

      return {
        price_data: {
          currency: "eur",
          product_data: {
            name: product.name,
            description: product.desc || "",
            images: product.image ? [`${process.env.NEXTAUTH_URL || 'http://localhost:3000'}${product.image}`] : [],
          },
          unit_amount: Math.round(product.price * 100), // Convertir a centavos
        },
        quantity: quantity as number,
      };
    });

    // Crear sesión de Stripe Checkout
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/pago/exito?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/pago/cancelado`,
      metadata: {
        cartItems: JSON.stringify(cartItems),
      },
      shipping_address_collection: {
        allowed_countries: ["ES", "PT", "FR", "IT", "DE", "NL", "BE"],
      },
      billing_address_collection: "required",
      phone_number_collection: {
        enabled: true,
      },
    });

    return NextResponse.json({ sessionId: session.id, url: session.url });
  } catch (error: unknown) {
    console.error("Error al crear sesión de checkout:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Error al procesar el pago" },
      { status: 500 }
    );
  }
}

