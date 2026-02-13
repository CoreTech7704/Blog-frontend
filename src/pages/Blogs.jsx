import { useEffect, useState } from "react";
import BlogCard from "@/components/BlogCard";
import BlogCardSkeleton from "@/components/BlogCardSkeleton";
import api from "@/api/axios";

export default function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    api
      .get("/api/blogs/latest") 
      .then((res) => setBlogs(res.data))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="
      min-h-screen
      bg-background text-foreground
      pt-32
      transition-colors duration-300
    ">
      {/* PAGE HEADER */}
      <section className="px-6">
        <div className="mx-auto max-w-6xl">
          <h1 className="text-4xl font-bold">
            Recent Blogs
          </h1>
          <p className="mt-2 max-w-2xl text-muted-foreground">
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
          {/* LOADING */}
          {loading &&
            [...Array(6)].map((_, i) => (
              <BlogCardSkeleton key={i} />
            ))}

          {/* ERROR */}
          {error && (
            <p className="col-span-full text-red-400">
              Failed to load blogs.
            </p>
          )}

          {/* EMPTY */}
          {!loading && !error && blogs.length === 0 && (
            <p className="col-span-full text-muted-foreground">
              No blogs found
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
                excerpt={
                  blog.excerpt ||
                  blog.content?.slice(0, 140) + "..."
                }
                category={blog.tags?.[0] || "General"}
                readTime={blog.readTime || 5}
              />
            ))}
        </div>
      </section>
    </main>
  );
}
