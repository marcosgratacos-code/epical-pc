"use client";

const badges = [
  {
    icon: "🛡️",
    title: "3 Años Garantía",
    description: "Componentes y montaje",
  },
  {
    icon: "🚚",
    title: "Envío Gratis",
    description: "Península en 24-48h",
  },
  {
    icon: "💳",
    title: "Pago Seguro",
    description: "Stripe verificado",
  },
  {
    icon: "🔄",
    title: "Devolución 30 días",
    description: "Sin preguntas",
  },
  {
    icon: "🎯",
    title: "Montaje Pro",
    description: "Validación térmica",
  },
  {
    icon: "⚡",
    title: "Soporte Rápido",
    description: "WhatsApp directo",
  },
];

export default function TrustBadges() {
  return (
    <section className="mx-auto max-w-7xl p-6 my-12">
      <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent p-8 backdrop-blur-sm">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {badges.map((badge, index) => (
            <div
              key={badge.title}
              className="text-center group"
              style={{
                animation: "fadeInUp 0.6s ease-out forwards",
                animationDelay: `${index * 0.1}s`,
                opacity: 0,
              }}
            >
              <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">
                {badge.icon}
              </div>
              <div className="text-sm font-semibold text-white mb-1">
                {badge.title}
              </div>
              <div className="text-xs text-white/60">{badge.description}</div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}

