import { FadeInSection } from "@/components/fade-in-section";
import Image from "next/image";
import Link from "next/link";

const SAMPLE_PROJECTS = Array.from({ length: 6 }).map((_, index) => ({
  id: `project-${index + 1}`,
  title: `Projet #${index + 1}`,
  image: index % 2 === 0 ? "/demo/car-after.svg" : "/demo/car-before.svg",
}));

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <FadeInSection className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="font-display text-4xl">Mes projets</h1>
          <p className="mt-2 text-white/70">Retrouvez toutes vos générations récentes.</p>
        </div>
        <Link
          href="/dashboard/nouveau"
          className="rounded-lg bg-gold px-5 py-3 font-semibold text-black transition-all duration-300 hover:bg-amber"
        >
          Nouveau projet
        </Link>
      </FadeInSection>

      <FadeInSection className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3" delay={0.1}>
        {SAMPLE_PROJECTS.map((project) => (
          <article
            key={project.id}
            className="overflow-hidden rounded-xl border border-white/10 bg-card transition-all duration-300 hover:-translate-y-1 hover:border-gold/60"
          >
            <div className="relative h-44 w-full">
              <Image src={project.image} alt={project.title} fill className="object-cover" />
            </div>
            <div className="p-4">
              <h3 className="font-medium">{project.title}</h3>
              <p className="text-sm text-white/60">12 photos générées</p>
            </div>
          </article>
        ))}
      </FadeInSection>
    </div>
  );
}
