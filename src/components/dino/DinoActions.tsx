import { Link } from "@tanstack/react-router";
import { Check, Download, Plus } from "lucide-react";
import type { Dinosaur } from "@/data/dinosaurs";
import { useAuth } from "@/hooks/use-auth";
import { useFavorites, useToggleFavorite } from "@/lib/social";

const pill = "inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-all";

export function DinoActions({ dino }: { dino: Dinosaur }) {
  const { user } = useAuth();
  const { data: favs = [] } = useFavorites();
  const toggle = useToggleFavorite();
  const saved = favs.includes(dino.slug);
  const back = `/dinosaurio/${dino.slug}`;

  if (!user) {
    return (
      <div className="flex flex-wrap items-center gap-3">
        <Link to="/auth" search={{ redirect: back }} className={`${pill} bg-foreground text-background hover:opacity-90`}>
          <Plus className="h-4 w-4" /> Mi lista
        </Link>
        <Link to="/auth" search={{ redirect: back }} className={`${pill} bg-secondary/70 text-foreground ring-1 ring-border backdrop-blur hover:bg-secondary`}>
          <Download className="h-4 w-4" /> Descargar foto
        </Link>
        <span className="text-xs text-muted-foreground">Creá tu cuenta gratis para guardar y descargar</span>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      <button
        onClick={() => toggle.mutate({ slug: dino.slug, saved })}
        disabled={toggle.isPending}
        aria-pressed={saved}
        className={`${pill} ${saved ? "bg-primary text-primary-foreground" : "bg-foreground text-background"} hover:opacity-90 disabled:opacity-70`}
      >
        {saved ? <Check className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
        {saved ? "En Mi lista" : "Mi lista"}
      </button>
      <a
        href={dino.image}
        download={`dinoflix-${dino.slug}.jpg`}
        className={`${pill} bg-secondary/70 text-foreground ring-1 ring-border backdrop-blur hover:bg-secondary`}
      >
        <Download className="h-4 w-4" /> Descargar foto
      </a>
    </div>
  );
}
