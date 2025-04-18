import { StudentAcademyTabs } from '@/components/student-academy-tabs';
import StudentLayout from '@/layouts/student-layout';
import { Head } from '@inertiajs/react';

export default function StudentAcademic() {
  return (
    <StudentLayout>
      <Head title="Dashboard" />
      <div className="w-full px-4 py-14">
        <h2 className="mb-6 text-2xl font-bold">Progres Pembelajaran Anda</h2>
        <StudentAcademyTabs />
      </div>
    </StudentLayout>
  );
}
