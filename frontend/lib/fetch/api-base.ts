/**
 * Base URL for the ASP.NET Core API (server-side fetches from Next).
 * Override with `BACKEND_API_URL` in `frontend/.env.local` (e.g. `https://localhost:7001`).
 */
export function getBackendBaseUrl(): string {
  const raw = process.env.BACKEND_API_URL ?? "https://localhost:7001";
  return raw.replace(/\/$/, "");
}
