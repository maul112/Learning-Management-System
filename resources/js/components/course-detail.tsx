import { useInitials } from '@/hooks/use-initials';
import { Course, SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { TabsList } from '@radix-ui/react-tabs';
import { motion } from 'framer-motion';
import { ArrowUpRight, StarIcon } from 'lucide-react';
import { useState } from 'react';
import MarkdownViewer from './markdown-viewer';
import { RootContent } from './root-content';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card';
import { Separator } from './ui/separator';
import { ShineBorder } from './ui/shine-border';
import { Tabs, TabsContent, TabsTrigger } from './ui/tabs';

const tabTriggers = [
  {
    value: 'description',
    label: 'Deskripsi',
  },
  {
    value: 'testimoni',
    label: 'Testimoni',
  },
  {
    value: 'faq',
    label: 'FAQ',
  },
];

export function CourseDetail() {
  const getInitials = useInitials();
  const { course } = usePage<SharedData & { course: { data: Course } }>().props;
  const [activeTab, setActiveTab] = useState<string>('testimoni');
  const courseFilteredRatings = course.data.ratings.filter(
    (rating) => rating.rating == 5,
  );

  return (
    <nav className="mt-10">
      <RootContent>
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          defaultValue="testimoni"
        >
          <TabsList className="bg-background">
            {tabTriggers.map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className="relative h-10 w-28 cursor-pointer"
              >
                {tab.label}
                {activeTab === tab.value && (
                  <motion.div
                    className="bg-primary absolute right-0 -bottom-1 left-0 h-0.5"
                    layoutId="activeTabIndicator"
                  />
                )}
              </TabsTrigger>
            ))}
          </TabsList>
          <Separator className="my-5" />
          <TabsContent value="description" className="w-1/2">
            <h2 className="text-2xl font-semibold">Deskripsi</h2>
            <MarkdownViewer content={course.data.description} />
          </TabsContent>
          <TabsContent value="testimoni">
            <div className="flex flex-col items-center px-3">
              <h2 className="text-2xl font-semibold">Testimoni Siswa</h2>
              <p className="text-muted-foreground mt-2 text-center text-sm">
                Ribuan siswa sukses belajar di NextLMS, Apa kata mereka? Berikut
                adalah testimoni asli mereka.
              </p>
            </div>
            <div className="mt-10 grid grid-cols-1 gap-2 px-3 lg:grid-cols-2">
              {Array.from({ length: 2 }).map((_, i) => (
                <Card key={courseFilteredRatings[i].id} className="relative">
                  <CardHeader>
                    <div className="flex gap-3">
                      <Avatar className="h-16 w-16">
                        <AvatarImage
                          src={
                            '/storage/' + courseFilteredRatings[i].student.image
                          }
                          alt={courseFilteredRatings[i].student.name}
                        />
                        <AvatarFallback>
                          {getInitials(courseFilteredRatings[i].student.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="mt-2">
                          {courseFilteredRatings[i].student.name}
                        </CardTitle>
                        <CardDescription className="mt-2">
                          <span className="text-muted-foreground flex gap-2">
                            {Array.from({ length: 5 }, (_, k) => (
                              <StarIcon
                                key={k}
                                className="h-4 w-4 text-amber-400"
                                fill={
                                  k < courseFilteredRatings[i].rating
                                    ? 'currentColor'
                                    : 'none'
                                }
                              />
                            ))}
                          </span>
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>{courseFilteredRatings[i].comment}</CardContent>
                  <ShineBorder shineColor={['#A07CFE', '#FE8FB5', '#FFBE7B']} />
                </Card>
              ))}
            </div>
            <div className="mt-5 flex items-center justify-end">
              <Button variant="link" className="group cursor-pointer">
                <Link href={`/learning-paths/${course.data.academic.id}`}>
                  Lihat semua testimoni
                </Link>
                <ArrowUpRight className="transition-all duration-100 group-hover:translate-x-[2px] group-hover:-translate-y-[2px]" />
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </RootContent>
    </nav>
  );
}
