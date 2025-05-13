import InputError from '@/components/input-error';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { EditIcon, X } from 'lucide-react';
import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Textarea } from './ui/textarea';

type FormFieldPropsInput = {
  htmlFor: string;
  label: string;
  message: string;
  className?: string;
  value: string;
} & React.ComponentProps<'textarea'>;

export default function FormFieldTextarea({
  htmlFor,
  label,
  message,
  className,
  value,
  ...props
}: FormFieldPropsInput) {
  const [editMode, setEditMode] = useState<boolean>(false);

  return (
    <Card className={cn('grid gap-2', className)}>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <Label htmlFor={htmlFor} className="text-xl">
            {label}
          </Label>
          {editMode ? (
            <Button
              type="button"
              onClick={() => setEditMode(false)}
              className="cursor-pointer"
              size="sm"
            >
              <X className="h-4 w-4" />
            </Button>
          ) : (
            <Button
              type="button"
              onClick={() => setEditMode(true)}
              className="cursor-pointer"
              size="sm"
            >
              <EditIcon className="h-4 w-4" />
            </Button>
          )}
        </CardTitle>
        <CardDescription>
          {editMode ? (
            <div className="flex flex-col gap-2">
              <Textarea {...props}>{value}</Textarea>
              <InputError message={message} />
              <Button
                type="button"
                onClick={() => setEditMode(false)}
                className="w-16 cursor-pointer"
                size="sm"
              >
                Save
              </Button>
            </div>
          ) : (
            <p>{value}</p>
          )}
        </CardDescription>
      </CardHeader>
    </Card>
  );
}
