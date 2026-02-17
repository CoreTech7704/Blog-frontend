import { useEffect, useState } from "react";
import Hero from "../components/Hero";
import FeaturedBlogs from "../components/FeaturedBlogs";
import BlogCard from "@/components/BlogCard";
import api from "@/api/axios";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import BlogCardSkeleton from "@/components/BlogCardSkeleton";
import GlowLine from "@/components/GlowLine";

export default function Home() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    api
      .get("/api/blogs/latest")
      .then((res) => setBlogs(res.data))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    api.get("/api/categories").then((res) => {
      setCategories(res.data.slice(0, 10));
    });
  }, []);

  const latestBlogs = blogs.slice(0, 4);
  const featuredBlog = latestBlogs[0];

  return (
    <main className="bg-black text-foreground overflow-x-hidden">
      <Hero />

      {/* FEATURED BLOGS */}
      <section className="relative z-10 bg-black py-24 px-6 -mt-1">
        <div className="mx-auto max-w-6xl">
          <FeaturedBlogs blogs={blogs} loading={loading} />
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="relative z-20 bg-card rounded-t-[3rem] py-20 px-6">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 flex items-end justify-between gap-6">
            <div>
              <h2 className="text-4xl font-bold">Categories</h2>
              <p className="mt-2 max-w-2xl text-muted-foreground">
                Explore blogs by topics and areas of interest.
              </p>
            </div>

            <Link
              to="/categories"
              className="hidden md:inline-block text-sm text-muted-foreground hover:text-foreground"
            >
              View all →
            </Link>
          </div>

          {/* GRID */}
          <div className="mt-12 pb-24">
            <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {/* LOADING */}
              {loading &&
                [...Array(10)].map((_, i) => (
                  <div
                    key={i}
                    className="h-10 rounded-xl border border-border bg-muted animate-pulse"
                  />
                ))}

              {/* ERROR */}
              {error && (
                <p className="col-span-full text-destructive">
                  Failed to load categories
                </p>
              )}

              {/* EMPTY */}
              {!loading && !error && categories.length === 0 && (
                <p className="col-span-full text-muted-foreground">
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
                      group rounded-xl border border-border
                      bg-background
                      px-4 py-3 text-sm text-center
                      transition-all
                      hover:-translate-y-0.5
                      hover:border-primary/40
                      hover:shadow-[0_0_20px_rgba(99,102,241,0.25)]
                    "
                  >
                    #{cat.name}
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </section>

      {/* GLOW DIVIDER */}
      <div className="relative z-50 bg-card transition-colors duration-300">
        <div className="relative h-16">
          <GlowLine orientation="horizontal" position="50%" color="blue" />
        </div>
      </div>

      {/* WHY VOIDWORK */}
      <section className="relative z-40 bg-card border rounded-b-[4rem] py-32 px-6 -m-5">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-4xl font-bold mb-6">Why VoidWork?</h2>
          <p className="text-muted-foreground text-lg">
            The internet is full of tutorials that explain what to type, but not why it works. VoidWork exists to bridge that gap. We focus on understanding systems, making better decisions, and learning in a way that actually sticks.
          </p>

          <Link
            to="/blogs"
            className="
              inline-flex items-center gap-2 rounded-xl
              px-6 py-3 mt-6 font-semibold
              bg-gradient-to-r from-cyan-500 to-violet-500 text-black
            "
          >
            About VoidWork <ArrowRight />
          </Link>
        </div>
      </section>

      {/* LATEST BLOGS */}
      <section className="relative z-30 bg-muted py-35 px-6">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 flex items-end justify-between gap-6">
            <div>
              <h2 className="text-4xl font-bold">Latest Blogs</h2>
              <p className="mt-2 max-w-2xl text-muted-foreground">
                Fresh insights from the VoidWork community.
              </p>
            </div>

            <Link
              to="/blogs"
              className="hidden md:inline-block text-sm text-muted-foreground hover:text-foreground"
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

          {error && (
            <p className="text-destructive">Failed to load blogs</p>
          )}

          {!loading && !error && latestBlogs.length === 0 && (
            <p className="text-muted-foreground">No blogs yet 🚧</p>
          )}

          {latestBlogs.length > 0 && (
            <div className="grid gap-8 lg:grid-cols-3">
              <div className="lg:col-span-2">
                {featuredBlog && (
                  <BlogCard {...featuredBlog} featured />
                )}
              </div>

              <div className="grid gap-8">
                {latestBlogs.slice(1).map((blog) => (
                  <BlogCard key={blog._id} {...blog} />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
