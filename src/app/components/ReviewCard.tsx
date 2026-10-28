"use client";

// Componente para mostrar una reseña individual

import { useState } from 'react';
import { Review } from '@/types/review';
import { formatReviewDate, markReviewAsHelpful } from '@/app/lib/reviews';

interface ReviewCardProps {
  review: Review;
  onImageClick?: (imageUrl: string) => void;
}

export default function ReviewCard({ review, onImageClick }: ReviewCardProps) {
  const [isHelpful, setIsHelpful] = useState(false);
  const [helpfulCount, setHelpfulCount] = useState(review.helpful);

  const handleHelpfulClick = () => {
    if (!isHelpful) {
      markReviewAsHelpful(review.id);
      setHelpfulCount(prev => prev + 1);
      setIsHelpful(true);
    }
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={`text-lg ${
              star <= rating ? 'text-yellow-400' : 'text-neutral-400'
            }`}
          >
            ★
          </span>
        ))}
      </div>
    );
  };

  const getRatingText = (rating: number) => {
    const texts = {
      1: 'Muy malo',
      2: 'Malo', 
      3: 'Regular',
      4: 'Bueno',
      5: 'Excelente'
    };
    return texts[rating as keyof typeof texts];
  };

  return (
    <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-6 hover:bg-neutral-100 transition-all duration-300">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="w-12 h-12 rounded-full bg-neutral-50 flex items-center justify-center">
            <span className="text-neutral-900 font-semibold text-lg">
              {review.customerName.charAt(0).toUpperCase()}
            </span>
          </div>
          
          <div>
            <div className="flex items-center gap-2">
              <h4 className="font-semibold text-neutral-900">{review.customerName}</h4>
              {review.verified && (
                <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-green-100 text-green-700 text-xs">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Verificado
                </div>
              )}
            </div>
            <div className="flex items-center gap-2 mt-1">
              {renderStars(review.rating)}
              <span className="text-neutral-500 text-sm">
                {getRatingText(review.rating)}
              </span>
            </div>
          </div>
        </div>

        <div className="text-right">
          <p className="text-neutral-500 text-sm">{formatReviewDate(review.createdAt)}</p>
        </div>
      </div>

      {/* Title */}
      <h3 className="text-lg font-semibold text-neutral-900 mb-2">{review.title}</h3>

      {/* Comment */}
      <p className="text-neutral-700 leading-relaxed mb-4">{review.comment}</p>

      {/* Images */}
      {review.images && review.images.length > 0 && (
        <div className="mb-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {review.images.map((imageUrl, index) => (
              <div
                key={index}
                className="relative aspect-square rounded-xl overflow-hidden cursor-pointer group"
                onClick={() => onImageClick?.(imageUrl)}
              >
                <img
                  src={imageUrl}
                  alt={`Reseña ${index + 1}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-neutral-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <svg className="w-8 h-8 text-neutral-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-neutral-200">
        <button
          onClick={handleHelpfulClick}
          disabled={isHelpful}
          className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all ${
            isHelpful
              ? 'bg-green-100 text-green-700'
              : 'bg-neutral-50 text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900'
          }`}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V18m-7-8a2 2 0 01-2-2V6a2 2 0 012-2h2.343M11 7v6a2 2 0 01-2 2H9m0-4h2m-2 0V9a2 2 0 012-2h2.343" />
          </svg>
          <span className="text-sm font-medium">
            {isHelpful ? 'Útil' : '¿Te resulta útil?'}
          </span>
          {helpfulCount > 0 && (
            <span className="text-sm text-neutral-500">({helpfulCount})</span>
          )}
        </button>

        <div className="flex items-center gap-4 text-neutral-500 text-sm">
          <span>Pedido #{review.orderId.slice(-8)}</span>
        </div>
      </div>
    </div>
  );
}

















