"use client";

import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  Cpu,
  CircuitBoard,
  MemoryStick,
  Monitor,
  HardDrive,
  BatteryCharging,
  Box,
  Snowflake,
  CheckCircle2,
  AlertTriangle,
  X,
  Sparkles,
  Cable,
  Headphones,
  FileText,
  MousePointer,
} from "lucide-react";
import BuildValidatorPanel from "./BuildValidatorPanel";
import { CatalogProduct } from "@/types/catalog";

// Simple data structures
type CPU = {
  id: string;
  name: string;
  socket: string;
  cores: number;
  threads: number;
  base: number;
  boost: number;
  price: number;
};

type Mobo = {
  id: string;
  name: string;
  socket: string;
  form: string;
  chipset: string;
  price: number;
};

type RAM = {
  id: string;
  name: string;
  type: string;
  speed: number;
  sizeGB: number;
  price: number;
};

type GPU = {
  id: string;
  name: string;
  vramGB: number;
  price: number;
};

type Storage = {
  id: string;
  name: string;
  type: string;
  sizeTB: number;
  price: number;
};

type PSU = {
  id: string;
  name: string;
  watts: number;
  rating: string;
  price: number;
};

type Case = {
  id: string;
  name: string;
  form: string;
  price: number;
};

type Cooler = {
  id: string;
  name: string;
  type: string;
  price: number;
};

type Build = {
  cpu?: CPU;
  mobo?: Mobo;
  ram?: RAM;
  gpu?: GPU;
  storage?: Storage;
  psu?: PSU;
  case?: Case;
  cooler?: Cooler;
};

type CategoryKey = keyof Build;

// Simple data
const CPUs: CPU[] = [
  {
    id: "r9-9950x3d",
    name: "AMD Ryzen 9 9950X3D",
    socket: "AM5",
    cores: 16,
    threads: 32,
    base: 4.5,
    boost: 5.7,
    price: 799,
  },
  {
    id: "r7-9800x3d",
    name: "AMD Ryzen 7 9800X3D",
    socket: "AM5",
    cores: 8,
    threads: 16,
    base: 4.3,
    boost: 5.4,
    price: 529,
  },
  {
    id: "i7-15700k",
    name: "Intel Core i7‑15700K",
    socket: "LGA1851",
    cores: 20,
    threads: 28,
    base: 3.0,
    boost: 5.6,
    price: 449,
  },
  {
    id: "r5-7600",
    name: "AMD Ryzen 5 7600",
    socket: "AM5",
    cores: 6,
    threads: 12,
    base: 4.7,
    boost: 5.3,
    price: 229,
  },
  {
    id: "i5-14400f",
    name: "Intel Core i5‑14400F",
    socket: "LGA1700",
    cores: 10,
    threads: 16,
    base: 2.5,
    boost: 4.6,
    price: 199,
  },
];

const Mobos: Mobo[] = [
  {
    id: "x870-tomahawk",
    name: "MSI MAG X870 Tomahawk WiFi",
    socket: "AM5",
    form: "ATX",
    chipset: "X870",
    price: 279,
  },
  {
    id: "b650-plus",
    name: "ASUS TUF Gaming B650‑Plus WiFi",
    socket: "AM5",
    form: "ATX",
    chipset: "B650",
    price: 169,
  },
  {
    id: "z890-hero",
    name: "ASUS ROG Maximus Z890 Hero",
    socket: "LGA1851",
    form: "ATX",
    chipset: "Z890",
    price: 599,
  },
  {
    id: "b760m-d3hp",
    name: "Gigabyte B760M D3HP WiFi6",
    socket: "LGA1700",
    form: "mATX",
    chipset: "B760",
    price: 129,
  },
];

