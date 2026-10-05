// @flow strict
import Link from 'next/link';
import { FaArrowRight } from 'react-icons/fa';
import BlogCard from './blog-card';

function Blog({ blogs }) {
  const posts = (blogs || []).filter((b) => b?.cover_image).slice(0, 6);

  return (
    <div
      id="blogs"
      className="relative z-50 my-16 border-t border-[var(--line)]"
    >
      <div className="pointer-events-none absolute left-1/2 top-6 h-[100px] w-[100px] -translate-x-1/2 rounded-full bg-violet-400 opacity-20 blur-3xl" />

      <div className="flex -translate-y-px justify-center">
        <div className="w-3/4">
          <div className="h-px w-full bg-gradient-to-r from-transparent via-violet-500 to-transparent" />
        </div>
      </div>

      <div className="my-5 flex justify-center lg:py-8">
        <div className="flex items-center">
          <span className="h-[2px] w-16 bg-gradient-to-r from-transparent to-[var(--accent)] sm:w-24" />
          <span className="w-fit rounded-lg border border-[var(--line-strong)] bg-[var(--surface)] px-5 py-2 text-xl font-bold text-[var(--ink)] shadow-[var(--shadow-card)]">
            Blogs
          </span>
          <span className="h-[2px] w-16 bg-gradient-to-l from-transparent to-[var(--accent)] sm:w-24" />
        </div>
      </div>

      {posts.length === 0 ? (
        <p className="py-16 text-center text-[var(--muted)]">
          No posts available right now. Please check back soon.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:gap-5 md:grid-cols-3 lg:gap-8 xl:gap-10">
          {posts.map((blog, i) => (
            <BlogCard blog={blog} key={blog.id ?? i} />
          ))}
        </div>
      )}

      <div className="mt-5 flex justify-center lg:mt-12">
        {/* SINGLE BUTTON → bottom-to-top brand fill on hover */}
        <Link
          className="btn-up btn-outline inline-flex items-center gap-2 rounded-full border-2 border-[var(--accent-text)] px-6 py-3 text-center text-xs font-bold uppercase tracking-wider text-[var(--accent-text)] no-underline md:px-8 md:py-3.5 md:text-sm"
          role="button"
          href="/blog"
        >
          <span className="relative z-[1]">View More</span>
          <FaArrowRight size={16} className="relative z-[1]" />
        </Link>
      </div>
    </div>
  );
};

export default Blog;