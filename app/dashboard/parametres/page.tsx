export default function SettingsPage() {
  return (
    <div className="space-y-4">
      <h1 className="font-display text-4xl">Paramètres</h1>
      <p className="text-white/70">
        Cette section regroupera vos préférences de marque, logo par défaut et informations de
        compte.
      </p>
      <div className="rounded-xl border border-white/10 bg-card p-5 text-sm text-white/70">
        Paramètres avancés à brancher à Supabase (profil, nom société, signature visuelle).
      </div>
    </div>
  );
}