const RAMs: RAM[] = [
  {
    id: "ddr5-48-7200",
    name: "Corsair Dominator Titanium DDR5‑7200 48GB",
    type: "DDR5",
    speed: 7200,
    sizeGB: 48,
    price: 289,
  },
  {
    id: "ddr5-64-6400",
    name: "G.Skill Trident Z5 RGB DDR5‑6400 64GB",
    type: "DDR5",
    speed: 6400,
    sizeGB: 64,
    price: 279,
  },
  {
    id: "ddr5-32-6000",
    name: "Corsair Vengeance RGB DDR5‑6000 32GB",
    type: "DDR5",
    speed: 6000,
    sizeGB: 32,
    price: 129,
  },
];

const GPUs: GPU[] = [
  {
    id: "rx-9070",
    name: "AMD Radeon RX 9070 16GB",
    vramGB: 16,
    price: 699,
  },
  {
    id: "rtx-5090",
    name: "Nvidia GeForce RTX 5090 32GB",
    vramGB: 32,
    price: 1999,
  },
  {
    id: "rtx-5080",
    name: "Nvidia GeForce RTX 5080 16GB",
    vramGB: 16,
    price: 1199,
  },
  {
    id: "rtx-4070ti",
    name: "Nvidia GeForce RTX 4070 Ti 16GB",
    vramGB: 16,
    price: 799,
  },
];

const Storages: Storage[] = [
  {
    id: "samsung-990pro-2tb",
    name: "Samsung 990 Pro 2TB",
    type: "NVMe",
    sizeTB: 2,
    price: 169,
  },
  {
    id: "crucial-t705-2tb",
    name: "Crucial T705 2TB",
    type: "NVMe",
    sizeTB: 2,
    price: 239,
  },
  {
    id: "nvme-1tb",
    name: "NVMe 1TB Gen4",
    type: "NVMe",
    sizeTB: 1,
    price: 79,
  },
];

const PSUs: PSU[] = [
  {
    id: "hx1500i-shift",
    name: "Corsair HX1500i Shift",
    watts: 1500,
    rating: "Platinum",
    price: 389,
  },
  {
    id: "rm850e",
    name: "Corsair RM850e",
    watts: 850,
    rating: "Gold",
    price: 129,
  },
  {
    id: "rm1000e",
    name: "Corsair RM1000e",
    watts: 1000,
    rating: "Gold",
    price: 159,
  },
];

const Cases: Case[] = [
  {
    id: "hyte-y70",
    name: "Hyte Y70",
    form: "ATX",
    price: 299,
  },
  {
    id: "nzxt-h6-flow",
    name: "NZXT H6 Flow RGB",
    form: "ATX",
    price: 159,
  },
  {
    id: "astra-neo",
    name: "Hummer ASTRA Neo White",
    form: "ATX",
    price: 89,
  },
];

const Coolers: Cooler[] = [
  {
    id: "msi-coreliquid-s360",
    name: "MSI MEG CoreLiquid S360",
    type: "AIO360",
    price: 259,
  },
  {
    id: "arctic-freezer-420",
    name: "Arctic Liquid Freezer III 420",
    type: "AIO420",
    price: 199,
  },
  {
    id: "noctua-nhd15-g2",
    name: "Noctua NH‑D15 G2",
    type: "Air",
    price: 129,
  },
];

