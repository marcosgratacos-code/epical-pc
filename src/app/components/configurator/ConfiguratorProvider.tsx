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
      <div className="min-h-screen bg-white text-neutral-900 flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="h-20 w-20 rounded-full bg-neutral-900 text-white"></div>
          <p className="text-neutral-500">Cargando configurador...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
