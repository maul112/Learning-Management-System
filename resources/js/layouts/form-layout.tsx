import FormLayoutTemplate from '@/layouts/form/form-simple-layout';

interface FormLayoutProps extends React.HTMLAttributes<HTMLFormElement> {
  onSubmit?: React.FormEventHandler<HTMLFormElement>;
  children: React.ReactNode;
}

export default ({ children, onSubmit, ...props }: FormLayoutProps) => (
  <FormLayoutTemplate onSubmit={onSubmit} {...props}>
    {children}
  </FormLayoutTemplate>
);
