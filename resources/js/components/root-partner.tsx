import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import { BlurFade } from './ui/blur-fade';
import { Marquee } from './ui/marquee';

const partnerList = [
  'google.png',
  'microsoft.png',
  'aws.png',
  'ibm.png',
  'indosat.png',
  'kemenparekraf.png',
  'lintasarta.png',
  'line.png',
  'alcatel.png',
  'samsung.png',
  'ericsson.png',
  'dbsf.png',
  'lenovo.png',
  'intel.png',
  'xl.png',
  'kemkominfo.png',
  'kampus-merdeka.png',
  'bangkit.png',
];

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
            {Array.from(partnerList.slice(0, 6)).map((partner, index) => (
              <BlurFade
                direction="up"
                duration={0.7}
                delay={index * 0.1}
                inView
                key={index}
                className="bg-accent-foreground flex h-20 w-48 items-center justify-center rounded-xl"
              >
                <img className="w-36" src={`/${partner}`} alt="partner" />
              </BlurFade>
            ))}
          </div>
          <div className="flex items-center justify-center gap-7">
            {Array.from(partnerList.slice(6, 12)).map((partner, index) => (
              <BlurFade
                direction="up"
                duration={0.7}
                delay={index * 0.1}
                inView
                key={index}
                className="bg-accent-foreground flex h-20 w-48 items-center justify-center rounded-xl"
              >
                <img className="w-36" src={`/${partner}`} alt="partner" />
              </BlurFade>
            ))}
          </div>
          <div className="flex items-center justify-center gap-7">
            {Array.from(partnerList.slice(12, 18)).map((partner, index) => (
              <BlurFade
                direction="up"
                duration={0.7}
                delay={index * 0.1}
                inView
                key={index}
                className="bg-accent-foreground flex h-20 w-48 items-center justify-center rounded-xl"
              >
                <img className="w-36" src={`/${partner}`} alt="partner" />
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
            {Array.from(partnerList.slice(0, 13)).map((partner, index) => (
              <BlurFade
                direction="up"
                duration={0.7}
                delay={index * 0.1}
                inView
                key={index}
                className="bg-accent-foreground flex h-20 w-48 items-center justify-center rounded-xl"
              >
                <img className="w-36" src={`/${partner}`} alt="partner" />
              </BlurFade>
            ))}
          </Marquee>
          <Marquee
            reverse
            pauseOnHover
            vertical={isMobile ? false : true}
            className="[--duration:20s]"
          >
            {Array.from(partnerList.slice(4, 18)).map((partner, index) => (
              <div
                key={index}
                className="bg-accent-foreground flex h-20 w-48 items-center justify-center rounded-xl"
              >
                <img className="w-36" src={`/${partner}`} alt="partner" />
              </div>
            ))}
          </Marquee>
        </div>
      )}
    </section>
  );
}
