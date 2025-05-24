import React from 'react';
import InputError from './input-error';
import BlockNoteMarkdownEditor from './markdown-editor-blocknote';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { useForm } from '@inertiajs/react';
import { toast } from 'sonner';

export function ForumNewDiscussion() {
  const { data, setData, post, processing, errors, reset } = useForm({
    title: '',
    content: '',
    category: 'general',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    post(route('discussions.store'), {
      onSuccess: () => {
        reset();
        toast.success('Discussion created successfully');
      },
    });
  };

  return (
    <React.Fragment>
      <div className="mb-4">
        <h1 className="text-3xl font-bold">Create New Discussion</h1>
        <p className="text-muted-foreground">
          Start a new conversation with the community
        </p>
      </div>

      {/* Form */}
      <div>
        <Card>
          <CardHeader>
            <CardTitle>Discussion Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    placeholder="Enter a descriptive title"
                    value={data.title}
                    onChange={(e) => setData('title', e.target.value)}
                    required
                    className={errors.title ? 'border-red-500' : ''}
                  />
                  <InputError message={errors.title} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={data.category}
                    onValueChange={(value) => setData('category', value)}
                    required
                  >
                    <SelectTrigger
                      className={errors.category ? 'border-red-500' : ''}
                    >
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="general">
                        General Discussion
                      </SelectItem>
                      <SelectItem value="question">Question</SelectItem>
                      <SelectItem value="resource">Resource Sharing</SelectItem>
                    </SelectContent>
                  </Select>
                  <InputError message={errors.category} />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="content">Content</Label>
                <div className="min-h-[400px]">
                  <BlockNoteMarkdownEditor
                    onChange={(value) => setData('content', value)}
                  />
                </div>
                <InputError message={errors.content} />
              </div>

              <div className="flex justify-end gap-4 border-t pt-6">
                <Button
                  type="submit"
                  disabled={
                    !data.title.trim() || !data.content.trim() || processing
                  }
                >
                  {processing ? 'Creating...' : 'Create Discussion'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>

      {/* Tips Section */}
      <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">
              Tips for Creating Great Discussions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-1 gap-4 text-sm md:grid-cols-2">
              <div>
                <h4 className="mb-2 font-medium">Writing Tips:</h4>
                <ul className="text-muted-foreground space-y-1">
                  <li>• Use a clear, descriptive title</li>
                  <li>• Provide context and background</li>
                  <li>• Be specific about what you're asking</li>
                  <li>• Use proper formatting for readability</li>
                </ul>
              </div>
              <div>
                <h4 className="mb-2 font-medium">Markdown Support:</h4>
                <ul className="text-muted-foreground space-y-1">
                  <li>• **Bold text** for emphasis</li>
                  <li>• `Code snippets` for technical content</li>
                  <li>• {'>'} Blockquotes for important notes</li>
                  <li>• Lists and links are supported</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </React.Fragment>
  );
}
