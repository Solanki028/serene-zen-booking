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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Loader2,
  Plus,
  Edit,
  Trash2,
 
} from "lucide-react";

interface Membership {
  _id: string;
  name: string;
  price: number;
  billingCycle: string;
  perks: string[];
  terms?: string;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export default function MembershipsManagement() {
  const [memberships, setMemberships] = useState<Membership[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingMembership, setEditingMembership] = useState<Membership | null>(null);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const authenticated = await AuthService.verifyToken();
      setIsAuthenticated(authenticated);

      if (!authenticated) {
        router.push("/cms");
        return;
      }

      await loadMemberships();
    };

    checkAuth();
  }, [router]);

  const loadMemberships = async () => {
    try {
      const response = await apiService.getMemberships();
      if (response.success) {
        setMemberships(response.data);
      }
    } catch (error) {
      console.error('Failed to load memberships:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (membershipId: string) => {
    if (!confirm('Are you sure you want to delete this membership?')) return;

    try {
      await apiService.deleteMembership(membershipId);
      await loadMemberships();
    } catch (error) {
      console.error('Failed to delete membership:', error);
      alert('Failed to delete membership');
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
                Memberships Management
              </h1>
              <p className="text-sm text-gray-600">
                Manage membership plans and pricing
              </p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => router.push("/cms/dashboard")}>
                Back to Dashboard
              </Button>
              
              {/* <Button variant="secondary" onClick={() => router.push("/cms/dashboard/memberships/registrations")}>
                View Registrations
              </Button> */}


              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button onClick={() => setEditingMembership(null)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Membership
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>
                      {editingMembership ? 'Edit Membership' : 'Add New Membership'}
                    </DialogTitle>
                    <DialogDescription>
                      Configure membership details and pricing.
                    </DialogDescription>
                  </DialogHeader>
                  <MembershipForm
                    membership={editingMembership}
                    onSave={async () => {
                      await loadMemberships();
                      setIsDialogOpen(false);
                      setEditingMembership(null);
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
            <CardTitle>All Memberships</CardTitle>
            <CardDescription>
              {memberships.length} membership plans total
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Billing Cycle</TableHead>
                  <TableHead>Perks</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {memberships.map((membership) => (
                  <TableRow key={membership._id}>
                    <TableCell>
                      <div className="font-medium">{membership.name}</div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <span className="font-medium">₹{membership.price}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">{membership.billingCycle}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        {membership.perks.slice(0, 2).join(', ')}
                        {membership.perks.length > 2 && ` +${membership.perks.length - 2} more`}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setEditingMembership(membership);
                            setIsDialogOpen(true);
                          }}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(membership._id)}
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

function MembershipForm({ membership, onSave }: { membership: Membership | null; onSave: () => void }) {
  const [formData, setFormData] = useState({
    name: membership?.name || '',
    price: membership?.price || 0,
    billingCycle: membership?.billingCycle || 'monthly',
    perks: membership?.perks || [''],
    terms: membership?.terms || '',
    order: membership?.order || 0,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Clean up empty perks
      const cleanData = {
        ...formData,
        perks: formData.perks.filter(p => p.trim()),
      };

      if (membership) {
        await apiService.updateMembership(membership._id, cleanData);
      } else {
        await apiService.createMembership(cleanData);
      }

      onSave();
    } catch (error) {
      console.error('Failed to save membership:', error);
      alert('Failed to save membership');
    } finally {
      setIsSubmitting(false);
    }
  };

  const addPerk = () => {
    setFormData(prev => ({
      ...prev,
      perks: [...prev.perks, '']
    }));
  };

  const updatePerk = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      perks: prev.perks.map((p, i) => i === index ? value : p)
    }));
  };

  const removePerk = (index: number) => {
    setFormData(prev => ({
      ...prev,
      perks: prev.perks.filter((_, i) => i !== index)
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="price">Price (₹)</Label>
          <Input
            id="price"
            type="number"
            step="0.01"
            value={formData.price}
            onChange={(e) => setFormData(prev => ({ ...prev, price: parseFloat(e.target.value) || 0 }))}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="billingCycle">Billing Cycle</Label>
        <Select value={formData.billingCycle} onValueChange={(value) => setFormData(prev => ({ ...prev, billingCycle: value }))}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="monthly">Monthly</SelectItem>
            <SelectItem value="yearly">Yearly</SelectItem>
            <SelectItem value="one-time">One-time</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Perks</Label>
        {formData.perks.map((perk, index) => (
          <div key={index} className="flex gap-2">
            <Input
              value={perk}
              onChange={(e) => updatePerk(index, e.target.value)}
              placeholder="Enter perk"
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => removePerk(index)}
            >
              Remove
            </Button>
          </div>
        ))}
        <Button type="button" variant="outline" onClick={addPerk}>
          Add Perk
        </Button>
      </div>

      <div className="space-y-2">
        <Label htmlFor="terms">Terms (Optional)</Label>
        <Textarea
          id="terms"
          value={formData.terms}
          onChange={(e) => setFormData(prev => ({ ...prev, terms: e.target.value }))}
          placeholder="Enter membership terms and conditions"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="order">Display Order</Label>
        <Input
          id="order"
          type="number"
          value={formData.order}
          onChange={(e) => setFormData(prev => ({ ...prev, order: parseInt(e.target.value) || 0 }))}
        />
      </div>

      <div className="flex justify-end gap-3">
        <Button type="button" variant="outline" onClick={() => onSave()}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
          {membership ? 'Update' : 'Create'} Membership
        </Button>
      </div>
    </form>
  );
}