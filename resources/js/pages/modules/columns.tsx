import { DataTableColumnHeader } from '@/components/data-table-header';
import InputError from '@/components/input-error';
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
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import VideoPlayer from '@/components/video-player';
import { cn } from '@/lib/utils';
import { Module } from '@/types';
import { useForm } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { X } from 'lucide-react';
import { useState } from 'react';

export const columns: ColumnDef<Module>[] = [
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
      <DataTableColumnHeader<Module, unknown> column={column} title="Title" />
    ),
    cell: ({ row }) => {
      return (
        <div className="capitalize">
          {row.getValue('title')}
        </div>
      );
    },
  },
  {
    accessorKey: 'video_url',
    header: 'Video',
    cell: ({ row }) => (
      <Drawer>
        <DrawerTrigger asChild>
          <Button variant="link">Watch Video</Button>
        </DrawerTrigger>
        <DrawerContent className="h-screen">
          <DrawerHeader className="flex justify-center items-center">
            <DrawerClose asChild>
              <Button variant="outline" className="w-14 h-14 rounded-full">
                <X className="h-7 w-7" />
              </Button>
            </DrawerClose>
          </DrawerHeader>
          <div className="p-4 pb-0">
            <div className="flex items-center justify-center space-x-2">
              <VideoPlayer
                url={
                  row.getValue('video_url') ??
                  'https://www.youtube.com/watch?v=3Fb7Qv36of4&list=RD3Fb7Qv36of4&start_radio=1'
                }
              />
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    ),
  },
  {
    accessorKey: 'course',
    header: ({ column }) => (
      <DataTableColumnHeader<Module, unknown> column={column} title="Course" />
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
