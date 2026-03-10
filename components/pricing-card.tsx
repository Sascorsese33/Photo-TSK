"use client";

import { Check } from "lucide-react";

type PricingCardProps = {
  onSubscribe: () => void;
};

const FEATURES = [
  "Jusqu'à 20 photos par projet",
  "20 décors studio premium",
  "Ajout de logo personnalisé",
  "Génération IA en moins de 90 secondes",
  "Téléchargement ZIP + individuel",
  "Support prioritaire B2B",
];

export function PricingCard({ onSubscribe }: PricingCardProps) {
  return (
    <div className="mx-auto max-w-xl rounded-2xl border border-gold/40 bg-card p-8 shadow-glow">
      <p className="text-sm uppercase tracking-[0.2em] text-gold">Plan unique</p>
      <h3 className="mt-2 font-display text-4xl">150€ / mois</h3>
      <ul className="mt-6 space-y-3">
        {FEATURES.map((feature) => (
          <li key={feature} className="flex items-start gap-3 text-white/85">
            <Check className="mt-0.5 h-4 w-4 text-gold" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      <button
        type="button"
        onClick={onSubscribe}
        className="mt-8 w-full rounded-lg bg-gold px-5 py-3 font-semibold text-black transition-all duration-300 hover:bg-amber hover:shadow-glow"
      >
        S&apos;abonner
      </button>
    </div>
  );
}
