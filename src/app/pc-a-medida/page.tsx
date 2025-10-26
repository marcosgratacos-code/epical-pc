'use client';

export default function PCMedidaPage() {
  return (
    <div className="min-h-screen bg-black text-white py-8">
      <div className="mx-auto max-w-7xl px-4">
        <h1 className="text-4xl font-bold text-white mb-6">
          Configurador de PCs TITAN-PC
        </h1>
        <p className="text-white/80 mb-8">
          Página en construcción. Próximamente un configurador completo.
        </p>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="p-6 rounded-lg border border-white/10 bg-white/5">
            <h3 className="text-xl font-semibold text-white mb-2">PC Básico</h3>
            <p className="text-white/60">Desde 800€</p>
          </div>
          <div className="p-6 rounded-lg border border-white/10 bg-white/5">
            <h3 className="text-xl font-semibold text-white mb-2">PC Gaming</h3>
            <p className="text-white/60">Desde 1,500€</p>
          </div>
          <div className="p-6 rounded-lg border border-white/10 bg-white/5">
            <h3 className="text-xl font-semibold text-white mb-2">PC High-End</h3>
            <p className="text-white/60">Desde 2,500€</p>
          </div>
        </div>
      </div>
    </div>
  );
}
