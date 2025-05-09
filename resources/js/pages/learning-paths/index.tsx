import { LearningPathTabs } from '@/components/learning-path-tabs';
import { LearningPathsContent } from '@/components/learning-paths-content';
import { RootFooter } from '@/components/root-footer';
import { DataProvider } from '@/contexts/DataContext';
import RootLayout from '@/layouts/root-layout';
import { Academic } from '@/types';
import { Head } from '@inertiajs/react';

export default function LearningPaths({
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
        <LearningPathsContent />
        <RootFooter />
      </RootLayout>
    </DataProvider>
  );
}
