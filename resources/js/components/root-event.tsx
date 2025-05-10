import { useIsMobile } from '@/hooks/use-mobile';
import { Event, SharedData } from '@/types';
import { usePage } from '@inertiajs/react';
import { RootContent } from './root-content';
import { Carousel } from './ui/apple-cards-carousel';
import { BlurFade } from './ui/blur-fade';
import { Card, CardContent, CardHeader } from './ui/card';

export function RootEvent() {
  const { events } = usePage<SharedData & { events: { data: Event[] } }>()
    .props;

  const desktopCards = events.data.map((card, index) => (
    <CardDesktop key={index} card={card} />
  ));
  const mobileCards = events.data.map((card, index) => (
    <CardMobile key={index} card={card} />
  ));
  const isMobile = useIsMobile();

  return (
    <RootContent>
      <section className="mb-10 flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-center">
        <div className="px-10 lg:w-2xl">
          <h2 className="mb-4 text-2xl font-semibold">
            <BlurFade direction="right" duration={0.7} offset={20} inView>
              Program terbaru kami
            </BlurFade>
          </h2>
          <p className="text-muted-foreground text-base">
            <BlurFade
              direction="up"
              duration={0.7}
              delay={0.5}
              offset={20}
              inView
            >
              Program terbaru kami akan membantu Anda dalam belajar di Academy
            </BlurFade>
          </p>
        </div>
        <div className="relative snap-x snap-mandatory p-10 lg:w-2/3">
          {isMobile ? (
            <Carousel items={mobileCards!} />
          ) : (
            <Carousel
              items={desktopCards!}
              scrollLeftValue={-660}
              scrollRightValue={660}
            />
          )}
        </div>
      </section>
    </RootContent>
  );
}

function CardDesktop({ card }: { card: Event }) {
  return (
    <BlurFade
      whileHover={{
        y: -20,
        transition: {
          duration: 0.3,
          type: 'spring',
          stiffness: 200,
          damping: 20,
        },
      }}
      direction="up"
      duration={0.7}
      inView
      className="bg-muted flex h-52 w-[40rem] snap-start items-center gap-7 rounded-xl p-4"
    >
      <div className="bg-accent-foreground h-full w-96 overflow-hidden rounded-xl">
        <img
          src={`/storage/${card.image}`}
          className="h-full w-full object-cover"
          alt={card.title}
        />
      </div>
      <div className="h-full w-full">
        <p className="text-muted-foreground mb-2">{card.by}</p>
        <h3 className="mb-3 text-2xl font-semibold">{card.title}</h3>
        <p className="text-accent-foreground text-sm">{card.description}</p>
      </div>
    </BlurFade>
  );
}

function CardMobile({ card }: { card: Event }) {
  return (
    <Card className="w-xs">
      <CardHeader>
        <div className="bg-muted-foreground h-60 w-full">
          <img
            src={`/storage/${card.image}`}
            className="h-full w-full object-cover"
            alt={card.title}
          />
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-2">{card.by}</p>
        <h3 className="mb-3 text-2xl font-semibold">{card.title}</h3>
        <p className="text-accent-foreground text-sm">{card.description}</p>
      </CardContent>
    </Card>
  );
}
