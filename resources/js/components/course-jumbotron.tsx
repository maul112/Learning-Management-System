import { useAverage } from '@/hooks/use-average';
import { cn } from '@/lib/utils';
import { Course } from '@/types';
import { Link } from '@inertiajs/react';
import {
  Book,
  ChartColumn,
  CircleCheckBig,
  CircleDollarSign,
  GitCommitHorizontal,
  StarIcon,
  TimerIcon,
  Users2,
} from 'lucide-react';
import { CourseOptionCard } from './course-option-card';
import { RootContent } from './root-content';
import { Badge } from './ui/badge';
import { BorderBeam } from './ui/border-beam';
import { Button } from './ui/button';
import { Card, CardContent, CardFooter, CardHeader } from './ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import { Separator } from './ui/separator';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './ui/tooltip';

const difficultyText: Record<string, string> = {
  beginner:
    'Level ini cocok untuk pemula yang belum memiliki pengetahuan sebelumnya. Materi disusun dari dasar dengan penjelasan sederhana dan langkah-langkah yang mudah diikuti.',
  intermediate:
    'Ditujukan bagi peserta yang sudah memahami konsep dasar. Materi mencakup pembahasan yang lebih mendalam dan latihan dengan tingkat kesulitan sedang.',
  advanced:
    'Diperuntukkan bagi peserta berpengalaman yang ingin memperdalam pemahaman. Fokus pada studi kasus, penerapan nyata, dan tantangan tingkat lanjut.',
};

export function CourseJumbotron({
  course,
}: {
  course: {
    data: Course;
  };
}) {
  const getAverage = useAverage();

  return (
    <section className="overflow-hidden p-5 pt-32">
      <RootContent>
        <div className="flex flex-col gap-5 lg:flex-row">
          <div className="bg-muted h-52 w-full lg:w-1/4">
            <img
              className="h-full w-full object-cover"
              src={`/storage/${course.data.image}`}
              alt={course.data.title}
            />
          </div>
          <div className="w-full lg:w-2/4">
            <Card className="border-none">
              <CardHeader>
                <span className="mb-4 flex items-center gap-1 text-sm font-semibold">
                  <StarIcon
                    className="w-6 text-yellow-300"
                    fill="currentColor"
                  />
                  {getAverage(
                    course.data.ratings.map((rating) => rating.rating),
                  )}
                  <GitCommitHorizontal />
                  <Dialog>
                    <DialogTrigger>
                      <p className="cursor-pointer underline">
                        {course.data.academic.title.split(' ')[0]}
                      </p>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[700px]">
                      <DialogHeader>
                        <DialogTitle>
                          Learning Path {course.data.academic.title}
                        </DialogTitle>
                        <Separator className="mb-2" />
                        <DialogDescription>
                          <CourseOptionCard course={course} />
                        </DialogDescription>
                      </DialogHeader>
                    </DialogContent>
                  </Dialog>
                  Learning Path
                </span>
                <h1 className="text-2xl font-bold">{course.data.title}</h1>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <ChartColumn className="w-4 text-violet-500" />
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger className="text-muted-foreground cursor-pointer text-sm underline">
                          Level: {course.data.difficulty}
                        </TooltipTrigger>
                        <TooltipContent side="right">
                          <h3 className="mb-2 text-xl font-semibold">
                            {course.data.difficulty}
                          </h3>
                          <p>{difficultyText[course.data.difficulty]}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <div className="flex items-center gap-2">
                    <TimerIcon className="w-4 text-blue-500" />
                    <span className="text-muted-foreground text-sm">
                      {course.data.duration} Jam Belajar
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-2">
                    <span className="flex items-center gap-2 capitalize">
                      {course.data.price > 0 ? (
                        <CircleCheckBig className="h-4 w-4 text-cyan-400" />
                      ) : (
                        <CircleDollarSign className="h-4 w-4 text-green-400" />
                      )}
                      <Badge
                        variant="secondary"
                        className={cn(
                          course.data.price > 0
                            ? 'text-cyan-400'
                            : 'text-green-400',
                        )}
                      >
                        {course.data.price > 0 ? 'Berbayar' : 'Gratis'}
                      </Badge>
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Book className="w-4 text-blue-400" />
                    <span className="text-muted-foreground text-sm">
                      {course.data.modules.length} Modul
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users2 className="w-4 text-yellow-400" />
                    <span className="text-muted-foreground text-sm">
                      {course.data.students.length} Siswa Terdaftar
                    </span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <p className="text-muted-foreground">
                  {course.data.information}
                </p>
              </CardFooter>
            </Card>
          </div>
          <div className="w-full lg:w-1/4">
            <Card className="relative">
              <CardHeader>
                <Button>
                  <Link href="/">Belajar Sekarang</Link>
                </Button>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-3">
                  <Button variant="secondary">Informasi kelas</Button>
                  <Button variant="secondary">Lihat silabus</Button>
                </div>
              </CardContent>
              <BorderBeam size={70} />
            </Card>
          </div>
        </div>
      </RootContent>
      <Separator className="mt-20" />
    </section>
  );
}
