import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendOrderConfirmationEmail } from "@/lib/email";

// Genera un número de seguimiento único
function generateTrackingNumber(): string {
  const prefix = 'TN';
  const random = Math.random().toString(36).substring(2, 11).toUpperCase();
  return `${prefix}${random}`;
}

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    const {
      sessionId,
      customerEmail,
      customerName,
      shippingInfo,
      items,
      total,
    } = body;

    // Validar datos
    if (!customerEmail || !items || items.length === 0 || !total) {
      return NextResponse.json(
        { error: "Faltan datos requeridos" },
        { status: 400 }
      );
    }

    // Idempotencia: verificar si ya existe orden con este sessionId
    let existingOrder = null;
    if (sessionId) {
      existingOrder = await prisma.order.findFirst({
        where: { sessionId },
        include: { items: true, events: true },
      });

      if (existingOrder) {
        console.log("⚠️ Orden ya existe (idempotencia):", sessionId);
        return NextResponse.json(existingOrder, { status: 200 });
      }
    }

    // Crear la orden en transacción
    const order = await prisma.$transaction(async (tx) => {
      const newOrder = await tx.order.create({
        data: {
          sessionId,
          customerEmail,
          customerName,
          status: 'CONFIRMED',
          total: Math.round(total * 100), // convertir a centavos
          shippingName: shippingInfo?.nombre || shippingInfo?.nombre,
          shippingAddress: JSON.stringify(shippingInfo),
          shippingCity: shippingInfo?.ciudad,
          shippingPostal: shippingInfo?.codigoPostal,
          shippingCountry: shippingInfo?.pais || 'ES',
          shippingPhone: shippingInfo?.telefono,
          trackingNumber: generateTrackingNumber(),
          transportista: 'SEUR',
          metadata: JSON.stringify({ createdAt: new Date().toISOString() }),
          items: {
            create: items.map((item: any) => ({
              productId: item.id,
              name: item.nombre || item.name,
              price: Math.round((item.precio || item.price) * 100),
              quantity: item.cantidad || item.quantity,
              image: item.imagen || item.image,
            })),
          },
          events: {
            create: {
              description: 'Pedido confirmado',
              location: 'Madrid, España',
              completed: true,
            },
          },
        },
        include: {
          items: true,
          events: true,
        },
      });

      return newOrder;
    });

    // Enviar email de confirmación (si está configurado)
    try {
      const emailData = {
        id: order.id,
        fecha: order.createdAt.toISOString(),
        total: order.total,
        customerEmail: order.customerEmail,
        numeroSeguimiento: order.trackingNumber || '',
        productos: order.items.map(item => ({
          id: item.productId || '',
          nombre: item.name,
          cantidad: item.quantity,
          precio: item.price,
          imagen: item.image || '',
        })),
        shippingAddress: shippingInfo,
      };
      
      await sendOrderConfirmationEmail(emailData);
    } catch (emailError) {
      console.error('Error enviando email:', emailError);
      // No fallar el pedido si el email falla
    }

    return NextResponse.json(order, { status: 201 });
  } catch (error: any) {
    console.error("Error creando orden:", error);
    return NextResponse.json(
      { error: "Error creando orden", details: error.message },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");
    const sessionId = searchParams.get("sessionId");

    if (!email && !sessionId) {
      return NextResponse.json(
        { error: "Se requiere email o sessionId" },
        { status: 400 }
      );
    }

    const where: any = {};
    if (email) where.customerEmail = email;
    if (sessionId) where.sessionId = sessionId;

    const orders = await prisma.order.findMany({
      where,
      include: {
        items: true,
        events: {
          orderBy: { createdAt: "desc" },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(orders);
  } catch (error: any) {
    console.error("Error obteniendo órdenes:", error);
    return NextResponse.json(
      { error: "Error obteniendo órdenes", details: error.message },
      { status: 500 }
    );
  }
}

