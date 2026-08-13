'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import BlogCard from './BlogCard';
type CategoryType = {
  id?: string | null;
  name?: string | null;
  slug?: string | null;
};
type ImageType = {
  node?: {
    sourceUrl?: string | null;
    altText?: string | null;
  } | null;
};
type BlogPostType = {
  id?: string | null;
  slug?: string | null;
  title?: string | null;
  excerpt?: string | null;
  date?: string | null;
  featuredImage?: ImageType | null;
  categories?: {
    nodes?: CategoryType[] | null;
  } | null;
};
type PageInfoType = {
  hasNextPage?: boolean | null;
  endCursor?: string | null;
};
type InfiniteScrollPostsPropsType = {
  initialPosts: BlogPostType[];
  initialPageInfo: PageInfoType | null;
  category: string;
  loadMode?: 'scroll' | 'click';
};
export default function InfiniteScrollPosts({
  initialPosts,
  initialPageInfo,
  category,
  loadMode = 'scroll'
}: InfiniteScrollPostsPropsType) {
  const [posts, setPosts] = useState(initialPosts);
  const [pageInfo, setPageInfo] = useState(initialPageInfo);
  const [loading, setLoading] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const targetRef = useRef<HTMLDivElement>(null);
  const messageRef = useRef<HTMLParagraphElement>(null);
  const previousCategory = useRef(category);
  const stateRef = useRef({
    loading: false,
    pageInfo: initialPageInfo
  });
  useEffect(() => {
    stateRef.current = {
      loading,
      pageInfo
    };
  }, [loading, pageInfo]);
  useEffect(() => {
    if (previousCategory.current !== category) {
      previousCategory.current = category;
      setPosts(initialPosts);
      setPageInfo(initialPageInfo);
      stateRef.current = {
        loading: false,
        pageInfo: initialPageInfo
      };
    }
  }, [category, initialPosts, initialPageInfo]);
  const fetchNextPage = useCallback(async () => {
    const { loading: currentLoading, pageInfo: currentPageInfo } = stateRef.current;
    if (currentLoading || !currentPageInfo?.hasNextPage) {
      return;
    }
    setLoading(true);
    try {
      const result = await fetch(
        `/api/posts?cursor=${encodeURIComponent(currentPageInfo.endCursor ?? '')}&category=${encodeURIComponent(category)}`
      ).then((res) => res.json());
      const nextPosts: BlogPostType[] = result.posts?.nodes ?? [];
      setPosts((prev) => {
        const existingIds = new Set(prev.map((post) => post.id));
        return [...prev, ...nextPosts.filter((post) => post.id && !existingIds.has(post.id))];
      });
      setPageInfo(result.posts?.pageInfo ?? null);
    } catch (error) {
      console.error('Fetch failed:', error);
    } finally {
      setLoading(false);
    }
  }, [category]);
  useEffect(() => {
    if (loadMode !== 'scroll') return;
    const target = targetRef.current;
    if (!target) return;
    observerRef.current?.disconnect();
    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          fetchNextPage();
        }
      },
      {
        rootMargin: '300px'
      }
    );
    observerRef.current.observe(target);
    return () => observerRef.current?.disconnect();
  }, [loadMode, fetchNextPage]);
  useEffect(() => {
    if (!loading && !pageInfo?.hasNextPage && posts.length > 0) {
      messageRef.current?.classList.remove('hidden');
      const timer = setTimeout(() => {
        messageRef.current?.classList.add('hidden');
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [loading, pageInfo?.hasNextPage, posts.length]);
  return (
    <>
      <div className="mt-12 grid gap-3 md:grid-cols-2  xl:grid-cols-3">
        {posts.map((item) => (
          <BlogCard key={item.id ?? item.slug} data={item} />
        ))}
      </div>
      <div
        ref={targetRef}
        className={`${loading && 'mt-12'} ${loadMode === 'click' && pageInfo?.hasNextPage && !loading && 'mt-12'} flex min-h-5 flex-col items-center justify-center gap-4`}>
        {loading && <p className="text-sm text-gray-500">Loading more posts...</p>}
        {loadMode === 'click' && pageInfo?.hasNextPage && !loading && (
          <button
            onClick={fetchNextPage}
            className="rounded-4xl bg-black px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-king focus:outline-none cursor-pointer">
            Load More
          </button>
        )}
        <p ref={messageRef} className="hidden text-sm text-gray-400 mt-10">
          No more posts.
        </p>
      </div>
    </>
  );
}
