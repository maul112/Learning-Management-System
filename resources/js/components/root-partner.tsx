import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import { BlurFade } from './ui/blur-fade';
import { Marquee } from './ui/marquee';

export function RootPartner() {
  const isMobile = useIsMobile();

  return (
    <section className="mb-10 flex flex-col gap-5">
      <h3 className="text-center text-xl font-semibold">
        <BlurFade direction="up" duration={0.7} inView>
          Telah dipercaya oleh
        </BlurFade>
      </h3>
      {!isMobile && (
        <div className="flex flex-col gap-7">
          <div className="flex items-center justify-center gap-7">
            {[1, 2, 3, 4, 5, 6].map((index) => (
              <BlurFade
                direction="up"
                duration={0.7}
                delay={index * 0.1}
                inView
                key={index}
                className="bg-muted flex h-20 w-48 items-center justify-center"
              >
                {index}
              </BlurFade>
            ))}
          </div>
          <div className="flex items-center justify-center gap-7">
            {[1, 2, 3, 4, 5, 6].map((index) => (
              <BlurFade
                direction="up"
                duration={0.7}
                delay={index * 0.1}
                inView
                key={index}
                className="bg-muted flex h-20 w-48 items-center justify-center"
              >
                {index}
              </BlurFade>
            ))}
          </div>
          <div className="flex items-center justify-center gap-7">
            {[1, 2, 3, 4, 5, 6].map((index) => (
              <BlurFade
                direction="up"
                duration={0.7}
                delay={index * 0.1}
                inView
                key={index}
                className="bg-muted flex h-20 w-48 items-center justify-center"
              >
                {index}
              </BlurFade>
            ))}
          </div>
        </div>
      )}
      {isMobile && (
        <div
          className={cn(
            'relative flex h-full w-full items-center justify-center overflow-hidden',
            isMobile ? 'flex-col' : 'flex-row',
          )}
        >
          <Marquee
            pauseOnHover
            vertical={isMobile ? false : true}
            className="[--duration:20s]"
          >
            {[1, 2, 3, 4, 5, 6].map((index) => (
              <div key={index} className="bg-muted h-20 w-48"></div>
            ))}
          </Marquee>
          <Marquee
            reverse
            pauseOnHover
            vertical={isMobile ? false : true}
            className="[--duration:20s]"
          >
            {[1, 2, 3, 4, 5, 6].map((index) => (
              <div key={index} className="bg-muted h-20 w-48"></div>
            ))}
          </Marquee>
        </div>
      )}
    </section>
  );
}
