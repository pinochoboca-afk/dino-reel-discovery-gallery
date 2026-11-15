import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Dinosaur } from "@/data/dinosaurs";
import { DinoCard } from "./DinoCard";

export function DinoRow({ title, items }: { title: string; items: Dinosaur[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const scroll = (dir: number) => {
    const el = ref.current;
    if (el) el.scrollBy({ left: dir * el.clientWidth * 0.85, behavior: "smooth" });
  };

  return (
    <section className="group/row relative">
      <h2 className="mb-3 px-4 font-display text-2xl tracking-wide text-foreground md:px-10 md:text-3xl">{title}</h2>
      <div className="relative">
        <button
          aria-label={`Anterior en ${title}`}
          onClick={() => scroll(-1)}
          className="absolute inset-y-0 left-0 z-20 hidden w-10 items-center justify-center bg-background/60 text-foreground opacity-0 transition-opacity group-hover/row:opacity-100 md:flex"
        >
          <ChevronLeft className="h-8 w-8" />
        </button>
        <div ref={ref} className="scrollbar-none flex gap-3 overflow-x-auto scroll-smooth px-4 py-6 md:px-10">
          {items.map((d) => (
            <DinoCard key={d.slug} dino={d} className="w-[70vw] shrink-0 sm:w-[42vw] md:w-[30vw] lg:w-[22vw] xl:w-[18vw]" />
          ))}
        </div>
        <button
          aria-label={`Siguiente en ${title}`}
          onClick={() => scroll(1)}
          className="absolute inset-y-0 right-0 z-20 hidden w-10 items-center justify-center bg-background/60 text-foreground opacity-0 transition-opacity group-hover/row:opacity-100 md:flex"
        >
          <ChevronRight className="h-8 w-8" />
        </button>
      </div>
    </section>
  );
}
