// components/MarkdownViewer.tsx
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

export default function MarkdownViewer({ content }: { content: string }) {
  return (
    <div className="prose max-w-none">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {content}
      </ReactMarkdown>
    </div>
  )
}
