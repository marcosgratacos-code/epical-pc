import { Headset, PackageCheck, RotateCcw, ShieldCheck, Thermometer, Truck } from "lucide-react";

const badges = [
  { icon: ShieldCheck, title: "3 años de garantía", description: "Componentes y montaje" },
  { icon: Truck, title: "Envío gratis", description: "Península en 24-48h" },
  { icon: PackageCheck, title: "Pago seguro", description: "Stripe verificado" },
  { icon: RotateCcw, title: "Devolución 30 días", description: "Sin preguntas" },
  { icon: Thermometer, title: "Montaje pro", description: "Validación térmica" },
  { icon: Headset, title: "Soporte rápido", description: "WhatsApp directo" },
];

export default function TrustBadges() {
  return (
    <section className="border-y border-neutral-200 bg-neutral-50">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-x-6 gap-y-8 px-6 py-12 md:grid-cols-3 lg:grid-cols-6">
        {badges.map(({ icon: Icon, title, description }) => (
          <div key={title} className="flex flex-col items-center text-center">
            <Icon className="h-6 w-6 text-neutral-900" strokeWidth={1.5} aria-hidden="true" />
            <p className="mt-3 text-sm font-medium text-neutral-900">{title}</p>
            <p className="mt-1 text-xs text-neutral-500">{description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
