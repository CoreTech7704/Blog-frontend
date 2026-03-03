import { useEffect, useState } from "react";
import BlogCard from "@/components/BlogCard";
import BlogCardSkeleton from "@/components/BlogCardSkeleton";
import api from "@/api/axios";

export default function FeaturedBlogsPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    api
      .get("/api/blogs/latest")
      .then((res) => {
        const featured = res.data.filter((b) => b.featured);
        setBlogs(featured);
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="min-h-screen bg-background text-foreground pt-32">
      {/* HEADER */}
      <section className="px-6">
        <div className="mx-auto max-w-6xl">
          <h1 className="text-4xl font-bold">Featured Blogs</h1>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            Hand-picked articles worth your time — deep dives, guides, and insights.
          </p>
        </div>
      </section>

      {/* GRID */}
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
          {/* LOADING */}
          {loading &&
            [...Array(6)].map((_, i) => (
              <BlogCardSkeleton key={i} />
            ))}

          {/* ERROR */}
          {error && (
            <p className="col-span-full text-destructive">
              Failed to load featured blogs.
            </p>
          )}

          {/* EMPTY */}
          {!loading && !error && blogs.length === 0 && (
            <p className="col-span-full text-muted-foreground">
              No featured blogs yet.
            </p>
          )}

          {/* DATA */}
          {!loading &&
            !error &&
            blogs.map((blog) => (
              <BlogCard
                key={blog._id}
                slug={blog.slug}
                title={blog.title}
                excerpt={blog.excerpt}
                category={blog.tags?.[0] || "General"}
                readTime={blog.readingTime}
                cover={blog.cover?.url}   // allow cover thumbnails
              />
            ))}
        </div>
      </section>
    </main>
  );
}