import InputError from '@/components/input-error';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

type FormFieldPropsInput = {
  htmlFor: string;
  label: string;
  message: string;
  className?: string;
} & React.ComponentProps<'input'>;

export default function FormFieldInput({
  htmlFor,
  label,
  message,
  className,
  ...props
}: FormFieldPropsInput) {
  return (
    <div className={cn('grid gap-2', className)}>
      <Label htmlFor={htmlFor} className="capitalize">
        {label}
      </Label>
      <Input {...props} />
      <InputError message={message} />
    </div>
  );
}
