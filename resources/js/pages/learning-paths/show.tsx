import { LearningPathContent } from '@/components/learning-path-content';
import { LearningPathTabs } from '@/components/learning-path-tabs';
import { RootFooter } from '@/components/root-footer';
import RootLayout from '@/layouts/root-layout';
import { Head } from '@inertiajs/react';

export default function LearningPath() {
  return (
    <RootLayout>
      <Head title="Learning Path" />
      <LearningPathTabs />
      <LearningPathContent />
      <RootFooter />
    </RootLayout>
  );
}
