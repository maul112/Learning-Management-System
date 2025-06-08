import { Academic } from '@/types';
import {
  Book,
  BookMarkedIcon,
  BookOpen,
  StarIcon,
  Users2Icon,
} from 'lucide-react';
import { useCallback } from 'react';
import { DeleteModal } from './delete-modal';
import { EditButton } from './edit-button';
import { Badge } from './ui/badge';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card';
import { ShineBorder } from './ui/shine-border';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './ui/tooltip';

export function AcademicCard({ academic }: { academic: Academic }) {
  const coursesCount = academic.courses.length;
  const modulesCount = useCallback(() => {
    return academic.courses.reduce(
      (acc, course) => acc + course.modules.length,
      0,
    );
  }, [academic.courses]);
  const lessonsCount = useCallback(() => {
    return academic.courses.reduce(
      (acc, course) =>
        acc +
        course.modules.reduce((acc, module) => acc + module.lessons.length, 0),
      0,
    );
  }, [academic.courses]);
  const usersCount = useCallback(() => {
    return academic.courses.reduce(
      (acc, course) => acc + course.students.length,
      0,
    );
  }, [academic.courses]);
  const ratingsCount = useCallback(() => {
    return academic.courses.reduce(
      (acc, course) => acc + course.ratings.length,
      0,
    );
  }, [academic.courses]);

  return (
    <Card key={academic.id} className="relative overflow-hidden pt-0">
      <CardHeader className="px-0">
        <div className="relative h-52 w-full">
          <img
            className="h-full w-full object-cover"
            src={`/storage/${academic.image}`}
            alt={academic.title}
          />
          <Badge className="absolute top-2 right-2" variant="secondary">
            {academic.status}
          </Badge>
        </div>
        <CardTitle className="mt-2 px-6 text-xl">{academic.title}</CardTitle>
        <CardDescription className="text-muted-foreground line-clamp-3 px-6">
          {academic.description}
        </CardDescription>
        <div className="text-muted-foreground flex items-center gap-2 px-6">
          <span className="flex items-center gap-2 py-2 text-sm">
            <Badge variant="secondary" className="rounded-full py-2">
              <Book className="h-4 w-4 text-blue-500" />
            </Badge>
            {coursesCount} Courses
          </span>
          <span className="flex items-center gap-2 py-2 text-sm">
            <Badge variant="secondary" className="rounded-full py-2">
              <BookOpen className="h-4 w-4 text-yellow-500" />
            </Badge>
            {modulesCount()} Module
          </span>
          <span className="flex items-center gap-2 py-2 text-sm">
            <Badge variant="secondary" className="rounded-full py-2">
              <BookMarkedIcon className="h-4 w-4 text-purple-500" />
            </Badge>
            {lessonsCount()} Lessons
          </span>
        </div>
      </CardHeader>
      <CardFooter className="flex items-center justify-between">
        <div className="text-muted-foreground flex w-full items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-2 py-2 text-sm">
              <Badge variant="secondary" className="rounded-full py-2">
                <Users2Icon className="h-4 w-4 text-green-500" />
              </Badge>
              {usersCount()} Users
            </span>
            <span className="flex items-center gap-2 py-2 text-sm">
              <Badge variant="secondary" className="rounded-full py-2">
                <StarIcon
                  className="h-4 w-4 text-amber-500"
                  fill="currentColor"
                />
              </Badge>
              {ratingsCount()} Ratings
            </span>
          </div>
          <div className="flex items-center gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <EditButton endpoint="academic" id={String(academic.id)} />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Edit</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <DeleteModal resourceName="academic" id={academic.id} />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Delete</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </CardFooter>
      <ShineBorder shineColor={['#A07CFE', '#FE8FB5', '#FFBE7B']} />
    </Card>
  );
}
