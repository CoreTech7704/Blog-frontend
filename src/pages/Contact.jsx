import { useState } from "react";
import api from "@/api/axios";
import FloatingLines from "@/components/ui/FloatingLines";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (!form.name || !form.email || !form.subject || !form.message) {
      return setError("All fields are required");
    }

    if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      return setError("Enter a valid email address");
    }

    try {
      setLoading(true);
      await api.post("/api/contact", form);
      setSuccess(true);
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch {
      setError("Failed to send message. Try again later.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="bg-background text-foreground">
      <section className="relative min-h-screen bg-[#05070d] overflow-hidden">
        {/* FloatingLines BACKGROUND */}
        <div className="pointer-events-none absolute inset-0 opacity-70">
          <FloatingLines
            enabledWaves="top,middle,bottom"
            lineDistance={15}
            bendStrength={0.5}
          />
        </div>

        {/* HERO CONTENT */}
        <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 text-center">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-white">
            Contact{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
              VoidWork
            </span>
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-slate-300">
            For inquiries, feedback, or collaboration opportunities, please
            reach out to us.
          </p>
        </div>

        {/* BOTTOM FADE */}
        <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-black to-transparent" />
      </section>

      {/* Get in Touch Section */}
      <section
        id="Learnmore"
        className="py-32 px-6 bg-black"
      >
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-4xl font-bold mb-6">Get in Touch</h2>
          <p className="mb-6 text-lg text-slate-700 dark:text-slate-300">
            We'd love to hear from you! Whether you have questions, suggestions,
            or just want to say hello, feel free to drop us a message.
          </p>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-32 px-6  bg-background transition-colors duration-300">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-4xl font-bold mb-6">Send us a Message</h2>
          <p className="mb-6 text-lg">
            Have a question or want to collaborate? Fill out the form below and
            we'll get back to you as soon as possible.
          </p>
        </div>

        <div className="
          max-w-md mx-auto relative overflow-hidden z-10
          bg-white/80 dark:bg-gray-800
          border border-slate-200 dark:border-white/10
          p-8 rounded-lg shadow-md
          backdrop-blur-sm
          before:w-24 before:h-24 before:absolute
          before:bg-purple-600 before:rounded-full before:-z-10 before:blur-2xl
          after:w-32 after:h-32 after:absolute after:bg-sky-400
          after:rounded-full after:-z-10 after:blur-xl after:top-24 after:-right-12
          transition-colors duration-300
        ">
          <form onSubmit={handleSubmit}>
            <Input
              label="Full Name"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="John Doe"
            />

            <Input
              label="Email Address"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="john@example.com"
            />

            <Input
              label="Subject"
              name="subject"
              value={form.subject}
              onChange={handleChange}
              placeholder="Subject of message"
            />

            <Textarea
              label="Message"
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Tell us what's on your mind..."
            />

            {error && <p className="text-sm text-red-400 mt-2">{error}</p>}

            {success && (
              <p className="text-sm text-green-400 mt-2">
                Message sent successfully!
              </p>
            )}

            <div className="flex justify-end mt-4">
              <button
                disabled={loading || success}
                className="
                  rounded-xl px-6 py-3 font-semibold
                  bg-gradient-to-r from-cyan-500 to-violet-500
                  text-white hover:scale-105 transition
                  disabled:opacity-50 disabled:cursor-not-allowed
                "
              >
                {loading ? "Sending..." : "Send Message"}
              </button>
            </div>
          </form>
        </div>
        <p className="mt-4 text-xs text-muted-foreground text-center">
          We usually reply within 24–48 hours.
        </p>
      </section>
    </main>
  );
}

function Input({ label, name, value, onChange, type = "text", placeholder }) {
  return (
    <div className="mb-4">
      <label className="block text-sm text-slate-600 dark:text-gray-300">{label}</label>
      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="
          mt-1 p-2 w-full 
          bg-slate-100 dark:bg-gray-700
          border border-slate-300 rounded-md dark:border-gray-600
          text-slate-900 dark:text-white
          placeholder:text-slate-400
          focus:outline-none focus:ring-2 focus:ring-cyan-500
          transition-colors"
      />
    </div>
  );
}

function Textarea({ label, name, value, onChange, placeholder }) {
  return (
    <div className="mb-4">
      <label className="block text-sm text-slate-600 dark:text-gray-300">{label}</label>
      <textarea
        name={name}
        rows={4}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="
          mt-1 p-2 w-full 
          bg-slate-100 dark:bg-gray-700
          border border-slate-300 rounded-md dark:border-gray-600
          text-slate-900 dark:text-white
          placeholder:text-slate-400
          focus:outline-none focus:ring-2 focus:ring-cyan-500
          transition-colors"
      />
    </div>
  );
}
