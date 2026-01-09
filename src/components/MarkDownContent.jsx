import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import CodeBlock from "@/components/CodeBlock";

export default function MarkdownContent({ content }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeHighlight]}
      components={{
        code({ inline, className, children }) {
          if (inline) {
            return (
              <code className="rounded bg-white/10 px-1 py-0.5 text-sm text-slate-200">
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
          <p className="leading-relaxed text-slate-300">
            {children}
          </p>
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
