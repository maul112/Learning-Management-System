import { useAverage } from '@/hooks/use-average';
import { cn } from '@/lib/utils';
import { Academic, SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import {
  Book,
  ChartColumn,
  CircleCheckBig,
  CircleDollarSign,
  StarIcon,
  TimerIcon,
  Users2Icon,
} from 'lucide-react';
import { Badge } from './ui/badge';
import { BorderBeam } from './ui/border-beam';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card';
import { Timeline } from './ui/timeline';

export function LearningPathContent() {
  const { academic } = usePage<SharedData & { academics: { data: Academic } }>()
    .props;
  const getAverage = useAverage();

  const academicData = (academic as { data: Academic })?.data.courses.map(
    (course) => ({
      title: 'Langkah ' + String(course.order),
      content: (
        <Card className="relative">
          <CardHeader>
            <img
              className="mb-5 h-72 w-full object-cover"
              src={`/storage/${course.image}`}
              alt=""
            />
            <CardTitle className="mb-3 cursor-pointer text-xl hover:underline md:text-3xl">
              <Link href={`/academies/${course.id}`}>{course.title}</Link>
            </CardTitle>
            <CardDescription className="md:text-lg">
              {course.information}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-3 flex items-center gap-6">
              <span className="text-muted-foreground flex items-center gap-1 text-xs md:text-sm">
                <TimerIcon className="text-cyan-400" />
                {course.duration} Jam
              </span>
              <span className="text-muted-foreground flex items-center gap-1 text-xs md:text-sm">
                <StarIcon className="text-amber-400" fill="currentColor" />
                {getAverage(course.ratings.map((rating) => rating.rating))}
              </span>
              <span className="text-muted-foreground flex items-center gap-1 text-xs capitalize md:text-sm">
                <ChartColumn className="text-violet-400" />
                {course.difficulty}
              </span>
            </div>
          </CardContent>
          <CardFooter>
            <div className="flex items-center gap-6">
              <span className="text-muted-foreground flex items-center gap-1 text-xs capitalize md:text-sm">
                {course.type == 'free' ? (
                  <CircleCheckBig className="text-cyan-400" />
                ) : (
                  <CircleDollarSign className="text-green-400" />
                )}
                <Badge
                  variant="secondary"
                  className={cn(
                    course.type == 'free' ? 'text-cyan-400' : 'text-green-400',
                  )}
                >
                  {course.type}
                </Badge>
              </span>
              <span className="text-muted-foreground flex items-center gap-1 text-xs capitalize md:text-sm">
                <Book className="text-blue-400" />
                {course.modules.length} Modul
              </span>
              <span className="text-muted-foreground flex items-center gap-1 text-xs capitalize md:text-sm">
                <Users2Icon className="text-yellow-400" />
                {course.students.length} Siswa Terdaftar
              </span>
            </div>
          </CardFooter>
          <BorderBeam duration={8} size={100} />
        </Card>
      ),
    }),
  );

  return (
    <div className="relative w-full overflow-clip">
      <Timeline
        heading={(academic as { data: Academic })?.data.title as string}
        description={
          (academic as { data: Academic })?.data.description as string
        }
        data={academicData || []}
      />
    </div>
  );
}
