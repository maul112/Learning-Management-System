import { ImagePreviewInput } from '@/components/form-field-file';
import FormFieldInput from '@/components/form-field-input';
import FormFieldMarkdown from '@/components/form-field-markdown';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import FormLayout from '@/layouts/form-layout';
import { BreadcrumbItem, SharedData } from '@/types';
import { Head, useForm, usePage } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { useEffect } from 'react';
import { toast } from 'sonner';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Academics',
    href: '/academics',
  },
  {
    title: 'Create',
    href: '/academics/create',
  },
];

export default function AcademicCreate() {
  const { success, error } = usePage<SharedData>().props;
  const { data, setData, post, processing, errors } = useForm({
    title: '',
    image: null as File | null,
    description: '',
  });

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    post(route('academics.store'), {
      onError: (e) => console.log(e),
    });
  };

  useEffect(() => {
    if (success) toast.success(success as string);
    if (error) toast.error(error as string);
  }, [success, error]);

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Create Academic" />
      <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
        <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min">
          <FormLayout onSubmit={handleSubmit}>
            <FormFieldInput
              htmlFor="title"
              label="Title"
              type="text"
              value={data.title}
              onChange={(e) => setData('title', e.target.value)}
              message={errors.title || ''}
            />
            <ImagePreviewInput
              htmlFor="image"
              label="Image"
              onChange={(file) => setData('image', file)}
              error={errors.image}
            />
            <FormFieldMarkdown
              htmlFor="description"
              label="Description"
              value={data.description}
              onChange={(value) => setData('description', value || '')}
              message={errors.description || ''}
            />
            <Button
              type="submit"
              className="mt-4 w-full"
              tabIndex={4}
              disabled={processing}
            >
              {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
              Create
            </Button>
          </FormLayout>
        </div>
      </div>
    </AppLayout>
  );
}
