import { DataTable } from '@/components/data-table';

import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, Module } from '@/types';
import { Head } from '@inertiajs/react';
import { columns } from './columns';
import { toast } from 'sonner';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Modules',
    href: '/modules',
  },
];

export default function Modules({
  modules,
  success,
  error,
}: {
  modules: { data: Module[] };
  success?: string;
  error?: string;
}) {

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      {success && toast.success(success)}
      {error && toast.error(error)}
      <Head title="Modules" />
      <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
        <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min">
          <DataTable<Module, string>
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
