import Stripe from "stripe";

// Verificar si Stripe está configurado
const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;
const isStripeConfigured = !!STRIPE_SECRET_KEY;

// Solo crear instancia de Stripe si está configurado
export const stripe = isStripeConfigured
  ? new Stripe(STRIPE_SECRET_KEY as string, {
      apiVersion: "2025-09-30.clover",
      typescript: true,
    })
  : null;

export const formatAmountForStripe = (amount: number): number => {
  // Stripe trabaja con centavos, así que multiplicamos por 100
  return Math.round(amount * 100);
};

// Helper para verificar si Stripe está configurado
export const checkStripeConfig = () => {
  if (!isStripeConfigured) {
    throw new Error(
      "Stripe no está configurado. Por favor, configura STRIPE_SECRET_KEY en .env.local"
    );
  }
};

