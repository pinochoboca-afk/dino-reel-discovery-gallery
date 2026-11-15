import { createFileRoute, Link } from "@tanstack/react-router";
import { Info, Play } from "lucide-react";
import { categories, byCategory, dinosaurs, getDinosaur } from "@/data/dinosaurs";
import { SiteHeader } from "@/components/dino/SiteHeader";
import { DinoRow } from "@/components/dino/DinoRow";
import { DinoCard } from "@/components/dino/DinoCard";

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

function Index() {
  const featured = getDinosaur("giganotosaurus")!;
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <section className="relative h-[85vh] min-h-[520px] w-full overflow-hidden">
        <img
          src={featured.image}
          alt={featured.name}
          width={1280}
          height={720}
          className="absolute inset-0 h-full w-full animate-slow-zoom object-cover"
        />
        <div className="absolute inset-0 bg-hero-side" />
        <div className="absolute inset-0 bg-hero-bottom" />
        <div className="relative mx-auto flex h-full max-w-[1600px] flex-col justify-end px-4 pb-24 md:px-10 md:pb-32">
          <div className="max-w-xl animate-fade-up">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">Destacado de hoy</p>
            <h1 className="mt-2 font-display text-6xl leading-[0.9] tracking-wide text-foreground md:text-8xl">
              {featured.name}
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              {featured.period} · {featured.place}
            </p>
            <p className="mt-4 text-base text-foreground/90 md:text-lg">{featured.summary}</p>
            <div className="mt-6 flex gap-3">
              <Link
                to="/dinosaurio/$slug"
                params={{ slug: featured.slug }}
                className="inline-flex items-center gap-2 rounded-md bg-foreground px-6 py-3 font-semibold text-background transition-opacity hover:opacity-85"
              >
                <Play className="h-5 w-5 fill-current" /> Ver ahora
              </Link>
              <Link
                to="/dinosaurio/$slug"
                params={{ slug: featured.slug }}
                className="inline-flex items-center gap-2 rounded-md bg-secondary/80 px-6 py-3 font-semibold text-secondary-foreground backdrop-blur transition-colors hover:bg-secondary"
              >
                <Info className="h-5 w-5" /> Más info
              </Link>
            </div>
          </div>
        </div>
      </section>

      <main className="relative z-10 -mt-20 space-y-4 pb-16">
        <DinoRow title="Populares en Dinoflix" items={dinosaurs.slice(0, 10)} />
        {categories.map((c) => (
          <DinoRow key={c.id} title={c.title} items={byCategory(c.id)} />
        ))}

        <section id="todos" className="scroll-mt-20 px-4 pt-8 md:px-10">
          <h2 className="mb-5 font-display text-3xl tracking-wide text-foreground md:text-4xl">
            Todos los dinosaurios <span className="text-primary">({dinosaurs.length})</span>
          </h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
            {dinosaurs.map((d) => (
              <DinoCard key={d.slug} dino={d} />
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-border px-4 py-8 text-center text-sm text-muted-foreground md:px-10">
        Dinoflix · Las imágenes son recreaciones artísticas.
      </footer>
    </div>
  );
}
