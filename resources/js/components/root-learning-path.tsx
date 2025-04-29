import { CardsCarousel } from './cards-carousel';
import { RootContent } from './root-content';
import { BlurFade } from './ui/blur-fade';

const learningPaths = [
  'google.png',
  'microsoft.png',
  'aws.png',
  'ibm.png',
  'line.png',
];

export function RootLearningPath() {
  return (
    <RootContent>
      <section className="mb-10 flex flex-col items-center">
        <div className="mb-20 text-center">
          <h2 className="mb-5 text-2xl font-semibold">
            <BlurFade direction="up" duration={0.7} inView>
              Learning Path
            </BlurFade>
          </h2>
          <p className="text-muted-foreground">
            <BlurFade
              direction="right"
              duration={0.7}
              offset={20}
              delay={0.5}
              inView
            >
              Learning path akan membantu Anda dalam belajar di Academy
            </BlurFade>
          </p>
          <p className="text-muted-foreground">
            <BlurFade
              direction="left"
              duration={0.7}
              offset={20}
              delay={0.5}
              inView
            >
              dengan kurikulum yang dibangun bersama pelaku industri ternama.
            </BlurFade>
          </p>
        </div>
        <div className="mb-20 flex flex-wrap items-center justify-center gap-5">
          {learningPaths.map((learning, index) => (
            <BlurFade
              key={index}
              direction="up"
              duration={0.7}
              delay={index * 0.1}
              inView
              className="bg-accent-foreground flex h-20 w-48 items-center justify-center rounded-xl"
            >
              <img className="w-36" src={`/${learning}`} alt="learning" />
            </BlurFade>
          ))}
        </div>
        <CardsCarousel />
      </section>
    </RootContent>
  );
}
