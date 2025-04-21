import { DataTableColumnHeader } from '@/components/data-table-header';
import { DeleteModal } from '@/components/delete-modal';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Academic, Course } from '@/types';
import { Link } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';

export const columns: ColumnDef<Academic>[] = [
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
        arial-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'title',
    header: ({ column }) => (
      <DataTableColumnHeader<Academic, unknown> column={column} title="Title" />
    ),
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue('title')}</div>
    ),
  },
  {
    accessorKey: 'description',
    header: ({ column }) => (
      <DataTableColumnHeader<Academic, unknown>
        column={column}
        title="Description"
      />
    ),
    cell: ({ row }) => (
      <div className="capitalize">
        {(row.getValue('description') as string).slice(0, 50)}
      </div>
    ),
  },
  {
    accessorKey: 'courses',
    header: ({ column }) => (
      <DataTableColumnHeader<Academic, unknown>
        column={column}
        title="Total Courses"
      />
    ),
    cell: ({ row }) => (
      <div className="capitalize">
        {(row.getValue('courses') as Course[]).length} Courses
      </div>
    ),
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => {
      const academic = row.original;

      return (
        <div className="flex space-x-2">
          <EditAcademic academic={academic} />
          <DeleteModal resourceName="academic" id={academic.id} />
        </div>
      );
    },
  },
];

function EditAcademic({ academic }: { academic: Academic }) {
  return (
    <Button className="cursor-pointer" variant="secondary">
      <Link href={route('academics.edit', academic.id)}>Edit</Link>
    </Button>
  );
}
