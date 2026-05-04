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
import { cn } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const articles = await fetchArticles();

  return (
    <div className="flex flex-1 flex-col">
      <section className="border-b border-border bg-muted/30 py-8 sm:py-12">
        <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-medium text-muted-foreground sm:text-base">דף הבית</p>
          <h1 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
            כותרות אחרונות
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            נתונים ממוק מקומי עם שליפה בצד השרת דרך Route Handlers ומדיניות cache שונה לכל סוג
            בקשה.
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

        <div className="rounded-lg border border-dashed border-border p-4 text-center text-sm text-muted-foreground">
          <p>
            ניסיון מידלוור:{" "}
            <Link href="/tags/33" className="font-medium text-foreground underline-offset-2 hover:underline">
              /tags/33
            </Link>{" "}
            מפנה לאתר מעריב החיצוני.
          </p>
          <p className="mt-2">
            תגית לדוגמה:{" "}
            <Link href="/tags/17" className="font-medium text-foreground underline-offset-2 hover:underline">
              /tags/17
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
}
