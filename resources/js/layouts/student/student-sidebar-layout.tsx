import { StudentContent } from '@/components/student-content';
import { StudentShell } from '@/components/student-shell';
import { StudentSidebar } from '@/components/student-sidebar';
import { NavItem } from '@/types';

interface StudentSidebarLayoutProps {
    children: React.ReactNode;
    items: NavItem[]
}

export default function StudentSidebarLayout({
  children,
  items,
}: StudentSidebarLayoutProps) {
  return (
    <StudentShell variant="sidebar">
      <StudentSidebar items={items} />
      <StudentContent>{children}</StudentContent>
    </StudentShell>
  );
}
