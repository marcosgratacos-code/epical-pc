"use client";

import { useState } from "react";
import Image from "next/image";

interface ImageGalleryZoomProps {
  images: string[];
  productName: string;
}

export default function ImageGalleryZoom({ images, productName }: ImageGalleryZoomProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 });

  const handleImageClick = (index: number) => {
    setSelectedImage(index);
  };

  const handleModalOpen = () => {
    setIsModalOpen(true);
    setZoomLevel(1);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setZoomLevel(1);
  };

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 0.5, 3));
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 0.5, 1));
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (zoomLevel === 1) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPosition({ x, y });
  };

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % images.length);
    setZoomLevel(1);
  };

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + images.length) % images.length);
    setZoomLevel(1);
  };

  return (
    <>
      {/* Galería principal */}
      <div className="rounded-2xl border border-white/10 p-4 bg-gradient-to-br from-white/5 to-transparent backdrop-blur-sm">
        <div className="grid gap-4 md:grid-cols-[100px_1fr]">
          {/* Miniaturas */}
          <ul className="order-2 flex gap-3 md:order-1 md:flex-col overflow-x-auto md:overflow-y-auto max-h-[400px]">
            {images.map((img, i) => (
              <li
                key={img + i}
                onClick={() => handleImageClick(i)}
                className={`relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg border cursor-pointer transition-all duration-300 ${
                  selectedImage === i
                    ? "border-violet-400 ring-2 ring-violet-400/50 scale-105"
                    : "border-white/10 hover:border-white/30"
                }`}
              >
                <Image
                  src={img}
                  alt={`${productName} vista ${i + 1}`}
                  fill
                  sizes="100px"
                  className="object-contain"
                />
              </li>
            ))}
          </ul>

          {/* Imagen principal */}
          <div className="order-1 relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-white/10 md:order-2 group cursor-zoom-in">
            <Image
              src={images[selectedImage]}
              alt={productName}
              fill
              className="object-contain transition-transform duration-500 group-hover:scale-110"
              sizes="(max-width:1024px) 100vw, 50vw"
              priority
              onClick={handleModalOpen}
            />
            
            {/* Overlay con icono de zoom */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/20 backdrop-blur-sm rounded-full p-4">
                <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                </svg>
              </div>
            </div>

            {/* Efecto halo */}
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(56,189,248,0.08),transparent_40%),radial-gradient(circle_at_80%_60%,rgba(139,92,246,0.08),transparent_35%)]" />

            {/* Botones de navegación */}
            {images.length > 1 && (
              <>
                <button
                  onClick={(e) => { e.stopPropagation(); prevImage(); }}
                  className="absolute left-2 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-black/50 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-black/70 transition-all opacity-0 group-hover:opacity-100"
                  aria-label="Imagen anterior"
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); nextImage(); }}
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-black/50 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-black/70 transition-all opacity-0 group-hover:opacity-100"
                  aria-label="Siguiente imagen"
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </>
            )}

            {/* Indicador de imagen */}
            {images.length > 1 && (
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-sm border border-white/20 text-xs text-white">
                {selectedImage + 1} / {images.length}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal Fullscreen */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[1000] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4">
          {/* Header del modal */}
          <div className="absolute top-0 left-0 right-0 p-4 flex items-center justify-between bg-gradient-to-b from-black/80 to-transparent z-10">
            <div className="text-white">
              <p className="font-semibold">{productName}</p>
              <p className="text-sm text-white/60">Imagen {selectedImage + 1} de {images.length}</p>
            </div>
            
            <div className="flex items-center gap-2">
              {/* Controles de zoom */}
              <button
                onClick={handleZoomOut}
                disabled={zoomLevel <= 1}
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                aria-label="Alejar"
              >
                <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM13 10H7" />
                </svg>
              </button>
              
              <span className="text-white text-sm font-semibold min-w-[60px] text-center">
                {Math.round(zoomLevel * 100)}%
              </span>
              
              <button
                onClick={handleZoomIn}
                disabled={zoomLevel >= 3}
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                aria-label="Acercar"
              >
                <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                </svg>
              </button>
              
              <button
                onClick={handleModalClose}
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-all"
                aria-label="Cerrar"
              >
                <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Imagen con zoom */}
          <div 
            className="relative w-full h-full flex items-center justify-center overflow-hidden"
            onMouseMove={handleMouseMove}
          >
            <div className="relative w-full h-full max-w-7xl max-h-[90vh]">
              <Image
                src={images[selectedImage]}
                alt={productName}
                fill
                className="object-contain"
                sizes="100vw"
                style={{
                  transform: `scale(${zoomLevel})`,
                  transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
                  transition: zoomLevel === 1 ? 'transform 0.3s ease-out' : 'none',
                }}
              />
            </div>
          </div>

          {/* Botones de navegación */}
          {images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all"
                aria-label="Imagen anterior"
              >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all"
                aria-label="Siguiente imagen"
              >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}

          {/* Miniaturas inferiores */}
          {images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 p-2 rounded-xl bg-black/50 backdrop-blur-sm border border-white/20">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`relative h-16 w-16 rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === i
                      ? "border-violet-400 scale-110"
                      : "border-white/20 hover:border-white/40"
                  }`}
                >
                  <Image
                    src={img}
                    alt={`${productName} vista ${i + 1}`}
                    fill
                    sizes="64px"
                    className="object-contain"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
}

