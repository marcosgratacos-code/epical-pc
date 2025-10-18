"use client";

const steps = [
  {
    number: "01",
    title: "Elige tu PC",
    description: "Selecciona uno de nuestros montajes probados o configura tu PC a medida con los componentes que prefieras.",
    icon: "🎯",
  },
  {
    number: "02",
    title: "Montaje Profesional",
    description: "Nuestro equipo ensambla tu PC con cableado limpio, optimización térmica y pruebas exhaustivas de estabilidad.",
    icon: "🔧",
  },
  {
    number: "03",
    title: "Validación Completa",
    description: "Realizamos stress tests, validamos temperaturas, configuramos BIOS, instalamos drivers y Windows activado.",
    icon: "✅",
  },
  {
    number: "04",
    title: "Envío Seguro",
    description: "Embalamos tu PC con protección premium y lo enviamos en 24-48h con número de seguimiento en tiempo real.",
    icon: "📦",
  },
];

export default function HowItWorks() {
  return (
    <section className="mx-auto max-w-7xl p-6 my-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 bg-clip-text text-transparent">
            ¿Cómo funciona?
          </span>
        </h2>
        <p className="text-white/70 max-w-2xl mx-auto">
          De la elección de componentes a tu setup gaming en 4 sencillos pasos
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {steps.map((step, index) => (
          <div
            key={step.number}
            className="relative rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent p-6 backdrop-blur-sm hover:border-white/20 transition-all duration-300 hover:scale-105 group"
          >
            {/* Línea conectora (solo en desktop) */}
            {index < steps.length - 1 && (
              <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-gradient-to-r from-violet-500/50 to-transparent z-10"></div>
            )}

            {/* Número */}
            <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-gradient-to-br from-violet-500/20 to-cyan-500/20 border border-white/10 mb-4 text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-violet-400 group-hover:scale-110 transition-transform duration-300">
              {step.number}
            </div>

            {/* Icono */}
            <div className="text-4xl mb-4">{step.icon}</div>

            {/* Contenido */}
            <h3 className="text-xl font-semibold mb-3 text-white">
              {step.title}
            </h3>
            <p className="text-sm text-white/70 leading-relaxed">
              {step.description}
            </p>

            {/* Decoración */}
            <div className="absolute top-4 right-4 h-20 w-20 rounded-full bg-gradient-to-br from-cyan-400/10 to-violet-500/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </div>
        ))}
      </div>
    </section>
  );
}

