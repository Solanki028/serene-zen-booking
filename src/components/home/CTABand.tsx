"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Phone, Calendar } from "lucide-react";
import { BookingModal } from "@/components/ui/booking-modal";

export const CTABand = () => {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  const handleBookNow = () => {
    setIsBookingModalOpen(true);
  };

  return (
    <section className="py-16 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-2">
              Ready to Experience True Relaxation?
            </h2>
            <p className="text-lg opacity-90">
              Book your appointment today or call us for assistance
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              size="lg"
              variant="secondary"
              onClick={handleBookNow}
              className="gap-2"
            >
              <Calendar className="h-5 w-5" />
              Book Your Session
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="gap-2 bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
              onClick={() => window.location.href = 'tel:+1234567890'}
            >
              <Phone className="h-5 w-5" />
              Call Us Now
            </Button>
          </div>
        </div>
      </div>

      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
      />
    </section>
  );
};
