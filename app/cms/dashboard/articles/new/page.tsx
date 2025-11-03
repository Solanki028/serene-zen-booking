"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { AuthService } from "@/lib/auth";
import { apiService } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import {
  ArrowLeft,
  Loader2,
  Save,
  Upload
} from "lucide-react";

interface ArticleCategory {
  _id: string;
  name: string;
  slug: string;
}

export default function NewArticlePage() {
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

      await loadCategories();
      setIsLoading(false);
    };

    checkAuth();
  }, [router]);

  const loadCategories = async () => {
    try {
      const response = await apiService.getArticleCategories();
      if (response) {
        setCategories(response);
      }
    } catch (error) {
      console.error('Failed to load categories:', error);
    }
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleImageUpload = async (file: File, type: 'featured' | 'content') => {
    try {
      const uploadedImage = await apiService.uploadImage(file);
      if (type === 'featured') {
        setFormData(prev => ({ ...prev, featuredImage: uploadedImage.url }));
        alert('Cover image uploaded successfully!');
        toast({
          title: "Success!",
          description: "Featured image uploaded successfully.",
        });
      } else {
        const newImage = {
          url: uploadedImage.url,
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
    } catch (error) {
      console.error('Failed to upload image:', error);
      toast({
        title: "Error",
        description: "Failed to upload image. Please try again.",
        variant: "destructive",
      });
    }
  };

  const removeContentImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      contentImages: prev.contentImages.filter((_, i) => i !== index)
    }));
  };

  const updateContentImage = (index: number, field: 'alt' | 'caption', value: string) => {
    setFormData(prev => ({
      ...prev,
      contentImages: prev.contentImages.map((img, i) =>
        i === index ? { ...img, [field]: value } : img
      )
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const articleData = {
        ...formData,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      };

      await apiService.createArticle(articleData);

      toast({
        title: "Success!",
        description: "Article created successfully.",
      });

      router.push("/cms/dashboard/articles");
    } catch (error) {
      console.error('Failed to create article:', error);
      toast({
        title: "Error",
        description: "Failed to create article. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
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
                onClick={() => router.push("/cms/dashboard/articles")}
                className="mr-2"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <div>
                <h1 className="text-2xl font-serif font-bold text-gray-900">
                  Create New Article
                </h1>
                <p className="text-sm text-gray-600">
                  Add a new article to your blog
                </p>
              </div>
            </div>
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  <Label htmlFor="author">Author *</Label>
                  <Input
                    id="author"
                    value={formData.author}
                    onChange={(e) => handleInputChange('author', e.target.value)}
                    placeholder="Enter author name"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
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

              <div className="space-y-2">
                <Label htmlFor="excerpt">Excerpt *</Label>
                <Textarea
                  id="excerpt"
                  value={formData.excerpt}
                  onChange={(e) => handleInputChange('excerpt', e.target.value)}
                  placeholder="Brief summary of the article"
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
                  placeholder="Full article content (HTML allowed)"
                  rows={10}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tags">Tags</Label>
                <Input
                  id="tags"
                  value={formData.tags}
                  onChange={(e) => handleInputChange('tags', e.target.value)}
                  placeholder="Enter tags separated by commas"
                />
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="published"
                  checked={formData.published}
                  onCheckedChange={(checked) => handleInputChange('published', checked)}
                />
                <Label htmlFor="published">Publish immediately</Label>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Images</CardTitle>
              <CardDescription>
                Upload featured image and content images for your article
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Featured Image */}
              <div className="space-y-2">
                <Label>Featured Image (Cover)</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
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
                        Remove
                      </Button>
                    </div>
                  ) : (
                    <div className="text-center">
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
                    </div>
                  )}
                </div>
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
                            Remove
                          </Button>
                        </div>
                      </div>
                    ))}
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

          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/cms/dashboard/articles")}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
              ) : (
                <Save className="h-4 w-4 mr-2" />
              )}
              Create Article
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
}