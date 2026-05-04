import { NextResponse } from "next/server";
import articles from "@/lib/data/articles.json";
import type { Article } from "@/types/article";

type RouteParams = { params: Promise<{ id: string }> };

export async function GET(_request: Request, { params }: RouteParams) {
  const { id } = await params;
  const article = (articles as Article[]).find((a) => a.id === id);
  if (!article) {
    return NextResponse.json({ error: "Article not found" }, { status: 404 });
  }
  return NextResponse.json(article);
}
