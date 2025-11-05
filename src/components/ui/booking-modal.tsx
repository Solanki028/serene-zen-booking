"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Calendar, Clock, Loader2, User, Mail, Phone, MapPin, CheckCircle, Sparkles, DollarSign } from "lucide-react";
import { apiService } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Category {
  _id: string;
  name: string;
  slug: string;
}

interface Service {
  _id: string;
  title: string;
  category: Category;
  durations: { minutes: number; price: number }[];
}

const timeSlots = [
  "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM",
  "3:00 PM", "4:00 PM", "5:00 PM", "6:00 PM", "7:00 PM",
  "8:00 PM", "9:00 PM"
];

export const BookingModal = ({ isOpen, onClose }: BookingModalProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    address: '',
    bookingDate: '',
    bookingTime: '',
    notes: '',
    serviceCategory: '',
    serviceId: '',
    serviceDuration: '',
    servicePrice: 0,
  });
  const [categories, setCategories] = useState<Category[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [filteredServices, setFilteredServices] = useState<Service[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await apiService.createBooking(formData);

      // Show success message instead of toast
      setShowSuccess(true);

      // Reset form
      setFormData({
        name: '',
        email: '',
        mobile: '',
        address: '',
        bookingDate: '',
        bookingTime: '',
        notes: '',
        serviceCategory: '',
        serviceId: '',
        serviceDuration: '',
        servicePrice: 0,
      });
    } catch (error: any) {
      toast({
        title: "Booking Failed",
        description: error.message || "Failed to submit booking. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseSuccess = () => {
    setShowSuccess(false);
    onClose();
  };

  // Get minimum date (today)
  const today = new Date().toISOString().split('T')[0];

  // Load categories and services on modal open
  useEffect(() => {
    const loadData = async () => {
      if (isOpen) {
        try {
          // Load categories
          const categoriesResponse = await fetch('/api/categories');
          const categoriesData = await categoriesResponse.json();
          if (categoriesData.success) {
            setCategories(categoriesData.data);
          }

          // Load all services
          const servicesResponse = await fetch('/api/services');
          const servicesData = await servicesResponse.json();
          if (servicesData.success) {
            setServices(servicesData.data);
          }
        } catch (error) {
          console.error('Failed to load service data:', error);
        }
      }
    };

    loadData();
  }, [isOpen]);

  // Handle category change
  const handleCategoryChange = (categoryId: string) => {
    setFormData(prev => ({
      ...prev,
      serviceCategory: categoryId,
      serviceId: '',
      serviceDuration: '',
      servicePrice: 0,
    }));

    // Filter services by category
    const filtered = services.filter(service => service.category._id === categoryId);
    setFilteredServices(filtered);
  };

  // Handle service change
  const handleServiceChange = (serviceId: string) => {
    setFormData(prev => ({
      ...prev,
      serviceId,
      serviceDuration: '',
      servicePrice: 0,
    }));
  };

  // Handle duration change
  const handleDurationChange = (durationStr: string) => {
    const [minutes, price] = durationStr.split('-').map(s => s.trim());
    setFormData(prev => ({
      ...prev,
      serviceDuration: durationStr,
      servicePrice: parseInt(price),
    }));
  };

  return (
    <>
      {/* Success Modal */}
      <Dialog open={showSuccess} onOpenChange={handleCloseSuccess}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader className="sr-only">
            <DialogTitle>Booking Confirmation</DialogTitle>
            <DialogDescription>Booking confirmed successfully</DialogDescription>
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
              className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <CheckCircle className="h-10 w-10 text-green-600" />
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-2xl font-bold text-gray-900 mb-4"
            >
              Booking Confirmed! 🎉
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-gray-600 mb-6 leading-relaxed"
            >
              Your wellness session has been successfully booked! Our team will contact you within 24 hours to confirm your appointment details and provide any additional information you may need.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-4 mb-6"
            >
              <div className="flex items-center justify-center gap-2 text-primary font-medium">
                <Sparkles className="h-4 w-4" />
                <span>What happens next?</span>
              </div>
              <ul className="text-sm text-gray-600 mt-2 space-y-1">
                <li>• Our wellness consultant will call you</li>
                <li>• Appointment confirmation via email/SMS</li>
                <li>• Pre-session wellness consultation</li>
                <li>• Special preparation instructions</li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Button onClick={handleCloseSuccess} className="w-full">
                Continue Exploring
              </Button>
            </motion.div>
          </motion.div>
        </DialogContent>
      </Dialog>

      {/* Booking Form Modal */}
      <Dialog open={isOpen && !showSuccess} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-xl">
              <Calendar className="h-5 w-5 text-primary" />
              Book Your Session
            </DialogTitle>
            <DialogDescription>
              Fill in your details to schedule your wellness session. We'll confirm your booking shortly.
            </DialogDescription>
          </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Service Selection */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Service Selection</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="serviceCategory" className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4" />
                  Service Category *
                </Label>
                <Select value={formData.serviceCategory} onValueChange={handleCategoryChange}>
                  <SelectTrigger className="h-11">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category._id} value={category._id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="serviceId" className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4" />
                  Service Type *
                </Label>
                <Select
                  value={formData.serviceId}
                  onValueChange={handleServiceChange}
                  disabled={!formData.serviceCategory}
                >
                  <SelectTrigger className="h-11">
                    <SelectValue placeholder="Select service" />
                  </SelectTrigger>
                  <SelectContent>
                    {filteredServices.map((service) => (
                      <SelectItem key={service._id} value={service._id}>
                        {service.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="serviceDuration" className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Service Duration *
                </Label>
                <Select
                  value={formData.serviceDuration}
                  onValueChange={handleDurationChange}
                  disabled={!formData.serviceId}
                >
                  <SelectTrigger className="h-11">
                    <SelectValue placeholder="Select duration" />
                  </SelectTrigger>
                  <SelectContent>
                    {services.find(s => s._id === formData.serviceId)?.durations.map((duration, idx) => (
                      <SelectItem key={idx} value={`${duration.minutes}-${duration.price}`}>
                        {duration.minutes} minutes - ₹{duration.price}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4" />
                  Total Price
                </Label>
                <div className="h-11 px-3 py-2 bg-gray-50 border border-gray-200 rounded-md flex items-center">
                  <span className="text-lg font-bold text-green-600">
                    ₹{formData.servicePrice || 0}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Personal Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Personal Information</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Full Name *
                </Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Enter your full name"
                  required
                  className="h-11"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Email Address *
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="Enter your email address"
                  required
                  className="h-11"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="mobile" className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  Mobile Number *
                </Label>
                <Input
                  id="mobile"
                  type="tel"
                  value={formData.mobile}
                  onChange={(e) => handleInputChange('mobile', e.target.value)}
                  placeholder="Enter your mobile number"
                  required
                  className="h-11"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="address" className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Address *
                </Label>
                <Textarea
                  id="address"
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  placeholder="Enter your complete address"
                  rows={3}
                  required
                  className="resize-none"
                />
              </div>
            </div>
          </div>

          {/* Booking Details */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Booking Details</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="bookingDate" className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Preferred Date *
                </Label>
                <Input
                  id="bookingDate"
                  type="date"
                  value={formData.bookingDate}
                  onChange={(e) => handleInputChange('bookingDate', e.target.value)}
                  min={today}
                  required
                  className="h-11"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bookingTime" className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Preferred Time *
                </Label>
                <Select value={formData.bookingTime} onValueChange={(value) => handleInputChange('bookingTime', value)}>
                  <SelectTrigger className="h-11">
                    <SelectValue placeholder="Select time" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeSlots.map((time) => (
                      <SelectItem key={time} value={time}>
                        {time}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Notes Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Additional Information</h3>

            <div className="space-y-2">
              <Label htmlFor="notes">Note/Request if any</Label>
              <Textarea
                id="notes"
                value={formData.notes}
                onChange={(e) => handleInputChange('notes', e.target.value)}
                placeholder="Any special requests or notes..."
                rows={3}
                className="resize-none"
              />
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex gap-3 pt-6 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1 h-11"
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 h-11"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Submitting...
                </>
              ) : (
                <>
                  <Calendar className="h-4 w-4 mr-2" />
                  Book Session
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
    </>
  );
};