import { DeleteModal } from '@/components/delete-modal';
import { DraftAlert } from '@/components/draft-alert';
import { DragableList } from '@/components/dragable-list';
import { FormFieldHeader } from '@/components/form-field-header';
import FormFieldInput from '@/components/form-field-input';
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
import { BreadcrumbItem, Module, SharedData } from '@/types';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { Book, BookOpenTextIcon, LoaderCircle, PlusIcon } from 'lucide-react';
import { useEffect } from 'react';
import { toast } from 'sonner';

export default function ModuleEdit() {
  const { module, sucess, error } = usePage<
    SharedData & { module: { data: Module } }
  >().props;

  const breadcrumbs: BreadcrumbItem[] = [
    {
      title: 'Academics',
      href: '/academics',
    },
    {
      title: 'Courses',
      href: `/academics/${module.data.course.academic.id}/edit`,
    },
    {
      title: 'Modules',
      href: `/courses/${module.data.id}/edit`,
    },
    {
      title: 'Edit',
      href: '/modules/edit',
    },
  ];


  const { data, setData, put, processing, errors } = useForm({
    title: module.data.title,
  });

  const { data: moduleStatus, setData: setModuleStatus, put: putModuleStatus } = useForm({
    status: module.data.status
  })

  const [requiredFieldsNumber, setRequiredFieldsNumber] =
    useRequiredFieldNumber(data);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    put(route('modules.update', module.data.id), {
      onError: (e) => console.log(e),
    });
  };

  const handleChangeStatus: React.MouseEventHandler<HTMLButtonElement> = (
    e,
  ) => {
    e.preventDefault();
    setModuleStatus(
      'status',
      moduleStatus.status == 'published' ? 'draft' : 'published',
    )
    putModuleStatus(route('modules.updateStatus', module.data.id), {
      onError: (e) => {
        console.log(e);
        toast.error('Failed to update module status');
      },
      onSuccess: () => {
        toast.success('Module status updated successfully');
      },
    });
  };

  useEffect(() => {
    if (sucess) toast.success(sucess as string);
    if (error) toast.error(error as string);
  }, [sucess, error]);

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Edit Module" />
      <DraftAlert status={module.data.status} title="Module" />
      <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
        <div className="flex items-center justify-between pl-4">
          <div>
            <h1 className="text-2xl font-bold">Module setup</h1>
            <p className="text-muted-foreground text-sm">
              Complete all fields ({requiredFieldsNumber}/1)
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant={
                module.data.status == 'published' ? 'secondary' : 'default'
              }
              className="cursor-pointer"
              onClick={handleChangeStatus}
              disabled={
                requiredFieldsNumber < 1 ||
                module.data.lessons.filter(
                  (lesson) => lesson.status === 'published',
                ).length === 0
              }
            >
              {module.data.status == 'published' ? 'Unpublish' : 'Publish'}
            </Button>
            <DeleteModal resourceName="module" id={module.data.id} />
          </div>
        </div>
        <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min">
          <FormLayout onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-2 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>
                    <FormFieldHeader
                      title="Customize your module"
                      icon={BookOpenTextIcon}
                    />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <FormFieldInput
                    htmlFor="title"
                    label="Title"
                    type="text"
                    id="title"
                    name="title"
                    placeholder="Module title"
                    value={data.title || ''}
                    setValue={(value) => setData('title', value)}
                    onFilled={() =>
                      setRequiredFieldsNumber(requiredFieldsNumber + 1)
                    }
                    message={errors.title || ''}
                  />
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>
                    <FormFieldHeader title="Lessons chapters" icon={Book} />
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
                            href={route('lessons.create', {
                              module: module.data.id,
                            })}
                          >
                            <PlusIcon />
                          </Link>
                        </Button>
                      </div>
                      <CardDescription className="text-muted-foreground text-sm">
                        {module.data.lessons.length > 0 ? (
                          <>Total Lessons: {module.data.lessons.length}</>
                        ) : (
                          <>No lessons found</>
                        )}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <DragableList
                        data={module.data.lessons.map((lesson) => ({
                          id: String(lesson.id),
                          title: lesson.title,
                          order: lesson.order,
                          status: lesson.status,
                        }))}
                        endpoint="lesson"
                      />
                    </CardContent>
                  </Card>
                </CardContent>
              </Card>
            </div>
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
