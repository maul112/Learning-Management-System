'use client';

import DiscussionList from '@/components/forum-discussion-list';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Pagination } from '@/components/ui/pagination';
import {
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from '@/components/ui/sidebar';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import type { Discussion } from '@/types';
import { PlusIcon } from 'lucide-react';

interface ForumSidebarProps {
  discussions: Discussion[];
  selectedDiscussionId: number | null;
  onSelectDiscussion: (id: number) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  activeCategory: string;
  setActiveCategory: (category: string) => void;
  onNewDiscussion: () => void;
  currentPage: number;
  lastPage: number;
  onPageChange: (page: number) => void;
}

export default function ForumSidebar({
  discussions,
  selectedDiscussionId,
  onSelectDiscussion,
  searchQuery,
  setSearchQuery,
  activeCategory,
  setActiveCategory,
  onNewDiscussion,
  currentPage,
  lastPage,
  onPageChange,
}: ForumSidebarProps) {
  return (
    <>
      <SidebarHeader className="border-b p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold">Discussion Forum</h1>
          <Button onClick={onNewDiscussion} size="sm">
            <PlusIcon className="h-4 w-4" />
          </Button>
        </div>
        <div className="mt-3">
          <Input
            placeholder="Search discussions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full"
          />
        </div>
      </SidebarHeader>

      <SidebarContent>
        <div className="p-4">
          <Tabs
            defaultValue={activeCategory}
            className="mb-4"
            onValueChange={setActiveCategory}
          >
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="question">Q&A</TabsTrigger>
              <TabsTrigger value="resource">Resources</TabsTrigger>
            </TabsList>
          </Tabs>

          <DiscussionList
            discussions={discussions}
            selectedDiscussionId={selectedDiscussionId}
            onSelectDiscussion={onSelectDiscussion}
          />
        </div>
      </SidebarContent>

      {lastPage > 1 && (
        <SidebarFooter className="border-t p-4">
          <div className="flex justify-center">
            <Pagination
              currentPage={currentPage}
              totalPages={lastPage}
              onPageChange={onPageChange}
            />
          </div>
        </SidebarFooter>
      )}
    </>
  );
}
