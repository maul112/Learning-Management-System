import { ImagePreviewInput } from '@/components/form-field-file';
import FormFieldInput from '@/components/form-field-input';
import FormFieldMarkdown from '@/components/form-field-markdown';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import FormLayout from '@/layouts/form-layout';
import { BreadcrumbItem, Event } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { useEffect } from 'react';
import { toast } from 'sonner';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Events',
    href: '/events',
  },
  {
    title: 'Edit',
    href: '/events/edit',
  },
];

export default function EventEdit({
  event,
  success,
  error,
}: {
  event: { data: Event };
  success?: string;
  error?: string;
}) {
  const { data, setData, put, processing, errors } = useForm({
    title: event.data.title,
    image: null as File | null,
    description: event.data.description,
    link: event.data.link,
    by: event.data.by,
  });

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    put(route('events.update', event.data.id), {
      onError: (e) => console.log(e),
    });
  };

  useEffect(() => {
    if (success) toast.success(success);
    if (error) toast.error(error);
  }, [success, error]);

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Edit Event" />
      <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
        <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min">
          <FormLayout onSubmit={handleSubmit}>
            <FormFieldInput
              htmlFor="title"
              label="Title"
              type="text"
              value={data.title}
              onChange={(e) => setData('title', e.target.value)}
              message={errors.title ?? ''}
            />
            <ImagePreviewInput
              htmlFor="image"
              label="Image"
              currentImageUrl={`/storage/${data.image}`}
              onChange={(file) => setData('image', file)}
              error={errors.image ?? ''}
            />
            <FormFieldMarkdown
              htmlFor="description"
              label="Description"
              value={data.description}
              onChange={(value) => setData('description', value as string)}
              message={errors.description ?? ''}
            />
            <FormFieldInput
              htmlFor="link"
              label="Link"
              type="text"
              value={data.link}
              onChange={(e) => setData('link', e.target.value)}
              message={errors.link ?? ''}
            />
            <FormFieldInput
              htmlFor="by"
              label="By"
              type="text"
              value={data.by}
              onChange={(e) => setData('by', e.target.value)}
              message={errors.by ?? ''}
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
