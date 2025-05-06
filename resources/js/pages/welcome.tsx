import { RootAbout } from '@/components/root-about';
import { RootEvent } from '@/components/root-event';
import { RootFooter } from '@/components/root-footer';
import { RootJoin } from '@/components/root-join';
import { RootJumbotron } from '@/components/root-jumbotron';
import { RootLearningPath } from '@/components/root-learning-path';
import { RootPartner } from '@/components/root-partner';
import { RootStandartGlobal } from '@/components/root-standart-global';
import { RootTestimoni } from '@/components/root-testimoni';
import { DataProvider } from '@/contexts/DataContext';
import RootLayout from '@/layouts/root-layout';
import { DataContextType } from '@/types';
import { Head } from '@inertiajs/react';

export default function Welcome({
  events,
  academics,
  courses,
}: DataContextType) {
  const initialData = {
    events,
    academics,
    courses,
  };

  return (
    <DataProvider initialData={initialData}>
      <RootLayout>
        <Head title="Welcome" />
        <RootJumbotron />
        <RootPartner />
        <RootEvent />
        <RootAbout />
        <RootLearningPath />
        <RootStandartGlobal />
        <RootJoin />
        <RootTestimoni />
        <RootFooter />
      </RootLayout>
    </DataProvider>
  );
}
