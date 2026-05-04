/**
 * Lightweight error logging for debugging and maintainability.
 * Server logs go to the runtime console (Node / edge); client logs to the browser console.
 */

const PREFIX = "[maariv-app]";

export function logClientError(
  error: Error & { digest?: string },
  context?: string
): void {
  const label = context ? `${PREFIX} ${context}` : PREFIX;
  console.error(label, error.message, error.stack, error.digest ?? "");
}

export function logServerError(error: unknown, context?: string): void {
  const err =
    error instanceof Error ? error : new Error(String(error));
  console.error(
    `${PREFIX} [server]`,
    context ?? "error",
    err.message,
    err.stack ?? ""
  );
}
