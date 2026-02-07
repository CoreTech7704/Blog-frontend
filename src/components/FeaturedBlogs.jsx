import BlogCard from "./BlogCard";
import BlogCardSkeleton from "@/components/BlogCardSkeleton";

export default function FeaturedBlogs({ blogs = [], loading }) {
  if (loading) {
    return (
      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <BlogCardSkeleton featured />
        </div>
        <div className="flex flex-col gap-6">
          <BlogCardSkeleton />
          <BlogCardSkeleton />
        </div>
      </div>
    );
  }

  const featuredBlogs = blogs.filter((b) => b.featured);
  if (!featuredBlogs.length) return null;

  const [mainBlog, ...sideBlogs] = featuredBlogs;

  return (
    <section className="bg-black dark:bg-black py-24 px-6 transition-colors duration-300">
      <div className="mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="mb-12 flex items-end justify-between">
          <div>
            <h2 className="text-3xl font-bold text-slate-100">
              Featured Blogs
            </h2>
            <p className="mt-2 max-w-xl text-slate-400">
              Hand-picked articles worth your time — deep dives, guides, and
              insights.
            </p>
          </div>

          <a
            href="/blogs"
            className="
              hidden md:inline-block text-sm
              text-slate-400
              hover:text-white
              transition-colors
            "
            >
            View all →
          </a>
        </div>

        {/* Grid */}
        <div className="grid gap-6 md:grid-cols-3">
          {/* Main Featured */}
          <div className="md:col-span-2">
            <BlogCard
              featured
              key={mainBlog.slug}
              slug={mainBlog.slug}
              title={mainBlog.title}
              excerpt={mainBlog.excerpt}
              category={mainBlog.tags?.[0] || "General"}
              coverImage={mainBlog.coverImage}
            />
          </div>

          {/* Side Featured */}
          <div className="flex flex-col gap-6">
            {sideBlogs.slice(0, 2).map((blog) => (
              <BlogCard
                key={blog.slug}
                title={blog.title}
                excerpt={blog.excerpt}
                category={blog.tags?.[0] || "General"}
                readTime={blog.readTime}
                coverImage={blog.coverImage}
                slug={blog.slug}
              />
            ))}
          </div>
        </div>

        {/* Mobile View All */}
        <div className="mt-10 text-center md:hidden">
          <a
            href="/blogs"
            className="
              inline-block text-sm
              text-slate-400
              hover:text-white
              transition-colors
            "
            >
            View all blogs →
          </a>
        </div>
      </div>
    </section>
  );
}
