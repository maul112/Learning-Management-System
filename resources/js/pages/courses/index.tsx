import { DataTable } from '@/components/data-table';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, Course } from '@/types';
import { Head } from '@inertiajs/react';
import { CircleCheck } from 'lucide-react';
import { useEffect, useState } from 'react';
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
}: {
  courses: { data: Course[] };
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

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      {alertTimeout && success && (
        <Alert className="text-green-400">
          <CircleCheck className="h-4 w-4 text-green-400" />
          <AlertTitle>Success</AlertTitle>
          <AlertDescription>{success}</AlertDescription>
        </Alert>
      )}
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
