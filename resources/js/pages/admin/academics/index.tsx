import { AcademicCard } from '@/components/academic-card';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { Academic, BreadcrumbItem, SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { Plus } from 'lucide-react';
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
      <div className="flex items-center justify-between p-5">
        <div>
          <h1 className="text-2xl font-bold">Academics Topics</h1>
          <p className="text-gray-500">List of academics topics</p>
        </div>
        <Button asChild>
          <Link href="/academics/create">
            <Plus />
          </Link>
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 p-5">
        {academics.data.map((academic) => (
          <AcademicCard key={academic.id} academic={academic} />
        ))}
      </div>
    </AppLayout>
  );
}
