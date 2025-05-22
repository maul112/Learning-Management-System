'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import type { Discussion } from '@/types';
import { PlusIcon, SearchIcon } from 'lucide-react';
import { useState } from 'react';
import DiscussionDetail from './forum-discussion-detail';
import DiscussionList from './forum-discussion-list';
import NewDiscussionDialog from './forum-new-discussion-dialog';
import { FORUM_SAMPLE_DISCUSSIONS } from './forum-sample-data';

export default function ForumDiscussion() {
  const [discussions, setDiscussions] = useState<Discussion[]>(
    FORUM_SAMPLE_DISCUSSIONS,
  );
  const [selectedDiscussionId, setSelectedDiscussionId] = useState<
    string | null
  >(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isNewDiscussionOpen, setIsNewDiscussionOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');

  const selectedDiscussion = discussions.find(
    (d) => d.id === selectedDiscussionId,
  );

  const filteredDiscussions = discussions.filter((discussion) => {
    const matchesSearch =
      discussion.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      discussion.content.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      activeCategory === 'all' || discussion.category === activeCategory;

    return matchesSearch && matchesCategory;
  });

  const handleAddDiscussion = (
    newDiscussion: Omit<
      Discussion,
      'id' | 'createdAt' | 'updatedAt' | 'replies'
    >,
  ) => {
    const discussion: Discussion = {
      id: `discussion-${discussions.length + 1}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      replies: [],
      ...newDiscussion,
    };

    setDiscussions([discussion, ...discussions]);
    setSelectedDiscussionId(discussion.id);
    setIsNewDiscussionOpen(false);
  };

  const handleAddReply = (
    discussionId: string,
    content: string,
    userId = 'current-user',
  ) => {
    setDiscussions(
      discussions.map((discussion) => {
        if (discussion.id === discussionId) {
          return {
            ...discussion,
            replies: [
              ...discussion.replies,
              {
                id: discussion.replies.length + 1,
                content,
                userId,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                likes: 0,
              },
            ],
            updatedAt: new Date().toISOString(),
          };
        }
        return discussion;
      }),
    );
  };

  return (
    <div className="container mx-auto px-4 py-6 md:px-6">
      <div className="mb-8 flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold">Discussion Forum</h1>
          <p className="text-muted-foreground">
            Join the conversation with fellow students and instructors
          </p>
        </div>
        <Button
          onClick={() => setIsNewDiscussionOpen(true)}
          className="w-full md:w-auto"
        >
          <PlusIcon className="mr-2 h-4 w-4" />
          New Discussion
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-4">
        <div className="md:col-span-1">
          <div className="mb-4 flex items-center gap-2">
            <Input
              placeholder="Search discussions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full"
              prefix={<SearchIcon className="text-muted-foreground h-4 w-4" />}
            />
          </div>

          <Tabs
            defaultValue="all"
            className="mb-6"
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
            discussions={filteredDiscussions}
            selectedDiscussionId={selectedDiscussionId}
            onSelectDiscussion={setSelectedDiscussionId}
          />
        </div>

        <div className="md:col-span-2 lg:col-span-3">
          {selectedDiscussion ? (
            <DiscussionDetail
              discussion={selectedDiscussion}
              onAddReply={handleAddReply}
            />
          ) : (
            <div className="flex h-[400px] flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
              <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
                <h3 className="mt-4 text-lg font-semibold">
                  No discussion selected
                </h3>
                <p className="text-muted-foreground mt-2 mb-4 text-sm">
                  Select a discussion from the list or start a new one to join
                  the conversation.
                </p>
                <Button onClick={() => setIsNewDiscussionOpen(true)}>
                  <PlusIcon className="mr-2 h-4 w-4" />
                  New Discussion
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      <NewDiscussionDialog
        isOpen={isNewDiscussionOpen}
        onClose={() => setIsNewDiscussionOpen(false)}
        onSubmit={handleAddDiscussion}
      />
    </div>
  );
}
