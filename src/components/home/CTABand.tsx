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
  onClick={() => window.open('https://t.me/yourusername', '_blank')}
>
  <svg
    className="h-5 w-5"
    fill="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M9.999 15.2l-.39 5.5c.56 0 .8-.24 1.1-.53l2.6-2.5 5.4 3.9c.99.54 1.7.25 1.96-.92l3.55-16.7h-.01c.32-1.49-.53-2.08-1.5-1.72L1.53 9.68c-1.45.58-1.43 1.42-.26 1.8l5.48 1.7L18.47 5.6c.58-.38 1.1-.17.67.21L9.999 15.2z" />
  </svg>
  Message on Telegram
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
