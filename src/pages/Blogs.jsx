import blogs from "@/data/blogs.json";
import BlogCard from "@/components/BlogCard";

export default function Blogs() {
  return (
    <main className="min-h-screen bg-slate-950 text-white pt-32">
      {/* PAGE HEADER */}
      <section className="px-6">
        <div className="mx-auto max-w-6xl">
          <h1 className="text-4xl font-bold text-slate-100">
            Latest Blogs
          </h1>
          <p className="mt-2 max-w-2xl text-slate-400">
            Fresh insights, updates, and deep dives from the VoidWork community.
          </p>
        </div>
      </section>

      {/* BLOG GRID */}
      <section className="mt-12 px-6 pb-24">
        <div
          className="
            mx-auto max-w-6xl
            grid gap-8
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-3
          "
        >
          {blogs.map((blog) => (
            <BlogCard
              key={blog.title}
              title={blog.title}
              excerpt={blog.content.slice(0, 140) + "..."}
              category={blog.tags?.[0] || "General"}
              readTime={Math.max(3, Math.ceil(blog.content.length / 800))}
              // slug={blog.slug} ← add later
            />
          ))}
        </div>
      </section>
    </main>
  );
}
