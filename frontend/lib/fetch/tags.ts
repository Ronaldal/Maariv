import { getRequestOrigin } from "@/lib/internal-origin";
import { logServerError } from "@/lib/logger";
import type { Tag } from "@/types/tag";

/**
 * Loads all tags. Longer revalidate than articles list — taxonomy changes rarely in the mock.
 */
export async function fetchTags(): Promise<Tag[]> {
  const origin = await getRequestOrigin();
  try {
    const res = await fetch(`${origin}/api/mock/tags`, {
      next: { revalidate: 300, tags: ["tags"] },
    });
    if (!res.ok) {
      throw new Error(`Tags list failed: ${res.status}`);
    }
    return (await res.json()) as Tag[];
  } catch (err) {
    logServerError(err, "fetchTags");
    throw err;
  }
}

/**
 * Loads one tag. Uses default fetch caching (force-cache) for stable mock payloads.
 */
export async function fetchTagById(id: string): Promise<Tag | null> {
  const origin = await getRequestOrigin();
  try {
    const res = await fetch(`${origin}/api/mock/tags/${encodeURIComponent(id)}`, {
      cache: "force-cache",
    });
    if (res.status === 404) return null;
    if (!res.ok) {
      throw new Error(`Tag ${id} failed: ${res.status}`);
    }
    return (await res.json()) as Tag;
  } catch (err) {
    logServerError(err, `fetchTagById(${id})`);
    throw err;
  }
}
