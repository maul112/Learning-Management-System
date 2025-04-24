import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import { Marquee } from './ui/marquee';

export function RootPartner() {
  const isMobile = useIsMobile();

  return (
    <section className="mb-10 flex flex-col gap-5">
      <h3 className="text-center text-xl font-semibold">
        Telah dipercaya oleh
      </h3>
      {!isMobile && (
        <div className="flex flex-col gap-7">
          <div className="flex items-center justify-center gap-7">
            {[1, 2, 3, 4, 5, 6].map((index) => (
              <div key={index} className="bg-muted h-20 w-48"></div>
            ))}
          </div>
          <div className="flex items-center justify-center gap-7">
            {[1, 2, 3, 4, 5, 6].map((index) => (
              <div key={index} className="bg-muted h-20 w-48"></div>
            ))}
          </div>
          <div className="flex items-center justify-center gap-7">
            {[1, 2, 3, 4, 5, 6].map((index) => (
              <div key={index} className="bg-muted h-20 w-48"></div>
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
