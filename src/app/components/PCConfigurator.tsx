"use client";

// Configurador de PC paso a paso (wizard)

import { useState } from 'react';
import { COMPONENTS, PCConfiguration, PCComponent, calculateTotalPrice, checkCompatibility } from '../lib/pc-configurator';
import PriceInfoModal from './modals/PriceInfoModal';

interface PCConfiguratorProps {
  onConfigurationChange: (config: PCConfiguration, totalPrice: number) => void;
}

export default function PCConfigurator({ onConfigurationChange }: PCConfiguratorProps) {
  const [currentConfig, setCurrentConfig] = useState<PCConfiguration>({
    cpu: null,
    gpu: null,
    ram: null,
    storage: null,
    motherboard: null,
    psu: null,
    case: null,
    cooling: null
  });

  // Orden de selección paso a paso
  const steps = [
    { id: 'cpu', name: 'Procesador', icon: '🧠', description: 'El cerebro de tu PC' },
    { id: 'motherboard', name: 'Placa Base', icon: '🔌', description: 'Compatible con tu procesador' },
    { id: 'ram', name: 'Memoria RAM', icon: '💾', description: 'Para multitarea fluida' },
    { id: 'gpu', name: 'Tarjeta Gráfica', icon: '🎮', description: 'El corazón del gaming' },
    { id: 'storage', name: 'Almacenamiento', icon: '💿', description: 'Para tus juegos y archivos' },
    { id: 'psu', name: 'Fuente de Alimentación', icon: '⚡', description: 'Potencia estable y segura' },
    { id: 'cooling', name: 'Refrigeración', icon: '❄️', description: 'Mantén todo fresco' },
    { id: 'case', name: 'Caja', icon: '📦', description: 'El hogar de tus componentes' }
  ];

  const [currentStep, setCurrentStep] = useState(0);
  const [showSummary, setShowSummary] = useState(false);
  const [isPriceInfoOpen, setIsPriceInfoOpen] = useState(false);

  const currentStepKey = steps[currentStep].id as keyof PCConfiguration;

  const updateConfiguration = (component: PCComponent | null) => {
    const newConfig = { ...currentConfig, [currentStepKey]: component };
    setCurrentConfig(newConfig);
    
    const totalPrice = calculateTotalPrice(newConfig);
    onConfigurationChange(newConfig, totalPrice);
  };

  const handleSelectComponent = (component: PCComponent) => {
    updateConfiguration(component);
    
    // Auto-avanzar al siguiente paso después de seleccionar
    setTimeout(() => {
      if (currentStep < steps.length - 1) {
        setCurrentStep(currentStep + 1);
      } else {
        setShowSummary(true);
      }
    }, 300);
  };

  const goToStep = (stepIndex: number) => {
    setCurrentStep(stepIndex);
    setShowSummary(false);
  };

  const goBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setShowSummary(false);
    }
  };

  const goNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowSummary(true);
    }
  };

  const resetConfiguration = () => {
    const emptyConfig: PCConfiguration = {
      cpu: null,
      gpu: null,
      ram: null,
      storage: null,
      motherboard: null,
      psu: null,
      case: null,
      cooling: null
    };
    setCurrentConfig(emptyConfig);
    onConfigurationChange(emptyConfig, 0);
    setCurrentStep(0);
    setShowSummary(false);
  };

  // Filtrar componentes según compatibilidad
  const getFilteredComponents = (category: string) => {
    let components = COMPONENTS.filter(c => c.category === category);
    
    // Filtrar placas base por CPU seleccionado
    if (category === 'motherboard' && currentConfig.cpu) {
      components = components.filter(mb => 
        !mb.compatibility || mb.compatibility.includes(currentConfig.cpu!.id)
      );
    }
    
    return components;
  };

  const componentsForCurrentStep = getFilteredComponents(currentStepKey);
  const totalPrice = calculateTotalPrice(currentConfig);
  const compatibilityWarnings = checkCompatibility(currentConfig);
  const isComplete = Object.values(currentConfig).every(component => component !== null);
  const selectedComponent = currentConfig[currentStepKey];

  // Función para obtener rangos de precios orientativos por categoría
  const getPriceRanges = (category: string) => {
    const ranges: { [key: string]: Array<{ label: string; price: string }> } = {
      cpu: [
        { label: 'Básico', price: '150-250€' },
        { label: 'Intermedio', price: '250-400€' },
        { label: 'Alto rendimiento', price: '400-650€' }
      ],
      motherboard: [
        { label: 'Básica', price: '80-150€' },
        { label: 'Intermedia', price: '150-250€' },
        { label: 'Premium', price: '250-400€' }
      ],
      ram: [
        { label: '16GB', price: '60-100€' },
        { label: '32GB', price: '100-180€' },
        { label: '64GB', price: '180-350€' }
      ],
      gpu: [
        { label: '1080p Gaming', price: '300-600€' },
        { label: '1440p Gaming', price: '600-1000€' },
        { label: '4K Gaming', price: '1000-2000€' }
      ],
      storage: [
        { label: 'SSD 1TB', price: '80-150€' },
        { label: 'SSD 2TB', price: '150-300€' },
        { label: 'NVMe Gen4', price: '200-500€' }
      ],
      psu: [
        { label: '650W', price: '80-120€' },
        { label: '750W', price: '100-150€' },
        { label: '850W+', price: '150-250€' }
      ],
      cooling: [
        { label: 'Aire básico', price: '30-60€' },
        { label: 'Aire premium', price: '60-120€' },
        { label: 'Líquida', price: '100-200€' }
      ],
      case: [
        { label: 'Básica', price: '50-100€' },
        { label: 'Intermedia', price: '100-200€' },
        { label: 'Premium', price: '200-400€' }
      ]
    };
    
    return ranges[category] || [];
  };

  const handleSendEmail = () => {
    const configText = steps
      .map(step => {
        const component = currentConfig[step.id as keyof PCConfiguration];
        return component 
          ? `${step.name}: ${component.name} (${component.price}€)`
          : `${step.name}: No seleccionado`;
      })
      .join('\n');

    const warnings = compatibilityWarnings.length > 0 
      ? '\n\nAdvertencias:\n' + compatibilityWarnings.join('\n')
      : '';

    const message = `Hola! Me interesa configurar un PC a medida con la siguiente configuración:\n\n${configText}\n\nPrecio estimado total: ${totalPrice.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}${warnings}\n\n¿Podrían enviarme una propuesta detallada con disponibilidad y precio final?\n\nGracias.`;
    
    const emailSubject = 'Solicitud PC a Medida - Configuración Personalizada';
    const mailtoUrl = `mailto:epicalpc@gmail.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(message)}`;
    
    window.location.href = mailtoUrl;
  };

  if (showSummary) {
    return (
      <div className="space-y-6">
        {/* Header del resumen */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-2">Tu Configuración</h2>
          <p className="text-white/60">Revisa tu configuración antes de enviar la solicitud</p>
        </div>

        {/* Resumen de componentes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {steps.map((step, index) => {
            const component = currentConfig[step.id as keyof PCConfiguration];
            return (
              <div key={step.id} className="rounded-xl border border-white/10 bg-white/5 p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xl">{step.icon}</span>
                      <h3 className="font-semibold text-white">{step.name}</h3>
                    </div>
                    {component ? (
                      <>
                        <p className="text-white/90 text-sm font-medium">{component.name}</p>
                        <p className="text-violet-400 font-bold mt-1">
                          {component.price.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}
                        </p>
                        <ul className="mt-2 text-xs text-white/60 space-y-1">
                          {component.specs.slice(0, 2).map((spec, i) => (
                            <li key={i}>• {spec}</li>
                          ))}
                        </ul>
                      </>
                    ) : (
                      <p className="text-white/40 text-sm">No seleccionado</p>
                    )}
                  </div>
                  <button
                    onClick={() => goToStep(index)}
                    className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-white/70 hover:bg-white/10 text-xs"
                  >
                    Cambiar
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Advertencias de compatibilidad */}
        {compatibilityWarnings.length > 0 && (
          <div className="rounded-xl border border-yellow-500/30 bg-yellow-500/10 p-4">
            <h4 className="text-yellow-400 font-semibold mb-2">⚠️ Advertencias:</h4>
            <ul className="text-yellow-400/80 text-sm space-y-1">
              {compatibilityWarnings.map((warning, index) => (
                <li key={index}>• {warning}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Precio total */}
        <div className="rounded-2xl border border-white/10 bg-gradient-to-r from-violet-500/10 to-cyan-500/10 p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-white/70 text-lg">Precio estimado total:</span>
            <span className="text-3xl font-bold bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
              {totalPrice.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}
            </span>
          </div>
          <p className="text-white/60 text-sm text-center mb-4">
            * Este precio es orientativo. Te enviaremos una propuesta con precio final según disponibilidad.
          </p>
          
          {isComplete && (
            <div className="flex items-center gap-2 justify-center p-3 rounded-lg bg-green-500/10 border border-green-500/30 mb-4">
              <svg className="h-5 w-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <p className="text-green-400 font-medium text-sm">Configuración completa</p>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => setShowSummary(false)}
              className="flex-1 px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-semibold hover:bg-white/10 transition-all touch-target"
            >
              ← Seguir configurando
            </button>
            <button
              onClick={handleSendEmail}
              className="flex-1 px-6 py-3 rounded-xl bg-gradient-to-r from-violet-500 to-cyan-500 text-white font-semibold hover:shadow-lg hover:shadow-violet-500/50 transition-all duration-300 touch-target"
            >
              📧 Enviar Configuración
            </button>
          </div>
          
          <button
            onClick={resetConfiguration}
            className="w-full mt-3 px-4 py-2 rounded-lg bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30 transition-all text-sm font-medium"
          >
            🔄 Empezar de nuevo
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Progreso */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-white">
              Paso {currentStep + 1} de {steps.length}
            </h3>
            <p className="text-white/60 text-sm">{steps[currentStep].description}</p>
          </div>
          <button
            onClick={() => setShowSummary(true)}
            disabled={totalPrice === 0}
            className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white/70 hover:bg-white/10 transition-all text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Ver Resumen
          </button>
        </div>

        {/* Barra de progreso */}
        <div className="flex gap-2">
          {steps.map((step, index) => {
            const component = currentConfig[step.id as keyof PCConfiguration];
            const isCompleted = component !== null;
            const isCurrent = index === currentStep;

            return (
              <div key={step.id} className="flex-1">
                <button
                  onClick={() => goToStep(index)}
                  className={`w-full h-2 rounded-full transition-all ${
                    isCompleted
                      ? 'bg-gradient-to-r from-violet-500 to-cyan-500'
                      : isCurrent
                      ? 'bg-violet-500/50'
                      : 'bg-white/10'
                  }`}
                  title={step.name}
                />
              </div>
            );
          })}
        </div>

        {/* Indicadores de pasos */}
        <div className="flex justify-between mt-2 text-xs text-white/50">
          {steps.map((step, index) => {
            const component = currentConfig[step.id as keyof PCConfiguration];
            return (
              <div key={step.id} className="flex-1 text-center">
                {component ? '✓' : index === currentStep ? step.icon : '·'}
              </div>
            );
          })}
        </div>
      </div>

      {/* Header del paso actual */}
      <div className="text-center mb-6">
        <div className="inline-block h-16 w-16 rounded-full bg-gradient-to-br from-violet-500/20 to-cyan-500/20 flex items-center justify-center mb-4">
          <span className="text-3xl">{steps[currentStep].icon}</span>
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">
          {steps[currentStep].name}
        </h2>
        <p className="text-white/70 mb-4">
          {steps[currentStep].description}
        </p>
        
      </div>

      {/* Nota informativa clickeable */}
      <div className="rounded-xl border border-cyan-500/30 bg-cyan-500/10 p-4">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="flex-1">
            <button
              onClick={() => setIsPriceInfoOpen(true)}
              className="text-cyan-400 text-sm font-medium hover:text-cyan-300 transition-colors cursor-pointer text-left"
            >
              💡 Los precios son orientativos
            </button>
            <p className="text-white/70 text-xs mt-1">
              Te enviaremos una propuesta detallada con precios finales según disponibilidad de stock.
            </p>
          </div>
        </div>
      </div>

      {/* Componentes disponibles */}
      <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
        <h3 className="text-lg font-semibold text-white mb-4">
          Selecciona tu {steps[currentStep].name}
        </h3>
        
        <div className="grid grid-cols-1 gap-4">
          {componentsForCurrentStep.map((component) => (
            <button
              key={component.id}
              onClick={() => handleSelectComponent(component)}
              className={`text-left p-4 rounded-xl border transition-all hover:scale-[1.02] ${
                selectedComponent?.id === component.id
                  ? 'border-violet-500/50 bg-violet-500/10 ring-2 ring-violet-500/30'
                  : 'border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20'
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h4 className="font-semibold text-white text-lg">{component.name}</h4>
                  {component.recommended && (
                    <span className="inline-block mt-1 px-2 py-1 rounded-full bg-green-500/20 text-green-400 text-xs font-medium">
                      ⭐ Recomendado
                    </span>
                  )}
                </div>
                <div className="text-right">
                  <span className="text-violet-400 font-bold text-xl">
                    {component.price.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}
                  </span>
                </div>
              </div>
              
              <ul className="text-white/70 text-sm space-y-1.5">
                {component.specs.map((spec, index) => (
                  <li key={index} className="flex items-start">
                    <span className="w-1.5 h-1.5 bg-violet-400 rounded-full mr-2 mt-1.5 flex-shrink-0"></span>
                    <span>{spec}</span>
                  </li>
                ))}
              </ul>
              
              {selectedComponent?.id === component.id && (
                <div className="mt-3 flex items-center gap-2 text-violet-400 font-medium text-sm">
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Seleccionado
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Navegación */}
      <div className="flex items-center justify-between gap-4">
        <button
          onClick={goBack}
          disabled={currentStep === 0}
          className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-semibold hover:bg-white/10 transition-all disabled:opacity-50 disabled:cursor-not-allowed touch-target"
        >
          ← Anterior
        </button>

        <div className="text-center flex-1">
          <p className="text-white/60 text-sm">
            Precio actual: <span className="text-violet-400 font-bold text-lg">
              {totalPrice.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}
            </span>
          </p>
        </div>

        {currentStep < steps.length - 1 ? (
          <button
            onClick={goNext}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-violet-500 to-cyan-500 text-white font-semibold hover:shadow-lg hover:shadow-violet-500/50 transition-all duration-300 touch-target"
          >
            Siguiente →
          </button>
        ) : (
          <button
            onClick={() => setShowSummary(true)}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-violet-500 to-cyan-500 text-white font-semibold hover:shadow-lg hover:shadow-violet-500/50 transition-all duration-300 touch-target"
          >
            Finalizar →
          </button>
        )}
      </div>

      {/* Modal de información de precios */}
      <PriceInfoModal
        isOpen={isPriceInfoOpen}
        onClose={() => setIsPriceInfoOpen(false)}
      />
    </div>
  );
}