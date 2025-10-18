// src/types/review.ts

export interface Review {
  id: string;
  productId: string;
  orderId: string; // Para verificar que compró el producto
  customerEmail: string;
  customerName: string;
  rating: number; // 1-5 estrellas
  title: string;
  comment: string;
  images?: string[]; // URLs de imágenes subidas
  verified: boolean; // Si la compra está verificada
  helpful: number; // Número de "me gusta" útiles
  createdAt: string; // ISO string
  updatedAt?: string; // ISO string
  moderated: boolean; // Si ha sido aprobada por moderación
  published: boolean; // Si está visible públicamente
}

export interface ReviewStats {
  totalReviews: number;
  averageRating: number;
  ratingDistribution: {
    5: number;
    4: number;
    3: number;
    2: number;
    1: number;
  };
  verifiedReviews: number;
  withImages: number;
}

export interface ReviewFilters {
  rating?: number; // Filtrar por estrellas específicas
  verified?: boolean; // Solo reseñas verificadas
  withImages?: boolean; // Solo reseñas con fotos
  sortBy?: 'newest' | 'oldest' | 'highest' | 'lowest' | 'mostHelpful';
}

export interface ReviewFormData {
  rating: number;
  title: string;
  comment: string;
  images: File[];
}

export interface PurchaseVerification {
  orderId: string;
  productId: string;
  customerEmail: string;
  purchaseDate: string;
  canReview: boolean;
  hasReviewed: boolean;
  reviewId?: string; // Si ya dejó reseña
}



