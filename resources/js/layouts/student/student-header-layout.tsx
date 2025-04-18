import { StudentContent } from '@/components/student-content';
import { StudentNav } from '@/components/student-nav';
import { StudentShell } from '@/components/student-shell';

export default function StudentHeaderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <StudentShell>
      <StudentNav />
      <StudentContent>{children}</StudentContent>
    </StudentShell>
  );
}
