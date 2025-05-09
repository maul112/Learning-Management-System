import { Separator } from '@/components/ui/separator';
import { useData } from '@/contexts/DataContext';
import { useAverage } from '@/hooks/use-average';
import { Course, SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { ChartColumnDecreasingIcon, StarIcon, TimerIcon } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
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
import { ShineBorder } from './ui/shine-border';

export function LearningPathsContent() {
  const { courses } = usePage<SharedData>().props;
  const academics = useData()?.data?.academics;
  const getAverage = useAverage();
  const [coursesFilter, setCoursesFilter] = useState<Course[]>([]);
  const [difficultyFilter, setDifficultyFilter] = useState<string[]>([]);
  const [academicFilter, setAcademicFilter] = useState<string[]>([]);
  const [classTypeFilter, setClassTypeFilter] = useState<string[]>([]);

  const filteredCourses = useCallback(() => {
    return courses.data.filter((course) => {
      return (
        (!difficultyFilter.length ||
          difficultyFilter.includes(course.difficulty)) &&
        (!academicFilter.length ||
          academicFilter.includes(course.academic.title))
      );
    });
  }, [academicFilter, difficultyFilter, courses.data]);

  useEffect(() => {
    setCoursesFilter(filteredCourses);
  }, [difficultyFilter, academicFilter, classTypeFilter, filteredCourses]);

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
          Kelas di{' '}
          <span className="text-background rounded bg-cyan-400 p-1 font-bold">
            NextLMS
          </span>{' '}
          tersedia dari level dasar hingga profesional sesuai kebutuhan industri
          terkini
        </motion.h2>
      </div>
      <Separator className="mt-10" />
      <main className="px-3 py-10 md:px-0 lg:px-36">
        <div className="flex items-center justify-evenly gap-3">
          <div className="grid w-full space-y-2">
            <Label htmlFor="tingkat">Tingkat</Label>
            <DropdownMenu>
              <DropdownMenuTrigger className="text-muted-foreground relative w-full rounded border p-2 px-2 text-start capitalize">
                {difficultyFilter.length
                  ? difficultyFilter.join(', ')
                  : 'Semua Tingkat'}
              </DropdownMenuTrigger>
              <DropdownMenuContent className="lg:w-[23.5rem]">
                <DropdownMenuLabel>Tingkat Kesulitan</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() =>
                    difficultyFilter.includes('beginner')
                      ? setDifficultyFilter(
                          difficultyFilter.filter(
                            (item) => item !== 'beginner',
                          ),
                        )
                      : setDifficultyFilter([...difficultyFilter, 'beginner'])
                  }
                >
                  <Checkbox checked={difficultyFilter.includes('beginner')} />
                  Beginner
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() =>
                    difficultyFilter.includes('intermediate')
                      ? setDifficultyFilter(
                          difficultyFilter.filter(
                            (item) => item !== 'intermediate',
                          ),
                        )
                      : setDifficultyFilter([
                          ...difficultyFilter,
                          'intermediate',
                        ])
                  }
                >
                  <Checkbox
                    checked={difficultyFilter.includes('intermediate')}
                  />
                  Intermediate
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() =>
                    difficultyFilter.includes('Advanced')
                      ? setDifficultyFilter(
                          difficultyFilter.filter(
                            (item) => item !== 'Advanced',
                          ),
                        )
                      : setDifficultyFilter([...difficultyFilter, 'Advanced'])
                  }
                >
                  <Checkbox checked={difficultyFilter.includes('Advanced')} />
                  Advanced
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="grid w-full space-y-2">
            <Label htmlFor="topik">Topik</Label>
            <DropdownMenu>
              <DropdownMenuTrigger className="text-muted-foreground w-full rounded border p-2 px-2 text-start capitalize">
                {academicFilter.length
                  ? academicFilter.join(', ')
                  : 'Semua Topik'}
              </DropdownMenuTrigger>
              <DropdownMenuContent className="lg:w-[23.5rem]">
                <DropdownMenuLabel>Topik Kelas</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {academics?.data.map((academic) => (
                  <DropdownMenuItem
                    key={academic.id}
                    onClick={() =>
                      academicFilter.includes(academic.title)
                        ? setAcademicFilter(
                            academicFilter.filter(
                              (item) => item !== academic.title,
                            ),
                          )
                        : setAcademicFilter([...academicFilter, academic.title])
                    }
                  >
                    <Checkbox
                      checked={academicFilter.includes(academic.title)}
                    />
                    {academic.title}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="grid w-full space-y-2">
            <Label htmlFor="type">Tipe Kelas</Label>
            <DropdownMenu>
              <DropdownMenuTrigger className="text-muted-foreground w-full rounded border p-2 px-2 text-start capitalize">
                {classTypeFilter.length
                  ? classTypeFilter.join(', ')
                  : 'Semua Kelas'}
              </DropdownMenuTrigger>
              <DropdownMenuContent className="lg:w-[23.5rem]">
                <DropdownMenuLabel>Tipe Kelas</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() =>
                    classTypeFilter.includes('Gratis')
                      ? setClassTypeFilter(
                          classTypeFilter.filter((item) => item !== 'Gratis'),
                        )
                      : setClassTypeFilter([...classTypeFilter, 'Gratis'])
                  }
                >
                  <Checkbox checked={classTypeFilter.includes('Gratis')} />
                  Kelas Gratis
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() =>
                    classTypeFilter.includes('Kelas Berbayar')
                      ? setClassTypeFilter(
                          classTypeFilter.filter(
                            (item) => item !== 'Kelas Berbayar',
                          ),
                        )
                      : setClassTypeFilter([
                          ...classTypeFilter,
                          'Kelas Berbayar',
                        ])
                  }
                >
                  <Checkbox
                    checked={classTypeFilter.includes('Kelas Berbayar')}
                  />
                  Kelas Berbayar
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="mt-5 grid grid-cols-1 gap-x-5 gap-y-3 md:grid-cols-2">
          {coursesFilter.map((course) => (
            <Card className="relative">
              <CardHeader>
                <div className="flex gap-5">
                  <div className="h-32 w-60 bg-slate-200"></div>
                  <div className="flex w-full flex-col">
                    <CardTitle>
                      <Link href={`/academies/${course.id}`}>
                        {course.title}
                      </Link>
                    </CardTitle>
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
                        {getAverage(
                          course.ratings.map((rating) => rating.rating),
                        )}
                      </span>
                      <span className="flex items-center gap-2 capitalize">
                        <ChartColumnDecreasingIcon className="h-4 w-4 text-cyan-400" />
                        {course.difficulty}
                      </span>
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>{course.information}</CardContent>
              <ShineBorder shineColor={['#A07CFE', '#FE8FB5', '#FFBE7B']} />
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
