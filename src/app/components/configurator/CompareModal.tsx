'use client';

interface CompareModalProps {
  parts: any[];
  category: string;
  onClose: () => void;
  onSelect: (part: any) => void;
}

export default function CompareModal({ parts, category, onClose, onSelect }: CompareModalProps) {
  if (parts.length === 0) return null;

  // Especificaciones a comparar según categoría
  const getCompareSpecs = () => {
    switch (category) {
      case 'cpu':
        return ['cores', 'threads', 'boostGHz', 'tdpW', 'has3DCache'];
      case 'mb':
        return ['chipset', 'ramGen', 'ramMaxMHz', 'pcieX16Gen', 'wifi'];
      case 'ram':
        return ['capacityGB', 'kit', 'mhz', 'cl', 'expoXmp', 'rgb'];
      case 'gpu':
        return ['vramGB', 'pcieGen', 'tgpW', 'lengthMM'];
      case 'storage':
        return ['capacityTB', 'type', 'readMBs', 'writeMBs', 'pcieGen'];
      case 'psu':
        return ['watts', 'standard', 'efficiency80', 'pcie5_12vhpwr'];
      case 'case':
        return ['maxGpuLenMM', 'supports360Rad', 'fansIncluded'];
      case 'cooler':
        return ['type', 'radMM', 'tdpSupportW'];
      default:
        return [];
    }
  };

  const specs = getCompareSpecs();

  const getSpecLabel = (spec: string): string => {
    const labels: Record<string, string> = {
      cores: 'Núcleos',
      threads: 'Hilos',
      boostGHz: 'Frecuencia boost',
      tdpW: 'TDP',
      has3DCache: '3D Cache',
      chipset: 'Chipset',
      ramGen: 'Tipo RAM',
      ramMaxMHz: 'RAM Max MHz',
      pcieX16Gen: 'PCIe Gen',
      wifi: 'WiFi',
      capacityGB: 'Capacidad',
      kit: 'Kit',
      mhz: 'Velocidad',
      cl: 'Latencia CL',
      expoXmp: 'EXPO/XMP',
      rgb: 'RGB',
      vramGB: 'VRAM',
      tgpW: 'TGP',
      lengthMM: 'Longitud',
      capacityTB: 'Capacidad',
      type: 'Tipo',
      readMBs: 'Lectura',
      writeMBs: 'Escritura',
      pcieGen: 'PCIe Gen',
      watts: 'Potencia',
      standard: 'Estándar',
      efficiency80: 'Eficiencia',
      pcie5_12vhpwr: 'PCIe 5.0 12VHPWR',
      maxGpuLenMM: 'GPU Máxima',
      supports360Rad: 'Soporta 360mm',
      fansIncluded: 'Ventiladores',
      radMM: 'Tamaño radiador',
      tdpSupportW: 'TDP Soportado',
    };
    return labels[spec] || spec;
  };

  const formatValue = (value: any): string => {
    if (value === null || value === undefined) return '-';
    if (typeof value === 'boolean') return value ? '✓' : '✗';
    if (Array.isArray(value)) return value.join(', ');
    return String(value);
  };

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 z-[999] bg-black/80 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
        <div className="bg-white border border-neutral-300 rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden animate-fade-in-scale shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-neutral-200">
            <h2 className="text-2xl font-bold">Comparar productos</h2>
            <button
              onClick={onClose}
              className="h-10 w-10 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center transition-colors"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Contenido */}
          <div className="overflow-x-auto overflow-y-auto max-h-[calc(90vh-140px)]">
            <table className="w-full">
              <thead className="sticky top-0 bg-white/95 backdrop-blur-xl z-10">
                <tr>
                  <th className="p-4 text-left border-b border-neutral-200 w-48">Especificación</th>
                  {parts.map((part) => (
                    <th key={part.id} className="p-4 border-b border-neutral-200">
                      <div className="space-y-3">
                        <div className="font-semibold text-neutral-900">{part.name}</div>
                        <div className="text-2xl font-bold text-neutral-900">
                          {part.price.eur.toFixed(2)} €
                        </div>
                        {part.recommended && (
                          <span className="inline-block px-2 py-1 rounded-full text-xs font-semibold bg-neutral-900 text-white">
                            Recomendado
                          </span>
                        )}
                        <button
                          onClick={() => onSelect(part)}
                          className="w-full px-4 py-2 rounded-xl bg-neutral-900 text-white font-semibold hover:shadow-lg hover:shadow-black/10 transition-all"
                        >
                          Elegir
                        </button>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {specs.map((spec, idx) => (
                  <tr key={spec} className={idx % 2 === 0 ? 'bg-neutral-50' : ''}>
                    <td className="p-4 text-neutral-500 font-medium">{getSpecLabel(spec)}</td>
                    {parts.map((part) => (
                      <td key={`${part.id}-${spec}`} className="p-4 text-center text-neutral-900">
                        {formatValue(part[spec])}
                      </td>
                    ))}
                  </tr>
                ))}
                
                {/* Fila de stock */}
                <tr className="bg-neutral-50">
                  <td className="p-4 text-neutral-500 font-medium">Stock</td>
                  {parts.map((part) => (
                    <td key={`${part.id}-stock`} className="p-4 text-center">
                      <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                        part.stock === 'in_stock' ? 'bg-green-100 text-green-700' :
                        part.stock === 'low' ? 'bg-amber-100 text-amber-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {part.stock === 'in_stock' ? 'En stock' : 
                         part.stock === 'low' ? 'Pocas unidades' : 
                         'Sin stock'}
                      </span>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

