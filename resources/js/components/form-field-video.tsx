'use client';

import type React from 'react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { Loader2, VideoIcon, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

interface VideoPreviewInputProps {
  htmlFor: string;
  label: string;
  currentVideoUrl?: string | null;
  onChange: (file: File | null) => void;
  error?: string;
  className?: string;
}

export function VideoPreviewInput({
  htmlFor,
  label,
  currentVideoUrl,
  onChange,
  error,
  className,
}: VideoPreviewInputProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [, setUploadStatus] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const formRef = useRef<HTMLFormElement | null>(null);

  // Set initial preview if there's a current video
  useEffect(() => {
    if (currentVideoUrl) {
      setPreview(currentVideoUrl);
    }
  }, [currentVideoUrl]);

  // Store reference to parent form
  useEffect(() => {
    if (fileInputRef.current) {
      formRef.current = fileInputRef.current.closest('form');
    }
  }, []);

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      setFile(file);
    } else {
      setFile(null);
    }
  };

  const handleUploadClick = (file: File) => {
    if (!file) return;

    setIsUploading(true);
    setUploadStatus(true);

    // Simulate upload with 3 second delay
    setTimeout(() => {
      // Create a local object URL for the file
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);
      onChange(file);
      setIsUploading(false);
      setUploadStatus(false);

      // Clean up the object URL when no longer needed
      return () => {
        if (objectUrl) URL.revokeObjectURL(objectUrl);
      };
    }, 3000);
  };

  // Handle drag events
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files?.[0] || null;
    if (file && file.type.startsWith('video/')) {
      setFile(file);
      // Don't immediately set preview or call onChange here
      // Let the user click "Upload Video" first

      // Update the file input value for form submission
      if (fileInputRef.current) {
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(file);
        fileInputRef.current.files = dataTransfer.files;
      }
    }
  };

  // Clear the selected video
  const clearVideo = () => {
    setPreview(null);
    setFile(null);
    setUploadStatus(false);
    onChange(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Trigger file input click
  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  // Handle video URL format for server-stored videos
  useEffect(() => {
    if (currentVideoUrl && videoRef.current) {
      // Make sure the video element loads the new source
      videoRef.current.load();
    }
  }, [currentVideoUrl, preview]);

  return (
    <Card className={cn('space-y-2', error && 'border-red-500', className)}>
      <CardHeader>
        <CardTitle>
          <label
            htmlFor={htmlFor}
            className="flex items-center gap-2 text-xl font-medium"
          >
            {label}
          </label>
        </CardTitle>
        <CardDescription
          className={cn(
            'relative mt-3 flex flex-col items-center justify-center rounded-lg border-2 border-dashed transition-colors',
            isDragging ? 'border-primary bg-primary/5' : 'border-border',
            '.upload-progress-bar { animation: progress 3s linear forwards; } @keyframes progress { 0% { width: 0%; } 100% { width: 100%; }',
          )}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          {/* Preview video with delete button */}
          {preview && (
            <div className="relative w-full">
              <div className="relative mx-auto h-auto max-w-full overflow-hidden rounded-md">
                <video
                  ref={videoRef}
                  controls
                  className="w-full"
                  preload="metadata"
                  onError={(e) => {
                    console.error('Video loading error:', e);
                  }}
                >
                  <source src={preview} type={file?.type || 'video/mp4'} />
                  Your browser does not support the video tag.
                </video>
                <Button
                  type="button"
                  size="icon"
                  variant="destructive"
                  className="absolute top-2 right-2 h-6 w-6"
                  onClick={clearVideo}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          {/* Initial state - no video selected */}
          {!preview && !file && (
            <div className="flex flex-col items-center justify-center py-4">
              <div className="bg-muted mb-3 rounded-full p-3">
                <VideoIcon className="text-muted-foreground h-6 w-6" />
              </div>
              <p className="mb-1 text-sm font-medium">
                Drag and drop your video here or click to browse
              </p>
              <p className="text-muted-foreground text-xs">
                Supports MP4, WebM, MOV up to 100MB
              </p>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="mt-4"
                onClick={triggerFileInput}
              >
                Select Video
              </Button>
            </div>
          )}

          {/* File selected but not yet uploaded */}
          {!preview && file && !isUploading && (
            <div className="flex flex-col items-center justify-center py-4">
              <div className="bg-muted mb-3 rounded-full p-3">
                <VideoIcon className="text-muted-foreground h-6 w-6" />
              </div>
              <p className="text-muted-foreground mt-1 flex text-xs">
                Selected: {file.name} ({(file.size / 1024 / 1024).toFixed(2)}{' '}
                MB)
              </p>
              <div className="mt-4 flex gap-2">
                <Button
                  type="button"
                  size="sm"
                  onClick={() => handleUploadClick(file)}
                >
                  Upload Video
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setFile(null);
                    if (fileInputRef.current) {
                      fileInputRef.current.value = '';
                    }
                  }}
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}

          {/* Loading state with progress bar */}
          {isUploading && (
            <div className="flex w-full flex-col items-center justify-center py-8">
              <div className="mb-4 flex items-center justify-center">
                <Loader2 className="text-primary h-6 w-6 animate-spin" />
              </div>
              <p className="mb-2 text-sm font-medium">Uploading video...</p>
              <div className="bg-muted relative h-2 w-3/4 overflow-hidden rounded-full">
                <motion.div
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  className="h-full bg-gradient-to-l from-[#9c40ff] to-[#ffaa40]"
                />
              </div>
            </div>
          )}

          <input
            id={htmlFor}
            ref={fileInputRef}
            type="file"
            accept="video/*"
            className="hidden"
            onChange={handleFileChange}
          />
        </CardDescription>

        {error && <p className="text-destructive text-xs">{error}</p>}
      </CardHeader>
    </Card>
  );
}
