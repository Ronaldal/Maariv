import Link from "next/link";
import Image from "next/image";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { fetchArticles } from "@/lib/fetch/articles";
import { fetchTags } from "@/lib/fetch/tags";
import { cn } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [articles, tags] = await Promise.all([fetchArticles(), fetchTags()]);

  const tag33 = tags.find((t) => t.id === "33");
  const tag17 = tags.find((t) => t.id === "17");
  const title33 = tag33?.name ?? "בנימין נתניהו";
  const title17 = tag17?.name ?? "חמאס";

  return (
    <div className="flex flex-1 flex-col">
      <section className="border-b border-border bg-muted/30 py-8 sm:py-12">
        <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-medium text-muted-foreground sm:text-base">
            מעריב · דף הבית
          </p>
          <h1 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
            כותרות אחרונות
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            הידיעות והנושאים שמובילים את השיחה — כפי שמופיעים במדור החדשות.
          </p>
        </div>
      </section>

      <section className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-6 px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <ul className="grid list-none gap-4 p-0 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <li key={article.id}>
              <Card className="flex h-full flex-col overflow-hidden transition-colors hover:bg-muted/40">
                {article.imageUrl ? (
                  <div className="relative aspect-[16/9] w-full border-b border-border">
                    <Image
                      src={article.imageUrl}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="(min-width: 1024px) 320px, (min-width: 640px) 50vw, 100vw"
                    />
                  </div>
                ) : null}
                <CardHeader className="flex-1 space-y-2">
                  <CardTitle className="text-lg leading-snug">
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
                <CardContent className="mt-auto flex flex-col gap-3 border-t border-border/60 pt-4">
                  <p className="text-xs text-muted-foreground">{article.publishedAt}</p>
                  <Link
                    href={`/article/${article.id}`}
                    className={cn(buttonVariants({ size: "sm" }), "w-full sm:w-auto")}
                  >
                    לכתבה המלאה
                  </Link>
                </CardContent>
              </Card>
            </li>
          ))}
        </ul>

        <section
          className="rounded-xl border border-border bg-card p-6 shadow-sm sm:p-8"
          aria-labelledby="topics-heading"
        >
          <div className="mb-6 border-b border-border pb-5 text-center sm:text-right">
            <h2
              id="topics-heading"
              className="text-lg font-semibold tracking-tight text-foreground sm:text-xl"
            >
              נושאים נבחרים
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              עומק הכותרות לפי נושא — בחירת נושא תפתח את כל הכתבות המשויכות אליו.
            </p>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:gap-x-10 sm:gap-y-2">
            {/* Full document navigation: middleware redirects /tags/33 to maariv.co.il */}
            <a
              href="/tags/33"
              className={cn(
                buttonVariants({ variant: "link" }),
                "h-auto min-h-0 px-0 py-0 text-base font-semibold sm:text-lg"
              )}
            >
              {title33}
            </a>
            <Link
              href="/tags/17"
              className={cn(
                buttonVariants({ variant: "link" }),
                "h-auto min-h-0 px-0 py-0 text-base font-semibold sm:text-lg"
              )}
            >
              {title17}
            </Link>
          </div>
        </section>
      </section>
    </div>
  );
}
