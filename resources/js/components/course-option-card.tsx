import { useAverage } from '@/hooks/use-average';
import { cn } from '@/lib/utils';
import { Course, SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { Separator } from '@radix-ui/react-separator';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  ChartColumn,
  ChartColumnIncreasing,
  StarIcon,
  TimerIcon,
} from 'lucide-react';
import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader } from './ui/card';

export function CourseOptionCard({
  course,
}: {
  course: {
    data: Course;
  };
}) {
  const data = usePage<SharedData>().props.courses.data;

  return (
    <React.Fragment>
      <p>
        Kelas ini merupakan langkah ke-{course.data.order} dari learning path{' '}
        {course.data.academic.title}
      </p>
      <div className="grid grid-cols-2">
        <CourseCard data={data} course={course} />
        <CourseCard data={data} course={course} isNext />
      </div>
      <Separator className="my-4" />
      <div className="flex items-center justify-end">
        <Button variant="link" className="group cursor-pointer text-sm">
          <Link href={`/learning-paths/${course.data.academic.id}`}>
            Detail Learning Path
          </Link>
          <ArrowUpRight className="transition-all duration-100 group-hover:translate-x-[2px] group-hover:-translate-y-[2px]" />
        </Button>
      </div>
    </React.Fragment>
  );
}

export function CourseCard({
  data,
  course,
  isNext = false,
}: {
  data: Course[];
  course: {
    data: Course;
  };
  isNext?: boolean;
}) {
  const Arrow = isNext ? ArrowRight : ArrowLeft;
  const isNextStep = isNext ? course.data.order + 1 : course.data.order - 1;
  const ratings = isNext
    ? data
        .find((d) => d.order === course.data.order + 1)
        ?.ratings.map((r) => r.rating)
    : data
        .find((d) => d.order === course.data.order - 1)
        ?.ratings.map((r) => r.rating);
  const getAverage = useAverage();

  return (
    <React.Fragment>
      {data.find((d) => d.order === isNextStep) && (
        <Link
          href={`/academies/${data.find((d) => d.order === isNextStep)?.id}`}
        >
          <Card className="group cursor-pointer border-none">
            <CardHeader>
              <span className="flex items-center gap-2">
                <p
                  className={cn(
                    'text-muted-foreground text-sm',
                    isNext ? 'order-1' : 'order-2',
                  )}
                >
                  Langkah selanjutnya
                </p>
                <Arrow
                  className={cn(
                    'text-muted-foreground w-4 transition-all duration-100',
                    isNext
                      ? 'order-2 group-hover:translate-x-1'
                      : 'order-1 group-hover:-translate-x-1',
                  )}
                />
              </span>
            </CardHeader>
            <CardContent>
              <span className="flex items-center gap-2">
                <ChartColumnIncreasing className="w-4" />
                <p className="text-xs">Langkah {isNextStep}</p>
              </span>
              <h3 className="my-2 text-lg font-semibold group-hover:underline">
                {data?.find((d) => d.order === isNextStep)?.title}
              </h3>
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1">
                  <TimerIcon className="w-4 text-blue-500" />
                  <p className="text-muted-foreground text-xs">
                    {data
                      .find((d) => d.order === isNextStep)
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
                    {getAverage(ratings!)}
                  </p>
                </span>
                <span className="flex items-center gap-1">
                  <ChartColumn className="w-4 text-violet-500" />
                  <p className="text-muted-foreground text-xs">
                    {data
                      .find((d) => d.order === isNextStep)
                      ?.difficulty?.toString()}
                  </p>
                </span>
              </div>
            </CardContent>
          </Card>
        </Link>
      )}
    </React.Fragment>
  );
}
