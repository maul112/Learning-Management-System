import { CourseDetail } from '@/components/course-detail';
import { CourseGetIn } from '@/components/course-get-in';
import { CourseJumbotron } from '@/components/course-jumbotron';
import { CourseSyllabus } from '@/components/course-syllabus';
import { RootFooter } from '@/components/root-footer';
import RootLayout from '@/layouts/root-layout';
import { Course as CourseType, SharedData } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { useRef } from 'react';

export default function Course() {
  const { course } = usePage<
    SharedData & { course: { data: CourseType }; snapToken: string }
  >().props;

  const informationRef = useRef<HTMLDivElement | null>(null);
  const syllabusRef = useRef<HTMLDivElement | null>(null);

  return (
    <RootLayout>
      <Head title={course.data.title} />
      <CourseJumbotron
        informationRef={informationRef}
        syllabusRef={syllabusRef}
      />
      <CourseGetIn />
      <CourseDetail informationRef={informationRef} />
      <CourseSyllabus syllabusRef={syllabusRef} />
      <RootFooter />
    </RootLayout>
  );
}
