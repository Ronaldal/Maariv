import { getBackendBaseUrl } from "@/lib/fetch/api-base";
import { mapTagFromApi } from "@/lib/fetch/map-api";
import { logServerError } from "@/lib/logger";
import type { Tag } from "@/types/tag";

/**
 * Loads all tags from the .NET API.
 */
export async function fetchTags(): Promise<Tag[]> {
  const base = getBackendBaseUrl();
  try {
    const res = await fetch(`${base}/api/tags`, {
      next: { revalidate: 300, tags: ["tags"] },
    });
    if (!res.ok) {
      throw new Error(`Tags list failed: ${res.status}`);
    }
    const data: unknown = await res.json();
    if (!Array.isArray(data)) {
      throw new Error("Tags list: expected array");
    }
    return data.map(mapTagFromApi);
  } catch (err) {
    logServerError(err, "fetchTags");
    throw err;
  }
}

/**
 * Loads one tag by id.
 */
export async function fetchTagById(id: string): Promise<Tag | null> {
  const numericId = Number.parseInt(id, 10);
  if (!Number.isFinite(numericId)) {
    return null;
  }
  const base = getBackendBaseUrl();
  try {
    const res = await fetch(`${base}/api/tags/${numericId}`, {
      cache: "no-store",
    });
    if (res.status === 404) return null;
    if (!res.ok) {
      throw new Error(`Tag ${id} failed: ${res.status}`);
    }
    const data: unknown = await res.json();
    return mapTagFromApi(data);
  } catch (err) {
    logServerError(err, `fetchTagById(${id})`);
    throw err;
  }
}
