'use client';

import MarkdownViewer from '@/components/markdown-viewer';
import { Button } from '@/components/ui/button';
import VideoPlayer from '@/components/video-player';
import RootSidebarLayout from '@/layouts/root-sidebar-layout';
import type { Lesson, SharedData } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';

export default function Tutorials() {
  const { lesson } = usePage<SharedData & { lesson: { data: Lesson } }>().props;
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);

  useEffect(() => {
    if (lesson) {
      setActiveLesson(lesson.data);
    }
  }, [lesson]);

  return (
    <RootSidebarLayout
      activeLesson={activeLesson}
      setActiveLesson={setActiveLesson}
    >
      <Head title="Tutorials" />
      <div className="flex flex-1 flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto p-6">
          {activeLesson?.video && (
            <VideoPlayer url={activeLesson.video} width="100%" />
          )}

          <div className="prose prose-lg dark:prose-invert max-w-none">
            {activeLesson?.content ? (
              <MarkdownViewer content={activeLesson.content} />
            ) : (
              <p>Select a lesson to view its content.</p>
            )}
          </div>

          <div className="mt-10 flex h-10 w-full items-center justify-between">
            <Button>Previous</Button>
            <Button>Next</Button>
          </div>
        </div>
      </div>
    </RootSidebarLayout>
  );
}
