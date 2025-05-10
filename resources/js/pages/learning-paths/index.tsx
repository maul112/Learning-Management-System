import { LearningPathTabs } from '@/components/learning-path-tabs';
import { LearningPathsContent } from '@/components/learning-paths-content';
import { RootFooter } from '@/components/root-footer';
import RootLayout from '@/layouts/root-layout';
import { Head } from '@inertiajs/react';

export default function LearningPaths() {
  return (
    <RootLayout>
      <Head title="Learning Path" />
      <LearningPathTabs />
      <LearningPathsContent />
      <RootFooter />
    </RootLayout>
  );
}
