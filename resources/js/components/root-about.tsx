import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { RootContent } from './root-content';

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
            Kenapa NextLMS Berbeda
          </h2>
          <p className="text-muted-foreground text-center">
            Saatnya bijak memilih sumber belajar. Tak hanya materi yang
            terjamin,
          </p>
          <p className="text-muted-foreground text-center">
            NextLMS juga memiliki reviewer profesional yang akan mengulas kode
            Anda.
          </p>
        </div>
        <div className="flex flex-col justify-center gap-5 lg:gap-20 lg:flex-row">
          <Accordion
            type="single"
            collapsible
            className="order-2 w-full p-4 lg:order-1 lg:w-1/3"
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
          <div className="bg-muted h-96 w-full lg:w-xl order-1 lg:order-2"></div>
        </div>
      </section>
    </RootContent>
  );
}
