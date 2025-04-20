import { RootContent } from './root-content';
import { Button } from './ui/button';

export function RootJumbotron() {
  return (
    <RootContent>
      <section className="mb-10 flex flex-col gap-0 pt-32 md:flex-row md:items-center md:justify-center md:gap-4">
        <div className="order-2 p-20 py-0 md:order-1 md:w-1/2 md:py-20">
          <div className="mb-5">
            <h2 className="mb-4 text-2xl font-semibold md:text-4xl">
              Bangun Karirmu Sebagai
            </h2>
            <h2 className="text-2xl font-semibold md:text-4xl">
              <span className="rounded-xl bg-cyan-500 px-2 py-1">
                Developer
              </span>{' '}
              Profesional
            </h2>
          </div>
          <p className="text-muted-foreground mb-9">
            Mulai belajar terarah dengan learning path
          </p>
          <Button variant="secondary" className="p-6" size="lg">
            Belajar Sekarang
          </Button>
        </div>
        <div className="order-1 mb-10 p-20 py-0 md:order-2 md:mb-0 md:w-1/2 md:py-20">
          <img
            src="https://assets.cdn.dicoding.com/original/commons/homepage-hero.png"
            alt=""
          />
        </div>
      </section>
    </RootContent>
  );
}
