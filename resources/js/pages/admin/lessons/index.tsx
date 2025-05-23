import { DataTable } from '@/components/data-table';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, Lesson, SharedData } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { useEffect } from 'react';
import { toast } from 'sonner';
import { columns } from './columns';
import { BorderBeam } from '@/components/ui/border-beam';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Lessons',
    href: '/lessons',
  },
];

export default function Lessons() {
  const { lessons, success, error } = usePage<
    SharedData & { lessons: { data: Lesson[] } }
  >().props;

  useEffect(() => {
    if (success) toast.success(success as string);
    if (error) toast.error(error as string);
  }, [success, error]);

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Lessons" />
      <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
        <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min">
          <DataTable<Lesson, string>
            columns={columns}
            data={lessons.data}
            searchKey="title"
            create="lesson"
          />
          <BorderBeam size={300} duration={10} />
        </div>
      </div>
    </AppLayout>
  );
}
