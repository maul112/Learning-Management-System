import { CardsCarousel } from './cards-carousel';
import { RootContent } from './root-content';

export function RootLearningPath() {
  return (
    <RootContent>
      <section className="mb-10 flex flex-col items-center">
        <div className="mb-20 text-center">
          <h2 className="mb-5 text-2xl font-semibold">Learning Path</h2>
          <p className="text-muted-foreground">
            Learning path akan membantu Anda dalam belajar di Academy
          </p>
          <p className="text-muted-foreground">
            dengan kurikulum yang dibangun bersama pelaku industri ternama.
          </p>
        </div>
        <div className="mb-20 flex flex-wrap items-center justify-center gap-5">
          {[1, 2, 3, 4, 5].map((index) => (
            <div key={index} className="bg-muted h-20 w-48"></div>
          ))}
        </div>
        <CardsCarousel />
      </section>
    </RootContent>
  );
}
