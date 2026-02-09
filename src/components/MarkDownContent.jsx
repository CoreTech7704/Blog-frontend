import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import rehypeSanitize from "rehype-sanitize";
import CodeBlock from "@/components/CodeBlock";

export default function MarkdownContent({ content }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeHighlight, rehypeSanitize]}
      components={{
        code({ inline, className, children }) {
          if (inline) {
            return (
              <code
                className="
                  rounded px-1 py-0.5 text-sm
                  bg-slate-200 text-slate-900
                  dark:bg-white/10 dark:text-slate-200
                "
              >
                {children}
              </code>
            );
          }

          return (
            <CodeBlock className={className}>
              {String(children).trim()}
            </CodeBlock>
          );
        },

        h1: ({ children }) => (
          <h1 className="text-3xl font-bold mt-12 mb-4 text-white">
            {children}
          </h1>
        ),

        h2: ({ children }) => (
          <h2 className="text-2xl font-semibold mt-10 mb-3 text-white">
            {children}
          </h2>
        ),

        p: ({ children }) => (
          <p className="leading-relaxed text-slate-300 mb-4">
            {children}
          </p>
        ),

        a: ({ href, children }) => (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-cyan-400 hover:underline"
          >
            {children}
          </a>
        ),

        ul: ({ children }) => (
          <ul className="list-disc list-inside text-slate-300 mb-4">
            {children}
          </ul>
        ),

        ol: ({ children }) => (
          <ol className="list-decimal list-inside text-slate-300 mb-4">
            {children}
          </ol>
        ),

        blockquote: ({ children }) => (
          <blockquote
            className="
              border-l-4 border-cyan-400/50
              pl-4 italic text-slate-400 my-6
            "
          >
            {children}
          </blockquote>
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
