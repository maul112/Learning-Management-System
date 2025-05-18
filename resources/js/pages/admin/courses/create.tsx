import { ImagePreviewInput } from '@/components/form-field-file';
import { FormFieldHeader } from '@/components/form-field-header';
import FormFieldInput from '@/components/form-field-input';
import FormFieldMarkdown from '@/components/form-field-markdown';
import FormFieldTextarea from '@/components/form-field-textarea';
import { BorderBeam } from '@/components/ui/border-beam';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
import { cn } from '@/lib/utils';
import { Academic, BreadcrumbItem, SharedData } from '@/types';
import { Head, useForm, usePage } from '@inertiajs/react';
import { BookOpenText, CircleDollarSign, LoaderCircle } from 'lucide-react';
import { useEffect } from 'react';
import { toast } from 'sonner';

export default function CourseCreate() {
  const { academic, success, error } = usePage<
    SharedData & { academic: { data: Academic } }
  >().props;

  const breadcrumbs: BreadcrumbItem[] = [
    {
      title: 'Academics',
      href: '/academics',
    },
    {
      title: 'Courses',
      href: `/academics/${academic.data.id}/edit`,
    },
    {
      title: 'Create',
      href: '/courses/create',
    },
  ];

  const { data, setData, post, processing, errors } = useForm({
    title: '',
    image: null as File | null,
    information: '',
    description: '',
    order: academic.data.courses.length + 1,
    duration: '',
    difficulty: '',
    price: '',
    academic_id: academic.data.id,
  });

  const [requiredFieldsNumber, setRequiredFieldsNumber] =
    useRequiredFieldNumber(data);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (requiredFieldsNumber < 7) toast.error('Complete all fields');
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
            Complete all fields ({requiredFieldsNumber - 2}/7)
          </p>
        </div>
        <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min">
          <FormLayout onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-2 lg:grid-cols-2">
              <Card className="flex flex-col gap-5">
                <CardHeader>
                  <CardTitle>
                    <FormFieldHeader
                      title="Customize your course"
                      icon={BookOpenText}
                    />
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 gap-4">
                  <FormFieldInput
                    htmlFor="title"
                    label="Course title"
                    type="text"
                    id="title"
                    name="title"
                    placeholder="Javascript"
                    value={data.title}
                    setValue={(value) => setData('title', value)}
                    onFilled={() =>
                      setRequiredFieldsNumber(requiredFieldsNumber + 1)
                    }
                    message={errors.title || ''}
                  />
                  <FormFieldTextarea
                    htmlFor="information"
                    label="Course information"
                    value={data.information}
                    setValue={(value) => setData('information', value)}
                    onFilled={() =>
                      setRequiredFieldsNumber(requiredFieldsNumber + 1)
                    }
                    message={errors.information || ''}
                  />
                  <FormFieldMarkdown
                    htmlFor="description"
                    label="Course description"
                    value={data.description}
                    setValue={(value) => setData('description', value)}
                    onFilled={() =>
                      setRequiredFieldsNumber(requiredFieldsNumber + 1)
                    }
                    onChange={(value) => setData('description', String(value))}
                    message={errors.description || ''}
                  />
                  <FormFieldInput
                    htmlFor="duration"
                    label="Course duration"
                    type="number"
                    id="duration"
                    name="duration"
                    value={data.duration}
                    setValue={(value) => setData('duration', value)}
                    onFilled={() =>
                      setRequiredFieldsNumber(requiredFieldsNumber + 1)
                    }
                    message={errors.duration || ''}
                  />
                  <Card
                    className={cn(
                      'grid gap-2',
                      errors.difficulty && 'border-red-500',
                    )}
                  >
                    <CardHeader>
                      <CardTitle>
                        <Label className="text-xl">Course difficulty</Label>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Select
                        value={data.difficulty}
                        onValueChange={(value) => setData('difficulty', value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a difficulty" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="beginner">Beginner</SelectItem>
                          <SelectItem value="intermediate">
                            Intermediate
                          </SelectItem>
                          <SelectItem value="advanced">Advanced</SelectItem>
                        </SelectContent>
                      </Select>
                    </CardContent>
                  </Card>
                </CardContent>
              </Card>
              <Card className="flex flex-col gap-5">
                <CardHeader>
                  <CardTitle>
                    <FormFieldHeader
                      title="Sell your course"
                      icon={CircleDollarSign}
                    />
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 gap-4">
                  <FormFieldInput
                    htmlFor="price"
                    label="Course price"
                    type="number"
                    id="price"
                    name="price"
                    value={data.price}
                    setValue={(value) => setData('price', value)}
                    onFilled={() =>
                      setRequiredFieldsNumber(requiredFieldsNumber + 1)
                    }
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
                </CardContent>
              </Card>
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
