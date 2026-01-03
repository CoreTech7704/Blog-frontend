import Orb from "@/components/ui/Orb";

export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-[#05070d]">

      {/* ORB BACKGROUND */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="w-[900px] h-[900px]">
          <Orb
            hoverIntensity={0}
            rotateOnHover={false}
            forceHoverState={false}
          />
        </div>
      </div>

      {/* HERO CONTENT */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <h1 className="mb-6 text-5xl font-extrabold leading-tight text-white sm:text-6xl md:text-7xl">
          Welcome to{" "}
          <span className="bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
            VoidWork
          </span>
        </h1>

        <p className="mb-8 max-w-2xl text-lg text-slate-300">
          Dive into the world of coding with our expertly crafted blogs,
          tutorials, and resources designed to empower developers of all levels.
        </p>

        <a
          href="#get-started"
          className="
            inline-block rounded-full
            bg-gradient-to-r from-cyan-500 to-violet-500
            px-8 py-4 text-lg font-semibold text-stone-950
            transition-all duration-300
            hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/25
            active:scale-95
          "
        >
          Get Started
        </a>
      </div>

      {/* BOTTOM FADE */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />
    </section>
  );
}
