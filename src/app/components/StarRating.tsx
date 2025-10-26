// src/app/components/StarRating.tsx

interface StarRatingProps {
  rating: number;
  totalReviews?: number;
  size?: 'sm' | 'md' | 'lg';
  showCount?: boolean;
  className?: string;
}

export default function StarRating({ 
  rating, 
  totalReviews, 
  size = 'sm', 
  showCount = false,
  className = '' 
}: StarRatingProps) {
  const sizeClasses = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5'
  };

  const textSizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base'
  };

  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  // Estrellas llenas
  for (let i = 0; i < fullStars; i++) {
    stars.push(
      <svg
        key={i}
        className={`${sizeClasses[size]} text-yellow-400 fill-current`}
        viewBox="0 0 20 20"
      >
        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
      </svg>
    );
  }

  // Media estrella
  if (hasHalfStar) {
    stars.push(
      <div key="half" className="relative">
        <svg
          className={`${sizeClasses[size]} text-gray-300 fill-current`}
          viewBox="0 0 20 20"
        >
          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
        </svg>
        <svg
          className={`${sizeClasses[size]} text-yellow-400 fill-current absolute top-0 left-0 overflow-hidden`}
          style={{ width: '50%' }}
          viewBox="0 0 20 20"
        >
          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
        </svg>
      </div>
    );
  }

  // Estrellas vacías
  const emptyStars = 5 - Math.ceil(rating);
  for (let i = 0; i < emptyStars; i++) {
    stars.push(
      <svg
        key={`empty-${i}`}
        className={`${sizeClasses[size]} text-gray-300 fill-current`}
        viewBox="0 0 20 20"
      >
        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
      </svg>
    );
  }

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      <div className="flex items-center">
        {stars}
      </div>
      {showCount && totalReviews !== undefined && (
        <span className={`${textSizeClasses[size]} text-gray-400 ml-1`}>
          ({totalReviews})
        </span>
      )}
    </div>
  );
}

















