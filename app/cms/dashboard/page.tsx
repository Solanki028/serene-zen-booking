"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { AuthService } from "@/lib/auth";
import {
  LayoutDashboard,
  Users,
  Settings,
  FileText,
  Image,
  LogOut,
  Loader2,
  CheckCircle,
  AlertCircle
} from "lucide-react";

export default function CMSDashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const authenticated = await AuthService.verifyToken();
      setIsAuthenticated(authenticated);

      if (!authenticated) {
        router.push("/cms");
      }

      setIsLoading(false);
    };

    checkAuth();
  }, [router]);

  const handleLogout = () => {
    AuthService.logout();
    router.push("/cms");
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

  const admin = AuthService.getAdmin();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-3">
              <LayoutDashboard className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-2xl font-serif font-bold text-gray-900">
                  Aroma Thai Spa CMS
                </h1>
                <p className="text-sm text-gray-600">
                  Welcome back, {admin?.email}
                </p>
              </div>
            </div>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="homepage">Homepage</TabsTrigger>
            <TabsTrigger value="services">Services</TabsTrigger>
            <TabsTrigger value="memberships">Memberships</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Services</CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">4</div>
                  <p className="text-xs text-muted-foreground">
                    Active services
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Memberships</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">3</div>
                  <p className="text-xs text-muted-foreground">
                    Available plans
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Testimonials</CardTitle>
                  <CheckCircle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">4</div>
                  <p className="text-xs text-muted-foreground">
                    Customer reviews
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">System Status</CardTitle>
                  <AlertCircle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <Badge variant="secondary" className="text-green-600 bg-green-100">
                    Online
                  </Badge>
                  <p className="text-xs text-muted-foreground mt-1">
                    All systems operational
                  </p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>
                  Common management tasks
                </CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Button variant="outline" className="h-20 flex-col gap-2">
                  <FileText className="h-6 w-6" />
                  Edit Homepage
                </Button>
                <Button variant="outline" className="h-20 flex-col gap-2">
                  <Users className="h-6 w-6" />
                  Manage Services
                </Button>
                <Button variant="outline" className="h-20 flex-col gap-2">
                  <Settings className="h-6 w-6" />
                  Update Settings
                </Button>
                <Button variant="outline" className="h-20 flex-col gap-2">
                  <Image className="h-6 w-6" />
                  Media Library
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="homepage">
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Homepage Management</CardTitle>
                  <CardDescription>
                    Manage hero section, trust badges, and featured content
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button onClick={() => router.push("/cms/dashboard/homepage")}>
                    Open Homepage Editor
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="services">
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Services Management</CardTitle>
                  <CardDescription>
                    Add, edit, and manage spa services
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button onClick={() => router.push("/cms/dashboard/services")}>
                    Manage Services
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="memberships">
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Membership Management</CardTitle>
                  <CardDescription>
                    Manage membership plans and pricing
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button onClick={() => router.push("/cms/dashboard/memberships")}>
                    Manage Memberships
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="testimonials">
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Testimonials Management</CardTitle>
                  <CardDescription>
                    Manage customer reviews and ratings
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button onClick={() => router.push("/cms/dashboard/testimonials")}>
                    Manage Testimonials
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="settings">
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Settings</CardTitle>
                  <CardDescription>
                    Configure global settings and preferences
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button onClick={() => router.push("/cms/dashboard/settings")}>
                    Open Settings
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}