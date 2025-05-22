import { Academic } from '@/types';
import { Book } from 'lucide-react';
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
  return (
    <Card key={academic.id} className="relative">
      <CardHeader>
        <div className="relative h-36 w-full">
          <img
            className="h-full w-full object-cover"
            src={`/storage/${academic.image}`}
            alt={academic.title}
          />
          <Badge className="absolute top-2 right-2">{academic.status}</Badge>
        </div>
        <CardTitle className="mt-2 text-xl">{academic.title}</CardTitle>
        <CardDescription className="text-muted-foreground line-clamp-2 text-sm">
          {academic.description}
        </CardDescription>
      </CardHeader>
      <CardFooter className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-2 py-2 text-sm">
            <Badge variant="secondary" className="rounded-full py-2">
              <Book className="h-4 w-4 text-blue-500" />
            </Badge>
            {academic.courses.length} Courses
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
      </CardFooter>
      <ShineBorder shineColor={['#A07CFE', '#FE8FB5', '#FFBE7B']} />
    </Card>
  );
}
