import { RootContent } from './root-content';
import { Card, CardContent } from './ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from './ui/carousel';

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
        <div className="mb-20 flex items-center justify-center gap-5">
          {[1, 2, 3, 4, 5].map((index) => (
            <div key={index} className="bg-muted h-20 w-48"></div>
          ))}
        </div>
        <Carousel className="w-full max-w-2xl">
          <CarouselContent className="-ml-2">
            {Array.from({ length: 6 }).map((_, index) => (
              <CarouselItem
                key={index}
                className="pl-2 md:basis-1/2 lg:basis-1/3"
              >
                <div className="p-1">
                  <Card>
                    <CardContent className="flex aspect-square items-center justify-center p-6">
                      <span className="text-2xl font-semibold">
                        {index + 1}
                      </span>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </section>
    </RootContent>
  );
}
