import * as React from 'react';
import { SidebarInset } from './ui/sidebar';

interface StudentContentProps extends React.ComponentProps<'main'> {
  variant?: 'header' | 'sidebar';
}

export function StudentContent({
  children,
  variant = 'header',
  ...props
}: StudentContentProps) {
  if (variant === 'sidebar') {
    return <SidebarInset {...props}>{children}</SidebarInset>;
  }

  return (
    <main
      className="mx-auto flex h-full w-full max-w-7xl flex-1 flex-col gap-4 rounded-xl mt-20"
      {...props}
    >
      {children}
    </main>
  );
}
