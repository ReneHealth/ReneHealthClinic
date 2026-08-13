import { NextRequest, NextResponse } from "next/server";
import { wpQuery } from "@/lib/graphql";
import { GET_BLOG_PAGE } from "@/lib/blog";
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const cursor = searchParams.get("cursor");
  const category = searchParams.get("category") ?? "";
  const data = (await wpQuery(GET_BLOG_PAGE, {
    first: 9,
    after: cursor,
    category,
  })) as any;
  return NextResponse.json({
    posts: data.posts,
  });
}
