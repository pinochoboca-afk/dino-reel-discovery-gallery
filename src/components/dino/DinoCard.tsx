import { Link } from "@tanstack/react-router";
import { splitPeriod, type Dinosaur } from "@/data/dinosaurs";
import { DietBadge } from "./DietBadge";

type Props = { dino: Dinosaur; className?: string; shape?: "landscape" | "poster" };

export function DinoCard({ dino, className = "", shape = "landscape" }: Props) {
  const poster = shape === "poster";
  return (
    <Link
      to="/dinosaurio/$slug"
      params={{ slug: dino.slug }}
      className={`group relative block overflow-hidden rounded-lg bg-card shadow-card outline-none ring-1 ring-border transition-all duration-300 hover:z-10 hover:-translate-y-1 hover:scale-[1.04] hover:shadow-glow focus-visible:shadow-glow ${
        poster ? "aspect-[3/4]" : "aspect-video"
      } ${className}`}
    >
      <img
        src={dino.image}
        alt={dino.name}
        loading="lazy"
        width={1280}
        height={720}
        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-card-fade" />
      <DietBadge diet={dino.diet} className="absolute left-2.5 top-2.5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <div className="absolute inset-x-0 bottom-0 p-3 md:p-4">
        <h3 className={`break-words font-display leading-none tracking-wide text-foreground ${poster ? "text-xl md:text-2xl" : "text-xl md:text-2xl"}`}>
          {dino.name}
        </h3>
        <p className="mt-1 truncate text-xs text-muted-foreground">
          {splitPeriod(dino.period).era} · {dino.length}
        </p>
      </div>
    </Link>
  );
}
