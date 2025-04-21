import FormFieldInput from '@/components/form-field-input';
import FormFieldMarkdown from '@/components/form-field-markdown';
import FormFieldSelect from '@/components/form-field-select';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import FormLayout from '@/layouts/form-layout';
import { Academic, BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { toast } from 'sonner';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Courses',
    href: '/courses',
  },
  {
    title: 'Create',
    href: '/courses/create',
  },
];

export default function CourseCreate({
  academics,
  success,
  error,
}: {
  academics: {
    data: Academic[];
  };
  success?: string;
  error?: string;
}) {
  const { data, setData, post, processing, errors, reset } = useForm({
    title: '',
    description: '',
    order: 0,
    duration: 0,
    difficulty: '',
    academic_id: 0,
  });

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    post(route('courses.store'), {
      onFinish: () => reset('title'),
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
              placeholder="Javascript"
              value={data.title}
              onChange={(e) => setData('title', e.target.value)}
              message={errors.title || ''}
            />
            <FormFieldMarkdown
              htmlFor="description"
              label="Description"
              value={data.description}
              onChange={(value) => setData('description', value || '')}
              message={errors.description || ''}
            />
            <FormFieldInput
              htmlFor="order"
              label="Order"
              type="number"
              id="order"
              name="order"
              value={data.order}
              onChange={(e) => setData('order', Number(e.target.value))}
              message={errors.order || ''}
            />
            <FormFieldInput
              htmlFor="duration"
              label="Duration"
              type="number"
              id="duration"
              name="duration"
              value={data.duration}
              onChange={(e) => setData('duration', Number(e.target.value))}
              message={errors.duration || ''}
            />
            <div className="grid gap-2">
              <Label>Difficulty</Label>
              <Select
                value={data.difficulty}
                onValueChange={(value) => setData('difficulty', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a difficulty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <FormFieldSelect<Academic>
              data={academics.data}
              label="Academic"
              value={data.academic_id}
              displayValue={
                academics.data.find(
                  (academic) => academic.id === data.academic_id,
                )?.title || ''
              }
              onChange={(value) => setData('academic_id', Number(value))}
              getOptionLabel={(academic) => academic.title}
              getOptionValue={(academic) => academic.id}
              message={errors.academic_id || ''}
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
