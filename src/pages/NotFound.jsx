import FloatingLines from "@/components/ui/FloatingLines";
import FuzzyText from "../components/ui/FuzzyText";
import { ArrowRight } from 'lucide-react';
import { Link } from "react-router-dom";

export default function NotFound() {
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
        <FuzzyText baseIntensity={0.2} hoverIntensity={0.05} enableHover={true}>
          404
        </FuzzyText>
        <h2 className="text-4xl mt-2 mb-6 font-bold text-white">Page Not Found</h2>
        <p className="mb-6 max-w-2xl text-lg text-slate-200">
          Sorry, the page you are looking for does not exist. Please check the
          URL or return to the homepage.
        </p>
        <Link
          to="/"
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
          Go to Homepage
          <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>
    </section>
  );
}
