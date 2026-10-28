const steps = [
  {
    number: "01",
    title: "Elige tu PC",
    description: "Selecciona uno de nuestros PCs ya montados o escoge las piezas que quieras. Nosotros nos encargamos del resto.",
  },
  {
    number: "02",
    title: "Lo montamos aquí",
    description: "Cableado limpio, ventiladores configurados y pruebas de temperatura. Cada PC se monta a mano en nuestro taller.",
  },
  {
    number: "03",
    title: "Todo listo",
    description: "Windows instalado, drivers actualizados y BIOS configurado. Cuando lo recibas, conectas y juegas.",
  },
  {
    number: "04",
    title: "Envío rápido",
    description: "Se embala con cuidado y se envía en 24-48h. Recibirás el número de seguimiento para ir viendo dónde está.",
  },
];

export default function HowItWorks() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20 md:py-28">
      <div className="mb-12 max-w-2xl md:mb-16">
        <p className="text-sm font-medium text-blue-600">Cómo funciona</p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-neutral-900 md:text-4xl">
          De la elección de piezas a tu setup, en cuatro pasos
        </h2>
      </div>

      <ol className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((step) => (
          <li key={step.number} className="border-t border-neutral-200 pt-6">
            <span className="text-sm font-medium text-neutral-400 tabular-nums">{step.number}</span>
            <h3 className="mt-3 text-lg font-semibold text-neutral-900">{step.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-neutral-500">{step.description}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
