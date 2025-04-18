import StudentTemplate from '@/layouts/student/student-header-layout';

export default ({ children, ...props }: { children: React.ReactNode }) => (
  <StudentTemplate {...props}>{children}</StudentTemplate>
);
