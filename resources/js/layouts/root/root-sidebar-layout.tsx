import { AppSidebarHeader } from '@/components/app-sidebar-header';
import { RootContent } from '@/components/root-content';
import { RootShell } from '@/components/root-shell';
import { TutorialsSidebar } from '@/components/tutorials-sidebar';
import { Lesson } from '@/types';

interface RootSidebarLayoutProps {
  children: React.ReactNode;
  activeLesson: Lesson | null;
  setActiveLesson: React.Dispatch<React.SetStateAction<Lesson | null>>;
}

export default function RootSidebarLayout({
  children,
  activeLesson,
  setActiveLesson,
}: RootSidebarLayoutProps) {
  return (
    <RootShell variant="sidebar">
      <TutorialsSidebar
        activeLesson={activeLesson}
        setActiveLesson={setActiveLesson}
      />
      <RootContent>
        <AppSidebarHeader />
        {children}
      </RootContent>
    </RootShell>
  );
}
