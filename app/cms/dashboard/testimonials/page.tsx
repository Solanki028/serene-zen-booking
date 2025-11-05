"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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
import {
  Loader2,
  Plus,
  Edit,
  Trash2,
  Star,
  Upload
} from "lucide-react";

interface Testimonial {
  _id: string;
  name: string;
  quote: string;
  rating: number;
  avatarUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export default function TestimonialsManagement() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const authenticated = await AuthService.verifyToken();
      setIsAuthenticated(authenticated);

      if (!authenticated) {
        router.push("/cms");
        return;
      }

      await loadTestimonials();
    };

    checkAuth();
  }, [router]);

  const loadTestimonials = async () => {
    try {
      const response = await apiService.getTestimonials();
      if (response.success) {
        setTestimonials(response.data);
      }
    } catch (error) {
      console.error('Failed to load testimonials:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (testimonialId: string) => {
    if (!confirm('Are you sure you want to delete this testimonial?')) return;

    try {
      await apiService.deleteTestimonial(testimonialId);
      await loadTestimonials();
    } catch (error) {
      console.error('Failed to delete testimonial:', error);
      alert('Failed to delete testimonial');
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
                Testimonials Management
              </h1>
              <p className="text-sm text-gray-600">
                Manage customer reviews and ratings
              </p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => router.push("/cms/dashboard")}>
                Back to Dashboard
              </Button>
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button onClick={() => setEditingTestimonial(null)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Testimonial
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>
                      {editingTestimonial ? 'Edit Testimonial' : 'Add New Testimonial'}
                    </DialogTitle>
                    <DialogDescription>
                      Add customer reviews and ratings.
                    </DialogDescription>
                  </DialogHeader>
                  <TestimonialForm
                    testimonial={editingTestimonial}
                    onSave={async () => {
                      await loadTestimonials();
                      setIsDialogOpen(false);
                      setEditingTestimonial(null);
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
            <CardTitle>All Testimonials</CardTitle>
            <CardDescription>
              {testimonials.length} customer testimonials
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Quote</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {testimonials.map((testimonial) => (
                  <TableRow key={testimonial._id}>
                    <TableCell>
                      <div className="font-medium">{testimonial.name}</div>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${i < testimonial.rating
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-300'
                              }`}
                          />
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="max-w-xs truncate text-sm">
                        "{testimonial.quote}"
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setEditingTestimonial(testimonial);
                            setIsDialogOpen(true);
                          }}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(testimonial._id)}
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

function TestimonialForm({ testimonial, onSave }: { testimonial: Testimonial | null; onSave: () => void }) {
  const [formData, setFormData] = useState({
    name: testimonial?.name || '',
    quote: testimonial?.quote || '',
    rating: testimonial?.rating || 5,
    avatarUrl: testimonial?.avatarUrl || '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (testimonial) {
        await apiService.updateTestimonial(testimonial._id, formData);
      } else {
        await apiService.createTestimonial(formData);
      }

      onSave();
    } catch (error) {
      console.error('Failed to save testimonial:', error);
      alert('Failed to save testimonial');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name">Customer Name</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="quote">Quote</Label>
        <Textarea
          id="quote"
          value={formData.quote}
          onChange={(e) => setFormData(prev => ({ ...prev, quote: e.target.value }))}
          placeholder="Enter customer testimonial"
          rows={4}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="rating">Rating</Label>
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setFormData(prev => ({ ...prev, rating: star }))}
              className="focus:outline-none"
            >
              <Star
                className={`h-6 w-6 ${star <= formData.rating
                    ? 'text-yellow-400 fill-current'
                    : 'text-gray-300'
                  }`}
              />
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="avatarUrl">Avatar URL (Optional)</Label>
        <div className="flex gap-2">
          <Input
            id="avatarUrl"
            value={formData.avatarUrl}
            onChange={(e) => setFormData(prev => ({ ...prev, avatarUrl: e.target.value }))}
            placeholder="Enter avatar image URL"
          />
          <Button
            variant="outline"
            size="sm"
            type="button"
            onClick={() => document.getElementById('avatarInput')?.click()}
          >
            <Upload className="h-4 w-4 mr-2" />
            Upload
          </Button>
        </div>
        <input
          id="avatarInput"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={async (e) => {
            const file = e.target.files?.[0];
            if (!file) return;

            try {
              const { url } = await apiService.uploadImage(file); // normalized return
              setFormData(prev => ({ ...prev, avatarUrl: url }));
            } catch (error: any) {
              console.error('Upload failed:', error);
              alert(error?.message || 'Failed to upload image');
            }
          }}

        />
      </div>

      <div className="flex justify-end gap-3">
        <Button type="button" variant="outline" onClick={() => onSave()}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
          {testimonial ? 'Update' : 'Create'} Testimonial
        </Button>
      </div>
    </form>
  );
}