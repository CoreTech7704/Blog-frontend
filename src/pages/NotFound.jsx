import FloatingLines from "@/components/ui/FloatingLines";
import FuzzyText from "../components/ui/FuzzyText";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-background">
      {/* FloatingLines BACKGROUND */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-70">
        <div className="w-full h-full">
          <FloatingLines
            enabledWaves="top,middle,bottom"
            lineDistance={15}
            bendStrength={0.5}
          />
        </div>
      </div>

      {/* HERO CONTENT */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <FuzzyText
          baseIntensity={0.2}
          hoverIntensity={0.05}
          enableHover
        >
          404
        </FuzzyText>

        <h2 className="mt-2 mb-6 text-4xl font-bold text-foreground">
          Page Not Found
        </h2>

        <p className="mb-8 max-w-2xl text-lg text-muted-foreground">
          Sorry, the page you are looking for does not exist.
          Please check the URL or return to the homepage.
        </p>

        <Link
          to="/"
          className="
            group relative inline-flex items-center gap-2
            rounded-xl px-6 py-3 text-base font-semibold
            text-black
            bg-gradient-to-r from-cyan-500 to-violet-600
            border border-border
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
