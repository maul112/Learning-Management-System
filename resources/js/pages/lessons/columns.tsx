import { DataTableColumnHeader } from '@/components/data-table-header';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { Lesson } from '@/types';
import { useForm } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { useState } from 'react';

export const columns: ColumnDef<Lesson>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
      />
    ),
  },
  {
    accessorKey: 'title',
    header: ({ column }) => (
      <DataTableColumnHeader<Lesson, unknown> column={column} title="Title" />
    ),
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue('title')}</div>
    ),
  },
  {
    accessorKey: 'module',
    header: ({ column }) => (
      <DataTableColumnHeader<Lesson, unknown> column={column} title="Module" />
    ),
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue('module')}</div>
    ),
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => {
      const lesson = row.original;

      return (
        <div className="flex space-x-2">
          <EditLesson lesson={lesson} />
          <DeleteLesson lesson={lesson} />
        </div>
      );
    },
  },
];

function EditLesson({
  lesson,
  className,
}: {
  lesson: Lesson;
  className?: string;
}) {
  const [open, setOpen] = useState<boolean>(false);

  const { data, setData, patch } = useForm({
    title: lesson.title,
  });

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    patch(route('lessons.update', lesson.id), {
      preserveScroll: true,
      onFinish: () => setOpen(false),
      onError: (e) => console.log(e),
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="cursor-pointer" variant="secondary">
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit lesson</DialogTitle>
          <DialogDescription>
            Make changes to lesson data here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={handleSubmit}
          className={cn('grid items-start gap-4', className)}
        >
          <div className="grid gap-2">
            <Label htmlFor="title">Title</Label>
            <Input
              type="text"
              id="title"
              name="title"
              value={data.title}
              onChange={(e) => setData('title', e.target.value)}
            />
          </div>
          <Button type="submit">Save changes</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function DeleteLesson({ lesson }: { lesson: Lesson }) {
  const [open, setOpen] = useState<boolean>(false);

  const { delete: destroy } = useForm();

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    destroy(route('lessons.destroy', lesson.id), {
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
          <DialogTitle>Delete lesson</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this lesson?
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
