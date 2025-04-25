import { DataTable } from '@/components/data-table';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, Course } from '@/types';
import { Head } from '@inertiajs/react';
import { useEffect } from 'react';
import { toast } from 'sonner';
import { columns } from './columns';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Courses',
    href: '/courses',
  },
];

export default function Courses({
  courses,
  success,
  error,
}: {
  courses: { data: Course[] };
  success?: string;
  error?: string;
}) {
  useEffect(() => {
    if (success) toast.success(success);
    if (error) toast.error(error);
  }, [success, error]);

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Courses" />
      <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
        <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min">
          <DataTable<Course, string>
            columns={columns}
            data={courses.data}
            searchKey="title"
            create="course"
          />
        </div>
      </div>
    </AppLayout>
  );
}
