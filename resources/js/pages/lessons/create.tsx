import FormFieldInput from '@/components/form-field-input';
import FormFieldSelect from '@/components/form-field-select';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import FormLayout from '@/layouts/form-layout';
import { BreadcrumbItem, Course, Module } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { toast } from 'sonner';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Lessons',
    href: '/lessons',
  },
  {
    title: 'Create',
    href: '/lessons/create',
  },
];

export default function LessonsCreate({
  courses,
  modules,
  success,
  error,
}: {
  courses: {
    data: Course[];
  };
  modules: {
    data: Module[];
  };
  success?: string;
  error?: string;
}) {
  const { data, setData, post, processing, errors } = useForm({
    title: '',
    order: '',
    course_id: 0,
    module_id: 0,
  });

  const [moduleValues, setModuleValues] = useState<Module[]>([]);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    post(route('lessons.store'), {
      onError: (e) => console.log(e),
    });
  };

  useEffect(() => {
    if (success) toast.success(success);
    if (error) toast.error(error);
  }, [success, error]);

  const selectedCourseTitle = useMemo(() => {
    return (
      courses.data.find((course) => course.id === data.course_id)?.title || ''
    );
  }, [courses.data, data.course_id]);

  const selectedModuleTitle = useMemo(() => {
    return (
      moduleValues.find((module) => module.id === data.module_id)?.title || ''
    );
  }, [moduleValues, data.module_id]);

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Create Lesson" />
      <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
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
              onChange={(e) => setData('title', e.target.value)}
              message={errors.title || ''}
            />
            <FormFieldInput
              htmlFor="order"
              label="Order"
              type="number"
              id="order"
              name="order"
              placeholder="Enter lesson order"
              value={data.order}
              onChange={(e) => setData('order', e.target.value)}
              message={errors.order || ''}
            />
            <FormFieldSelect<Course>
              data={courses.data}
              label="Course"
              value={data.course_id}
              displayValue={selectedCourseTitle}
              onChange={(value) => {
                setData('course_id', Number(value));
                setModuleValues(
                  modules.data.filter(
                    (module) => module.course.id === Number(value),
                  ),
                );
              }}
              getOptionLabel={(course) => course.title}
              getOptionValue={(course) => course.id}
              message={errors.course_id || ''}
            />
            <FormFieldSelect<Module>
              data={moduleValues}
              label="Module"
              value={data.module_id}
              displayValue={selectedModuleTitle}
              onChange={(value) => setData('module_id', Number(value))}
              getOptionLabel={(module) => module.title}
              getOptionValue={(module) => module.id}
              message={errors.module_id || ''}
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
              Create
            </Button>
          </FormLayout>
        </div>
      </div>
    </AppLayout>
  );
}
