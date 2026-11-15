import { getDinosaur, type Dinosaur } from "@/data/dinosaurs";
import { useAuth } from "@/hooks/use-auth";
import { useFavorites } from "@/lib/social";
import { DinoRow } from "./DinoRow";

export function MyListRow() {
  const { user } = useAuth();
  const { data: slugs = [] } = useFavorites();
  if (!user || slugs.length === 0) return null;
  const items = slugs.map((s) => getDinosaur(s)).filter((d): d is Dinosaur => !!d);
  return <DinoRow id="mi-lista" title="Mi lista" subtitle="Los dinosaurios que guardaste" items={items} />;
}
