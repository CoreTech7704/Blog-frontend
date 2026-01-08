import Hero from "../components/Hero";
import FeaturedBlogs from "../components/FeaturedBlogs";
import blogs from "@/data/blogs.json";
import BlogCard from "@/components/BlogCard";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function Home() {
  const latestBlogs = blogs.slice(0, 4);
  const categories = [...new Set(blogs.flatMap(b => b.tags))].slice(0, 10);

  return (
    <main className=" bg-black text-white overflow-x-hidden">
      {/* HERO */}
      <Hero />

      {/* FEATURED BLOGS */}
      <section
        className="
          relative z-10
          bg-black
          py-24 px-6
          -mt-1
        "
      >
        <div className="mx-auto max-w-6xl">
          <FeaturedBlogs />
        </div>
      </section>

      {/* CATEGORIES PREVIEW */}
      <section
        className="
          relative z-20
          bg-slate-950
          rounded-[3rem]
          py-24 px-6
          mt-24
        "
      >
        <div className="mx-auto max-w-6xl">
          {/* Header */}
          <div className="mb-12 flex items-end justify-between">
            <div>
              <h2 className="text-4xl font-bold text-slate-100">
                Categories
              </h2>
              <p className="mt-2 max-w-2xl text-slate-400">
                Explore blogs by topics and areas of interest.
              </p>
            </div>

            <Link
              to="/categories"
              className="hidden md:inline-block text-sm text-slate-400 hover:text-white transition"
            >
              View all →
            </Link>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {categories.map((cat) => (
              <Link
                key={cat}
                to={`/categories/${cat.toLowerCase()}`}
                className="
                  rounded-xl border border-white/10
                  bg-black/40 backdrop-blur-sm
                  px-4 py-3 text-sm text-slate-300
                  hover:text-white hover:border-white/20
                  transition text-center
                "
              >
                #{cat}
              </Link>
            ))}
          </div>

          {/* Mobile CTA */}
          <div className="mt-12 text-center md:hidden">
            <Link
              to="/categories"
              className="text-sm text-slate-400 hover:text-white transition"
            >
              View all categories →
            </Link>
          </div>
        </div>
      </section>

      {/* LATEST BLOGS PREVIEW */}
      <section
        className="
          relative z-30
          bg-black
          rounded-t-[3rem]
          py-24 px-6
          mt-24
        "
      >
        <div className="mx-auto max-w-6xl">
          {/* Header */}
          <div className="mb-12 flex items-end justify-between">
            <div>
              <h2 className="text-4xl font-bold text-slate-100">
                Latest Blogs
              </h2>
              <p className="mt-2 max-w-2xl text-slate-400">
                Fresh insights, updates, and deep dives from the VoidWork community.
              </p>
            </div>

            <Link
              to="/blogs"
              className="hidden md:inline-block text-sm text-slate-400 hover:text-white transition"
            >
              View all →
            </Link>
          </div>

          {/* Grid */}
          <div
            className="
              grid gap-8
              grid-cols-1
              sm:grid-cols-2
              lg:grid-cols-3
            "
          >
            {latestBlogs.map((blog) => (
              <BlogCard
                key={blog.slug}
                slug={blog.slug}
                title={blog.title}
                excerpt={blog.content.slice(0, 140) + "..."}
                category={blog.tags?.[0] || "General"}
                readTime={Math.max(3, Math.ceil(blog.content.length / 800))}
              />
            ))}
          </div>

          {/* Mobile CTA */}
          <div className="mt-12 text-center md:hidden">
            <Link
              to="/blogs"
              className="text-sm text-slate-400 hover:text-white transition"
            >
              View all blogs →
            </Link>
          </div>
        </div>
      </section>

      {/* WHY VOIDWORK */}
      <section
        className="
          relative z-40
          bg-slate-950
          rounded-t-[3rem]
          py-32 px-6
          mt-24
        "
      >
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-4xl font-bold mb-6">
            Why VoidWork?
          </h2>
          <p className="text-slate-300 text-lg leading-relaxed">
            The internet is full of tutorials that explain what to type, but not
            why it works. VoidWork exists to bridge that gap — focusing on
            understanding systems, making better decisions, and learning in a
            way that actually sticks.
          </p>
          <Link
          to="/blogs"
          className="inline-flex items-center gap-2
               rounded-xl px-6 py-3 mt-4 font-semibold
               bg-gradient-to-r from-cyan-500 to-violet-500
               text-black hover:scale-105 transition
               border border-white
               hover:shadow-xl hover:shadow-violet-500/40
              active:scale-95"
        >
          About VoidWork <ArrowRight />
        </Link>
        </div>
      </section>
    </main>
  );
}
