"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AuthService } from "@/lib/auth";
import { apiService } from "@/lib/api";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { toast } from "@/hooks/use-toast";
import {
  Loader2,
  Plus,
  Edit,
  Trash2,
  Star,
  Clock,
  DollarSign,
  Save,
  X,
  FolderPlus
} from "lucide-react";

interface Category {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  order: number;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

interface Service {
  _id: string;
  title: string;
  slug: string;
  category: Category;
  shortDesc: string;
  longDesc?: string;
  benefits: string[];
  durations: { minutes: number; price: number }[];
  images: string[];
  featured: boolean;
  contraindications?: string;
  faqs: { question: string; answer: string }[];
  createdAt: string;
  updatedAt: string;
}

interface ServiceCategory {
  _id: string;
  name: string;
  slug: string;
  description: string;
  image?: string;
  order: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function ServicesManagement() {
  const [services, setServices] = useState<Service[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [isCategoryDialogOpen, setIsCategoryDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<ServiceCategory | null>(null);
  const [categoryFormData, setCategoryFormData] = useState({
    name: "",
    description: "",
    image: "",
    order: 0,
    isActive: true,
  });
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const authenticated = await AuthService.verifyToken();
      setIsAuthenticated(authenticated);

      if (!authenticated) {
        router.push("/cms");
        return;
      }

      await loadServices();
    };

    checkAuth();
  }, [router]);

  const loadServices = async () => {
    try {
      const [servicesResponse, categoriesResponse] = await Promise.all([
        apiService.getServices(),
        apiService.getCategoriesAdmin()
      ]);

      if (servicesResponse.success) {
        setServices(servicesResponse.data);
      }

      if (categoriesResponse.success) {
        setCategories(categoriesResponse.data);
      }
    } catch (error) {
      console.error('Failed to load data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadCategories = async () => {
    try {
      const response = await fetch('/api/categories/admin', {
        headers: {
          "Cookie": document.cookie,
        },
      });
      const data = await response.json();
      if (data.success) {
        setCategories(data.data);
      }
    } catch (error) {
      console.error('Failed to load categories:', error);
      toast({
        title: "Error",
        description: "Failed to load categories",
        variant: "destructive",
      });
    }
  };

  const handleCategorySubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const url = editingCategory
        ? `/api/categories/${editingCategory._id}`
        : "/api/categories";

      const method = editingCategory ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          "Cookie": document.cookie,
        },
        body: JSON.stringify(categoryFormData),
      });

      const data = await response.json();

