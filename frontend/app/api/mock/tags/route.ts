import { NextResponse } from "next/server";
import tags from "@/lib/data/tags.json";
import type { Tag } from "@/types/tag";

export async function GET() {
  return NextResponse.json(tags as Tag[]);
}
