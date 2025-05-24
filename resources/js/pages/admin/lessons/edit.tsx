import { DeleteModal } from '@/components/delete-modal';
import { DraftAlert } from '@/components/draft-alert';
import FormFieldInput from '@/components/form-field-input';
import FormFieldMarkdown from '@/components/form-field-markdown';
import { VideoPreviewInput } from '@/components/form-field-video';
import { BorderBeam } from '@/components/ui/border-beam';
import { Button } from '@/components/ui/button';
import { useRequiredFieldNumber } from '@/hooks/use-required-field-number';
import AppLayout from '@/layouts/app-layout';
import FormLayout from '@/layouts/form-layout';
import { BreadcrumbItem, Course, Lesson, Module, SharedData } from '@/types';
import { Head, useForm, usePage } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { useEffect } from 'react';
import { toast } from 'sonner';

export default function LessonsEdit() {
  const { lesson, success, error } = usePage<
    SharedData & {
      lesson: { data: Lesson };
      courses: { data: Course[] };
      modules: { data: Module[] };
    }
  >().props;

  const breadcrumbs: BreadcrumbItem[] = [
    {
      title: 'Academics',
      href: '/academics',
    },
    {
      title: 'Courses',
      href: `/academics/${lesson.data.module.course.academic.id}/edit`,
    },
    {
      title: 'Modules',
      href: `/courses/${lesson.data.module.course.id}/edit`,
    },
    {
      title: 'Lessons',
      href: `/modules/${lesson.data.module.id}/edit`,
    },
    {
      title: 'Edit',
      href: '/lessons/edit',
    },
  ];

  const { data, setData, post, processing, errors } = useForm({
    title: lesson.data.title,
    order: lesson.data.order,
    content: lesson.data.content,
    video: lesson.data.video as File | string,
    _method: 'put',
  });

  const {
    data: lessonStatus,
    setData: setLessonStatus,
    put: putLessonStatus,
  } = useForm({
    status: lesson.data.status,
  });

  const [requiredFieldsNumber, setRequiredFieldsNumber] =
    useRequiredFieldNumber(data);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    post(route('lessons.update', lesson.data.id), {
      forceFormData: true,
      preserveScroll: true,
      method: 'put',
      onError: (e) => console.log(e),
    });
  };

  const handleChangeStatus: React.MouseEventHandler<HTMLButtonElement> = (
    e,
  ) => {
    e.preventDefault();
    setLessonStatus(
      'status',
      lessonStatus.status == 'published' ? 'draft' : 'published',
    );
    putLessonStatus(route('lessons.updateStatus', lesson.data.id), {
      onError: (e) => console.log(e),
    });
  };

  useEffect(() => {
    if (success) toast.success(success as string);
    if (error) toast.error(error as string);
  }, [success, error]);

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Create Lesson" />
      <DraftAlert status={lesson.data.status} title="Lesson" />
      <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
        <div className="flex items-center justify-between pl-4">
          <div>
            <h1 className="text-2xl font-bold">Lesson setup</h1>
            <p className="text-muted-foreground text-sm">
              Complete all fields ({requiredFieldsNumber - 2}/3)
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant={
                lesson.data.status == 'published' ? 'secondary' : 'default'
              }
              className="cursor-pointer"
              onClick={handleChangeStatus}
              disabled={requiredFieldsNumber < 3}
            >
              {lessonStatus.status == 'published' ? 'Unpublish' : 'Publish'}
            </Button>
            <DeleteModal resourceName="lesson" id={lesson.data.id} />
          </div>
        </div>
        <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min">
          <FormLayout onSubmit={handleSubmit}>
            <FormFieldInput
              htmlFor="title"
              label="Title"
              type="text"
              id="title"
              name="title"
              placeholder="Enter lesson title"
              value={data.title}
              setValue={(value) => setData('title', value)}
              onFilled={() => setRequiredFieldsNumber(requiredFieldsNumber + 1)}
              message={errors.title || ''}
            />
            <VideoPreviewInput
              htmlFor="video"
              label="Video"
              currentVideoUrl={`/storage/${data.video}`}
              onChange={(file) => {
                if (file) {
                  setData('video', file);
                  setRequiredFieldsNumber(requiredFieldsNumber + 1);
                }
              }}
              error={errors.video}
            />
            <FormFieldMarkdown
              htmlFor="content"
              label="Content"
              value={data.content}
              setValue={(value) => setData('content', value)}
              onChange={(value) => setData('content', value || '')}
              onFilled={() => setRequiredFieldsNumber(requiredFieldsNumber + 1)}
              message={errors.content || ''}
            />
            <FormFieldInput
              htmlFor="order"
              label="Order"
              type="number"
              id="order"
              name="order"
              placeholder="Enter lesson order"
              value={String(data.order)}
              setValue={(value) => setData('order', Number(value))}
              onFilled={() => setRequiredFieldsNumber(requiredFieldsNumber + 1)}
              message={errors.order || ''}
            />
            <Button
              type="submit"
              className="mt-4 w-full"
              tabIndex={4}
              disabled={processing}
            >
              {processing && (
                <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
              )}
              Save
            </Button>
          </FormLayout>
          <BorderBeam size={300} duration={10} />
        </div>
      </div>
    </AppLayout>
  );
}
