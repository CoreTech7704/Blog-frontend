import { getCategories } from "@/utils/getCategories";
import { Link } from "react-router-dom";

export default function Categories() {
  const categories = getCategories();

  return (
    <section className="bg-slate-950 py-24 px-6">
      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-slate-100">
            Browse by Category
          </h2>
          <p className="mt-2 text-slate-400">
            Explore topics that matter to you.
          </p>
        </div>

        
{/* Mobile View All */}
        <div className="mt-10 mb-8 text-center md:hidden ">
          <a
            href="/categories"
            className="inline-block text-sm text-slate-400 hover:text-white transition"
          >
            View all blogs →
          </a>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap justify-center gap-4">
          {categories.map((category) => (
            <Link
              key={category}
              to={`/category/${category}`}
              className="
                rounded-full
                border border-white/15
                bg-black/30
                backdrop-blur-md
                px-5 py-2
                text-sm text-slate-300 capitalize

                transition-all duration-300
                hover:bg-white/10
                hover:text-white
                hover:scale-105
              "
            >
              {category}
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
