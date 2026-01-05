import Hero from "../components/Hero";
import FeaturedBlogs from "../components/FeaturedBlogs";
import Categories from "../components/Categories";

export default function Home() {
  return (
<main className="bg-black text-white overflow-x-hidden">
  {/* HERO */}
  <Hero />

  {/* FEATURED BLOGS */}
  <section className="
    relative z-10
    mt-1
    bg-slate-950
    rounded-t-[3rem]
    py-24 px-6
    overflow-hidden
  ">
    <div className="mx-auto max-w-6xl">
      <FeaturedBlogs />
    </div>
  </section>

  {/* CATEGORIES */}
  <section className="
    relative z-20
    mt-6
    bg-slate-950
    rounded-t-[3rem]
    py-24 px-6
    overflow-hidden
  ">
    <div className="mx-auto max-w-6xl text-center">
      <Categories />
    </div>
  </section>

  {/* BLOGS */}
  <section className="
    relative z-30
    mt-6
    bg-black
    rounded-t-[3rem]
    py-24 px-6
    overflow-hidden
  ">
    <div className="mx-auto max-w-6xl text-center">
      <h2 className="text-4xl font-bold text-slate-200">
        Blogs Section Coming Soon!
      </h2>
    </div>
  </section>

  {/* WHY VOIDWORK */}
  <section className="
    relative z-40
    mt-6
    bg-slate-950
    rounded-t-[3rem]
    py-24 px-6
    overflow-hidden
  ">
    <div className="mx-auto max-w-6xl text-center">
      <h2 className="text-4xl font-bold text-slate-200">
        Why VoidWork Section Coming Soon!
      </h2>
    </div>
  </section>
</main>
  );
}
