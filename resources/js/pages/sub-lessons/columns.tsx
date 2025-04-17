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
import { SubLesson } from '@/types';
import { Link, useForm } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { useState } from 'react';

export const columns: ColumnDef<SubLesson>[] = [
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
        onChange={row.getToggleSelectedHandler()}
      />
    ),
  },
  {
    accessorKey: 'title',
    header: ({ column }) => (
      <DataTableColumnHeader<SubLesson, unknown>
        column={column}
        title="Title"
      />
    ),
    cell: ({ row }) => {
      return <div className="capitalize">{row.getValue('title')}</div>;
    },
  },
  {
    accessorKey: 'lesson',
    header: ({ column }) => (
      <DataTableColumnHeader<SubLesson, unknown>
        column={column}
        title="Lesson"
      />
    ),
    cell: ({ row }) => {
      return (
        <div className="capitalize">
          {(row.getValue('lesson') as SubLesson)?.title}
        </div>
      );
    },
  },
  {
    accessorKey: 'order',
    header: ({ column }) => (
      <DataTableColumnHeader<SubLesson, unknown>
        column={column}
        title="Order"
      />
    ),
    cell: ({ row }) => {
      return <div className="capitalize">{row.getValue('order')}</div>;
    },
  },
  {
    id: 'actions',
    header: 'Actions',
    enableSorting: false,
    enableHiding: false,
    cell: ({ row }) => {
      const subLesson = row.original;
      return (
        <div className="flex gap-2">
          <EditSubLesson subLesson={subLesson} />
          <DeleteSubLesson subLesson={subLesson} />
        </div>
      );
    },
  },
];

function EditSubLesson({ subLesson }: { subLesson: SubLesson }) {
  return (
    <Button className="cursor-pointer" variant="secondary">
      <Link href={route('sub-lessons.edit', subLesson.id)}>Edit</Link>
    </Button>
  );
}

function DeleteSubLesson({ subLesson }: { subLesson: SubLesson }) {
  const [open, setOpen] = useState<boolean>(false);

  const { delete: destroy } = useForm();

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    destroy(route('sub-lessons.destroy', subLesson.id), {
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
          <DialogTitle>Delete Sub Lesson</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this sub lesson?
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
