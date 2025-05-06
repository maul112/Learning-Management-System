import { useData } from '@/contexts/DataContext';
import { Link, usePage } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Tabs, TabsList, TabsTrigger } from './ui/tabs';

export function LearningPathTabs() {
  const data = useData();
  const { props } = usePage();
  const academicId = props.academic_id;
  const [isActive, setIsActive] = useState<number | undefined>(
    academicId as number,
  );

  return (
    <nav className="p-5 pt-20">
      <Tabs
        defaultValue={String(isActive)}
        value={String(isActive)}
        onValueChange={(value) => setIsActive(Number(value))}
      >
        <TabsList className="bg-background">
          {data?.data?.academics!.data.map((academic) => (
            <TabsTrigger
              className="relative h-10 w-56"
              key={academic.id}
              value={String(academic.id)}
            >
              <Link href={route('learning-path.show', academic.id)}>
                {academic.title}
              </Link>
              <motion.div
                className="bg-primary absolute -bottom-1 left-0 h-0.5"
                layoutId="activeTabIndicator"
                layout
              />
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </nav>
  );
}
