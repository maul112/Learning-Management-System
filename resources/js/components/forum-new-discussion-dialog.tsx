'use client';

import type React from 'react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import type { Discussion } from '@/types';
import { useState } from 'react';

interface ForumNewDiscussionDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (
    discussion: Omit<Discussion, 'id' | 'createdAt' | 'updatedAt' | 'replies'>,
  ) => void;
}

export default function ForumNewDiscussionDialog({
  isOpen,
  onClose,
  onSubmit,
}: ForumNewDiscussionDialogProps) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('general');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) return;

    setIsSubmitting(true);

    // Simulate network delay
    setTimeout(() => {
      onSubmit({
        title,
        content,
        category,
        user: {
          id: 'current-user',
          name: 'You',
          avatar: '/placeholder.svg?height=40&width=40',
        },
        likes: 0,
        isSolved: false,
      });

      // Reset form
      setTitle('');
      setContent('');
      setCategory('general');
      setIsSubmitting(false);
    }, 500);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Create New Discussion</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              placeholder="Enter a descriptive title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select value={category} onValueChange={setCategory} required>
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="general">General Discussion</SelectItem>
                <SelectItem value="question">Question</SelectItem>
                <SelectItem value="resource">Resource Sharing</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Content</Label>
            <Textarea
              id="content"
              placeholder="Write your discussion content here... (Markdown supported)"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={8}
              required
            />
            <p className="text-muted-foreground text-xs">
              Markdown formatting is supported. You can use **bold**, *italic*,
              lists, and more.
            </p>
          </div>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={!title.trim() || !content.trim() || isSubmitting}
            >
              {isSubmitting ? 'Creating...' : 'Create Discussion'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
