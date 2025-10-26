'use client';

import ConfiguratorEpic from '../components/ConfiguratorEpic';

export default function PCMedidaPage() {
  const handleSelectPreset = (id: string) => {
    console.log('Preset seleccionado:', id);
    // Aquí puedes manejar la selección de preset
  };

  const handleStartWizard = () => {
    console.log('Wizard iniciado');
    // Aquí puedes navegar al wizard o mostrar el formulario
  };

  return (
    <div className="min-h-screen bg-black text-white py-8">
      <ConfiguratorEpic 
        onSelectPreset={handleSelectPreset}
        onStartWizard={handleStartWizard}
      />
    </div>
  );
}
