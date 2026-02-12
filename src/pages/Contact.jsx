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
    <main>
      {/* HERO */}
      <section className="relative min-h-screen bg-[#05070d] overflow-hidden">
        <div className="pointer-events-none absolute inset-0 opacity-70">
          <FloatingLines
            enabledWaves="top,middle,bottom"
            lineDistance={15}
            bendStrength={0.5}
          />
        </div>

        <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 text-center">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-white">
            Contact{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
              VoidWork
            </span>
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-slate-300">
            For inquiries, feedback, or collaboration opportunities, reach out to us.
          </p>
        </div>

        <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-black to-transparent" />
      </section>

      {/* FORM */}
      <section className="py-24 px-6 bg-background">
        <div className="mx-auto max-w-xl">
          <div className="card backdrop-blur-sm">
            <h2 className="text-3xl font-bold mb-2 text-center">
              Send us a Message
            </h2>
            <p className="text-muted-foreground text-center mb-8">
              We usually reply within 24–48 hours.
            </p>

            <form onSubmit={handleSubmit}>
              <Field
                label="Full Name"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="John Doe"
              />

              <Field
                label="Email Address"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="john@example.com"
              />

              <Field
                label="Subject"
                name="subject"
                value={form.subject}
                onChange={handleChange}
                placeholder="Subject of message"
              />

              <Field
                label="Message"
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Tell us what's on your mind..."
                textarea
              />

              {error && (
                <p className="text-sm text-destructive mt-2">{error}</p>
              )}

              {success && (
                <p className="text-sm text-emerald-500 mt-2">
                  Message sent successfully!
                </p>
              )}

              <div className="mt-6 flex justify-end">
                <button
                  disabled={loading || success}
                  className="btn bg-primary text-primary-foreground disabled:opacity-50"
                >
                  {loading ? "Sending..." : "Send Message"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}

/* ---------- Reusable Field ---------- */

function Field({
  label,
  name,
  value,
  onChange,
  type = "text",
  placeholder,
  textarea,
}) {
  return (
    <div className="mt-4">
      <label className="block text-sm font-medium mb-1">
        {label}
      </label>
      {textarea ? (
        <textarea
          name={name}
          rows={4}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="input resize-none"
        />
      ) : (
        <input
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="input"
        />
      )}
    </div>
  );
}
