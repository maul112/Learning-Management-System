import { BorderBeam } from '@/components/ui/border-beam';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import CountUp from '@/components/ui/count-up';
import { ShineBorder } from '@/components/ui/shine-border';
import AppLayout from '@/layouts/app-layout';
import { SharedData, type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { format } from 'date-fns';
import {
  Book,
  Ellipsis,
  GraduationCap,
  UserRoundCheck,
  UsersRound,
} from 'lucide-react';
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
  },
];

type DashboardItems = {
  icon: React.ReactNode;
  title: string;
  count: number;
};

const chartConfig = {
  users: {
    label: 'Users',
    color: '#11415b',
  },
} satisfies ChartConfig;

export default function Dashboard() {
  const {
    academicsCount,
    studentsCount,
    userActiveCount,
    courseCount,
    chartDataRegister,
  } = usePage<SharedData>().props;

  const dashboadItems: DashboardItems[] = [
    {
      icon: <GraduationCap className="text-blue-600" />,
      title: 'Academics',
      count: academicsCount as number,
    },
    {
      icon: <Book className="text-purple-600" />,
      title: 'Courses',
      count: courseCount as number,
    },
    {
      icon: <UsersRound className="text-yellow-600" />,
      title: 'Students',
      count: studentsCount as number,
    },
    {
      icon: <UserRoundCheck className="text-green-600" />,
      title: 'Active Users',
      count: userActiveCount as number,
    },
  ];

  const chartDataRegisterFormated = (
    chartDataRegister as { id: number; created_at: string }[]
  ).reduce(
    (acc, item) => {
      const month = format(new Date(item.created_at), 'MMM');
      const existing = acc.find((entry) => entry.month === month);
      if (existing) {
        existing.users += 1;
      } else {
        acc.push({ month, users: 1 });
      }
      return acc;
    },
    [] as { month: string; users: number }[],
  );

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Dashboard" />
      <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
        <div className="grid auto-rows-min gap-4 md:grid-cols-4">
          {dashboadItems.map((item, index) => (
            <Card key={index} className="relative">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="flex items-center gap-x-2">
                  {item.icon}
                  <div className="text-lg leading-none font-medium">
                    {item.title}
                  </div>
                </CardTitle>
                <Ellipsis className="h-5 w-5" />
              </CardHeader>
              <CardContent className="text-2xl font-bold">
                <CountUp from={0} to={item.count} duration={1} separator="," />
              </CardContent>
              <ShineBorder shineColor={['#A07CFE', '#FE8FB5', '#FFBE7B']} />
            </Card>
          ))}
        </div>
        <div className="border-sidebar-border/70 dark:border-sidebar-border relative grid min-h-fit flex-1 gap-2 overflow-hidden rounded-xl border md:min-h-min">
          <div className="relative">
            <ChartContainer
              config={chartConfig}
              className="min-h-[400px] w-full lg:max-h-[450px]"
            >
              <BarChart accessibilityLayer data={chartDataRegisterFormated}>
                <defs>
                  <linearGradient
                    id="usersGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="0%" stopColor="#ffaa40" />
                    <stop offset="100%" stopColor="#9c40ff" />
                  </linearGradient>
                </defs>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tickFormatter={(value) => value.slice(0, 3)}
                />
                <ChartTooltip content={<ChartTooltipContent indicator='dot' />} />
                <ChartLegend content={<ChartLegendContent />} />
                <Bar dataKey="users" fill="url(#usersGradient)" radius={4} />
              </BarChart>
            </ChartContainer>
            <BorderBeam size={300} duration={10} />
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
