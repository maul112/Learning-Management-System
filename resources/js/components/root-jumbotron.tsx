import { itemZoomVariant } from '@/lib/animation';
import { motion } from 'framer-motion';
import { RootContent } from './root-content';
import { BlurFade } from './ui/blur-fade';
import { Button } from './ui/button';

export function RootJumbotron() {
  return (
    <RootContent>
      <section className="mb-20 flex flex-col gap-0 pt-32 md:flex-row md:items-center md:justify-center md:gap-4">
        <div className="order-2 p-10 py-0 md:order-1 md:w-1/2 md:py-20">
          <div className="mb-5">
            <h2 className="mb-4 text-2xl font-semibold md:text-4xl">
              <BlurFade direction="up" offset={20} duration={0.7} inView>
                Bangun Karirmu Sebagai
              </BlurFade>
            </h2>
            <h2 className="text-2xl font-semibold md:text-4xl">
              <BlurFade
                direction="right"
                offset={20}
                duration={0.7}
                delay={0.5}
                inView
              >
                <span className="rounded-xl bg-cyan-500 px-2 py-1">
                  Developer
                </span>{' '}
                Profesional
              </BlurFade>
            </h2>
          </div>
          <p className="text-muted-foreground mb-9">
            <BlurFade
              direction="up"
              offset={20}
              duration={0.7}
              delay={1}
              inView
            >
              Mulai belajar terarah dengan learning path
            </BlurFade>
          </p>
          <Button
            variant="secondary"
            className="cursor-pointer p-6"
            size="lg"
            asChild
          >
            <motion.div
              initial="hidden"
              animate="show"
              variants={itemZoomVariant}
            >
              Belajar Sekarang
            </motion.div>
          </Button>
        </div>
        <div className="order-1 mb-10 p-10 py-0 md:order-2 md:mb-0 md:w-1/2 md:py-20">
          <motion.img
            initial="hidden"
            animate="show"
            variants={itemZoomVariant}
            src="https://assets.cdn.dicoding.com/original/commons/homepage-hero.png"
            alt=""
          />
        </div>
      </section>
    </RootContent>
  );
}
