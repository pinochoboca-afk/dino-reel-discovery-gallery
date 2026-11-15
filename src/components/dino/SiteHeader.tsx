import { Link } from "@tanstack/react-router";

export function SiteHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-gradient-to-b from-background/95 to-transparent">
      <div className="mx-auto flex h-16 max-w-[1600px] items-center justify-between px-4 md:px-10">
        <Link to="/" className="font-display text-3xl tracking-wider text-primary md:text-4xl">
          DINOFLIX
        </Link>
        <nav className="hidden gap-6 text-sm text-muted-foreground md:flex">
          <Link to="/" className="transition-colors hover:text-foreground">
            Inicio
          </Link>
          <Link to="/" hash="todos" className="transition-colors hover:text-foreground">
            Todos los dinosaurios
          </Link>
        </nav>
      </div>
    </header>
  );
}
