// Sistema de cupones y descuentos

export interface Coupon {
  code: string;
  type: 'percentage' | 'fixed';
  value: number;
  description: string;
  minAmount?: number;
  maxDiscount?: number;
  validFrom: string;
  validUntil: string;
  usageLimit?: number;
  usedCount: number;
  active: boolean;
  applicableProducts?: string[]; // Si está vacío, aplica a todos
}

// Cupones disponibles
export const AVAILABLE_COUPONS: Coupon[] = [
  {
    code: 'EQW',
    type: 'percentage',
    value: 5,
    description: '-5% Epical Weeks',
    validFrom: '2025-01-01',
    validUntil: '2025-12-31',
    active: true,
    usedCount: 0
  },
  {
    code: 'BIENVENIDO10',
    type: 'percentage',
    value: 10,
    description: '10% de descuento en tu primera compra',
    minAmount: 500,
    validFrom: '2025-01-01',
    validUntil: '2025-12-31',
    active: true,
    usedCount: 0
  },
  {
    code: 'GAMING20',
    type: 'percentage',
    value: 20,
    description: '20% de descuento en PCs Gaming',
    minAmount: 1000,
    maxDiscount: 200,
    validFrom: '2025-01-01',
    validUntil: '2025-12-31',
    active: true,
    usedCount: 0
  },
  {
    code: 'NAVIDAD50',
    type: 'fixed',
    value: 50,
    description: '50€ de descuento',
    minAmount: 800,
    validFrom: '2025-12-01',
    validUntil: '2025-12-31',
    active: true,
    usedCount: 0
  },
  {
    code: 'ULTRA100',
    type: 'fixed',
    value: 100,
    description: '100€ de descuento en EPICAL ULTRA',
    minAmount: 1500,
    validFrom: '2025-01-01',
    validUntil: '2025-12-31',
    applicableProducts: ['epical-ultra'],
    active: true,
    usedCount: 0
  }
];

export interface CouponValidationResult {
  valid: boolean;
  message: string;
  discount?: number;
  coupon?: Coupon;
}

// Validar cupón
export function validateCoupon(
  code: string,
  cartTotal: number,
  productIds: string[] = []
): CouponValidationResult {
  const coupon = AVAILABLE_COUPONS.find(
    c => c.code.toUpperCase() === code.toUpperCase() && c.active
  );

  if (!coupon) {
    return {
      valid: false,
      message: 'Cupón no válido o expirado'
    };
  }

  // Verificar fechas
  const now = new Date();
  const validFrom = new Date(coupon.validFrom);
  const validUntil = new Date(coupon.validUntil);

  if (now < validFrom) {
    return {
      valid: false,
      message: 'Este cupón aún no está disponible'
    };
  }

  if (now > validUntil) {
    return {
      valid: false,
      message: 'Este cupón ha expirado'
    };
  }

  // Verificar monto mínimo
  if (coupon.minAmount && cartTotal < coupon.minAmount) {
    return {
      valid: false,
      message: `Este cupón requiere un mínimo de ${coupon.minAmount}€`
    };
  }

  // Verificar productos aplicables
  if (coupon.applicableProducts && coupon.applicableProducts.length > 0) {
    const hasApplicableProduct = productIds.some(id =>
      coupon.applicableProducts?.includes(id)
    );

    if (!hasApplicableProduct) {
      return {
        valid: false,
        message: 'Este cupón no es aplicable a los productos del carrito'
      };
    }
  }

  // Verificar límite de uso
  if (coupon.usageLimit && coupon.usedCount >= coupon.usageLimit) {
    return {
      valid: false,
      message: 'Este cupón ha alcanzado su límite de uso'
    };
  }

  // Calcular descuento
  const discount = calculateDiscount(coupon, cartTotal);

  return {
    valid: true,
    message: `Cupón aplicado: ${coupon.description}`,
    discount,
    coupon
  };
}

// Calcular descuento
export function calculateDiscount(coupon: Coupon, cartTotal: number): number {
  let discount = 0;

  if (coupon.type === 'percentage') {
    discount = (cartTotal * coupon.value) / 100;
  } else {
    discount = coupon.value;
  }

  // Aplicar descuento máximo si existe
  if (coupon.maxDiscount && discount > coupon.maxDiscount) {
    discount = coupon.maxDiscount;
  }

  // El descuento no puede ser mayor que el total
  if (discount > cartTotal) {
    discount = cartTotal;
  }

  return Math.round(discount * 100) / 100; // Redondear a 2 decimales
}

// Guardar cupón usado en localStorage
export function saveCouponUsage(code: string) {
  if (typeof window === 'undefined') return;

  const usedCoupons = getUsedCoupons();
  if (!usedCoupons.includes(code.toUpperCase())) {
    usedCoupons.push(code.toUpperCase());
    localStorage.setItem('epical-used-coupons', JSON.stringify(usedCoupons));
  }
}

// Obtener cupones usados
export function getUsedCoupons(): string[] {
  if (typeof window === 'undefined') return [];

  const saved = localStorage.getItem('epical-used-coupons');
  return saved ? JSON.parse(saved) : [];
}

// Verificar si un cupón ya fue usado
export function isCouponUsed(code: string): boolean {
  const usedCoupons = getUsedCoupons();
  return usedCoupons.includes(code.toUpperCase());
}

// Obtener cupones recomendados según el carrito
export function getRecommendedCoupons(
  cartTotal: number,
  productIds: string[] = []
): Coupon[] {
  return AVAILABLE_COUPONS.filter(coupon => {
    if (!coupon.active) return false;

    const now = new Date();
    const validFrom = new Date(coupon.validFrom);
    const validUntil = new Date(coupon.validUntil);

    if (now < validFrom || now > validUntil) return false;

    // Si tiene monto mínimo y no se cumple, no recomendar
    if (coupon.minAmount && cartTotal < coupon.minAmount) return false;

    // Si tiene productos aplicables, verificar
    if (coupon.applicableProducts && coupon.applicableProducts.length > 0) {
      const hasApplicableProduct = productIds.some(id =>
        coupon.applicableProducts?.includes(id)
      );
      if (!hasApplicableProduct) return false;
    }

    // No recomendar si ya fue usado
    if (isCouponUsed(coupon.code)) return false;

    return true;
  }).slice(0, 3); // Máximo 3 recomendaciones
}

















