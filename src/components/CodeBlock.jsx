import { useState } from "react";
import { Copy, Check } from "lucide-react";

export default function CodeBlock({ className, children }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    const text =
      typeof children === "string"
        ? children
        : Array.isArray(children)
        ? children.join("")
        : "";

    if (!text) return;

    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="relative group">
      {/* Copy button */}
      <button
        onClick={handleCopy}
        className="
          h-7 absolute top-3 right-3 z-10
          flex items-center gap-1
          rounded-md px-2 py-1 text-xs
          bg-slate-200 text-slate-700
          dark:bg-white/10 dark:text-slate-300
          opacity-60 md:opacity-0 md:group-hover:opacity-100
          hover:bg-slate-300 dark:hover:bg-white/20
          transition
        "
      >
        {copied ? (
          <>
            <Check size={14} /> Copied
          </>
        ) : (
          <>
            <Copy size={14} /> Copy
          </>
        )}
      </button>

      {/* Code */}
      <pre
        className="
          overflow-x-auto rounded-xl p-4
          text-[13.5px] leading-relaxed
          bg-slate-100 text-slate-900
          dark:bg-black/70 dark:text-slate-100
        "
      >
        <code className={className}>{children}</code>
      </pre>
    </div>
  );
}
