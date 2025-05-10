import { Course, SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { Separator } from '@radix-ui/react-separator';
import { ArrowUpRight } from 'lucide-react';
import React from 'react';
import { CourseStepCard } from './course-step-card';
import { Button } from './ui/button';

export function CourseOptionCard({
  course,
}: {
  course: {
    data: Course;
  };
}) {
  const data = usePage<SharedData>().props.courses.data;

  return (
    <React.Fragment>
      <p>
        Kelas ini merupakan langkah ke-{course.data.order} dari learning path{' '}
        {course.data.academic.title}
      </p>
      <div className="grid grid-cols-2">
        <CourseStepCard data={data} course={course} />
        <CourseStepCard data={data} course={course} isNext />
      </div>
      <Separator className="my-4" />
      <div className="flex items-center justify-end">
        <Button variant="link" className="group cursor-pointer text-sm">
          <Link href={`/learning-paths/${course.data.academic.id}`}>
            Detail Learning Path
          </Link>
          <ArrowUpRight className="transition-all duration-100 group-hover:translate-x-[2px] group-hover:-translate-y-[2px]" />
        </Button>
      </div>
    </React.Fragment>
  );
}
