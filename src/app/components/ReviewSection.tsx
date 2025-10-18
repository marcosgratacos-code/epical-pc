"use client";

// Sección completa de reseñas con estadísticas, filtros y lista

import { useState, useEffect } from 'react';
import { Review, ReviewStats, ReviewFilters } from '@/types/review';
import { getReviewsByProduct, getReviewStats, filterAndSortReviews, canUserReviewProduct } from '@/app/lib/reviews';
import { useSession } from 'next-auth/react';
import ReviewCard from './ReviewCard';
import ReviewForm from './ReviewForm';

interface ReviewSectionProps {
  productId: string;
  productName: string;
}

export default function ReviewSection({ productId, productName }: ReviewSectionProps) {
  const { data: session } = useSession();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [stats, setStats] = useState<ReviewStats | null>(null);
  const [filters, setFilters] = useState<ReviewFilters>({ sortBy: 'newest' });
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [canReview, setCanReview] = useState(false);

  useEffect(() => {
    loadReviews();
    checkCanReview();
  }, [productId, session]);

  const loadReviews = () => {
    const productReviews = getReviewsByProduct(productId);
    const productStats = getReviewStats(productId);
    
    setReviews(productReviews);
    setStats(productStats);
  };

  const checkCanReview = () => {
    if (session?.user?.email) {
      const verification = canUserReviewProduct(productId, session.user.email);
      setCanReview(verification?.canReview && !verification?.hasReviewed || false);
    }
  };

  const handleReviewSubmitted = (reviewId: string) => {
    loadReviews();
    checkCanReview();
  };

  const handleFilterChange = (newFilters: Partial<ReviewFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const filteredReviews = filterAndSortReviews(reviews, filters);

  const renderStars = (rating: number, size: 'sm' | 'md' | 'lg' = 'md') => {
    const sizeClasses = {
      sm: 'text-sm',
      md: 'text-lg', 
      lg: 'text-2xl'
    };
    
    return (
      <div className={`flex gap-1 ${sizeClasses[size]}`}>
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={`${
              star <= rating ? 'text-yellow-400' : 'text-white/30'
            }`}
          >
            ★
          </span>
        ))}
      </div>
    );
  };

  const renderRatingBar = (rating: number, count: number, total: number) => {
    const percentage = total > 0 ? (count / total) * 100 : 0;
    
    return (
      <div className="flex items-center gap-3">
        <span className="text-white/70 text-sm w-8">{rating}</span>
        <div className="flex-1 bg-white/10 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-violet-500 to-cyan-500 h-2 rounded-full transition-all duration-500"
            style={{ width: `${percentage}%` }}
          />
        </div>
        <span className="text-white/60 text-sm w-8">{count}</span>
      </div>
    );
  };

  if (!stats) return null;

  return (
    <div className="space-y-8">
      {/* Estadísticas */}
      <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h3 className="text-2xl font-bold text-white mb-2">Reseñas de Clientes</h3>
            <p className="text-white/70">
              {stats.totalReviews} reseña{stats.totalReviews !== 1 ? 's' : ''} verificada{stats.totalReviews !== 1 ? 's' : ''}
            </p>
          </div>
          
          {canReview && (
            <button
              onClick={() => setShowReviewForm(true)}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-violet-500 to-cyan-500 text-white font-semibold hover:shadow-lg hover:shadow-violet-500/50 transition-all duration-300"
            >
              Dejar Reseña
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Rating promedio */}
          <div>
            <div className="flex items-center gap-4 mb-4">
              <div className="text-center">
                <div className="text-4xl font-bold text-white mb-1">
                  {stats.averageRating.toFixed(1)}
                </div>
                {renderStars(Math.round(stats.averageRating), 'lg')}
                <p className="text-white/60 text-sm mt-1">
                  Basado en {stats.totalReviews} reseña{stats.totalReviews !== 1 ? 's' : ''}
                </p>
              </div>
            </div>

            {/* Distribución de ratings */}
            <div className="space-y-2">
              {[5, 4, 3, 2, 1].map((rating) => (
                <div key={rating}>
                  {renderRatingBar(rating, stats.ratingDistribution[rating as keyof typeof stats.ratingDistribution], stats.totalReviews)}
                </div>
              ))}
            </div>
          </div>

          {/* Stats adicionales */}
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                  <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-white">Reseñas Verificadas</p>
                  <p className="text-white/60 text-sm">{stats.verifiedReviews} de {stats.totalReviews}</p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                  <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-white">Con Fotos</p>
                  <p className="text-white/60 text-sm">{stats.withImages} reseña{stats.withImages !== 1 ? 's' : ''}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filtros */}
      {reviews.length > 0 && (
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <div className="flex flex-wrap items-center gap-4">
            <h4 className="text-lg font-semibold text-white">Filtrar reseñas:</h4>
            
            {/* Filtro por rating */}
            <div className="flex items-center gap-2">
              <span className="text-white/70 text-sm">Rating:</span>
              <select
                value={filters.rating || ''}
                onChange={(e) => handleFilterChange({ rating: e.target.value ? parseInt(e.target.value) : undefined })}
                className="px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-violet-400"
              >
                <option value="">Todos</option>
                <option value="5">5 estrellas</option>
                <option value="4">4 estrellas</option>
                <option value="3">3 estrellas</option>
                <option value="2">2 estrellas</option>
                <option value="1">1 estrella</option>
              </select>
            </div>

            {/* Filtro por verificadas */}
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.verified || false}
                onChange={(e) => handleFilterChange({ verified: e.target.checked || undefined })}
                className="rounded border-white/20 bg-white/5 text-violet-500 focus:ring-violet-400"
              />
              <span className="text-white/70 text-sm">Solo verificadas</span>
            </label>

            {/* Filtro por fotos */}
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.withImages || false}
                onChange={(e) => handleFilterChange({ withImages: e.target.checked || undefined })}
                className="rounded border-white/20 bg-white/5 text-violet-500 focus:ring-violet-400"
              />
              <span className="text-white/70 text-sm">Con fotos</span>
            </label>

            {/* Ordenar */}
            <div className="flex items-center gap-2">
              <span className="text-white/70 text-sm">Ordenar:</span>
              <select
                value={filters.sortBy || 'newest'}
                onChange={(e) => handleFilterChange({ sortBy: e.target.value as ReviewFilters['sortBy'] })}
                className="px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-violet-400"
              >
                <option value="newest">Más recientes</option>
                <option value="oldest">Más antiguas</option>
                <option value="highest">Mejor valoradas</option>
                <option value="lowest">Peor valoradas</option>
                <option value="mostHelpful">Más útiles</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Lista de reseñas */}
      {filteredReviews.length > 0 ? (
        <div className="space-y-6">
          {filteredReviews.map((review) => (
            <ReviewCard
              key={review.id}
              review={review}
              onImageClick={setSelectedImage}
            />
          ))}
        </div>
      ) : reviews.length > 0 ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/10 flex items-center justify-center">
            <svg className="w-8 h-8 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">No hay reseñas que coincidan</h3>
          <p className="text-white/60">Prueba ajustando los filtros</p>
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/10 flex items-center justify-center">
            <svg className="w-8 h-8 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">Aún no hay reseñas</h3>
          <p className="text-white/60 mb-6">Sé el primero en compartir tu experiencia</p>
          {canReview && (
            <button
              onClick={() => setShowReviewForm(true)}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-violet-500 to-cyan-500 text-white font-semibold hover:shadow-lg hover:shadow-violet-500/50 transition-all duration-300"
            >
              Dejar Primera Reseña
            </button>
          )}
        </div>
      )}

      {/* Modal de formulario de reseña */}
      {showReviewForm && (
        <ReviewForm
          productId={productId}
          productName={productName}
          onReviewSubmitted={handleReviewSubmitted}
          onClose={() => setShowReviewForm(false)}
        />
      )}

      {/* Modal de imagen ampliada */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" onClick={() => setSelectedImage(null)} />
          <div className="relative max-w-4xl max-h-[90vh]">
            <img
              src={selectedImage}
              alt="Reseña ampliada"
              className="max-w-full max-h-full object-contain rounded-xl"
            />
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}


