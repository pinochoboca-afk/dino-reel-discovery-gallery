import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart, X } from "lucide-react";
import { getDinosaur, type Dinosaur } from "@/data/dinosaurs";
import { SiteHeader } from "@/components/dino/SiteHeader";
import { SiteFooter } from "@/components/dino/SiteFooter";
import { DinoTile } from "@/components/dino/DinoTile";
import { UserAvatar } from "@/components/account/UserAvatar";
import { useAuth } from "@/hooks/use-auth";
import { NAME_MAX, useFavorites, useProfile, useToggleFavorite, useUpdateProfile } from "@/lib/social";

export const Route = createFileRoute("/_authenticated/mi-lista")({
  head: () => ({
    meta: [
      { title: "Mi lista · Dinoflix" },
      { name: "description", content: "Tus dinosaurios guardados y tu perfil en Dinoflix." },
      { property: "og:title", content: "Mi lista · Dinoflix" },
      { property: "og:description", content: "Tus dinosaurios guardados y tu perfil en Dinoflix." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: MyList,
});

function MyList() {
  const { user } = useAuth();
  const { data: profile } = useProfile();
  const { data: slugs = [], isLoading } = useFavorites();
  const toggle = useToggleFavorite();
  const update = useUpdateProfile();
  const [name, setName] = useState("");
  useEffect(() => { if (profile) setName(profile.display_name); }, [profile]);

  const items = slugs.map((s) => getDinosaur(s)).filter((d): d is Dinosaur => !!d);
  const display = profile?.display_name ?? "Explorador";

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="px-4 pb-16 pt-24 md:px-10">
        <section className="flex flex-col gap-6 rounded-2xl bg-card/40 bg-grain p-5 ring-1 ring-border md:flex-row md:items-center md:p-8">
          <UserAvatar name={display} url={profile?.avatar_url} className="h-20 w-20 text-4xl" />
          <div className="flex-1">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">Tu perfil</p>
            <h1 className="font-display text-5xl tracking-wide text-foreground">Hola, {display}</h1>
            <p className="text-sm text-muted-foreground">{user?.email}</p>
          </div>
          <form
            onSubmit={(e) => { e.preventDefault(); update.mutate(name); }}
            className="flex w-full gap-2 md:w-auto"
          >
            <label className="sr-only" htmlFor="display-name">Tu nombre</label>
            <input
              id="display-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={NAME_MAX}
              placeholder="Tu nombre"
              className="min-w-0 flex-1 rounded-full bg-input/40 px-4 py-2 text-foreground ring-1 ring-border focus:outline-none focus:ring-2 focus:ring-primary md:w-56"
            />
            <button disabled={update.isPending} className="rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90 disabled:opacity-60">
              Guardar
            </button>
          </form>
        </section>

        <section className="mt-10">
          <h2 className="flex items-center gap-3 font-display text-4xl tracking-wide text-foreground">
            <span className="h-7 w-1 rounded-full bg-gradient-primary" /> Mi lista <span className="text-primary">({items.length})</span>
          </h2>

          {isLoading ? (
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[0, 1, 2, 3].map((i) => <div key={i} className="aspect-[4/3] animate-pulse rounded-lg bg-card" />)}
            </div>
          ) : items.length === 0 ? (
            <div className="mt-6 rounded-xl bg-card p-10 text-center ring-1 ring-border">
              <Heart className="mx-auto h-10 w-10 text-primary" />
              <p className="mt-3 font-display text-3xl text-foreground">Tu lista está vacía</p>
              <p className="mt-1 text-muted-foreground">Entrá a cualquier dinosaurio y tocá “Mi lista” para guardarlo acá.</p>
              <Link to="/" hash="todos" className="mt-5 inline-block rounded-full bg-primary px-5 py-2 font-semibold text-primary-foreground hover:opacity-90">
                Ver dinosaurios
              </Link>
            </div>
          ) : (
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {items.map((d) => (
                <div key={d.slug} className="relative">
                  <DinoTile dino={d} />
                  <button
                    onClick={() => toggle.mutate({ slug: d.slug, saved: true })}
                    aria-label={`Quitar ${d.name} de Mi lista`}
                    className="absolute right-2.5 top-2.5 grid h-8 w-8 place-items-center rounded-full bg-background/80 text-foreground ring-1 ring-border backdrop-blur transition-colors hover:bg-destructive hover:text-destructive-foreground"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
