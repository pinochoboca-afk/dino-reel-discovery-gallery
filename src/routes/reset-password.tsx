import { useState, type FormEvent } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/reset-password")({
  head: () => ({
    meta: [
      { title: "Nueva contraseña · Dinoflix" },
      { name: "description", content: "Elegí una contraseña nueva para tu cuenta de Dinoflix." },
      { property: "og:title", content: "Nueva contraseña · Dinoflix" },
      { property: "og:description", content: "Elegí una contraseña nueva para tu cuenta de Dinoflix." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: ResetPassword,
});

function ResetPassword() {
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const navigate = useNavigate();

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (password.length < 6) {
      toast.error("Mínimo 6 caracteres");
      return;
    }
    setBusy(true);
    const { error } = await supabase.auth.updateUser({ password });
    setBusy(false);
    if (error) {
      toast.error("El link venció. Pedí uno nuevo desde “Entrar”.");
      return;
    }
    toast.success("¡Contraseña cambiada!");
    navigate({ to: "/", replace: true });
  }

  return (
    <div className="grid min-h-screen place-items-center bg-background bg-grain px-5">
      <form onSubmit={onSubmit} className="w-full max-w-sm rounded-2xl bg-card p-6 ring-1 ring-border">
        <Link to="/" className="font-display text-3xl tracking-wider text-primary">DINOFLIX</Link>
        <h1 className="mt-4 font-display text-4xl tracking-wide text-foreground">Nueva contraseña</h1>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Mínimo 6 caracteres"
          required
          className="mt-4 w-full rounded-lg bg-input/40 px-4 py-3 text-foreground ring-1 ring-border focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <button disabled={busy} className="mt-4 w-full rounded-full bg-primary py-3 font-semibold text-primary-foreground hover:opacity-90 disabled:opacity-60">
          {busy ? "Guardando…" : "Guardar contraseña"}
        </button>
      </form>
    </div>
  );
}
