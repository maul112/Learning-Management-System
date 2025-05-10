import { useAverage } from '@/hooks/use-average';
import { Course } from '@/types';
import { Link } from '@inertiajs/react';
import { ChartColumnDecreasingIcon, StarIcon, TimerIcon } from 'lucide-react';
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
          <div className="h-32 w-60 bg-slate-200"></div>
          <div className="flex w-full flex-col">
            <CardTitle>
              <Link href={`/academies/${course.id}`}>{course.title}</Link>
            </CardTitle>
            <CardDescription className="mt-5 flex items-center gap-4">
              <span className="flex items-center gap-2">
                <TimerIcon className="h-4 w-4 text-blue-400" />
                {course.duration} Jam
              </span>
              <span className="flex items-center gap-2">
                <StarIcon
                  className="h-4 w-4 text-amber-400"
                  fill="currentColor"
                />
                {getAverage(course.ratings.map((rating) => rating.rating))}
              </span>
              <span className="flex items-center gap-2 capitalize">
                <ChartColumnDecreasingIcon className="h-4 w-4 text-cyan-400" />
                {course.difficulty}
              </span>
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>{course.information}</CardContent>
      <ShineBorder shineColor={['#A07CFE', '#FE8FB5', '#FFBE7B']} />
    </Card>
  );
}
