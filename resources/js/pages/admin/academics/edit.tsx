import { DeleteModal } from '@/components/delete-modal';
import { DraftAlert } from '@/components/draft-alert';
import { DragableList } from '@/components/dragable-list';
import { ImagePreviewInput } from '@/components/form-field-file';
import { FormFieldHeader } from '@/components/form-field-header';
import FormFieldInput from '@/components/form-field-input';
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
import { useRequiredFieldNumber } from '@/hooks/use-required-field-number';
import AppLayout from '@/layouts/app-layout';
import FormLayout from '@/layouts/form-layout';
import { Academic, BreadcrumbItem, SharedData } from '@/types';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import {
  LayoutDashboardIcon,
  ListChecks,
  LoaderCircle,
  PlusIcon,
} from 'lucide-react';
import { useEffect } from 'react';
import { toast } from 'sonner';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Academics',
    href: '/academics',
  },
  {
    title: 'Edit',
    href: '/academics/edit',
  },
];

export default function AcademicEdit() {
  const { academic, success, error } = usePage<
    SharedData & { academic: { data: Academic } }
  >().props;
  const { data, setData, post, errors, processing } = useForm({
    title: academic.data.title,
    image: academic.data.image as File | string | null,
    description: academic.data.description,
    _method: 'put',
  });
  const {
    data: academicStatus,
    setData: setAcademicStatus,
    put: putAcademicStatus,
  } = useForm({
    status: academic.data.status,
  });
  const [requiredFieldsNumber, setRequiredFieldsNumber] =
    useRequiredFieldNumber(data);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    post(route('academics.update', academic.data.id), {
      forceFormData: true,
      preserveScroll: true,
      method: 'put',
      onError: (e) => {
        console.log(e);
      },
    });
  };

  const handleChangeStatus: React.MouseEventHandler<HTMLButtonElement> = (
    e,
  ) => {
    e.preventDefault();
    setAcademicStatus(
      'status',
      academicStatus.status == 'published' ? 'draft' : 'published',
    );
    putAcademicStatus(route('academics.updateStatus', academic.data.id), {
      onError: (e) => {
        console.log(e);
        toast.error('Failed to update academic status');
      },
      onSuccess: () => {
        toast.success('Academic status updated successfully');
      },
    });
  };

  //   console.log(academic.data.courses);

  useEffect(() => {
    if (success) toast.success(success as string);
    if (error) toast.error(error as string);
  }, [success, error]);

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Edit Academic" />
      <DraftAlert status={academic.data.status} title="Academic" />
      <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
        <div className="flex items-center justify-between pl-4">
          <div>
            <h1 className="text-2xl font-bold">Academic setup</h1>
            <p className="text-muted-foreground text-sm">
              Complete all fields ({requiredFieldsNumber - 1}/3)
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant={
                academic.data.status == 'published' ? 'secondary' : 'default'
              }
              className="cursor-pointer"
              onClick={handleChangeStatus}
              disabled={requiredFieldsNumber < 3}
            >
              {academic.data.status == 'published' ? 'Unpublish' : 'Publish'}
            </Button>
            <DeleteModal resourceName="academic" id={academic.data.id} />
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
                        title="Customize your academic"
                        icon={LayoutDashboardIcon}
                      />
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="grid gap-5">
                    <FormFieldInput
                      htmlFor="title"
                      label="Academic title"
                      type="text"
                      value={data.title}
                      onChange={(e) => {
                        if (e.target.value.length > 0) {
                          setRequiredFieldsNumber(requiredFieldsNumber + 1);
                        }
                        setData('title', e.target.value);
                      }}
                      message={errors.title || ''}
                    />
                    <ImagePreviewInput
                      htmlFor="image"
                      label="Academic image"
                      currentImageUrl={`/storage/${academic.data.image}`}
                      onChange={(file) => {
                        if (file) {
                          setRequiredFieldsNumber(requiredFieldsNumber + 1);
                        }
                        setData('image', file);
                      }}
                      error={errors.image}
                    />
                    <FormFieldTextarea
                      htmlFor="description"
                      label="Academic description"
                      value={data.description}
                      onChange={(e) => {
                        if (e.target.value.length > 0) {
                          setRequiredFieldsNumber(requiredFieldsNumber + 1);
                        }
                        setData('description', e.target.value || '');
                      }}
                      message={errors.description || ''}
                    />
                  </CardContent>
                </Card>
              </div>
              <div className="flex flex-col gap-5">
                <Card>
                  <CardHeader>
                    <CardTitle>
                      <FormFieldHeader
                        title="Academic chapters"
                        icon={ListChecks}
                      />
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Card>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle>
                            <h2 className="text-xl font-bold">
                              Course chapters
                            </h2>
                          </CardTitle>
                          <Button className="cursor-pointer" asChild>
                            <Link href={route('courses.create')}>
                              <PlusIcon />
                            </Link>
                          </Button>
                        </div>
                        <CardDescription>
                          {academic.data.courses.length > 0 ? (
                            <p className="text-muted-foreground text-sm">
                              Total chapters: {academic.data.courses.length}
                            </p>
                          ) : (
                            <p className="text-muted-foreground text-sm">
                              No chapters found
                            </p>
                          )}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <DragableList
                          data={academic.data.courses.map((course) => ({
                            id: String(course.id),
                            title: course.title,
                            order: course.order,
                            status: course.status,
                          }))}
                          endpoint="course"
                        />
                      </CardContent>
                    </Card>
                  </CardContent>
                </Card>
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
