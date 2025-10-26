"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";

export default function HeroSection() {
  const [mounted, setMounted] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      setMousePosition({
        x: (clientX / innerWidth - 0.5) * 20,
        y: (clientY / innerHeight - 0.5) * 20,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  const stats = [
    { number: "500+", label: "PCs montados", icon: "💻", gradient: "from-blue-500 to-cyan-500" },
    { number: "98%", label: "Satisfacción", icon: "⭐", gradient: "from-yellow-500 to-orange-500" },
    { number: "3 años", label: "Garantía", icon: "🛡️", gradient: "from-violet-500 to-purple-500" },
    { number: "24h", label: "Envío express", icon: "🚀", gradient: "from-green-500 to-emerald-500" }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.12
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50, filter: "blur(10px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
    }
  };

  const floatVariants = {
    hidden: { opacity: 0, scale: 0.8, rotateY: -15 },
    visible: {
      opacity: 1,
      scale: 1,
      rotateY: 0,
      transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] }
    }
  };

  if (!mounted) return null;

  return (
    <>
      {/* Hero Section */}
      <motion.section 
        ref={heroRef}
        style={{ scale }}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Fondo dinámico mejorado */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-[#0c0f2b] to-[#1a1a3f]" />
        
        {/* Luz volumétrica desde el centro inferior */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-radial from-blue-500/20 via-violet-500/10 to-transparent blur-3xl" />
        
        {/* Efectos de energía digital con parallax */}
        <motion.div 
          className="absolute inset-0"
          style={{
            x: mousePosition.x * 0.5,
            y: mousePosition.y * 0.5,
          }}
        >
          <motion.div 
            className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div 
            className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-violet-500/10 rounded-full blur-3xl"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.4, 0.7, 0.4],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          />
        </motion.div>

        {/* Niebla digital sutil */}
        <div className="absolute inset-0">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-blue-400/20 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                opacity: [0.1, 0.8, 0.1],
                scale: [0.5, 1.5, 0.5],
                y: [-20, 20, -20],
              }}
              transition={{
                duration: 4 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 3,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>

        {/* Luz ambiental neón lateral */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-96 bg-gradient-to-b from-transparent via-blue-500 to-transparent blur-xl opacity-30" />
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-96 bg-gradient-to-b from-transparent via-violet-500 to-transparent blur-xl opacity-30" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-12 items-center">
          {/* Contenido principal */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center lg:text-left"
          >
            {/* Badge */}
            <motion.div variants={itemVariants}>
              <span className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-300 backdrop-blur-sm shadow-lg shadow-blue-500/10">
                <motion.span 
                  className="w-2 h-2 bg-blue-400 rounded-full"
                  animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                Nuevo · Serie EPICAL 2025
              </span>
            </motion.div>

            {/* Título principal con glow mejorado */}
            <motion.h1 
              variants={itemVariants}
              className="mt-6 text-5xl md:text-6xl lg:text-7xl font-black leading-tight"
            >
              <span 
                className="block text-white drop-shadow-2xl"
                style={{
                  textShadow: '0 0 40px rgba(255, 255, 255, 0.3), 0 0 80px rgba(59, 130, 246, 0.2)',
                }}
              >
                Potencia extrema,
              </span>
              <span 
                className="block text-white/90 drop-shadow-xl"
                style={{
                  textShadow: '0 0 30px rgba(255, 255, 255, 0.2)',
                }}
              >
                diseño impecable
              </span>
            </motion.h1>

            {/* Línea luminosa pulsante */}
            <motion.div 
              variants={itemVariants}
              className="mt-6 h-1 w-32 bg-gradient-to-r from-blue-500 via-violet-500 to-transparent rounded-full"
              animate={{
                opacity: [0.5, 1, 0.5],
                scaleX: [1, 1.1, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />

            {/* Subtítulo con gradiente animado */}
            <motion.div 
              variants={itemVariants}
              className="mt-6"
            >
              <motion.span 
                className="text-4xl md:text-5xl lg:text-6xl font-black bg-gradient-to-r from-blue-400 via-violet-400 to-blue-400 bg-clip-text text-transparent"
                style={{
                  backgroundSize: '200% 100%',
                  textShadow: '0 0 60px rgba(59, 130, 246, 0.4)',
                }}
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "linear"
                }}
              >
                PCs personalizados que hacen historia
              </motion.span>
            </motion.div>

            {/* Subtítulo inspirador */}
            <motion.p 
              variants={itemVariants}
              className="mt-8 text-lg md:text-xl lg:text-2xl text-white/70 leading-relaxed max-w-2xl mx-auto lg:mx-0"
            >
              Cada PC se ensambla con{" "}
              <motion.span 
                className="text-blue-300 font-semibold cursor-pointer relative inline-block"
                whileHover={{ 
                  textShadow: '0 0 20px rgba(59, 130, 246, 0.8)',
                  color: '#60a5fa'
                }}
              >
                precisión milimétrica
                <motion.span
                  className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-400 to-violet-400"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.span>
              , validación térmica y rendimiento validado al máximo nivel.
            </motion.p>

            {/* Botones rediseñados con efectos premium */}
            <motion.div 
              variants={itemVariants}
              className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <motion.button
                onClick={() => scrollTo("productos")}
                className="group relative px-8 py-4 bg-gradient-to-r from-blue-500 via-blue-600 to-violet-600 rounded-xl font-bold text-white text-lg overflow-hidden"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                style={{
                  backgroundSize: '200% 100%',
                }}
                transition={{
                  backgroundPosition: {
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear"
                  }
                }}
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Ver montajes
                  <motion.svg 
                    className="w-5 h-5" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </motion.svg>
                </span>
                <motion.div 
                  className="absolute inset-0 bg-white/20"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
                <motion.div
                  className="absolute inset-0"
                  style={{
                    boxShadow: '0 0 0 0 rgba(59, 130, 246, 0.7)',
                  }}
                  whileHover={{
                    boxShadow: '0 0 40px 10px rgba(59, 130, 246, 0.4)',
                  }}
                  transition={{ duration: 0.5 }}
                />
              </motion.button>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="/pc-a-medida"
                  className="group relative px-8 py-4 border-2 rounded-xl font-bold text-white text-lg backdrop-blur-lg overflow-hidden flex items-center justify-center gap-2"
                  style={{
                    borderImage: 'linear-gradient(135deg, rgba(59, 130, 246, 0.5), rgba(139, 92, 246, 0.5)) 1',
                  }}
                >
                  <motion.span
                    className="absolute inset-0 border-2 border-blue-500/50 rounded-xl"
                    animate={{
                      opacity: [0.3, 1, 0.3],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                  <motion.span
                    animate={{ rotate: 360 }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  >
                    ⚙️
                  </motion.span>
                  <span className="relative z-10">Crea tu PC</span>
                  <motion.span
                    animate={{ rotate: [0, 15, -15, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    +
                  </motion.span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-violet-500/10 opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-xl" />
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Imagen del PC con efectos 3D */}
          <motion.div 
            variants={floatVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="relative flex items-center justify-center perspective-1000"
          >
            <motion.div 
              className="relative w-full max-w-lg aspect-square"
              style={{
                rotateY: mousePosition.x * 0.3,
                rotateX: -mousePosition.y * 0.3,
              }}
              animate={{
                y: [-10, 10, -10],
              }}
              transition={{
                y: {
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }}
            >
              {/* Contenedor principal con efectos */}
              <div className="relative w-full h-full rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.05] to-transparent backdrop-blur-sm overflow-hidden group">
                {/* Imagen del PC */}
                <Image 
                  src="/epical_hero_setup.jpg" 
                  alt="TITAN-PC Setup Gaming Premium" 
                  fill 
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-700 group-hover:scale-105" 
                  priority 
                />
                
                {/* Efectos de luz RGB volumétricos */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/30 via-transparent to-violet-500/30 opacity-60 mix-blend-screen" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.5),transparent_50%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(139,92,246,0.5),transparent_50%)]" />
                
                {/* Efecto highlight animado en cristal */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-transparent"
                  animate={{
                    opacity: [0, 0.3, 0],
                    x: ['-100%', '100%'],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    repeatDelay: 3,
                    ease: "easeInOut"
                  }}
                />
                
                {/* Partículas flotantes RGB */}
                <div className="absolute inset-0">
                  {[...Array(15)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-2 h-2 rounded-full"
                      style={{
                        left: `${20 + (i * 5)}%`,
                        top: `${15 + (i * 6)}%`,
                        background: i % 2 === 0 ? 'rgba(59, 130, 246, 0.6)' : 'rgba(139, 92, 246, 0.6)',
                      }}
                      animate={{
                        y: [-20, 20, -20],
                        opacity: [0.3, 1, 0.3],
                        scale: [0.8, 1.3, 0.8],
                      }}
                      transition={{
                        duration: 3 + i * 0.2,
                        repeat: Infinity,
                        delay: i * 0.3,
                        ease: "easeInOut"
                      }}
                    />
                  ))}
                </div>

                {/* Borde interno brillante */}
                <div className="absolute inset-0 rounded-3xl border-2 border-blue-500/20 group-hover:border-blue-500/40 transition-colors duration-500" />
              </div>

              {/* Efectos de glow exterior múltiples */}
              <motion.div 
                className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500/30 to-violet-500/30 blur-2xl scale-110 opacity-40"
                animate={{
                  opacity: [0.3, 0.6, 0.3],
                  scale: [1.1, 1.15, 1.1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <div 
                className="absolute inset-0 rounded-3xl blur-3xl scale-125 opacity-30"
                style={{
                  boxShadow: '0 0 80px 40px rgba(59, 130, 246, 0.5)',
                }}
              />
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Stats Section mejorada */}
      <motion.section 
        className="relative py-20 bg-gradient-to-b from-[#0c0f2b]/80 via-black/60 to-black/80 backdrop-blur-sm"
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        viewport={{ once: true }}
      >
        {/* Luz ambiental de fondo */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-gradient-radial from-blue-500/5 via-transparent to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                variants={itemVariants}
                className="group relative text-center p-8 rounded-3xl border border-blue-500/10 bg-black/40 backdrop-blur-lg cursor-pointer overflow-hidden"
                whileHover={{ 
                  scale: 1.05,
                  borderColor: 'rgba(59, 130, 246, 0.5)',
                }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* Glow de fondo en hover */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-500`}
                />

                {/* Ícono animado */}
                <motion.div 
                  className="text-5xl mb-4"
                  animate={{
                    y: [0, -5, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: index * 0.2,
                  }}
                  whileHover={{ 
                    scale: 1.2,
                    rotate: 360,
                  }}
                >
                  {stat.icon}
                </motion.div>

                {/* Número */}
                <motion.div 
                  className={`text-4xl md:text-5xl font-black bg-gradient-to-br ${stat.gradient} bg-clip-text text-transparent mb-3`}
                  whileHover={{
                    textShadow: '0 0 30px rgba(59, 130, 246, 0.6)',
                  }}
                >
                  {stat.number}
                </motion.div>

                {/* Label */}
                <div className="text-sm text-white/70 group-hover:text-white transition-colors duration-300">
                  {stat.label}
                </div>

                {/* Efecto de resplandor en hover */}
                <motion.div
                  className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    boxShadow: '0 0 30px rgba(59, 130, 246, 0.3)',
                  }}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Botón flotante de WhatsApp mejorado */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 2, duration: 0.5, type: "spring" }}
      >
        <motion.a
          href="https://wa.me/34XXXXXXXXX"
          target="_blank"
          rel="noreferrer"
          className="group relative flex items-center gap-3 rounded-full bg-gradient-to-r from-green-500 to-green-600 px-6 py-4 text-white font-semibold shadow-2xl hover:from-green-600 hover:to-green-700 transition-all duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.div 
            className="text-2xl"
            animate={{ 
              rotate: [0, 15, -15, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
            }}
          >
            💬
          </motion.div>
          <span className="hidden sm:block">Soporte técnico</span>
          <motion.div
            className="absolute inset-0 rounded-full bg-green-400"
            animate={{
              scale: [1, 1.4, 1],
              opacity: [0, 0.4, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          />
        </motion.a>
      </motion.div>
    </>
  );
}
