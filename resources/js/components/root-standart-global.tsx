import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import { Course, SharedData } from '@/types';
import { usePage } from '@inertiajs/react';
import { ArrowRightCircle } from 'lucide-react';
import { RootContent } from './root-content';
import { Animatedcards } from './ui/animated-cards';
import { BlurFade } from './ui/blur-fade';
import { Button } from './ui/button';
import { Marquee } from './ui/marquee';

const ourTeams = [
  {
    quote:
      'Jack of all trades, master of none. but oftentimes better than a master of one',
    name: 'Ahmad Mufid Risqi',
    designation: 'Fullstack Developer',
    src: '/mufid.webp',
  },
  {
    quote:
      "Implementation was seamless and the results exceeded our expectations. The platform's flexibility is remarkable.",
    name: 'Michael Rodriguez',
    designation: 'CTO at InnovateSphere',
    src: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    quote:
      "This solution has significantly improved our team's productivity. The intuitive interface makes complex tasks simple.",
    name: 'Emily Watson',
    designation: 'Operations Director at CloudScale',
    src: 'https://images.unsplash.com/photo-1623582854588-d60de57fa33f?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    quote:
      "Outstanding support and robust features. It's rare to find a product that delivers on all its promises.",
    name: 'James Kim',
    designation: 'Engineering Lead at DataPro',
    src: 'https://images.unsplash.com/photo-1636041293178-808a6762ab39?q=80&w=3464&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    quote:
      'The scalability and performance have been game-changing for our organization. Highly recommend to any growing business.',
    name: 'Lisa Thompson',
    designation: 'VP of Technology at FutureNet',
    src: 'https://images.unsplash.com/photo-1624561172888-ac93c696e10c?q=80&w=2592&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
];

export function RootStandartGlobal() {
  const { courses } = usePage<SharedData>().props;
  const isMobile = useIsMobile();

  const firstRow = courses.data.slice(0, courses.data.length / 2);
  const secondRow = courses.data.slice(3, courses.data.length);

  return (
    <RootContent>
      <section className="lg:bg-muted mx-10 mb-10 grid grid-cols-1 overflow-hidden rounded-xl lg:h-96 lg:grid-cols-2">
        <div className="m-5 px-5 pt-7 lg:px-10">
          <h2 className="mb-5 text-2xl font-bold lg:text-3xl">
            <BlurFade direction="up" duration={0.7} inView>
              Belajar dengan kelas standar industri global
            </BlurFade>
          </h2>
          <p className="text-muted-foreground lg:text-md mb-5 text-sm">
            <BlurFade
              direction="right"
              duration={0.7}
              delay={0.5}
              offset={20}
              inView
            >
              Kelas di NextLMS Academy tersedia bagi yang belum memiliki
              kemampuan programming (dasar) hingga yang sudah profesional.
            </BlurFade>
          </p>
          <Button variant="link" className="group text-md cursor-pointer">
            <BlurFade
              direction="right"
              duration={0.7}
              delay={0.8}
              offset={20}
              inView
              className="flex items-center gap-2"
            >
              Lihat semua kelas
              <ArrowRightCircle className="h-7 w-7 transition-all duration-150 group-hover:translate-x-1" />
            </BlurFade>
          </Button>
        </div>
        <div
          className={cn(
            'relative flex h-full w-full items-center justify-center lg:overflow-hidden',
            isMobile ? 'flex-col' : 'flex-row',
          )}
        >
          <Marquee
            pauseOnHover
            vertical={isMobile ? false : true}
            className="[--duration:20s]"
          >
            {firstRow?.map((course) => (
              <ReviewCard key={course.id} course={course} />
            ))}
          </Marquee>
          <Marquee
            reverse
            pauseOnHover
            vertical={isMobile ? false : true}
            className="[--duration:20s]"
          >
            {secondRow?.map((course) => (
              <ReviewCard key={course.id} course={course} />
            ))}
          </Marquee>
        </div>
      </section>
      <div className="mt-10 text-center">
        <h2 className="mb-5 text-2xl font-bold">
          <BlurFade direction="up" duration={0.7} inView>
            Kenal lebih dekat dengan kami!
          </BlurFade>
        </h2>
        <p className="text-muted-foreground mb-10">
          <BlurFade
            direction="up"
            duration={0.7}
            delay={0.5}
            offset={20}
            inView
          >
            Sebagai platform edukasi teknologi, pengembangan skill para
            developer adalah fokus Dicoding. Untuk mencapainya, tersedia
            berbagai kelas online, program pelatihan, dan sertifikasi
            pemrograman dengan kualitas yang terjamin serta 2 layanan utama:
            Code Review & Forum Diskusi.
          </BlurFade>
        </p>
      </div>
      <section className="bg-muted mx-10 mb-10 flex flex-col justify-between rounded-xl p-10">
        <Animatedcards cards={ourTeams} autoplay />
      </section>
    </RootContent>
  );
}

const ReviewCard = ({ course }: { course: Course }) => {
  return (
    <figure
      className={cn(
        'relative h-full w-64 cursor-pointer overflow-hidden rounded-xl border sm:w-36 lg:w-fit',
        // light styles
        'border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]',
        // dark styles
        'dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]',
      )}
    >
      <div className="objcet-cover h-full w-full bg-cover bg-center">
        <img src={`/storage/${course.image}`} alt="" />
        <h3 className="absolute top-2 left-2 text-sm font-semibold">
          {course.title}
        </h3>
      </div>
    </figure>
  );
};
