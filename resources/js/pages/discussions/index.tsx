import DiscussionDetail from '@/components/forum-discussion-detail';
import DiscussionList from '@/components/forum-discussion-list';
import { ForumNewDiscussion } from '@/components/forum-new-discussion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Pagination } from '@/components/ui/pagination';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import RootLayout from '@/layouts/root-layout';
import type { Discussion, PaginatedData, SharedData } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { PlusIcon } from 'lucide-react';
import { useMemo, useState } from 'react';

const ITEMS_PER_PAGE = 10;

export default function ForumPage() {
  const { discussions, auth } = usePage<
    SharedData & { discussions: PaginatedData<Discussion> }
  >().props;

  // State for UI controls
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedDiscussionId, setSelectedDiscussionId] = useState<
    number | null
  >(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const allDiscussions = discussions.data;

  // Filter discussions based on search query and category
  const filteredDiscussions = useMemo(() => {
    return allDiscussions.filter((discussion) => {
      const matchesSearch =
        searchQuery === '' ||
        discussion.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        discussion.content.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        activeCategory === 'all' || discussion.category === activeCategory;

      return matchesSearch && matchesCategory;
    });
  }, [allDiscussions, searchQuery, activeCategory]);

  // Calculate pagination for filtered results
  const totalPages = Math.ceil(filteredDiscussions.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedDiscussions = filteredDiscussions.slice(startIndex, endIndex);

  // Get the selected discussion from the filtered list
  const selectedDiscussion = selectedDiscussionId
    ? discussions.data.find((d) => d.id === selectedDiscussionId)
    : null;

  // Handle discussion selection
  const handleSelectDiscussion = (id: number) => {
    setSelectedDiscussionId(id);
  };

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top a discussion list
    const discussionListElement = document.querySelector(
      '.discussion-list-container',
    );
    if (discussionListElement) {
      discussionListElement.scrollTop = 0;
    }
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  const handleCategoryChange = (value: string) => {
    setActiveCategory(value);
    setCurrentPage(1);
  };

  return (
    <RootLayout>
      <div className="container mx-auto px-4 py-6 pt-32 md:px-6">
        <Head title="Discussion Forum" />
        <div className="bg-background sticky top-[4.7rem] z-10 mb-8 flex flex-col space-y-4 pb-4 md:flex-row md:items-center md:justify-between md:space-y-0">
          <div>
            <h1 className="text-3xl font-bold">Discussion Forum</h1>
            <p className="text-muted-foreground">
              Join the conversation with fellow students and instructors
            </p>
          </div>
          <Button
            className="w-full cursor-pointer md:w-auto"
            onClick={() => setSelectedDiscussionId(null)}
          >
            <PlusIcon className="mr-2 h-4 w-4" />
            New Discussion
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 xl:grid-cols-4">
          {/* Discussion List - Takes full width on mobile, 1/3 on desktop */}
          <div
            className={`${selectedDiscussion ? 'hidden lg:block' : ''} lg:col-span-1`}
          >
            <div className="mb-4 flex items-center gap-2">
              <Input
                placeholder="Search discussions..."
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="w-full"
              />
            </div>

            <Tabs
              defaultValue={activeCategory}
              className="mb-6"
              onValueChange={handleCategoryChange}
            >
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="general">General</TabsTrigger>
                <TabsTrigger value="question">Q&A</TabsTrigger>
                <TabsTrigger value="resource">Resources</TabsTrigger>
              </TabsList>
            </Tabs>

            <DiscussionList
              discussions={paginatedDiscussions}
              selectedDiscussionId={selectedDiscussionId}
              onSelectDiscussion={handleSelectDiscussion}
            />

            {/* Pagination */}
            <div className="mt-6 flex justify-center">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          </div>

          {/* Discussion Detail - Takes full width on mobile, 2/3 on desktop */}
          <div
            className={`${!selectedDiscussion ? 'hidden lg:block' : ''} lg:col-span-2 xl:col-span-3`}
          >
            {selectedDiscussion ? (
              <div className="relative">
                <div className="mb-4 lg:hidden">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedDiscussionId(null)}
                    className="mb-4"
                  >
                    ← Back to Discussions
                  </Button>
                </div>
                <DiscussionDetail
                  discussion={selectedDiscussion}
                  currentUser={auth.user}
                />
              </div>
            ) : (
              <ForumNewDiscussion />
            )}
          </div>
        </div>
      </div>
    </RootLayout>
  );
}
