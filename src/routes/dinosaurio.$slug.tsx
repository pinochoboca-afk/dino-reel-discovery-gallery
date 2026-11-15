import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ChevronLeft, ChevronRight, Clock, MapPin, Ruler, Scale, Utensils } from "lucide-react";
import { categories, dinosaurs, getDinosaur, splitPeriod } from "@/data/dinosaurs";
import { SiteHeader } from "@/components/dino/SiteHeader";
import { DinoRow } from "@/components/dino/DinoRow";
import { DietBadge } from "@/components/dino/DietBadge";
import { SiteFooter } from "@/components/dino/SiteFooter";

export const Route = createFileRoute("/dinosaurio/$slug")({
  loader: ({ params }) => {
    const dino = getDinosaur(params.slug);
    if (!dino) throw notFound();
    return { slug: dino.slug };
  },
  head: ({ loaderData }) => {
    const dino = loaderData ? getDinosaur(loaderData.slug) : undefined;
    if (!dino) return { meta: [{ title: "Dinosaurio no encontrado · Dinoflix" }, { name: "robots", content: "noindex" }] };
    const title = `${dino.name} · Dinoflix`;
    return {
      meta: [
        { title },
        { name: "description", content: dino.summary },
        { property: "og:title", content: title },
        { property: "og:description", content: dino.summary },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-background text-center">
      <h1 className="font-display text-5xl text-foreground">Este dinosaurio se extinguió</h1>
      <Link to="/" className="text-primary underline">Volver al inicio</Link>
    </div>
  ),
  component: DinoPage,
});

function DinoPage() {
  const { slug } = Route.useLoaderData();
  const dino = getDinosaur(slug)!;
  const related = dinosaurs.filter((d) => d.slug !== dino.slug && d.categories.some((c) => dino.categories.includes(c)));
  const others = dinosaurs.filter((d) => d.slug !== dino.slug && !related.includes(d));
  const { era, ago } = splitPeriod(dino.period);
  const idx = dinosaurs.findIndex((d) => d.slug === dino.slug);
  const prev = dinosaurs[(idx - 1 + dinosaurs.length) % dinosaurs.length]!;
  const next = dinosaurs[(idx + 1) % dinosaurs.length]!;
  const cats = categories.filter((c) => dino.categories.includes(c.id));

  const stats = [
    { icon: Clock, label: "Época", value: era, hint: ago },
    { icon: Ruler, label: "Largo", value: dino.length },
    { icon: Scale, label: "Peso", value: dino.weight },
    { icon: Utensils, label: "Dieta", value: dino.diet },
    { icon: MapPin, label: "Dónde vivió", value: dino.place },
  ];

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <section key={dino.slug} className="relative h-[80vh] min-h-[520px] w-full overflow-hidden md:h-[92vh]">
        <img
          src={dino.image}
          alt={dino.name}
          width={1280}
          height={720}
          className="absolute inset-0 h-full w-full animate-slow-zoom object-cover"
        />
        <div className="absolute inset-0 bg-hero-side" />
        <div className="absolute inset-0 bg-hero-bottom" />
        <div className="relative flex h-full flex-col px-4 pb-16 pt-20 md:px-10 md:pb-24">
          <Link
            to="/"
            className="inline-flex w-fit items-center gap-2 rounded-full bg-background/50 px-4 py-2 text-sm font-medium text-foreground/90 ring-1 ring-border backdrop-blur transition-colors hover:bg-background/80"
          >
            <ArrowLeft className="h-4 w-4" /> Volver al inicio
          </Link>
          <div className="mt-auto max-w-2xl animate-fade-up">
            <div className="flex flex-wrap items-center gap-2">
              <DietBadge diet={dino.diet} />
              {cats.map((c) => (
                <Link
                  key={c.id}
                  to="/"
                  hash={c.id}
                  className="rounded-full bg-secondary/70 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-secondary-foreground ring-1 ring-border backdrop-blur-sm transition-colors hover:text-primary"
                >
                  {c.title}
                </Link>
              ))}
            </div>
            <h1 className="mt-4 font-display text-6xl leading-[0.85] tracking-wide text-foreground md:text-9xl">{dino.name}</h1>
            <p className="mt-3 text-sm font-semibold uppercase tracking-[0.3em] text-primary">Significa “{dino.meaning}”</p>
            <p className="mt-4 text-lg text-foreground/90 md:text-xl">{dino.summary}</p>
          </div>
        </div>
      </section>

      <main className="relative z-10 -mt-12 px-4 pb-12 md:px-10">
        <dl className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {stats.map(({ icon: Icon, label, value, hint }, i) => (
            <div
              key={label}
              className={`rounded-lg bg-card/90 p-4 ring-1 ring-border backdrop-blur ${i === 0 ? "col-span-2 sm:col-span-1" : ""}`}
            >
              <dt className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
                <Icon className="h-4 w-4 text-primary" /> {label}
              </dt>
              <dd className="mt-2 font-display text-2xl leading-none tracking-wide text-card-foreground md:text-3xl">{value}</dd>
              {hint && <p className="mt-1 text-xs text-muted-foreground">{hint}</p>}
            </div>
          ))}
        </dl>

        <div className="mt-12 grid gap-10 lg:grid-cols-[1.3fr_1fr]">
          <div className="animate-fade-up">
            <h2 className="flex items-center gap-3 font-display text-3xl tracking-wide text-foreground md:text-4xl">
              <span className="h-7 w-1 rounded-full bg-gradient-primary" /> Sobre el {dino.name}
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{dino.description}</p>
            <figure className="mt-8 overflow-hidden rounded-lg ring-1 ring-border">
              <img src={dino.image} alt={`${dino.name} en su ambiente`} loading="lazy" width={1280} height={720} className="aspect-[21/9] w-full object-cover" />
              <figcaption className="bg-card px-4 py-2 text-xs text-muted-foreground">
                {dino.name} en su ambiente · {dino.place}
              </figcaption>
            </figure>
          </div>

          <div>
            <h3 className="font-display text-3xl tracking-wide text-foreground">Datos curiosos</h3>
            <ol className="mt-4 space-y-3">
              {dino.facts.map((f, i) => (
                <li key={f} className="flex items-center gap-4 rounded-lg bg-card p-4 ring-1 ring-border">
                  <span className="font-display text-4xl leading-none text-primary">{String(i + 1).padStart(2, "0")}</span>
                  <span className="text-card-foreground">{f}</span>
                </li>
              ))}
            </ol>

            <div className="mt-8 grid grid-cols-2 gap-3">
              {[{ d: prev, label: "Anterior" }, { d: next, label: "Siguiente" }].map(({ d, label }) => (
                <Link
                  key={label}
                  to="/dinosaurio/$slug"
                  params={{ slug: d.slug }}
                  className="group relative aspect-video overflow-hidden rounded-lg ring-1 ring-border transition-shadow hover:shadow-glow"
                >
                  <img src={d.image} alt={d.name} loading="lazy" width={1280} height={720} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-card-fade" />
                  <div className="absolute inset-x-0 bottom-0 p-3">
                    <p className="flex items-center gap-1 text-[11px] font-semibold uppercase tracking-widest text-primary">
                      {label === "Anterior" ? <ChevronLeft className="h-3 w-3" /> : null}
                      {label}
                      {label === "Siguiente" ? <ChevronRight className="h-3 w-3" /> : null}
                    </p>
                    <p className="font-display text-xl leading-none text-foreground">{d.name}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>

      <div className="space-y-8 pb-16">
        {related.length > 0 && <DinoRow title="Parecidos" subtitle={`Si te gustó el ${dino.name}`} items={related} />}
        <DinoRow title="Más dinosaurios" items={others} variant="poster" />
      </div>

      <SiteFooter />
    </div>
  );
}
