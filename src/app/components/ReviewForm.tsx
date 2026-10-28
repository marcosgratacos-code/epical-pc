"use client";

// Componente para dejar reseñas (solo usuarios que compraron)

import { useState } from 'react';
import { ReviewFormData } from '@/types/review';
import { createReview, canUserReviewProduct } from '@/app/lib/reviews';
import { useSession } from 'next-auth/react';

interface ReviewFormProps {
  productId: string;
  productName: string;
  onReviewSubmitted: (reviewId: string) => void;
  onClose: () => void;
}

export default function ReviewForm({ productId, productName, onReviewSubmitted, onClose }: ReviewFormProps) {
  const { data: session } = useSession();
  const [formData, setFormData] = useState<ReviewFormData>({
    rating: 0,
    title: '',
    comment: '',
    images: []
  });
  const [hoveredRating, setHoveredRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Verificar si el usuario puede reseñar
  const customerEmail = session?.user?.email || '';
  const verification = canUserReviewProduct(productId, customerEmail);

  if (!verification) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-white backdrop-blur-sm" onClick={onClose} />
        <div className="relative w-full max-w-md bg-gradient-to-br from-black/95 to-black/90 border border-neutral-200 rounded-2xl shadow-2xl animate-fade-in-scale">
          <div className="p-6 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-100 flex items-center justify-center">
              <svg className="w-8 h-8 text-red-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-neutral-900 mb-2">No puedes reseñar este producto</h3>
            <p className="text-neutral-600 mb-6">
              Solo los clientes que han comprado este producto pueden dejar reseñas.
            </p>
            <button
              onClick={onClose}
              className="w-full px-6 py-3 rounded-xl bg-neutral-900 text-white font-semibold hover:shadow-lg hover:shadow-black/10 transition-all duration-300"
            >
              Entendido
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (verification.hasReviewed) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-white backdrop-blur-sm" onClick={onClose} />
        <div className="relative w-full max-w-md bg-gradient-to-br from-black/95 to-black/90 border border-neutral-200 rounded-2xl shadow-2xl animate-fade-in-scale">
          <div className="p-6 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-blue-100 flex items-center justify-center">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-neutral-900 mb-2">Ya has reseñado este producto</h3>
            <p className="text-neutral-600 mb-6">
              Gracias por tu reseña. Solo puedes dejar una reseña por producto comprado.
            </p>
            <button
              onClick={onClose}
              className="w-full px-6 py-3 rounded-xl bg-neutral-900 text-white font-semibold hover:shadow-lg hover:shadow-black/10 transition-all duration-300"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    );
  }

  const handleRatingClick = (rating: number) => {
    setFormData(prev => ({ ...prev, rating }));
  };

  const handleInputChange = (field: keyof ReviewFormData, value: string | File[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setError(null);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 3) {
      setError('Máximo 3 imágenes');
      return;
    }
    setFormData(prev => ({ ...prev, images: files }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.rating === 0) {
      setError('Por favor, selecciona una valoración');
      return;
    }
    
    if (!formData.title.trim()) {
      setError('Por favor, añade un título');
      return;
    }
    
    if (!formData.comment.trim()) {
      setError('Por favor, escribe tu comentario');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const review = createReview(
        productId,
        verification.orderId,
        customerEmail,
        session?.user?.name || 'Usuario',
        formData
      );

      setSuccess(true);
      
      // Cerrar modal después de 2 segundos
      setTimeout(() => {
        onReviewSubmitted(review.id);
        onClose();
      }, 2000);

    } catch (err) {
      setError('Error al enviar la reseña. Inténtalo de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-white backdrop-blur-sm" onClick={onClose} />
        <div className="relative w-full max-w-md bg-gradient-to-br from-black/95 to-black/90 border border-neutral-200 rounded-2xl shadow-2xl animate-fade-in-scale">
          <div className="p-6 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
              <svg className="w-8 h-8 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-neutral-900 mb-2">¡Reseña enviada!</h3>
            <p className="text-neutral-600 mb-6">
              Tu reseña será revisada y publicada en breve. Gracias por tu opinión.
            </p>
            <div className="w-full bg-neutral-100 rounded-lg p-3">
              <p className="text-neutral-500 text-sm">
                ⏳ Moderación en proceso...
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-white backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative w-full max-w-2xl bg-gradient-to-br from-black/95 to-black/90 border border-neutral-200 rounded-2xl shadow-2xl animate-fade-in-scale overflow-hidden">
        {/* Header */}
        <div className="bg-neutral-50 p-6 border-b border-neutral-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-neutral-900">Dejar Reseña</h2>
              <p className="text-neutral-600 mt-1">{productName}</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-neutral-100 hover:bg-neutral-200 transition-colors"
            >
              <svg className="h-6 w-6 text-neutral-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Rating */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-3">
              Valoración *
            </label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => handleRatingClick(star)}
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  className="text-3xl transition-colors duration-200"
                >
                  <span
                    className={`${
                      star <= (hoveredRating || formData.rating)
                        ? 'text-yellow-400'
                        : 'text-neutral-400'
                    }`}
                  >
                    ★
                  </span>
                </button>
              ))}
            </div>
            <p className="text-neutral-500 text-sm mt-2">
              {formData.rating === 0 && 'Selecciona una valoración'}
              {formData.rating === 1 && 'Muy malo'}
              {formData.rating === 2 && 'Malo'}
              {formData.rating === 3 && 'Regular'}
              {formData.rating === 4 && 'Bueno'}
              {formData.rating === 5 && 'Excelente'}
            </p>
          </div>

          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-neutral-700 mb-2">
              Título de la reseña *
            </label>
            <input
              type="text"
              id="title"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              placeholder="Ej: ¡Mi PC gaming perfecto!"
              className="w-full px-4 py-3 rounded-xl bg-neutral-50 border border-neutral-200 text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all"
              maxLength={100}
            />
            <p className="text-neutral-500 text-xs mt-1">{formData.title.length}/100</p>
          </div>

          {/* Comment */}
          <div>
            <label htmlFor="comment" className="block text-sm font-medium text-neutral-700 mb-2">
              Comentario *
            </label>
            <textarea
              id="comment"
              value={formData.comment}
              onChange={(e) => handleInputChange('comment', e.target.value)}
              placeholder="Cuéntanos tu experiencia con este producto..."
              rows={5}
              className="w-full px-4 py-3 rounded-xl bg-neutral-50 border border-neutral-200 text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all resize-none"
              maxLength={1000}
            />
            <p className="text-neutral-500 text-xs mt-1">{formData.comment.length}/1000</p>
          </div>

          {/* Images */}
          <div>
            <label htmlFor="images" className="block text-sm font-medium text-neutral-700 mb-2">
              Fotos (opcional)
            </label>
            <input
              type="file"
              id="images"
              multiple
              accept="image/*"
              onChange={handleImageUpload}
              className="w-full px-4 py-3 rounded-xl bg-neutral-50 border border-neutral-200 text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-violet-600 transition-all"
            />
            <p className="text-neutral-500 text-xs mt-1">
              Máximo 3 imágenes. Formatos: JPG, PNG, WebP
            </p>
            {formData.images.length > 0 && (
              <div className="mt-3 flex gap-2">
                {formData.images.map((file, index) => (
                  <div key={index} className="text-neutral-600 text-sm bg-neutral-50 px-3 py-1 rounded-lg">
                    {file.name}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Error */}
          {error && (
            <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-center">
              {error}
            </div>
          )}

          {/* Submit */}
          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 rounded-xl bg-neutral-50 border border-neutral-200 text-neutral-900 font-semibold hover:bg-neutral-100 transition-all"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 px-6 py-3 rounded-xl bg-neutral-900 text-white font-semibold hover:shadow-lg hover:shadow-black/10 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-neutral-400 border-t-neutral-900 rounded-full animate-spin"></div>
                  Enviando...
                </div>
              ) : (
                'Enviar Reseña'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

















