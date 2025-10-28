import Link from "next/link";

export default function ConfigurarPC() {
  return (
    <main className="min-h-screen bg-black text-white">
      {/* Hero */}
      <section className="relative flex flex-col items-center text-center py-24 px-6 overflow-hidden">
        {/* Efectos de fondo */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-5xl">
          <div className="inline-block mb-6">
            <div className="h-1 w-20 bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 rounded-full mx-auto mb-4 animate-gradient-shift"></div>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="text-white">Tu PC Ideal,</span>
            <br />
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 bg-clip-text text-transparent animate-gradient-shift">
              Diseñado a Medida
            </span>
          </h1>
          
          <p className="text-gray-300 text-xl max-w-3xl mx-auto leading-relaxed mb-10">
            En TITAN-PC no vendemos ordenadores estándar. Creamos <span className="text-cyan-400 font-semibold">experiencias personalizadas</span> que 
            se adaptan perfectamente a lo que necesitas: gaming de alto nivel, edición profesional, programación, 
            o simplemente el mejor equipo para tu día a día.
          </p>

          <div className="flex flex-wrap gap-4 justify-center mb-12">
            <div className="flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
              <span className="text-2xl">✓</span>
              <span className="text-white/80">Componentes premium</span>
            </div>
            <div className="flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
              <span className="text-2xl">✓</span>
              <span className="text-white/80">Garantía 3 años</span>
            </div>
            <div className="flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
              <span className="text-2xl">✓</span>
              <span className="text-white/80">Montaje profesional</span>
            </div>
          </div>

          <Link
            href="/contacto"
            className="inline-block px-10 py-4 bg-gradient-to-r from-cyan-500 via-blue-500 to-violet-500 text-white text-lg font-semibold rounded-xl hover:shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 hover:scale-105"
          >
            Solicita tu Presupuesto Personalizado
          </Link>
        </div>
      </section>

      {/* Qué hacemos diferente */}
      <section className="py-20 px-6 bg-gradient-to-b from-black to-neutral-950">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            <span className="text-white">¿Qué hace</span>{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 bg-clip-text text-transparent">
              TITAN-PC
            </span>{" "}
            <span className="text-white">diferente?</span>
          </h2>
          <p className="text-gray-400 text-center mb-16 max-w-2xl mx-auto text-lg">
            No vendemos cajas con componentes. Creamos soluciones personalizadas.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Asesoramiento */}
            <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl p-8 rounded-2xl border border-white/10">
              <div className="w-16 h-16 mb-6 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-3 text-cyan-400">Asesoramiento Real</h3>
              <p className="text-gray-400 leading-relaxed">
                Hablamos contigo para entender qué necesitas realmente. Sin tecnicismos innecesarios, 
                sin componentes que no vas a aprovechar. Solo lo que te hace falta.
              </p>
            </div>

            {/* Montaje Profesional */}
            <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl p-8 rounded-2xl border border-white/10">
              <div className="w-16 h-16 mb-6 rounded-2xl bg-gradient-to-br from-blue-400 to-violet-500 flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-3 text-blue-400">Montaje de Calidad</h3>
              <p className="text-gray-400 leading-relaxed">
                Cableado limpio, gestión térmica optimizada, BIOS configurada. Cada PC sale probado, 
                estable y listo para rendir desde el primer día.
              </p>
            </div>

            {/* Soporte Post-Venta */}
            <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl p-8 rounded-2xl border border-white/10">
              <div className="w-16 h-16 mb-6 rounded-2xl bg-gradient-to-br from-violet-400 to-purple-500 flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-3 text-violet-400">Soporte Continuo</h3>
              <p className="text-gray-400 leading-relaxed">
                No desaparecemos después de la venta. 3 años de garantía, actualizaciones, 
                y estamos aquí para cualquier duda o upgrade que necesites.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sección de proceso */}
      <section className="px-6 md:px-20 pb-20">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            <span className="text-white">Nuestro</span>{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 bg-clip-text text-transparent">
              Proceso
            </span>
          </h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            De la consulta inicial a la entrega final, cuidamos cada detalle
          </p>

          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-2xl font-bold">
                1
              </div>
              <h4 className="font-semibold mb-2 text-cyan-400">Consulta</h4>
              <p className="text-sm text-gray-400">Nos cuentas tus necesidades y presupuesto</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-400 to-violet-500 flex items-center justify-center text-2xl font-bold">
                2
              </div>
              <h4 className="font-semibold mb-2 text-blue-400">Diseño</h4>
              <p className="text-sm text-gray-400">Creamos una configuración óptima para ti</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-violet-400 to-purple-500 flex items-center justify-center text-2xl font-bold">
                3
              </div>
              <h4 className="font-semibold mb-2 text-violet-400">Montaje</h4>
              <p className="text-sm text-gray-400">Ensamblamos y probamos cada componente</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center text-2xl font-bold">
                4
              </div>
              <h4 className="font-semibold mb-2 text-purple-400">Entrega</h4>
              <p className="text-sm text-gray-400">Recibe tu PC listo para usar en 24-48h</p>
            </div>
          </div>
        </div>
      </section>

      {/* Sección final CTA */}
      <section className="text-center pb-20 px-6">
        <div className="max-w-4xl mx-auto bg-gradient-to-br from-white/10 to-white/[0.02] backdrop-blur-xl p-12 rounded-3xl border border-white/10 shadow-2xl">
          <h2 className="text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 bg-clip-text text-transparent">
              100% configurables
            </span>
            {" "}
            <span className="text-white">100% TITAN-PC</span>
          </h2>
          
          <p className="text-gray-400 max-w-2xl mx-auto mb-8 leading-relaxed">
            Cada equipo TITAN-PC se ensambla con mimo, se prueba térmica y acústicamente, y se entrega{" "}
            <span className="text-cyan-400 font-semibold">listo para jugar, crear o rendir al máximo</span>.
            Tú eliges el presupuesto. Nosotros nos encargamos del resto.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Link
              href="/productos"
              className="group px-8 py-4 bg-gradient-to-r from-cyan-500 via-blue-500 to-violet-500 text-white rounded-xl font-semibold hover:shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 hover:scale-105"
            >
              Ver Equipos Configurados
              <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">→</span>
            </Link>
            
            <Link
              href="/contacto"
              className="px-8 py-4 bg-white/5 border border-white/20 text-white rounded-xl font-semibold hover:bg-white/10 hover:border-white/40 transition-all duration-300"
            >
              Pide tu Presupuesto Personalizado
            </Link>
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <span className="text-green-400">✓</span>
              <span>Envío 24-48h</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-400">✓</span>
              <span>Garantía 3 años</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-400">✓</span>
              <span>Soporte técnico</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-400">✓</span>
              <span>Financiación disponible</span>
        </div>
      </div>
    </div>
      </section>
    </main>
  );
}
