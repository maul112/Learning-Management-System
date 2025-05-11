import { CourseDetail } from '@/components/course-detail';
import { CourseGetIn } from '@/components/course-get-in';
import { CourseJumbotron } from '@/components/course-jumbotron';
import { RootFooter } from '@/components/root-footer';
import { DataProvider } from '@/contexts/DataContext';
import RootLayout from '@/layouts/root-layout';
import { Course as CourseType } from '@/types';
import { Head } from '@inertiajs/react';

export default function Course({
  course,
}: {
  course: {
    data: CourseType;
  };
}) {
  const initialData = {
    course,
  };

  return (
    <DataProvider initialData={initialData}>
      <RootLayout>
        <Head title={course.data.title} />
        <CourseJumbotron course={course} />
        <CourseGetIn />
        <CourseDetail />
        <RootFooter />
      </RootLayout>
    </DataProvider>
  );
}
