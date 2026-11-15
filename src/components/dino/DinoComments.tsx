import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";
import { MessageCircle, Trash2 } from "lucide-react";
import type { Dinosaur } from "@/data/dinosaurs";
import { useAuth } from "@/hooks/use-auth";
import { COMMENT_MAX, useAddComment, useComments, useDeleteComment, useProfile } from "@/lib/social";
import { UserAvatar } from "@/components/account/UserAvatar";

export function DinoComments({ dino }: { dino: Dinosaur }) {
  const { user } = useAuth();
  const { data: profile } = useProfile();
  const { data: comments = [], isLoading } = useComments(dino.slug);
  const add = useAddComment(dino.slug);
  const del = useDeleteComment(dino.slug);
  const [text, setText] = useState("");

  return (
    <section className="px-4 pb-12 md:px-10">
      <div className="rounded-2xl bg-card/40 p-5 ring-1 ring-border md:p-8">
        <h2 className="flex items-center gap-3 font-display text-3xl tracking-wide text-foreground md:text-4xl">
          <MessageCircle className="h-7 w-7 text-primary" /> Comentarios <span className="text-primary">({comments.length})</span>
        </h2>

        {user ? (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              add.mutate(text, { onSuccess: () => setText("") });
            }}
            className="mt-5 flex gap-3"
          >
            <UserAvatar name={profile?.display_name ?? "D"} url={profile?.avatar_url} className="hidden h-10 w-10 shrink-0 sm:grid" />
            <div className="flex-1">
              <label htmlFor="comment" className="sr-only">Tu comentario</label>
              <textarea
                id="comment"
                value={text}
                onChange={(e) => setText(e.target.value)}
                maxLength={COMMENT_MAX}
                rows={3}
                placeholder={`¿Qué te parece el ${dino.name}?`}
                className="w-full resize-none rounded-lg bg-input/40 px-4 py-3 text-foreground ring-1 ring-border placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <div className="mt-2 flex items-center justify-between">
                <span className="text-xs text-muted-foreground">{text.length}/{COMMENT_MAX}</span>
                <button
                  disabled={add.isPending || !text.trim()}
                  className="rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90 disabled:opacity-50"
                >
                  {add.isPending ? "Publicando…" : "Comentar"}
                </button>
              </div>
            </div>
          </form>
        ) : (
          <div className="mt-5 flex flex-col items-start gap-3 rounded-lg bg-card p-4 ring-1 ring-border sm:flex-row sm:items-center sm:justify-between">
            <p className="text-muted-foreground">Entrá a tu cuenta para dejar tu comentario.</p>
            <Link to="/auth" search={{ redirect: `/dinosaurio/${dino.slug}` }} className="rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90">
              Entrar para comentar
            </Link>
          </div>
        )}

        <ul className="mt-6 space-y-4">
          {isLoading && <li className="h-16 animate-pulse rounded-lg bg-card" />}
          {!isLoading && comments.length === 0 && (
            <li className="text-sm text-muted-foreground">Todavía nadie comentó. ¡Sé el primero!</li>
          )}
          {comments.map((c) => {
            const name = c.profiles?.display_name ?? "Explorador";
            return (
              <li key={c.id} className="flex gap-3">
                <UserAvatar name={name} url={c.profiles?.avatar_url} className="h-10 w-10 shrink-0" />
                <div className="min-w-0 flex-1 rounded-lg bg-card px-4 py-3 ring-1 ring-border">
                  <div className="flex items-center gap-2">
                    <p className="truncate font-semibold text-card-foreground">{name}</p>
                    <span className="text-xs text-muted-foreground">
                      {formatDistanceToNow(new Date(c.created_at), { addSuffix: true, locale: es })}
                    </span>
                    {user?.id === c.user_id && (
                      <button
                        onClick={() => del.mutate(c.id)}
                        aria-label="Borrar comentario"
                        className="ml-auto text-muted-foreground transition-colors hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                  <p className="mt-1 whitespace-pre-line break-words text-card-foreground/90">{c.body}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
