import FloatingLines from "@/components/ui/FloatingLines";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function About() {
  return (
    <main className="bg-slate-50 dark:bg-black text-slate-900 dark:text-white transition-colors duration-300">
      <section className="relative min-h-screen overflow-hidden bg-[#05070d] dark:bg-[#05070d] transition-colors duration-300">
        {/* FloatingLines BACKGROUND */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-70">
          <div className="w-[100%] h-[100vh]">
            <FloatingLines
              enabledWaves="top,middle,bottom"
              lineDistance={15}
              bendStrength={0.5}
            />
          </div>
        </div>

        {/* HERO CONTENT */}
        <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center">
          <h1 className="mb-2 text-5xl font-extrabold leading-tight text-white sm:text-6xl md:text-7xl">
            About{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent text-shadow-xl ">
              VoidWork
            </span>
          </h1>

          <p className="mb-6 max-w-2xl text-lg text-slate-300">
            VoidWork is a developer-first platform focused on clear, practical,
            and honest writing about coding, software engineering, and
            technology.
          </p>

          <a
            href="#Learnmore"
            className=" relative flex items-center gap-2
            rounded-xl px-6 py-3 text-md font-semibold text-white
            bg-gradient-to-r from-cyan-500 to-violet-600
            backdrop-blur-md 
            border border-white
            shadow-lg shadow-violet-500/30
            transition-all duration-300
            hover:scale-105 hover:shadow-xl hover:shadow-violet-500/40
            active:scale-95
          "
          >
            Learn more
            <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </div>

        {/* BOTTOM FADE */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />
      </section>

      {/* Why VoidWork? */}
      <section
        id="Learnmore"
        className="py-32 px-6 bg-slate-100 dark:bg-black transition-colors duration-300"
      >
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-4xl font-bold mb-6">Why VoidWork?</h2>
          <p className="text-slate-700 dark:text-slate-300 text-lg leading-relaxed">
            The internet is full of tutorials that explain what to type, but not
            why it works. VoidWork exists to bridge that gap. We focus on
            understanding systems, making better decisions, and learning in a
            way that actually sticks.
          </p>
        </div>
      </section>

      {/* The Story */}
      <section className="py-32 px-6 bg-white dark:bg-slate-950 transition-colors duration-300">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-4xl font-bold mb-6">The Story</h2>
          <p className="text-slate-700 dark:text-slate-300 text-lg leading-relaxed">
            VoidWork started as a personal space to document learning, mistakes,
            and lessons that don’t usually make it into polished tutorials. Over
            time, it grew into something more — a place to write clearly, think
            deeply, and share knowledge without pretending everything is easy.
          </p>
        </div>
      </section>

      {/* Our Mission */}
      <section className="py-32 px-6 bg-slate-100 dark:bg-black transition-colors duration-300">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-4xl font-bold mb-6">Our Mission</h2>
          <p className="text-slate-700 dark:text-slate-300 text-lg leading-relaxed">
            Our mission is to help developers think better, not just code
            faster. We believe strong fundamentals, clarity, and curiosity
            matter more than chasing every new trend.
          </p>
        </div>
      </section>

      {/* What You’ll Find */}
      <section className="py-32 px-6 bg-white dark:bg-slate-950 transition-colors duration-300">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-4xl font-bold mb-6">
            What You’ll Find on VoidWork
          </h2>
          <ul className="space-y-4 text-slate-700 dark:text-slate-300 text-lg">
            <li>• Deep-dive blogs on frontend, backend, and system design</li>
            <li>• Honest breakdowns of real-world coding problems</li>
            <li>• Opinionated takes backed by reasoning, not hype</li>
            <li>
              • Content written for developers who want to understand, not copy
            </li>
          </ul>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-32 px-6 bg-black dark:bg-black text-center transition-colors duration-300">
        <h2 className="text-3xl text-slate-300 font-bold mb-4">
          If this sounds like your kind of space
        </h2>
        <p className="text-slate-400 mb-8">
          Start exploring, reading, and building with us.
        </p>

        <Link
          to="/blogs"
          className="inline-flex items-center gap-2
               rounded-xl px-6 py-3 font-semibold
               bg-gradient-to-r from-cyan-500 to-violet-500
               text-black hover:scale-105 transition
               hover:shadow-xl hover:shadow-violet-500/40
              active:scale-95"
        >
          Explore Blogs <ArrowRight />
        </Link>
      </section>
    </main>
  );
}
