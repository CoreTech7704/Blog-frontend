import FloatingLines from "@/components/ui/FloatingLines";

export default function Contact() {
  return (
    <main>
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
            Contact{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent text-shadow-xl ">
              VoidWork
            </span>
          </h1>
          <p className="mb-6 max-w-2xl text-lg text-slate-300">
            For inquiries, feedback, or collaboration opportunities, please
            reach out to us.
          </p>
        </div>

        {/* BOTTOM FADE */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />
      </section>

      {/* Get in Touch Section */}
      <section id="Learnmore" className="py-32 px-6 bg-black">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-4xl font-bold mb-6">Get in Touch</h2>
          <p className="mb-6 text-lg text-slate-300">
            We'd love to hear from you! Whether you have questions, suggestions,
            or just want to say hello, feel free to drop us a message.
          </p>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-32 px-6 bg-slate-950">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-4xl font-bold mb-6">Send us a Message</h2>
          <p className="mb-6 text-lg text-slate-300">
            Have a question or want to collaborate? Fill out the form below and
            we'll get back to you as soon as possible.
          </p>
        </div>

        <div className="max-w-md mx-auto relative overflow-hidden z-10 bg-gray-800 p-8 rounded-lg shadow-md before:w-24 before:h-24 before:absolute before:bg-purple-600 before:rounded-full before:-z-10 before:blur-2xl after:w-32 after:h-32 after:absolute after:bg-sky-400 after:rounded-full after:-z-10 after:blur-xl after:top-24 after:-right-12">
          <form method="post" action="#">
            <div className="mb-4">
              <label
                className="block text-sm font-medium text-gray-300"
                htmlFor="name"
              >
                Full Name
              </label>
              <input
                className="mt-1 p-2 w-full bg-gray-700 border border-gray-600 rounded-md text-white"
                id="name"
                type="text"
                placeholder="John Doe"
                required
              />
            </div>

            <div className="mb-4">
              <label
                className="block text-sm font-medium text-gray-300"
                htmlFor="email"
              >
                Email Address
              </label>
              <input
                className="mt-1 p-2 w-full bg-gray-700 border border-gray-600 rounded-md text-white"
                name="email"
                id="email"
                type="email"
                placeholder="john@example.com"
                required
              />
            </div>

            <div className="mb-4">
              <label
                className="block text-sm font-medium text-gray-300"
                htmlFor="message"
              >
                Message
              </label>
              <textarea
                className="mt-1 p-2 w-full bg-gray-700 border border-gray-600 rounded-md text-white"
                rows="3"
                name="message"
                id="message"
                placeholder="Tell us what's on your mind..."
                required
              ></textarea>
            </div>

            <div className="flex justify-end">
              <button
                className="inline-flex items-center gap-2
               rounded-xl px-6 py-3 font-semibold
               bg-gradient-to-r from-cyan-500 to-violet-500
               text-white hover:scale-105 transition
               hover:shadow-xl hover:shadow-violet-500/40
              active:scale-95"
                type="submit"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
        <p className="mt-4 text-xs text-slate-400 text-center">
          We usually reply within 24–48 hours.
        </p>
      </section>
    </main>
  );
}
