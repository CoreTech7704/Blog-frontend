export default function Footer() {
  return (
    <footer className="bg-slate-950 dark:bg-slate-950 border-t border-white/10 transition-colors duration-300">
      <div className="mx-auto max-w-6xl px-6 py-14">

        {/* Top section */}
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">

          {/* Brand */}
          <div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
              VoidWork
            </h2>
            <p className="mt-2 max-w-sm text-sm text-slate-400">
              Clean, practical blogs and tutorials for people who care about quality.
            </p>
          </div>

          {/* Navigation */}
          <div className="flex gap-6 text-sm text-slate-400">
            <a href="/" className="hover:text-white transition focus:outline-none focus:ring-2 focus:ring-cyan-400/40 rounded">Home</a>
            <a href="/blogs" className="hover:text-white transition focus:outline-none focus:ring-2 focus:ring-cyan-400/40 rounded">Blogs</a>
            <a href="/about" className="hover:text-white transition focus:outline-none focus:ring-2 focus:ring-cyan-400/40 rounded">About</a>
            <a href="/contact" className="hover:text-white transition focus:outline-none focus:ring-2 focus:ring-cyan-400/40 rounded">Contact</a>
          </div>
        </div>

        {/* Divider */}
        <div className="my-8 h-px bg-white/10" />

        {/* Bottom section */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between text-sm text-slate-500">
          <span>© {new Date().getFullYear()} VoidWork. All rights reserved.</span>

          {/* Socials */}
          <div className="flex gap-4">
            <a href="https://github.com/CoreTech7704"
              className="hover:text-white transition focus:outline-none focus:ring-2 focus:ring-cyan-400/40 rounded"
            >
              GitHub
            </a>
            <a href="https://www.reddit.com/user/Southern-Document841/"
              className="hover:text-white transition focus:outline-none focus:ring-2 focus:ring-cyan-400/40 rounded"
            >
              Reddit
            </a>
            <a href="https://www.linkedin.com/in/sarvam-patel/"
              className="hover:text-white transition focus:outline-none focus:ring-2 focus:ring-cyan-400/40 rounded"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
