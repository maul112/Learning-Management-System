import FormFieldInput from '@/components/form-field-input';
import FormFieldMarkdown from '@/components/form-field-markdown';
import FormFieldSelect from '@/components/form-field-select';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import FormLayout from '@/layouts/form-layout';
import { BreadcrumbItem, Course, Module } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { toast } from 'sonner';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Modules',
    href: '/modules',
  },
  {
    title: 'Create',
    href: '/modules/create',
  },
];

export default function ModuleEdit({
  courses,
  module,
  sucess,
  error,
}: {
  courses: {
    data: Course[];
  };
  module: {
    data: Module;
  };
  sucess?: string;
  error?: string;
}) {
  const { data, setData, put, processing, errors } = useForm({
    title: module.data.title,
    description: module.data.description,
    order: module.data.order,
    duration: module.data.duration,
    difficulty: module.data.difficulty,
    course_id: module.data.course_id,
  });

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    put(route('modules.update', module.data.id), {
      onError: (e) => console.log(e),
    });
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      {sucess && toast.success(sucess)}
      {error && toast.error(error)}
      <Head title="Create Module" />
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
            <FormFieldMarkdown
              htmlFor="description"
              label="Description"
              value={data.description || ''}
              onChange={(value) => setData('description', value || '')}
              message={errors.description || ''}
            />
            <FormFieldInput
              htmlFor="order"
              label="Order"
              type="number"
              id="order"
              name="order"
              placeholder="Module order"
              value={data.order || ''}
              onChange={(e) => setData('order', Number(e.target.value))}
              message={errors.order || ''}
            />
            <FormFieldInput
              htmlFor="duration"
              label="Duration"
              type="number"
              id="duration"
              name="duration"
              placeholder="Module duration"
              value={data.duration || ''}
              onChange={(e) => setData('duration', Number(e.target.value))}
              message={errors.duration || ''}
            />
            <div className="grid gap-2">
              <label className="capitalize">Difficulty</label>
              <Select
                value={data.difficulty}
                onValueChange={(value) => setData('difficulty', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select difficulty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Difficulty</SelectLabel>
                    <SelectItem value="beginner">Beginner</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="advanced">Advanced</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
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
        </div>
      </div>
    </AppLayout>
  );
}
