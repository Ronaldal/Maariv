import { getBackendBaseUrl } from "@/lib/fetch/api-base";
import { mapArticleFromApi } from "@/lib/fetch/map-api";
import { logServerError } from "@/lib/logger";
import type { Article } from "@/types/article";

/**
 * Loads all articles from the .NET API. Uses ISR-style revalidation for the catalog.
 */
export async function fetchArticles(): Promise<Article[]> {
  const base = getBackendBaseUrl();
  try {
    const res = await fetch(`${base}/api/articles`, {
      next: { revalidate: 120, tags: ["articles"] },
    });
    if (!res.ok) {
      throw new Error(`Articles list failed: ${res.status}`);
    }
    const data: unknown = await res.json();
    if (!Array.isArray(data)) {
      throw new Error("Articles list: expected array");
    }
    return data.map(mapArticleFromApi);
  } catch (err) {
    logServerError(err, "fetchArticles");
    throw err;
  }
}

/**
 * Loads a single article by id. Opts out of caching so content updates are visible quickly.
 */
export async function fetchArticleById(id: string): Promise<Article | null> {
  const numericId = Number.parseInt(id, 10);
  if (!Number.isFinite(numericId)) {
    return null;
  }
  const base = getBackendBaseUrl();
  try {
    const res = await fetch(`${base}/api/articles/${numericId}`, {
      cache: "no-store",
    });
    if (res.status === 404) return null;
    if (!res.ok) {
      throw new Error(`Article ${id} failed: ${res.status}`);
    }
    const data: unknown = await res.json();
    return mapArticleFromApi(data);
  } catch (err) {
    logServerError(err, `fetchArticleById(${id})`);
    throw err;
  }
}
