import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Calendar, ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero-spa.jpg";

export const Hero = () => {
  const handleBookNow = () => {
    window.open("https://aromathaispa.zenoti.com", "_blank");
  };

  return (
    <section className="relative h-[90vh] min-h-[600px] flex items-center overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
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
              Authentic Thai Massage & Wellness
            </h1>
            <p className="text-xl md:text-2xl text-primary-foreground/90 mb-8 leading-relaxed">
              Experience the healing traditions of Thailand. Expert therapists, serene environment, personalized care since 2008.
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
                onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
                className="gap-2 text-lg px-8 py-6"
              >
                Explore Services
                <ArrowRight className="h-5 w-5" />
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
