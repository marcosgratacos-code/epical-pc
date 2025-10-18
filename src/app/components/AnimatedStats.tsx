"use client";

import { useState, useEffect, useRef } from "react";

interface Stat {
  value: number;
  label: string;
  suffix?: string;
  icon: string;
}

const stats: Stat[] = [
  { value: 500, label: "PCs Montados", suffix: "+", icon: "🖥️" },
  { value: 98, label: "Satisfacción", suffix: "%", icon: "⭐" },
  { value: 3, label: "Años Garantía", suffix: "", icon: "🛡️" },
  { value: 24, label: "Envío Express", suffix: "h", icon: "🚀" },
];

export default function AnimatedStats() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="mx-auto max-w-7xl p-4 md:p-6 my-8 md:my-12"
    >
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
        {stats.map((stat, index) => (
          <StatCard
            key={stat.label}
            stat={stat}
            isVisible={isVisible}
            delay={index * 0.1}
          />
        ))}
      </div>
    </section>
  );
}

function StatCard({
  stat,
  isVisible,
  delay,
}: {
  stat: Stat;
  isVisible: boolean;
  delay: number;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    const duration = 2000; // 2 segundos
    const steps = 60;
    const increment = stat.value / steps;
    const stepDuration = duration / steps;

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      if (currentStep <= steps) {
        setCount(Math.min(Math.floor(increment * currentStep), stat.value));
      } else {
        clearInterval(timer);
        setCount(stat.value);
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [isVisible, stat.value]);

  return (
    <div
      className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent p-3 md:p-6 text-center backdrop-blur-sm hover:border-white/20 transition-all duration-300 hover:scale-105 hover-glow"
      style={{
        animationDelay: `${delay}s`,
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(20px)",
        transition: "all 0.6s ease-out",
      }}
    >
      <div className="text-2xl md:text-4xl mb-2 md:mb-3">{stat.icon}</div>
      <div className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 bg-clip-text text-transparent mb-1 md:mb-2">
        {count}
        {stat.suffix}
      </div>
      <div className="text-xs md:text-sm text-white/70">{stat.label}</div>
    </div>
  );
}

