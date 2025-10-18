import { NextRequest, NextResponse } from 'next/server';
import { Build, UserProfile } from '@/types/parts';

interface Preset {
  id: string;
  name: string;
  profile: UserProfile;
  build: Build;
  priceTotal: number;
  description: string;
}

export async function GET(request: NextRequest) {
  try {
    const presets: Preset[] = [
      {
        id: 'preset-esports',
        name: 'Esports 1080p',
        profile: 'Esports 1080p',
        build: {
          cpu: {
            id: 'cpu-1',
            name: 'AMD Ryzen 7 9800X3D',
            brand: 'AMD',
            price: { eur: 519, isOrientative: true },
            stock: 'in_stock',
            recommended: true,
            socket: 'AM5',
            cores: 8,
            threads: 16,
            baseGHz: 4.7,
            boostGHz: 5.2,
            tdpW: 120,
            gen: 'Zen 5',
            has3DCache: true,
            badges: [{ label: 'TOP Gaming', tone: 'success' }],
          },
          gpu: {
            id: 'gpu-7',
            name: 'MSI GeForce RTX 5060 VENTUS 2X OC 8GB',
            brand: 'MSI',
            price: { eur: 299, isOrientative: true },
            stock: 'in_stock',
            vramGB: 8,
            pcieGen: 5,
            lengthMM: 243,
            tgpW: 150,
          },
        },
        priceTotal: 818,
        description: 'Configuración optimizada para gaming competitivo en 1080p con máximo FPS.',
      },
      {
        id: 'preset-4k',
        name: '4K Ultra Gaming',
        profile: '4K Ultra',
        build: {
          cpu: {
            id: 'cpu-2',
            name: 'AMD Ryzen 9 9950X',
            brand: 'AMD',
            price: { eur: 689, isOrientative: true },
            stock: 'in_stock',
            socket: 'AM5',
            cores: 16,
            threads: 32,
            baseGHz: 4.3,
            boostGHz: 5.7,
            tdpW: 170,
            gen: 'Zen 5',
            badges: [{ label: 'Multi-Core', tone: 'info' }],
          },
          gpu: {
            id: 'gpu-5',
            name: 'MSI GeForce RTX 5080 VENTUS 3X OC PLUS 16GB',
            brand: 'MSI',
            price: { eur: 1300, isOrientative: true },
            stock: 'in_stock',
            vramGB: 16,
            pcieGen: 5,
            lengthMM: 336,
            tgpW: 350,
          },
        },
        priceTotal: 1989,
        description: 'Configuración flagship para gaming en 4K con Ray Tracing y máximo rendimiento.',
      },
      {
        id: 'preset-edicion',
        name: 'Edición Profesional',
        profile: 'Edición Vídeo',
        build: {
          cpu: {
            id: 'cpu-2',
            name: 'AMD Ryzen 9 9950X',
            brand: 'AMD',
            price: { eur: 689, isOrientative: true },
            stock: 'in_stock',
            socket: 'AM5',
            cores: 16,
            threads: 32,
            baseGHz: 4.3,
            boostGHz: 5.7,
            tdpW: 170,
            gen: 'Zen 5',
            badges: [{ label: 'Multi-Core', tone: 'info' }],
          },
          gpu: {
            id: 'gpu-1',
            name: 'MSI GeForce RTX 5070 Ti VENTUS 3X OC 16GB',
            brand: 'MSI',
            price: { eur: 1018, isOrientative: true },
            stock: 'in_stock',
            recommended: true,
            vramGB: 16,
            pcieGen: 5,
            lengthMM: 336,
            tgpW: 260,
            badges: [{ label: 'Trending', tone: 'success' }, { label: '1440p/4K', tone: 'info' }],
          },
        },
        priceTotal: 1707,
        description: 'Configuración optimizada para edición de vídeo, renderizado y trabajo profesional.',
      },
      {
        id: 'preset-ia',
        name: 'IA y Machine Learning',
        profile: 'IA/LLM',
        build: {
          cpu: {
            id: 'cpu-2',
            name: 'AMD Ryzen 9 9950X',
            brand: 'AMD',
            price: { eur: 689, isOrientative: true },
            stock: 'in_stock',
            socket: 'AM5',
            cores: 16,
            threads: 32,
            baseGHz: 4.3,
            boostGHz: 5.7,
            tdpW: 170,
            gen: 'Zen 5',
            badges: [{ label: 'Multi-Core', tone: 'info' }],
          },
          gpu: {
            id: 'gpu-2',
            name: 'NVIDIA GeForce RTX 5090 FE 32GB',
            brand: 'NVIDIA',
            price: { eur: 2329, isOrientative: true },
            stock: 'low',
            vramGB: 32,
            pcieGen: 5,
            lengthMM: 304,
            tgpW: 575,
            badges: [{ label: 'TOP Tier', tone: 'success' }, { label: '4K Max', tone: 'info' }],
          },
        },
        priceTotal: 3018,
        description: 'Configuración máxima para IA, machine learning y modelos de lenguaje grandes.',
      },
      {
        id: 'preset-oficina',
        name: 'Oficina Silenciosa',
        profile: 'Ofimática Silenciosa',
        build: {
          cpu: {
            id: 'cpu-6',
            name: 'AMD Ryzen 5 7600X',
            brand: 'AMD',
            price: { eur: 179, isOrientative: true },
            stock: 'in_stock',
            socket: 'AM5',
            cores: 6,
            threads: 12,
            baseGHz: 4.7,
            boostGHz: 5.3,
            tdpW: 105,
            gen: 'Zen 4',
            badges: [{ label: 'Mejor relación', tone: 'info' }],
          },
          gpu: {
            id: 'gpu-10',
            name: 'Gigabyte Radeon RX 7600 GAMING OC 8GB',
            brand: 'Gigabyte',
            price: { eur: 249, isOrientative: true },
            stock: 'in_stock',
            vramGB: 8,
            pcieGen: 4,
            lengthMM: 243,
            tgpW: 165,
          },
        },
        priceTotal: 428,
        description: 'Configuración silenciosa y eficiente para trabajo de oficina y uso general.',
      },
      {
        id: 'preset-balanced',
        name: 'Configuración Equilibrada',
        profile: 'Esports 1080p',
        build: {
          cpu: {
            id: 'cpu-3',
            name: 'AMD Ryzen 5 9600X',
            brand: 'AMD',
            price: { eur: 219, isOrientative: true },
            stock: 'in_stock',
            socket: 'AM5',
            cores: 6,
            threads: 12,
            baseGHz: 3.9,
            boostGHz: 5.4,
            tdpW: 65,
            gen: 'Zen 5',
            badges: [{ label: 'Nueva Gen', tone: 'info' }],
          },
          gpu: {
            id: 'gpu-3',
            name: 'ASUS DUAL GeForce RTX 5060 Ti OC Edition 16GB',
            brand: 'ASUS',
            price: { eur: 485, isOrientative: true },
            stock: 'in_stock',
            vramGB: 16,
            pcieGen: 5,
            lengthMM: 243,
            tgpW: 190,
          },
        },
        priceTotal: 704,
        description: 'Configuración equilibrada con excelente relación precio/rendimiento.',
      },
    ];

    return NextResponse.json(presets);
  } catch (error) {
    console.error('Error fetching presets:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

