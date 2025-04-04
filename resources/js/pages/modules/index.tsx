import { DataTable } from '@/components/data-table';
import { DataTableColumnHeader } from '@/components/data-table-header';
import InputError from '@/components/input-error';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
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
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { cn } from '@/lib/utils';
import { BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { AnimatePresence, motion } from 'framer-motion';
import { CircleCheck } from 'lucide-react';
import { useEffect, useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Modules',
    href: '/modules',
  },
];

export type Module = {
  id: number;
  title: string;
  content: string;
  video_url: string;
  course_id: number;
  course: string;
};

const columns: ColumnDef<Module>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onChange={table.getToggleAllPageRowsSelectedHandler()}
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
      <DataTableColumnHeader column={column} title="Title" />
    ),
    cell: ({ row }) => {
      return (
        <div className="capitalize">
          {(row.getValue('title') as string).slice(0, 30)}
        </div>
      );
    },
  },
  {
    accessorKey: 'content',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Content" />
    ),
    cell: ({ row }) => {
      return (
        <div className="capitalize">
          {(row.getValue('content') as string).slice(0, 30)}
        </div>
      );
    },
  },
  {
    accessorKey: 'course',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Course" />
    ),
    cell: ({ row }) => {
      return <div className="capitalize">{row.getValue('course')}</div>;
    },
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => (
      <div className="flex gap-2">
        <EditModule module={row.original} />
        <DeleteModule module={row.original} />
      </div>
    ),
  },
];

export default function Modules({
  modules,
  success,
}: {
  modules: { data: Module[] };
  success?: string;
}) {
  const [alertTimeout, setAlertTimeout] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (success) {
      setAlertTimeout(
        setTimeout(() => {
          setAlertTimeout(null);
        }, 5000),
      );
    }
  }, [success]);

  console.log(modules);

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      {alertTimeout && success && (
        <AnimatePresence>
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
          >
            <Alert className="text-green-400">
              <CircleCheck className="h-4 w-4 text-green-400" />
              <AlertTitle>Success</AlertTitle>
              <AlertDescription>{success}</AlertDescription>
            </Alert>
          </motion.div>
        </AnimatePresence>
      )}
      <Head title="Modules" />
      <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
        <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min">
          <DataTable
            columns={columns}
            searchKey="title"
            data={modules.data}
            create="module"
          />
        </div>
      </div>
    </AppLayout>
  );
}

function EditModule({
  module,
  className,
}: {
  module: Module;
  className?: string;
}) {
  const [open, setOpen] = useState<boolean>(false);
  const { data, setData, errors, patch } = useForm({
    title: module.title,
    content: module.content,
  });

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    patch(route('modules.update', module.id), {
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
          <DialogTitle>Edit Module</DialogTitle>
          <DialogDescription>
            Make changes to module data here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={handleSubmit}
          className={cn('grid items-start gap-4', className)}
        >
          <div className="grid items-start gap-4">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={data.title}
              onChange={(e) => setData('title', e.target.value)}
            />
            <InputError message={errors.title} />
          </div>
          <div className="grid items-start gap-4">
            <Label htmlFor="content">Content</Label>
            <Textarea
              id="content"
              name="content"
              value={data.content}
              onChange={(e) => setData('content', e.target.value)}
            >
              {data.content}
            </Textarea>
            <InputError message={errors.content} />
          </div>
          <Button type="submit">Save changes</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function DeleteModule({ module }: { module: Module }) {
  const [open, setOpen] = useState<boolean>(false);
  const { delete: destroy } = useForm();

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    destroy(route('modules.destroy', module.id), {
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
          <DialogTitle>Delete Module</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this module?
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
