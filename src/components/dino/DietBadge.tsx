import { Beef, Fish, Leaf } from "lucide-react";
import type { Dinosaur } from "@/data/dinosaurs";

const styles: Record<Dinosaur["diet"], { cls: string; Icon: typeof Leaf }> = {
  Carnívoro: { cls: "bg-background/80 text-carnivore ring-carnivore/60", Icon: Beef },
  Herbívoro: { cls: "bg-background/80 text-herbivore ring-herbivore/60", Icon: Leaf },
  Piscívoro: { cls: "bg-background/80 text-piscivore ring-piscivore/60", Icon: Fish },
};

export function DietBadge({ diet, className = "" }: { diet: Dinosaur["diet"]; className?: string }) {
  const { cls, Icon } = styles[diet];
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider ring-1 backdrop-blur-sm ${cls} ${className}`}
    >
      <Icon className="h-3 w-3" />
      {diet}
    </span>
  );
}
