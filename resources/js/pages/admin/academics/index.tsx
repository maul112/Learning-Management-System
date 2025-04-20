import { DataTable } from '@/components/data-table';
import AppLayout from '@/layouts/app-layout';
import { Academic, BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { toast } from 'sonner';
import { columns } from './columns';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Academics',
    href: '/academics',
  },
];

export default function Academics({
  academics,
  success,
  error,
}: {
  academics: { data: Academic[] };
  success?: string;
  error?: string;
}) {
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      {success && toast.success(success)}
      {error && toast.error(error)}
      <Head title="academics" />
      <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
        <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min">
          <DataTable<Academic, string>
            columns={columns}
            data={academics.data}
            searchKey="title"
            create="academic"
          />
        </div>
      </div>
    </AppLayout>
  );
}
