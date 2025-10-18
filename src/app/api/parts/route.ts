import { NextRequest, NextResponse } from 'next/server';
import { getPartsByCategory } from '@/lib/parts-data';
import { PartsQueryParams, PartsResponse } from '@/types/api';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    const category = searchParams.get('category');
    const socket = searchParams.get('socket');
    const ramGen = searchParams.get('ramGen');
    const budgetMax = searchParams.get('budgetMax');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const orderBy = searchParams.get('orderBy') as 'recommended' | 'price_asc' | 'price_desc' | 'perf' || 'recommended';

    if (!category) {
      return NextResponse.json({ error: 'Category is required' }, { status: 400 });
    }

    // Obtener partes por categoría
    let parts = getPartsByCategory(category);

    // Aplicar filtros
    if (socket) {
      parts = parts.filter((part: any) => part.socket === socket);
    }

    if (ramGen) {
      parts = parts.filter((part: any) => part.ramGen === ramGen);
    }

    if (budgetMax) {
      const maxPrice = parseFloat(budgetMax);
      parts = parts.filter((part: any) => part.price.eur <= maxPrice);
    }

    // Aplicar ordenación
    switch (orderBy) {
      case 'recommended':
        parts.sort((a: any, b: any) => (b.recommended ? 1 : 0) - (a.recommended ? 1 : 0));
        break;
      case 'price_asc':
        parts.sort((a: any, b: any) => a.price.eur - b.price.eur);
        break;
      case 'price_desc':
        parts.sort((a: any, b: any) => b.price.eur - a.price.eur);
        break;
      case 'perf':
        // Heurística simple de rendimiento
        if (category === 'cpu') {
          parts.sort((a: any, b: any) => (b.cores * b.boostGHz) - (a.cores * a.boostGHz));
        } else if (category === 'gpu') {
          parts.sort((a: any, b: any) => b.vramGB - a.vramGB);
        }
        break;
    }

    // Paginación
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedParts = parts.slice(startIndex, endIndex);

    const response: PartsResponse = {
      items: paginatedParts,
      total: parts.length,
      page,
      hasMore: endIndex < parts.length,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error fetching parts:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

