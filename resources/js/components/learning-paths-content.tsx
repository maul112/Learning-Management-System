import { Separator } from '@/components/ui/separator';
import { useData } from '@/contexts/DataContext';
import { SharedData } from '@/types';
import { usePage } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { ChartColumnDecreasingIcon, StarIcon, TimerIcon } from 'lucide-react';
import { BorderBeam } from './ui/border-beam';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card';
import { Checkbox } from './ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Label } from './ui/label';

export function LearningPathsContent() {
  const { courses } = usePage<SharedData>().props;
  const academics = useData()?.data?.academics;

  return (
    <div className="dark:bg-background w-full bg-white font-sans md:px-10">
      <div className="mx-auto max-w-7xl px-4 py-20 md:px-8 lg:px-10">
        <motion.h2
          initial={{ y: 20, opacity: 0 }}
          animate={{
            y: 0,
            opacity: 1,
            transition: {
              duration: 0.7,
              type: 'spring',
              damping: 20,
              stiffness: 400,
            },
          }}
          className="mb-4 text-center text-xl text-black md:px-60 md:text-3xl dark:text-white"
        >
          Kelas di NextLMS tersedia dari level dasar hingga profesional sesuai
          kebutuhan industri terkini
        </motion.h2>
      </div>
      <Separator className="mt-10" />
      <main className="px-36 py-10">
        <div className="flex items-center justify-evenly gap-3">
          <div className="grid w-full space-y-2">
            <Label htmlFor="tingkat">Tingkat</Label>
            <DropdownMenu>
              <DropdownMenuTrigger className="text-muted-foreground w-full rounded border p-2 px-2 text-start">
                Semua Tingkat
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-[23.5rem]">
                <DropdownMenuLabel>Tingkat Kesulitan</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Checkbox />
                  Beginner
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Checkbox />
                  Intermediate
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Checkbox />
                  Advanced
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="grid w-full space-y-2">
            <Label htmlFor="topik">Topik</Label>
            <DropdownMenu>
              <DropdownMenuTrigger className="text-muted-foreground w-full rounded border p-2 px-2 text-start">
                Semua Topik
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-[23.5rem]">
                <DropdownMenuLabel>Topik Kelas</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {academics?.data.map((academic) => (
                  <DropdownMenuItem key={academic.id}>
                    <Checkbox />
                    {academic.title}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="grid w-full space-y-2">
            <Label htmlFor="type">Tipe Kelas</Label>
            <DropdownMenu>
              <DropdownMenuTrigger className="text-muted-foreground w-full rounded border p-2 px-2 text-start">
                Semua Kelas
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-[23.5rem]">
                <DropdownMenuLabel>Tipe Kelas</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Checkbox />
                  Kelas Gratis
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Checkbox />
                  Kelas Berbayar
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="mt-5 grid grid-cols-2 gap-x-5 gap-y-3">
          {courses.data.map((course) => (
            <Card className="relative">
              <CardHeader>
                <div className="flex gap-5">
                  <div className="h-32 w-60 bg-slate-200"></div>
                  <div className="flex w-full flex-col">
                    <CardTitle>{course.title}</CardTitle>
                    <CardDescription className="mt-5 flex items-center gap-4">
                      <span className="flex items-center gap-2">
                        <TimerIcon className="h-4 w-4 text-blue-400" />
                        {course.duration} Jam
                      </span>
                      <span className="flex items-center gap-2">
                        <StarIcon
                          className="h-4 w-4 text-amber-400"
                          fill="currentColor"
                        />
                        4.0
                      </span>
                      <span className="flex items-center gap-2">
                        <ChartColumnDecreasingIcon className="h-4 w-4 text-cyan-400" />
                        {course.difficulty}
                      </span>
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>{course.information}</CardContent>
              <BorderBeam />
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
