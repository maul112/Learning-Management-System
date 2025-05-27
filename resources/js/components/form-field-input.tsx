import InputError from '@/components/input-error';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { EditIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { Card, CardDescription, CardHeader, CardTitle } from './ui/card';

type FormFieldPropsInput = {
  htmlFor: string;
  label: string;
  message: string;
  className?: string;
  value: string;
  setValue: (value: string) => void;
  onFilled?: () => void; // opsional untuk menambah requiredFieldNumber
} & React.ComponentProps<'input'>;

export default function FormFieldInput({
  htmlFor,
  label,
  message,
  className,
  value,
  setValue,
  onFilled,
  ...props
}: FormFieldPropsInput) {
  const [editMode, setEditMode] = useState(false);
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
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="h-12"
                {...props}
              />
              <InputError message={message} />
              <Button
                onClick={handleSave}
                type="button"
                className="w-16 cursor-pointer"
                size="sm"
              >
                Save
              </Button>
            </div>
          ) : (
            <p>
              {value !== undefined && value.trim() !== ''
                ? value
                : `No ${label}`}
            </p>
          )}
        </CardDescription>
      </CardHeader>
    </Card>
  );
}
