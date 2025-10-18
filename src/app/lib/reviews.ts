// src/app/lib/reviews.ts

import { Review, ReviewStats, ReviewFilters, PurchaseVerification, ReviewFormData } from '@/types/review';
import { Order } from '@/types/order';

const STORAGE_KEY_REVIEWS = 'epical-reviews';
const STORAGE_KEY_PURCHASES = 'epical-purchase-verifications';

// Generar ID único para reseñas
export function generateReviewId(): string {
  return `review_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

// Obtener todas las reseñas del localStorage
export function getReviewsFromStorage(): Review[] {
  if (typeof window === 'undefined') return [];
  const raw = localStorage.getItem(STORAGE_KEY_REVIEWS);
  return raw ? JSON.parse(raw) : [];
}

// Guardar reseña en localStorage
export function saveReviewToStorage(review: Review): void {
  const reviews = getReviewsFromStorage();
  reviews.unshift(review); // Añadir al principio (más recientes primero)
  localStorage.setItem(STORAGE_KEY_REVIEWS, JSON.stringify(reviews));
}

// Obtener reseñas de un producto específico
export function getReviewsByProduct(productId: string): Review[] {
  const reviews = getReviewsFromStorage();
  return reviews.filter(review => 
    review.productId === productId && 
    review.published && 
    review.moderated
  );
}

// Obtener estadísticas de reseñas para un producto
export function getReviewStats(productId: string): ReviewStats {
  const reviews = getReviewsByProduct(productId);
  
  if (reviews.length === 0) {
    return {
      totalReviews: 0,
      averageRating: 0,
      ratingDistribution: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 },
      verifiedReviews: 0,
      withImages: 0
    };
  }

  const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
  const averageRating = totalRating / reviews.length;

  const ratingDistribution = reviews.reduce((dist, review) => {
    dist[review.rating as keyof typeof dist]++;
    return dist;
  }, { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 });

  const verifiedReviews = reviews.filter(review => review.verified).length;
  const withImages = reviews.filter(review => review.images && review.images.length > 0).length;

  return {
    totalReviews: reviews.length,
    averageRating: Math.round(averageRating * 10) / 10, // Redondear a 1 decimal
    ratingDistribution,
    verifiedReviews,
    withImages
  };
}

// Filtrar y ordenar reseñas
export function filterAndSortReviews(
  reviews: Review[], 
  filters: ReviewFilters
): Review[] {
  let filtered = [...reviews];

  // Aplicar filtros
  if (filters.rating) {
    filtered = filtered.filter(review => review.rating === filters.rating);
  }

  if (filters.verified !== undefined) {
    filtered = filtered.filter(review => review.verified === filters.verified);
  }

  if (filters.withImages) {
    filtered = filtered.filter(review => review.images && review.images.length > 0);
  }

  // Aplicar ordenación
  switch (filters.sortBy) {
    case 'newest':
      filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      break;
    case 'oldest':
      filtered.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
      break;
    case 'highest':
      filtered.sort((a, b) => b.rating - a.rating);
      break;
    case 'lowest':
      filtered.sort((a, b) => a.rating - b.rating);
      break;
    case 'mostHelpful':
      filtered.sort((a, b) => b.helpful - a.helpful);
      break;
    default:
      // Por defecto: más recientes primero
      filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  return filtered;
}

// Verificar si un usuario ha comprado un producto específico
function verifyPurchase(productId: string, customerEmail: string): { orderId: string; purchaseDate: string } | null {
  if (typeof window === 'undefined') return null;
  
  // Obtener pedidos del localStorage
  const ordersRaw = localStorage.getItem('epical-orders');
  if (!ordersRaw) return null;
  
  try {
    const orders = JSON.parse(ordersRaw);
    
    // Buscar si el usuario ha comprado este producto
    for (const order of orders) {
      if (order.email === customerEmail) {
        const hasProduct = order.productos.some((producto: any) => producto.id === productId);
        if (hasProduct) {
          return {
            orderId: order.id,
            purchaseDate: order.fecha
          };
        }
      }
    }
    
    return null;
  } catch (error) {
    console.error('Error verificando compra:', error);
    return null;
  }
}

// Verificar si un usuario puede reseñar un producto
export function canUserReviewProduct(
  productId: string, 
  customerEmail: string
): PurchaseVerification | null {
  if (!customerEmail) {
    return null; // Usuario no logueado
  }

  // Verificar si ya dejó reseña para este producto
  const reviews = getReviewsFromStorage();
  const existingReview = reviews.find(review => 
    review.productId === productId && 
    review.customerEmail === customerEmail
  );

  if (existingReview) {
    return {
      orderId: existingReview.orderId,
      productId,
      customerEmail,
      purchaseDate: existingReview.createdAt,
      canReview: false,
      hasReviewed: true,
      reviewId: existingReview.id
    };
  }

  // Verificar si el usuario ha comprado este producto
  const purchaseVerification = verifyPurchase(productId, customerEmail);
  
  if (purchaseVerification) {
    return {
      orderId: purchaseVerification.orderId,
      productId,
      customerEmail,
      purchaseDate: purchaseVerification.purchaseDate,
      canReview: true,
      hasReviewed: false,
      reviewId: undefined
    };
  }

  // Usuario no ha comprado este producto
  return {
    orderId: '',
    productId,
    customerEmail,
    purchaseDate: '',
    canReview: false,
    hasReviewed: false,
    reviewId: undefined
  };
}

// Crear nueva reseña
export function createReview(
  productId: string,
  orderId: string,
  customerEmail: string,
  customerName: string,
  formData: ReviewFormData
): Review {
  const reviewId = generateReviewId();
  const now = new Date().toISOString();

  // Simular subida de imágenes (en producción sería a un servicio real)
  const imageUrls = formData.images.map((file, index) => 
    `https://via.placeholder.com/400x300?text=Review+Image+${index + 1}`
  );

  // Determinar si es una reseña verificada (solo si tiene un orderId real)
  const isVerified = orderId !== 'guest-review';

  const review: Review = {
    id: reviewId,
    productId,
    orderId,
    customerEmail,
    customerName,
    rating: formData.rating,
    title: formData.title,
    comment: formData.comment,
    images: imageUrls.length > 0 ? imageUrls : undefined,
    verified: isVerified, // Verificada solo si viene de compra real
    helpful: 0,
    createdAt: now,
    moderated: false, // Requiere moderación antes de publicar
    published: false
  };

  saveReviewToStorage(review);
  return review;
}

