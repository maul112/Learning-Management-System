import { Card, Carousel } from '@/components/ui/apple-cards-carousel';
import { useData } from '@/contexts/DataContext';
import { Academic, Course } from '@/types';
import { motion } from 'framer-motion';
import { Award, Book, ChartNoAxesColumnIncreasing, Users2 } from 'lucide-react';
import { useCallback, useState } from 'react';
import { RootContent } from './root-content';
import { Separator } from './ui/separator';

export function CardsCarousel() {
  const data = useData();
  const [isActive, setIsActive] = useState<string>('Android Developer');

  const cards = data?.data?.academics.data.map((academic, index) => (
    <Card
      key={academic.title}
      academic={academic}
      index={index}
      isActive={isActive}
      setIsActive={setIsActive}
    />
  ));

  const courseCards = data?.data?.academics.data
    .find((academic) => isActive === academic.title)
    ?.courses.map((course, index) => (
      <CardCourse key={index} course={course} />
    ));

  const updateAcademicDetails = useCallback(
    (col: keyof Academic) => {
      const foundItem = data?.data?.academics.data.find(
        (academic) => academic.title === isActive,
      );
      if (col === 'courses') {
        return foundItem ? (foundItem[col] as Course[]) : [];
      } else {
        return foundItem ? foundItem[col] : '';
      }
    },
    [data?.data?.academics, isActive],
  );

  return (
    <RootContent>
      <section className="h-full w-full px-10">
        <Carousel items={cards!} />
      </section>
      <section className="bg-muted mx-10 mb-10 flex flex-col justify-between rounded-xl py-10 lg:flex-row">
        <div className="w-full px-7 pt-28 lg:w-[30rem]">
          <h2 className="mb-3 text-3xl font-semibold">
            {updateAcademicDetails('title').toLocaleString()}
          </h2>
          <p className="text-muted-foreground mb-3 flex gap-2 text-sm">
            <Book className="h-4 w-4" />
            {(updateAcademicDetails('courses') as Course[]).length} Kelas
          </p>
          {/* <p className="text-muted-foreground mb-3 flex gap-2 text-sm">
            <Users className="h-4 w-4" />
            {updateDetails('users')} siswa belajar di learning path ini
          </p> */}
          <Separator className="bg-muted-foreground mb-5" />
          <p className="text-muted-foreground leading-relaxed">
            {updateAcademicDetails('description').toLocaleString()}
          </p>
        </div>
        <div className="h-[34rem] w-full overflow-hidden lg:w-2xl">
          <Carousel items={courseCards!} />
        </div>
      </section>
    </RootContent>
  );
}

function CardCourse({ course }: { course: Course }) {
  // const updateCourses()

  return (
    <motion.div
      whileHover={{
        y: -130,
        transition: {
          type: 'spring',
          stiffness: 200,
          damping: 20,
          duration: 0.3,
          ease: 'easeInOut',
        },
      }}
      className="bg-accent-foreground w-74 overflow-hidden rounded-xl"
    >
      <div className="bg-muted-foreground h-56 w-full">
        <img
          className="h-full w-full object-cover"
          src={`/storage/${course.image}`}
          alt={course.title}
        />
      </div>
      <div className="p-4">
        <p className="text-muted mb-3 flex items-center gap-2 text-sm font-semibold">
          <ChartNoAxesColumnIncreasing className="h-4 w-4" />
          Langkah {course.order}
        </p>
        <h3 className="text-md text-muted mb-7 font-semibold">
          {course.title}
        </h3>
        {/* <p className="text-muted mb-3 flex items-center gap-2 text-sm">
          <Star className="h-4 w-4" fill="yellow" />
          {course.ratings}
        </p> */}
        <p className="text-muted mb-7 flex items-center gap-2 text-sm">
          <Award className="h-4 w-4 text-blue-500" />
          Level {course.difficulty}
        </p>
        <p className="text-muted mb-7 flex items-center gap-2 text-sm">
          <Book className="h-4 w-4" />
          {course.description}
        </p>
        <div className="mb-2 flex items-center gap-5">
          <p className="text-muted flex items-center gap-2 text-sm">
            <Book className="h-4 w-4" />
            {course.duration}
          </p>
          <p className="text-muted flex items-center gap-2 text-sm">
            <Users2 className="h-4 w-4" />
            {course.users.length}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
