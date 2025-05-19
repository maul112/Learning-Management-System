'use client';

import MarkdownViewer from '@/components/markdown-viewer';
import RootSidebarLayout from '@/layouts/root-sidebar-layout';
import type { Course, Lesson, Module, SharedData } from '@/types';
import { usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';

export default function Tutorials() {
  const { module } = usePage<
    SharedData & { course: { data: Course }; module: { data: Module } }
  >().props;
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);

  useEffect(() => {
    if (module.data.lessons && module.data.lessons.length > 0) {
      setActiveLesson(module.data.lessons[0]);
    }
  }, [module]);

  return (
    <RootSidebarLayout activeLesson={activeLesson} setActiveLesson={setActiveLesson}>
      <div className="flex flex-1 flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto">
          <div className="mx-auto max-w-4xl p-6">
            {activeLesson?.video && (
              <div className="mb-8 aspect-video overflow-hidden rounded-lg bg-black shadow-md">
                <iframe
                  src={activeLesson.video}
                  className="h-full w-full"
                  allowFullScreen
                  title={activeLesson.title}
                ></iframe>
              </div>
            )}

            <div className="prose prose-lg dark:prose-invert max-w-none">
              {activeLesson?.content ? (
                <MarkdownViewer content={activeLesson.content} />
              ) : (
                <p>Select a lesson to view its content.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </RootSidebarLayout>
  );
}
