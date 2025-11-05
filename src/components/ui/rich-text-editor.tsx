"use client";

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { Label } from '@/components/ui/label';
import { apiService } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';

// Dynamically import MDEditor to avoid SSR issues
const MDEditor = dynamic(() => import('@uiw/react-md-editor'), {
  ssr: false,
  loading: () => (
    <div className="min-h-[200px] p-4 border rounded-md bg-gray-50 animate-pulse">
      <div className="h-4 bg-gray-200 rounded mb-2"></div>
      <div className="h-4 bg-gray-200 rounded mb-2 w-3/4"></div>
      <div className="h-4 bg-gray-200 rounded mb-2"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
    </div>
  ),
});

import '@uiw/react-md-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const RichTextEditor = ({ value, onChange, placeholder }: RichTextEditorProps) => {
  const { toast } = useToast();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleImageUpload = async (file: File) => {
    const MAX_MB = 10;
    if (!file.type?.startsWith('image/')) {
      toast({ title: "Invalid file", description: "Please select an image.", variant: "destructive" });
      return '';
    }
    if (file.size > MAX_MB * 1024 * 1024) {
      toast({ title: "Image too large", description: `Max ${MAX_MB} MB allowed.`, variant: "destructive" });
      return '';
    }

    try {
      toast({ title: "Uploading...", description: "Please wait while we upload your image." });

      const { url } = await apiService.uploadImage(file);

      // Return the markdown image syntax
      const imageMarkdown = `![${file.name}](${url})`;
      toast({ title: "Image uploaded successfully" });

      return imageMarkdown;
    } catch (err: any) {
      console.error('Failed to upload image:', err);
      toast({
        title: "Upload failed",
        description: err?.message || 'Failed to upload image.',
        variant: "destructive",
      });
      return '';
    }
  };

  if (!isMounted) {
    return (
      <div className="space-y-2">
        <Label>Content *</Label>
        <div className="min-h-[200px] p-4 border rounded-md bg-gray-50 animate-pulse">
          <div className="h-4 bg-gray-200 rounded mb-2"></div>
          <div className="h-4 bg-gray-200 rounded mb-2 w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <Label>Content *</Label>
      <div className="border rounded-md">
        <MDEditor
          value={value}
          onChange={(val) => onChange(val || '')}
          preview="preview"
          hideToolbar={false}
          visibleDragbar={false}
          data-color-mode="light"
          textareaProps={{
            placeholder: placeholder || "Write your article content here...",
          }}
          style={{ minHeight: '300px' }}
        />
      </div>

      {/* Image Upload Helper */}
      <div className="flex items-center gap-2 p-2 bg-gray-50 rounded border">
        <span className="text-sm text-gray-600">Upload image:</span>
        <input
          type="file"
          accept="image/*"
          onChange={async (e) => {
            const file = e.target.files?.[0];
            if (file) {
              const result = await handleImageUpload(file);
              if (result) {
                // Insert the image markdown into the editor
                const currentValue = value || '';
                const newValue = currentValue + '\n\n' + result + '\n\n';
                onChange(newValue);
              }
            }
          }}
          className="text-sm"
        />
      </div>
    </div>
  );
};