import { LearningPathContent } from '@/components/learning-path-content';
import { LearningPathTabs } from '@/components/learning-path-tabs';
import { RootFooter } from '@/components/root-footer';
import { DataProvider } from '@/contexts/DataContext';
import RootLayout from '@/layouts/root-layout';
import { Academic } from '@/types';
import { Head } from '@inertiajs/react';

export default function LearningPath({
  academic,
  academics,
}: {
  academic?: {
    data: Academic;
  };
  academics: {
    data: Academic[];
  };
}) {
  const initialData = {
    academic,
    academics,
  };

  return (
    <DataProvider initialData={initialData}>
      <RootLayout>
        <Head title="Learning Path" />
        <LearningPathTabs />
        <LearningPathContent />
        <RootFooter />
      </RootLayout>
    </DataProvider>
  );
}
