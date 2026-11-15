import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { categories, byCategory, dinosaurs, getDinosaur, type Category } from "@/data/dinosaurs";
import { SiteHeader } from "@/components/dino/SiteHeader";
import { HomeHero } from "@/components/dino/HomeHero";
import { DinoRow } from "@/components/dino/DinoRow";
import { DinoTile } from "@/components/dino/DinoTile";
import { SiteFooter } from "@/components/dino/SiteFooter";
import { MyListRow } from "@/components/dino/MyListRow";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dinoflix · Todos los dinosaurios en fotos" },
      { name: "description", content: "Explorá los dinosaurios más famosos como en una plataforma de películas: fotos grandes y una breve explicación de cada uno." },
      { property: "og:title", content: "Dinoflix · Todos los dinosaurios en fotos" },
      { property: "og:description", content: "Explorá los dinosaurios más famosos con fotos grandes y una breve explicación de cada uno." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const featuredSlugs = ["giganotosaurus", "tyrannosaurus-rex", "spinosaurus", "argentinosaurus", "triceratops"];
const top10Slugs = ["tyrannosaurus-rex", "velociraptor", "triceratops", "spinosaurus", "brachiosaurus", "stegosaurus", "giganotosaurus", "pteranodon", "ankylosaurus", "mosasaurus"];
const rowSubtitles: Partial<Record<Category, string>> = {
  depredadores: "Dientes filosos y mordidas tremendas",
  argentinos: "Encontrados en la Patagonia",
  gigantes: "Los animales más grandes que pisaron la Tierra",
  acorazados: "Defensas de hueso para no ser la cena",
  "pico-de-pato": "Herbívoros que vivían en grupo",
  "cielo-mar": "No eran dinosaurios, pero vivieron con ellos",
};

function Index() {
  const featured = featuredSlugs.map((s) => getDinosaur(s)!).filter(Boolean);
  const top10 = top10Slugs.map((s) => getDinosaur(s)!).filter(Boolean);
  const [filter, setFilter] = useState<Category | "todos">("todos");
  const shown = useMemo(() => (filter === "todos" ? dinosaurs : byCategory(filter)), [filter]);

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <HomeHero featured={featured} />

      <main className="relative z-10 -mt-28 space-y-8 pb-16 md:space-y-10">
        <MyListRow />
        <DinoRow title="Top 10 en Dinoflix" subtitle="Los más vistos de la semana" items={top10} variant="top10" />

        {categories.map((c, i) => (
          <DinoRow
            key={c.id}
            id={c.id}
            title={c.title}
            subtitle={rowSubtitles[c.id]}
            items={byCategory(c.id)}
            variant={i % 2 === 1 ? "poster" : "landscape"}
          />
        ))}

        <section id="todos" className="scroll-mt-20 px-4 pt-10 md:px-10">
          <div className="rounded-2xl bg-card/40 bg-grain p-4 ring-1 ring-border md:p-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">Catálogo completo</p>
                <h2 className="mt-1 font-display text-4xl tracking-wide text-foreground md:text-5xl">
                  Todos los dinosaurios <span className="text-primary">({shown.length})</span>
                </h2>
              </div>
              <div className="scrollbar-none -mx-4 flex gap-2 overflow-x-auto px-4 md:mx-0 md:flex-wrap md:justify-end md:px-0">
                {[{ id: "todos" as const, title: "Todos" }, ...categories].map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setFilter(c.id)}
                    className={`shrink-0 rounded-full px-4 py-1.5 text-sm font-medium ring-1 transition-colors ${
                      filter === c.id
                        ? "bg-primary text-primary-foreground ring-primary"
                        : "bg-secondary/60 text-muted-foreground ring-border hover:text-foreground"
                    }`}
                  >
                    {c.title}
                  </button>
                ))}
              </div>
            </div>
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {shown.map((d) => (
                <DinoTile key={d.slug} dino={d} />
              ))}
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