// Marcar reseña como útil
export function markReviewAsHelpful(reviewId: string): void {
  const reviews = getReviewsFromStorage();
  const reviewIndex = reviews.findIndex(review => review.id === reviewId);
  
  if (reviewIndex !== -1) {
    reviews[reviewIndex].helpful++;
    localStorage.setItem(STORAGE_KEY_REVIEWS, JSON.stringify(reviews));
  }
}

// Moderar reseña (aprobar/rechazar)
export function moderateReview(reviewId: string, approved: boolean): void {
  const reviews = getReviewsFromStorage();
  const reviewIndex = reviews.findIndex(review => review.id === reviewId);
  
  if (reviewIndex !== -1) {
    reviews[reviewIndex].moderated = true;
    reviews[reviewIndex].published = approved;
    reviews[reviewIndex].updatedAt = new Date().toISOString();
    localStorage.setItem(STORAGE_KEY_REVIEWS, JSON.stringify(reviews));
  }
}

// Obtener todas las reseñas pendientes de moderación
export function getPendingReviews(): Review[] {
  const reviews = getReviewsFromStorage();
  return reviews.filter(review => !review.moderated);
}

// Formatear fecha para mostrar
export function formatReviewDate(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 1) {
    return 'Hace 1 día';
  } else if (diffDays < 7) {
    return `Hace ${diffDays} días`;
  } else if (diffDays < 30) {
    const weeks = Math.floor(diffDays / 7);
    return weeks === 1 ? 'Hace 1 semana' : `Hace ${weeks} semanas`;
  } else {
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
}

// Importar función de orders (necesaria para verificación)
function getOrdersFromStorage(): Order[] {
  if (typeof window === 'undefined') return [];
  const raw = localStorage.getItem('epical-orders');
  return raw ? JSON.parse(raw) : [];
}
