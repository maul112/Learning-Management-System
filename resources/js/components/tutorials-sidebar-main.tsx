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
import { Course, Lesson, Module, SharedData } from '@/types';
import { usePage } from '@inertiajs/react';
import { BookOpen, ChevronDown } from 'lucide-react';
import { useEffect } from 'react';

interface TutorialsSidebarMainProps {
  activeLesson: Lesson | null;
  setActiveLesson: React.Dispatch<React.SetStateAction<Lesson | null>>;
}

export function TutorialsSidebarMain({
  activeLesson,
  setActiveLesson,
}: TutorialsSidebarMainProps) {
  const { course, module } = usePage<
    SharedData & { course: { data: Course }; module: { data: Module } }
  >().props;

  useEffect(() => {
    if (module.data.lessons && module.data.lessons.length > 0) {
      setActiveLesson(module.data.lessons[0]);
    }
  }, [module, setActiveLesson]);

  return (
    <SidebarGroup>
      <SidebarGroupLabel className="text-muted-foreground px-4 text-xs font-medium">
        Modules
      </SidebarGroupLabel>
      <SidebarMenu>
        {course.data.modules.map((moduleItem) => (
          <Collapsible
            key={moduleItem.id}
            defaultOpen={moduleItem.id === module.data.id}
            className="group/collapsible"
          >
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton className="w-full px-4 py-2">
                  <BookOpen className="h-4 w-4 shrink-0" />
                  <span className="truncate">{moduleItem.title}</span>
                  <ChevronDown className="ml-auto h-4 w-4 shrink-0 transition-transform group-data-[state=open]/collapsible:rotate-180" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  {moduleItem.lessons?.map((lesson) => (
                    <SidebarMenuSubItem key={lesson.id}>
                      <SidebarMenuSubButton
                        onClick={() => setActiveLesson(lesson)}
                        isActive={activeLesson?.id === lesson.id}
                        className="py-1.5 pr-2 pl-4 text-sm"
                      >
                        <span className="truncate">{lesson.title}</span>
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
