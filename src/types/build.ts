import { CatalogProduct, NormalizedSpecs } from "@/types/catalog";

export type BuildKeys = "cpu" | "mobo" | "ram" | "gpu" | "psu" | "cooler" | "case" | "storage";

export type BuildState = Partial<Record<BuildKeys, CatalogProduct>>;

export type ValidationIssue = {
  key: BuildKeys;
  ok: boolean;
  message: string;
  severity: "info" | "warn" | "error";
};

export type ValidationResult = {
  issues: ValidationIssue[];
  requiredWatts: number;
  ok: boolean; // true si no hay errors
};