// Convertir Build interno a CatalogProduct para el validador
function convertBuildToCatalogProduct(build: Build): Partial<Record<string, CatalogProduct>> {
  const result: Partial<Record<string, CatalogProduct>> = {};
  
  if (build.cpu) {
    result.cpu = {
      _id: build.cpu.id,
      slug: build.cpu.id,
      name: build.cpu.name,
      price: build.cpu.price,
      stock: true,
      categories: ["CPU"],
      specs: { cpuSocket: build.cpu.socket as any, cpuTdpW: 105 },
    };
  }
  
  if (build.mobo) {
    result.mobo = {
      _id: build.mobo.id,
      slug: build.mobo.id,
      name: build.mobo.name,
      price: build.mobo.price,
      stock: true,
      categories: ["Motherboard"],
      specs: { 
        moboSocket: build.mobo.socket, 
        ramType: build.mobo.chipset.includes("DDR5") ? "DDR5" : "DDR4" as any,
        ramMaxSpeedMT: 6400,
        m2Slots: 2,
      },
    };
  }
  
  if (build.ram) {
    result.ram = {
      _id: build.ram.id,
      slug: build.ram.id,
      name: build.ram.name,
      price: build.ram.price,
      stock: true,
      categories: ["RAM"],
      specs: { 
        ramTypeMod: build.ram.type as any,
        ramSpeedMT: build.ram.speed,
        kitCapacityGB: build.ram.sizeGB,
      },
    };
  }
  
  if (build.gpu) {
    result.gpu = {
      _id: build.gpu.id,
      slug: build.gpu.id,
      name: build.gpu.name,
      price: build.gpu.price,
      stock: true,
      categories: ["GPU"],
      specs: { gpuLengthMM: 320, gpuTdpW: 250 },
    };
  }
  
  if (build.psu) {
    result.psu = {
      _id: build.psu.id,
      slug: build.psu.id,
      name: build.psu.name,
      price: build.psu.price,
      stock: true,
      categories: ["PSU"],
      specs: { 
        psuWatts: build.psu.watts,
        psu80Plus: build.psu.rating as any,
      },
    };
  }
  
  if (build.cooler) {
    result.cooler = {
      _id: build.cooler.id,
      slug: build.cooler.id,
      name: build.cooler.name,
      price: build.cooler.price,
      stock: true,
      categories: ["Cooler"],
      specs: { 
        coolerType: build.cooler.type.includes("Air") ? "AIR" as any : "AIO" as any,
        coolerHeightMM: 165,
        aioRadiatorMM: build.cooler.type.includes("360") ? 360 : build.cooler.type.includes("420") ? 420 : undefined as any,
      },
    };
  }
  
  if (build.case) {
    result.case = {
      _id: build.case.id,
      slug: build.case.id,
      name: build.case.name,
      price: build.case.price,
      stock: true,
      categories: ["Case"],
      specs: { 
        caseGpuMaxMM: 400,
        caseCoolerMaxMM: 180,
        caseRadiatorTopMM: 360 as any,
        caseRadiatorFrontMM: 360 as any,
      },
    };
  }
  
  if (build.storage) {
    result.storage = {
      _id: build.storage.id,
      slug: build.storage.id,
      name: build.storage.name,
      price: build.storage.price,
      stock: true,
      categories: ["Storage"],
      specs: { 
        formFactor: "M2" as any,
        interface: "NVMe" as any,
      },
    };
  }
  
  return result;
}

