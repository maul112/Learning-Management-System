import RootLayoutTemplate from '@/layouts/root/root-header-layout';

interface RootLayoutProps {
    children: React.ReactNode;
};

export default ({ children, ...props }: RootLayoutProps ) => (
  <RootLayoutTemplate {...props}>
    {children}
  </RootLayoutTemplate>
);
