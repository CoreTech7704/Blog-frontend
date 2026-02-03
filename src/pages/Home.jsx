import { useEffect, useState } from "react";
import Hero from "../components/Hero";
import FeaturedBlogs from "../components/FeaturedBlogs";
import BlogCard from "@/components/BlogCard";
import api from "@/api/axios";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import BlogCardSkeleton from "@/components/BlogCardSkeleton";
import SectionDivider from "@/components/SectionDivider";

export default function Home() {
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

  const latestBlogs = blogs.slice(0, 4);
  const featuredBlog = latestBlogs[0];
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    api.get("/api/categories").then((res) => {
      setCategories(res.data.slice(0, 10));
    });
  }, []);

  return (
    <main className="bg-black text-white overflow-x-hidden">
      <Hero />

      {/* FEATURED BLOGS */}
      <section className="relative z-10 bg-black py-24 px-6 -mt-1">
        <div className="mx-auto max-w-6xl">
          <FeaturedBlogs blogs={blogs} loading={loading} />
        </div>
      </section>

      <SectionDivider />

      {/* CATEGORIES */}
      <section className="relative z-20 bg-slate-950 rounded-[3rem] py-24 px-6 mt-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 flex items-end justify-between">
          <div>
            <h2 className="text-4xl font-bold text-slate-100">Categories</h2>
            <p className="mt-2 max-w-2xl text-slate-400">
              Explore blogs by topics and areas of interest.
            </p>
          </div>
          <Link
            to="/categories"
            className="hidden md:inline-block text-sm text-slate-400 hover:text-white"
          >
            View all →
          </Link>
        </div>

        {/* GRID */}
        <div className="mt-12 pb-24">
          <div
            className="
            mx-auto max-w-6xl
            grid gap-4
            grid-cols-2
            sm:grid-cols-3
            md:grid-cols-4
            lg:grid-cols-5
          "
          >
            {/* LOADING SKELETON */}
            {loading &&
              [...Array(10)].map((_, i) => (
                <div
                  key={i}
                  className="
                  rounded-xl border border-white/10
                  bg-slate-950
                  px-4 py-3
                  h-10
                  animate-pulse
                "
                />
              ))}

            {/* ERROR */}
            {error && (
              <p className="col-span-full text-red-400">
                Failed to load categories
              </p>
            )}

            {/* EMPTY */}
            {!loading && !error && categories.length === 0 && (
              <p className="col-span-full text-slate-400">
                No categories found 🚧
              </p>
            )}

            {/* DATA */}
            {!loading &&
              !error &&
              categories.map((cat) => (
                <Link
                  key={cat._id}
                  to={`/categories/${cat.slug}`}
                  aria-label={`Category ${cat.name}`}
                  className="
                          group rounded-xl border border-white/10
                          bg-slate-950 px-4 py-3 text-sm
                          text-slate-300 text-center
                          transition-all duration-300
                          hover:text-white
                          hover:border-cyan-400/40
                          hover:-translate-y-0.5
                          hover:shadow-[0_0_20px_rgba(34,211,238,0.25)]
                        "
                >
                  #{cat.name}
                </Link>
              ))}
          </div>
        </div>
        </div>
      </section>

      <SectionDivider />

      {/* WHY VOIDWORK */}
      <section className="relative z-40 bg-slate-950 rounded-t-[3rem] py-32 px-6 mt-24">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-4xl font-bold mb-6">Why VoidWork?</h2>
          <p className="text-slate-300 text-lg">
            VoidWork focuses on understanding systems, not memorizing code.
          </p>
          <Link
            to="/blogs"
            className="inline-flex items-center gap-2 rounded-xl px-6 py-3 mt-4 font-semibold
              bg-gradient-to-r from-cyan-500 to-violet-500 text-black"
          >
            About VoidWork <ArrowRight />
          </Link>
        </div>
      </section>

      <SectionDivider />

      {/* LATEST BLOGS */}
      <section className="relative z-30 bg-black rounded-t-[3rem] py-24 px-6 mt-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 flex items-end justify-between">
            <div>
              <h2 className="text-4xl font-bold text-slate-100">
                Latest Blogs
              </h2>
              <p className="mt-2 max-w-2xl text-slate-400">
                Fresh insights from the VoidWork community.
              </p>
            </div>
            <Link
              to="/blogs"
              className="hidden md:inline-block text-sm text-slate-400 hover:text-white"
            >
              View all →
            </Link>
          </div>

          {/* STATES */}
          {loading && (
            <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {[...Array(3)].map((_, i) => (
                <BlogCardSkeleton key={i} />
              ))}
            </div>
          )}

          {error && <p className="text-red-400">Failed to load blogs</p>}
          {!loading && !error && latestBlogs.length === 0 && (
            <p className="text-slate-400">No blogs yet 🚧</p>
          )}


          {latestBlogs.length > 0 && (
            <div className="grid gap-8 lg:grid-cols-3">
              {/* BIG FEATURED BLOG */}
              <div className="lg:col-span-2">
                {featuredBlog && (
                  <BlogCard
                    key={featuredBlog._id}
                    slug={featuredBlog.slug}
                    title={featuredBlog.title}
                    excerpt={
                      featuredBlog.excerpt ||
                      featuredBlog.content?.slice(0, 140) + "..."
                    }
                    category={featuredBlog.tags?.[0] || "General"}
                    readTime={featuredBlog.readTime || 5}
                    featured
                  />
                )}
              </div>

              {/* OTHERS */}
              <div className="grid gap-8">
                {latestBlogs.slice(1).map(blog => (
                  <BlogCard
                    key={blog._id}
                    slug={blog.slug}
                    title={blog.title}
                    excerpt={blog.excerpt || blog.content?.slice(0, 140) + "..."}
                    category={blog.tags?.[0] || "General"}
                    readTime={blog.readTime || 5}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
