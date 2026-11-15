import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Info, Play, Ruler, Scale } from "lucide-react";
import { splitPeriod, type Dinosaur } from "@/data/dinosaurs";
import { DietBadge } from "./DietBadge";

export function HomeHero({ featured }: { featured: Dinosaur[] }) {
  const [index, setIndex] = useState(0);
  const dino = (featured[index] ?? featured[0])!;

  useEffect(() => {
    const t = setTimeout(() => setIndex((i) => (i + 1) % featured.length), 7000);
    return () => clearTimeout(t);
  }, [index, featured.length]);

  const { era, ago } = splitPeriod(dino.period);

  return (
    <section className="relative h-[88vh] min-h-[560px] w-full overflow-hidden">
      <img
        key={dino.slug}
        src={dino.image}
        alt={dino.name}
        width={1280}
        height={720}
        className="absolute inset-0 h-full w-full animate-hero-fade object-cover"
      />
      <div className="absolute inset-0 bg-hero-side" />
      <div className="absolute inset-0 bg-hero-bottom" />

      <div className="relative flex h-full items-end px-4 pb-32 md:px-10 md:pb-40">
        <div key={dino.slug} className="max-w-xl animate-fade-up">
          <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-primary">
            <span className="h-px w-8 bg-primary" /> Destacado · {index + 1} de {featured.length}
          </p>
          <h1 className="mt-3 font-display text-6xl leading-[0.85] tracking-wide text-foreground md:text-8xl lg:text-9xl">
            {dino.name}
          </h1>
          <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-foreground/80">
            <DietBadge diet={dino.diet} />
            <span className="font-semibold text-foreground">{era}</span>
            <span className="inline-flex items-center gap-1"><Ruler className="h-4 w-4 text-primary" />{dino.length}</span>
            <span className="inline-flex items-center gap-1"><Scale className="h-4 w-4 text-primary" />{dino.weight}</span>
          </div>
          <p className="mt-4 text-base text-foreground/90 md:text-lg">{dino.summary}</p>
          {ago && <p className="mt-1 text-sm text-muted-foreground">Vivió {ago} en {dino.place}.</p>}
          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              to="/dinosaurio/$slug"
              params={{ slug: dino.slug }}
              className="inline-flex items-center gap-2 rounded-md bg-foreground px-7 py-3 font-semibold text-background transition-opacity hover:opacity-85"
            >
              <Play className="h-5 w-5 fill-current" /> Ver ahora
            </Link>
            <Link
              to="/dinosaurio/$slug"
              params={{ slug: dino.slug }}
              className="inline-flex items-center gap-2 rounded-md bg-secondary/80 px-7 py-3 font-semibold text-secondary-foreground backdrop-blur transition-colors hover:bg-secondary"
            >
              <Info className="h-5 w-5" /> Más info
            </Link>
          </div>
        </div>

        <div className="absolute bottom-32 right-4 hidden gap-3 md:right-10 md:bottom-40 lg:flex">
          {featured.map((d, i) => (
            <button
              key={d.slug}
              onClick={() => setIndex(i)}
              aria-label={`Mostrar ${d.name}`}
              className={`relative h-16 w-28 overflow-hidden rounded-md ring-2 transition-all ${
                i === index ? "ring-primary" : "opacity-60 ring-transparent hover:opacity-100"
              }`}
            >
              <img src={d.image} alt="" width={1280} height={720} className="h-full w-full object-cover" />
              {i === index && <span key={index} className="absolute inset-x-0 bottom-0 h-1 animate-progress bg-primary" />}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
