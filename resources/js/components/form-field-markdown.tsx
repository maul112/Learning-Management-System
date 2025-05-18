import InputError from '@/components/input-error';
import MarkdownEditor from '@/components/markdown-editor';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { EditIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { Card, CardDescription, CardHeader, CardTitle } from './ui/card';

type FormFieldMarkdown = {
  htmlFor: string;
  label: string;
  message: string;
  value: string;
  setValue: (value: string) => void;
  onFilled?: () => void;
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
  setValue,
  onFilled,
  onChange,
  className,
  ...props
}: FormFieldMarkdown) {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState(value);
  const [wasEmpty, setWasEmpty] = useState(value.trim() === '');

  useEffect(() => {
    if (editMode) {
      setInputValue(value);
      setWasEmpty(value.trim() === '');
    }
  }, [editMode, value]);

  const handleSave = () => {
    setEditMode(false);
    setValue(inputValue);
    if (wasEmpty && inputValue.trim() !== '') {
      onFilled?.();
    }
  };

  const handleCancel = () => {
    setEditMode(false);
    setInputValue(value);
  };

  return (
    <Card className={cn('grid gap-2', message && 'border-red-500', className)}>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <Label htmlFor={htmlFor} className="text-xl">
            {label}
          </Label>
          {editMode ? (
            <Button
              type="button"
              onClick={handleCancel}
              className="cursor-pointer"
              size="sm"
              variant="link"
            >
              Cancel
            </Button>
          ) : (
            <Button
              type="button"
              onClick={() => setEditMode(true)}
              className="cursor-pointer"
              size="sm"
              variant="link"
            >
              <EditIcon className="h-4 w-4" />
              Edit {label}
            </Button>
          )}
        </CardTitle>
        <CardDescription>
          {editMode ? (
            <div className="flex flex-col gap-2">
              <MarkdownEditor
                value={inputValue}
                onChange={onChange}
                {...props}
              />
              <InputError message={message} />
              <Button
                type="button"
                onClick={handleSave}
                className="w-16 cursor-pointer"
                size="sm"
              >
                Save
              </Button>
            </div>
          ) : (
            <p>{value || `No ${label}`}</p>
          )}
        </CardDescription>
      </CardHeader>
    </Card>
  );
}
