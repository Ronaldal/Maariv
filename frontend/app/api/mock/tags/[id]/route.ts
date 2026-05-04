import { NextResponse } from "next/server";
import tags from "@/lib/data/tags.json";
import type { Tag } from "@/types/tag";

type RouteParams = { params: Promise<{ id: string }> };

export async function GET(_request: Request, { params }: RouteParams) {
  const { id } = await params;
  const tag = (tags as Tag[]).find((t) => t.id === id);
  if (!tag) {
    return NextResponse.json({ error: "Tag not found" }, { status: 404 });
  }
  return NextResponse.json(tag);
}
