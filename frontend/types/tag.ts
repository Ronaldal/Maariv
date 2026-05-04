/**
 * Tag entity for topic pages and article metadata.
 */
export interface Tag {
  id: string;
  name: string;
  slug?: string;
  description?: string;
  imageUrl?: string;
}
