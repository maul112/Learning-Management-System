import { useAppearance } from '@/hooks/use-appearance';
import { cn } from '@/lib/utils';
import '@blocknote/core/fonts/inter.css';
import '@blocknote/core/style.css';
import { BlockNoteView } from '@blocknote/mantine';
import '@blocknote/mantine/style.css';
import { useCreateBlockNote } from '@blocknote/react';

interface BlockNoteMarkdownEditorProps {
  onChange: (value: string) => void;
  className?: string;
}

export default function BlockNoteMarkdownEditor({
  onChange,
  className,
}: BlockNoteMarkdownEditorProps) {
  const { appearance } = useAppearance();
  const editor = useCreateBlockNote();

  // Fungsi saat konten berubah
  const handleChange = async () => {
    const markdown = await editor.blocksToMarkdownLossy(editor.document);
    console.log(markdown);
    onChange(markdown);
  };

  return (
    <div className={cn('blocknote-editor', className)}>
      <BlockNoteView
        editor={editor}
        onChange={handleChange}
        theme={appearance === 'dark' ? 'light' : 'dark'}
      />
      <style>{`
        .blocknote-editor .bn-container {
          border: 1px solid hsl(var(--border));
          border-radius: 0.5rem;
          background: hsl(var(--background));
          min-height: 200px;
        }
        .blocknote-editor .bn-container:focus-within {
          border-color: hsl(var(--ring));
          box-shadow: 0 0 0 2px hsl(var(--ring) / 0.2);
        }
      `}</style>
    </div>
  );
}
