'use client';

import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import type { Discussion } from '@/types';
import { formatDistanceToNow } from 'date-fns';
import { CheckCircle2Icon, MessageCircleIcon } from 'lucide-react';
import UserAvatar from './forum-user-avatar';

interface ForumDiscussionListProps {
  discussions: Discussion[];
  selectedDiscussionId: string | null;
  onSelectDiscussion: (id: string) => void;
}

export default function ForumDiscussionList({
  discussions,
  selectedDiscussionId,
  onSelectDiscussion,
}: ForumDiscussionListProps) {
  if (discussions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
        <p className="text-muted-foreground text-sm">No discussions found</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {discussions.map((discussion) => (
        <div
          key={discussion.id}
          className={cn(
            'hover:bg-muted/50 cursor-pointer rounded-lg border p-4 transition-colors',
            selectedDiscussionId === discussion.id &&
              'border-primary bg-muted/50',
          )}
          onClick={() => onSelectDiscussion(discussion.id)}
        >
          <div className="mb-2 flex items-start justify-between">
            <div className="flex items-center gap-2">
              <UserAvatar user={discussion.user} size="sm" />
              <span className="text-sm font-medium">
                {discussion.user.name}
              </span>
            </div>
            <Badge variant={getCategoryVariant(discussion.category)}>
              {getCategoryLabel(discussion.category)}
            </Badge>
          </div>
          <h3 className="mb-1 line-clamp-2 font-semibold">
            {discussion.title}
          </h3>
          <p className="text-muted-foreground line-clamp-2 text-sm">
            {discussion.content}
          </p>
          <div className="text-muted-foreground mt-2 flex items-center justify-between text-xs">
            <span>
              {formatDistanceToNow(new Date(discussion.createdAt), {
                addSuffix: true,
              })}
            </span>
            <div className="flex items-center gap-3">
              <div className="flex items-center">
                <MessageCircleIcon className="mr-1 h-3.5 w-3.5" />
                {discussion.replies.length}
              </div>
              {discussion.isSolved && (
                <CheckCircle2Icon className="h-3.5 w-3.5 text-green-500" />
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function getCategoryLabel(category: string): string {
  switch (category) {
    case 'general':
      return 'General';
    case 'question':
      return 'Question';
    case 'resource':
      return 'Resource';
    default:
      return category;
  }
}

function getCategoryVariant(
  category: string,
): 'default' | 'secondary' | 'outline' {
  switch (category) {
    case 'general':
      return 'default';
    case 'question':
      return 'secondary';
    case 'resource':
      return 'outline';
    default:
      return 'default';
  }
}
