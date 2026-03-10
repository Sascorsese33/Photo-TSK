"use client";

import { cn } from "@/lib/utils";
import { CheckCircle2 } from "lucide-react";

type StudioCardProps = {
  name: string;
  previewClassName: string;
  selected: boolean;
  onSelect: () => void;
};

export function StudioCard({
  name,
  previewClassName,
  selected,
  onSelect,
}: StudioCardProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        "group rounded-xl border bg-card p-3 text-left transition-all duration-300",
        selected
          ? "border-gold shadow-glow"
          : "border-white/10 hover:border-gold/60 hover:-translate-y-1",
      )}
    >
      <div className={cn("h-28 rounded-lg", previewClassName)} />
      <div className="mt-3 flex items-center justify-between">
        <p className="text-sm font-medium">{name}</p>
        {selected ? (
          <CheckCircle2 className="h-4 w-4 text-gold" />
        ) : (
          <span className="h-4 w-4 rounded-full border border-white/20" />
        )}
      </div>
    </button>
  );
}
