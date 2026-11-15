import { useEffect, useState, type FormEvent } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Download, Heart, MessageCircle, Sparkles } from "lucide-react";
import { toast } from "sonner";
import "@lovable.dev/cloud-auth-js/styles.css";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";
import { useAuth } from "@/hooks/use-auth";
import { safeRedirect } from "@/lib/social";
import { GoogleIcon } from "@/components/account/GoogleIcon";
import heroImg from "@/assets/dinos/giganotosaurus.jpg";

const REDIRECT_KEY = "dinoflix:after-login";

export const Route = createFileRoute("/auth")({
  validateSearch: (s: Record<string, unknown>): { redirect?: string | undefined } => ({ redirect: safeRedirect(s["redirect"]) }),
  head: () => ({
    meta: [
      { title: "Entrá o creá tu cuenta · Dinoflix" },
      { name: "description", content: "Creá tu cuenta gratis en Dinoflix para guardar tu lista, comentar y descargar fotos de dinosaurios." },
      { property: "og:title", content: "Entrá o creá tu cuenta · Dinoflix" },
      { property: "og:description", content: "Guardá tus dinosaurios favoritos, comentá y descargá fotos." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AuthPage,
});

const perks = [
  { icon: Heart, text: "Armá tu propia “Mi lista” de favoritos" },
  { icon: MessageCircle, text: "Comentá en cada dinosaurio" },
  { icon: Download, text: "Descargá las fotos en grande" },
  { icon: Sparkles, text: "Tu cuenta queda guardada en todos tus dispositivos" },
];

function AuthPage() {
  const { redirect } = Route.useSearch();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup" | "forgot">("signin");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState<string | null>(null);

  useEffect(() => {
    if (redirect) sessionStorage.setItem(REDIRECT_KEY, redirect);
  }, [redirect]);

  useEffect(() => {
    if (!user) return;
    const target = safeRedirect(redirect ?? sessionStorage.getItem(REDIRECT_KEY)) ?? "/";
    sessionStorage.removeItem(REDIRECT_KEY);
    navigate({ to: target, replace: true });
  }, [user, redirect, navigate]);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    try {
      if (mode === "signin") {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw new Error(friendlyError(error.message));
        toast.success("¡Bienvenido de vuelta!");
      } else if (mode === "signup") {
        if (password.length < 6) throw new Error("La contraseña necesita al menos 6 letras o números");
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: window.location.origin, data: { display_name: name.trim() || undefined } },
        });
        if (error) throw new Error(friendlyError(error.message));
        setSent("Te mandamos un mail. Tocá el link para confirmar tu cuenta y listo.");
      } else {
        const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo: `${window.location.origin}/reset-password` });
        if (error) throw new Error(friendlyError(error.message));
        setSent("Te mandamos un mail con un link para crear una contraseña nueva.");
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Algo salió mal");
    } finally {
      setBusy(false);
    }
  }

  async function oauth(provider: "google" | "lovable") {
    const result = await lovable.auth.signInWithOAuth(provider, { redirect_uri: `${window.location.origin}/auth` });
    if (result.error) toast.error("No se pudo entrar. Probá de nuevo.");
  }

  const title = mode === "signup" ? "Creá tu cuenta" : mode === "forgot" ? "Recuperá tu contraseña" : "Entrá a Dinoflix";

  return (
    <div className="relative grid min-h-screen bg-background lg:grid-cols-[1.2fr_1fr]">
      <div className="relative hidden overflow-hidden lg:block">
        <img src={heroImg} alt="Giganotosaurus" width={1280} height={720} className="absolute inset-0 h-full w-full animate-slow-zoom object-cover" />
        <div className="absolute inset-0 bg-hero-side" />
        <div className="absolute inset-0 bg-hero-bottom" />
        <div className="relative flex h-full flex-col justify-end p-12">
          <p className="font-display text-7xl leading-none tracking-wide text-foreground">Tu cuenta,<br />tus dinosaurios</p>
          <ul className="mt-6 space-y-3">
            {perks.map(({ icon: Icon, text }) => (
              <li key={text} className="flex items-center gap-3 text-foreground/90">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-primary/15 text-primary ring-1 ring-primary/40"><Icon className="h-4 w-4" /></span>
                {text}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex flex-col px-5 py-6 md:px-12">
        <div className="flex items-center justify-between">
          <Link to="/" className="font-display text-3xl tracking-wider text-primary">DINOFLIX</Link>
          <Link to="/" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"><ArrowLeft className="h-4 w-4" /> Volver</Link>
        </div>

        <div className="m-auto w-full max-w-sm py-10">
          <h1 className="font-display text-5xl tracking-wide text-foreground">{title}</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {mode === "signup" ? "Es gratis y tarda un minuto." : mode === "forgot" ? "Escribí tu email y te mandamos un link." : "Guardá tu lista, comentá y descargá fotos."}
          </p>

          {sent ? (
            <div className="mt-8 rounded-lg bg-card p-5 ring-1 ring-primary/40">
              <p className="font-semibold text-foreground">¡Revisá tu email!</p>
              <p className="mt-1 text-sm text-muted-foreground">{sent} Si no lo ves, mirá en “correo no deseado”.</p>
              <button onClick={() => { setSent(null); setMode("signin"); }} className="mt-4 text-sm font-semibold text-primary hover:underline">Volver a entrar</button>
            </div>
          ) : (
            <>
              {mode !== "forgot" && (
                <div className="mt-8 space-y-3">
                  <button type="button" onClick={() => oauth("google")} className="google-auth-button">
                    <GoogleIcon /> Continuar con Google
                  </button>
                  <button type="button" onClick={() => oauth("lovable")} className="lovable-auth-button w-full">
                    Continuar con Lovable
                  </button>
                  <div className="flex items-center gap-3 pt-2 text-xs uppercase tracking-widest text-muted-foreground">
                    <span className="h-px flex-1 bg-border" /> o con tu email <span className="h-px flex-1 bg-border" />
                  </div>
                </div>
              )}

              <form onSubmit={onSubmit} className="mt-4 space-y-3">
                {mode === "signup" && (
                  <Field label="Tu nombre" value={name} onChange={setName} placeholder="Ej: Martina" maxLength={40} />
                )}
                <Field label="Email" type="email" value={email} onChange={setEmail} placeholder="tu@email.com" required />
                {mode !== "forgot" && (
                  <Field label="Contraseña" type="password" value={password} onChange={setPassword} placeholder="Mínimo 6 caracteres" required />
                )}
                {mode === "signin" && (
                  <button type="button" onClick={() => setMode("forgot")} className="text-xs text-muted-foreground hover:text-primary">¿Te olvidaste la contraseña?</button>
                )}
                <button disabled={busy} className="w-full rounded-full bg-primary py-3 font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-60">
                  {busy ? "Un momento…" : mode === "signup" ? "Crear cuenta" : mode === "forgot" ? "Mandar link" : "Entrar"}
                </button>
              </form>

              <p className="mt-6 text-center text-sm text-muted-foreground">
                {mode === "signup" ? "¿Ya tenés cuenta? " : mode === "forgot" ? "¿Te acordaste? " : "¿Primera vez acá? "}
                <button onClick={() => setMode(mode === "signup" || mode === "forgot" ? "signin" : "signup")} className="font-semibold text-primary hover:underline">
                  {mode === "signup" || mode === "forgot" ? "Entrá" : "Creá tu cuenta gratis"}
                </button>
              </p>

              <ul className="mt-8 space-y-2 lg:hidden">
                {perks.map(({ icon: Icon, text }) => (
                  <li key={text} className="flex items-center gap-2 text-sm text-muted-foreground"><Icon className="h-4 w-4 text-primary" /> {text}</li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function friendlyError(message: string) {
  const m = message.toLowerCase();
  if (m.includes("invalid login")) return "Email o contraseña incorrectos";
  if (m.includes("weak") || m.includes("pwned")) return "Esa contraseña es muy fácil de adivinar. Elegí otra.";
  if (m.includes("already registered")) return "Ya hay una cuenta con ese email. Probá entrar.";
  if (m.includes("email not confirmed")) return "Primero confirmá tu cuenta con el link que te mandamos por mail.";
  if (m.includes("not allowed") || m.includes("invalid format")) return "Ese email no parece válido. Revisá cómo lo escribiste.";
  if (m.includes("rate limit")) return "Muchos intentos seguidos. Esperá un ratito y probá de nuevo.";
  return "Algo salió mal. Probá de nuevo.";
}

function Field(props: { label: string; value: string; onChange: (v: string) => void; type?: string; placeholder?: string; required?: boolean; maxLength?: number }) {
  return (
    <label className="block">
      <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">{props.label}</span>
      <input
        type={props.type ?? "text"}
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
        placeholder={props.placeholder}
        required={props.required}
        maxLength={props.maxLength}
        className="mt-1 w-full rounded-lg bg-input/40 px-4 py-3 text-foreground ring-1 ring-border placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary"
      />
    </label>
  );
}
