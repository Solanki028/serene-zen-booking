"use client";

import { useEffect, useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Check, Sparkles, Loader2, Crown, Heart, Star } from "lucide-react";
import { apiService } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

interface Membership {
  _id: string;
  name: string;
  price: number;
  billingCycle: string;
  perks: string[];
  order: number;
  popular?: boolean;
}

export default function MembershipPage() {
  const [memberships, setMemberships] = useState<Membership[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  /* const [selectedMembership, setSelectedMembership] = useState<string>('');
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false); */
  /* const [registrationForm, setRegistrationForm] = useState({
    name: '',
    email: '',
    mobile: '',
    plan: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [selectedPlanName, setSelectedPlanName] = useState('');
  const { toast } = useToast(); */

  useEffect(() => {
    const loadMemberships = async () => {
      try {
        const response = await apiService.getMemberships();
        if (response.success) {
          // Sort by order and add popular flag to the middle one
          const sortedMemberships = response.data.sort((a: Membership, b: Membership) => a.order - b.order);
          const membershipsWithPopular = sortedMemberships.map((membership: Membership, index: number) => ({
            ...membership,
            popular: index === Math.floor(sortedMemberships.length / 2) // Make middle one popular
          }));
          setMemberships(membershipsWithPopular);
        }
      } catch (error) {
        console.error('Failed to load memberships:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadMemberships();
  }, []);

  /* const handleJoinNow = (membershipId: string) => {
    // Find the membership name for success message
    const membership = memberships.find(m => m._id === membershipId);
    setSelectedPlanName(membership?.name || '');

    // Open registration modal with selected membership
    setSelectedMembership(membershipId);
    setRegistrationForm(prev => ({ ...prev, plan: membershipId }));
    setIsRegistrationOpen(true);
  }; */

  /* const handleRegistrationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await apiService.createMemberRegistration(registrationForm);

      // Show success message instead of toast
      setShowSuccess(true);
      setIsRegistrationOpen(false);

      // Reset form
      setRegistrationForm({
        name: '',
        email: '',
        mobile: '',
        plan: '',
      });
    } catch (error: any) {
      toast({
        title: "Registration Failed",
        description: error.message || "Failed to submit registration. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }; */

  /* const handleCloseSuccess = () => {
    setShowSuccess(false);
  }; */

  if (isLoading) {
    return (
      <Layout>
        <div className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Membership Plans</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Invest in your wellness journey with exceptional value and exclusive benefits
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {memberships.map((membership, index) => (
              <motion.div
                key={membership._id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={membership.popular ? "md:-mt-4 md:mb-4" : ""}
              >
                <Card className={`h-full relative ${membership.popular ? "border-2 border-secondary shadow-xl" : ""}`}>
                  {membership.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <div className="bg-secondary text-secondary-foreground px-6 py-2 rounded-full flex items-center gap-2 shadow-lg">
                        <Sparkles className="h-4 w-4" />
                        <span className="text-sm font-semibold">Most Popular</span>
                      </div>
                    </div>
                  )}
                  <CardHeader className="text-center pb-8 pt-10">
                    <h3 className="text-2xl font-bold mb-2">{membership.name}</h3>
                    <div className="mb-2">
                      <span className="text-5xl font-bold">₹{membership.price}</span>
                      <span className="text-muted-foreground">/{membership.billingCycle}</span>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <ul className="space-y-4">
                      {membership.perks.map((perk) => (
                        <li key={perk} className="flex items-start gap-3">
                          <div className="flex-shrink-0 w-6 h-6 rounded-full bg-secondary/20 flex items-center justify-center mt-0.5">
                            <Check className="h-4 w-4 text-secondary" />
                          </div>
                          <span className="text-sm leading-relaxed">{perk}</span>
                        </li>
                      ))}
                    </ul>
                    {/* <Button
                      onClick={() => handleJoinNow(membership._id)}
                      className="w-full"
                      variant={membership.popular ? "default" : "outline"}
                    >
                      Join {membership.name}
                    </Button> */}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-16 max-w-3xl mx-auto"
          >
            <Card>
              <CardContent className="p-8">
                <h3 className="text-xl font-semibold mb-4">Membership Terms</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• All memberships require a 3-month minimum commitment</li>
                  <li>• Unused sessions can be rolled over according to your plan limits</li>
                  <li>• Membership discounts cannot be combined with other promotions</li>
                  <li>• Cancel anytime after the initial commitment period with 30 days notice</li>
                  <li>• Membership benefits are non-transferable</li>
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>

      {/* Success Modal */}
      {/* <Dialog open={showSuccess} onOpenChange={handleCloseSuccess}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader className="sr-only">
            <DialogTitle>Membership Registration Confirmation</DialogTitle>
            <DialogDescription>Membership registration completed successfully</DialogDescription>
          </DialogHeader>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="text-center py-8"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-20 h-20 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <Crown className="h-10 w-10 text-purple-600" />
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-2xl font-bold text-gray-900 mb-2"
            >
              Welcome to {selectedPlanName}! 🌟
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-gray-600 mb-6 leading-relaxed"
            >
              Congratulations! You've successfully joined our premium wellness community. Your membership journey begins now with exclusive benefits and personalized care.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4 mb-6"
            >
              <div className="flex items-center justify-center gap-2 text-purple-700 font-medium mb-3">
                <Heart className="h-4 w-4" />
                <span>Your Membership Benefits</span>
              </div>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Priority booking for all services</li>
                <li>• Exclusive member-only treatments</li>
                <li>• Personalized wellness consultations</li>
                <li>• Complimentary monthly wellness check-ins</li>
                <li>• Special member pricing on all services</li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4 mb-6"
            >
              <div className="flex items-center justify-center gap-2 text-green-700 font-medium mb-2">
                <Star className="h-4 w-4" />
                <span>Next Steps</span>
              </div>
              <p className="text-sm text-gray-600">
                Our membership coordinator will contact you within 24 hours to activate your membership and schedule your welcome session.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <Button onClick={handleCloseSuccess} className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                Start Your Wellness Journey
              </Button>
            </motion.div>
          </motion.div>
        </DialogContent>
      </Dialog> */}

      {/* Registration Modal */}
      {/* <Dialog open={isRegistrationOpen} onOpenChange={setIsRegistrationOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Membership Registration</DialogTitle>
            <DialogDescription>
              Fill in your details to register for this membership plan.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleRegistrationSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="reg-name">Full Name *</Label>
              <Input
                id="reg-name"
                value={registrationForm.name}
                onChange={(e) => setRegistrationForm(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Enter your full name"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="reg-email">Email Address *</Label>
              <Input
                id="reg-email"
                type="email"
                value={registrationForm.email}
                onChange={(e) => setRegistrationForm(prev => ({ ...prev, email: e.target.value }))}
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="reg-mobile">Mobile Number *</Label>
              <Input
                id="reg-mobile"
                type="tel"
                value={registrationForm.mobile}
                onChange={(e) => setRegistrationForm(prev => ({ ...prev, mobile: e.target.value }))}
                placeholder="Enter your mobile number"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="reg-plan">Selected Plan</Label>
              <Select
                value={registrationForm.plan}
                onValueChange={(value) => setRegistrationForm(prev => ({ ...prev, plan: value }))}
                disabled
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {memberships.map((membership) => (
                    <SelectItem key={membership._id} value={membership._id}>
                      {membership.name} - ₹{membership.price}/{membership.billingCycle}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsRegistrationOpen(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting} className="flex-1">
                {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                Register Now
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog> */}
    </Layout>
  );
}