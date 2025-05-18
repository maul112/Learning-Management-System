import { RatingsSection } from '@/components/ratings-section';
import { RootContent } from '@/components/root-content';
import RootLayout from '@/layouts/root-layout';
import { Academic, SharedData } from '@/types';
import { Head, usePage } from '@inertiajs/react';

export default function Ratings() {
  const { academics } = usePage<
    SharedData & { academics: { data: Academic[] } }
  >().props;

  return (
    <RootLayout>
      <Head title="Ratings" />
      <RootContent>
        {academics.data.map((academic) => (
          <RatingsSection key={academic.id} academic={academic} />
        ))}
        <div className="bg-accent fixed  bottom-10 z-50 w-80"></div>
      </RootContent>
    </RootLayout>
  );
}
