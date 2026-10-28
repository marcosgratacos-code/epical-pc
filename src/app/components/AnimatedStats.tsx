"use client";

import { useState, useEffect, useRef } from "react";

interface Stat {
  value: number;
  label: string;
  suffix?: string;
}

const stats: Stat[] = [
  { value: 500, label: "PCs montados", suffix: "+" },
  { value: 98, label: "Satisfacción", suffix: "%" },
  { value: 3, label: "Años de garantía" },
  { value: 24, label: "Envío express", suffix: "h" },
];

export default function AnimatedStats() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (el) observer.observe(el);
    return () => {
      if (el) observer.unobserve(el);
    };
  }, []);

  return (
    <section ref={sectionRef} className="mx-auto max-w-6xl px-6 py-16 md:py-20">
      <dl className="grid grid-cols-2 gap-y-10 md:grid-cols-4 md:divide-x md:divide-neutral-200">
        {stats.map((stat) => (
          <StatItem key={stat.label} stat={stat} isVisible={isVisible} />
        ))}
      </dl>
    </section>
  );
}

function StatItem({ stat, isVisible }: { stat: Stat; isVisible: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    const duration = 1500;
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
    <div className="px-4 text-center">
      <dd className="text-4xl font-semibold tracking-tight text-neutral-900 tabular-nums md:text-5xl">
        {count}
        {stat.suffix}
      </dd>
      <dt className="mt-2 text-sm text-neutral-500">{stat.label}</dt>
    </div>
  );
}
