"use client";

import { createBrowserSupabaseClient } from "@/lib/supabase/client";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

type AuthFormProps = {
  mode: "login" | "signup";
};

export function AuthForm({ mode }: AuthFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    const supabase = createBrowserSupabaseClient();

    try {
      if (mode === "login") {
        const { error: loginError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (loginError) {
          setError(loginError.message);
          return;
        }

        router.push("/dashboard");
        router.refresh();
        return;
      }

      const { data, error: signupError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (signupError) {
        setError(signupError.message);
        return;
      }

      const query = new URLSearchParams({
        email,
        userId: data.user?.id ?? "",
      });
      window.location.href = `/api/stripe/checkout?${query.toString()}`;
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.form
      onSubmit={onSubmit}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mx-auto w-full max-w-md rounded-2xl border border-white/10 bg-card p-8 shadow-2xl"
    >
      <h1 className="font-display text-4xl">
        {mode === "login" ? "Connexion" : "Créer un compte"}
      </h1>
      <p className="mt-2 text-sm text-white/70">
        {mode === "login"
          ? "Accédez à votre espace Studio Virtuel."
          : "Activez votre compte pro et passez en mode studio."}
      </p>

      <div className="mt-6 space-y-4">
        <input
          type="email"
          required
          placeholder="Email professionnel"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="w-full rounded-lg border border-white/15 bg-background px-4 py-3 outline-none transition-colors focus:border-gold"
        />
        <input
          type="password"
          required
          minLength={8}
          placeholder="Mot de passe"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="w-full rounded-lg border border-white/15 bg-background px-4 py-3 outline-none transition-colors focus:border-gold"
        />
      </div>

      {error ? <p className="mt-3 text-sm text-red-400">{error}</p> : null}

      <button
        type="submit"
        disabled={loading}
        className="mt-6 w-full rounded-lg bg-gold px-5 py-3 font-semibold text-black transition-all duration-300 hover:bg-amber disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading
          ? "Chargement..."
          : mode === "login"
            ? "Se connecter"
            : "Créer le compte et s'abonner"}
      </button>

      <p className="mt-5 text-center text-sm text-white/70">
        {mode === "login" ? "Pas encore de compte ?" : "Déjà inscrit ?"}{" "}
        <Link href={mode === "login" ? "/signup" : "/login"} className="text-gold">
          {mode === "login" ? "Créer un compte" : "Se connecter"}
        </Link>
      </p>
    </motion.form>
  );
}
