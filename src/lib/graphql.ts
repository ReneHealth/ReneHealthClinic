import { WP_URL, WP_REVALIDATE } from "@/lib/env";

const ENDPOINT = `${WP_URL}/graphql`;

const REVALIDATE = WP_REVALIDATE;

interface GraphQLError {
  message: string;
  path?: (string | number)[];
}

interface GraphQLResponse<T> {
  data?: T;
  errors?: GraphQLError[];
}

export interface WpQueryOptions {
  tags?: string[];
  revalidate?: number;
}

export async function wpQuery<T>(
  query: string,
  variables: Record<string, unknown> = {},
  options: WpQueryOptions = {},
): Promise<T> {
  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables }),
    next: {
      revalidate: options.revalidate ?? REVALIDATE,
      tags: ["wp", ...(options.tags ?? [])],
    },
    signal: AbortSignal.timeout(15_000),
  });

  if (!res.ok) {
    throw new Error(`WPGraphQL responded ${res.status} ${res.statusText}`);
  }

  const json = (await res.json()) as GraphQLResponse<T>;

  if (json.errors?.length) {
    throw new Error(
      `WPGraphQL errors: ${json.errors.map((e) => e.message).join("; ")}`,
    );
  }

  if (!json.data) {
    throw new Error("WPGraphQL returned no data");
  }

  return json.data;
}
