"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { useMemo, useState } from "react";

type UploadZoneProps = {
  maxFiles?: number;
  onFilesChange?: (files: File[]) => void;
};

export function UploadZone({ maxFiles = 20, onFilesChange }: UploadZoneProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  const previews = useMemo(
    () => files.map((file) => ({ file, src: URL.createObjectURL(file) })),
    [files],
  );

  const applyFiles = (incomingFiles: File[]) => {
    const allowedFiles = incomingFiles.filter((file) =>
      ["image/jpeg", "image/png", "image/webp"].includes(file.type),
    );
    const nextFiles = [...files, ...allowedFiles].slice(0, maxFiles);
    setFiles(nextFiles);
    onFilesChange?.(nextFiles);
  };

  return (
    <div className="space-y-4">
      <label
        className={cn(
          "flex min-h-40 cursor-pointer items-center justify-center rounded-xl border-2 border-dashed p-6 text-center transition-all duration-300",
          isDragging
            ? "border-gold bg-gold/10"
            : "border-white/20 bg-card/40 hover:border-gold/60",
        )}
        onDragOver={(event) => {
          event.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(event) => {
          event.preventDefault();
          setIsDragging(false);
          applyFiles(Array.from(event.dataTransfer.files));
        }}
      >
        <input
          type="file"
          className="hidden"
          multiple
          accept=".jpg,.jpeg,.png,.webp"
          onChange={(event) => applyFiles(Array.from(event.target.files ?? []))}
        />
        <p className="text-sm text-white/80">
          Glissez-déposez vos photos ici (max {maxFiles}) ou cliquez pour uploader.
        </p>
      </label>

      <div className="h-2 overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full bg-gold transition-all duration-500"
          style={{ width: `${(files.length / maxFiles) * 100}%` }}
        />
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
        {previews.map((item) => (
          <div
            key={`${item.file.name}-${item.file.lastModified}`}
            className="relative aspect-[4/3] overflow-hidden rounded-lg border border-white/10"
          >
            <Image src={item.src} alt={item.file.name} fill className="object-cover" />
          </div>
        ))}
      </div>
    </div>
  );
}
