import { RootAbout } from '@/components/root-about';
import { RootFooter } from '@/components/root-footer';
import { RootJoin } from '@/components/root-join';
import { RootJumbotron } from '@/components/root-jumbotron';
import { RootLearningPath } from '@/components/root-learning-path';
import { RootPartner } from '@/components/root-partner';
import { RootStandartGlobal } from '@/components/root-standart-global';
import { RootTestimoni } from '@/components/root-testimoni';
import RootLayout from '@/layouts/root-layout';
import { Head } from '@inertiajs/react';

export default function Welcome() {
  return (
    <RootLayout>
      <Head title="Welcome" />
      <RootJumbotron />
      <RootPartner />
      <RootAbout />
      <RootLearningPath />
      <RootStandartGlobal />
      <RootJoin />
      <RootTestimoni />
      <RootFooter />
    </RootLayout>
  );
}
