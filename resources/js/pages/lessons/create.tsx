import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, Module } from '@/types';
import { Head } from '@inertiajs/react';
import { toast } from 'sonner';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Lessons',
    href: '/lessons',
  },
  {
    title: 'Create',
    href: '/lessons/create',
  },
];

export default function LessonsCreate({
  modules,
  success,
  error,
}: {
  modules: Module[];
  success?: string;
  error?: string;
}) {
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      {success && toast.success(success)}
      {error && toast.error(error)}
      <Head title="Create Lesson" />
      <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
        <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min"></div>
      </div>
    </AppLayout>
  );
}
