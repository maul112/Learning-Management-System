import { DeleteModal } from '@/components/delete-modal';
import { DraftAlert } from '@/components/draft-alert';
import { DragableList } from '@/components/dragable-list';
import { ImagePreviewInput } from '@/components/form-field-file';
import { FormFieldHeader } from '@/components/form-field-header';
import FormFieldInput from '@/components/form-field-input';
import FormFieldMarkdown from '@/components/form-field-markdown';
import FormFieldTextarea from '@/components/form-field-textarea';
import { BorderBeam } from '@/components/ui/border-beam';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
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
import { Academic, BreadcrumbItem, Course, SharedData } from '@/types';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import {
  Book,
  BookOpenTextIcon,
  CircleDollarSign,
  LoaderCircle,
  PlusIcon,
} from 'lucide-react';
import { useEffect } from 'react';
import { toast } from 'sonner';

export default function CourseEdit() {
  const { course, success, error } = usePage<
    SharedData & {
      course: { data: Course };
      academics: { data: Academic[] };
    }
  >().props;

  const breadcrumbs: BreadcrumbItem[] = [
    {
      title: 'Academics',
      href: '/academics',
    },
    {
      title: 'Courses',
      href: `/academics/${course.data.academic.id}/edit`,
    },
    {
      title: 'Edit',
      href: '/courses/edit',
    },
  ];

  const { data, setData, post, processing, errors } = useForm({
    title: course.data.title,
    image: course.data.image as File | string,
    information: course.data.information,
    description: course.data.description,
    duration: course.data.duration,
    difficulty: course.data.difficulty,
    price: course.data.price,
    _method: 'put',
  });

  //   console.log(course.data);

  const {
    data: courseStatus,
    setData: setCourseStatus,
    put: putStatus,
  } = useForm({
    status: course.data.status,
  });

  const [requiredFieldsNumber, setRequiredFieldsNumber] =
    useRequiredFieldNumber(data);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    post(route('courses.update', course.data.id), {
      forceFormData: true,
      preserveScroll: true,
      method: 'put',
      onError: (e) => console.log(e),
    });
  };

  const handleChangeStatus = () => {
    setCourseStatus(
      'status',
      courseStatus.status == 'published' ? 'draft' : 'published',
    );
    putStatus(route('courses.updateStatus', course.data.id), {
      onError: (e) => {
        console.log(e);
        toast.error('Failed to update course status');
      },
      onSuccess: () => {
        toast.success('Course status updated successfully');
      },
    });
  };

  useEffect(() => {
    if (success) toast.success(success as string);
    if (error) toast.error(error as string);
  }, [success, error]);

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Create Course" />
      <DraftAlert status={course.data.status} title="Course" />
      <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
        <div className="flex items-center justify-between pl-4">
          <div>
            <h1 className="text-2xl font-bold">Course setup</h1>
            <p className="text-muted-foreground text-sm">
              Complete all fields ({requiredFieldsNumber - 1}/6)
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant={
                course.data.status == 'published' ? 'secondary' : 'default'
              }
              className="cursor-pointer"
              onClick={handleChangeStatus}
              disabled={
                requiredFieldsNumber < 7 &&
                course.data.modules.filter(
                  (module) => module.status === 'published',
                ).length === 0
              }
            >
              {course.data.status == 'published' ? 'Unpublish' : 'Publish'}
            </Button>
            <DeleteModal resourceName="course" id={course.data.id} />
          </div>
        </div>
        <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min">
          <FormLayout onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-2 lg:grid-cols-2">
              <div className="grid gap-5">
                <Card>
                  <CardHeader>
                    <CardTitle>
                      <FormFieldHeader
                        title="Customize your course"
                        icon={BookOpenTextIcon}
                      />
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-col gap-4">
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
                      onChange={(value) => setData('description', value!)}
                      onFilled={() =>
                        setRequiredFieldsNumber(requiredFieldsNumber + 1)
                      }
                      message={errors.description || ''}
                    />
                    <FormFieldInput
                      htmlFor="duration"
                      label="Course duration"
                      type="number"
                      id="duration"
                      name="duration"
                      value={String(data.duration)}
                      setValue={(value) => setData('duration', Number(value))}
                      onFilled={() =>
                        setRequiredFieldsNumber(requiredFieldsNumber + 1)
                      }
                      message={errors.duration || ''}
                    />
                    <Card className="grid gap-2">
                      <CardHeader>
                        <CardTitle>
                          <Label className="text-xl">Course difficulty</Label>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <Select
                          value={data.difficulty}
                          onValueChange={(value) =>
                            setData('difficulty', value)
                          }
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
              </div>
              <div className="grid gap-5">
                <Card>
                  <CardHeader>
                    <CardTitle>
                      <FormFieldHeader title="Course chapters" icon={Book} />
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Card>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle>
                            <h2 className="text-xl font-bold">
                              Modules chapters
                            </h2>
                          </CardTitle>
                          <Button className="cursor-pointer" asChild>
                            <Link
                              href={route('modules.create', {
                                course: course.data.id,
                              })}
                            >
                              <PlusIcon />
                            </Link>
                          </Button>
                        </div>
                        <CardDescription className="text-muted-foreground text-sm">
                          {course.data.modules.length > 0 ? (
                            <>Total modules: {course.data.modules.length}</>
                          ) : (
                            <>No modules found</>
                          )}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <DragableList
                          data={course.data.modules.map((module) => ({
                            id: String(module.id),
                            title: module.title,
                            order: module.order,
                            status: module.status,
                          }))}
                          endpoint="module"
                        />
                      </CardContent>
                    </Card>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>
                      <FormFieldHeader
                        title="Sell your course"
                        icon={CircleDollarSign}
                      />
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <FormFieldInput
                      htmlFor="price"
                      label="Course price"
                      type="number"
                      id="price"
                      name="price"
                      value={String(data.price)}
                      setValue={(value) => setData('price', Number(value))}
                      message={errors.price || ''}
                    />
                  </CardContent>
                </Card>
                <ImagePreviewInput
                  htmlFor="image"
                  label="Course image"
                  currentImageUrl={`/storage/${course.data.image}`}
                  onChange={(file) => setData('image', file as File)}
                />
              </div>
            </div>
            <Button
              type="submit"
              className="mt-4 w-full"
              tabIndex={4}
              disabled={processing}
            >
              {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
              Save
            </Button>
          </FormLayout>
          <BorderBeam size={300} duration={10} />
        </div>
      </div>
    </AppLayout>
  );
}
