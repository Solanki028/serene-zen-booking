"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AuthService } from "@/lib/auth";
import { useToast } from "@/hooks/use-toast";
import {
  ArrowLeft,
  Loader2,
  Save,
  Upload,
  X
} from "lucide-react";

interface ArticleCategory {
  _id: string;
  name: string;
  slug: string;
}

interface Article {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  category: ArticleCategory;
  published: boolean;
  tags: string;
  seoTitle: string;
  seoDescription: string;
  featuredImage: string;
  contentImages: Array<{url: string, alt: string, caption: string}>;
}

export default function EditArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [categories, setCategories] = useState<ArticleCategory[]>([]);
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    author: '',
    category: '',
    published: false,
    tags: '',
    seoTitle: '',
    seoDescription: '',
    featuredImage: '',
    contentImages: [] as Array<{url: string, alt: string, caption: string}>,
  });
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    const checkAuth = async () => {
      const authenticated = await AuthService.verifyToken();
      setIsAuthenticated(authenticated);

      if (!authenticated) {
        router.push("/cms");
        return;
      }

      const { slug } = await params;
      await Promise.all([loadArticle(slug), loadCategories()]);
      setIsLoading(false);
    };

    checkAuth();
  }, [router, params]);

  const loadArticle = async (slug?: string) => {
    try {
      const articleSlug = slug || (await params).slug;
      // Use admin endpoint to get unpublished articles too
      const response = await fetch(`/api/articles/admin`, {
        headers: {
          'Authorization': `Bearer ${AuthService.getToken()}`,
        },
      });

      const data = await response.json();
      console.log('Articles data received:', data); // Debug log

      if (data.success && data.data && Array.isArray(data.data)) {
        // Find the specific article by slug
        const article = data.data.find((a: any) => a.slug === articleSlug);
        if (!article) {
          console.error('Article not found in admin data');
          toast({
            title: "Error",
            description: "Article not found.",
            variant: "destructive",
          });
          return;
        }

        setFormData({
          title: article.title || '',
          excerpt: article.excerpt || '',
          content: article.content || '',
          author: article.author || '',
          category: article.category?._id || article.category || '',
          published: article.published || false,
          tags: article.tags ? (Array.isArray(article.tags) ? article.tags.join(', ') : article.tags) : '',
          seoTitle: article.seoTitle || '',
          seoDescription: article.seoDescription || '',
          featuredImage: article.featuredImage || '',
          contentImages: article.contentImages || [],
        });
      } else {
        console.error('Invalid articles data format:', data);
        toast({
          title: "Error",
          description: "Invalid articles data received.",
          variant: "destructive",
        });
      }
  } catch (error) {
    console.error('Failed to load article:', error);
    toast({
      title: "Error",
      description: "Failed to load article data.",
      variant: "destructive",
    });
  }
};

const loadCategories = async () => {
  try {
    const response = await fetch('/api/article-categories/admin', {
      headers: {
        'Authorization': `Bearer ${AuthService.getToken()}`,
      },
    });

    const data = await response.json();
    if (data && Array.isArray(data)) {
      setCategories(data);
    }
  } catch (error) {
    console.error('Failed to load categories:', error);
  }
};

const handleInputChange = (field: string, value: any) => {
  setFormData(prev => ({ ...prev, [field]: value }));
};

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsSubmitting(true);

  try {
    const { slug } = await params;
    const articleData = {
      ...formData,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
    };

    const response = await fetch(`/api/articles/${slug}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${AuthService.getToken()}`,
      },
      body: JSON.stringify(articleData),
    });

    const data = await response.json();

    if (data.success) {
      toast({
        title: "Success!",
        description: "Article updated successfully.",
      });
      router.push("/cms/dashboard/articles/added");
    } else {
      throw new Error(data.message || 'Failed to update article');
    }
  } catch (error) {
    console.error('Failed to update article:', error);
    toast({
      title: "Error",
      description: "Failed to update article. Please try again.",
      variant: "destructive",
    });
  } finally {
    setIsSubmitting(false);
  }
};

