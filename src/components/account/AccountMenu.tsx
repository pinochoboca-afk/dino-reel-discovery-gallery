import { Link, useLocation } from "@tanstack/react-router";
import { Heart, LogOut, UserRound } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/hooks/use-auth";
import { useProfile, useSignOut } from "@/lib/social";
import { UserAvatar } from "./UserAvatar";

export function AccountMenu() {
  const { user, loading } = useAuth();
  const { data: profile } = useProfile();
  const signOut = useSignOut();
  const location = useLocation();

  if (loading) return <div className="h-9 w-9 rounded-full bg-secondary/60" />;

  if (!user) {
    return (
      <Link
        to="/auth"
        search={{ redirect: location.pathname === "/auth" ? undefined : location.pathname }}
        className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-1.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
      >
        <UserRound className="h-4 w-4" /> Entrar
      </Link>
    );
  }

  const name = profile?.display_name ?? user.email?.split("@")[0] ?? "Explorador";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="rounded-full ring-2 ring-transparent transition hover:ring-primary focus-visible:outline-none focus-visible:ring-primary" aria-label="Mi cuenta">
        <UserAvatar name={name} url={profile?.avatar_url} className="h-9 w-9" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>
          <p className="truncate font-semibold">{name}</p>
          <p className="truncate text-xs font-normal text-muted-foreground">{user.email}</p>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link to="/mi-lista"><Heart className="mr-2 h-4 w-4" /> Mi lista y perfil</Link>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => void signOut()}>
          <LogOut className="mr-2 h-4 w-4" /> Salir
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
