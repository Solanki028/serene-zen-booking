"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Calendar, Clock, Loader2, User, Mail, Phone, MapPin, CheckCircle, Sparkles, DollarSign, ArrowRight, ArrowLeft } from "lucide-react";
import { apiService } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";

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
  const [currentStep, setCurrentStep] = useState(1);
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
      setShowSuccess(true);
      setCurrentStep(1);
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

  const today = new Date().toISOString().split('T')[0];

  useEffect(() => {
    const loadData = async () => {
      if (isOpen) {
        try {
          const categoriesResponse = await fetch('/api/categories');
          const categoriesData = await categoriesResponse.json();
          if (categoriesData.success) {
            setCategories(categoriesData.data);
          }

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

  const handleCategoryChange = (categoryId: string) => {
    setFormData(prev => ({
      ...prev,
      serviceCategory: categoryId,
      serviceId: '',
      serviceDuration: '',
      servicePrice: 0,
    }));

    const filtered = services.filter(service => service.category._id === categoryId);
    setFilteredServices(filtered);
  };

  const handleServiceChange = (serviceId: string) => {
    setFormData(prev => ({
      ...prev,
      serviceId,
      serviceDuration: '',
      servicePrice: 0,
    }));
  };

  const handleDurationChange = (durationStr: string) => {
    const [minutes, price] = durationStr.split('-').map(s => s.trim());
    setFormData(prev => ({
      ...prev,
      serviceDuration: durationStr,
      servicePrice: parseInt(price),
    }));
  };

  const canProceedToStep2 = formData.serviceCategory && formData.serviceId && formData.serviceDuration;
  const canProceedToStep3 = formData.name && formData.email && formData.mobile && formData.address;

  return (
    <>
      {/* Success Modal */}
      <Dialog open={showSuccess} onOpenChange={handleCloseSuccess}>
        <DialogContent className="sm:max-w-lg border-0 bg-gradient-to-br from-white via-purple-50/30 to-pink-50/30 backdrop-blur-xl shadow-2xl">
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
              className="relative w-24 h-24 mx-auto mb-6"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full blur-xl opacity-50 animate-pulse"></div>
              <div className="relative w-24 h-24 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center shadow-xl">
                <CheckCircle className="h-12 w-12 text-green-600" />
              </div>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-3xl font-serif font-bold bg-gradient-to-r from-purple-700 to-pink-600 bg-clip-text text-transparent mb-4"
            >
              Booking Confirmed! 🎉
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-gray-600 mb-6 leading-relaxed px-4"
            >
              Your wellness session has been successfully booked! Our team will contact you within 24 hours to confirm your appointment details and provide any additional information you may need.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 mb-6 border-2 border-purple-100"
            >
              <div className="flex items-center justify-center gap-2 text-purple-700 font-semibold mb-3">
                <Sparkles className="h-5 w-5" />
                <span>What happens next?</span>
              </div>
              <ul className="text-sm text-gray-600 space-y-2 text-left">
                <li className="flex items-start gap-2">
                  <span className="text-purple-500 font-bold">•</span>
                  <span>Our wellness consultant will call you</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-500 font-bold">•</span>
                  <span>Appointment confirmation via email/SMS</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-500 font-bold">•</span>
                  <span>Pre-session wellness consultation</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-500 font-bold">•</span>
                  <span>Special preparation instructions</span>
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Button 
                onClick={handleCloseSuccess} 
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Continue Exploring
              </Button>
            </motion.div>
          </motion.div>
        </DialogContent>
      </Dialog>

      {/* Booking Form Modal */}
      <Dialog open={isOpen && !showSuccess} onOpenChange={onClose}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden border-0 bg-gradient-to-br from-white via-purple-50/20 to-pink-50/20 backdrop-blur-xl shadow-2xl p-0">
          {/* Decorative background elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-20 -left-20 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '1s' }}></div>
          </div>

          <div className="relative">
            {/* Header */}
            <div className="border-b border-purple-100 bg-white/80 backdrop-blur-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl blur-lg opacity-50"></div>
                    <div className="relative bg-gradient-to-br from-purple-600 to-pink-600 p-2.5 rounded-xl">
                      <Sparkles className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <div>
                    <DialogTitle className="text-2xl font-serif font-bold bg-gradient-to-r from-purple-700 to-pink-600 bg-clip-text text-transparent">
                      Book Your Wellness Session
                    </DialogTitle>
                    <DialogDescription className="text-gray-600 mt-1">
                      Experience tranquility and rejuvenation
                    </DialogDescription>
                  </div>
                </div>
              </div>

              {/* Progress Steps */}
              <div className="flex items-center justify-between max-w-md mx-auto">
                {[1, 2, 3].map((step) => (
                  <div key={step} className="flex items-center flex-1">
                    <div className="flex flex-col items-center flex-1">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all duration-300 ${
                        currentStep >= step 
                          ? 'bg-gradient-to-br from-purple-600 to-pink-600 text-white shadow-lg scale-110' 
                          : 'bg-gray-200 text-gray-500'
                      }`}>
                        {step}
                      </div>
                      <span className={`text-xs mt-2 font-medium ${
                        currentStep >= step ? 'text-purple-700' : 'text-gray-500'
                      }`}>
                        {step === 1 ? 'Service' : step === 2 ? 'Details' : 'Confirm'}
                      </span>
                    </div>
                    {step < 3 && (
                      <div className={`h-1 flex-1 mx-2 rounded-full transition-all duration-300 ${
                        currentStep > step ? 'bg-gradient-to-r from-purple-600 to-pink-600' : 'bg-gray-200'
                      }`}></div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Form Content */}
            <form onSubmit={handleSubmit} className="overflow-y-auto max-h-[calc(90vh-250px)] p-8">
              <AnimatePresence mode="wait">
                {/* Step 1: Service Selection */}
                {currentStep === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    <div className="text-center mb-8">
                      <h3 className="text-2xl font-serif font-bold bg-gradient-to-r from-purple-700 to-pink-600 bg-clip-text text-transparent mb-2">
                        Choose Your Experience
                      </h3>
                      <p className="text-gray-600">Select your preferred service and duration</p>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="serviceCategory" className="flex items-center gap-2 text-gray-700 font-semibold">
                          <Sparkles className="h-4 w-4 text-purple-600" />
                          Service Category *
                        </Label>
                        <Select value={formData.serviceCategory} onValueChange={handleCategoryChange}>
                          <SelectTrigger className="h-12 border-2 border-purple-100 focus:border-purple-400 bg-white/80 backdrop-blur-sm hover:bg-purple-50/50 transition-all duration-300">
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
                        <Label htmlFor="serviceId" className="flex items-center gap-2 text-gray-700 font-semibold">
                          <Sparkles className="h-4 w-4 text-pink-600" />
                          Service Type *
                        </Label>
                        <Select
                          value={formData.serviceId}
                          onValueChange={handleServiceChange}
                          disabled={!formData.serviceCategory}
                        >
                          <SelectTrigger className="h-12 border-2 border-pink-100 focus:border-pink-400 bg-white/80 backdrop-blur-sm hover:bg-pink-50/50 transition-all duration-300">
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
                        <Label htmlFor="serviceDuration" className="flex items-center gap-2 text-gray-700 font-semibold">
                          <Clock className="h-4 w-4 text-amber-600" />
                          Service Duration *
                        </Label>
                        <Select
                          value={formData.serviceDuration}
                          onValueChange={handleDurationChange}
                          disabled={!formData.serviceId}
                        >
                          <SelectTrigger className="h-12 border-2 border-amber-100 focus:border-amber-400 bg-white/80 backdrop-blur-sm hover:bg-amber-50/50 transition-all duration-300">
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
                        <Label className="flex items-center gap-2 text-gray-700 font-semibold">
                          <DollarSign className="h-4 w-4 text-green-600" />
                          Total Investment
                        </Label>
                        <div className="h-12 px-4 py-2 bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-lg flex items-center justify-center shadow-inner">
                          <span className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                            ₹{formData.servicePrice || 0}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 2: Personal Information */}
                {currentStep === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    <div className="text-center mb-8">
                      <h3 className="text-2xl font-serif font-bold bg-gradient-to-r from-purple-700 to-pink-600 bg-clip-text text-transparent mb-2">
                        Your Information
                      </h3>
                      <p className="text-gray-600">Let us know how to reach you</p>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="flex items-center gap-2 text-gray-700 font-semibold">
                          <User className="h-4 w-4 text-purple-600" />
                          Full Name *
                        </Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          placeholder="Enter your full name"
                          required
                          className="h-12 border-2 border-purple-100 focus:border-purple-400 bg-white/80 backdrop-blur-sm hover:bg-purple-50/50 transition-all duration-300"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email" className="flex items-center gap-2 text-gray-700 font-semibold">
                          <Mail className="h-4 w-4 text-pink-600" />
                          Email Address *
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          placeholder="Enter your email address"
                          required
                          className="h-12 border-2 border-pink-100 focus:border-pink-400 bg-white/80 backdrop-blur-sm hover:bg-pink-50/50 transition-all duration-300"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="mobile" className="flex items-center gap-2 text-gray-700 font-semibold">
                          <Phone className="h-4 w-4 text-amber-600" />
                          Mobile Number *
                        </Label>
                        <Input
                          id="mobile"
                          type="tel"
                          value={formData.mobile}
                          onChange={(e) => handleInputChange('mobile', e.target.value)}
                          placeholder="Enter your mobile number"
                          required
                          className="h-12 border-2 border-amber-100 focus:border-amber-400 bg-white/80 backdrop-blur-sm hover:bg-amber-50/50 transition-all duration-300"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="address" className="flex items-center gap-2 text-gray-700 font-semibold">
                          <MapPin className="h-4 w-4 text-green-600" />
                          Address *
                        </Label>
                        <Textarea
                          id="address"
                          value={formData.address}
                          onChange={(e) => handleInputChange('address', e.target.value)}
                          placeholder="Enter your complete address"
                          rows={3}
                          required
                          className="resize-none border-2 border-green-100 focus:border-green-400 bg-white/80 backdrop-blur-sm hover:bg-green-50/50 transition-all duration-300"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Booking Details */}
                {currentStep === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    <div className="text-center mb-8">
                      <h3 className="text-2xl font-serif font-bold bg-gradient-to-r from-purple-700 to-pink-600 bg-clip-text text-transparent mb-2">
                        Schedule Your Visit
                      </h3>
                      <p className="text-gray-600">Choose your preferred date and time</p>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="bookingDate" className="flex items-center gap-2 text-gray-700 font-semibold">
                          <Calendar className="h-4 w-4 text-purple-600" />
                          Preferred Date *
                        </Label>
                        <Input
                          id="bookingDate"
                          type="date"
                          value={formData.bookingDate}
                          onChange={(e) => handleInputChange('bookingDate', e.target.value)}
                          min={today}
                          required
                          className="h-12 border-2 border-purple-100 focus:border-purple-400 bg-white/80 backdrop-blur-sm hover:bg-purple-50/50 transition-all duration-300"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="bookingTime" className="flex items-center gap-2 text-gray-700 font-semibold">
                          <Clock className="h-4 w-4 text-pink-600" />
                          Preferred Time *
                        </Label>
                        <Select value={formData.bookingTime} onValueChange={(value) => handleInputChange('bookingTime', value)}>
                          <SelectTrigger className="h-12 border-2 border-pink-100 focus:border-pink-400 bg-white/80 backdrop-blur-sm hover:bg-pink-50/50 transition-all duration-300">
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

                      <div className="space-y-2 col-span-2">
                        <Label htmlFor="notes" className="flex items-center gap-2 text-gray-700 font-semibold">
                          <Sparkles className="h-4 w-4 text-amber-600" />
                          Special Requests
                        </Label>
                        <Textarea
                          id="notes"
                          value={formData.notes}
                          onChange={(e) => handleInputChange('notes', e.target.value)}
                          placeholder="Any special requests or preferences..."
                          rows={4}
                          className="resize-none border-2 border-amber-100 focus:border-amber-400 bg-white/80 backdrop-blur-sm hover:bg-amber-50/50 transition-all duration-300"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Navigation Buttons */}
              <div className="flex gap-4 pt-8 mt-8 border-t-2 border-purple-100">
                {currentStep > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setCurrentStep(currentStep - 1)}
                    className="flex-1 h-12 border-2 border-purple-200 hover:border-purple-400 hover:bg-purple-50 transition-all duration-300"
                    disabled={isSubmitting}
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back
                  </Button>
                )}

                {currentStep === 1 && (
                  <Button
                    type="button"
                    onClick={onClose}
                    variant="outline"
                    className="flex-1 h-12 border-2 border-gray-200 hover:border-gray-400 hover:bg-gray-50 transition-all duration-300"
                  >
                    Cancel
                  </Button>
                )}

                {currentStep < 3 ? (
                  <Button
                    type="button"
                    onClick={() => setCurrentStep(currentStep + 1)}
                    disabled={(currentStep === 1 && !canProceedToStep2) || (currentStep === 2 && !canProceedToStep3)}
                    className="flex-1 h-12 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    Continue
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    className="flex-1 h-12 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin mr-2" />
                        Confirming...
                      </>
                    ) : (
                      <>
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Confirm Booking
                      </>
                    )}
                  </Button>
                )}
              </div>
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};