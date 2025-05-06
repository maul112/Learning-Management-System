import { useData } from '@/contexts/DataContext';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import { Course } from '@/types';
import { ArrowRightCircle, Code2, PlayCircle } from 'lucide-react';
import { RootContent } from './root-content';
import { BlurFade } from './ui/blur-fade';
import { Button } from './ui/button';
import { Marquee } from './ui/marquee';

export function RootStandartGlobal() {
  const data = useData();
  const isMobile = useIsMobile();

  const firstRow = data?.data?.courses!.data.slice(0, 3);
  const secondRow = data?.data?.courses!.data.slice(3, 6);

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
      <section className="bg-muted mx-10 mb-10 rounded-xl p-10">
        <div className="lg:w-1/3">
          <Code2 className="bg-accent-foreground text-muted mb-5 h-10 w-10 px-1" />
          <h2 className="mb-5 text-2xl font-bold">
            <BlurFade direction="up" duration={0.7} inView>
              Kenal lebih dekat dengan kami!
            </BlurFade>
          </h2>
          <p className="text-muted-foreground mb-10">
            <BlurFade
              direction="right"
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
          <Button variant="link" className="text-lg">
            <BlurFade
              direction="right"
              duration={0.7}
              delay={0.8}
              offset={20}
              inView
              className="flex items-center gap-2"
            >
              <PlayCircle />
              Tonton video
            </BlurFade>
          </Button>
        </div>
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
