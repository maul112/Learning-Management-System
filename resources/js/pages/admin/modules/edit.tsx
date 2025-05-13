import FormFieldInput from '@/components/form-field-input';
import FormFieldSelect from '@/components/form-field-select';
import { BorderBeam } from '@/components/ui/border-beam';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import FormLayout from '@/layouts/form-layout';
import { BreadcrumbItem, Course, Module, SharedData } from '@/types';
import { Head, useForm, usePage } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { useEffect } from 'react';
import { toast } from 'sonner';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Modules',
    href: '/modules',
  },
  {
    title: 'Edit',
    href: '/modules/edit',
  },
];

export default function ModuleEdit() {
  const { courses, module, sucess, error } = usePage<
    SharedData & { module: { data: Module }; courses: { data: Course[] } }
  >().props;
  const { data, setData, put, processing, errors } = useForm({
    title: module.data.title,
    order: module.data.order,
    course_id: module.data.course.id,
  });

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    put(route('modules.update', module.data.id), {
      onError: (e) => console.log(e),
    });
  };

  useEffect(() => {
    if (sucess) toast.success(sucess as string);
    if (error) toast.error(error as string);
  }, [sucess, error]);

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Edit Module" />
      <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
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
              onChange={(e) => setData('title', e.target.value)}
              message={errors.title || ''}
            />
            <FormFieldInput
              htmlFor="order"
              label="Order"
              type="number"
              id="order"
              name="order"
              placeholder="Module order"
              value={String(data.order) || ''}
              onChange={(e) => setData('order', Number(e.target.value))}
              message={errors.order || ''}
            />
            <FormFieldSelect<Course>
              data={courses.data}
              label="Course"
              value={data.course_id}
              displayValue={
                courses.data.find((course) => course.id === data.course_id)
                  ?.title || ''
              }
              onChange={(value) => setData('course_id', Number(value))}
              getOptionLabel={(course) => course.title}
              getOptionValue={(course) => course.id}
              message={errors.course_id || ''}
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
