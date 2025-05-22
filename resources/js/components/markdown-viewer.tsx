/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import rehypeRaw from "rehype-raw"
import rehypeSanitize from "rehype-sanitize"
import { cn } from "@/lib/utils"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism"

interface MarkdownViewerProps {
  content: string
  className?: string
}

export default function MarkdownViewer({ content, className }: MarkdownViewerProps) {
  return (
    <div className={cn("lesson-content prose dark:prose-invert max-w-none", className)}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw, rehypeSanitize]}
        components={{
          // Code blocks with syntax highlighting
          code({ node, inline, className, children, ...props }: any) {
            const match = /language-(\w+)/.exec(className || "")
            return !inline && match ? (
              <SyntaxHighlighter style={vscDarkPlus} language={match[1]} PreTag="div" {...props}>
                {String(children).replace(/\n$/, "")}
              </SyntaxHighlighter>
            ) : (
              <code className={cn("bg-muted px-1.5 py-0.5 rounded text-sm", className)} {...props}>
                {children}
              </code>
            )
          },
          // Links open in new tab
          a: ({ node, ...props }) => (
            <a target="_blank" rel="noopener noreferrer" className="text-primary hover:underline" {...props} />
          ),
          // Headings with proper spacing for lessons
          h1: ({ node, ...props }) => <h1 className="text-2xl font-bold mt-6 mb-4" {...props} />,
          h2: ({ node, ...props }) => <h2 className="text-xl font-bold mt-5 mb-3" {...props} />,
          h3: ({ node, ...props }) => <h3 className="text-lg font-bold mt-4 mb-2" {...props} />,
          // Lists with proper indentation
          ul: ({ node, ...props }) => <ul className="list-disc pl-6 my-4 space-y-2" {...props} />,
          ol: ({ node, ...props }) => <ol className="list-decimal pl-6 my-4 space-y-2" {...props} />,
          // Blockquotes for important notes
          blockquote: ({ node, ...props }) => (
            <blockquote
              className="border-l-4 border-primary/30 pl-4 italic my-4 bg-muted/20 py-2 rounded-r"
              {...props}
            />
          ),
          // Tables with proper styling
          table: ({ node, ...props }) => (
            <div className="overflow-x-auto my-6">
              <table className="min-w-full divide-y divide-border" {...props} />
            </div>
          ),
          thead: ({ node, ...props }) => <thead className="bg-muted/50" {...props} />,
          th: ({ node, ...props }) => (
            <th className="px-3 py-2 text-left text-xs font-medium uppercase tracking-wider" {...props} />
          ),
          td: ({ node, ...props }) => <td className="px-3 py-2" {...props} />,
          // Paragraphs with proper line height for readability
          p: ({ node, ...props }) => <p className="my-3 leading-relaxed" {...props} />,
          // Images with proper sizing
          img: ({ node, ...props }) => <img className="rounded-md max-w-full h-auto my-4 mx-auto" {...props} />,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}
