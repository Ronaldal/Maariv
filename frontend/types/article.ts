/**
 * Article entity used across article pages, lists, and mock data.
 * `id` is a string so it aligns with URL params and JSON without coercion.
 */
export interface Article {
  id: string;
  title: string;
  subtitle?: string;
  body: string;
  publishedAt: string;
  imageUrl?: string;
  imageCredit?: string;
  /** References {@link Tag} records by id */
  tagIds: string[];
}
