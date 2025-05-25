import { RootContent } from '@/components/root-content';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ShineBorder } from '@/components/ui/shine-border';
import { useAverage } from '@/hooks/use-average';
import { useInitials } from '@/hooks/use-initials';
import RootLayout from '@/layouts/root-layout';
import { SharedData, User } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import {
  Book,
  ChartColumnDecreasing,
  CheckCircle2Icon,
  Edit2Icon,
  StarIcon,
  TimerIcon,
  Users2,
  XIcon,
} from 'lucide-react';

export default function Profile() {
  const { user } = usePage<SharedData & { user: { data: User } }>().props;
  const getInitials = useInitials();
  const getAverage = useAverage();

  console.log(user);

  const getDate = (date: string) => {
    const options: Intl.DateTimeFormatOptions = {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    };
    return new Date(date).toLocaleDateString('en-US', options);
  };

  return (
    <RootLayout>
      <Head title={user.data.name + '-Profile'} />
      <div className="bg-accent-foreground h-96 w-full pt-32">
        <RootContent>
          <div className="flex items-center gap-4">
            <Avatar className="relative h-44 w-44 overflow-visible">
              <AvatarImage
                src={`/storage/${user.data.avatar}`}
                alt={user.data.name}
              />
              <AvatarFallback className="text-4xl">
                {getInitials(user.data.name)}
              </AvatarFallback>
              <Button className="border-background absolute right-1 bottom-1 h-12 w-12 rounded-full border-2">
                <Edit2Icon />
              </Button>
            </Avatar>
            <div className="flex flex-col gap-5">
              <h1 className="dark:text-background text-accent text-4xl font-semibold">
                {user.data.name}
              </h1>
              <div className="flex flex-col gap-1">
                <span className="flex items-center gap-1">
                  <TimerIcon className="dark:text-background text-accent" />
                  <p className="dark:text-background text-accent">
                    Bergabung sejak {getDate(user.data.created_at!)}
                  </p>
                </span>
              </div>
            </div>
          </div>
        </RootContent>
      </div>
      <RootContent>
        <div className="my-20 grid grid-cols-1 gap-5 md:grid-cols-2">
          {user.data.student?.courses_enrolled.map((course) => (
            <Card key={course.id} className="relative">
              <CardHeader>
                <div className="flex items-center gap-5">
                  <div className="bg-primary h-24 w-28">
                    <img
                      className="h-full w-full object-cover"
                      src={`/storage/${course.image}`}
                      alt={course.title}
                    />
                  </div>
                  <div className="flex flex-col gap-5">
                    <span className="flex items-center gap-2 text-sm">
                      {course.is_completed ? (
                        <CheckCircle2Icon className="h-4 w-4 text-green-400" />
                      ) : (
                        <XIcon className="h-4 w-4 text-red-400" />
                      )}
                      {course.is_completed ? 'Lulus' : 'Belum Selesai'}
                    </span>
                    <CardTitle>{course.title}</CardTitle>
                    <CardDescription>
                      <div className="flex items-center gap-5">
                        <span className="flex items-center gap-2">
                          <TimerIcon className="h-4 w-4 text-blue-400" />
                          {course.duration} Jam
                        </span>
                        <span className="flex items-center gap-2">
                          <StarIcon
                            className="h-4 w-4 text-amber-400"
                            fill="currentColor"
                          />
                          {getAverage(
                            course.ratings.map((rating) => rating.rating),
                          )}
                        </span>
                        <span className="flex items-center gap-2 capitalize">
                          <ChartColumnDecreasing className="h-4 w-4 text-purple-400" />
                          {course.difficulty}
                        </span>
                      </div>
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{course.information}</p>
              </CardContent>
              <CardFooter>
                <div className="text-muted-foreground flex items-center gap-5">
                  <span className="flex items-center gap-2">
                    <Book className="h-4 w-4 text-cyan-400" />
                    {course.modules.length} Modul
                  </span>
                  <span className="flex items-center gap-2">
                    <Users2 className="h-4 w-4 text-amber-400" />
                    {course.students.length} Siswa Terdaftar
                  </span>
                </div>
              </CardFooter>
              <ShineBorder shineColor={['#A07CFE', '#FE8FB5', '#FFBE7B']} />
            </Card>
          ))}
        </div>
      </RootContent>
    </RootLayout>
  );
}
