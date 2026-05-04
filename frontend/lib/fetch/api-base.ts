/**
 * Base URL for the ASP.NET Core API (server-side fetches from Next).
 * Override with `BACKEND_API_URL` in `frontend/.env.local` (e.g. `http://localhost:5226`).
 */
export function getBackendBaseUrl(): string {
  const raw = process.env.BACKEND_API_URL ?? "http://localhost:5226";
  return raw.replace(/\/$/, "");
}
