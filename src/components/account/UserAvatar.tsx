import { cn } from "@/lib/utils";

export function UserAvatar({ name, url, className }: { name: string; url?: string | null | undefined; className?: string | undefined }) {
  if (url) {
    return <img src={url} alt="" referrerPolicy="no-referrer" className={cn("rounded-full object-cover", className)} />;
  }
  return (
    <span className={cn("grid place-items-center rounded-full bg-gradient-primary font-display text-lg leading-none text-primary-foreground", className)}>
      {name.trim().charAt(0).toUpperCase() || "D"}
    </span>
  );
}
