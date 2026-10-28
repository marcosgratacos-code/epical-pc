"use client";

import { useState, useEffect } from "react";

const ONBOARDING_KEY = "epical-onboarding-completed";

interface OnboardingStep {
  title: string;
  description: string;
  icon: string;
  target?: string;
}

const STEPS: OnboardingStep[] = [
  {
    title: "¡Bienvenido a TITAN-PC!",
    description: "Tu destino para PCs gaming de alto rendimiento. Te mostraremos las funcionalidades principales.",
    icon: "🎮",
  },
  {
    title: "Busca tu PC perfecto",
    description: "Usa la búsqueda global (⌘K) para encontrar productos rápidamente por componentes o especificaciones.",
    icon: "🔍",
    target: "global-search-trigger",
  },
  {
    title: "Compara productos",
    description: "Haz clic en el icono de comparar en cualquier producto para añadirlo y comparar hasta 3 PCs.",
    icon: "⚖️",
  },
  {
    title: "Guarda tus favoritos",
    description: "Haz clic en el corazón para guardar productos y revisarlos más tarde.",
    icon: "❤️",
  },
  {
    title: "Personaliza tu PC",
    description: "Usa nuestro configurador para crear el PC gaming de tus sueños con componentes de última generación.",
    icon: "⚙️",
  },
];

export default function Onboarding() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    // Verificar si ya se completó el onboarding
    const completed = localStorage.getItem(ONBOARDING_KEY);
    if (!completed) {
      // Esperar un poco antes de mostrar
      setTimeout(() => setIsOpen(true), 1000);
    }
  }, []);

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkip = () => {
    handleComplete();
  };

  const handleComplete = () => {
    localStorage.setItem(ONBOARDING_KEY, "true");
    setIsOpen(false);
  };

  if (!isOpen) return null;

  const step = STEPS[currentStep];
  const progress = ((currentStep + 1) / STEPS.length) * 100;

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 z-[9998] bg-black/80 backdrop-blur-sm animate-fade-in" />

      {/* Modal */}
      <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
        <div className="bg-white border border-neutral-300 rounded-2xl max-w-md w-full overflow-hidden animate-fade-in-scale shadow-2xl">
          {/* Progress bar */}
          <div className="h-1 bg-neutral-100">
            <div
              className="h-full bg-neutral-900 transition-all duration-300 text-white"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Content */}
          <div className="p-8">
            {/* Icon */}
            <div className="text-6xl mb-4 text-center animate-soft-pulse">
              {step.icon}
            </div>

            {/* Title */}
            <h2 className="text-2xl font-bold text-center mb-3 text-neutral-900">
              {step.title}
            </h2>

            {/* Description */}
            <p className="text-neutral-600 text-center mb-6 leading-relaxed">
              {step.description}
            </p>

            {/* Step indicator */}
            <div className="flex justify-center gap-2 mb-6">
              {STEPS.map((_, index) => (
                <div
                  key={index}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentStep
                      ? "w-8 bg-neutral-900 text-white"
                      : "w-2 bg-neutral-200"
                  }`}
                />
              ))}
            </div>

            {/* Buttons */}
            <div className="flex gap-3">
              {currentStep > 0 && (
                <button
                  onClick={handlePrev}
                  className="flex-1 px-4 py-3 rounded-xl border border-neutral-300 text-neutral-900 hover:bg-neutral-100 transition-all duration-200"
                >
                  Anterior
                </button>
              )}
              <button
                onClick={handleNext}
                className="flex-1 px-4 py-3 rounded-xl bg-neutral-900 text-white font-semibold hover:shadow-lg hover:shadow-black/10 transition-all duration-300"
              >
                {currentStep < STEPS.length - 1 ? "Siguiente" : "Empezar"}
              </button>
            </div>

            {/* Skip button */}
            <button
              onClick={handleSkip}
              className="w-full mt-4 text-sm text-neutral-400 hover:text-neutral-500 transition-colors"
            >
              Saltar tutorial
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

