import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowRight,
  BriefcaseBusiness,
  CalendarDays,
  Rocket,
} from 'lucide-react';
import { useState } from 'react';
import { RootContent } from './root-content';
import { BlurFade } from './ui/blur-fade';
import { Button } from './ui/button';
import { Separator } from './ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

const tabs = [
  {
    title: 'challenge',
    icon: Rocket,
    description:
      'Kami telah menyelenggarakan berbagai macam challenge dengan jutaan hadiah. Dengan platform Challenge, developer bisa mengasah skill yang dipelajari dari Academy.',
    image: '/challange.jpg',
  },
  {
    title: 'event',
    icon: CalendarDays,
    description:
      'Berkolaborasi dengan komunitas developer, kami telah menyelenggarakan event di berbagai kota yang dihadiri puluhan ribu developer dan praktisi teknologi Indonesia.',
    image: '/event.jpg',
  },
  {
    title: 'job',
    icon: BriefcaseBusiness,
    description:
      'Bekerjasama dengan beberapa industri, kami telah membantu developer Indonesia dalam mencari lapangan pekerjaan yang sesuai dengan skillnya.',
    image: '/job.jpg',
  },
];

export function RootJoin() {
  const [isActiveTab, setIsActiveTab] = useState<string>('challenge');

  return (
    <RootContent>
      <section className="mx-10 my-10 grid grid-cols-1 gap-6 lg:h-[500px] lg:grid-cols-2 lg:gap-3 lg:p-10">
        <div className="h-full w-full lg:p-5">
          <h2 className="mb-5 text-2xl font-semibold lg:text-3xl">
            <BlurFade direction="up" duration={0.7} inView>
              Bergabung dengan jaringan developer terbesar
            </BlurFade>
          </h2>
          <p className="text-muted-foreground mb-5 w-96 text-sm">
            <BlurFade
              direction="right"
              duration={0.7}
              delay={0.5}
              offset={20}
              inView
            >
              Selain belajar di Academy, Anda juga bisa mengikuti kegiatan dan
              layanan kami yang lain
            </BlurFade>
          </p>
          <Tabs
            defaultValue={isActiveTab}
            value={isActiveTab}
            onValueChange={(value) => setIsActiveTab(value)}
          >
            <TabsList className="grid w-full grid-cols-3 gap-4 bg-transparent">
              {tabs.map((tab, index) => (
                <TabsTrigger
                  key={index}
                  className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=inactive]:bg-muted data-[state=inactive]:hover:bg-muted/80 relative flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium capitalize"
                  value={tab.title}
                >
                  <tab.icon />
                  {tab.title}
                  {isActiveTab == tab.title && (
                    <motion.div
                      className="bg-primary absolute right-0 -bottom-1 left-0 h-0.5"
                      layoutId="activeTabIndicator"
                    />
                  )}
                </TabsTrigger>
              ))}
            </TabsList>
            <Separator className="bg-muted mt-12 w-full" />
            <AnimatePresence>
              {tabs.map((tab, index) => (
                <TabsContent key={index} value={tab.title} asChild>
                  <motion.div
                    initial={{ y: 10, opacity: 0 }}
                    animate={{
                      y: 0,
                      opacity: 1,
                      transition: {
                        duration: 0.7,
                      },
                    }}
                    exit={{ y: 10, opacity: 0 }}
                  >
                    <h2 className="mb-5 text-2xl font-semibold capitalize">
                      {tab.title}
                    </h2>
                    <p className="text-muted-foreground mb-5 text-sm">
                      {tab.description}
                    </p>
                    <Button
                      variant="link"
                      className="group cursor-pointer capitalize"
                    >
                      Lihat {tab.title}
                      <ArrowRight className="transition-all duration-100 group-hover:translate-x-1" />
                    </Button>
                  </motion.div>
                </TabsContent>
              ))}
            </AnimatePresence>
          </Tabs>
        </div>
        <div className="bg-muted h-96 w-full lg:h-full">
          {tabs.map((tab, index) => (
            <div
              key={index}
              className={`h-full w-full bg-cover bg-center ${
                isActiveTab == tab.title ? 'block' : 'hidden'
              }`}
              style={{
                backgroundImage: `url(${tab.image})`,
              }}
            />
          ))}
        </div>
      </section>
    </RootContent>
  );
}
