"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

const POSITIONS = [
  { value: "bottom-left", label: "Bas gauche" },
  { value: "bottom-right", label: "Bas droite" },
  { value: "top-left", label: "Haut gauche" },
  { value: "top-right", label: "Haut droite" },
];

type LogoUploaderProps = {
  onChange?: (file: File | null, position: string) => void;
};

export function LogoUploader({ onChange }: LogoUploaderProps) {
  const [file, setFile] = useState<File | null>(null);
  const [position, setPosition] = useState("bottom-right");

  const previewUrl = useMemo(() => (file ? URL.createObjectURL(file) : null), [file]);

  const handlePosition = (nextPosition: string) => {
    setPosition(nextPosition);
    onChange?.(file, nextPosition);
  };

  return (
    <div className="space-y-4">
      <label className="block cursor-pointer rounded-xl border border-dashed border-white/20 bg-card/40 p-4 text-sm text-white/80 hover:border-gold/50">
        <input
          type="file"
          accept=".png,.webp"
          className="hidden"
          onChange={(event) => {
            const nextFile = event.target.files?.[0] ?? null;
            setFile(nextFile);
            onChange?.(nextFile, position);
          }}
        />
        Charger votre logo (PNG transparent recommandé)
      </label>

      <div className="relative h-52 overflow-hidden rounded-xl border border-white/10 bg-black">
        <Image
          src="/demo/car-after.svg"
          alt="Aperçu photo avec logo"
          fill
          className="object-cover opacity-80"
        />
        {previewUrl ? (
          <Image
            src={previewUrl}
            alt="Logo"
            width={80}
            height={80}
            className={`absolute h-auto w-20 ${
              position === "bottom-left"
                ? "bottom-3 left-3"
                : position === "bottom-right"
                  ? "bottom-3 right-3"
                  : position === "top-left"
                    ? "left-3 top-3"
                    : "right-3 top-3"
            }`}
          />
        ) : null}
      </div>

      <div className="grid gap-2 sm:grid-cols-2">
        {POSITIONS.map((item) => (
          <button
            type="button"
            key={item.value}
            onClick={() => handlePosition(item.value)}
            className={`rounded-lg border px-3 py-2 text-sm transition-all duration-300 ${
              position === item.value
                ? "border-gold bg-gold/10 text-gold"
                : "border-white/15 text-white/80 hover:border-gold/60"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
}
