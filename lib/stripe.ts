import Stripe from "stripe";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
let stripeInstance: Stripe | null = null;

export function getStripe() {
  if (!stripeSecretKey) {
    throw new Error("STRIPE_SECRET_KEY is not configured.");
  }

  if (!stripeInstance) {
    stripeInstance = new Stripe(stripeSecretKey, {
      apiVersion: "2026-02-25.clover",
    });
  }

  return stripeInstance;
}

export const STRIPE_PRICE_ID = process.env.STRIPE_PRICE_ID ?? "";
