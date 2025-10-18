import { NextRequest, NextResponse } from 'next/server';
import { QuoteRequestSchema, QuoteResponse } from '@/types/api';
import { checkCompatibility } from '@/lib/compat';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validar el cuerpo de la petición
    const validationResult = QuoteRequestSchema.safeParse(body);
    
    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Invalid request data', details: validationResult.error.errors },
        { status: 400 }
      );
    }

    const { build, priceTotal, compat, userNotes, contactEmail, contactPhone } = validationResult.data;

    // Verificar compatibilidad
    const compatCheck = checkCompatibility(build);
    
    if (!compatCheck.ok) {
      return NextResponse.json(
        { error: 'Configuration has compatibility issues', compat: compatCheck },
        { status: 400 }
      );
    }

    // Generar ID único para el lead
    const leadId = `EPC-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

    // Aquí normalmente guardarías en base de datos
    console.log('Nueva cotización recibida:', {
      leadId,
      build,
      priceTotal,
      compat: compatCheck,
      userNotes,
      contactEmail,
      contactPhone,
      timestamp: new Date().toISOString(),
    });

    // Simular procesamiento
    await new Promise(resolve => setTimeout(resolve, 1000));

    const response: QuoteResponse = {
      ok: true,
      leadId,
      message: "¡Recibido! Te enviaremos una propuesta final con disponibilidad y precio cerrado en las próximas 24 horas.",
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error processing quote:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

