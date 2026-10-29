import type { Metadata } from "next";
import Link from "next/link";
import TitanConfigurator from "../components/configurator/TitanConfigurator";
import { catalogForClient } from "@/lib/configurator";
import { POLICIES } from "../lib/policies";

export const metadata: Metadata = {
  title: "Configura tu TITAN | TITAN-PC",
  description:
    "Elige procesador, placa, memoria, gráfica, almacenamiento, refrigeración, caja y fuente. Compatibilidad y precio validados en el servidor.",
};

export default function ConfigurarPC() {
  const catalog = catalogForClient();
  return (
    <main className="bg-white text-ink">
      <section className="container-wide pt-14 pb-8 sm:pt-20">
        <p className="text-sm font-medium text-muted">PC a medida</p>
        <h1 className="mt-2 text-display font-semibold tracking-tight">Configura tu TITAN.</h1>
        <p className="mt-4 max-w-2xl text-lg text-muted">
          Elige cada componente y comprueba al instante que encajan entre sí. El servidor valida la compatibilidad y calcula el precio;
          cuando estés listo, nos envías la configuración y te respondemos con el presupuesto final.
        </p>
        <ul className="mt-6 flex flex-wrap gap-2 text-sm text-neutral-700">
          <li className="rounded-full bg-surface px-4 py-1.5">Garantía de {POLICIES.warrantyYears} años</li>
          <li className="rounded-full bg-surface px-4 py-1.5">Montaje y pruebas por nuestro equipo</li>
          <li className="rounded-full bg-surface px-4 py-1.5">Sin compromiso</li>
        </ul>
      </section>

      <section className="container-wide pb-20" aria-label="Configurador">
        <TitanConfigurator catalog={catalog} />
      </section>

      <section className="section-gray">
        <div className="container-content py-14 text-center">
          <h2 className="text-headline font-semibold tracking-tight">¿Prefieres que lo hagamos nosotros?</h2>
          <p className="mx-auto mt-3 max-w-xl text-muted">
            Cuéntanos qué juegos usas, tu presupuesto y tu resolución, y te proponemos una configuración.
          </p>
          <Link href="/contacto" className="btn btn-primary mt-6">Solicitar presupuesto personalizado</Link>
        </div>
      </section>
    </main>
  );
}
