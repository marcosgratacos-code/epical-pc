import { Build, UserProfile, StatBadge, PartBase } from '@/types/parts';

interface RecommendationCriteria {
  budgetPerCategory: {
    cpu: [number, number]; // [min, max]
    gpu: [number, number];
    ram: [number, number];
    storage: [number, number];
    psu: [number, number];
    cooler: [number, number];
    case: [number, number];
    mb: [number, number];
  };
  priorities: string[];
  badges: StatBadge[];
}

export function getProfileCriteria(profile: UserProfile): RecommendationCriteria {
  switch (profile) {
    case 'Esports 1080p':
      return {
        budgetPerCategory: {
          cpu: [200, 450],
          gpu: [300, 600],
          ram: [80, 150],
          storage: [80, 200],
          psu: [80, 150],
          cooler: [50, 120],
          case: [60, 120],
          mb: [150, 250],
        },
        priorities: ['CPU rápido (9800X3D, 7600X)', 'GPU media-alta', 'RAM 32GB DDR5 6000MHz'],
        badges: [
          { label: 'TOP Gaming', tone: 'success' },
          { label: '240+ FPS', tone: 'info' },
        ],
      };

    case '4K Ultra':
      return {
        budgetPerCategory: {
          cpu: [400, 700],
          gpu: [1200, 2500],
          ram: [120, 250],
          storage: [150, 400],
          psu: [150, 300],
          cooler: [100, 200],
          case: [100, 250],
          mb: [250, 500],
        },
        priorities: ['GPU flagship (RTX 5090, 5080)', 'PSU ≥850W ATX3.1', 'RAM 64GB DDR5 6400+'],
        badges: [
          { label: '4K Ultra', tone: 'success' },
          { label: 'Ray Tracing', tone: 'info' },
        ],
      };

    case 'Edición Vídeo':
      return {
        budgetPerCategory: {
          cpu: [450, 800],
          gpu: [600, 1200],
          ram: [150, 300],
          storage: [200, 600],
          psu: [120, 200],
          cooler: [100, 180],
          case: [80, 180],
          mb: [200, 400],
        },
        priorities: ['CPU multi-core (9950X, 14900K)', 'RAM 64GB+', 'NVMe Gen5 para scratch'],
        badges: [
          { label: 'Edición Pro', tone: 'success' },
          { label: 'Multi-Core', tone: 'info' },
        ],
      };

    case 'IA/LLM':
      return {
        budgetPerCategory: {
          cpu: [350, 650],
          gpu: [1000, 2500],
          ram: [200, 450],
          storage: [150, 500],
          psu: [150, 300],
          cooler: [100, 180],
          case: [80, 150],
          mb: [200, 400],
        },
        priorities: ['GPU VRAM máxima (24GB+)', 'RAM 96GB+', 'NVMe rápido para datasets'],
        badges: [
          { label: 'IA/ML', tone: 'success' },
          { label: 'Alta VRAM', tone: 'info' },
        ],
      };

    case 'Ofimática Silenciosa':
      return {
        budgetPerCategory: {
          cpu: [120, 300],
          gpu: [0, 200],
          ram: [50, 120],
          storage: [60, 150],
          psu: [60, 120],
          cooler: [40, 100],
          case: [60, 150],
          mb: [100, 200],
        },
        priorities: ['Silencio máximo', 'Cooler aire premium o AIO 240', 'PSU 550-650W alta eficiencia'],
        badges: [
          { label: 'Silencio', tone: 'success' },
          { label: 'Eficiente', tone: 'info' },
        ],
      };

    default:
      return {
        budgetPerCategory: {
          cpu: [200, 500],
          gpu: [300, 800],
          ram: [80, 180],
          storage: [80, 250],
          psu: [80, 150],
          cooler: [50, 120],
          case: [60, 150],
          mb: [150, 300],
        },
        priorities: ['Balance precio/rendimiento'],
        badges: [],
      };
  }
}

export function getAutoBadges(build: Build): StatBadge[] {
  const badges: StatBadge[] = [];

  // Silencio
  if (
    (build.cooler?.type === 'AIO' && build.cooler.radMM && build.cooler.radMM >= 240) ||
    (build.psu?.efficiency80 === 'Platinum' || build.psu?.efficiency80 === 'Titanium')
  ) {
    badges.push({ label: 'Silencio', tone: 'success' });
  }

  // Estable
  if (build.psu && build.cpu && build.gpu) {
    const estW = (build.cpu.tdpW ?? 0) + (build.gpu.tgpW ?? 0) + 100;
    if (build.psu.watts >= estW * 1.5) {
      badges.push({ label: 'Estable', tone: 'success' });
    }
  }

  // Top Gaming
  if (build.gpu && build.gpu.vramGB >= 16 && build.cpu?.has3DCache) {
    badges.push({ label: 'TOP Gaming', tone: 'success' });
  }

  // 3 años garantía (siempre)
  badges.push({ label: '3 años garantía', tone: 'info' });

  return badges;
}

export function getRecommendedIds(category: string, buildPartial: Build, profile?: UserProfile): string[] {
  // Aquí retornarías IDs basándote en el perfil y compatibilidad
  // Por ahora, retornamos array vacío (se implementa con datos reales)
  return [];
}

export function calculateSavings(priceTotal: number, recommendedPrice: number): number {
  if (recommendedPrice === 0) return 0;
  return Math.max(0, recommendedPrice - priceTotal);
}

