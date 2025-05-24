import FormFieldInput from '@/components/form-field-input';
import { BorderBeam } from '@/components/ui/border-beam';
import { Button } from '@/components/ui/button';
import { useRequiredFieldNumber } from '@/hooks/use-required-field-number';
import AppLayout from '@/layouts/app-layout';
import FormLayout from '@/layouts/form-layout';
import { BreadcrumbItem, Course, SharedData } from '@/types';
import { Head, useForm, usePage } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { useEffect } from 'react';
import { toast } from 'sonner';

export default function ModuleCreate() {
  const { sucess, error, course } = usePage<
    SharedData & { course: { data: Course } }
  >().props;
  const { data, setData, post, processing, errors } = useForm({
    title: '',
    order: course.data.modules.length + 1,
    course_id: course.data.id,
  });

  const breadcrumbs: BreadcrumbItem[] = [
    {
      title: 'Academics',
      href: '/academics',
    },
    {
      title: 'Courses',
      href: `/courses/${course.data.academic.id}/edit`,
    },
    {
      title: 'Modules',
      href: `/courses/${course.data.id}/edit`,
    },
    {
      title: 'Create',
      href: '/modules/create',
    },
  ];

  const [requiredFieldsNumber, setRequiredFieldsNumber] =
    useRequiredFieldNumber(data);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    post(route('modules.store'), {
      onError: (e) => console.log(e),
    });
  };

  useEffect(() => {
    if (sucess) toast.success(sucess as string);
    if (error) toast.error(error as string);
  }, [sucess, error]);

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Create Module" />
      <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
        <div className="pl-4">
          <h1 className="text-2xl font-bold">Module setup</h1>
          <p className="text-muted-foreground text-sm">
            Complete all fields ({requiredFieldsNumber - 1}/2)
          </p>
        </div>
        <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min">
          <FormLayout onSubmit={handleSubmit}>
            <FormFieldInput
              htmlFor="title"
              label="Title"
              type="text"
              id="title"
              name="title"
              placeholder="Module title"
              value={data.title || ''}
              setValue={(value) => setData('title', value)}
              onFilled={() => setRequiredFieldsNumber(requiredFieldsNumber + 1)}
              message={errors.title || ''}
            />
            <FormFieldInput
              htmlFor="order"
              label="Order"
              type="number"
              id="order"
              name="order"
              placeholder="Module order"
              value={String(data.order)}
              setValue={(value) => setData('order', Number(value))}
              onFilled={() => setRequiredFieldsNumber(requiredFieldsNumber + 1)}
              message={errors.order || ''}
            />
            <Button
              type="submit"
              className="mt-4 w-full"
              tabIndex={4}
              disabled={processing ? processing : requiredFieldsNumber < 2}
            >
              {processing && (
                <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
              )}
              Create
            </Button>
          </FormLayout>
          <BorderBeam size={300} duration={10} />
        </div>
      </div>
    </AppLayout>
  );
}
