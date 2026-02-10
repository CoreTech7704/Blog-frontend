import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "@/api/axios";
import BlogCard from "@/components/BlogCard";
import BlogCardSkeleton from "@/components/BlogCardSkeleton";
import { ArrowLeft } from "lucide-react";

export default function CategoryBlogs() {
  const { slug } = useParams();

  const [category, setCategory] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

useEffect(() => {

  api
    .get(`/api/categories/${slug}/blogs`)
    .then((res) => {
      setCategory(res.data.category);
      setBlogs(res.data.blogs);
    })
    .catch(() => setError(true))
    .finally(() => setLoading(false));
}, [slug]);


  if (error) {
    return (
      <main className="
        min-h-screen flex items-center justify-center
        bg-slate-50 dark:bg-black
        text-slate-900 dark:text-white
        transition-colors duration-300
      ">
        Category not found
      </main>
    );
  }

  return (
    <main className="
      min-h-screen
      bg-slate-50 dark:bg-black
      text-slate-900 dark:text-white
      pt-32
      transition-colors duration-300
    ">
      {/* HEADER */}
      <section className="px-6">
        <div className="mx-auto max-w-6xl">
          <Link
            to="/categories"
            className="
              inline-flex items-center gap-2 text-sm mb-6
              text-slate-500 dark:text-slate-400
              hover:text-slate-900 dark:hover:text-white
              transition-colors
            "
            >
            <ArrowLeft size={16} />
            Back to categories
          </Link>

          {loading ? (
            <div className="
              h-10 w-64 rounded animate-pulse
              bg-slate-200 dark:bg-white/10
            " />
          ) : (
            <>
              <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-100">
                #{category?.name}
              </h1>
              <p className="mt-2 max-w-2xl text-slate-500 dark:text-slate-400">
                Blogs filed under {category?.name}
              </p>
            </>
          )}
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

          {/* EMPTY */}
          {!loading && blogs.length === 0 && (
            <p className="col-span-full text-slate-500 dark:text-slate-400">
              No blogs in this category yet 🚧
            </p>
          )}

          {/* DATA */}
          {!loading &&
            blogs.map((blog) => (
              <BlogCard
                key={blog._id}
                slug={blog.slug}
                title={blog.title}
                excerpt={
                  blog.excerpt ||
                  blog.content?.slice(0, 140) + "..."
                }
                category={category?.name}
                readTime={blog.readTime || 5}
              />
            ))}
        </div>
      </section>
    </main>
  );
}
