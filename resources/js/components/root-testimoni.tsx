import { Link } from '@inertiajs/react';
import { ArrowRight, ArrowUpRightFromSquare } from 'lucide-react';
import { RootContent } from './root-content';
import { Carousel } from './ui/apple-cards-carousel';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Separator } from './ui/separator';

export function RootTestimoni() {
  const cards = dataTestimoni.map((card, index) => (
    <TestimoniCard key={index} card={card} />
  ));

  return (
    <RootContent>
      <section className="relative my-10 p-5 lg:mx-10">
        <h3 className="absolute top-7 left-10 text-xl font-semibold">
          Testimoni Siswa
        </h3>
        <Carousel
          items={cards}
          scrollLeftValue={1190}
          scrollRightValue={1190}
        />
        <div className="flex w-full items-center justify-end">
          <Link href="/ratings">
            <Button variant="link" className="group cursor-pointer">
              Lihat semua
              <ArrowUpRightFromSquare />
            </Button>
          </Link>
        </div>
      </section>
    </RootContent>
  );
}

function TestimoniCard({
  card,
}: {
  card: {
    testimoni: string;
    by: string;
    work: string;
    academic: string;
  };
}) {
  return (
    <Card className="h-full w-md lg:w-6xl">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="order-2 p-10 lg:order-1">
          <p className="text-md text-muted-foreground mb-7">
            "{card.testimoni}"
          </p>
          <div className="mb-5 flex flex-col gap-3">
            <p className="text-muted-foreground text-sm">{card.by}</p>
            <p className="text-muted-foreground text-sm">{card.work}</p>
            <p className="text-muted-foreground text-sm">{card.academic}</p>
          </div>
          <Separator className="text-muted-foreground mb-5 w-full" />
          <div className="order-1 flex w-full items-center justify-end lg:order-2">
            <Button variant="link" className="group cursor-pointer">
              Baca kisahnya
              <ArrowRight className="transition-all duration-100 group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
        <div className="bg-muted mx-5 h-96"></div>
      </div>
    </Card>
  );
}

const dataTestimoni = [
  {
    testimoni:
      'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Architecto, debitis. Earum ipsum voluptatem cum optio provident fugiat possimus obcaecati, hic nesciunt dignissimos dolorum pariatur accusamus corporis! Optio corporis delectus sint!',
    by: 'Ahmad Mufid Risqi',
    work: 'Bangkit',
    academic: 'Machine Learning',
  },
  {
    testimoni:
      'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Architecto, debitis. Earum ipsum voluptatem cum optio provident fugiat possimus obcaecati, hic nesciunt dignissimos dolorum pariatur accusamus corporis! Optio corporis delectus sint!',
    by: 'Ahmad Mufid Risqi',
    work: 'Bangkit',
    academic: 'Machine Learning',
  },
  {
    testimoni:
      'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Architecto, debitis. Earum ipsum voluptatem cum optio provident fugiat possimus obcaecati, hic nesciunt dignissimos dolorum pariatur accusamus corporis! Optio corporis delectus sint!',
    by: 'Ahmad Mufid Risqi',
    work: 'Bangkit',
    academic: 'Machine Learning',
  },
  {
    testimoni:
      'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Architecto, debitis. Earum ipsum voluptatem cum optio provident fugiat possimus obcaecati, hic nesciunt dignissimos dolorum pariatur accusamus corporis! Optio corporis delectus sint!',
    by: 'Ahmad Mufid Risqi',
    work: 'Bangkit',
    academic: 'Machine Learning',
  },
];
