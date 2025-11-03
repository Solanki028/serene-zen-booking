"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { AuthService } from "@/lib/auth";
import {
  AlertCircle,
  Plus,
  Edit,
  Trash2,
  Loader2,
  Search,
  ArrowLeft
} from "lucide-react";

interface ArticleCategory {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  order: number;
  isActive: boolean;
}

export default function AddedCategoriesPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [categories, setCategories] = useState<ArticleCategory[]>([]);
  const [filteredCategories, setFilteredCategories] = useState<ArticleCategory[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

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

  useEffect(() => {
    const filtered = categories.filter(category =>
      category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (category.description && category.description.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    setFilteredCategories(filtered);
  }, [categories, searchTerm]);

  const loadCategories = async () => {
    try {
      const response = await fetch('/api/article-categories/admin', {
        headers: {
          'Authorization': `Bearer ${AuthService.getToken()}`,
        },
      });

      const data = await response.json();
      console.log('Categories data:', data); // Debug log
      if (data && Array.isArray(data)) {
        setCategories(data || []);
      } else if (data && data.success && Array.isArray(data.data)) {
        setCategories(data.data || []);
      } else {
        console.error('API returned unexpected format:', data);
        setCategories([]);
      }
    } catch (error) {
      console.error('Failed to load categories:', error);
      setCategories([]);
    }
  };

  const handleDeleteCategory = async (categoryId: string) => {
    if (!confirm('Are you sure you want to delete this category? This will also affect all articles in this category.')) return;

    try {
      const response = await fetch(`/api/article-categories/${categoryId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${AuthService.getToken()}`,
        },
      });

      if (response.ok) {
        await loadCategories(); // Reload data
      } else {
        alert('Failed to delete category');
      }
    } catch (error) {
      console.error('Failed to delete category:', error);
      alert('Failed to delete category');
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
              <AlertCircle className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-2xl font-serif font-bold text-gray-900">
                  Manage Categories
                </h1>
                <p className="text-sm text-gray-600">
                  Full CRUD operations for all categories
                </p>
              </div>
            </div>
            <Button onClick={() => router.push("/cms/dashboard/articles/categories/new")}>
              <Plus className="h-4 w-4 mr-2" />
              New Category
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search categories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Categories List */}
        <div className="space-y-4">
          {filteredCategories.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <AlertCircle className="h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {searchTerm ? 'No categories found' : 'No categories yet'}
                </h3>
                <p className="text-gray-600 mb-4">
                  {searchTerm ? 'Try adjusting your search terms.' : 'Create your first category to organize articles.'}
                </p>
                <Button onClick={() => router.push("/cms/dashboard/articles/categories/new")}>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Category
                </Button>
              </CardContent>
            </Card>
          ) : (
            filteredCategories.map((category) => (
              <Card key={category._id}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {category.name}
                        </h3>
                        <Badge variant={category.isActive ? "default" : "secondary"}>
                          {category.isActive ? "Active" : "Inactive"}
                        </Badge>
                      </div>
                      {category.description && (
                        <p className="text-gray-600 text-sm mb-2">
                          {category.description}
                        </p>
                      )}
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span>Slug: {category.slug}</span>
                        <span>Order: {category.order}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => router.push(`/cms/dashboard/articles/categories/${category.slug}/edit`)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteCategory(category.slug)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </main>
    </div>
  );
}