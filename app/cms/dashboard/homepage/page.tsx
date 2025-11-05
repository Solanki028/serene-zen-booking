"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { AuthService } from "@/lib/auth";
import { apiService } from "@/lib/api";
import { Loader2, Save, Upload } from "lucide-react";

interface HomepageContent {
  heroHeadline: string;
  heroSubheadline: string;
  heroImage: string;
  trustBadges: Array<{
    icon: string;
    title: string;
    description: string;
  }>;
  featuredServiceIds: string[];
  membershipTeaser: {
    title: string;
    description: string;
    benefits: string[];
  };
  giftVoucherBanner: {
    title: string;
    description: string;
  };
}

export default function HomepageManagement() {
  const [content, setContent] = useState<HomepageContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const authenticated = await AuthService.verifyToken();
      setIsAuthenticated(authenticated);

      if (!authenticated) {
        router.push("/cms");
        return;
      }

      await loadContent();
    };

    checkAuth();
  }, [router]);

  const loadContent = async () => {
    try {
      const response = await apiService.getHomepageContent();
      if (response.success) {
        setContent(response.data);
      }
    } catch (error) {
      console.error('Failed to load homepage content:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    if (!content) return;

    setIsSaving(true);
    try {
      await apiService.updateHomepageContent(content);
      alert('Homepage content saved successfully!');
    } catch (error) {
      console.error('Failed to save homepage content:', error);
      alert('Failed to save homepage content');
    } finally {
      setIsSaving(false);
    }
  };

  const updateHero = (field: string, value: string) => {
    setContent(prev => prev ? {
      ...prev,
      [field]: value
    } : null);
  };

  // const updateTrustBadge = (index: number, field: string, value: string) => {
  //   setContent(prev => prev ? {
  //     ...prev,
  //     trustBadges: prev.trustBadges.map((badge, i) =>
  //       i === index ? { ...badge, [field]: value } : badge
  //     )
  //   } : null);
  // };

  const updateMembershipTeaser = (field: string, value: string | string[]) => {
    setContent(prev => prev ? {
      ...prev,
      membershipTeaser: {
        ...prev.membershipTeaser,
        [field]: value
      }
    } : null);
  };

  const updateGiftVoucherBanner = (field: string, value: string) => {
    setContent(prev => prev ? {
      ...prev,
      giftVoucherBanner: {
        ...prev.giftVoucherBanner,
        [field]: value
      }
    } : null);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated || !content) {
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
                Homepage Management
              </h1>
              <p className="text-sm text-gray-600">
                Customize your homepage content and layout
              </p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => router.push("/cms/dashboard")}>
                Back to Dashboard
              </Button>
              <Button onClick={handleSave} disabled={isSaving}>
                {isSaving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Save className="h-4 w-4 mr-2" />}
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Hero Section */}
        <Card>
          <CardHeader>
            <CardTitle>Hero Section</CardTitle>
            <CardDescription>
              Main banner content that appears at the top of your homepage
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="heroHeadline">Headline</Label>
              <Input
                id="heroHeadline"
                value={content.heroHeadline}
                onChange={(e) => updateHero('heroHeadline', e.target.value)}
                placeholder="Enter hero headline"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="heroSubheadline">Subheadline</Label>
              <Textarea
                id="heroSubheadline"
                value={content.heroSubheadline}
                onChange={(e) => updateHero('heroSubheadline', e.target.value)}
                placeholder="Enter hero subheadline"
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="heroImage">Background Image URL</Label>
              <div className="flex gap-2">
                <Input
                  id="heroImage"
                  value={content.heroImage}
                  onChange={(e) => updateHero('heroImage', e.target.value)}
                  placeholder="Enter image URL"
                />
                <Button
                  variant="outline"
                  size="sm"
                  type="button"
                  onClick={() => document.getElementById('heroImageInput')?.click()}
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Upload
                </Button>
              </div>
              <input
                id="heroImageInput"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                
                  try {
                    const { url } = await apiService.uploadImage(file); // ← new shape
                    updateHero('heroImage', url);
                  } catch (error: any) {
                    console.error('Upload failed:', error);
                    alert(error?.message || 'Failed to upload image');
                  }
                }}
                
              />
            </div>
          </CardContent>
        </Card>

     
       

        {/* Membership Teaser */}
        <Card>
          <CardHeader>
            <CardTitle>Membership Teaser</CardTitle>
            <CardDescription>
              Promotional section for membership programs
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="membershipTitle">Title</Label>
              <Input
                id="membershipTitle"
                value={content.membershipTeaser.title}
                onChange={(e) => updateMembershipTeaser('title', e.target.value)}
                placeholder="Enter membership teaser title"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="membershipDescription">Description</Label>
              <Textarea
                id="membershipDescription"
                value={content.membershipTeaser.description}
                onChange={(e) => updateMembershipTeaser('description', e.target.value)}
                placeholder="Enter membership teaser description"
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <Label>Benefits</Label>
              <Textarea
                value={content.membershipTeaser.benefits.join('\n')}
                onChange={(e) => updateMembershipTeaser('benefits', e.target.value.split('\n').filter(b => b.trim()))}
                placeholder="Enter benefits (one per line)"
                rows={6}
                style={{ whiteSpace: 'pre-wrap', resize: 'vertical' }}
              />
            </div>
          </CardContent>
        </Card>

        {/* Gift Voucher Banner */}
        <Card>
          <CardHeader>
            <CardTitle>Gift Voucher Banner</CardTitle>
            <CardDescription>
              Promotional banner for gift vouchers
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="voucherTitle">Title</Label>
              <Input
                id="voucherTitle"
                value={content.giftVoucherBanner.title}
                onChange={(e) => updateGiftVoucherBanner('title', e.target.value)}
                placeholder="Enter gift voucher title"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="voucherDescription">Description</Label>
              <Textarea
                id="voucherDescription"
                value={content.giftVoucherBanner.description}
                onChange={(e) => updateGiftVoucherBanner('description', e.target.value)}
                placeholder="Enter gift voucher description"
                rows={3}
              />
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}