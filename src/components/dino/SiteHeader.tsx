import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";

const links = [
  { label: "Inicio", hash: undefined },
  { label: "Depredadores", hash: "depredadores" },
  { label: "Argentinos", hash: "argentinos" },
  { label: "Gigantes", hash: "gigantes" },
  { label: "Todos", hash: "todos" },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/90 shadow-card backdrop-blur-md"
          : "bg-gradient-to-b from-background/90 to-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-[1600px] items-center gap-8 px-4 md:px-10">
        <Link to="/" className="flex items-baseline gap-1 font-display text-3xl tracking-wider text-primary md:text-4xl">
          DINOFLIX
          <span className="hidden h-2 w-2 rounded-full bg-primary-glow sm:inline-block" />
        </Link>
        <nav className="hidden gap-1 text-sm md:flex">
          {links.map((l) => (
            <Link
              key={l.label}
              to="/"
              {...(l.hash ? { hash: l.hash } : {})}
              className="rounded-full px-3 py-1.5 font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <Link
          to="/"
          hash="todos"
          className="ml-auto rounded-full bg-primary px-4 py-1.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 md:hidden"
        >
          Ver todos
        </Link>
      </div>
    </header>
  );
}
