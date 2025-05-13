import InputError from '@/components/input-error';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { EditIcon, X } from 'lucide-react';
import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardDescription, CardHeader, CardTitle } from './ui/card';

type FormFieldPropsInput = {
  htmlFor: string;
  label: string;
  message: string;
  className?: string;
  value: string;
} & React.ComponentProps<'input'>;

export default function FormFieldInput({
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
              <Input value={value} {...props} className="h-12" />
              <InputError message={message} />
              <Button
                onClick={() => setEditMode(false)}
                type="button"
                className="w-16 cursor-pointer"
                size="sm"
              >
                Save
              </Button>
            </div>
          ) : (
            <p>{value != undefined ? value : '-'}</p>
          )}
        </CardDescription>
      </CardHeader>
    </Card>
  );
}
