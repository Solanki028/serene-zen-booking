"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { AuthService } from "@/lib/auth";
import { useToast } from "@/hooks/use-toast";
import {
  ArrowLeft,
  Loader2,
  Save
} from "lucide-react";

interface ArticleCategory {
  _id: string;
  name: string;
  slug: string;
  description: string;
  order: number;
  isActive: boolean;
}

export default function EditCategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    order: 0,
    isActive: true,
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

      await loadCategory();
      setIsLoading(false);
    };

    checkAuth();
  }, [router, params]);

  const loadCategory = async () => {
    try {
      const { slug } = await params;
      const response = await fetch(`/api/article-categories/${slug}`, {
        headers: {
          'Authorization': `Bearer ${AuthService.getToken()}`,
        },
      });

      const data = await response.json();
      console.log('Category data:', data); // Debug log

      if (data && data.name) { // Backend returns category directly
        setFormData({
          name: data.name || '',
          description: data.description || '',
          order: data.order || 0,
          isActive: data.isActive ?? true,
        });
      } else {
        console.error('Invalid category data format:', data);
        toast({
          title: "Error",
          description: "Invalid category data received.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Failed to load category:', error);
      toast({
        title: "Error",
        description: "Failed to load category data.",
        variant: "destructive",
      });
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
      const response = await fetch(`/api/article-categories/${slug}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${AuthService.getToken()}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        toast({
          title: "Success!",
          description: "Category updated successfully.",
        });
        router.push("/cms/dashboard/articles/categories/added");
      } else {
        throw new Error(data.message || 'Failed to update category');
      }
    } catch (error) {
      console.error('Failed to update category:', error);
      toast({
        title: "Error",
        description: "Failed to update category. Please try again.",
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
                onClick={() => router.push("/cms/dashboard/articles/categories/added")}
                className="mr-2"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <div>
                <h1 className="text-2xl font-serif font-bold text-gray-900">
                  Edit Category
                </h1>
                <p className="text-sm text-gray-600">
                  Update category: {formData.name}
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
              <CardTitle>Category Details</CardTitle>
              <CardDescription>
                Basic information about your category
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Enter category name"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Brief description of the category (optional)"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="order">Display Order</Label>
                  <Input
                    id="order"
                    type="number"
                    value={formData.order}
                    onChange={(e) => handleInputChange('order', parseInt(e.target.value) || 0)}
                    placeholder="0"
                    min="0"
                  />
                  <p className="text-xs text-gray-500">Lower numbers appear first</p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="isActive"
                  checked={formData.isActive}
                  onCheckedChange={(checked) => handleInputChange('isActive', checked)}
                />
                <Label htmlFor="isActive">Category is active</Label>
              </div>
            </CardContent>
          </Card>
        </form>
      </main>
    </div>
  );
}