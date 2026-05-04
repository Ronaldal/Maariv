import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function NotFound() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4 py-16 text-center sm:py-24">
      <p className="text-sm font-medium text-muted-foreground">404</p>
      <h1 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
        הדף לא נמצא
      </h1>
      <p className="mt-3 max-w-md text-sm text-muted-foreground sm:text-base">
        ייתכן שהכתובת השתנתה או שהקישור שגוי. נסו לחזור לדף הבית.
      </p>
      <Link
        href="/"
        className={cn(buttonVariants(), "mt-8 inline-flex")}
      >
        חזרה לדף הבית
      </Link>
    </div>
  );
}
