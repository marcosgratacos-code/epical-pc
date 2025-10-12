"use client";

import Image from "next/image";
import { useState, useCallback, useEffect } from "react";

type Pic = { src: string; alt?: string };

export default function Gallery({ images, title }: { images: Pic[]; title?: string }) {
  const [open, setOpen] = useState(false);
  const [idx, setIdx] = useState(0);

  const close = useCallback(() => setOpen(false), []);
  const openAt = (i: number) => {
    setIdx(i);
    setOpen(true);
  };

  // teclado: ESC cierra, ← → navegan
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") setIdx((i) => (i + 1) % images.length);
      if (e.key === "ArrowLeft") setIdx((i) => (i - 1 + images.length) % images.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, images.length, close]);

  return (
    <div>
      {title && <h3 className="mb-3 text-lg font-semibold">{title}</h3>}

      {/* miniaturas */}
      <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {images.map((img, i) => (
          <li
            key={img.src}
            className="group relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] cursor-zoom-in"
            onClick={() => openAt(i)}
          >
            <Image
              src={img.src}
              alt={img.alt || `Foto ${i + 1}`}
              fill
              className="object-cover transition group-hover:scale-[1.03]"
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              onError={(e) => {
                const target = e.currentTarget as any;
                if (!target.src.includes("epical_hero_setup.jpg")) target.src = "/epical_hero_setup.jpg";
              }}
            />
            <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-black/20" />
          </li>
        ))}
      </ul>

      {/* lightbox */}
      {open && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur"
          role="dialog"
          aria-modal="true"
          aria-label="Galería de imágenes"
          onClick={close}
        >
          <div className="absolute inset-0 m-auto grid h-full w-full max-w-6xl place-items-center p-4">
            <div
              className="relative aspect-[4/3] w-full max-h-[80vh] overflow-hidden rounded-2xl border border-white/20 bg-black"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                key={images[idx].src}
                src={images[idx].src}
                alt={images[idx].alt || `Foto ${idx + 1}`}
                fill
                className="object-contain"
                sizes="100vw"
                priority
              />

              {/* controles */}
              <button
                aria-label="Cerrar"
                onClick={close}
                className="absolute right-3 top-3 rounded-full border border-white/30 bg-black/60 px-3 py-1 text-sm hover:border-white/60"
              >
                Cerrar
              </button>
              <button
                aria-label="Anterior"
                onClick={() => setIdx((i) => (i - 1 + images.length) % images.length)}
                className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full border border-white/30 bg-black/60 px-3 py-2 text-lg hover:border-white/60"
              >
                ‹
              </button>
              <button
                aria-label="Siguiente"
                onClick={() => setIdx((i) => (i + 1) % images.length)}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full border border-white/30 bg-black/60 px-3 py-2 text-lg hover:border-white/60"
              >
                ›
              </button>

              <div className="absolute bottom-2 left-0 right-0 mx-auto w-fit rounded-full border border-white/10 bg-black/60 px-3 py-1 text-xs text-white/70">
                {idx + 1} / {images.length}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
