import InputError from '@/components/input-error';
import MarkdownEditor from '@/components/markdown-editor';
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
import { Popover, PopoverTrigger } from '@/components/ui/popover';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import AppLayout from '@/layouts/app-layout';
import { cn } from '@/lib/utils';
import { BreadcrumbItem, Course } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { PopoverContent } from '@radix-ui/react-popover';
import { Check, ChevronsUpDown, LoaderCircle } from 'lucide-react';
import { useState } from 'react';
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

export default function ModuleCreate({
  courses,
  sucess,
  error,
}: {
  courses: {
    data: Course[];
  };
  sucess?: string;
  error?: string;
}) {
  const [open, setOpen] = useState<boolean>(false);
  const [radioValue, setRadioValue] = useState<string>('link');
  const [courseName, setCourseName] = useState<string>('');
  const { data, setData, post, processing, errors, reset } = useForm({
    title: '',
    content: '',
    video_url: '',
    course_id: 0,
  });

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    post(route('modules.store'), {
      onFinish: () => reset('title', 'content', 'video_url', 'course_id'),
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
          <form onSubmit={handleSubmit} className="flex flex-col gap-6 p-3">
            <div className="grid gap-6">
              <div className="grid gap-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  name="title"
                  placeholder="Enter module title"
                  value={data.title}
                  onChange={(e) => setData('title', e.target.value)}
                />
                <InputError message={errors.title} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="content">Content</Label>
                <MarkdownEditor
                  value={data.content}
                  onChange={(value) => setData('content', value || '')}
                />
                <InputError message={errors.content} />
              </div>
              <div className="grid gap-2">
                <Label>Options to upload video or link</Label>
                <RadioGroup
                  defaultValue="link"
                  defaultChecked
                  onValueChange={setRadioValue}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="link" id="r1" />
                    <Label htmlFor="r1">Link</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="video" id="r2" />
                    <Label htmlFor="r2">Video</Label>
                  </div>
                </RadioGroup>
              </div>
              {radioValue === 'link' ? (
                <div className="grid gap-2">
                  <Label htmlFor="video_url">Video URL</Label>
                  <Input
                    type="text"
                    id="video_url"
                    name="video_url"
                    placeholder="Enter video URL"
                    value={data.video_url}
                    onChange={(e) => setData('video_url', e.target.value)}
                  />
                  <InputError message={errors.video_url} />
                </div>
              ) : (
                <div className="grid gap-2">
                  <Label htmlFor="video_url">Video</Label>
                  <Input
                    id="video_url"
                    name="video_url"
                    placeholder="Enter video URL"
                    type="file"
                    value={data.video_url}
                    onChange={(e) => setData('video_url', e.target.value)}
                  />
                  <InputError message={errors.video_url} />
                </div>
              )}
              <div className="grid gap-2">
                <Label htmlFor="course_id">Course</Label>
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      type="button"
                      variant="outline"
                      role="combobox"
                      arial-expanded={open}
                    >
                      {courseName
                        ? courses.data.find(
                            (course) => course.title == courseName,
                          )?.title
                        : 'Select course...'}
                      <ChevronsUpDown className="opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent>
                    <Command>
                      <CommandInput placeholder="Search course..." />
                      <CommandList>
                        <CommandEmpty>No course found.</CommandEmpty>
                        <CommandGroup>
                          {courses.data.map((course) => (
                            <CommandItem
                              value={course.title}
                              key={course.id}
                              onSelect={(currentValue) => {
                                setData('course_id', course.id);
                                setCourseName(
                                  currentValue === courseName
                                    ? ''
                                    : currentValue,
                                );
                                setOpen(false);
                              }}
                            >
                              {course.title}
                              <Check
                                className={cn(
                                  'ml-auto',
                                  data.course_id == course.id
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
                <InputError message={errors.course_id} />
              </div>
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
              Create
            </Button>
          </form>
        </div>
      </div>
    </AppLayout>
  );
}
