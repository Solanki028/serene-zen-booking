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
import {
  Loader2,
  Plus,
  Edit,
  Trash2,
  Star,
  Clock,
  DollarSign
} from "lucide-react";

interface Category {
  _id: string;
  name: string;
  slug: string;
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

export default function ServicesManagement() {
  const [services, setServices] = useState<Service[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
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

function ServiceForm({ service, onSave }: { service: Service | null; onSave: () => void }) {
  const [categories, setCategories] = useState<Category[]>([]);
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

        if (response.ok && data) {
          setCategories(data);
        } else {
          console.error('Failed to load categories:', data?.message || 'Unknown error');
        }
      } catch (error) {
        console.error('Failed to load categories:', error);
      }
    };
    loadCategories();
  }, []);
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
        <Label htmlFor="category">Category</Label>
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
                if (file) {
                  try {
                    const response = await apiService.uploadImage(file);
                    if (response.success) {
                      updateImage(index, response.data.url);
                    }
                  } catch (error) {
                    console.error('Upload failed:', error);
                    alert('Failed to upload image');
                  }
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