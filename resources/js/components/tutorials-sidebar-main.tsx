import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar';
import { Course, Lesson, SharedData, Student } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { BookOpen, CheckCircle, ChevronDown } from 'lucide-react';
import { useEffect } from 'react';

interface TutorialsSidebarMainProps {
  activeLesson: Lesson | null;
  setActiveLesson: React.Dispatch<React.SetStateAction<Lesson | null>>;
}

export function TutorialsSidebarMain({
  activeLesson,
  setActiveLesson,
}: TutorialsSidebarMainProps) {
  const { course, student } = usePage<
    SharedData & {
      course: { data: Course };
      student: { data: Student };
    }
  >().props;

  useEffect(() => {
    if (
      course.data.modules[0].lessons[0] &&
      course.data.modules[0].lessons.length > 0
    ) {
      setActiveLesson(course.data.modules[0].lessons[0]);
    }
  }, [course, setActiveLesson]);

  return (
    <SidebarGroup>
      <SidebarGroupLabel className="text-muted-foreground px-4 text-xs font-medium">
        Modules
      </SidebarGroupLabel>
      <SidebarMenu>
        {course.data.modules.map((moduleItem) => (
          <Collapsible
            key={moduleItem.id}
            className="group/collapsible"
            defaultOpen
          >
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton
                  tooltip={{ children: moduleItem.title }}
                  className="w-full cursor-pointer px-4 py-2"
                >
                  <BookOpen className="h-4 w-4 shrink-0" />
                  <span className="truncate">{moduleItem.title}</span>
                  <ChevronDown className="ml-auto h-4 w-4 shrink-0 transition-transform group-data-[state=open]/collapsible:rotate-180" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarGroupLabel>
                  <span className="text-muted-foreground px-4 text-xs font-medium">
                    Lessons
                  </span>
                </SidebarGroupLabel>
                <SidebarMenuSub>
                  {moduleItem.lessons?.map((lesson) => (
                    <SidebarMenuSubItem key={lesson.id}>
                      <SidebarMenuSubButton
                        size="md"
                        onClick={() => setActiveLesson(lesson)}
                        isActive={activeLesson?.id === lesson.id}
                        className="cursor-pointer py-1.5 pr-2 pl-4 text-sm"
                        asChild
                      >
                        <Link
                          href={`/academies/${lesson.module.course.id}/tutorials/${lesson.id}`}
                          className="flex items-center justify-between truncate"
                        >
                          {lesson.title}
                          {student.data.lesson_completions.some(
                            (completion) => completion.lesson.id === lesson.id,
                          ) ? (
                            <div className="text-green-600">
                              <CheckCircle className="h-4 w-4" />
                            </div>
                          ) : null}
                        </Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
