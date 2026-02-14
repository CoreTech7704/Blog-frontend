import BlogCard from "@/components/BlogCard";
import BlogCardSkeleton from "@/components/BlogCardSkeleton";

export default function SearchResults({ loading, searched, results }) {
  return (
    <div className="mt-16">
      {/* Idle */}
      {!searched && (
        <p className="text-center text-muted-foreground">
          Type something and hit search to explore.
        </p>
      )}

      {/* Loading */}
      {searched && loading && (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <BlogCardSkeleton key={i} />
          ))}
        </div>
      )}

      {/* Empty */}
      {searched && !loading && results.length === 0 && (
        <p className="text-center text-muted-foreground">
          No matches found - try a different keyword.
        </p>
      )}

      {/* Results */}
      {!loading && results.length > 0 && (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((blog) => (
            <BlogCard
              key={blog._id}
              slug={blog.slug}
              title={blog.title}
              excerpt={
                blog.excerpt || blog.content?.slice(0, 140) + "..."
              }
              category={blog.tags?.[0] || "General"}
              readTime={blog.readTime || 5}
            />
          ))}
        </div>
      )}
    </div>
  );
}
