export default function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-white/10">
      <div className="mx-auto max-w-6xl px-6 py-12">
        
        {/* Top section */}
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          
          {/* Brand */}
          <div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
              VoidWork
            </h2>
            <p className="mt-2 max-w-sm text-sm text-slate-400">
              Clean, practical blogs and tutorials for developers who care about quality.
            </p>
          </div>

          {/* Navigation */}
          <div className="flex gap-6 text-sm text-slate-400">
            <a href="/" className="hover:text-white transition">Home</a>
            <a href="/blogs" className="hover:text-white transition">Blogs</a>
            <a href="/about" className="hover:text-white transition">About</a>
            <a href="/contact" className="hover:text-white transition">Contact</a>
          </div>
        </div>

        {/* Divider */}
        <div className="my-8 h-px bg-white/10" />

        {/* Bottom section */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between text-sm text-slate-500">
          <span>© {new Date().getFullYear()} VoidWork. All rights reserved.</span>

          {/* Socials */}
          <div className="flex gap-4">
            <a href="#" className="hover:text-white transition">GitHub</a>
            <a href="#" className="hover:text-white transition">Twitter</a>
            <a href="#" className="hover:text-white transition">LinkedIn</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
