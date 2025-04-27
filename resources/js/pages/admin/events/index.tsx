import { DataTable } from '@/components/data-table';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, Event } from '@/types';
import { Head } from '@inertiajs/react';
import { useEffect } from 'react';
import { toast } from 'sonner';
import { columns } from './column';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Events',
    href: '/events',
  },
];

export default function Events({
  events,
  success,
  error,
}: {
  events: { data: Event[] };
  success?: string;
  error?: string;
}) {
  useEffect(() => {
    if (success) toast.success(success);
    if (error) toast.error(error);
  }, [success, error]);

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Events" />
      <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
        <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min">
          <DataTable<Event, string>
            columns={columns}
            data={events.data}
            searchKey="title"
            create="event"
          />
        </div>
      </div>
    </AppLayout>
  );
}
