import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import AppLayout from '@/layouts/app-layout';
import { cn } from '@/lib/utils';
import { BreadcrumbItem, User as Instructor } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { Check, ChevronsUpDown, LoaderCircle } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Course',
    href: '/course',
  },
  {
    title: 'Create',
    href: '/course/create',
  },
];

export default function CourseCreate({
  instructors,
  success,
  error,
}: {
  instructors: {
    data: Instructor[];
  };
  success?: string;
  error?: string;
}) {
  const [open, setOpen] = useState<boolean>(false);
  const [instructorName, setInstructorName] = useState<string>('');
  const { data, setData, post, processing, errors, reset } = useForm({
    title: '',
    instructor_id: 0,
  });

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    post(route('courses.store'), {
      onFinish: () => reset('title', 'instructor_id'),
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
          <form onSubmit={handleSubmit} className="flex flex-col gap-6 p-3">
            <div className="grid gap-6">
              <div className="grid gap-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  type="text"
                  id="title"
                  name="title"
                  placeholder="Javascript"
                  value={data.title}
                  onChange={(e) => setData('title', e.target.value)}
                />
                <InputError message={errors.title} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="instructor_id">Instructor Name</Label>
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      type="button"
                      variant="outline"
                      role="combobox"
                      arial-expanded={open}
                    >
                      {instructorName
                        ? instructors.data.find(
                            (instructor) => instructor.name == instructorName,
                          )?.name
                        : 'Select Instructor'}
                      <ChevronsUpDown className="opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent>
                    <Command>
                      <CommandInput placeholder="Search Instructor..." />
                      <CommandList>
                        <CommandEmpty>No Instructor found.</CommandEmpty>
                        <CommandGroup>
                          {instructors.data.map((instructor) => (
                            <CommandItem
                              key={instructor.id}
                              value={instructor.name}
                              onSelect={(currentValue) => {
                                setData('instructor_id', instructor.id);
                                setInstructorName(
                                  currentValue === instructorName
                                    ? ''
                                    : currentValue,
                                );
                                setOpen(false);
                              }}
                            >
                              {instructor.name}
                              <Check
                                className={cn(
                                  'ml-auto',
                                  data.instructor_id == instructor.id
                                    ? 'opacity-100'
                                    : 'opacity-0',
                                )}
                              />
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
                <InputError message={errors.instructor_id} />
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
          </form>
        </div>
      </div>
    </AppLayout>
  );
}
