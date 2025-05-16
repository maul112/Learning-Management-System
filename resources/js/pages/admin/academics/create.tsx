import { ImagePreviewInput } from '@/components/form-field-file';
import FormFieldInput from '@/components/form-field-input';
import FormFieldTextarea from '@/components/form-field-textarea';
import { BorderBeam } from '@/components/ui/border-beam';
import { Button } from '@/components/ui/button';
import { useRequiredFieldNumber } from '@/hooks/use-required-field-number';
import AppLayout from '@/layouts/app-layout';
import FormLayout from '@/layouts/form-layout';
import { BreadcrumbItem, SharedData } from '@/types';
import { Head, useForm, usePage } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { useEffect } from 'react';
import { toast } from 'sonner';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Academics',
    href: '/academics',
  },
  {
    title: 'Create',
    href: '/academics/create',
  },
];

export default function AcademicCreate() {
  const { success, error } = usePage<SharedData>().props;
  const { data, setData, post, processing, errors } = useForm({
    title: '',
    image: null as File | null,
    description: '',
  });
  const [requiredFieldsNumber, setRequiredFieldsNumber] =
    useRequiredFieldNumber(data);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    post(route('academics.store'), {
      onError: (e) => console.log(e),
    });
  };

  useEffect(() => {
    if (success) toast.success(success as string);
    if (error) toast.error(error as string);
  }, [success, error]);

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Create Academic" />
      <div className="flex items-center justify-between pl-4">
        <div>
          <h1 className="text-2xl font-bold">Academic setup</h1>
          <p className="text-muted-foreground text-sm">
            Complete all fields ({requiredFieldsNumber}/3)
          </p>
        </div>
      </div>
      <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
        <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min">
          <FormLayout onSubmit={handleSubmit}>
            <FormFieldInput
              htmlFor="title"
              label="Title"
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
              label="Image"
              onChange={(file) => {
                if (file) {
                  setRequiredFieldsNumber(requiredFieldsNumber + 1);
                }
                setData('image', file || null);
              }}
              error={errors.image}
            />
            <FormFieldTextarea
              htmlFor="description"
              label="Description"
              value={data.description}
              onChange={(e) => {
                if (e.target.value.length > 0) {
                  setRequiredFieldsNumber(requiredFieldsNumber + 1);
                }
                setData('description', e.target.value);
              }}
              message={errors.description || ''}
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
          <BorderBeam size={300} duration={10} />
        </div>
      </div>
    </AppLayout>
  );
}
