import { Link } from "react-router-dom";
import { getCategories } from "@/utils/getCategories";

export default function CategoriesPage() {
  const categories = getCategories(); // all categories

  return (
    <main className="min-h-screen bg-black text-white pt-32">
      {/* HEADER */}
      <section className="px-6">
        <div className="mx-auto max-w-6xl">
          <h1 className="text-4xl font-bold text-slate-100">
            Categories
          </h1>
          <p className="mt-2 max-w-2xl text-slate-400">
            Browse all topics and explore blogs by category.
          </p>
        </div>
      </section>

      {/* GRID */}
      <section className="mt-12 px-6 pb-24">
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
          {categories.map((cat) => (
            <Link
              key={cat}
              to={`/categories/${cat.toLowerCase()}`}
              className="
                rounded-xl border border-white/10
                bg-slate-950
                px-4 py-3 text-sm text-slate-300
                hover:text-white hover:border-white/20
                transition text-center
              "
            >
              #{cat}
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
