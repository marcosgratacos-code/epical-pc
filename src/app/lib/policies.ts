/**
 * Condiciones comerciales: única fuente de verdad.
 * Cualquier texto o cálculo que mencione envío, garantía, Windows,
 * devoluciones o financiación debe leer de aquí.
 * `null` significa "no ofrecido / sin confirmar": no debe prometerse en la web.
 */
export const POLICIES = {
  warrantyYears: 3,
  /** Envío gratis a partir de este importe (€, antes de IVA y tras descuentos). */
  freeShippingFrom: 1500,
  shippingCost: 12.9,
  shippingTime: "24/48 h según stock",
  windows: {
    includedByDefault: false,
    note: "Windows no se incluye por defecto: podemos entregarlo instalado y activado.",
  },
  /** Días de devolución. null = no confirmado, no se muestra. */
  returnDays: null as number | null,
  /** Financiación. null = no ofrecida, no se muestra. */
  financing: null as string | null,
} as const;

export const eurFmt = (n: number) =>
  new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(n);
