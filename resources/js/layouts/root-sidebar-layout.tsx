import RootSidebarTemplate from '@/layouts/root/root-sidebar-layout';
import { Lesson } from '@/types';
import { ReactNode } from 'react';

interface RootSidebarLayoutProps {
  children: ReactNode;
  activeLesson?: Lesson | null;
  setActiveLesson?: React.Dispatch<React.SetStateAction<Lesson | null>>;
}

export default ({
  children,
  activeLesson,
  setActiveLesson,
  ...props
}: RootSidebarLayoutProps) => (
  <RootSidebarTemplate
    activeLesson={activeLesson!}
    setActiveLesson={setActiveLesson!}
    {...props}
  >
    {children}
  </RootSidebarTemplate>
);
