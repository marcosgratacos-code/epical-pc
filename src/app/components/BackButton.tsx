"use client";

import { useRouter } from "next/navigation";

export default function BackButton({ fallback = "/#productos" }: { fallback?: string }) {
  const router = useRouter();

  return (
    <button
      onClick={() => {
        if (typeof window !== "undefined" && window.history.length > 1) {
          router.back();
        } else {
          router.push(fallback);
        }
      }}
      className="rounded-xl border border-white/20 px-3 py-1 text-sm hover:border-white/40"
      aria-label="Volver a la página anterior"
    >
      ← Volver
    </button>
  );
}
