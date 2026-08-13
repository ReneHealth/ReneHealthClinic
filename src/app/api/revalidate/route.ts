import { createHash, timingSafeEqual } from "node:crypto";
import { revalidatePath, revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface RevalidatePayload {
  uri?: string;
  type?: string;
  tags?: string[];
}

const GLOBAL_TAGS: Record<string, string[]> = {
  team_member: [
    "team",
    "page:home",
    "page:our-team",
    "page:mental-health",
    "page:kids-and-play-therapy",
  ],
  review: ["page:home"],
  faq: ["wp"],
  site: ["site"],
  nav_menu_item: ["site"],
  acf_options: ["site"],
};

const HOME_URIS = new Set(["/", ""]);

function secretMatches(provided: string, expected: string): boolean {
  const a = createHash("sha256").update(provided).digest();
  const b = createHash("sha256").update(expected).digest();
  return timingSafeEqual(a, b);
}

function tagsFor({ uri, type, tags }: RevalidatePayload): string[] | null {
  if (tags?.length) return tags;
  if (type && GLOBAL_TAGS[type]) return GLOBAL_TAGS[type];

  if (typeof uri === "string") {
    const slug = uri.replace(/^\/|\/$/g, "");
    return [HOME_URIS.has(slug) ? "page:home" : `page:${slug}`];
  }

  return null;
}

function pathFor(uri?: string): string | null {
  if (typeof uri !== "string") return null;
  const path = uri.startsWith("/") ? uri : `/${uri}`;
  return path.replace(/\/+$/, "") || "/";
}

export async function POST(request: Request) {
  const secret = process.env.REVALIDATE_SECRET;

  if (!secret) {
    return NextResponse.json(
      { revalidated: false, message: "REVALIDATE_SECRET is not configured." },
      { status: 500 },
    );
  }

  const provided = request.headers.get("x-revalidate-secret");

  if (!provided || !secretMatches(provided, secret)) {
    return NextResponse.json(
      { revalidated: false, message: "Invalid secret." },
      { status: 401 },
    );
  }

  let payload: RevalidatePayload;
  try {
    payload = (await request.json()) as RevalidatePayload;
  } catch {
    return NextResponse.json(
      { revalidated: false, message: "Invalid JSON payload." },
      { status: 400 },
    );
  }

  const tags = tagsFor(payload);

  if (!tags) {
    return NextResponse.json(
      {
        revalidated: false,
        message: "Payload must carry one of: tags, type, uri.",
      },
      { status: 400 },
    );
  }

  for (const tag of tags) revalidateTag(tag);

  const path = pathFor(payload.uri);
  if (path) revalidatePath(path);

  return NextResponse.json({
    revalidated: true,
    tags,
    path,
    now: Date.now(),
  });
}
