"use client";

import { useCallback, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { logClientError } from "@/lib/logger";

const SHARE_ICON =
  "https://images.maariv.co.il/image/upload/e_make_transparent:10/873147.svg";

type ShareButtonProps = {
  title: string;
  text: string;
  url: string;
};

/**
 * Native Web Share when available; otherwise copies the URL to the clipboard.
 */
export function ShareButton({ title, text, url }: ShareButtonProps) {
  const [status, setStatus] = useState<string | null>(null);

  const onShare = useCallback(async () => {
    setStatus(null);
    try {
      if (typeof navigator !== "undefined" && navigator.share) {
        await navigator.share({ title, text, url });
        return;
      }
      if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(url);
        setStatus("הקישור הועתק ללוח");
        return;
      }
      setStatus("שיתוף לא זמין בדפדפן זה");
    } catch (err) {
      if (err instanceof DOMException && err.name === "AbortError") {
        return;
      }
      const error = err instanceof Error ? err : new Error(String(err));
      logClientError(error, "share-button");
      setStatus("לא ניתן לשתף כרגע");
    }
  }, [text, title, url]);

  return (
    <div className="flex flex-col items-stretch gap-1 sm:items-end">
      <Button
        type="button"
        variant="outline"
        size="sm"
        className="gap-2"
        onClick={onShare}
      >
        <Image
          src={SHARE_ICON}
          alt=""
          width={20}
          height={20}
          unoptimized
          className="size-5"
        />
        שתף
      </Button>
      {status ? (
        <p className="text-xs text-muted-foreground" role="status">
          {status}
        </p>
      ) : null}
    </div>
  );
}
