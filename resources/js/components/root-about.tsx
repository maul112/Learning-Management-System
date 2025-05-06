import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useState } from 'react';
import { RootContent } from './root-content';
import { BlurFade } from './ui/blur-fade';

const accordionItems = [
  {
    title: 'Kurikulum standar industri global',
    content:
      'Kurikulum dikembangkan bersama perusahaan dan pemilik teknologi dunia sesuai kebutuhan industri terkini.',
    image: '/about-1.avif',
  },
  {
    title: 'Belajar fleksibel sesuai jadwal Anda',
    content:
      'Belajar kapan pun, di mana pun, secara mandiri. Bebas memilih kelas sesuai minat belajar. Akses seumur hidup ke kelas dan forum diskusi setelah lulus.',
    image: '/about-2.avif',
  },
  {
    title: 'Code Review dari Developer Expert',
    content:
      'Validasi skill Anda melalui 1-on-1 Professional Code Review yang diberikan langsung oleh Developer Expert.',
    image: '/about-3.jpg',
  },
  {
    title: 'Alumni terpercaya di berbagai perusahaan',
    content:
      'Sertifikat yang membuktikan pengetahuan fundamental beserta keterampilan nyata yang diinginkan perusahaan global.',
    image: '/about-4.jpg',
  },
];

export function RootAbout() {
  const [activeItem, setActiveItem] = useState(accordionItems[0].title);
  const [openAccordion, setOpenAccordion] = useState(accordionItems[0].title);

  const handleAccordionChange = (value: string) => {
    setOpenAccordion(value);
  };

  return (
    <RootContent>
      <section className="mb-32 flex flex-col gap-2 p-10 lg:p-0">
        <div className="mb-20">
          <h2 className="mb-4 text-center text-2xl font-semibold">
            <BlurFade direction="up" duration={0.7} inView>
              Kenapa harus belajar di NextLMS
            </BlurFade>
          </h2>
          <p className="text-muted-foreground text-center">
            <BlurFade
              direction="right"
              duration={0.7}
              offset={20}
              delay={0.5}
              inView
            >
              Saatnya bijak memilih sumber belajar. Tak hanya materi yang
              terjamin,
            </BlurFade>
          </p>
          <p className="text-muted-foreground text-center">
            <BlurFade
              direction="left"
              duration={0.7}
              offset={20}
              delay={0.5}
              inView
            >
              NextLMS juga memiliki reviewer profesional yang akan mengulas kode
              Anda.
            </BlurFade>
          </p>
        </div>

        <Tabs
          value={activeItem}
          onValueChange={setActiveItem}
          className="w-full"
        >
          <div className="flex flex-col justify-center gap-5 lg:flex-row lg:gap-20">
            {/* Left side - Accordion with TabsTrigger */}
            <BlurFade
              direction="right"
              duration={0.7}
              offset={20}
              inView
              className="order-2 w-full lg:order-1 lg:w-1/3"
            >
              <div className="vertical-tabs p-4">
                <TabsList className="flex h-auto w-full flex-col space-y-2 bg-transparent p-0">
                  <Accordion
                    type="single"
                    collapsible
                    value={openAccordion}
                    onValueChange={handleAccordionChange}
                    className="w-full"
                  >
                    {accordionItems.map((item) => (
                      <AccordionItem
                        value={item.title}
                        key={item.title}
                        className={`border-b ${
                          activeItem === item.title ? 'bg-muted/50' : ''
                        }`}
                      >
                        <div className="flex w-full items-center">
                          <TabsTrigger
                            value={item.title}
                            className="flex h-20 w-full justify-start px-4 text-left text-lg font-semibold data-[state=active]:bg-transparent"
                            onClick={() => setOpenAccordion(item.title)}
                          >
                            <AccordionTrigger className="w-full">
                              {item.title}
                            </AccordionTrigger>
                          </TabsTrigger>
                        </div>
                        <AccordionContent className="px-4 pb-4">
                          <p className="text-muted-foreground">
                            {item.content}
                          </p>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </TabsList>
              </div>
            </BlurFade>

            {/* Right side - Image content */}
            <BlurFade
              direction="left"
              duration={0.7}
              offset={20}
              inView
              className="order-1 h-96 w-full overflow-hidden rounded-lg lg:order-2 lg:w-xl"
            >
              {accordionItems.map((item) => (
                <TabsContent
                  key={item.title}
                  value={item.title}
                  className="h-full w-full"
                >
                  <div className="flex h-full w-full items-center justify-center overflow-hidden rounded-xl">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-full w-full object-contain"
                    />
                  </div>
                </TabsContent>
              ))}
            </BlurFade>
          </div>
        </Tabs>
      </section>
    </RootContent>
  );
}
