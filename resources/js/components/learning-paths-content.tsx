import { Separator } from '@/components/ui/separator';
import { Academic, Course, SharedData } from '@/types';
import { usePage } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { useCallback, useEffect, useState } from 'react';
import { CourseCard } from './course-card';
import { SelectFilter } from './select-filter';

export function LearningPathsContent() {
  const { courses, academics } = usePage<
    SharedData & { academics: { data: Academic[] } }
  >().props;
  const [coursesFilter, setCoursesFilter] = useState<Course[]>([]);
  const [difficultyFilter, setDifficultyFilter] = useState<string[]>([]);
  const [academicFilter, setAcademicFilter] = useState<string[]>([]);
  const [classTypeFilter, setClassTypeFilter] = useState<string[]>([]);

  const filteredCourses = useCallback(() => {
    return courses.data.filter(
      (course) =>
        (!difficultyFilter.length ||
          difficultyFilter.includes(course.difficulty)) &&
        (!academicFilter.length ||
          academicFilter.includes(course.academic.title)) &&
        (!classTypeFilter.length ||
          classTypeFilter.includes(course.price > 0 ? 'Gratis' : 'Berbayar')),
    );
  }, [academicFilter, difficultyFilter, classTypeFilter, courses.data]);

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
          <SelectFilter
            title="Tingkat"
            label="Tingkat Kesulitan"
            items={[
              {
                label: 'Beginner',
                value: 'beginner',
              },
              {
                label: 'Intermediate',
                value: 'intermediate',
              },
              {
                label: 'Advanced',
                value: 'advanced',
              },
            ]}
            stateFilter={difficultyFilter}
            setStateFilter={setDifficultyFilter}
          />
          <SelectFilter
            title="Topik"
            label="Topik"
            items={
              academics?.data.map((item) => ({
                label: item.title,
                value: item.title,
              })) || []
            }
            stateFilter={academicFilter}
            setStateFilter={setAcademicFilter}
          />
          <SelectFilter
            title="Tipe Kelas"
            label="Tipe Kelas"
            items={[
              {
                label: 'Kelas Gratis',
                value: 'Gratis',
              },
              {
                label: 'Kelas Berbayar',
                value: 'Berbayar',
              },
            ]}
            stateFilter={classTypeFilter}
            setStateFilter={setClassTypeFilter}
          />
        </div>
        <div className="mt-5 grid grid-cols-1 gap-x-5 gap-y-3 md:grid-cols-2">
          {coursesFilter.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </main>
    </div>
  );
}
