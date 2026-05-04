import { getRequestOrigin } from "@/lib/internal-origin";
import { logServerError } from "@/lib/logger";
import type { Article } from "@/types/article";

/**
 * Loads all articles (mock API). Uses ISR-style revalidation for the catalog.
 */
export async function fetchArticles(): Promise<Article[]> {
  const origin = await getRequestOrigin();
  try {
    const res = await fetch(`${origin}/api/mock/articles`, {
      next: { revalidate: 120, tags: ["articles"] },
    });
    if (!res.ok) {
      throw new Error(`Articles list failed: ${res.status}`);
    }
    return (await res.json()) as Article[];
  } catch (err) {
    logServerError(err, "fetchArticles");
    throw err;
  }
}

/**
 * Loads a single article by id. Opts out of caching so edits to mock data show immediately.
 */
export async function fetchArticleById(id: string): Promise<Article | null> {
  const origin = await getRequestOrigin();
  try {
    const res = await fetch(`${origin}/api/mock/articles/${encodeURIComponent(id)}`, {
      cache: "no-store",
    });
    if (res.status === 404) return null;
    if (!res.ok) {
      throw new Error(`Article ${id} failed: ${res.status}`);
    }
    return (await res.json()) as Article;
  } catch (err) {
    logServerError(err, `fetchArticleById(${id})`);
    throw err;
  }
}
