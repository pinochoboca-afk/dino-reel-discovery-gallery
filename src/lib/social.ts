import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";

export const COMMENT_MAX = 500;
export const NAME_MAX = 40;

export function useProfile() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["profile", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("id, display_name, avatar_url")
        .eq("id", user!.id)
        .maybeSingle();
      if (error) throw error;
      return data;
    },
  });
}

export function useUpdateProfile() {
  const { user } = useAuth();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (displayName: string) => {
      const name = displayName.trim().slice(0, NAME_MAX);
      if (!name) throw new Error("Escribí un nombre");
      const { error } = await supabase.from("profiles").upsert({ id: user!.id, display_name: name });
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["profile"] });
      qc.invalidateQueries({ queryKey: ["comments"] });
      toast.success("Nombre guardado");
    },
    onError: (e: Error) => toast.error(e.message),
  });
}

export function useFavorites() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["favorites", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("favorites")
        .select("dino_slug, created_at")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data.map((r) => r.dino_slug);
    },
  });
}

export function useToggleFavorite() {
  const { user } = useAuth();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ slug, saved }: { slug: string; saved: boolean }) => {
      if (saved) {
        const { error } = await supabase.from("favorites").delete().eq("user_id", user!.id).eq("dino_slug", slug);
        if (error) throw error;
        return false;
      }
      const { error } = await supabase.from("favorites").insert({ user_id: user!.id, dino_slug: slug });
      if (error) throw error;
      return true;
    },
    onSuccess: (added) => {
      qc.invalidateQueries({ queryKey: ["favorites"] });
      toast.success(added ? "Agregado a Mi lista" : "Quitado de Mi lista");
    },
    onError: () => toast.error("No se pudo actualizar Mi lista"),
  });
}

export type CommentRow = {
  id: string;
  body: string;
  created_at: string;
  user_id: string;
  profiles: { display_name: string; avatar_url: string | null } | null;
};

export function useComments(slug: string) {
  return useQuery({
    queryKey: ["comments", slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("comments")
        .select("id, body, created_at, user_id, profiles(display_name, avatar_url)")
        .eq("dino_slug", slug)
        .order("created_at", { ascending: false })
        .limit(100);
      if (error) throw error;
      return data as CommentRow[];
    },
  });
}

export function useAddComment(slug: string) {
  const { user } = useAuth();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (body: string) => {
      const text = body.trim();
      if (!text) throw new Error("Escribí algo antes de enviar");
      if (text.length > COMMENT_MAX) throw new Error(`Máximo ${COMMENT_MAX} letras`);
      const { error } = await supabase.from("comments").insert({ user_id: user!.id, dino_slug: slug, body: text });
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["comments", slug] });
      toast.success("¡Comentario publicado!");
    },
    onError: (e: Error) => toast.error(e.message || "No se pudo publicar"),
  });
}

export function useDeleteComment(slug: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("comments").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["comments", slug] }),
    onError: () => toast.error("No se pudo borrar"),
  });
}

export function useSignOut() {
  const qc = useQueryClient();
  const navigate = useNavigate();
  return async () => {
    await qc.cancelQueries();
    qc.clear();
    await supabase.auth.signOut();
    navigate({ to: "/", replace: true });
  };
}

/** Only same-origin relative paths are allowed as a post-login destination. */
export function safeRedirect(value: unknown): string | undefined {
  return typeof value === "string" && value.startsWith("/") && !value.startsWith("//") ? value : undefined;
}
