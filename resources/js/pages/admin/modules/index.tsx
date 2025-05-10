import { DataTable } from '@/components/data-table';

import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, Module, SharedData } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { useEffect } from 'react';
import { toast } from 'sonner';
import { columns } from './columns';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Modules',
    href: '/modules',
  },
];

export default function Modules() {
  const { modules, success, error } = usePage<
    SharedData & { modules: { data: Module[] } }
  >().props;

  useEffect(() => {
    if (success) toast.success(success as string);
    if (error) toast.error(error as string);
  }, [success, error]);

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
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
