import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Tag } from "@/types/tag";

type ArticleTagListProps = {
  tagIds: string[];
  tags: Tag[];
};

/**
 * Tag chips linking to `/tags/[id]` (middleware handles special case for id 33).
 */
export function ArticleTagList({ tagIds, tags }: ArticleTagListProps) {
  const byId = new Map(tags.map((t) => [t.id, t]));
  const resolved = tagIds
    .map((id) => ({ id, name: byId.get(id)?.name }))
    .filter((t): t is { id: string; name: string } => Boolean(t.name));

  if (resolved.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {resolved.map((tag) => (
        <Link
          key={tag.id}
          href={`/tags/${tag.id}`}
          className={cn(
            buttonVariants({ variant: "outline", size: "sm" }),
            "rounded-full text-xs font-medium sm:text-sm"
          )}
        >
          {tag.name}
        </Link>
      ))}
    </div>
  );
}
