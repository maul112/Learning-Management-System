import FormFieldInput from '@/components/form-field-input';
import FormFieldMarkdown from '@/components/form-field-markdown';
import FormFieldSelect from '@/components/form-field-select';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import FormLayout from '@/layouts/form-layout';
import { BreadcrumbItem, Lesson } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { toast } from 'sonner';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Sub Lessons',
    href: '/sub-lessons',
  },
  {
    title: 'Create',
    href: '/sub-lessons/create',
  },
];

export default function CreateSubLesson({
  lessons,
  success,
  error,
}: {
  lessons: { data: Lesson[] };
  success?: string;
  error?: string;
}) {
  const { data, setData, post, processing, errors } = useForm({
    title: '',
    content: '',
    order: '',
    lesson_id: 0,
  });

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    post(route('sub-lessons.store'), {
      onError: (e) => console.log(e),
    });
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      {success && toast.success(success)}
      {error && toast.error(error)}
      <Head title="Create User" />
      <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
        <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min">
          <FormLayout onSubmit={handleSubmit}>
            <FormFieldInput
              htmlFor="title"
              label="Title"
              type="text"
              id="title"
              name="title"
              value={data.title}
              onChange={(e) => setData('title', e.target.value)}
              message={errors.title || ''}
            />
            <FormFieldMarkdown
              htmlFor="content"
              label="Content"
              value={data.content}
              onChange={(value) => setData('content', value || '')}
              message={errors.content || ''}
            />
            <FormFieldInput
              htmlFor="order"
              label="Order"
              type="number"
              id="order"
              name="order"
              value={data.order}
              onChange={(e) => setData('order', e.target.value)}
              message={errors.order || ''}
            />
            <FormFieldSelect
              data={lessons.data}
              label="Lesson"
              value={data.lesson_id}
              onChange={(value) => setData('lesson_id', Number(value))}
              displayValue={
                lessons.data.find((lesson) => lesson.id === data.lesson_id)
                  ?.title || ''
              }
              getOptionLabel={(lesson: Lesson) => lesson.title}
              getOptionValue={(lesson: Lesson) => String(lesson.id)}
              message={errors.lesson_id || ''}
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
