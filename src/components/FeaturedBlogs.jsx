import BlogCard from "./BlogCard";
import blogs from "@/data/blogs.json";

export default function FeaturedBlogs() {
  const featuredBlogs = blogs.filter((blog) => blog.featured);

  if (featuredBlogs.length === 0) return null;

  const [mainBlog, ...sideBlogs] = featuredBlogs;

  return (
    <section className="bg-black py-24 px-6">
      <div className="mx-auto max-w-6xl">

        {/* Section Header */}
        <div className="mb-12 flex items-end justify-between">
          <div>
            <h2 className="text-3xl font-bold text-slate-100">
              Featured Blogs
            </h2>
            <p className="mt-2 max-w-xl text-slate-400">
              Hand-picked articles worth your time — deep dives, guides, and insights.
            </p>
          </div>

          <a
            href="/blogs"
            className="hidden md:inline-block text-sm text-slate-400 hover:text-white transition"
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
              title={mainBlog.title}
              excerpt={mainBlog.excerpt}
              category={mainBlog.tags?.[0] || "General"}
              readTime={mainBlog.readTime}
              coverImage={mainBlog.coverImage}
              slug={mainBlog.slug}
            />
          </div>

          {/* Side Featured */}
          <div className="flex flex-col gap-6">
            {sideBlogs.slice(0, 2).map((blog) => (
              <BlogCard
                key={blog.id}
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
            className="inline-block text-sm text-slate-400 hover:text-white transition"
          >
            View all blogs →
          </a>
        </div>

      </div>
    </section>
  );
}