const handleImageUpload = async (file: File, type: 'featured' | 'content') => {
  try {
    const formDataUpload = new FormData();
    formDataUpload.append('image', file);

    const response = await fetch('/api/upload/image', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${AuthService.getToken()}`,
      },
      body: formDataUpload,
    });

    const data = await response.json();

    if (data.success) {
      if (type === 'featured') {
        setFormData(prev => ({ ...prev, featuredImage: data.url }));
        alert('Cover image uploaded successfully!');
        toast({
          title: "Success!",
          description: "Featured image uploaded successfully.",
        });
      } else {
        const newImage = {
          url: data.url,
          alt: '',
          caption: ''
        };
        setFormData(prev => ({
          ...prev,
          contentImages: [...prev.contentImages, newImage]
        }));
        toast({
          title: "Success!",
          description: "Content image added successfully.",
        });
      }
    } else {
      throw new Error(data.message || 'Upload failed');
    }
  } catch (error) {
    console.error('Failed to upload image:', error);
    toast({
      title: "Error",
      description: "Failed to upload image. Please try again.",
      variant: "destructive",
    });
  }
};

const updateContentImage = (index: number, field: 'alt' | 'caption', value: string) => {
  setFormData(prev => ({
    ...prev,
    contentImages: prev.contentImages.map((img, i) =>
      i === index ? { ...img, [field]: value } : img
    )
  }));
};

const removeContentImage = (index: number) => {
  setFormData(prev => ({
    ...prev,
    contentImages: prev.contentImages.filter((_, i) => i !== index)
  }));
};

if (isLoading) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Loader2 className="h-8 w-8 animate-spin" />
    </div>
  );
}

if (!isAuthenticated) {
  return null;
}

return (
  <div className="min-h-screen bg-gray-50">
    {/* Header */}
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              onClick={() => router.push("/cms/dashboard/articles/added")}
              className="mr-2"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-2xl font-serif font-bold text-gray-900">
                Edit Article
              </h1>
              <p className="text-sm text-gray-600">
                Update article: {formData.title}
              </p>
            </div>
          </div>
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="gap-2"
          >
            {isSubmitting ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Save className="h-4 w-4" />
            )}
            Save Changes
          </Button>
        </div>
      </div>
    </header>

    {/* Main Content */}
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Article Details</CardTitle>
            <CardDescription>
              Basic information about your article
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                placeholder="Enter article title"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="excerpt">Excerpt *</Label>
              <Textarea
                id="excerpt"
                value={formData.excerpt}
                onChange={(e) => handleInputChange('excerpt', e.target.value)}
                placeholder="Brief description of the article"
                rows={3}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="content">Content *</Label>
              <Textarea
                id="content"
                value={formData.content}
                onChange={(e) => handleInputChange('content', e.target.value)}
                placeholder="Full article content - you can add images using the 'Add Image' button below"
                rows={15}
                required
              />
              <p className="text-sm text-gray-500">
                Tip: Use the "Add Image" button below to insert images into your content. Images will be uploaded to Cloudinary and embedded in your article.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="author">Author *</Label>
                <Input
                  id="author"
                  value={formData.author}
                  onChange={(e) => handleInputChange('author', e.target.value)}
                  placeholder="Article author"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>Category *</Label>
                <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category._id} value={category._id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="tags">Tags</Label>
              <Input
                id="tags"
                value={formData.tags}
                onChange={(e) => handleInputChange('tags', e.target.value)}
                placeholder="Comma-separated tags (optional)"
              />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="published"
                checked={formData.published}
                onCheckedChange={(checked) => handleInputChange('published', checked)}
              />
              <Label htmlFor="published">Publish article</Label>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Media</CardTitle>
            <CardDescription>
              Featured image and content images
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Featured Image */}
            <div className="space-y-4">
              <Label>Featured Image (Cover)</Label>
              {formData.featuredImage ? (
                <div className="relative">
                  <img
                    src={formData.featuredImage}
                    alt="Featured"
                    className="w-full h-32 object-cover rounded"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    className="absolute top-2 right-2"
                    onClick={() => setFormData(prev => ({ ...prev, featuredImage: '' }))}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <div className="text-center py-8">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="mt-2">
                    <label htmlFor="featured-image" className="cursor-pointer">
                      <span className="text-sm text-primary hover:text-primary/80">Upload featured image</span>
                      <input
                        id="featured-image"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleImageUpload(file, 'featured');
                        }}
                      />
                    </label>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">JPG, PNG, GIF up to 10MB</p>
                </div>
              )}
            </div>

            {/* Content Images */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>Content Images</Label>
                <label htmlFor="content-image" className="cursor-pointer">
                  <Button type="button" variant="outline" size="sm">
                    <Upload className="h-4 w-4 mr-2" />
                    Add Image
                  </Button>
                  <input
                    id="content-image"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleImageUpload(file, 'content');
                    }}
                  />
                </label>
              </div>

              {formData.contentImages.length > 0 && (
                <div className="space-y-4">
                  {formData.contentImages.map((image, index) => (
                    <div key={index} className="border rounded-lg p-4 space-y-3">
                      <div className="flex items-start gap-4">
                        <img
                          src={image.url}
                          alt={image.alt || 'Content image'}
                          className="w-20 h-20 object-cover rounded"
                        />
                        <div className="flex-1 space-y-2">
                          <Input
                            placeholder="Alt text (for accessibility)"
                            value={image.alt}
                            onChange={(e) => updateContentImage(index, 'alt', e.target.value)}
                          />
                          <Input
                            placeholder="Caption (optional)"
                            value={image.caption}
                            onChange={(e) => updateContentImage(index, 'caption', e.target.value)}
                          />
                        </div>
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          onClick={() => removeContentImage(index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {formData.contentImages.length === 0 && (
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <Upload className="mx-auto h-8 w-8 text-gray-400" />
                  <p className="text-sm text-gray-500 mt-2">No content images added yet</p>
                  <p className="text-xs text-gray-400 mt-1">Add images to include in your article content</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>SEO Settings</CardTitle>
            <CardDescription>
              Optional SEO optimization settings
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="seoTitle">SEO Title</Label>
              <Input
                id="seoTitle"
                value={formData.seoTitle}
                onChange={(e) => handleInputChange('seoTitle', e.target.value)}
                placeholder="Custom SEO title (optional)"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="seoDescription">SEO Description</Label>
              <Textarea
                id="seoDescription"
                value={formData.seoDescription}
                onChange={(e) => handleInputChange('seoDescription', e.target.value)}
                placeholder="Custom SEO description (optional)"
                rows={2}
              />
            </div>
          </CardContent>
        </Card>
      </form>
    </main>
  </div>
);
}