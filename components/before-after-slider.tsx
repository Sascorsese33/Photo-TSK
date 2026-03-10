"use client";

import Image from "next/image";
import { useRef, useState } from "react";

type BeforeAfterSliderProps = {
  beforeSrc: string;
  afterSrc: string;
};

export function BeforeAfterSlider({ beforeSrc, afterSrc }: BeforeAfterSliderProps) {
  const [position, setPosition] = useState(50);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const updatePosition = (clientX: number) => {
    const element = wrapperRef.current;
    if (!element) {
      return;
    }

    const rect = element.getBoundingClientRect();
    const nextPosition = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.max(0, Math.min(100, nextPosition)));
  };

  return (
    <div
      ref={wrapperRef}
      className="relative h-[320px] w-full overflow-hidden rounded-2xl gold-border bg-card md:h-[460px]"
      onMouseMove={(event) => event.buttons === 1 && updatePosition(event.clientX)}
      onTouchMove={(event) => updatePosition(event.touches[0].clientX)}
      onClick={(event) => updatePosition(event.clientX)}
    >
      <Image src={beforeSrc} alt="Photo avant transformation" fill className="object-cover" />
      <div className="absolute inset-y-0 left-0 overflow-hidden" style={{ width: `${position}%` }}>
        <Image src={afterSrc} alt="Photo après transformation studio" fill className="object-cover" />
      </div>

      <div
        className="absolute inset-y-0 w-[2px] bg-gold"
        style={{ left: `calc(${position}% - 1px)` }}
      />
      <button
        type="button"
        aria-label="Déplacer le slider avant après"
        className="absolute top-1/2 h-10 w-10 -translate-y-1/2 rounded-full border border-gold bg-background text-gold shadow-glow"
        style={{ left: `calc(${position}% - 20px)` }}
        onMouseDown={(event) => updatePosition(event.clientX)}
        onTouchStart={(event) => updatePosition(event.touches[0].clientX)}
      >
        ↔
      </button>

      <div className="absolute left-4 top-4 rounded-full bg-black/60 px-3 py-1 text-xs font-semibold">
        Après
      </div>
      <div className="absolute right-4 top-4 rounded-full bg-black/60 px-3 py-1 text-xs font-semibold">
        Avant
      </div>
    </div>
  );
}
