import { RootNav } from '@/components/root-nav';
import { RootShell } from '@/components/root-shell';

export default function RootHeaderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RootShell>
      <RootNav />
      {children}
    </RootShell>
  );
}
