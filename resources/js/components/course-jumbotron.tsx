import { Course, SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  ChartColumn,
  ChartColumnIncreasing,
  GitCommitHorizontal,
  StarIcon,
  TimerIcon,
  Users2,
} from 'lucide-react';
import { RootContent } from './root-content';
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

export function CourseJumbotron({
  course,
}: {
  course: {
    data: Course;
  };
}) {
  const data = usePage<SharedData>().props.courses.data;

  return (
    <section className="overflow-hidden p-5 pt-32">
      <RootContent>
        <div className="flex flex-col gap-5 lg:flex-row">
          <div className="bg-muted h-60 w-full lg:w-1/4"></div>
          <div className="w-full lg:w-2/4">
            <Card className="border-none">
              <CardHeader>
                <span className="mb-4 flex items-center gap-1 text-sm font-semibold">
                  <StarIcon
                    className="w-6 text-yellow-300"
                    fill="currentColor"
                  />
                  4.00
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
                          <p>
                            Kelas ini merupakan langkah ke-{course.data.order}{' '}
                            dari learning path {course.data.academic.title}
                          </p>
                          <div className="grid grid-cols-2">
                            {data.find(
                              (d) => d.order === course.data.order - 1,
                            ) && (
                              <Link
                                href={`/academies/${data.find((d) => d.order === course.data.order - 1)?.id}`}
                              >
                                <Card className="group cursor-pointer border-none">
                                  <CardHeader>
                                    <span className="flex items-center gap-2">
                                      <ArrowLeft className="text-muted-foreground w-4 transition-all duration-100 group-hover:-translate-x-1" />
                                      <p className="text-muted-foreground text-xs">
                                        Langkah sebelumnya
                                      </p>
                                    </span>
                                  </CardHeader>
                                  <CardContent>
                                    <span className="flex items-center gap-2">
                                      <ChartColumnIncreasing className="w-4" />
                                      <p className="text-xs">
                                        Langkah {course.data.order - 1}
                                      </p>
                                    </span>
                                    <h3 className="my-2 text-lg font-semibold group-hover:underline">
                                      {
                                        data?.find(
                                          (d) =>
                                            d.order === course.data.order - 1,
                                        )?.title
                                      }
                                    </h3>
                                    <div className="flex items-center gap-4">
                                      <span className="flex items-center gap-1">
                                        <TimerIcon className="w-4 text-blue-500" />
                                        <p className="text-muted-foreground text-xs">
                                          {
                                            data.find(
                                              (d) =>
                                                d.order ===
                                                course.data.order - 1,
                                            )?.duration
                                          }{' '}
                                          Jam Belajar
                                        </p>
                                      </span>
                                      <span className="flex items-center gap-1">
                                        <StarIcon
                                          className="w-4 text-yellow-300"
                                          fill="currentColor"
                                        />
                                        <p className="text-muted-foreground text-xs">
                                          4.0
                                        </p>
                                      </span>
                                      <span className="flex items-center gap-1">
                                        <ChartColumn className="w-4 text-violet-500" />
                                        <p className="text-muted-foreground text-sm">
                                          {
                                            data.find(
                                              (d) =>
                                                d.order ===
                                                course.data.order - 1,
                                            )?.difficulty
                                          }
                                        </p>
                                      </span>
                                    </div>
                                  </CardContent>
                                </Card>
                              </Link>
                            )}
                            {data.find(
                              (d) => d.order === course.data.order + 1,
                            ) && (
                              <Link
                                href={`/academies/${data.find((d) => d.order === course.data.order + 1)?.id}`}
                              >
                                <Card className="group cursor-pointer border-none">
                                  <CardHeader>
                                    <span className="flex items-center gap-2">
                                      <p className="text-muted-foreground text-sm">
                                        Langkah selanjutnya
                                      </p>
                                      <ArrowRight className="text-muted-foreground w-4 transition-all duration-100 group-hover:translate-x-1" />
                                    </span>
                                  </CardHeader>
                                  <CardContent>
                                    <span className="flex items-center gap-2">
                                      <ChartColumnIncreasing className="w-4" />
                                      <p className="text-xs">
                                        Langkah {course.data.order + 1}
                                      </p>
                                    </span>
                                    <h3 className="my-2 text-lg font-semibold group-hover:underline">
                                      {
                                        data?.find(
                                          (d) =>
                                            d.order === course.data.order + 1,
                                        )?.title
                                      }
                                    </h3>
                                    <div className="flex items-center gap-4">
                                      <span className="flex items-center gap-1">
                                        <TimerIcon className="w-4 text-blue-500" />
                                        <p className="text-muted-foreground text-xs">
                                          {data
                                            .find(
                                              (d) =>
                                                d.order ===
                                                course.data.order + 1,
                                            )
                                            ?.duration?.toString()}{' '}
                                          Jam Belajar
                                        </p>
                                      </span>
                                      <span className="flex items-center gap-1">
                                        <StarIcon
                                          className="w-4 text-yellow-300"
                                          fill="currentColor"
                                        />
                                        <p className="text-muted-foreground text-xs">
                                          4.0
                                        </p>
                                      </span>
                                      <span className="flex items-center gap-1">
                                        <ChartColumn className="w-4 text-violet-500" />
                                        <p className="text-muted-foreground text-xs">
                                          {data
                                            .find(
                                              (d) =>
                                                d.order ===
                                                course.data.order + 1,
                                            )
                                            ?.difficulty?.toString()}
                                        </p>
                                      </span>
                                    </div>
                                  </CardContent>
                                </Card>
                              </Link>
                            )}
                          </div>
                          <Separator className="my-4" />
                          <div className="flex items-center justify-end">
                            <Button
                              variant="link"
                              className="group cursor-pointer text-sm"
                            >
                              <Link
                                href={`/learning-paths/${course.data.academic.id}`}
                              >
                                Detail Learning Path
                              </Link>
                              <ArrowUpRight className="transition-all duration-100 group-hover:translate-x-[2px] group-hover:-translate-y-[2px]" />
                            </Button>
                          </div>
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
                          <p>
                            Lorem ipsum dolor sit amet consectetur, adipisicing
                            elit. Dolorum, hic.
                          </p>
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
                  <Users2 className="w-4" />
                  <span className="text-muted-foreground text-sm">
                    100k Siswa Terdaftar
                  </span>
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
            <Card>
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
            </Card>
          </div>
        </div>
      </RootContent>
      <Separator className="mt-20" />
    </section>
  );
}
