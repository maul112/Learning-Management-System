'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { formatDistanceToNow } from 'date-fns';
import {
  CheckCircle2Icon,
  MessageCircleIcon,
  ThumbsUpIcon,
} from 'lucide-react';
import { useState } from 'react';
import UserAvatar from './forum-user-avatar';
import LessonMarkdownDisplay from './markdown-viewer';
import type { Discussion } from '@/types';

interface ForumDiscussionDetailProps {
  discussion: Discussion;
  onAddReply: (discussionId: string, content: string) => void;
}

export default function ForumDiscussionDetail({
  discussion,
  onAddReply,
}: ForumDiscussionDetailProps) {
  const [replyContent, setReplyContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitReply = () => {
    if (!replyContent.trim()) return;

    setIsSubmitting(true);

    // Simulate network delay
    setTimeout(() => {
      onAddReply(discussion.id, replyContent);
      setReplyContent('');
      setIsSubmitting(false);
    }, 500);
  };

  return (
    <div className="rounded-lg border">
      <div className="p-6">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <UserAvatar user={discussion.user} />
            <div>
              <div className="font-medium">{discussion.user.name}</div>
              <div className="text-muted-foreground text-xs">
                Posted{' '}
                {formatDistanceToNow(new Date(discussion.createdAt), {
                  addSuffix: true,
                })}
              </div>
            </div>
          </div>
          <Badge variant={getCategoryVariant(discussion.category)}>
            {getCategoryLabel(discussion.category)}
          </Badge>
        </div>

        <h1 className="mb-4 text-2xl font-bold">{discussion.title}</h1>

        <div className="prose dark:prose-invert max-w-none">
          <LessonMarkdownDisplay content={discussion.content} />
        </div>

        <div className="mt-6 flex items-center gap-4">
          <Button variant="outline" size="sm" className="gap-1">
            <ThumbsUpIcon className="h-4 w-4" />
            Helpful ({discussion.likes})
          </Button>
          {discussion.isSolved ? (
            <Badge
              variant="outline"
              className="gap-1 border-green-500 text-green-500"
            >
              <CheckCircle2Icon className="h-4 w-4" />
              Solved
            </Badge>
          ) : null}
        </div>
      </div>

      <Separator />

      <div className="p-6">
        <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold">
          <MessageCircleIcon className="h-5 w-5" />
          Replies ({discussion.replies.length})
        </h2>

        {discussion.replies.length > 0 ? (
          <div className="space-y-6">
            {discussion.replies.map((reply) => (
              <div key={reply.id} className="bg-muted/40 rounded-lg p-4">
                <div className="mb-2 flex items-center gap-3">
                  <UserAvatar user={getUserById(reply.userId)} size="sm" />
                  <div>
                    <div className="font-medium">
                      {getUserById(reply.userId).name}
                    </div>
                    <div className="text-muted-foreground text-xs">
                      {formatDistanceToNow(new Date(reply.createdAt), {
                        addSuffix: true,
                      })}
                    </div>
                  </div>
                </div>
                <div className="mt-2 text-sm">
                  <LessonMarkdownDisplay content={reply.content} />
                </div>
                <div className="mt-3 flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 gap-1 text-xs"
                  >
                    <ThumbsUpIcon className="h-3.5 w-3.5" />
                    Helpful ({reply.likes})
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-lg border border-dashed p-6 text-center">
            <p className="text-muted-foreground">
              No replies yet. Be the first to reply!
            </p>
          </div>
        )}

        <div className="mt-6">
          <h3 className="mb-2 text-sm font-medium">Your Reply</h3>
          <Textarea
            placeholder="Write your reply here... (Markdown supported)"
            value={replyContent}
            onChange={(e) => setReplyContent(e.target.value)}
            rows={4}
            className="mb-3 resize-none"
          />
          <Button
            onClick={handleSubmitReply}
            disabled={!replyContent.trim() || isSubmitting}
          >
            {isSubmitting ? 'Posting...' : 'Post Reply'}
          </Button>
        </div>
      </div>
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

// Helper function to get user by ID from our sample data
function getUserById(userId: string) {
  const users = {
    'user-1': {
      id: 'user-1',
      name: 'Alex Johnson',
      avatar: '/placeholder.svg?height=40&width=40',
    },
    'user-2': {
      id: 'user-2',
      name: 'Sarah Miller',
      avatar: '/placeholder.svg?height=40&width=40',
    },
    'user-3': {
      id: 'user-3',
      name: 'David Chen',
      avatar: '/placeholder.svg?height=40&width=40',
    },
    'current-user': {
      id: 'current-user',
      name: 'You',
      avatar: '/placeholder.svg?height=40&width=40',
    },
  };

  return (
    users[userId as keyof typeof users] || {
      id: userId,
      name: 'Unknown User',
      avatar: '/placeholder.svg?height=40&width=40',
    }
  );
}
