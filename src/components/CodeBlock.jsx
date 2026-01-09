import { useState } from "react";
import { Copy, Check } from "lucide-react";

export default function CodeBlock({ className, children }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(children);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="relative group">
      {/* Copy button */}
      <button
        onClick={handleCopy}
        className="
          absolute top-3 right-3 z-10
          flex items-center gap-1
          rounded-md px-2 py-1 text-xs
          bg-white/10 text-slate-300
          opacity-0 group-hover:opacity-100
          hover:bg-white/20 transition
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
      <pre className="overflow-x-auto rounded-xl bg-black/70 p-4">
        <code className={className}>{children}</code>
      </pre>
    </div>
  );
}
