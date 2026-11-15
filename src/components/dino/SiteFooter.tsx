import { Link } from "@tanstack/react-router";
import { categories, dinosaurs } from "@/data/dinosaurs";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-card/40">
      <div className="grid gap-8 px-4 py-12 md:grid-cols-[1.5fr_1fr_1fr] md:px-10">
        <div>
          <p className="font-display text-4xl tracking-wider text-primary">DINOFLIX</p>
          <p className="mt-2 max-w-sm text-sm text-muted-foreground">
            {dinosaurs.length} dinosaurios con fotos grandes y una breve explicación de cada uno. Las imágenes son recreaciones artísticas.
          </p>
        </div>
        <div>
          <p className="font-display text-xl tracking-wide text-foreground">Categorías</p>
          <ul className="mt-2 space-y-1 text-sm">
            {categories.map((c) => (
              <li key={c.id}>
                <Link to="/" hash={c.id} className="text-muted-foreground transition-colors hover:text-primary">
                  {c.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="font-display text-xl tracking-wide text-foreground">Algunos favoritos</p>
          <ul className="mt-2 space-y-1 text-sm">
            {dinosaurs.slice(0, 6).map((d) => (
              <li key={d.slug}>
                <Link to="/dinosaurio/$slug" params={{ slug: d.slug }} className="text-muted-foreground transition-colors hover:text-primary">
                  {d.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
