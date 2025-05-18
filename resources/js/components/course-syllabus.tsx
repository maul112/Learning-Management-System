import { Course, SharedData } from '@/types';
import { usePage } from '@inertiajs/react';
import { BookCheck, CheckCircle2, FileText } from 'lucide-react'; // Impor ikon FileText untuk materi
import { RootContent } from './root-content';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './ui/accordion';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Separator } from './ui/separator';

export function CourseSyllabus() {
  const { course } = usePage<SharedData & { course: { data: Course } }>().props;

  console.log(course);

  return (
    <RootContent className="my-10">
      <div className="mb-8 flex flex-col items-center justify-center">
        <h3 className="text-2xl font-semibold">Silabus</h3>
        <p className="text-muted-foreground mt-1 text-center">
          Materi yang akan Anda pelajari pada kelas ini.
        </p>
      </div>
      <div className="flex justify-center">
        <Accordion type="multiple" className="w-full max-w-2xl space-y-4">
          {course.data.modules.map((module) => (
            <AccordionItem key={module.id} value={module.title}>
              <Card className="w-full px-5">
                <AccordionTrigger>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="text-primary h-5 w-5" />
                      <CardTitle className="font-medium">
                        {module.title}
                      </CardTitle>
                    </CardTitle>
                  </CardHeader>
                </AccordionTrigger>
                <CardContent className="p-0">
                  <div className="flex items-center gap-3 px-4 py-2">
                    <Badge className="flex items-center gap-1 border">
                      <BookCheck className="h-4 w-4" />
                      {module.lessons.length} Materi
                    </Badge>
                    <Separator orientation="vertical" className="h-4" />
                    <Badge variant="secondary">1 Ujian</Badge>
                  </div>
                </CardContent>
                <AccordionContent className="pt-2">
                  <Separator className='mb-2' />
                  <div className="flex flex-col space-y-2">
                    {module.lessons.map((lesson) => (
                      <Button
                        key={lesson.id}
                        asChild
                        className="hover:bg-secondary/50 w-full justify-start transition-colors"
                        variant="link"
                      >
                        <div className="flex items-center gap-2">
                          <span className="flex items-center gap-2 text-sm">
                            <CheckCircle2 className="h-4 w-4 text-green-400" />
                            {lesson.title}
                          </span>
                        </div>
                      </Button>
                    ))}
                  </div>
                </AccordionContent>
              </Card>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </RootContent>
  );
}
