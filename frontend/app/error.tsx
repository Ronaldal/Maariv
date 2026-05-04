"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { logClientError } from "@/lib/logger";

export default function GlobalRouteError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    logClientError(error, "route-error-boundary");
  }, [error]);

  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4 py-16 text-center sm:py-24">
      <h1 className="text-xl font-semibold sm:text-2xl">משהו השתבש</h1>
      <p className="mt-2 max-w-md text-sm text-muted-foreground sm:text-base">
        אירעה שגיאה בטעינת העמוד. הפרטים נרשמו בקונסול לצורכי פיתוח.
      </p>
      {error.digest ? (
        <p className="mt-2 font-mono text-xs text-muted-foreground">
          digest: {error.digest}
        </p>
      ) : null}
      <Button type="button" className="mt-8" onClick={() => reset()}>
        נסו שוב
      </Button>
    </div>
  );
}
