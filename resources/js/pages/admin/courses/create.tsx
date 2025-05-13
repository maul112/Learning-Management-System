import { ImagePreviewInput } from '@/components/form-field-file';
import { FormFieldHeader } from '@/components/form-field-header';
import FormFieldInput from '@/components/form-field-input';
import FormFieldSelect from '@/components/form-field-select';
import FormFieldTextarea from '@/components/form-field-textarea';
import { BorderBeam } from '@/components/ui/border-beam';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useRequiredFieldNumber } from '@/hooks/use-required-field-number';
import AppLayout from '@/layouts/app-layout';
import FormLayout from '@/layouts/form-layout';
import { Academic, BreadcrumbItem, SharedData, User } from '@/types';
import { Head, useForm, usePage } from '@inertiajs/react';
import { BookOpenText, CircleDollarSign, LoaderCircle } from 'lucide-react';
import { useEffect } from 'react';
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

export default function CourseCreate() {
  const { instructors, success, error, auth } = usePage<
    SharedData & { instructors: { data: User[] }; academic: { data: Academic } }
  >().props;
  const { data, setData, post, processing, errors } = useForm({
    title: '',
    image: null as File | null,
    information: '',
    description: '',
    order: 0,
    duration: 0,
    difficulty: '',
    price: 0,
    academic_id: 1,
    instructor_id: 0,
  });

  const [requiredFieldsNumber, setRequiredFieldsNumber] =
    useRequiredFieldNumber(data);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    post(route('courses.store'), {
      onError: (e) => console.log(e),
    });
  };

  useEffect(() => {
    if (success) toast.success(success as string);
    if (error) toast.error(error as string);
  }, [success, error]);

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Create Course" />
      <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
        <div className="pl-4">
          <h1 className="text-2xl font-bold">Course setup</h1>
          <p className="text-muted-foreground text-sm">
            Complete all fields ({requiredFieldsNumber}/7)
          </p>
        </div>
        <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min">
          <FormLayout onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-2 lg:grid-cols-2">
              <div className="flex flex-col gap-5">
                <FormFieldHeader
                  title="Customize your course"
                  icon={BookOpenText}
                />
                <FormFieldInput
                  htmlFor="title"
                  label="Course title"
                  type="text"
                  id="title"
                  name="title"
                  placeholder="Javascript"
                  value={data.title}
                  onChange={(e) => {
                    if (e.target.value.length > 0) {
                      setRequiredFieldsNumber(requiredFieldsNumber + 1);
                    }

                    setData('title', e.target.value);
                  }}
                  message={errors.title || ''}
                />
                <FormFieldTextarea
                  htmlFor="information"
                  label="Course information"
                  value={data.information}
                  onChange={(e) => {
                    if (e.target.value.length > 0) {
                      setRequiredFieldsNumber(requiredFieldsNumber + 1);
                    }

                    setData('information', e.target.value);
                  }}
                  message={errors.information || ''}
                />
                <FormFieldTextarea
                  htmlFor="description"
                  label="Course description"
                  value={data.description}
                  onChange={(e) => {
                    if (e.target.value.length > 0) {
                      setRequiredFieldsNumber(requiredFieldsNumber + 1);
                    }

                    setData('description', e.target.value);
                  }}
                  message={errors.description || ''}
                />
                <FormFieldInput
                  htmlFor="order"
                  label="Course chapter"
                  type="number"
                  id="order"
                  name="order"
                  value={String(data.order)}
                  onChange={(e) => {
                    if (e.target.value.length > 0) {
                      setRequiredFieldsNumber(requiredFieldsNumber + 1);
                    }

                    setData('order', Number(e.target.value));
                  }}
                  message={errors.order || ''}
                />
                <FormFieldInput
                  htmlFor="duration"
                  label="Course duration"
                  type="number"
                  id="duration"
                  name="duration"
                  value={String(data.duration)}
                  onChange={(e) => {
                    if (e.target.value.length > 0) {
                      setRequiredFieldsNumber(requiredFieldsNumber + 1);
                    }
                    setData('duration', Number(e.target.value));
                  }}
                  message={errors.duration || ''}
                />
              </div>
              <div className="flex flex-col gap-5">
                <FormFieldHeader
                  title="Sell your course"
                  icon={CircleDollarSign}
                />
                <FormFieldInput
                  htmlFor="price"
                  label="Course price"
                  type="number"
                  id="price"
                  name="price"
                  value={String(data.price)}
                  onChange={(e) => {
                    if (e.target.value.length > 0) {
                      setRequiredFieldsNumber(requiredFieldsNumber + 1);
                    }
                    setData('price', Number(e.target.value));
                  }}
                  message={errors.price || ''}
                />
                <ImagePreviewInput
                  htmlFor="image"
                  label="Course image"
                  onChange={(file) => {
                    if (file) {
                      setRequiredFieldsNumber(requiredFieldsNumber + 1);
                    }
                    setData('image', file);
                  }}
                  error={errors.image}
                />
                <div className="grid gap-2">
                  <Label className="text-xl">Course difficulty</Label>
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
                <FormFieldSelect<User>
                  label="Instructor course"
                  data={instructors.data}
                  value={data.instructor_id}
                  displayValue={
                    instructors.data.find(
                      (instructor) =>
                        instructor.instructor?.id == data.instructor_id,
                    )?.name || ''
                  }
                  onChange={(value) => setData('instructor_id', Number(value))}
                  getOptionLabel={(instructor) => instructor.name}
                  getOptionValue={(instructor) =>
                    String(instructor.instructor?.id)
                  }
                />
                <input
                  type="hidden"
                  name="academic_id"
                  id="academic_id"
                  value={data.academic_id}
                />
                {auth.user.role == 'instructor' && (
                  <input
                    type="hidden"
                    name="instructor_id"
                    id="instructor_id"
                    value={auth.user.instructor?.id}
                  />
                )}
              </div>
            </div>
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
          <BorderBeam size={300} duration={10} />
        </div>
      </div>
    </AppLayout>
  );
}
