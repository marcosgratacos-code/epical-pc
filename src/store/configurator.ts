import { create } from 'zustand';
import { Build, Storage, UserProfile } from '@/types/parts';

export type Step = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

interface ConfigState {
  step: Step;
  build: Build;
  priceTotal: number;
  recommendedPrice: number;
  warnings: string[];
  errors: string[];
  setStep: (s: Step) => void;
  setPart: <K extends keyof Build>(k: K, v: Build[K]) => void;
  addStorage: (d: Storage) => void;
  removeStorage: (id: string) => void;
  recalc: () => void;
  setProfile: (p: UserProfile) => void;
  reset: () => void;
}

export const useConfigStore = create<ConfigState>((set, get) => ({
  step: 0,
  build: {},
  priceTotal: 0,
  recommendedPrice: 0,
  warnings: [],
  errors: [],
  
  setStep: (s) => set({ step: s }),
  
  setPart: (k, v) => {
    set({ build: { ...get().build, [k]: v } });
    setTimeout(() => get().recalc(), 0);
  },
  
  addStorage: (d) => {
    set({ build: { ...get().build, storage: [...(get().build.storage ?? []), d] } });
    setTimeout(() => get().recalc(), 0);
  },
  
  removeStorage: (id) => {
    set({ build: { ...get().build, storage: (get().build.storage ?? []).filter(s => s.id !== id) } });
    setTimeout(() => get().recalc(), 0);
  },
  
  setProfile: (p) => {
    set({ build: { ...get().build, profile: p } });
  },
  
  recalc: () => {
    const b = get().build;
    const parts = [
      b.cpu,
      b.mb,
      b.ram,
      b.gpu,
      b.psu,
      b.case,
      b.cooler,
      ...(b.storage ?? [])
    ].filter(Boolean) as any[];
    
    const total = parts.reduce((sum, p) => sum + (p.price?.eur ?? 0), 0);
    
    // Calcular precio recomendado (piezas marcadas como recommended)
    const recommendedParts = parts.filter(p => p.recommended);
    const recommended = recommendedParts.reduce((sum, p) => sum + (p.price?.eur ?? 0), 0);
    
    set({ priceTotal: total, recommendedPrice: recommended });
  },
  
  reset: () => set({ 
    step: 0, 
    build: {}, 
    priceTotal: 0, 
    recommendedPrice: 0,
    warnings: [], 
    errors: [] 
  })
}));

