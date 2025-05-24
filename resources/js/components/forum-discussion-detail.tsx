'use client';

import type React from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import type { Discussion, User } from '@/types';
import { useForm } from '@inertiajs/react';
import { formatDistanceToNow } from 'date-fns';
import {
  AlertCircleIcon,
  CheckCircle2Icon,
  MessageCircleIcon,
  ThumbsUpIcon,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import UserAvatar from './forum-user-avatar';
import InputError from './input-error';
import BlockNoteMarkdownEditor from './markdown-editor-blocknote';
import LessonMarkdownDisplay from './markdown-viewer';
import { Label } from './ui/label';

interface DiscussionDetailProps {
  discussion: Discussion;
  currentUser: User;
}

export default function DiscussionDetail({
  discussion,
  currentUser,
}: DiscussionDetailProps) {
  const [hasError] = useState(false);

  const { data, setData, post, processing, reset, errors } = useForm({
    content: '',
    discussion_thread_id: discussion?.id,
  });

  useEffect(() => {
    console.log(data);
  }, [data])

  const {
    data: resolvedData,
    setData: setResolvedData,
    put: putResolved,
  } = useForm({
    resolved: discussion?.resolved,
  });

  const handleSubmitReply = (e: React.FormEvent) => {
    e.preventDefault();
    post(route('replies.store'), {
      onSuccess: () => {
        reset('content');
      },
      preserveScroll: true,
    });
  };

  const handleToggleResolved = () => {
    setResolvedData('resolved', !resolvedData.resolved);
    putResolved(route('discussions.update', discussion.id), {
      method: 'put',
    });
  };

  const handleLikeDiscussion = () => {
    post(route('discussions.like', discussion.id));
  };

  const handleLikeReply = (replyId: number) => {
    post(route('replies.like', replyId));
  };

  // If there's an error, show an error message
  if (hasError) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border border-red-200 bg-red-50 p-8 text-center dark:border-red-900/30 dark:bg-red-900/10">
        <AlertCircleIcon className="h-12 w-12 text-red-500" />
        <h3 className="mt-4 text-lg font-semibold">Error Loading Discussion</h3>
        <p className="text-muted-foreground mt-2 mb-4 text-sm">
          There was a problem loading this discussion. Please try again later.
        </p>
      </div>
    );
  }

  // Safely check if discussion and its properties exist to prevent errors
  if (!discussion) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
        <p className="text-muted-foreground text-sm">Loading discussion...</p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border">
      <div className="p-4 md:p-6">
        <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <UserAvatar user={discussion.user} />
            <div>
              <div className="font-medium">{discussion.user.name}</div>
              <div className="text-muted-foreground text-xs">
                Posted{' '}
                {formatDistanceToNow(new Date(discussion.created_at), {
                  addSuffix: true,
                })}
              </div>
            </div>
          </div>
          <Badge variant={getCategoryVariant(discussion.category)}>
            {getCategoryLabel(discussion.category)}
          </Badge>
        </div>

        <h1 className="mb-4 text-xl font-bold sm:text-2xl">
          {discussion.title}
        </h1>

        <div className="prose dark:prose-invert max-w-none">
          <LessonMarkdownDisplay content={discussion.content} />
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-4">
          <Button
            variant="outline"
            size="sm"
            className="gap-1"
            onClick={handleLikeDiscussion}
          >
            <ThumbsUpIcon className="h-4 w-4" />
            Helpful ({discussion.likes})
          </Button>

          {/* Only show the resolve button if the user is the author or an admin */}
          {(currentUser.id === discussion.user.id ||
            currentUser.role === 'admin') && (
            <Button
              variant={discussion.resolved ? 'outline' : 'default'}
              size="sm"
              className={cn(
                'gap-1',
                discussion.resolved && 'border-green-500 text-green-500',
              )}
              onClick={handleToggleResolved}
            >
              <CheckCircle2Icon className="h-4 w-4" />
              {discussion.resolved ? 'Resolved' : 'Mark as Resolved'}
            </Button>
          )}
        </div>
      </div>

      <Separator />

      <div className="p-4 md:p-6">
        <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold">
          <MessageCircleIcon className="h-5 w-5" />
          Replies ({discussion.replies?.length || 0})
        </h2>

        {discussion.replies && discussion.replies.length > 0 ? (
          <div className="space-y-6">
            {discussion.replies.map((reply) => (
              <div key={reply.id} className="bg-muted/40 rounded-lg p-4">
                <div className="mb-2 flex items-center gap-3">
                  <UserAvatar user={reply.user} size="sm" />
                  <div>
                    <div className="font-medium">{reply.user.name}</div>
                    <div className="text-muted-foreground text-xs">
                      {formatDistanceToNow(new Date(reply.created_at), {
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
                    onClick={() => handleLikeReply(reply.id)}
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

        <form onSubmit={handleSubmitReply} className="mt-6">
          <div className="grid space-y-2">
            <Label htmlFor="content">Your Reply</Label>
            <BlockNoteMarkdownEditor
              onChange={(value) => setData('content', value)}
            />
            <InputError message={errors.content} />
          </div>
          <Button type="submit" disabled={!data.content.trim() || processing}>
            {processing ? 'Posting...' : 'Post Reply'}
          </Button>
        </form>
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
