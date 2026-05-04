import { Suspense } from "react";
import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import AdditionalArticles from "@/components/article/additional-articles";
import { AdditionalArticlesSkeleton } from "@/components/article/additional-articles-skeleton";
import { ArticleBody } from "@/components/article/article-body";
import { ArticleTagList } from "@/components/article/article-tag-list";
import { ShareButton } from "@/components/article/share-button";
import { fetchArticleById } from "@/lib/fetch/articles";
import { fetchTags } from "@/lib/fetch/tags";
import { getRequestOrigin } from "@/lib/internal-origin";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const article = await fetchArticleById(id);
  if (!article) {
    return { title: "כתבה לא נמצאה" };
  }
  return {
    title: article.title,
    description: article.subtitle,
  };
}

export default async function ArticlePage({ params }: PageProps) {
  const { id } = await params;
  const [article, tags, origin] = await Promise.all([
    fetchArticleById(id),
    fetchTags(),
    getRequestOrigin(),
  ]);

  if (!article) {
    notFound();
  }

  const shareUrl = `${origin}/article/${article.id}`;

  return (
    <article className="mx-auto w-full max-w-3xl px-4 py-6 sm:px-6 sm:py-10 lg:max-w-4xl lg:px-8">
      <header className="space-y-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-2">
            <p className="text-xs text-muted-foreground sm:text-sm">
              {article.publishedAt}
            </p>
            <h1 className="text-balance text-2xl font-bold leading-tight sm:text-3xl lg:text-4xl">
              {article.title}
            </h1>
            {article.subtitle ? (
              <p className="text-pretty text-base text-muted-foreground sm:text-lg">
                {article.subtitle}
              </p>
            ) : null}
          </div>
          <ShareButton
            title={article.title}
            text={article.subtitle ?? article.title}
            url={shareUrl}
          />
        </div>

        <ArticleTagList tagIds={article.tagIds} tags={tags} />

        {article.imageUrl ? (
          <figure className="overflow-hidden rounded-lg border border-border bg-muted">
            <div className="relative aspect-[16/9] w-full sm:aspect-[2/1]">
              <Image
                src={article.imageUrl}
                alt=""
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 896px, 100vw"
                priority
              />
            </div>
            {article.imageCredit ? (
              <figcaption className="px-3 py-2 text-xs text-muted-foreground sm:text-sm">
                {article.imageCredit}
              </figcaption>
            ) : null}
          </figure>
        ) : null}
      </header>

      <div className="mt-8">
        <ArticleBody body={article.body} />
      </div>

      <Suspense fallback={<AdditionalArticlesSkeleton />}>
        <AdditionalArticles currentArticleId={article.id} />
      </Suspense>
    </article>
  );
}
