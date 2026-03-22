import BlogCard from "@/components/BlogCard";

export default function Recommendations({ data }) {
  if (!data) return null;

  const { sameCategory = [], sameAuthor = [] } = data;

  if (sameCategory.length === 0 && sameAuthor.length === 0) {
    return null;
  }

  return (
    <section className="px-6 py-24 border-t border-white/10 bg-[#05070d]">
      <div className="mx-auto max-w-6xl space-y-20">

        {/* ================= SAME CATEGORY ================= */}
        {sameCategory.length > 0 && (
          <div>
            <h2 className="text-2xl font-semibold mb-8 text-white">
              More like this
            </h2>

            <div className="flex gap-6 overflow-x-auto pb-4">
              {sameCategory.map((blog) => (
                <BlogCard
                  key={blog._id || blog.slug}
                  slug={blog.slug}
                  title={blog.title}
                  excerpt={blog.excerpt}
                  readTime={blog.readTime}
                  category={blog.category?.name ?? "General"}
                  categorySlug={blog.category?.slug}
                  cover={blog.cover?.url}
                />
              ))}
            </div>
          </div>
        )}

        {/* ================= SAME AUTHOR ================= */}
        {sameAuthor.length > 0 && (
          <div>
            <h2 className="text-2xl font-semibold mb-8 text-white">
              More from this author
            </h2>

            <div className="flex gap-6 overflow-x-auto pb-4">
              {sameAuthor.map((blog) => (
                <BlogCard
                  key={blog._id || blog.slug}
                  slug={blog.slug}
                  title={blog.title}
                  excerpt={blog.excerpt}
                  readTime={blog.readTime}
                  category={blog.category?.name ?? "General"}
                  categorySlug={blog.category?.slug}
                  cover={blog.cover?.url}
                  compact   // 👈 optional: makes it tighter
                />
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
}