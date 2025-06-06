import { useAverage } from '@/hooks/use-average';
import { cn } from '@/lib/utils';
import { Course, Module } from '@/types';
import { Link } from '@inertiajs/react';
import {
  Book,
  ChartColumnDecreasingIcon,
  CircleCheckBig,
  CircleDollarSign,
  StarIcon,
  TimerIcon,
  Users2,
} from 'lucide-react';
import { Badge } from './ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card';
import { ShineBorder } from './ui/shine-border';

export function CourseCard({ course }: { course: Course }) {
  const getAverage = useAverage();

  return (
    <Card className="relative">
      <CardHeader>
        <div className="flex gap-5">
          <div className="h-32 w-60">
            <img
              className="h-full w-full object-cover"
              src={`/storage/${course.image}`}
              alt={course.title}
            />
          </div>
          <div className="flex w-full flex-col">
            <CardTitle>
              <Link href={`/academies/${course.id}`}>{course.title}</Link>
            </CardTitle>
            <CardDescription className="mt-5 flex flex-col gap-4">
              <div className="flex gap-4">
                <span className="flex items-center gap-2">
                  <TimerIcon className="h-4 w-4 text-blue-400" />
                  {course.duration} Jam
                </span>
                <span className="flex items-center gap-2">
                  <StarIcon
                    className="h-4 w-4 text-amber-400"
                    fill="currentColor"
                  />
                  {course.ratings.length > 0
                    ? getAverage(course.ratings.map((rating) => rating.rating))
                    : 0}
                </span>
                <span className="flex items-center gap-2 capitalize">
                  <ChartColumnDecreasingIcon className="h-4 w-4 text-violet-400" />
                  {course.difficulty}
                </span>
              </div>
              <div className="flex gap-4">
                <span className="flex items-center gap-2 capitalize">
                  {course.price > 0 ? (
                    <CircleCheckBig className="h-4 w-4 text-cyan-400" />
                  ) : (
                    <CircleDollarSign className="h-4 w-4 text-green-400" />
                  )}
                  <Badge
                    variant="secondary"
                    className={cn(
                      course.price > 0 ? 'text-cyan-400' : 'text-green-400',
                    )}
                  >
                    {course.price > 0 ? 'Gratis' : 'Berbayar'}
                  </Badge>
                </span>
                <span className="flex items-center gap-2 capitalize">
                  <Book className="h-4 w-4 text-cyan-400" />
                  {(course.modules as Module[]).length} Module
                </span>
              </div>
              <span className="flex items-center gap-2 capitalize">
                <Users2 className="h-4 w-4 text-yellow-400" />
                {course.students.length} Siswa Terdaftar
              </span>
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="text-muted-foreground text-sm">
        {course.information}
      </CardContent>
      <ShineBorder shineColor={['#A07CFE', '#FE8FB5', '#FFBE7B']} />
    </Card>
  );
}
