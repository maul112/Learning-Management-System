import { useData } from '@/contexts/DataContext';
import { ChartColumn, StarIcon, TimerIcon } from 'lucide-react';
import { BorderBeam } from './ui/border-beam';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card';
import { Timeline } from './ui/timeline';

export function LearningPathContent() {
  const academic = useData()?.data?.academic;

  const academicData = academic?.data.courses.map((course) => ({
    title: 'Langkah ' + String(course.order),
    content: (
      <Card className="relative">
        <CardHeader>
          <img
            className="h-60 w-full object-cover mb-5"
            src={`/storage/${course.image}`}
            alt=""
          />
          <CardTitle className="mb-3 text-xl md:text-3xl">
            {course.title}
          </CardTitle>
          <CardDescription className="md:text-lg">
            {course.description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1">
              <TimerIcon className="text-cyan-400" />
              {course.duration} Jam
            </span>
            <span className="flex items-center gap-1">
              <StarIcon className="text-amber-400" fill="currentColor" />
              4.0
            </span>
            <span className="flex items-center gap-1 capitalize">
              <ChartColumn className="text-violet-400" />
              {course.difficulty}
            </span>
          </div>
        </CardContent>
        <BorderBeam duration={8} size={100} />
      </Card>
    ),
  }));

  return (
    <div className="relative w-full overflow-clip">
      <Timeline
        heading={academic?.data.title as string}
        description={academic?.data.description as string}
        data={academicData || []}
      />
    </div>
  );
}
