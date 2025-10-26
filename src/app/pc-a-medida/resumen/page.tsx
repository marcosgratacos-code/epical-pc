'use client';

import { useConfigStore } from '@/store/configurator';
import { useRouter } from 'next/navigation';
import ConfiguratorProvider from '@/app/components/configurator/ConfiguratorProvider';
import Link from 'next/link';
import { motion } from 'framer-motion';

function ResumenContent() {
  const { 
    profile, 
    processor, 
    motherboard, 
    memory, 
    graphics, 
    storage, 
    cooling, 
    powerSupply, 
    case: selectedCase,
    reset 
  } = useConfigStore();
  const router = useRouter();

  const handleBack = () => {
    router.push('/pc-a-medida/8-caja');
  };

  const handleReset = () => {
    reset();
    router.push('/pc-a-medida');
  };

  const handleContact = () => {
    router.push('/contacto');
  };

  // Datos simulados de los componentes seleccionados
  const componentData = {
    processor: {
      name: 'AMD Ryzen 7 7800X3D',
      price: '449€',
      description: 'El mejor para gaming competitivo con cache 3D'
    },
    motherboard: {
      name: 'ASUS X670E TUF Gaming',
      price: '299€',
      description: 'Perfecta para overclocking y gaming de alta gama'
    },
    memory: {
      name: 'Corsair Dominator DDR5-7200 32GB',
      price: '249€',
      description: 'Máximo rendimiento para gaming competitivo'
    },
    graphics: {
      name: 'NVIDIA RTX 4080',
      price: '1199€',
      description: 'Perfecta para gaming 4K y trabajo profesional'
    },
    storage: {
      name: 'Samsung 990 PRO 2TB',
      price: '299€',
      description: 'Flagship para gaming y trabajo profesional'
    },
    cooling: {
      name: 'ASUS ROG Ryujin II 360',
      price: '299€',
      description: 'Flagship para overclocking extremo'
    },
    powerSupply: {
      name: 'ASUS ROG Thor 1000W',
      price: '249€',
      description: 'Flagship para overclocking extremo'
    },
    case: {
      name: 'Lian Li O11 Dynamic EVO',
      price: '179€',
      description: 'Ideal para custom loops y estética'
    }
  };

  const totalPrice = Object.values(componentData).reduce((sum, component) => {
    return sum + parseInt(component.price.replace('€', ''));
  }, 0);

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Glow effect behind main content */}
      <div className="absolute inset-0 bg-blue-500/5 blur-3xl -z-10" />
      
      {/* Header */}
      <div className="border-b border-white/10 bg-gradient-to-br from-blue-500/10 via-violet-500/10 to-blue-500/10">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <motion.button 
            onClick={handleBack}
            className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-6"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Volver a caja
          </motion.button>

          <motion.div 
            className="flex items-center gap-4 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="h-12 w-12 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center font-bold text-lg shadow-[0_0_20px_rgba(16,185,129,0.4)]">
              ✓
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-extrabold">
                <span className="bg-gradient-to-r from-green-400 via-emerald-500 to-cyan-500 bg-clip-text text-transparent">
                  ¡Configuración Completa!
                </span>
              </h1>
              <p className="text-lg text-white/70">
                Tu PC personalizado está listo
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Resumen del perfil */}
        <motion.div 
          className="mb-8 rounded-2xl border border-green-500/30 bg-green-500/10 p-6 backdrop-blur"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <h2 className="text-xl font-bold mb-2 text-green-400">🎯 Tu configuración personalizada</h2>
          <p className="text-white/80">
            Basada en tu perfil <strong className="text-green-300">{profile}</strong>, hemos seleccionado los componentes más adecuados para tus necesidades.
          </p>
        </motion.div>

        {/* Lista de componentes */}
        <motion.div 
          className="grid md:grid-cols-2 gap-6 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {Object.entries(componentData).map(([key, component], index) => (
            <motion.div 
              key={key} 
              className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur transition hover:bg-white/7 hover:border-blue-500/30"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              whileHover={{ scale: 1.02, y: -2 }}
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold text-white">{component.name}</h3>
                <span 
                  className="font-bold text-blue-400"
                  style={{ textShadow: '0 0 10px rgba(59,130,246,0.35)' }}
                >
                  {component.price}
                </span>
              </div>
              <p className="text-sm text-white/70">{component.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Resumen de precio */}
        <motion.div 
          className="mb-8 rounded-2xl border border-blue-500/30 bg-blue-500/10 p-6 backdrop-blur"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2 text-blue-400">💰 Precio Total</h2>
              <p className="text-white/80">Incluye montaje profesional y garantía extendida</p>
            </div>
            <div className="text-right">
              <div 
                className="text-4xl font-bold text-blue-400"
                style={{ textShadow: '0 0 15px rgba(59,130,246,0.5)' }}
              >
                {totalPrice}€
              </div>
              <div className="text-sm text-white/60">+ IVA</div>
            </div>
          </div>
        </motion.div>

        {/* Compatibilidad */}
        <motion.div 
          className="mb-8 rounded-2xl border border-green-500/30 bg-green-500/10 p-6 backdrop-blur"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-green-500 flex items-center justify-center">
              <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <h3 className="text-xl font-bold text-green-400">Compatibilidad</h3>
              <p className="text-green-300 font-semibold">✓ Configuración compatible</p>
            </div>
          </div>
        </motion.div>

        {/* Servicios incluidos */}
        <motion.div 
          className="mb-8 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h3 className="text-xl font-bold mb-4 text-white">🔧 Servicios Incluidos</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-white/90 mb-2">Montaje Profesional:</h4>
              <ul className="text-sm text-white/70 space-y-1">
                <li>• Cableado perfecto y organizado</li>
                <li>• Instalación del sistema operativo</li>
                <li>• Configuración de perfiles de overclocking</li>
                <li>• Sincronización RGB completa</li>
                <li>• Test de estabilidad y temperaturas</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white/90 mb-2">Garantía y Soporte:</h4>
              <ul className="text-sm text-white/70 space-y-1">
                <li>• Garantía de 3 años en montaje</li>
                <li>• Soporte técnico especializado</li>
                <li>• Actualizaciones de drivers</li>
                <li>• Servicio de mantenimiento</li>
                <li>• Embalaje premium para envío</li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Botones de acción */}
        <motion.div 
          className="flex flex-col md:flex-row gap-4 justify-center items-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <motion.button
            onClick={handleContact}
            className="w-full md:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold shadow-[0_0_30px_-10px_rgba(16,185,129,0.6)] hover:scale-[1.03] transition-all duration-300"
            whileHover={{ 
              scale: 1.03,
              boxShadow: "0 0 25px rgba(16,185,129,0.8)"
            }}
            whileTap={{ scale: 0.98 }}
          >
            💬 Solicitar Presupuesto Detallado
          </motion.button>
          
          <motion.button
            onClick={handleReset}
            className="w-full md:w-auto px-8 py-4 rounded-2xl border border-white/10 bg-white/5 text-white/80 hover:bg-white/10 transition-all duration-300"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            🔄 Configurar Otra PC
          </motion.button>
        </motion.div>

        {/* Información adicional */}
        <motion.div 
          className="rounded-2xl border border-blue-500/30 bg-blue-500/10 p-6 backdrop-blur"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <h3 className="text-xl font-bold mb-4 text-blue-400">💡 ¿Qué sigue ahora?</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.9 }}
            >
              <div className="text-4xl mb-3">📞</div>
              <h4 className="font-semibold text-white/90 mb-2">1. Contacta con nosotros</h4>
              <p className="text-sm text-white/70">
                Te ayudamos a personalizar aún más tu configuración según tus necesidades específicas.
              </p>
            </motion.div>
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.0 }}
            >
              <div className="text-4xl mb-3">⚙️</div>
              <h4 className="font-semibold text-white/90 mb-2">2. Montaje profesional</h4>
              <p className="text-sm text-white/70">
                Montamos tu PC con el máximo cuidado y profesionalidad, probando cada componente.
              </p>
            </motion.div>
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.1 }}
            >
              <div className="text-4xl mb-3">🚚</div>
              <h4 className="font-semibold text-white/90 mb-2">3. Entrega segura</h4>
              <p className="text-sm text-white/70">
                Tu PC llega a casa perfectamente embalado y listo para usar desde el primer día.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default function ResumenPage() {
  return (
    <ConfiguratorProvider>
      <ResumenContent />
    </ConfiguratorProvider>
  );
}


