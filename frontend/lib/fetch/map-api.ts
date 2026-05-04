import type { Article } from "@/types/article";
import type { Tag } from "@/types/tag";

function recordish(v: unknown): v is Record<string, unknown> {
  return v !== null && typeof v === "object" && !Array.isArray(v);
}

function str(v: unknown): string {
  if (typeof v === "number" && Number.isFinite(v)) return String(v);
  if (typeof v === "string") return v;
  return "";
}

/**
 * Maps ASP.NET `ArticleDto` JSON (camelCase or PascalCase) to the app `Article` type.
 */
export function mapArticleFromApi(raw: unknown): Article {
  const o = recordish(raw) ? raw : {};
  const tagsRaw = o.tags ?? o.Tags;
  const tagIds: string[] = [];
  if (Array.isArray(tagsRaw)) {
    for (const t of tagsRaw) {
      if (!recordish(t)) continue;
      const tid = t.tagId ?? t.TagId;
      const s = str(tid);
      if (s) tagIds.push(s);
    }
  }

  const id = str(o.id ?? o.Id);
  const imageURL = str(o.imageURL ?? o.imageUrl ?? o.ImageURL);
  const desc = str(o.description ?? o.Description);
  const creditRaw = o.imageCredit ?? o.ImageCredit;
  const credit = typeof creditRaw === "string" && creditRaw.length > 0 ? creditRaw : undefined;

  return {
    id,
    title: str(o.title ?? o.Title),
    subtitle: desc || undefined,
    body: str(o.body ?? o.Body),
    publishedAt: str(o.date ?? o.Date),
    imageUrl: imageURL || undefined,
    imageCredit: credit,
    tagIds,
  };
}

/**
 * Maps ASP.NET `TagDto` JSON to the app `Tag` type.
 */
export function mapTagFromApi(raw: unknown): Tag {
  const o = recordish(raw) ? raw : {};
  const id = str(o.tagId ?? o.TagId);
  const name = str(o.tagName ?? o.TagName);
  const img = str(o.tagImage ?? o.TagImage);
  return {
    id,
    name,
    imageUrl: img || undefined,
  };
}
