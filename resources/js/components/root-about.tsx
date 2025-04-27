import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { RootContent } from './root-content';
import { BlurFade } from './ui/blur-fade';

const accordionItems = [
  {
    title: 'Kurikulum standar industri global',
    content:
      'Kurikulum dikembangkan bersama perusahaan dan pemilik teknologi dunia sesuai kebutuhan industri terkini.',
  },
  {
    title: 'Belajar fleksibel sesuai jadwal Anda',
    content:
      'Belajar kapan pun, di mana pun, secara mandiri. Bebas memilih kelas sesuai minat belajar. Akses seumur hidup ke kelas dan forum diskusi setelah lulus.',
  },
  {
    title: 'Code Review dari Developer Expert',
    content:
      'Validasi skill Anda melalui 1-on-1 Professional Code Review yang diberikan langsung oleh Developer Expert.',
  },
  {
    title: 'Alumni terpercaya di berbagai perusahaan',
    content:
      'Sertifikat yang membuktikan pengetahuan fundamental beserta keterampilan nyata yang diinginkan perusahaan global.',
  },
];

export function RootAbout() {
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
        <div className="flex flex-col justify-center gap-5 lg:flex-row lg:gap-20">
          <BlurFade
            direction="right"
            duration={0.7}
            offset={20}
            inView
            className="order-2 w-full p-4 lg:order-1 lg:w-1/3"
          >
            <Accordion
              defaultValue="Kurikulum standar industri global"
              type="single"
              collapsible
            >
              {accordionItems.map((item) => (
                <AccordionItem value={item.title} key={item.title}>
                  <AccordionTrigger className="h-20 text-lg font-semibold">
                    {item.title}
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">{item.content}</p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </BlurFade>
          <BlurFade
            direction="left"
            duration={0.7}
            offset={20}
            inView
            className="bg-muted order-1 flex h-96 w-full items-center justify-center lg:order-2 lg:w-xl"
          >
            1
          </BlurFade>
        </div>
      </section>
    </RootContent>
  );
}
