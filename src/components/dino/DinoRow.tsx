import { useRef } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Dinosaur } from "@/data/dinosaurs";
import { DinoCard } from "./DinoCard";

type Props = {
  title: string;
  items: Dinosaur[];
  id?: string;
  subtitle?: string | undefined;
  variant?: "landscape" | "poster" | "top10";
};

const widths = {
  landscape: "w-[72vw] sm:w-[44vw] md:w-[31vw] lg:w-[23vw] xl:w-[19vw]",
  poster: "w-[46vw] sm:w-[31vw] md:w-[23vw] lg:w-[18vw] xl:w-[15vw]",
  top10: "w-[58vw] sm:w-[38vw] md:w-[28vw] lg:w-[22vw] xl:w-[18vw]",
};

export function DinoRow({ title, items, id, subtitle, variant = "landscape" }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const scroll = (dir: number) => {
    const el = ref.current;
    if (el) el.scrollBy({ left: dir * el.clientWidth * 0.85, behavior: "smooth" });
  };

  return (
    <section id={id} className="group/row relative scroll-mt-20">
      <div className="flex items-end justify-between gap-4 px-4 md:px-10">
        <div>
          <h2 className="flex items-center gap-3 font-display text-2xl tracking-wide text-foreground md:text-3xl">
            <span className="h-6 w-1 rounded-full bg-gradient-primary md:h-7" />
            {title}
            <span className="font-sans text-sm font-medium text-muted-foreground">{items.length}</span>
          </h2>
          {subtitle && <p className="mt-0.5 pl-4 text-sm text-muted-foreground">{subtitle}</p>}
        </div>
        <Link to="/" hash="todos" className="shrink-0 text-sm font-semibold text-primary opacity-80 transition-opacity hover:opacity-100">
          Ver todos ›
        </Link>
      </div>
      <div className="relative">
        <button
          aria-label={`Anterior en ${title}`}
          onClick={() => scroll(-1)}
          className="absolute inset-y-4 left-0 z-20 hidden w-12 items-center justify-center bg-gradient-to-r from-background to-transparent text-foreground opacity-0 transition-opacity group-hover/row:opacity-100 md:flex"
        >
          <ChevronLeft className="h-9 w-9" />
        </button>
        <div ref={ref} className="scrollbar-none flex gap-3 overflow-x-auto scroll-smooth px-4 py-4 md:gap-4 md:px-10">
          {items.map((d, i) =>
            variant === "top10" ? (
              <div key={d.slug} className={`relative flex shrink-0 items-end ${widths.top10}`}>
                <span className="text-outline pointer-events-none -mr-5 shrink-0 select-none font-display text-[8rem] leading-[0.75] md:text-[10rem]">
                  {i + 1}
                </span>
                <DinoCard dino={d} shape="poster" className="w-full" />
              </div>
            ) : (
              <DinoCard key={d.slug} dino={d} shape={variant} className={`shrink-0 ${widths[variant]}`} />
            ),
          )}
        </div>
        <button
          aria-label={`Siguiente en ${title}`}
          onClick={() => scroll(1)}
          className="absolute inset-y-4 right-0 z-20 hidden w-12 items-center justify-center bg-gradient-to-l from-background to-transparent text-foreground opacity-0 transition-opacity group-hover/row:opacity-100 md:flex"
        >
          <ChevronRight className="h-9 w-9" />
        </button>
      </div>
    </section>
  );
}
