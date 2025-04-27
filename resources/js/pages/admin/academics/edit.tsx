import { ImagePreviewInput } from '@/components/form-field-file';
import FormFieldInput from '@/components/form-field-input';
import FormFieldMarkdown from '@/components/form-field-markdown';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import FormLayout from '@/layouts/form-layout';
import { Academic, BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { useEffect } from 'react';
import { toast } from 'sonner';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Academics',
    href: '/academics',
  },
  {
    title: 'Edit',
    href: '/academics/edit',
  },
];

export default function AcademicEdit({
  academic,
  success,
  error,
}: {
  academic: { data: Academic };
  success?: string;
  error?: string;
}) {
  const { data, setData, put, processing, errors } = useForm({
    title: academic.data.title,
    image: null as File | null,
    description: academic.data.description,
  });

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    put(route('academics.update', academic.data.id), {
      onError: (e) => console.log(e),
    });
  };

  useEffect(() => {
    if (success) toast.success(success);
    if (error) toast.error(error);
  }, [success, error]);

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Edit Academic" />
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
              currentImageUrl={`/storage/${academic.data.image}`}
              onChange={(file) => setData('image', file as File)}
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
              Save
            </Button>
          </FormLayout>
        </div>
      </div>
    </AppLayout>
  );
}
