/**
 * Utilidades para formateo de moneda
 */

/**
 * Formatea un precio en centavos a euros
 */
export function formatAmountForDisplay(amount: number): string {
  return (amount / 100).toFixed(2);
}

/**
 * Convierte euros a centavos
 */
export function eurosToCents(euros: number): number {
  return Math.round(euros * 100);
}

/**
 * Convierte centavos a euros
 */
export function centsToEuros(cents: number): number {
  return cents / 100;
}

/**
 * Formatea precio con símbolo de euro
 */
export function formatPrice(cents: number): string {
  return `${formatAmountForDisplay(cents)}€`;
}

/**
 * Formatea precio con separador de miles
 */
export function formatPriceWithSeparator(cents: number): string {
  const euros = cents / 100;
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
  }).format(euros);
}

