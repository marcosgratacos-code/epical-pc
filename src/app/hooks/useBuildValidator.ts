"use client";

import { useMemo, useState, useEffect } from "react";
import { BuildState, ValidationResult, ValidationIssue } from "@/types/build";
import {
  estimateRequiredWatts,
  isCoolerFitsCase,
  isCpuMoboCompatible,
  isGpuFitsCase,
  isPsuSufficient,
  isRamCompatibleWithMobo,
} from "@/lib/compatRules";

export function useBuildValidatorWithSuggestions(build: BuildState) {
  const validation = useBuildValidator(build);
  const [suggestions, setSuggestions] = useState<Record<string, any[]>>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchSuggestions() {
      const issuesWithErrors = validation.issues.filter(i => !i.ok);
      if (issuesWithErrors.length === 0) {
        setSuggestions({});
        return;
      }

      setLoading(true);
      const newSuggs: Record<string, any[]> = {};
      
      for (const issue of issuesWithErrors) {
        if (build[issue.key]) {
          try {
            const slug = build[issue.key]!.slug;
            const res = await fetch(`/api/compat/recommendations?slug=${slug}`);
            const data = await res.json();
            // Buscar sugerencias en el bucket correspondiente
            const bucketKey = issue.key.toUpperCase() === 'CASE' ? 'Case' : 
                             issue.key === 'mobo' ? 'Motherboard' : 
                             issue.key.toUpperCase();
            newSuggs[issue.key] = data.buckets?.[bucketKey]?.slice(0, 3) || [];
          } catch (error) {
            console.error(`Error fetching suggestions for ${issue.key}:`, error);
          }
        }
      }
      
      setSuggestions(newSuggs);
      setLoading(false);
    }

    fetchSuggestions();
  }, [JSON.stringify(validation.issues.map(i => `${i.key}-${i.ok}`)), JSON.stringify(build)]);

  return { ...validation, suggestions, loading };
}

export function useBuildValidator(build: BuildState): ValidationResult {
  const result = useMemo<ValidationResult>(() => {
    const parts = Object.values(build).filter(Boolean) as any[];
    const requiredWatts = estimateRequiredWatts(parts);

    const issues: ValidationIssue[] = [];

    // CPU ↔ Mobo
    if (build.cpu && build.mobo) {
      const ok = isCpuMoboCompatible(build.cpu, build.mobo);
      issues.push({
        key: "cpu",
        ok,
        severity: ok ? "info" : "error",
        message: ok ? "CPU compatible con la placa" : "Socket CPU y placa no coinciden",
      });
    }

    // RAM ↔ Mobo
    if (build.ram && build.mobo) {
      const ok = isRamCompatibleWithMobo(build.ram, build.mobo);
      issues.push({
        key: "ram",
        ok,
        severity: ok ? "info" : "error",
        message: ok ? "RAM compatible con la placa" : "Tipo/velocidad de RAM no compatible",
      });
    }

    // GPU ↔ Caja
    if (build.gpu && build.case) {
      const ok = isGpuFitsCase(build.gpu, build.case);
      issues.push({
        key: "gpu",
        ok,
        severity: ok ? "info" : "error",
        message: ok ? "La GPU cabe en la caja" : "La GPU no cabe en la caja seleccionada",
      });
    }

    // Cooler ↔ Caja
    if (build.cooler && build.case) {
      const ok = isCoolerFitsCase(build.cooler, build.case);
      issues.push({
        key: "cooler",
        ok,
        severity: ok ? "info" : "error",
        message: ok ? "Refrigeración compatible con la caja" : "El cooler no encaja en la caja",
      });
    }

    // PSU suficiente
    if (build.psu) {
      const ok = isPsuSufficient(build.psu, requiredWatts);
      issues.push({
        key: "psu",
        ok,
        severity: ok ? "info" : "warn",
        message: ok
          ? `Fuente suficiente (recomendado ${requiredWatts}W)`
          : `Fuente insuficiente: recomendado ≥ ${requiredWatts}W`,
      });
    } else {
      issues.push({
        key: "psu",
        ok: false,
        severity: "warn",
        message: `Añade una fuente (recomendado ≥ ${requiredWatts}W)`,
      });
    }

    const ok = !issues.some(i => i.severity === "error");
    return { issues, requiredWatts, ok };
  }, [build.cpu?._id, build.mobo?._id, build.ram?._id, build.gpu?._id, build.psu?._id, build.cooler?._id, build.case?._id, build.storage?._id]);

  return result;
}