      if (data.success) {
        toast({
          title: "Success",
          description: `Category ${editingCategory ? "updated" : "created"} successfully`,
        });
        loadCategories();
        setIsCategoryDialogOpen(false);
        setEditingCategory(null);
        resetCategoryForm();
      } else {
        toast({
          title: "Error",
          description: data.message || "Something went wrong",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error saving category:", error);
      toast({
        title: "Error",
        description: "Failed to save category",
        variant: "destructive",
      });
    }
  };

  const handleCategoryEdit = (category: Category) => {
    setEditingCategory(category as ServiceCategory);
    setCategoryFormData({
      name: category.name,
      description: category.description || "",
      image: category.image || "",
      order: category.order,
      isActive: category.isActive,
    });
    setIsCategoryDialogOpen(true);
  };

  const handleCategoryDelete = async (categoryId: string) => {
    try {
      const response = await fetch(`/api/categories/${categoryId}`, {
        method: "DELETE",
        headers: {
          "Cookie": document.cookie,
        },
      });

      const data = await response.json();

      if (data.success) {
        toast({
          title: "Success",
          description: "Category deleted successfully",
        });
        loadCategories();
      } else {
        toast({
          title: "Error",
          description: data.message || "Failed to delete category",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error deleting category:", error);
      toast({
        title: "Error",
        description: "Failed to delete category",
        variant: "destructive",
      });
    }
  };

  const resetCategoryForm = () => {
    setCategoryFormData({
      name: "",
      description: "",
      image: "",
      order: 0,
      isActive: true,
    });
  };

  // const handleCategoryCancel = () => {
  //   setIsCategoryDialogOpen(false);
  //   setEditingCategory(null);
  //   resetCategoryForm();
  // };

  const handleDelete = async (serviceId: string) => {
    if (!confirm('Are you sure you want to delete this service?')) return;

    try {
      await apiService.deleteService(serviceId);
      await loadServices();
    } catch (error) {
      console.error('Failed to delete service:', error);
      alert('Failed to delete service');
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
            <div>
              <h1 className="text-2xl font-serif font-bold text-gray-900">
                Services Management
              </h1>
              <p className="text-sm text-gray-600">
                Manage your spa services and pricing
              </p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => router.push("/cms/dashboard")}>
                Back to Dashboard
              </Button>
              <Dialog open={isCategoryDialogOpen} onOpenChange={setIsCategoryDialogOpen}>
                <DialogTrigger asChild>
                  {/* <Button variant="outline" onClick={() => setEditingCategory(null)}>
                    <FolderPlus className="h-4 w-4 mr-2" />
                    Manage Categories
                  </Button> */}
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Manage Service Categories</DialogTitle>
                    <DialogDescription>
                      Create, edit, and delete service categories. Changes will reflect in the service dropdown.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-semibold">Categories ({categories.length})</h3>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                          type="button"
                          onClick={() => {
                            setEditingCategory(null);
                            setCategoryFormData({
                              name: "",
                              description: "",
                              image: "",
                              order: 0,
                              isActive: true,
                            });
                          }}>
                            <Plus className="h-4 w-4 mr-2" />
                            Add Category
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[500px]">
                          <DialogHeader>
                            <DialogTitle>
                              {editingCategory ? "Edit Category" : "Create New Category"}
                            </DialogTitle>
                          </DialogHeader>
                          <CategoryForm
                            category={editingCategory}
                            onSave={() => {
                              loadCategories();
                            }}
                          />
                        </DialogContent>
                      </Dialog>
                    </div>

                    <div className="grid gap-3 max-h-96 overflow-y-auto">
                      {categories.map((category) => (
                        <Card key={category._id}>
                          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <div>
                              <CardTitle className="text-base">{category.name}</CardTitle>
                              <p className="text-sm text-muted-foreground">{category.slug}</p>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Badge variant={category.isActive ? "default" : "secondary"}>
                                {category.isActive ? "Active" : "Inactive"}
                              </Badge>
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button
                                  type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleCategoryEdit(category)}
                                  >
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[500px]">
                                  <DialogHeader>
                                    <DialogTitle>Edit Category</DialogTitle>
                                  </DialogHeader>
                                  <CategoryForm
                                    category={editingCategory}
                                    onSave={() => {
                                      loadCategories();
                                      setIsCategoryDialogOpen(false);
                                      setEditingCategory(null);
                                    }}
                                  />
                                </DialogContent>
                              </Dialog>
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button variant="outline" size="sm">
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>Delete Category</AlertDialogTitle>
                                    <AlertDialogDescription>
                                      Are you sure you want to delete "{category.name}"? This action cannot be undone.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction
                                      onClick={() => handleCategoryDelete(category._id)}
                                      className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                    >
                                      Delete
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </div>
                          </CardHeader>
                          {category.description && (
                            <CardContent>
                              <p className="text-sm text-muted-foreground">{category.description}</p>
                            </CardContent>
                          )}
                        </Card>
                      ))}
                    </div>

                    {categories.length === 0 && (
                      <Card>
                        <CardContent className="flex flex-col items-center justify-center py-8">
                          <div className="text-center">
                            <h4 className="text-base font-semibold mb-2">No categories found</h4>
                            <p className="text-sm text-muted-foreground mb-4">
                              Create your first service category to get started.
                            </p>
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button 
                                type = "button"
                                onClick={() => {
                                  setEditingCategory(null);
                                  setCategoryFormData({
                                    name: "",
                                    description: "",
                                    image: "",
                                    order: 0,
                                    isActive: true,
                                  });
                                }}>
                                  <Plus className="h-4 w-4 mr-2" />
                                  Create Category
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="sm:max-w-[500px]">
                                <DialogHeader>
                                  <DialogTitle>Create New Category</DialogTitle>
                                </DialogHeader>
                                <CategoryForm
                                  category={null}
                                  onSave={() => {
                                    loadCategories();
                                  }}
                                />
                              </DialogContent>
                            </Dialog>
                          </div>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                </DialogContent>
              </Dialog>
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button onClick={() => setEditingService(null)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Service
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>
                      {editingService ? 'Edit Service' : 'Add New Service'}
                    </DialogTitle>
                    <DialogDescription>
                      Configure service details, pricing, and features.
                    </DialogDescription>
                  </DialogHeader>
                  <ServiceForm
                    service={editingService}
                    onSave={async () => {
                      await loadServices();
                      setIsDialogOpen(false);
                      setEditingService(null);
                    }}
                  />
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardHeader>
            <CardTitle>All Services</CardTitle>
            <CardDescription>
              {services.length} services total
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Service</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Featured</TableHead>
                  <TableHead>Durations</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {services.map((service) => (
                  <TableRow key={service._id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{service.title}</div>
                        <div className="text-sm text-muted-foreground">
                          {service.shortDesc}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">{service.category?.name || 'No Category'}</Badge>
                    </TableCell>
                    <TableCell>
                      {service.featured && <Star className="h-4 w-4 text-yellow-500 fill-current" />}
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        {service.durations.map((duration, index) => (
                          <div key={index} className="flex items-center gap-2 text-sm">
                            <Clock className="h-3 w-3" />
                            {duration.minutes}min
                            <DollarSign className="h-3 w-3" />
                            {duration.price}
                          </div>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setEditingService(service);
                            setIsDialogOpen(true);
                          }}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(service._id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

function CategoryForm({
  category,
  onSave
}: {
  category: ServiceCategory | null;
  onSave: () => void;
}) {
  const [formData, setFormData] = useState({
    name: category?.name || "",
    description: category?.description || "",
    image: category?.image || "",
    order: category?.order || 0,
    isActive: category?.isActive ?? true,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

// inside CategoryForm


const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  // ⬇⬇ Stop bubbling to ServiceForm onSubmit (even across portal)
  // @ts-ignore – SyntheticEvent has stopPropagation
  if (typeof (e as any).stopPropagation === "function") (e as any).stopPropagation();

  setIsSubmitting(true);
  try {
    const url = category ? `/api/categories/${category._id}` : "/api/categories";
    const method = category ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const payload = await res.json().catch(() => ({} as any));
    if (res.ok) {
      toast({
        title: "Success",
        description: `Category ${category ? "updated" : "created"} successfully`,
      });
      onSave();
    } else {
      throw new Error(payload?.message || "Failed to save category");
    }
  } catch (error) {
    console.error("Error saving category:", error);
    toast({ title: "Error", description: "Failed to save category", variant: "destructive" });
  } finally {
    setIsSubmitting(false);
  }
};



  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="cat-name">Name</Label>
          <Input
            id="cat-name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Category name"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="cat-order">Order</Label>
          <Input
            id="cat-order"
            type="number"
            value={formData.order}
            onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
            placeholder="Display order"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="cat-description">Description</Label>
        <Textarea
          id="cat-description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Category description"
          rows={3}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="cat-image">Image URL</Label>
        <Input
          id="cat-image"
          value={formData.image}
          onChange={(e) => setFormData({ ...formData, image: e.target.value })}
          placeholder="Image URL (optional)"
        />
      </div>

      <div className="flex items-center space-x-2">
        <Switch
          id="cat-isActive"
          checked={formData.isActive}
          onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked })}
        />
        <Label htmlFor="cat-isActive">Active</Label>
      </div>

      <div className="flex justify-end space-x-2 pt-4">
      <Button type="button" variant="outline" onClick={onSave}>
  <X className="h-4 w-4 mr-2" />
  Cancel
</Button>

        <Button type="submit" disabled={isSubmitting}
         onClick={(ev) => ev.stopPropagation()}
         >
          {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Save className="h-4 w-4 mr-2" />}
          {category ? "Update" : "Create"}
        </Button>
      </div>
    </form>
  );
}

function CategoryManagement({
  categories,
  onEdit,
  onDelete,
  onCreate
}: {
  categories: Category[];
  onEdit: (category: Category) => void;
  onDelete: (categoryId: string) => void;
  onCreate: () => void;
}) {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Categories ({categories.length})</h3>
        <Button onClick={onCreate}>
          <Plus className="h-4 w-4 mr-2" />
          Add Category
        </Button>
      </div>

      <div className="grid gap-3 max-h-96 overflow-y-auto">
        {categories.map((category) => (
          <Card key={category._id}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div>
                <CardTitle className="text-base">{category.name}</CardTitle>
                <p className="text-sm text-muted-foreground">{category.slug}</p>
              </div>
              <div className="flex items-center space-x-2">
                <Badge variant={category.isActive ? "default" : "secondary"}>
                  {category.isActive ? "Active" : "Inactive"}
                </Badge>
                <Button
                type="button" 
                  variant="outline"
                  size="sm"
                  onClick={() => onEdit(category)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete Category</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to delete "{category.name}"? This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>

                      <AlertDialogAction
  type="button"
  onClick={(e: React.MouseEvent) => { e.stopPropagation(); onDelete(category._id); }}
  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
>
  Delete
</AlertDialogAction>



                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </CardHeader>
            {category.description && (
              <CardContent>
                <p className="text-sm text-muted-foreground">{category.description}</p>
              </CardContent>
            )}
          </Card>
        ))}
      </div>

      {categories.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-8">
            <div className="text-center">
              <h4 className="text-base font-semibold mb-2">No categories found</h4>
              <p className="text-sm text-muted-foreground mb-4">
                Create your first service category to get started.
              </p>
              <Button onClick={onCreate}>
                <Plus className="h-4 w-4 mr-2" />
                Create Category
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

function ServiceForm({ service, onSave }: { service: Service | null; onSave: () => void }) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [editingCategory, setEditingCategory] = useState<ServiceCategory | null>(null);
  const [categoryFormData, setCategoryFormData] = useState({
    name: "",
    description: "",
    image: "",
    order: 0,
    isActive: true,
  });
  const [formData, setFormData] = useState({
    title: service?.title || '',
    slug: service?.slug || '',
    category: service?.category?._id || '',
    shortDesc: service?.shortDesc || '',
    longDesc: service?.longDesc || '',
    benefits: service?.benefits || [''],
    durations: service?.durations || [{ minutes: 60, price: 100 }],
    images: service?.images || [''],
    featured: service?.featured || false,
    contraindications: service?.contraindications || '',
    faqs: service?.faqs || [{ question: '', answer: '' }],
  });

  useEffect(() => {
    const loadCategories = async () => {
      try {
        // Use public categories endpoint directly since it works
        const response = await fetch('/api/categories');
        const data = await response.json();

        if (response.ok && data.success && Array.isArray(data.data)) {
          setCategories(data.data);
        } else {
          console.error('Failed to load categories:', data?.message || 'Unknown error');
          setCategories([]); // Set empty array as fallback
        }
      } catch (error) {
        console.error('Failed to load categories:', error);
        setCategories([]); // Set empty array as fallback
      }
    };
    loadCategories();
  }, []);

  // ⬇⬇ CHANGED: align with the working public endpoint so the dialog reflects immediately
  const loadCategories = async () => {
    try {
      const response = await fetch('/api/categories');
      const data = await response.json();
      if (response.ok && data.success && Array.isArray(data.data)) {
        setCategories(data.data);
      } else {
        console.error('Failed to load categories:', data?.message || 'Unknown error');
        toast({
          title: "Error",
          description: "Failed to load categories",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Failed to load categories:', error);
      toast({
        title: "Error",
        description: "Failed to load categories",
        variant: "destructive",
      });
    }
  };

  const handleCategoryEdit = (category: Category) => {
    setEditingCategory(category as ServiceCategory);
    setCategoryFormData({
      name: category.name,
      description: category.description || "",
      image: category.image || "",
      order: category.order,
      isActive: category.isActive,
    });
  };

  const handleCategoryDelete = async (categoryId: string) => {
    try {
      const response = await fetch(`/api/categories/${categoryId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Cookie": document.cookie,
        },
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          // ⬇⬇ OPTIMISTIC UPDATE so UI reflects instantly
          setCategories(prev => prev.filter(c => c._id !== categoryId));
          // If the deleted one was selected, clear selection
          setFormData(prev => ({
            ...prev,
            category: prev.category === categoryId ? "" : prev.category
          }));
          toast({
            title: "Success",
            description: "Category deleted successfully",
          });
          // Also re-fetch to stay in sync (no page reload)
          loadCategories();
        } else {
          toast({
            title: "Error",
            description: data.message || "Failed to delete category",
            variant: "destructive",
          });
        }
      } else {
        // Handle non-200 responses
        const errorText = await response.text();
        console.error("Delete failed:", response.status, errorText);
        toast({
          title: "Error",
          description: `Failed to delete category (${response.status})`,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error deleting category:", error);
      toast({
        title: "Error",
        description: "Failed to delete category",
        variant: "destructive",
      });
    }
  };
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Clean up empty values
      const cleanData = {
        ...formData,
        benefits: formData.benefits.filter(b => b.trim()),
        images: formData.images.filter(i => i.trim()),
        faqs: formData.faqs.filter(faq => faq.question.trim() && faq.answer.trim()),
      };

      if (service) {
        await apiService.updateService(service._id, cleanData);
      } else {
        await apiService.createService(cleanData);
      }

      onSave();
    } catch (error) {
      console.error('Failed to save service:', error);
      alert('Failed to save service');
    } finally {
      setIsSubmitting(false);
    }
  };

  const addBenefit = () => {
    setFormData(prev => ({
      ...prev,
      benefits: [...prev.benefits, '']
    }));
  };

  const updateBenefit = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      benefits: prev.benefits.map((b, i) => i === index ? value : b)
    }));
  };

  const removeBenefit = (index: number) => {
    setFormData(prev => ({
      ...prev,
      benefits: prev.benefits.filter((_, i) => i !== index)
    }));
  };

  const addImage = () => {
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, '']
    }));
  };

  const updateImage = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.map((img, i) => i === index ? value : img)
    }));
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="slug">Slug</Label>
          <Input
            id="slug"
            value={formData.slug}
            onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="category">Category</Label>
          <Dialog>
            <DialogTrigger asChild>
              <Button
                type="button"
                variant="outline"
                size="sm"
              >
                <FolderPlus className="h-4 w-4 mr-2" />
                Manage Categories
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Manage Service Categories</DialogTitle>
                <DialogDescription>
                  Create, edit, and delete service categories. Changes will reflect in the service dropdown.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">Categories ({categories.length})</h3>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        type="button"   onClick={() => {
                        setEditingCategory(null);
                        setCategoryFormData({
                          name: "",
                          description: "",
                          image: "",
                          order: 0,
                          isActive: true,
                        });
                      }}>
                        <Plus className="h-4 w-4 mr-2" />
                        Add Category
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[500px]">
                      <DialogHeader>
                        <DialogTitle>Create New Category</DialogTitle>
                      </DialogHeader>
                      <CategoryForm
                        category={null}
                        onSave={() => {
                          loadCategories();
                        }}
                      />
                    </DialogContent>
                  </Dialog>
                </div>

                <div className="grid gap-3 max-h-96 overflow-y-auto">
                  {categories.map((category) => (
                    <Card key={category._id}>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <div>
                          <CardTitle className="text-base">{category.name}</CardTitle>
                          <p className="text-sm text-muted-foreground">{category.slug}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant={category.isActive ? "default" : "secondary"}>
                            {category.isActive ? "Active" : "Inactive"}
                          </Badge>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                type="button"  
                                variant="outline"
                                size="sm"
                                onClick={() => handleCategoryEdit(category)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[500px]">
                              <DialogHeader>
                                <DialogTitle>Edit Category</DialogTitle>
                              </DialogHeader>
                              <CategoryForm
                                category={editingCategory}
                                onSave={() => {
                                  loadCategories();
                                  setEditingCategory(null);
                                }}
                              />
                            </DialogContent>
                          </Dialog>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="outline" size="sm">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Delete Category</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Are you sure you want to delete "{category.name}"? This action cannot be undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
  type="button"
  onClick={(e: React.MouseEvent) => { e.stopPropagation(); handleCategoryDelete(category._id); }}
  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
>
  Delete
</AlertDialogAction>



                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </CardHeader>
                      {category.description && (
                        <CardContent>
                          <p className="text-sm text-muted-foreground">{category.description}</p>
                        </CardContent>
                      )}
                    </Card>
                  ))}
                </div>

                {categories.length === 0 && (
                  <Card>
                    <CardContent className="flex flex-col items-center justify-center py-8">
                      <div className="text-center">
                        <h4 className="text-base font-semibold mb-2">No categories found</h4>
                        <p className="text-sm text-muted-foreground mb-4">
                          Create your first service category to get started.
                        </p>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button onClick={() => {
                              setEditingCategory(null);
                              setCategoryFormData({
                                name: "",
                                description: "",
                                image: "",
                                order: 0,
                                isActive: true,
                              });
                            }}>
                              <Plus className="h-4 w-4 mr-2" />
                              Create Category
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[500px]">
                            <DialogHeader>
                              <DialogTitle>Create New Category</DialogTitle>
                            </DialogHeader>
                            <CategoryForm
                              category={null}
                              onSave={() => {
                                loadCategories();
                                setEditingCategory(null);
                              }}
                            />
                          </DialogContent>
                        </Dialog>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </DialogContent>
          </Dialog>
        </div>
        <select
          id="category"
          value={formData.category}
          onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          required
        >
          <option value="">Select a category</option>
          {categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="shortDesc">Short Description</Label>
        <Textarea
          id="shortDesc"
          value={formData.shortDesc}
          onChange={(e) => setFormData(prev => ({ ...prev, shortDesc: e.target.value }))}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="longDesc">Long Description</Label>
        <Textarea
          id="longDesc"
          value={formData.longDesc}
          onChange={(e) => setFormData(prev => ({ ...prev, longDesc: e.target.value }))}
        />
      </div>

      <div className="space-y-2">
        <Label>Benefits</Label>
        {formData.benefits.map((benefit, index) => (
          <div key={index} className="flex gap-2">
            <Input
              value={benefit}
              onChange={(e) => updateBenefit(index, e.target.value)}
              placeholder="Enter benefit"
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => removeBenefit(index)}
            >
              Remove
            </Button>
          </div>
        ))}
        <Button type="button" variant="outline" onClick={addBenefit}>
          Add Benefit
        </Button>
      </div>

      <div className="space-y-2">
        <Label>Service Images</Label>
        {formData.images.map((image, index) => (
          <div key={index} className="flex gap-2">
            <Input
              value={image}
              onChange={(e) => updateImage(index, e.target.value)}
              placeholder="Enter image URL"
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => document.getElementById(`imageInput-${index}`)?.click()}
            >
              Upload
            </Button>
            <input
              id={`imageInput-${index}`}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={async (e) => {
                const file = e.target.files?.[0];
                if (!file) return;
              
                try {
                  const { url } = await apiService.uploadImage(file); // <- new return shape
                  updateImage(index, url);
                } catch (error: any) {
                  console.error('Upload failed:', error);
                  alert(error?.message || 'Failed to upload image');
                }
              }}
              
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => removeImage(index)}
            >
              Remove
            </Button>
          </div>
        ))}
        <Button type="button" variant="outline" onClick={addImage}>
          Add Image
        </Button>
      </div>

      <div className="space-y-2">
        <Label>Featured Service</Label>
        <div className="flex items-center space-x-2">
          <Switch
            checked={formData.featured}
            onCheckedChange={(checked) => setFormData(prev => ({ ...prev, featured: checked }))}
          />
          <Label>Mark as featured</Label>
        </div>
      </div>

      <div className="flex justify-end gap-3">
        <Button type="button" variant="outline" onClick={() => onSave()}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
          {service ? 'Update' : 'Create'} Service
        </Button>
      </div>
    </form>
  );
}
