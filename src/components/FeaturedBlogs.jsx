import BlogCard from "./BlogCard";
import BlogCardSkeleton from "@/components/BlogCardSkeleton";
import { Link } from "react-router-dom";

export default function FeaturedBlogs({ blogs = [], loading }) {
  if (loading) {
    return (
      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <BlogCardSkeleton featured />
        </div>
        <div className="flex flex-col gap-6">
          <BlogCardSkeleton />
          <BlogCardSkeleton />
        </div>
      </div>
    );
  }

  const featuredBlogs = blogs.filter((b) => b.featured);
  if (!featuredBlogs.length) return null;

  return (
    <section className="bg-black py-24 px-6">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-3xl font-bold text-slate-100">
              Featured Blogs
            </h2>
            <p className="mt-2 max-w-xl text-slate-400">
              Hand-picked articles worth your time — deep dives, guides, and
              insights.
            </p>
          </div>

          <Link
            to="/featured"
            className="hidden md:inline-flex items-center gap-1 text-sm text-slate-400 hover:text-white transition"
          >
            View all →
          </Link>
        </div>

        {/* Featured Editorial Grid */}
        <div className="grid gap-6 md:grid-cols-3">
          {/* Top Row */}
          <div className="md:col-span-2">
            <BlogCard
              featured
              slug={featuredBlogs[0]?.slug}
              title={featuredBlogs[0]?.title}
              excerpt={featuredBlogs[0]?.excerpt}
              category={featuredBlogs[0]?.category?.name ?? "General"}
              categorySlug={featuredBlogs[0]?.category?.slug}
              cover={featuredBlogs[0]?.cover?.url}
              readTime={featuredBlogs[0]?.readingTime}
            />
          </div>

          <BlogCard
            compact
            slug={featuredBlogs[1]?.slug}
            title={featuredBlogs[1]?.title}
            excerpt={featuredBlogs[1]?.excerpt}
            category={featuredBlogs[1]?.category?.name ?? "General"}
            categorySlug={featuredBlogs[1]?.category?.slug}
            cover={featuredBlogs[1]?.cover?.url}
            readTime={featuredBlogs[1]?.readingTime}
          />

          {/* Bottom Row */}
          <BlogCard
            compact
            slug={featuredBlogs[2]?.slug}
            title={featuredBlogs[2]?.title}
            excerpt={featuredBlogs[2]?.excerpt}
            category={featuredBlogs[2]?.category?.name ?? "General"}
            categorySlug={featuredBlogs[2]?.category?.slug}
            cover={featuredBlogs[2]?.cover?.url}
            readTime={featuredBlogs[2]?.readingTime}
          />

          <div className="md:col-span-2">
            <BlogCard
              featured
              slug={featuredBlogs[3]?.slug}
              title={featuredBlogs[3]?.title}
              excerpt={featuredBlogs[3]?.excerpt}
              category={featuredBlogs[3]?.category?.name ?? "General"}
              categorySlug={featuredBlogs[3]?.category?.slug}
              cover={featuredBlogs[3]?.cover?.url}
              readTime={featuredBlogs[3]?.readingTime}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
