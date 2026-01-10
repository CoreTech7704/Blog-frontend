import FloatingLines from "@/components/ui/FloatingLines";
import { ArrowRight } from 'lucide-react';
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-[#05070d]">
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
          Welcome to{" "}
          <span className="bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent text-shadow-xl ">
            VoidWork
          </span>
        </h1>

        <p className="mb-6 max-w-2xl text-lg text-slate-300">
          Dive into the world of coding with our expertly crafted blogs,
          tutorials, and resources designed to empower developers of all levels.
        </p>

        <div className="flex gap-4">
          <Link
          to="/blogs"
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
          Explore Blogs 
          <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
        <Link
          to="/auth"
          className="relative inline-flex items-center justify-center
            px-6 py-2 rounded-xl
            text-md font-semibold text-white/80
            bg-white/5 backdrop-blur-md
            border border-white
            transition-all duration-300
            hover:bg-white/10 hover:text-white
            hover:scale-105 hover:shadow-lg hover:shadow-white/20
            active:scale-95            
          "
        >
          Join Voidwork
        </Link>
        </div>
      </div>

      {/* BOTTOM FADE */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />
    </section>
  );
}
