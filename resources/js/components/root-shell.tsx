import { SharedData } from '@/types';
import { usePage } from '@inertiajs/react';
import { SidebarProvider } from './ui/sidebar';

interface RootShellProps {
  children: React.ReactNode;
  variant?: 'header' | 'sidebar';
}

export function RootShell({ children, variant = 'header' }: RootShellProps) {
  const isOpen = usePage<SharedData>().props.sidebarOpen;

  if (variant === 'header') {
    return <div className="flex min-h-screen w-full flex-col">{children}</div>;
  }

  return (
    <SidebarProvider
      defaultOpen={isOpen}
      style={
        {
          '--sidebar-width': '25rem',
        } as React.CSSProperties
      }
    >
      {children}
    </SidebarProvider>
  );
}
