import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Tag } from "@/types/tag";

type ArticleTagListProps = {
  tagIds: string[];
  tags: Tag[];
};

const chipClass = cn(
  buttonVariants({ variant: "outline", size: "sm" }),
  "rounded-full text-xs font-medium sm:text-sm"
);

/**
 * Tag chips linking to `/tags/[id]`.
 * Tag `33` uses a plain `<a>` so the browser does a full navigation: middleware redirects to Maariv,
 * and client `<Link>` would request an RSC payload (redirect breaks that fetch).
 */
export function ArticleTagList({ tagIds, tags }: ArticleTagListProps) {
  const byId = new Map(tags.map((t) => [t.id, t]));
  const resolved = tagIds
    .map((id) => ({ id, name: byId.get(id)?.name }))
    .filter((t): t is { id: string; name: string } => Boolean(t.name));

  if (resolved.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {resolved.map((tag) =>
        tag.id === "33" ? (
          <a key={tag.id} href="/tags/33" className={chipClass}>
            {tag.name}
          </a>
        ) : (
          <Link key={tag.id} href={`/tags/${tag.id}`} className={chipClass}>
            {tag.name}
          </Link>
        )
      )}
    </div>
  );
}
