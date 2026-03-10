import Image from "next/image";

type PhotoGridProps = {
  photos: { id: string; url: string; name: string }[];
};

export function PhotoGrid({ photos }: PhotoGridProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {photos.map((photo) => (
        <article key={photo.id} className="rounded-xl border border-white/10 bg-card p-3">
          <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
            <Image src={photo.url} alt={photo.name} fill className="object-cover" />
          </div>
          <div className="mt-3 flex items-center justify-between">
            <p className="text-sm text-white/80">{photo.name}</p>
            <a
              href={photo.url}
              download
              className="rounded-md border border-gold/40 px-3 py-1 text-xs text-gold transition-colors duration-300 hover:bg-gold hover:text-black"
            >
              Télécharger
            </a>
          </div>
        </article>
      ))}
    </div>
  );
}
