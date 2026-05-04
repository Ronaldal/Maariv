import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { fetchArticles } from "@/lib/fetch/articles";
import { fetchTagById } from "@/lib/fetch/tags";
import { cn } from "@/lib/utils";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const tag = await fetchTagById(id);
  if (!tag) {
    return { title: "תגית לא נמצאה" };
  }
  return {
    title: tag.name,
    description: `כתבות מתויגות: ${tag.name}`,
  };
}

export default async function TagPage({ params }: PageProps) {
  const { id } = await params;
  const [tag, articles] = await Promise.all([fetchTagById(id), fetchArticles()]);

  if (!tag) {
    notFound();
  }

  const related = articles.filter((a) => a.tagIds.includes(tag.id));

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-6 sm:px-6 sm:py-10 lg:px-8">
      <header className="flex flex-col gap-6 border-b border-border pb-8 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          {tag.imageUrl ? (
            <div className="relative mx-auto size-24 shrink-0 overflow-hidden rounded-full border border-border bg-muted sm:mx-0 sm:size-28">
              <Image
                src={tag.imageUrl}
                alt=""
                fill
                className="object-cover"
                sizes="112px"
              />
            </div>
          ) : null}
          <div className="text-center sm:text-right">
            <p className="text-sm text-muted-foreground">תגית</p>
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">{tag.name}</h1>
            {tag.description ? (
              <p className="mt-2 max-w-2xl text-sm text-muted-foreground sm:text-base">
                {tag.description}
              </p>
            ) : (
              <p className="mt-2 max-w-2xl text-sm text-muted-foreground sm:text-base">
                רשימת כתבות עם התגית במוק הנתונים.
              </p>
            )}
          </div>
        </div>
        <Link href="/" className={cn(buttonVariants({ variant: "outline" }), "self-center sm:self-start")}>
          חזרה לדף הבית
        </Link>
      </header>

      <section className="mt-8">
        <h2 className="text-lg font-semibold sm:text-xl">כתבות בתגית</h2>
        {related.length === 0 ? (
          <p className="mt-3 text-sm text-muted-foreground">אין כתבות לתגית זו.</p>
        ) : (
          <ul className="mt-4 grid list-none gap-4 p-0 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((article) => (
              <li key={article.id}>
                <Card className="h-full overflow-hidden transition-colors hover:bg-muted/40">
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
                  <CardHeader>
                    <CardTitle className="text-base leading-snug">
                      <Link
                        href={`/article/${article.id}`}
                        className="underline-offset-4 hover:underline"
                      >
                        {article.title}
                      </Link>
                    </CardTitle>
                    {article.subtitle ? (
                      <CardDescription className="line-clamp-3">
                        {article.subtitle}
                      </CardDescription>
                    ) : null}
                  </CardHeader>
                  <CardContent>
                    <p className="text-xs text-muted-foreground">{article.publishedAt}</p>
                  </CardContent>
                </Card>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
