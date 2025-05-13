import { AcademicCard } from '@/components/academic-card';
import AppLayout from '@/layouts/app-layout';
import { Academic, BreadcrumbItem, SharedData } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { useEffect } from 'react';
import { toast } from 'sonner';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Academics',
    href: '/academics',
  },
];

export default function Academics() {
  const { academics, success, error } = usePage<
    SharedData & { academics: { data: Academic[] } }
  >().props;

  useEffect(() => {
    if (success) toast.success(success as string);
    if (error) toast.error(error as string);
  }, [success, error]);

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Academics" />
      <div className="grid grid-cols-3 gap-3 p-5">
        {academics.data.map((academic) => (
          <AcademicCard key={academic.id} academic={academic} />
        ))}
      </div>
    </AppLayout>
  );
}
