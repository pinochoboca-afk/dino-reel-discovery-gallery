import { Link } from "@tanstack/react-router";
import type { Dinosaur } from "@/data/dinosaurs";

export function DinoCard({ dino, className = "" }: { dino: Dinosaur; className?: string }) {
  return (
    <Link
      to="/dinosaurio/$slug"
      params={{ slug: dino.slug }}
      className={`group relative block aspect-video overflow-hidden rounded-md bg-card shadow-card outline-none transition-all duration-300 hover:z-10 hover:scale-[1.06] hover:shadow-glow focus-visible:shadow-glow ${className}`}
    >
      <img
        src={dino.image}
        alt={dino.name}
        loading="lazy"
        width={1280}
        height={720}
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-card-fade" />
      <div className="absolute inset-x-0 bottom-0 p-3">
        <h3 className="font-display text-xl leading-none tracking-wide text-foreground md:text-2xl">{dino.name}</h3>
        <p className="mt-1 max-h-0 overflow-hidden text-xs text-muted-foreground opacity-0 transition-all duration-300 group-hover:max-h-10 group-hover:opacity-100">
          {dino.diet} · {dino.length} · {dino.place}
        </p>
      </div>
    </Link>
  );
}
