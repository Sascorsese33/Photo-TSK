"use client";

import { LogoUploader } from "@/components/logo-uploader";
import { PhotoGrid } from "@/components/photo-grid";
import { StepIndicator } from "@/components/step-indicator";
import { StudioCard } from "@/components/studio-card";
import { UploadZone } from "@/components/upload-zone";
import { STUDIO_PREVIEW_CLASSES, STUDIO_THEMES } from "@/lib/studios";
import { motion } from "framer-motion";
import Image from "next/image";
import { useMemo, useState } from "react";

const STEPS = ["Upload", "Décor", "Logo", "Prévisualisation", "Résultats"];

export default function NewProjectPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedStudio, setSelectedStudio] = useState<string>(STUDIO_THEMES[0]);
  const [withCleanup, setWithCleanup] = useState(true);
  const [progress, setProgress] = useState(0);

  const generatedPhotos = useMemo(
    () =>
      Array.from({ length: 8 }).map((_, index) => ({
        id: `photo-${index}`,
        name: `Visuel ${index + 1}`,
        url: "/demo/car-after.svg",
      })),
    [],
  );

  const runGeneration = async () => {
    setProgress(10);
    const sequence = [25, 45, 65, 85, 100];
    for (const value of sequence) {
      await new Promise((resolve) => setTimeout(resolve, 450));
      setProgress(value);
    }
    setCurrentStep(4);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-4xl">Nouveau projet</h1>
        <p className="mt-2 text-white/70">
          Créez une série premium en 5 étapes, prête pour vos annonces.
        </p>
      </div>

      <StepIndicator steps={STEPS} currentStep={currentStep} />

      <motion.section
        key={currentStep}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="rounded-2xl border border-white/10 bg-card p-6"
      >
        {currentStep === 0 ? (
          <div className="space-y-5">
            <h2 className="text-xl font-semibold">1. Upload des photos</h2>
            <UploadZone maxFiles={20} />
            <label className="flex items-center gap-3 text-sm">
              <input
                type="checkbox"
                checked={withCleanup}
                onChange={(event) => setWithCleanup(event.target.checked)}
              />
              Activer le nettoyage virtuel (poussière, micro-rayures, imperfections)
            </label>
            <button
              type="button"
              className="rounded-lg bg-gold px-5 py-2.5 font-semibold text-black"
              onClick={() => setCurrentStep(1)}
            >
              Continuer
            </button>
          </div>
        ) : null}

        {currentStep === 1 ? (
          <div className="space-y-5">
            <h2 className="text-xl font-semibold">2. Choix du décor studio</h2>
            <div className="grid gap-3 md:grid-cols-4">
              {STUDIO_THEMES.map((theme, index) => (
                <StudioCard
                  key={theme}
                  name={theme}
                  previewClassName={STUDIO_PREVIEW_CLASSES[index]}
                  selected={selectedStudio === theme}
                  onSelect={() => setSelectedStudio(theme)}
                />
              ))}
            </div>
            <div className="flex gap-3">
              <button
                type="button"
                className="rounded-lg border border-white/20 px-4 py-2"
                onClick={() => setCurrentStep(0)}
              >
                Retour
              </button>
              <button
                type="button"
                className="rounded-lg bg-gold px-5 py-2.5 font-semibold text-black"
                onClick={() => setCurrentStep(2)}
              >
                Continuer
              </button>
            </div>
          </div>
        ) : null}

        {currentStep === 2 ? (
          <div className="space-y-5">
            <h2 className="text-xl font-semibold">3. Ajout du logo</h2>
            <LogoUploader />
            <div className="flex gap-3">
              <button
                type="button"
                className="rounded-lg border border-white/20 px-4 py-2"
                onClick={() => setCurrentStep(1)}
              >
                Retour
              </button>
              <button
                type="button"
                className="rounded-lg bg-gold px-5 py-2.5 font-semibold text-black"
                onClick={() => setCurrentStep(3)}
              >
                Prévisualiser
              </button>
            </div>
          </div>
        ) : null}

        {currentStep === 3 ? (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">4. Prévisualisation</h2>
            <div className="overflow-hidden rounded-xl border border-white/10">
              <div className="relative h-72 w-full">
                <Image src="/demo/car-after.svg" alt="Prévisualisation" fill className="object-cover" />
              </div>
            </div>
            <p className="text-sm text-white/70">
              Décor sélectionné : <span className="text-gold">{selectedStudio}</span> | Nettoyage
              virtuel : {withCleanup ? "activé" : "désactivé"}
            </p>
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                className="rounded-lg border border-white/20 px-4 py-2"
                onClick={() => setCurrentStep(2)}
              >
                Retour
              </button>
              <button
                type="button"
                className="rounded-lg border border-gold/50 px-4 py-2 text-gold"
                onClick={() => setCurrentStep(3)}
              >
                Relancer test
              </button>
              <button
                type="button"
                className="rounded-lg bg-gold px-5 py-2.5 font-semibold text-black"
                onClick={runGeneration}
              >
                Valider et générer toutes les photos
              </button>
            </div>
          </div>
        ) : null}

        {currentStep === 4 ? (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">5. Génération & téléchargement</h2>
            <p className="text-sm text-white/70">Temps estimé : moins de 90 secondes.</p>
            <div className="h-3 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-gold transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
            <PhotoGrid photos={generatedPhotos} />
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                className="rounded-lg bg-gold px-5 py-2.5 font-semibold text-black"
              >
                Télécharger toutes les photos (ZIP)
              </button>
              <button
                type="button"
                className="rounded-lg border border-white/20 px-4 py-2"
                onClick={() => {
                  setCurrentStep(0);
                  setProgress(0);
                }}
              >
                Créer un nouveau projet
              </button>
            </div>
          </div>
        ) : null}
      </motion.section>
    </div>
  );
}
