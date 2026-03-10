"use client";

import { BeforeAfterSlider } from "@/components/before-after-slider";
import { FadeInSection } from "@/components/fade-in-section";
import { PricingCard } from "@/components/pricing-card";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const BENEFITS = [
  "Plus de clics sur les annonces",
  "Photos beaucoup plus professionnelles",
  "Véhicules vendus plus rapidement",
  "Meilleur prix de vente potentiel",
  "Image de marque améliorée",
];

const STEPS = [
  "Téléchargez jusqu'à 20 photos",
  "Choisissez parmi 20 décors studio",
  "Ajoutez votre logo",
  "Prévisualisez en un clic",
  "Téléchargez les résultats HD",
];

export default function Home() {
  return (
    <main className="relative overflow-x-hidden bg-background pb-20 text-white">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(217,119,6,0.25),transparent_50%)]" />

      <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-6">
        <Link href="/" className="font-display text-3xl tracking-wide">
          Studio <span className="text-gold">Virtuel</span>
        </Link>
        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="rounded-lg border border-white/20 px-4 py-2 text-sm transition-colors duration-300 hover:border-gold/70"
          >
            Connexion
          </Link>
          <Link
            href="/signup"
            className="rounded-lg bg-gold px-4 py-2 text-sm font-semibold text-black transition-all duration-300 hover:bg-amber"
          >
            Essayer maintenant
          </Link>
        </div>
      </header>

      <FadeInSection className="mx-auto mt-12 w-full max-w-6xl px-6 text-center">
        <p className="text-sm uppercase tracking-[0.22em] text-gold">SaaS photo automobile</p>
        <h1 className="mx-auto mt-4 max-w-4xl font-display text-5xl leading-tight md:text-7xl">
          Transformez vos photos en studio professionnel
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-white/75">
          Studio Virtuel permet aux vendeurs, marchands et concessionnaires de publier des
          annonces premium sur Leboncoin, La Centrale et Facebook Marketplace.
        </p>
        <div className="mt-8 flex justify-center">
          <Link
            href="/signup"
            className="inline-flex items-center gap-2 rounded-lg bg-gold px-6 py-3 font-semibold text-black transition-all duration-300 hover:bg-amber"
          >
            Essayer maintenant <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </FadeInSection>

      <FadeInSection className="mx-auto mt-20 w-full max-w-6xl px-6" delay={0.1}>
        <h2 className="font-display text-3xl md:text-5xl">Avant / Après</h2>
        <p className="mt-3 text-white/70">
          Même véhicule, même angle, seule la scène est transformée par l&apos;IA.
        </p>
        <div className="mt-8">
          <BeforeAfterSlider beforeSrc="/demo/car-before.svg" afterSrc="/demo/car-after.svg" />
        </div>
      </FadeInSection>

      <FadeInSection className="mx-auto mt-20 w-full max-w-6xl px-6" delay={0.15}>
        <h2 className="font-display text-3xl md:text-5xl">Bénéfices business</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-5">
          {BENEFITS.map((benefit) => (
            <article
              key={benefit}
              className="rounded-xl border border-white/10 bg-card px-4 py-5 transition-all duration-300 hover:-translate-y-1 hover:border-gold/60"
            >
              <p className="text-sm text-white/90">{benefit}</p>
            </article>
          ))}
        </div>
      </FadeInSection>

      <FadeInSection className="mx-auto mt-20 w-full max-w-6xl px-6" delay={0.2}>
        <h2 className="font-display text-3xl md:text-5xl">Fonctionnement en 5 étapes</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-5">
          {STEPS.map((step, index) => (
            <article key={step} className="rounded-xl border border-gold/25 bg-card p-4">
              <p className="text-xs uppercase tracking-widest text-gold">Étape {index + 1}</p>
              <p className="mt-2 text-white/90">{step}</p>
            </article>
          ))}
        </div>
      </FadeInSection>

      <FadeInSection className="mx-auto mt-20 w-full max-w-6xl px-6" delay={0.25}>
        <div className="rounded-2xl border border-white/10 bg-card p-8">
          <h2 className="font-display text-3xl md:text-5xl">Nettoyage virtuel inclus</h2>
          <p className="mt-4 max-w-3xl text-white/75">
            Activez l&apos;option de retouche légère pour enlever poussière, atténuer rayures et
            corriger les petites imperfections visuelles avant publication.
          </p>
        </div>
      </FadeInSection>

      <FadeInSection className="mx-auto mt-20 w-full max-w-6xl px-6" delay={0.3}>
        <h2 className="mb-6 text-center font-display text-3xl md:text-5xl">Tarif unique</h2>
        <PricingCard onSubscribe={() => (window.location.href = "/api/stripe/checkout")} />
      </FadeInSection>

      <footer className="mx-auto mt-20 flex w-full max-w-6xl flex-col items-center justify-between gap-4 border-t border-white/10 px-6 pt-8 text-sm text-white/60 md:flex-row">
        <p>© {new Date().getFullYear()} Studio Virtuel</p>
        <div className="flex gap-5">
          <Link href="#">Mentions légales</Link>
          <Link href="#">Politique de confidentialité</Link>
          <a href="mailto:contact@studiovirtuel.fr">contact@studiovirtuel.fr</a>
        </div>
      </footer>
    </main>
  );
}
