import {
  BookCopy,
  ChartBarStackedIcon,
  FileBadge,
  FileCode2,
  FilePen,
  MessagesSquare,
  NotepadText,
} from 'lucide-react';
import { RootContent } from './root-content';
import { Carousel } from './ui/apple-cards-carousel';
import { Card, CardContent, CardHeader } from './ui/card';
import { Separator } from './ui/separator';
import { ShineBorder } from './ui/shine-border';

const cardsGetInData = [
  {
    icon: FileBadge,
    title: 'Sertifikat',
    description:
      'Dapatkan sertifikat standar industri setelah menyelesaikan kelas ini.',
  },
  {
    icon: FileCode2,
    title: 'Code Review',
    description:
      'Kode yang Anda kerjakan akan di-review secara komprehensif oleh Reviewer.',
  },
  {
    icon: MessagesSquare,
    title: 'Forum Diskusi',
    description: 'Diskusikan materi belajar dengan siswa lainnya',
  },
  {
    icon: BookCopy,
    title: 'Modul Tutorial',
    description:
      'Materi bacaan elektronik disajikan dengan bahasa yang mudah dipahami.',
  },
  {
    icon: ChartBarStackedIcon,
    title: 'Submission',
    description:
      'Uji kemampuan teknis Anda dengan mengerjakan tugas submission.',
  },
  {
    icon: FilePen,
    title: 'Kuis',
    description:
      'Kuis pilihan ganda membantu Anda memahami materi yang dipelajari.',
  },
  {
    icon: NotepadText,
    title: 'Ujian',
    description:
      'Validasi pengetahuan Anda dengan mengerjakan soal-soal ujian.',
  },
];

export function CourseGetIn() {
  const cardsGetIn = cardsGetInData.map((card, index) => (
    <Card className="relative h-40 w-80" key={index}>
      <CardHeader>
        <div className="flex items-center gap-3">
          <card.icon />
          <h3 className="text-md font-semibold">{card.title}</h3>
        </div>
      </CardHeader>
      <CardContent className="text-muted-foreground pl-16 text-sm">
        {card.description}
      </CardContent>
      <ShineBorder shineColor={['#A07CFE', '#FE8FB5', '#FFBE7B']} />
    </Card>
  ));

  return (
    <RootContent>
      <div className="relative mt-5">
        <h2 className="absolute left-5 text-lg font-semibold md:text-2xl lg:left-0">
          Apa yang Anda dapatkan
        </h2>
        <div className="flex items-center gap-4">
          <Carousel items={cardsGetIn} />
        </div>
      </div>
      <Separator />
    </RootContent>
  );
}
