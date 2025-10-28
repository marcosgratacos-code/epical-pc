import Link from "next/link";
import Image from "next/image";

export default function ConfigurarPC() {
  return (
    <main className="min-h-screen bg-black text-white">
      {/* Hero */}
      <section className="flex flex-col items-center text-center py-20 px-6">
        <div className="inline-block mb-6">
          <div className="h-1 w-20 bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 rounded-full mx-auto mb-4 animate-gradient-shift"></div>
        </div>
        
        <h1 className="text-5xl md:text-6xl font-bold mb-4">
          <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 bg-clip-text text-transparent animate-gradient-shift">
            PCs a Medida
          </span>
          {" "}
          <span className="text-white">TITAN-PC</span>
        </h1>
        
        <p className="text-gray-300 text-lg max-w-3xl leading-relaxed">
          Diseñamos y montamos ordenadores <span className="text-cyan-400 font-semibold">100% personalizados</span> para 
          todos los presupuestos y tipos de usuario. Desde gamers exigentes hasta profesionales creativos o estudiantes, 
          cada equipo TITAN-PC se adapta a <span className="text-blue-400 font-semibold">tus necesidades</span>, rendimiento y estilo.
        </p>

        <div className="mt-8 flex flex-wrap gap-4 justify-center">
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10">
            <span className="text-2xl">✓</span>
            <span className="text-sm text-white/80">Componentes de primeras marcas</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10">
            <span className="text-2xl">✓</span>
            <span className="text-sm text-white/80">Garantía 3 años</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10">
            <span className="text-2xl">✓</span>
            <span className="text-sm text-white/80">Montaje profesional</span>
          </div>
        </div>
      </section>

      {/* Sección de tipos de PC con imágenes */}
      <section className="grid md:grid-cols-3 gap-8 px-6 md:px-20 pb-20">
        {/* PC Gaming */}
        <div className="group bg-gradient-to-br from-white/10 to-white/[0.02] backdrop-blur-xl p-6 rounded-2xl border border-white/10 hover:border-cyan-400/50 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-cyan-500/20">
          <div className="relative h-64 mb-6 rounded-xl overflow-hidden">
            <Image
              src="/epical_hero_setup.jpg"
              alt="PC Gaming TITAN"
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div className="absolute bottom-4 left-4 right-4">
              <span className="inline-block px-3 py-1 rounded-full bg-cyan-400/20 border border-cyan-400/40 text-cyan-300 text-xs font-semibold">
                ALTO RENDIMIENTO
              </span>
            </div>
          </div>
          
          <h3 className="text-2xl font-bold mb-3 text-cyan-400 group-hover:text-cyan-300 transition-colors">
            🎮 PC Gaming
          </h3>
          <p className="text-gray-400 text-sm leading-relaxed mb-4">
            Rendimiento extremo para los últimos títulos AAA. Refrigeración avanzada, iluminación RGB personalizable 
            y componentes certificados. <span className="text-cyan-400 font-semibold">Cada FPS cuenta</span>.
          </p>
          
          <div className="space-y-2 mb-6">
            <div className="flex items-center gap-2 text-sm text-white/70">
              <span className="text-green-400">●</span>
              <span>RTX 5060 / 5070 / 5080</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-white/70">
              <span className="text-green-400">●</span>
              <span>Intel i5/i7 o AMD Ryzen 7/9</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-white/70">
              <span className="text-green-400">●</span>
              <span>16GB - 64GB DDR5</span>
            </div>
          </div>

          <div className="text-sm text-gray-500 mb-2">Desde</div>
          <div className="text-3xl font-bold text-white mb-4">900€</div>
        </div>

        {/* PC Profesional */}
        <div className="group bg-gradient-to-br from-white/10 to-white/[0.02] backdrop-blur-xl p-6 rounded-2xl border border-white/10 hover:border-blue-400/50 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-blue-500/20">
          <div className="relative h-64 mb-6 rounded-xl overflow-hidden">
            <Image
              src="/cableado-limpio-01.jpg"
              alt="PC Profesional TITAN"
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div className="absolute bottom-4 left-4 right-4">
              <span className="inline-block px-3 py-1 rounded-full bg-blue-400/20 border border-blue-400/40 text-blue-300 text-xs font-semibold">
                WORKSTATION
              </span>
            </div>
          </div>
          
          <h3 className="text-2xl font-bold mb-3 text-blue-400 group-hover:text-blue-300 transition-colors">
            💼 PC Profesional
          </h3>
          <p className="text-gray-400 text-sm leading-relaxed mb-4">
            Equipos silenciosos y optimizados para <span className="text-blue-400 font-semibold">edición, diseño, IA o programación</span> intensiva. 
            Estabilidad 24/7 y máxima eficiencia energética.
          </p>
          
          <div className="space-y-2 mb-6">
            <div className="flex items-center gap-2 text-sm text-white/70">
              <span className="text-green-400">●</span>
              <span>GPUs profesionales o RTX</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-white/70">
              <span className="text-green-400">●</span>
              <span>Procesadores multi-core</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-white/70">
              <span className="text-green-400">●</span>
              <span>32GB - 128GB RAM</span>
            </div>
          </div>

          <div className="text-sm text-gray-500 mb-2">Desde</div>
          <div className="text-3xl font-bold text-white mb-4">1,200€</div>
        </div>

        {/* PC para Todos */}
        <div className="group bg-gradient-to-br from-white/10 to-white/[0.02] backdrop-blur-xl p-6 rounded-2xl border border-white/10 hover:border-violet-400/50 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-violet-500/20">
          <div className="relative h-64 mb-6 rounded-xl overflow-hidden">
            <Image
              src="/logo-sin-fondo.png"
              alt="PC para Todos TITAN"
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div className="absolute bottom-4 left-4 right-4">
              <span className="inline-block px-3 py-1 rounded-full bg-violet-400/20 border border-violet-400/40 text-violet-300 text-xs font-semibold">
                ACCESIBLE
              </span>
            </div>
          </div>
          
          <h3 className="text-2xl font-bold mb-3 text-violet-400 group-hover:text-violet-300 transition-colors">
            🏠 PC para Todos
          </h3>
          <p className="text-gray-400 text-sm leading-relaxed mb-4">
            Ordenadores <span className="text-violet-400 font-semibold">accesibles, fiables y duraderos</span>. 
            Perfectos para estudiar, trabajar en oficina, navegar y disfrutar del contenido multimedia.
          </p>
          
          <div className="space-y-2 mb-6">
            <div className="flex items-center gap-2 text-sm text-white/70">
              <span className="text-green-400">●</span>
              <span>Procesadores eficientes</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-white/70">
              <span className="text-green-400">●</span>
              <span>Gráficos integrados o dedicados</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-white/70">
              <span className="text-green-400">●</span>
              <span>8GB - 16GB RAM</span>
            </div>
          </div>

          <div className="text-sm text-gray-500 mb-2">Desde</div>
          <div className="text-3xl font-bold text-white mb-4">600€</div>
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
