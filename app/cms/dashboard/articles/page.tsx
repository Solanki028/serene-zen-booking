"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { AuthService } from "@/lib/auth";
import { apiService } from "@/lib/api";
import {
  FileText,
  Plus,
  Edit,
  Trash2,
  Eye,
  Loader2,
  AlertCircle,
  CheckCircle
} from "lucide-react";

interface ArticleCategory {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  order: number;
  isActive: boolean;
}

interface Article {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  author: string;
  published: boolean;
  publishedAt?: string;
  category: ArticleCategory;
  createdAt: string;
}

export default function ArticlesManagement() {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [articles, setArticles] = useState<Article[]>([]);
  const [categories, setCategories] = useState<ArticleCategory[]>([]);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const authenticated = await AuthService.verifyToken();
      setIsAuthenticated(authenticated);

      if (!authenticated) {
        router.push("/cms");
        return;
      }

      await loadData();
      setIsLoading(false);
    };

    checkAuth();
  }, [router]);

  const loadData = async () => {
    try {
      // use same-origin cookies; don't hand craft Authorization header here
      const [articlesRes, categoriesRes] = await Promise.all([
        fetch('/api/articles/admin', { credentials: 'include' }),
        fetch('/api/article-categories/admin', { credentials: 'include' }),
      ]);
  
      // treat HTTP 2xx as success; fall back to .success if present
      const [articlesData, categoriesData] = await Promise.all([
        articlesRes.json().catch(() => ({})),
        categoriesRes.json().catch(() => ({})),
      ]);
  
      if (articlesRes.ok) {
        setArticles(articlesData?.data ?? []);
      } else {
        setArticles([]);
        console.error('Articles admin fetch failed:', articlesData);
      }
  
      if (categoriesRes.ok) {
        setCategories(categoriesData?.data ?? []);
      } else {
        setCategories([]);
        console.error('Article-categories admin fetch failed:', categoriesData);
      }
    } catch (error) {
      console.error('Failed to load data:', error);
    }
  };
  

  const handleDeleteArticle = async (articleId: string) => {
    if (!confirm('Are you sure you want to delete this article?')) return;

    try {
      await apiService.deleteArticle(articleId);
      await loadData(); // Reload data
    } catch (error) {
      console.error('Failed to delete article:', error);
      alert('Failed to delete article');
    }
  };

  const handleDeleteCategory = async (categoryId: string) => {
    if (!confirm('Are you sure you want to delete this category?')) return;
  
    try {
      const res = await fetch(`/api/article-categories/${categoryId}`, {
        method: 'DELETE',
        credentials: 'include',
      });
  
      const data = await res.json().catch(() => null);
  
      if (res.ok && (data?.success ?? true)) {
        await loadData();
      } else {
        alert(data?.message || 'Failed to delete category');
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
              <FileText className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-2xl font-serif font-bold text-gray-900">
                  Articles Management
                </h1>
                <p className="text-sm text-gray-600">
                  Manage your blog articles and categories
                </p>
              </div>
            </div>
            <Button onClick={() => router.push("/cms/dashboard")}>
              Back to Dashboard
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="added-articles" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="added-articles">Articles</TabsTrigger>
            <TabsTrigger value="categories">Categories</TabsTrigger>
            {/* <TabsTrigger value="added-categories">Added Categories</TabsTrigger> */}
          </TabsList>

          <TabsContent value="added-articles" className="space-y-6">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                <Button onClick={() => router.push("/cms/dashboard/articles/added")}>
                  <Edit className="h-4 w-4 mr-2" />
                  Manage Articles
                </Button>

              </div>
              <Button onClick={() => router.push("/cms/dashboard/articles/new")}>
                <Plus className="h-4 w-4 mr-2" />
                New Article
              </Button>
            </div>

            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <FileText className="h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Article Management</h3>
                <p className="text-gray-600 mb-4">Click the button above to manage all articles with full CRUD operations.</p>
                <Button onClick={() => router.push("/cms/dashboard/articles/added")}>
                  <Edit className="h-4 w-4 mr-2" />
                  Open Article Manager
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="categories" className="space-y-6">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                <Button onClick={() => router.push("/cms/dashboard/articles/categories/added")}>
                  <Edit className="h-4 w-4 mr-2" />
                  Manage Categories
                </Button>
               
              </div>
              <Button onClick={() => router.push("/cms/dashboard/articles/categories/new")}>
                <Plus className="h-4 w-4 mr-2" />
                New Category
              </Button>
            </div>

            <div className="grid gap-4">
              {categories.length === 0 ? (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-12">
                    <AlertCircle className="h-12 w-12 text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No categories yet</h3>
                    <p className="text-gray-600 mb-4">Create categories to organize your articles.</p>
                    <Button onClick={() => router.push("/cms/dashboard/articles/categories/new")}>
                      <Plus className="h-4 w-4 mr-2" />
                      Create Category
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                categories.slice(0, 3).map((category) => (
                  <Card key={category._id}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">
                            {category.name}
                          </h3>
                          {category.description && (
                            <p className="text-gray-600 text-sm mt-1">
                              {category.description}
                            </p>
                          )}
                          <div className="flex items-center gap-2 mt-2">
                            <Badge variant={category.isActive ? "default" : "secondary"}>
                              {category.isActive ? "Active" : "Inactive"}
                            </Badge>
                            <span className="text-sm text-gray-500">
                              Order: {category.order}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => router.push(`/cms/dashboard/articles/categories/${category._id}/edit`)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeleteCategory(category._id)}
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
          </TabsContent>

          <TabsContent value="added-categories" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Manage Categories</h2>
              <Button onClick={() => router.push("/cms/dashboard/articles/categories/added")}>
                <Edit className="h-4 w-4 mr-2" />
                Manage All Categories
              </Button>
            </div>

            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <AlertCircle className="h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Category Management</h3>
                <p className="text-gray-600 mb-4">Click the button above to manage all categories with full CRUD operations.</p>
                <Button onClick={() => router.push("/cms/dashboard/articles/categories/added")}>
                  <Edit className="h-4 w-4 mr-2" />
                  Open Category Manager
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}