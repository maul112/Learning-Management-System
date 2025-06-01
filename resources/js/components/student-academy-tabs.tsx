import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SharedData, Student } from '@/types';
import { usePage } from '@inertiajs/react';
import { format } from 'date-fns';
import { motion } from 'framer-motion';
import { BookMarked, BookOpen, CheckCircle, GraduationCap } from 'lucide-react';
import { useState } from 'react';

const tabTriggers = [
  {
    value: 'learning',
    label: 'Kelas yang Sedang di Belajar',
  },
  {
    value: 'completed',
    label: 'Kelas yang Sudah Selesai',
  },
];

export function StudentAcademyTabs() {
  const { student } = usePage<SharedData & { student: { data: Student } }>()
    .props;
  const [activeTab, setActiveTab] = useState('learning');


  const courseProgressesOngoing = student.data.course_progresses.filter(
    (progress) => progress.is_completed === 0,
  );

  const courseProgressesCompleted = student.data.course_progresses.filter(
    (progress) => progress.is_completed === 1,
  );

  return (
    <Tabs
      defaultValue="learning"
      className="w-full"
      onValueChange={setActiveTab}
    >
      <div className="relative mb-5">
        <TabsList className="grid w-full grid-cols-2 gap-4 bg-transparent">
          {tabTriggers.map((tab) => (
            <TabsTrigger
              value={tab.value}
              className={`data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=inactive]:bg-muted data-[state=inactive]:hover:bg-muted/80 relative flex items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-medium transition-all`}
            >
              <BookOpen className="h-4 w-4" />
              <span>{tab.label}</span>
              {activeTab === tab.value && (
                <motion.div
                  className="bg-primary absolute right-0 -bottom-1 left-0 h-0.5"
                  layoutId="activeTabIndicator"
                />
              )}
            </TabsTrigger>
          ))}
        </TabsList>
      </div>

      <TabsContent value="learning" className="mt-6 space-y-4">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="bg-card rounded-xl border p-6 shadow-sm"
        >
          <div className="mb-4 flex items-center gap-3">
            <div className="bg-primary/10 rounded-full p-2">
              <GraduationCap className="text-primary h-5 w-5" />
            </div>
            <h3 className="text-lg font-medium">
              Kelas yang Sedang Dipelajari
            </h3>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {courseProgressesOngoing.map((courseProgress) => (
              <div
                key={courseProgress.id}
                className="bg-background rounded-lg border p-4 transition-shadow hover:shadow-md"
              >
                <div className="bg-muted mb-3 h-32 w-full rounded-md"></div>
                <div className="space-y-2">
                  <h4 className="font-medium">{courseProgress.course.title}</h4>
                  <div className="text-muted-foreground flex justify-between text-sm">
                    <span>{Number(courseProgress.progress_percentage)}%</span>
                    <span>
                      {courseProgress.lessons_completed}/
                      {courseProgress.total_lessons} Lesson
                    </span>
                  </div>
                  <div className="bg-muted h-2 w-full rounded-full">
                    <div
                      className="bg-primary h-2 rounded-full"
                      style={{ width: '65%' }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </TabsContent>

      <TabsContent value="completed" className="mt-6 space-y-4">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="bg-card rounded-xl border p-6 shadow-sm"
        >
          <div className="mb-4 flex items-center gap-3">
            <div className="rounded-full bg-green-100 p-2">
              <BookMarked className="h-5 w-5 text-green-600" />
            </div>
            <h3 className="text-lg font-medium">Kelas yang Sudah Selesai</h3>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {courseProgressesCompleted.map((courseProgress) => (
              <div
                key={courseProgress.id}
                className="bg-background rounded-lg border p-4 transition-shadow hover:shadow-md"
              >
                <div className="bg-muted mb-3 h-32 w-full rounded-md"></div>
                <div className="space-y-2">
                  <h4 className="font-medium">{courseProgress.course.title}</h4>
                  <div className="text-muted-foreground flex justify-between text-sm">
                    <span>
                      {format(
                        new Date(courseProgress.completed_at as Date),
                        'yyyy-MM-dd',
                      )}
                    </span>
                    <div className="flex items-center gap-1 text-green-600">
                      <CheckCircle className="h-3 w-3" />
                      <span>Completed</span>
                    </div>
                  </div>
                  <div className="bg-muted h-2 w-full rounded-full">
                    <div className="h-2 w-full rounded-full bg-green-500"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </TabsContent>
    </Tabs>
  );
}
