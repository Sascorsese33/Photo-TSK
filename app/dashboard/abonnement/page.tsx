import { FadeInSection } from "@/components/fade-in-section";

export default function SubscriptionPage() {
  return (
    <div className="space-y-6">
      <FadeInSection>
        <h1 className="font-display text-4xl">Abonnement</h1>
        <p className="mt-2 text-white/70">Gérez votre plan Studio Virtuel en quelques clics.</p>
      </FadeInSection>

      <FadeInSection className="rounded-2xl border border-white/10 bg-card p-6" delay={0.1}>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-xl border border-gold/30 bg-gold/10 p-4">
            <p className="text-sm text-gold">Statut</p>
            <p className="mt-2 text-2xl font-semibold">Actif</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-background/50 p-4">
            <p className="text-sm text-white/70">Renouvellement</p>
            <p className="mt-2 text-2xl font-semibold">15 avril 2026</p>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href="/api/stripe/portal"
            className="rounded-lg bg-gold px-5 py-2.5 font-semibold text-black transition-all duration-300 hover:bg-amber"
          >
            Gérer mon abonnement
          </a>
          <a
            href="/api/stripe/portal?flow=cancel"
            className="rounded-lg border border-white/20 px-4 py-2.5 text-white/80 transition-colors hover:border-red-400 hover:text-red-400"
          >
            Annuler
          </a>
        </div>
      </FadeInSection>
    </div>
  );
}
