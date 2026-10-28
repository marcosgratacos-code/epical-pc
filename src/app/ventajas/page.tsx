

import Link from "next/link";
import Gallery from "../components/Gallery";

export const metadata = {
  title: "Ventajas | TITAN-PC",
  description:
    "Por qué elegir TITAN-PC frente a tiendas genéricas: montaje a medida, validación térmica real, informe de pruebas, soporte cercano y precio cerrado.",
};

export default function VentajasPage() {
  const card =
    "rounded-2xl border border-neutral-200 bg-neutral-50 p-4 text-sm text-neutral-700";
  const pill =
    "inline-flex items-center gap-1 rounded-full border border-neutral-300 bg-neutral-50 px-2 py-1 text-xs text-neutral-600";

  return (
    <main className="min-h-screen bg-white text-neutral-900">
      {/* HERO PERSUASIVO */}
      <section className="border-b border-neutral-200 bg-[radial-gradient(80%_120%_at_0%_0%,rgba(56,189,248,.12),transparent),radial-gradient(80%_120%_at_100%_0%,rgba(139,92,246,.12),transparent)]">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <p className="text-xs text-neutral-500 tracking-widest">TITAN-PC</p>
          <h1 className="mt-2 text-4xl font-extrabold leading-tight">
            Más que “montar un PC”: {" "}
            <span className="text-neutral-600">lo ajustamos para ti</span>
          </h1>
          <p className="mt-3 max-w-2xl text-neutral-700">
            Si compras en una tienda genérica, recibes una lista de piezas.
            Con TITAN-PC te entregamos un equipo{" "}
            <b>probado, silencioso y listo</b>: validación térmica real, informe
            de pruebas, BIOS/Drivers al día y soporte humano que responde.
          </p>

          {/* Trust bar */}
          <div className="mt-5 flex flex-wrap gap-2">
            <span className={pill}>✅ 3 años de garantía</span>
            <span className={pill}>⚙️ Validación térmica real</span>
            <span className={pill}>🕒 Entrega 24/48h</span>
            <span className={pill}>🧰 Precio cerrado, sin sorpresas</span>
            <span className={pill}>🇪🇸 Montado y testeado en España</span>
          </div>

          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              href="/#productos"
              className="rounded-xl bg-neutral-900 px-5 py-2 font-semibold text-white hover:bg-neutral-700"
            >
              Ver montajes
            </Link>
            <Link
              href="/"
              className="rounded-xl border border-neutral-300 px-5 py-2 font-semibold hover:border-neutral-400"
            >
              Volver al inicio
            </Link>
          </div>
        </div>
      </section>

      {/* COMPARATIVA DIRECTA */}
      <section className="mx-auto max-w-7xl px-6 py-10">
        <h2 className="mb-4 text-xl font-semibold">TITAN-PC vs “gran tienda”</h2>

        <div className="overflow-x-auto rounded-2xl border border-neutral-200">
          <table className="min-w-[720px] w-full border-separate border-spacing-0 bg-white text-sm">
            <thead className="bg-neutral-50 text-left">
              <tr>
                <th className="p-3">Qué miras al comprar</th>
                <th className="p-3">TITAN-PC</th>
                <th className="p-3">Tienda genérica</th>
              </tr>
            </thead>
            <tbody>
              {[
                [
                  "Montaje a medida (brief, propuesta, ajustes)",
                  "✅ Sí, con propuesta cerrada y justificación de rendimiento",
                  "❌ No, catálogo estándar",
                ],
                [
                  "Validación térmica real (CPU/GPU + registro)",
                  "✅ Sí, con informe",
                  "⚠️ A veces test básico / no se adjunta",
                ],
                [
                  "Curvas PWM acústicas y control de ruido",
                  "✅ Sí, ajustadas por modelo",
                  "❌ No",
                ],
                [
                  "BIOS/Drivers/Windows (opcional) al día",
                  "✅ Sí, listo para jugar/crear",
                  "⚠️ Depende del almacén",
                ],
                [
                  "Informe de pruebas (temps, estabilidad)",
                  "✅ Incluido",
                  "❌ No",
                ],
                [
                  "Soporte cercano (hablas con el técnico)",
                  "✅ Respuesta humana y seguimiento",
                  "⚠️ Soporte genérico",
                ],
                [
                  "Precio cerrado (sin costes ocultos)",
                  "✅ Sí",
                  "⚠️ Extras y sorpresas frecuentes",
                ],
                [
                  "Equivalencia si no hay stock",
                  "✅ Mismo rendimiento/gama, explicado",
                  "⚠️ Sustitución sin detalles",
                ],
              ].map((r, i) => (
                <tr key={r[0]} className={i % 2 ? "bg-neutral-50" : ""}>
                  <td className="p-3 text-neutral-700">{r[0]}</td>
                  <td className="p-3 font-medium">{r[1]}</td>
                  <td className="p-3 text-neutral-600">{r[2]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-2 text-xs text-neutral-500">
          * Si ves una configuración equivalente más barata,{" "}
          <b>la igualamos o te explicamos la diferencia</b>.
        </p>
      </section>

      {/* QUÉ INCLUYE CADA TITAN */}
      <section className="mx-auto max-w-7xl px-6 py-6">
        <h2 className="mb-4 text-xl font-semibold">Qué incluye cada TITAN-PC</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {[
            "Windows opcional, drivers, utilidades y BIOS/firmware al día.",
            "Perfiles XMP/EXPO aplicados; memoria y timings verificados.",
            "Informe de pruebas con temperaturas/estabilidad y capturas.",
            "Curvas de ventilación ajustadas para menos ruido.",
            "Cableado limpio y flujo de aire optimizado.",
            "3 años de garantía y postventa cercana.",
            "Entrega 24/48h (según stock) y precio cerrado.",
          ].map((i) => (
            <div key={i} className={card}>
              • {i}
            </div>
          ))}
        </div>
      </section>

      {/* CÓMO TRABAJAMOS */}
      <section className="mx-auto max-w-7xl px-6 py-6">
        <h2 className="mb-4 text-xl font-semibold">Cómo trabajamos</h2>
        <ol className="grid gap-4 md:grid-cols-3">
          {[
            {
              t: "1) Brief express",
              d: "Uso (juegos/soft), presupuesto, estética, tamaño de caja y objetivo de ruido.",
            },
            {
              t: "2) Propuesta cerrada",
              d: "2–3 opciones con FPS/tiempos y precio final. Explicamos pros/contras.",
            },
            {
              t: "3) Montaje + validación",
              d: "Stress CPU/GPU, logging de temps y ajuste PWM. Informe incluido.",
            },
          ].map((x) => (
            <li
              key={x.t}
              className="rounded-2xl border border-neutral-200 bg-neutral-50 p-4"
            >
              <div className="mb-1 font-semibold">{x.t}</div>
              <p className="text-neutral-700">{x.d}</p>
            </li>
          ))}
        </ol>
      </section>


      {/* PRUEBAS REALES (PRUEBA SOCIAL) */}
      <section className="mx-auto max-w-7xl px-6 py-6">
        <h2 className="mb-4 text-xl font-semibold">Pruebas reales, no promesas</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {[
            {
              t: "Temperaturas registradas",
              d: "Adjuntamos capturas con temperaturas sostenidas bajo carga.",
            },
            {
              t: "FPS orientativos",
              d: "Indicamos rendimiento esperado en los juegos/soft de tu perfil.",
            },
            {
              t: "Silencio medido",
              d: "Curvas PWM ajustadas por modelo y perfil acústico.",
            },
          ].map((x) => (
            <div key={x.t} className={card}>
              <div className="mb-1 font-semibold">{x.t}</div>
              <p>{x.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* MUESTRAS REALES */}
      <section className="mx-auto max-w-7xl px-6 py-8">
        <Gallery
          title="Muestras reales de montajes y validaciones"
          images={[
            { src: "/cableado-limpio-01.jpg", alt: "Cableado limpio y flujo de aire" },
            { src: "/before-after-cable-management.jpg", alt: "Antes / Después cableado" },
            { src: "/validacion-termica-graph.png", alt: "Validación térmica" },
            { src: "/curvas-pwm-silencio.png", alt: "Curvas PWM silenciosas" },
            { src: "/workbench-assembly.jpg", alt: "Mesa de montaje TITAN" },
            { src: "/epical_hero_setup.jpg", alt: "Setup TITAN" },
          ]}
        />
        <p className="mt-2 text-xs text-neutral-500">
          * Imágenes reales de nuestros montajes y capturas de validación. Podemos compartir más ejemplos al pedir tu propuesta.
        </p>
      </section>

      {/* TESTIMONIOS */}
      <section className="mx-auto max-w-7xl px-6 py-6">
        <h2 className="mb-4 text-xl font-semibold">Qué dicen quienes ya compraron</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {[
            {
              n: "Alex G.",
              t: "Streaming + gaming a la primera, equipo silencioso. 10/10.",
            },
            {
              n: "Sara R.",
              t: "Me ayudaron a elegir y ajustaron el ruido. Soporte que responde.",
            },
            {
              n: "Javi M.",
              t: "Mi 7800X3D vuela y el cableado quedó perfecto. Repetiré para el estudio.",
            },
          ].map((o) => (
            <div key={o.n} className={card}>
              <div className="mb-1 font-semibold">{o.n}</div>
              <p>{o.t}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ ENFOCADO A OBJECIONES */}
      <section className="mx-auto max-w-7xl px-6 py-10">
        <h2 className="mb-4 text-xl font-semibold">Preguntas clave</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className={card}>
            <div className="mb-1 font-semibold">¿Por qué no comprar en PcComponentes?</div>
            <p>
              Son buenos vendiendo piezas, pero <b>no</b> ajustan tu equipo a tu
              perfil ni incluyen informe de pruebas ni curvas acústicas. Con
              TITAN-PC ahorras tiempo y evitas dolores de cabeza: te llega{" "}
              <b>listo, estable y silencioso</b>.
            </p>
          </div>
          <div className={card}>
            <div className="mb-1 font-semibold">¿Y si encuentro más barato?</div>
            <p>
              Si es una configuración <b>equivalente</b>, la <b>igualamos</b> o
              te explicamos la diferencia (calidad de fuente, RAM/SSD, caja,
              validación, etc.).
            </p>
          </div>
          <div className={card}>
            <div className="mb-1 font-semibold">¿Incluye Windows?</div>
            <p>
              Por defecto no. Podemos instalar y activar Windows, con drivers y
              ajustes listos.
            </p>
          </div>
          <div className={card}>
            <div className="mb-1 font-semibold">¿Qué pasa si algo falla?</div>
            <p>
              3 años de garantía. Recogida/entrega en domicilio y soporte
              cercano con seguimiento del técnico que montó tu equipo.
            </p>
          </div>
        </div>
      </section>

      {/* CTA FINAL PERSUASIVO */}
      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-6 text-center">
          <h3 className="text-2xl font-bold">¿Listo para un PC que no te da guerra?</h3>
          <p className="mt-2 text-neutral-600">
            Te proponemos el montaje perfecto y te lo entregamos probado,
            silencioso y listo para usar.
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-3">
            <Link
              href="/#productos"
              className="rounded-xl bg-neutral-900 px-5 py-2 font-semibold text-white hover:bg-neutral-700"
            >
              Ver montajes
            </Link>
            <Link
              href="/"
              className="rounded-xl border border-neutral-300 px-5 py-2 font-semibold hover:border-neutral-400"
            >
              Inicio
            </Link>
          </div>
          <p className="mt-3 text-xs text-neutral-500">
            ¿Dudas? Escríbenos y te pasamos una propuesta comparada (FPS y tiempos).
          </p>
        </div>
      </section>

      {/* CTA PEGAJOSA MÓVIL */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-neutral-200 bg-white backdrop-blur md:hidden">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 p-3">
          <div className="text-sm">
            <div className="font-semibold">¿Te ayudamos a elegir?</div>
            <div className="text-neutral-500">Respuesta rápida y propuesta cerrada</div>
          </div>
        <Link
            href="/#productos"
            className="rounded-xl bg-neutral-900 px-4 py-2 font-semibold text-white"
          >
            Ver montajes
          </Link>
        </div>
      </div>
    </main>
  );
}
