import { DataTable } from '@/components/data-table';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, Lesson } from '@/types';
import { Head } from '@inertiajs/react';
import { toast } from 'sonner';
import { columns } from './columns';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Lessons',
    href: '/lessons',
  },
];

export default function Lessons({
  lessons,
  success,
  error,
}: {
  lessons: {
    data: Lesson[];
  };
  success?: string;
  error?: string;
}) {
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      {success && toast.success(success)}
      {error && toast.error(error)}
      <Head title="Lessons" />
      <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
        <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min">
          <DataTable<Lesson, string>
            columns={columns}
            data={lessons.data}
            searchKey="title"
            create="lesson"
          />
        </div>
      </div>
    </AppLayout>
  );
}
