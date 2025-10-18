'use client';

import { useEffect, useState } from 'react';
import { useConfigStore } from '@/store/configurator';

interface ConfiguratorProviderProps {
  children: React.ReactNode;
}

export default function ConfiguratorProvider({ children }: ConfiguratorProviderProps) {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="h-20 w-20 rounded-full bg-gradient-to-br from-cyan-400 via-blue-500 to-violet-500"></div>
          <p className="text-white/60">Cargando configurador...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
