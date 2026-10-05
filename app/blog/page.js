// @flow strict

import { personalData } from "@/utils/data/personal-data";
import BlogCard from "../components/homepage/blog/blog-card";

/**
 * Same resilience as the homepage: hard timeout + graceful fallback, so a slow
 * dev.to can never leave this route hanging forever.
 */
async function getBlogs() {
  try {
    const res = await fetch(
      `https://dev.to/api/articles?username=${personalData.devUsername}&per_page=30`,
      {
        signal: AbortSignal.timeout(4000),
        next: { revalidate: 3600 },
      }
    );

    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch (err) {
    console.warn("[blog] fetch failed:", err?.name);
    return [];
  }
}

async function page() {
  const blogs = await getBlogs();
  const posts = blogs.filter((b) => b?.cover_image);

  return (
    <div className="py-8 text-[var(--ink)]">
      <div className="flex justify-center my-5 lg:py-8">
        <div className="flex items-center">
          <span className="w-24 h-[2px] bg-gradient-to-r from-transparent to-[var(--accent)]" />
          <span className="bg-[var(--surface)] border border-[var(--line-strong)] w-fit text-ink px-5 py-2 text-2xl font-bold rounded-lg shadow-[var(--shadow-card)]">
            All Blog
          </span>
          <span className="w-24 h-[2px] bg-gradient-to-l from-transparent to-[var(--accent)]" />
        </div>
      </div>

      {posts.length === 0 ? (
        <p className="py-16 text-center text-[var(--muted)]">
          No posts available right now. Please check back soon.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-5 lg:gap-8 xl:gap-10">
          {posts.map((blog, i) => (
            <BlogCard blog={blog} key={blog.id ?? i} />
          ))}
        </div>
      )}
    </div>
  );
}

export default page;