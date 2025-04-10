import InputError from '@/components/input-error';
import MarkdownEditor from '@/components/markdown-editor';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

type FormFieldMarkdown = {
  htmlFor: string;
  label: string;
  message: string;
  value: string;
  onChange: (
    value?: string,
    event?: React.ChangeEvent<HTMLTextAreaElement>,
    state?: unknown,
  ) => void;
  className?: string;
};

export default function FormFieldMarkdown({
  htmlFor,
  label,
  message,
  value,
  onChange,
  className,
  ...props
}: FormFieldMarkdown) {
  return (
    <div className={cn('grid gap-2', className)}>
      <Label htmlFor={htmlFor}>{label}</Label>
      <MarkdownEditor value={value} onChange={onChange} {...props} />
      <InputError message={message} />
    </div>
  );
}
