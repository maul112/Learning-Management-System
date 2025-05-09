import { useData } from '@/contexts/DataContext';
import { Link, usePage } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Tabs, TabsList, TabsTrigger } from './ui/tabs';

export function LearningPathTabs() {
  const data = useData();
  const { props, url } = usePage();
  const academicId = props.academic_id;
  const [isActive, setIsActive] = useState<string | undefined>(
    url === '/learning-paths' ? 'semua-kelas' : String(academicId),
  );

  return (
    <nav className="overflow-auto p-5 pt-20">
      <Tabs
        defaultValue={String(isActive)}
        value={String(isActive)}
        onValueChange={(value) => setIsActive(String(value))}
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
              {isActive === String(academic.id) && (
                <motion.div
                  layoutId="active-tab"
                  className="bg-primary absolute right-0 bottom-0 left-0 h-px"
                />
              )}
            </TabsTrigger>
          ))}
          <TabsTrigger className="relative h-10 w-56" value="semua-kelas">
            <Link href={route('learning-path.index')}>Semua Kelas</Link>
            {isActive === 'semua-kelas' && (
              <motion.div
                layoutId="active-tab"
                className="bg-primary absolute right-0 bottom-0 left-0 h-px"
              />
            )}
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </nav>
  );
}
