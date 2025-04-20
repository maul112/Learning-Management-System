import { CardsCarousel } from '@/components/cards-carousel';
import { RootAbout } from '@/components/root-about';
import { RootEvent } from '@/components/root-event';
import { RootJumbotron } from '@/components/root-jumbotron';
import { RootPartner } from '@/components/root-partner';
import RootLayout from '@/layouts/root-layout';
import { Head } from '@inertiajs/react';

export default function Welcome() {
  return (
    <RootLayout>
      <Head title="Welcome" />
      <RootJumbotron />
      <RootPartner />
      <RootEvent />
      <RootAbout />
      <CardsCarousel />
    </RootLayout>
  );
}
