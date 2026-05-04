import { NextResponse } from "next/server";
import articles from "@/lib/data/articles.json";
import type { Article } from "@/types/article";

export async function GET() {
  return NextResponse.json(articles as Article[]);
}
