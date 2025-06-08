import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { Lesson } from '@/types';
import React from 'react';
import AppLogo from './app-logo';
import { TutorialsSidebarMain } from './tutorials-sidebar-main';

interface TutorialsSidebarProps {
  activeLesson: Lesson | null;
  setActiveLesson: React.Dispatch<React.SetStateAction<Lesson | null>>;
}

export function TutorialsSidebar({
  activeLesson,
  setActiveLesson,
}: TutorialsSidebarProps) {
  return (
    <Sidebar
      variant="sidebar"
      collapsible="icon"
      className="border-border border-r"
      style={
        {
          '--sidebar-width': '25rem',
        } as React.CSSProperties
      }
    >
      <SidebarHeader className="border-border border-b p-3">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <span className="flex items-center gap-2">
                <AppLogo />
              </span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent className="py-2">
        <TutorialsSidebarMain
          activeLesson={activeLesson}
          setActiveLesson={setActiveLesson}
        />
      </SidebarContent>
    </Sidebar>
  );
}