export default function EnhancedFreeBuildConfigurator() {
  const [active, setActive] = useState<CategoryKey>("cpu");
  const [build, setBuild] = useState<Build>({});

  // Get current category data
  const getCurrentData = () => {
    switch (active) {
      case "cpu":
        return CPUs;
      case "mobo":
        return Mobos;
      case "ram":
        return RAMs;
      case "gpu":
        return GPUs;
      case "storage":
        return Storages;
      case "psu":
        return PSUs;
      case "case":
        return Cases;
      case "cooler":
        return Coolers;
      default:
        return [];
    }
  };

  // Handle item selection
  const handlePick = (item: any) => {
    console.log('Selecting item:', active, item.name);
    setBuild((prev) => {
      const newBuild = { ...prev, [active]: item };
      console.log('Updated build:', newBuild);
      return newBuild;
    });
    
    // Auto-navigate to next category
    const categories: CategoryKey[] = ["cpu", "mobo", "ram", "gpu", "storage", "psu", "case", "cooler"];
    const currentIndex = categories.indexOf(active);
    if (currentIndex < categories.length - 1) {
      setTimeout(() => {
        console.log('Navigating to next category:', categories[currentIndex + 1]);
        setActive(categories[currentIndex + 1]);
      }, 300);
    }
  };

  // Calculate total price
  const totalPrice = useMemo(() => {
    return (
      (build.cpu?.price ?? 0) +
      (build.mobo?.price ?? 0) +
      (build.ram?.price ?? 0) +
      (build.gpu?.price ?? 0) +
      (build.storage?.price ?? 0) +
      (build.psu?.price ?? 0) +
      (build.case?.price ?? 0) +
      (build.cooler?.price ?? 0)
    );
  }, [build]);

  const currentData = getCurrentData();
  const selectedItem = build[active];

  return (
    <section className="relative py-8">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        {/* Header */}
        <header className="mb-6 space-y-2">
          <h1 className="text-3xl font-bold text-white md:text-4xl">
            Configurador avanzado
          </h1>
          <p className="max-w-3xl text-white/80">
            Selecciona cada componente para crear tu build ideal. Esta guía
            incluye hardware de 2025 seleccionado por nuestros expertos.
          </p>
        </header>

        <div className="grid grid-cols-12 gap-8">
          {/* Left column: category selector */}
          <aside className="col-span-12 lg:col-span-3">
            <div className="sticky top-24 space-y-2">
              {[
                { key: "cpu", label: "Procesador", icon: Cpu },
                { key: "mobo", label: "Placa base", icon: CircuitBoard },
                { key: "ram", label: "Memoria RAM", icon: MemoryStick },
                { key: "gpu", label: "Gráfica", icon: Monitor },
                { key: "storage", label: "Almacenamiento", icon: HardDrive },
                { key: "psu", label: "Fuente", icon: BatteryCharging },
                { key: "case", label: "Caja", icon: Box },
                { key: "cooler", label: "Refrigeración", icon: Snowflake },
              ].map((step, i) => {
                const isActive = active === step.key;
                return (
                  <button
                    key={step.key}
                    onClick={() => setActive(step.key as CategoryKey)}
                    className={`flex w-full items-center gap-3 rounded-2xl border px-4 py-3 text-left transition ${
                      isActive
                        ? "border-white/25 bg-white/10"
                        : "border-white/10 bg-white/5 hover:bg-white/7"
                    }`}
                  >
                    <span
                      className={`flex h-7 w-7 items-center justify-center rounded-full text-sm ${
                        isActive ? "bg-blue-600 text-white" : "bg-white/10 text-white/80"
                      }`}
                    >
                      {i + 1}
                    </span>
                    <step.icon
                      className={`h-4 w-4 ${isActive ? "text-blue-300" : "text-white/70"}`}
                    />
                    <span
                      className={`text-sm ${isActive ? "text-white" : "text-white/80"}`}
                    >
                      {step.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </aside>

          {/* Middle column: component grid */}
          <main className="col-span-12 lg:col-span-6">
            <div className="mb-4 flex items-center gap-2 text-white/80">
              <Sparkles className="h-4 w-4 text-blue-300" />
              <p className="text-sm">
                Selecciona tu {active === "cpu" ? "procesador" : 
                active === "mobo" ? "placa base" :
                active === "ram" ? "memoria RAM" :
                active === "gpu" ? "gráfica" :
                active === "storage" ? "almacenamiento" :
                active === "psu" ? "fuente" :
                active === "case" ? "caja" :
                active === "cooler" ? "refrigeración" : "componente"}.
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              {currentData.map((item: any) => {
                const isSelected = selectedItem?.id === item.id;
                return (
                  <div
                    key={item.id}
                    className={`group rounded-3xl border p-4 backdrop-blur transition cursor-pointer ${
                      isSelected
                        ? "border-blue-400 bg-blue-400/10"
                        : "border-white/10 bg-white/5 hover:bg-white/7 hover:border-white/20"
                    }`}
                    onClick={() => handlePick(item)}
                  >
                    <div className="mb-3 flex h-40 items-center justify-center rounded-2xl bg-gradient-to-b from-slate-800/40 to-slate-900/30">
                      <span className="text-white/40">IMG</span>
                    </div>
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h4 className="font-semibold text-white">{item.name}</h4>
                        <div className="mt-1 text-xs text-white/75">
                          {active === "cpu" && `${item.cores}C/${item.threads}T · Base ${item.base}GHz · Boost ${item.boost}GHz`}
                          {active === "mobo" && `${item.form} · ${item.chipset} · Socket ${item.socket}`}
                          {active === "ram" && `${item.sizeGB}GB · ${item.speed}MHz ${item.type}`}
                          {active === "gpu" && `${item.vramGB}GB VRAM`}
                          {active === "storage" && `${item.sizeTB}TB ${item.type}`}
                          {active === "psu" && `${item.watts}W · ${item.rating}`}
                          {active === "case" && `${item.form}`}
                          {active === "cooler" && `${item.type}`}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sky-300 font-semibold">{item.price.toFixed(2)} €</div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handlePick(item);
                          }}
                          className={`mt-2 rounded-xl border px-3 py-1.5 text-sm font-medium transition ${
                            isSelected
                              ? "border-blue-400 bg-blue-400/20 text-blue-300"
                              : "border-white/10 bg-white/5 text-white/90 hover:bg-white/10 hover:border-white/20"
                          }`}
                          disabled={isSelected}
                        >
                          {isSelected ? "✓ Elegido" : "Elegir"}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </main>

          {/* Right column: summary */}
          <aside className="col-span-12 lg:col-span-3">
            <div className="sticky top-24 space-y-4">
              {/* Validador de compatibilidad */}
              {Object.keys(build).length > 0 && (
                <BuildValidatorPanel 
                  build={convertBuildToCatalogProduct(build)}
                  onReplace={(key, product) => {
                    // TODO: Implementar conversión inversa cuando se integre con datos reales
                    console.log("Replace", key, product);
                  }}
                />
              )}

              <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur">
                <h3 className="text-white text-lg font-bold">Resumen</h3>
                <div className="mt-3 space-y-2">
                  {[
                    { key: "cpu", label: "Procesador", icon: Cpu },
                    { key: "mobo", label: "Placa base", icon: CircuitBoard },
                    { key: "ram", label: "Memoria RAM", icon: MemoryStick },
                    { key: "gpu", label: "Gráfica", icon: Monitor },
                    { key: "storage", label: "Almacenamiento", icon: HardDrive },
                    { key: "psu", label: "Fuente", icon: BatteryCharging },
                    { key: "case", label: "Caja", icon: Box },
                    { key: "cooler", label: "Refrigeración", icon: Snowflake },
                  ].map((r) => (
                    <div
                      key={r.key}
                      className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/20 px-3 py-2"
                    >
                      <r.icon className="h-4 w-4 text-blue-300" />
                      <div className="flex-1">
                        <p className="text-sm text-white/85">
                          {build[r.key as CategoryKey]?.name ?? (
                            <span className="text-white/50">Sin {r.label.toLowerCase()}</span>
                          )}
                        </p>
                        {build[r.key as CategoryKey] && (
                          <p className="text-xs text-sky-300">
                            {(build[r.key as CategoryKey] as any).price.toFixed(2)} €
                          </p>
                        )}
                      </div>
                      {build[r.key as CategoryKey] && (
                        <button
                          onClick={() => setBuild((prev) => ({ ...prev, [r.key]: undefined }))}
                          className="rounded-lg border border-white/10 p-1 text-white/70 hover:bg-white/10"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
                
                <div className="mt-4 flex items-center justify-between">
                  <p className="text-white/70 text-sm">Total</p>
                  <p className="text-2xl font-extrabold text-sky-300">
                    {totalPrice.toFixed(2)} €
                  </p>
                </div>

                <button className="mt-3 w-full rounded-2xl bg-gradient-to-r from-emerald-500 to-emerald-600 px-4 py-3 text-white font-semibold hover:scale-[1.02] transition">
                  Continuar
                </button>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}