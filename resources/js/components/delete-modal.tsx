import { useForm } from '@inertiajs/react';
import { useState } from 'react';
import { Button } from './ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';

export function DeleteModal({
  resourceName,
  id,
}: {
  resourceName: string;
  id: number;
}) {
  const [open, setOpen] = useState<boolean>(false);
  const { delete: destroy } = useForm();

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    destroy(route(`${resourceName}s.destroy`, id), {
      onFinish: () => setOpen(false),
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="cursor-pointer" variant="destructive">
          Delete
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Delete <span className="capitalize">{resourceName}</span>
          </DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this {resourceName}?
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <DialogFooter>
            <Button type="submit">Delete</Button>
            <DialogClose>Cancel</DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
