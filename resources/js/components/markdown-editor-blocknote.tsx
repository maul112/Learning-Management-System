import { useAppearance } from '@/hooks/use-appearance';
import { cn } from '@/lib/utils';
import type { Block } from '@blocknote/core';
import '@blocknote/core/fonts/inter.css';
import '@blocknote/core/style.css';
import { BlockNoteView } from '@blocknote/mantine';
import '@blocknote/mantine/style.css';
import { useCreateBlockNote } from '@blocknote/react';
import { useEffect, useState } from 'react';

interface BlockNoteMarkdownEditorProps {
  onChange: (value: string) => void;
  value?: string; // Controlled component
  initialValue?: string; // Uncontrolled component
  className?: string;
  editable?: boolean;
}

export default function BlockNoteMarkdownEditor({
  onChange,
  value,
  initialValue = '',
  className,
  editable = true,
}: BlockNoteMarkdownEditorProps) {
  const { appearance } = useAppearance();
  const [mounted, setMounted] = useState(false);

  // Determine the content to use
  const contentToUse = value !== undefined ? value : initialValue;

  // Create editor with initial content
  const editor = useCreateBlockNote({
    initialContent: contentToUse ? undefined : undefined, // Will be set later
  });

  // Set mounted state
  useEffect(() => {
    setMounted(true);
  }, []);

  // Load initial content when editor is ready
  useEffect(() => {
    if (!editor || !mounted || !contentToUse) return;

    const loadContent = async () => {
      try {
        // Convert markdown to blocks
        const blocks = await editor.tryParseMarkdownToBlocks(contentToUse);
        editor.replaceBlocks(editor.document, blocks);
      } catch (error) {
        console.warn('Failed to parse markdown:', error);
        // Fallback: create a simple paragraph block with the content
        const fallbackBlocks: Block[] = [
          {
            id: 'initial',
            type: 'paragraph',
            content: [{ type: 'text', text: contentToUse, styles: {} }],
          },
        ];
        editor.replaceBlocks(editor.document, fallbackBlocks);
      }
    };

    loadContent();
  }, [editor, mounted, contentToUse]);

  // Handle external value changes (for controlled component)
  useEffect(() => {
    if (!editor || !mounted || value === undefined) return;

    const loadNewContent = async () => {
      try {
        const currentMarkdown = await editor.blocksToMarkdownLossy(
          editor.document,
        );

        // Only update if the value is different from current content
        if (currentMarkdown !== value) {
          const blocks = await editor.tryParseMarkdownToBlocks(value);
          editor.replaceBlocks(editor.document, blocks);
        }
      } catch (error) {
        console.warn('Failed to update content:', error);
      }
    };

    loadNewContent();
  }, [value, editor, mounted]);

  // Handle content changes
  const handleChange = async () => {
    if (!editor) return;

    try {
      const markdown = await editor.blocksToMarkdownLossy(editor.document);
      onChange(markdown);
    } catch (error) {
      console.error('Failed to convert to markdown:', error);
    }
  };

  if (!mounted) {
    return (
      <div className={cn('blocknote-editor', className)}>
        <div className="border-border bg-background flex min-h-[200px] items-center justify-center rounded-lg border">
          <div className="text-muted-foreground">Loading editor...</div>
        </div>
      </div>
    );
  }

  return (
    <div className={cn('blocknote-editor', className)}>
      <BlockNoteView
        editor={editor}
        onChange={handleChange}
        theme={appearance === 'dark' ? 'light' : 'dark'}
        editable={editable}
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
        .blocknote-editor .bn-editor {
          color: hsl(var(--foreground));
        }
        .blocknote-editor .bn-block-content {
          color: hsl(var(--foreground));
        }
      `}</style>
    </div>
  );
}
