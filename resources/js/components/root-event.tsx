import { useIsMobile } from '@/hooks/use-mobile';
import { RootContent } from './root-content';
import { Carousel } from './ui/apple-cards-carousel';
import { Card, CardContent, CardHeader } from './ui/card';

export function RootEvent() {
  const desktopCards = data.map((card, index) => (
    <CardDesktop key={index} card={card} />
  ));
  const mobileCards = data.map((card, index) => (
    <CardMobile key={index} card={card} />
  ));
  const isMobile = useIsMobile();

  return (
    <RootContent>
      <section className="mb-10 flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-center">
        <div className="px-10 lg:w-2xl">
          <h2 className="mb-4 text-2xl font-semibold">Program terbaru kami</h2>
          <p className="text-muted-foreground text-base">
            Bekerja sama dengan partner, kami menyelenggarakan beberapa program
            untuk mendukung developer Indonesia.
          </p>
        </div>
        <div className="relative snap-x snap-mandatory p-10 lg:w-2/3">
          {isMobile ? (
            <Carousel items={mobileCards} />
          ) : (
            <Carousel
              items={desktopCards}
              scrollLeftValue={-660}
              scrollRightValue={660}
            />
          )}
        </div>
      </section>
    </RootContent>
  );
}

function CardDesktop({
  card,
}: {
  card: {
    by: string;
    title: string;
    desciptrion: string;
  };
}) {
  return (
    <div className="bg-muted flex h-52 w-[40rem] snap-start items-center gap-7 rounded-xl p-4">
      <div className="bg-accent-foreground h-full w-96 rounded-xl"></div>
      <div className="h-full w-full">
        <p className="text-muted-foreground mb-2">{card.by}</p>
        <h3 className="mb-3 text-2xl font-semibold">{card.title}</h3>
        <p className="text-accent-foreground text-sm">{card.desciptrion}</p>
      </div>
    </div>
  );
}

const data = [
  {
    by: 'by : Google',
    title: 'Android Developer',
    desciptrion:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.',
  },
  {
    by: 'by : Google',
    title: 'Android Developer',
    desciptrion:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.',
  },
  {
    by: 'by : Google',
    title: 'Android Developer',
    desciptrion:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.',
  },
  {
    by: 'by : Google',
    title: 'Android Developer',
    desciptrion:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.',
  },
];

function CardMobile({
  card,
}: {
  card: {
    by: string;
    title: string;
    desciptrion: string;
  };
}) {
  return (
    <Card className="w-xs">
      <CardHeader>
        <div className="bg-muted-foreground h-60 w-full"></div>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-2">{card.by}</p>
        <h3 className="mb-3 text-2xl font-semibold">{card.title}</h3>
        <p className="text-accent-foreground text-sm">{card.desciptrion}</p>
      </CardContent>
    </Card>
  );
}
