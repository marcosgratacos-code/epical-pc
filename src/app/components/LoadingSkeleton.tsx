"use client";

interface LoadingSkeletonProps {
  variant?: "text" | "circular" | "rectangular" | "card";
  width?: string;
  height?: string;
  count?: number;
}

export default function LoadingSkeleton({
  variant = "rectangular",
  width = "100%",
  height = "20px",
  count = 1,
}: LoadingSkeletonProps) {
  const getClassName = () => {
    const base = "bg-gradient-to-r from-white/5 via-white/10 to-white/5 bg-[length:200%_100%] animate-shimmer";
    
    switch (variant) {
      case "text":
        return `${base} rounded h-4`;
      case "circular":
        return `${base} rounded-full`;
      case "card":
        return `${base} rounded-xl p-4`;
      default:
        return `${base} rounded-lg`;
    }
  };

  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className={getClassName()}
          style={{ width, height }}
        />
      ))}
    </>
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 space-y-3 animate-pulse">
      <LoadingSkeleton variant="rectangular" height="200px" />
      <LoadingSkeleton variant="text" width="80%" />
      <LoadingSkeleton variant="text" width="60%" />
      <div className="flex gap-2">
        <LoadingSkeleton variant="rectangular" height="40px" width="50%" />
        <LoadingSkeleton variant="rectangular" height="40px" width="50%" />
      </div>
    </div>
  );
}

export function ProductGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}

