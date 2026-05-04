import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { fetchArticles } from "@/lib/fetch/articles";
import { cn } from "@/lib/utils";

type AdditionalArticlesProps = {
  currentArticleId: string;
};

/**
 * Server component loaded inside `Suspense` so the main article can stream first.
 * Uses the same catalog fetch as listings (`fetchArticles`, `cache: "no-store"`).
 */
export default async function AdditionalArticles({
  currentArticleId,
}: AdditionalArticlesProps) {
  const all = await fetchArticles();
  const others = all.filter((a) => a.id !== currentArticleId);

  return (
    <section className="mt-12 border-t border-border pt-8">
      <h2 className="text-lg font-semibold tracking-tight sm:text-xl">
        כתבות נוספות
      </h2>
      {others.length === 0 ? (
        <p className="mt-3 text-sm text-muted-foreground">אין כתבות נוספות להצגה.</p>
      ) : (
        <ul className="mt-4 grid list-none gap-3 p-0 sm:grid-cols-2">
          {others.map((article) => (
            <li key={article.id}>
              <Card className="h-full transition-colors hover:bg-muted/40">
                <CardHeader className="space-y-2">
                  <CardTitle className="text-base leading-snug sm:text-lg">
                    <Link
                      href={`/article/${article.id}`}
                      className="underline-offset-4 hover:underline"
                    >
                      {article.title}
                    </Link>
                  </CardTitle>
                  {article.subtitle ? (
                    <CardDescription className="line-clamp-3 text-sm">
                      {article.subtitle}
                    </CardDescription>
                  ) : null}
                </CardHeader>
                <CardContent>
                  <Link
                    href={`/article/${article.id}`}
                    className={cn(
                      buttonVariants({ variant: "ghost", size: "sm" }),
                      "px-0 text-primary"
                    )}
                  >
                    לקריאה
                  </Link>
                </CardContent>
              </Card>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
