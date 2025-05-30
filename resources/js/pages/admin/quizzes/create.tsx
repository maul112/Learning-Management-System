import FormFieldInput from '@/components/form-field-input';
import { BorderBeam } from '@/components/ui/border-beam';
import { useRequiredFieldNumber } from '@/hooks/use-required-field-number';
import AppLayout from '@/layouts/app-layout';
import FormLayout from '@/layouts/form-layout';
import { BreadcrumbItem, Lesson, SharedData } from '@/types';
import { Head, useForm, usePage } from '@inertiajs/react';

export default function QuizzesCreate() {
  const { lesson } = usePage<SharedData & { lesson: { data: Lesson } }>().props;

  const { data, setData, post, processing, errors } = useForm({
    question: '',
    options: [] as string[],
    answer: '',
  });

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
      title: 'Quizzes',
      href: `/quizzes/${lesson.data.id}/create`,
    },
    {
      title: 'Create',
      href: '/lessons/create',
    },
  ];

  const [requiredFieldsNumber, setRequiredFieldsNumber] =
    useRequiredFieldNumber(data);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    post(route('quizzes.store'), {
      onError: (e) => console.log(e),
    });
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Create Lesson" />
      <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
        <div className="pl-4">
          <h1 className="text-2xl font-bold">Lesson setup</h1>
          <p className="text-muted-foreground text-sm">
            Complete all fields ({requiredFieldsNumber - 1}/4)
          </p>
        </div>
        <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min">
          <FormLayout onSubmit={handleSubmit}>
            <FormFieldInput
              htmlFor="question"
              label="Question"
              name="question"
              value={data.question}
              setValue={(value) => setData('question', value)}
              onFilled={() => setRequiredFieldsNumber(requiredFieldsNumber + 1)}
              message={errors.question || ''}
            />
          </FormLayout>
          <BorderBeam size={300} duration={10} />
        </div>
      </div>
    </AppLayout>
  );
}
