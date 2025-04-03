import { Calendar } from '@/components/ui/calendar';
import CountUp from '@/components/ui/count-up';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import {
  Book,
  Ellipsis,
  GraduationCap,
  UserRoundCheck,
  UsersRound,
} from 'lucide-react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
  },
];

type DashboardProps = {
  instructorsCount: number;
  studentsCount: number;
  userActiveCount: number;
  moduleCount: number;
};

type DashboardItems = {
  icon: React.ReactNode;
  title: string;
  count: number;
};

export default function Dashboard({
  instructorsCount,
  studentsCount,
  userActiveCount,
  moduleCount,
}: DashboardProps) {
  const [date, setDate] = useState<Date | undefined>(new Date());

  const dashboadItems: DashboardItems[] = [
    {
      icon: <GraduationCap className="text-blue-600" />,
      title: 'Instructors',
      count: instructorsCount,
    },
    {
      icon: <UsersRound className="text-yellow-600" />,
      title: 'Students',
      count: studentsCount,
    },
    {
      icon: <UserRoundCheck className="text-green-600" />,
      title: 'Active Users',
      count: userActiveCount,
    },
    {
      icon: <Book className="text-purple-600" />,
      title: 'Modules',
      count: moduleCount,
    },
  ];

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Dashboard" />
      <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
        <div className="grid auto-rows-min gap-4 md:grid-cols-4">
          {dashboadItems.map((item, index) => (
            <div
              key={index}
              className="border-sidebar-border/70 dark:border-sidebar-border flex aspect-video flex-col gap-2 overflow-hidden rounded-xl border p-6"
            >
              <div className="flex gap-2">
                <div className="border-sidebar-border/70 dark:border-sidebar-border h-fit w-fit cursor-pointer rounded-lg border p-3">
                  {item.icon}
                </div>
                <div className="h-fit w-full p-3">
                  <h2 className="text-2xl font-semibold">{item.title}</h2>
                </div>
                <div className="flex h-fit w-10 justify-center p-3">
                  <Ellipsis size={20} />
                </div>
              </div>
              <CountUp
                from={0}
                to={item.count}
                duration={1}
                direction="up"
                separator=","
                className="text-4xl"
              />
            </div>
          ))}
        </div>
        <div className="border-sidebar-border/70 dark:border-sidebar-border relative grid min-h-[100vh] flex-1 grid-cols-[5fr_1fr] gap-2 overflow-hidden rounded-xl border md:min-h-min">
          <div className="relative">
            <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
          </div>
          <div className="relative">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border shadow"
            />
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
