import StudentTemplateHeader from '@/layouts/student/student-header-layout';
import StudentTemplateSidebar from '@/layouts/student/student-sidebar-layout';
import { NavItem } from '@/types';

interface StudentLayoutProps {
  children: React.ReactNode;
  sidebarItems?: NavItem[];
  variant?: 'header' | 'sidebar';
}

export default ({
  children,
  sidebarItems = [],
  variant = 'header',
  ...props
}: StudentLayoutProps) => {
  if (variant === 'sidebar') {
    return (
      <StudentTemplateSidebar items={sidebarItems} {...props}>
        {children}
      </StudentTemplateSidebar>
    );
  }

  return <StudentTemplateHeader {...props}>{children}</StudentTemplateHeader>;
};
