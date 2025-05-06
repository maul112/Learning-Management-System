import { LearningPathContent } from '@/components/learning-path-content';
import { LearningPathTabs } from '@/components/learning-path-tabs';
import { DataProvider } from '@/contexts/DataContext';
import RootLayout from '@/layouts/root-layout';
import { Academic, Course } from '@/types';
import { Head } from '@inertiajs/react';

export default function LearningPath({
  academic,
  academics,
  courses,
}: {
  academic?: {
    data: Academic;
  };
  academics: {
    data: Academic[];
  };
  courses: {
    data: Course[];
  };
}) {
  const initialData = {
    academic,
    academics,
    courses,
  };

  return (
    <DataProvider initialData={initialData}>
      <RootLayout>
        <Head title="Learning Path" />
        <LearningPathTabs />
        <LearningPathContent />
      </RootLayout>
    </DataProvider>
  );
}
