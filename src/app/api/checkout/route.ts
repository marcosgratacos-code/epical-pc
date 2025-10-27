import { NextRequest, NextResponse } from "next/server";
import { stripe, checkStripeConfig } from "@/app/lib/stripe";
import { PRODUCTS } from "@/app/lib/products";
import { applyRateLimit, getClientIp } from "@/lib/ratelimit";
import { assertSameOrigin } from "@/lib/security";

export async function POST(req: NextRequest) {
  try {
    // Rate limiting
    const ip = getClientIp(req);
    const rateLimit = await applyRateLimit(
      `checkout:${ip}`,
      require("@/lib/ratelimit").rl_strict_5req_1m
    );

    if (!rateLimit.success) {
      return NextResponse.json(
        { 
          error: "Demasiadas peticiones", 
          message: "Por favor, espera un momento antes de intentar de nuevo.",
          retryAfter: Math.ceil((rateLimit.reset - Date.now()) / 1000)
        },
        { 
          status: 429,
          headers: {
            "Retry-After": Math.ceil((rateLimit.reset - Date.now()) / 1000).toString()
          }
        }
      );
    }

    // CSRF protection
    if (!assertSameOrigin(req)) {
      return NextResponse.json(
        { error: "Forbidden" },
        { status: 403 }
      );
    }

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

    const body = await req.json();
    const { cartItems } = body;

    // Validación básica del carrito
    if (!cartItems || typeof cartItems !== 'object' || Object.keys(cartItems).length === 0) {
      return NextResponse.json(
        { error: "El carrito está vacío" },
        { status: 400 }
      );
    }

    // Validar items del carrito
    const invalidItems: string[] = [];
    const lineItems = Object.entries(cartItems).map(([productId, quantity]) => {
      // Validar cantidad
      if (typeof quantity !== 'number' || quantity <= 0 || quantity > 10) {
        invalidItems.push(productId);
        return null;
      }

      const product = PRODUCTS.find((p) => p.id === productId);
      
      if (!product) {
        invalidItems.push(productId);
        return null;
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
    }).filter(Boolean);

    if (invalidItems.length > 0 || lineItems.length === 0) {
      return NextResponse.json(
        { error: "Items inválidos en el carrito", invalidItems },
        { status: 400 }
      );
    }

    // Crear sesión de Stripe Checkout
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/pago/exito?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/pago/cancelado`,
      metadata: {
        cartItems: JSON.stringify(cartItems),
        clientIp: ip,
      },
      shipping_address_collection: {
        allowed_countries: ["ES", "PT", "FR", "IT", "DE", "NL", "BE"],
      },
      billing_address_collection: "required",
      phone_number_collection: {
        enabled: true,
      },
    });

    return NextResponse.json({ 
      sessionId: session.id, 
      url: session.url,
      remaining: rateLimit.remaining
    });
  } catch (error: unknown) {
    console.error("Error al crear sesión de checkout:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Error al procesar el pago" },
      { status: 500 }
    );
  }
}
