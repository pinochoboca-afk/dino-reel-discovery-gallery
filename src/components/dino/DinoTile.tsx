import { Link } from "@tanstack/react-router";
import { splitPeriod, type Dinosaur } from "@/data/dinosaurs";
import { DietBadge } from "./DietBadge";

export function DinoTile({ dino }: { dino: Dinosaur }) {
  return (
    <Link
      to="/dinosaurio/$slug"
      params={{ slug: dino.slug }}
      className="group flex flex-col overflow-hidden rounded-lg bg-card ring-1 ring-border transition-all duration-300 hover:-translate-y-1 hover:shadow-glow focus-visible:shadow-glow"
    >
      <div className="relative aspect-video overflow-hidden">
        <img
          src={dino.image}
          alt={dino.name}
          loading="lazy"
          width={1280}
          height={720}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <DietBadge diet={dino.diet} className="absolute left-2.5 top-2.5" />
      </div>
      <div className="flex flex-1 flex-col p-4">
        <h3 className="font-display text-2xl leading-none tracking-wide text-card-foreground">{dino.name}</h3>
        <p className="mt-1 text-xs font-medium uppercase tracking-wider text-primary">
          {splitPeriod(dino.period).era} · {dino.place}
        </p>
        <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{dino.summary}</p>
      </div>
    </Link>
  );
}
