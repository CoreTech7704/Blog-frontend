import BlogCard from "@/components/BlogCard";

function HorizontalSlider({ blogs, compact = false }) {
  return (
    <div className="overflow-x-auto scrollbar-hide">
      <div className="flex gap-6 snap-x snap-mandatory pb-4">
        {blogs.map((blog) => (
          <div
            key={blog._id || blog.slug}
            className="
              shrink-0
              w-90
              sm:w-90
              md:w-95
              snap-start
            "
          >
            <BlogCard
              slug={blog.slug}
              title={blog.title}
              excerpt={blog.excerpt}
              readTime={blog.readTime}
              category={blog.category?.name ?? "General"}
              categorySlug={blog.category?.slug}
              cover={blog.cover?.url}
              compact={compact}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Recommendations({ data }) {
  if (!data) return null;

  const { sameCategory = [], sameAuthor = [] } = data;

  if (!sameCategory.length && !sameAuthor.length) return null;

  return (
    <section className="px-6 py-24 border-t border-white/10 bg-[#05070d]">
      <div className="mx-auto max-w-6xl space-y-20">
        {sameCategory.length > 0 && (
          <div>
            <h2 className="text-2xl font-semibold mb-8 text-white">
              More like this
            </h2>
            <HorizontalSlider blogs={sameCategory} />
          </div>
        )}

        {sameAuthor.length > 0 && (
          <div>
            <h2 className="text-2xl font-semibold mb-8 text-white">
              More from this author
            </h2>
            <HorizontalSlider blogs={sameAuthor} compact />
          </div>
        )}
      </div>
    </section>
  );
}