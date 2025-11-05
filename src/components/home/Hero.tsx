"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Calendar, ArrowRight } from "lucide-react";
import { apiService } from "@/lib/api";
import { BookingModal } from "@/components/ui/booking-modal";

interface HomepageContent {
  heroHeadline: string;
  heroSubheadline: string;
  heroImage: string;
}

export const Hero = () => {
  const [content, setContent] = useState<HomepageContent>({
    heroHeadline: "Authentic Thai Massage & Wellness",
    heroSubheadline: "Experience the healing traditions of Thailand. Expert therapists, serene environment, personalized care since 2008.",
    heroImage: "/assets/hero-spa.jpg"
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadContent = async () => {
      try {
        const response = await apiService.getHomepageContent();
        if (response.success) {
          setContent({
            heroHeadline: response.data.heroHeadline,
            heroSubheadline: response.data.heroSubheadline,
            heroImage: response.data.heroImage,
          });
        }
      } catch (error) {
        console.error('Failed to load hero content:', error);
        // Keep default content on error
      } finally {
        setIsLoading(false);
      }
    };

    loadContent();
  }, []);

  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  const handleBookNow = () => {
    setIsBookingModalOpen(true);
  };

  if (isLoading) {
    return (
      <section className="relative h-[90vh] min-h-[600px] flex items-center overflow-hidden bg-gray-200">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl">
            <div className="animate-pulse">
              <div className="h-16 bg-gray-300 rounded mb-6"></div>
              <div className="h-6 bg-gray-300 rounded mb-4"></div>
              <div className="h-6 bg-gray-300 rounded mb-8 w-3/4"></div>
              <div className="flex gap-4">
                <div className="h-12 bg-gray-300 rounded w-32"></div>
                <div className="h-12 bg-gray-300 rounded w-40"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative h-[90vh] min-h-[600px] flex items-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${content.heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/60" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-primary-foreground mb-6 leading-tight">
              {content.heroHeadline}
            </h1>
            <p className="text-xl md:text-2xl text-primary-foreground/90 mb-8 leading-relaxed">
              {content.heroSubheadline}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                onClick={handleBookNow}
                className="gap-2 text-lg px-8 py-6"
              >
                <Calendar className="h-5 w-5" />
                Book Now
              </Button>
              <Button
                size="lg"
                variant="secondary"
                onClick={() => window.location.href = '/ourservices'}
                className="gap-2 text-lg px-8 py-6"
              >
                Explore Services
                <ArrowRight className="h-5 w-5" />
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
      />
    </section>
  );
};
