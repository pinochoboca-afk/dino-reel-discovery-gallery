import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Clock, MapPin, Ruler, Scale, Utensils } from "lucide-react";
import { dinosaurs, getDinosaur } from "@/data/dinosaurs";
import { SiteHeader } from "@/components/dino/SiteHeader";
import { DinoRow } from "@/components/dino/DinoRow";

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

  const stats = [
    { icon: Clock, label: "Época", value: dino.period },
    { icon: Ruler, label: "Largo", value: dino.length },
    { icon: Scale, label: "Peso", value: dino.weight },
    { icon: Utensils, label: "Dieta", value: dino.diet },
    { icon: MapPin, label: "Dónde vivió", value: dino.place },
  ];

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <section key={dino.slug} className="relative h-[75vh] min-h-[480px] w-full overflow-hidden md:h-[90vh]">
        <img
          src={dino.image}
          alt={dino.name}
          width={1280}
          height={720}
          className="absolute inset-0 h-full w-full animate-slow-zoom object-cover"
        />
        <div className="absolute inset-0 bg-hero-side" />
        <div className="absolute inset-0 bg-hero-bottom" />
        <div className="relative mx-auto flex h-full max-w-[1600px] flex-col justify-end px-4 pb-12 md:px-10">
          <Link to="/" className="mb-auto mt-20 inline-flex w-fit items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground">
            <ArrowLeft className="h-4 w-4" /> Volver
          </Link>
          <div className="max-w-2xl animate-fade-up">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">“{dino.meaning}”</p>
            <h1 className="mt-2 font-display text-6xl leading-[0.9] tracking-wide text-foreground md:text-9xl">{dino.name}</h1>
            <p className="mt-4 text-lg text-foreground/90 md:text-xl">{dino.summary}</p>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-[1600px] px-4 pb-10 md:px-10">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
          <div className="animate-fade-up">
            <h2 className="font-display text-3xl tracking-wide text-foreground">Sobre el {dino.name}</h2>
            <p className="mt-3 text-lg leading-relaxed text-muted-foreground">{dino.description}</p>

            <h3 className="mt-8 font-display text-2xl tracking-wide text-foreground">Datos curiosos</h3>
            <ul className="mt-3 space-y-2">
              {dino.facts.map((f) => (
                <li key={f} className="flex gap-3 text-foreground/90">
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-primary" />
                  {f}
                </li>
              ))}
            </ul>
          </div>

          <dl className="grid h-fit gap-px overflow-hidden rounded-md border border-border bg-border">
            {stats.map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-start gap-4 bg-card p-4">
                <Icon className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <div>
                  <dt className="text-xs uppercase tracking-widest text-muted-foreground">{label}</dt>
                  <dd className="mt-0.5 font-medium text-card-foreground">{value}</dd>
                </div>
              </div>
            ))}
          </dl>
        </div>
      </main>

      <div className="space-y-2 pb-16">
        {related.length > 0 && <DinoRow title="Parecidos" items={related} />}
        <DinoRow title="Más dinosaurios" items={others} />
      </div>
    </div>
  );
}
