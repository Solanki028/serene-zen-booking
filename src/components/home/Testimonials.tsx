"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";
import { apiService } from "@/lib/api";

interface Testimonial {
  _id: string;
  name: string;
  quote: string;
  rating: number;
  avatarUrl?: string;
}

export const Testimonials = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadTestimonials = async () => {
      try {
        const response = await apiService.getTestimonials();
        if (response.success && response.data.length > 0) {
          setTestimonials(response.data);
        }
      } catch (error) {
        console.error('Failed to load testimonials:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadTestimonials();
  }, []);

  if (isLoading) {
    return (
      <section className="py-24 bg-gradient-to-b from-background via-muted/30 to-background overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="h-12 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg mb-4 mx-auto w-96 animate-pulse"></div>
            <div className="h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg mx-auto w-2/3 animate-pulse"></div>
          </div>
          <div className="flex gap-4 opacity-50">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="min-w-[320px] animate-pulse">
                <Card className="h-full border-2">
                  <CardContent className="p-5">
                    <div className="h-12 bg-gray-200 rounded-lg mb-4"></div>
                    <div className="flex gap-0.5 mb-3 justify-center">
                      {[...Array(5)].map((_, j) => (
                        <div key={j} className="h-4 w-4 bg-gray-200 rounded"></div>
                      ))}
                    </div>
                    <div className="space-y-2 mb-3">
                      <div className="h-3 bg-gray-200 rounded"></div>
                      <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                    </div>
                    <div className="h-5 bg-gray-200 rounded w-24 mx-auto"></div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (testimonials.length === 0) {
    return null;
  }

  // Duplicate testimonials for infinite scroll effect
  const duplicatedTestimonials = [...testimonials, ...testimonials, ...testimonials];

  return (
    <section className="py-24 bg-gradient-to-b from-background via-muted/30 to-background overflow-hidden relative">
      {/* Decorative elements */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-accent/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-block mb-4"
          >
            <div className="bg-accent/10 rounded-full px-6 py-2 inline-flex items-center gap-2">
              <Star className="h-4 w-4 fill-accent text-accent" />
              <span className="text-sm font-semibold text-accent">CLIENT TESTIMONIALS</span>
              <Star className="h-4 w-4 fill-accent text-accent" />
            </div>
          </motion.div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-4 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            What Our Clients Say
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover why thousands trust us for authentic Thai wellness experiences
          </p>
        </motion.div>

        {/* Auto-scrolling carousel */}
        <div className="relative">
          {/* Gradient overlays for smooth fade effect */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background via-background/80 to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background via-background/80 to-transparent z-10 pointer-events-none"></div>
          
          <motion.div
            className="flex gap-4"
            animate={{
              x: [0, -((testimonials.length * 336))],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: testimonials.length * 8,
                ease: "linear",
              },
            }}
          >
            {duplicatedTestimonials.map((testimonial, index) => (
              <div
                key={`${testimonial._id}-${index}`}
                className="min-w-[320px] flex-shrink-0"
              >
                <Card className="h-full border-2 hover:border-accent/50 transition-all duration-300 hover:shadow-xl hover:shadow-accent/5 bg-card/50 backdrop-blur-sm">
                  <CardContent className="p-5 relative">
                    {/* Quote icon */}
                    <div className="absolute top-3 right-3 opacity-10">
                      <Quote className="h-8 w-8 text-accent" />
                    </div>

                    {/* Avatar */}
                    <div className="flex justify-center mb-4">
                      {testimonial.avatarUrl ? (
                        <div className="relative">
                          <img
                            src={testimonial.avatarUrl}
                            alt={testimonial.name}
                            className="w-14 h-14 rounded-full object-cover border-3 border-accent/20 shadow-lg"
                            onError={(e) => {
                              e.currentTarget.style.display = 'none';
                            }}
                          />
                          <div className="absolute -bottom-1 -right-1 bg-accent rounded-full p-1 shadow-lg">
                            <Star className="h-3 w-3 fill-white text-white" />
                          </div>
                        </div>
                      ) : (
                        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-accent/20 to-primary/20 flex items-center justify-center border-3 border-accent/20 shadow-lg">
                          <span className="text-xl font-bold text-accent">
                            {testimonial.name.charAt(0)}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Rating */}
                    <div className="flex gap-0.5 mb-4 justify-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 transition-all ${
                            i < testimonial.rating
                              ? 'fill-yellow-400 text-yellow-400 drop-shadow-sm'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>

                    {/* Quote */}
                    <p className="text-muted-foreground text-sm mb-4 leading-relaxed text-center min-h-[60px] italic line-clamp-4">
                      "{testimonial.quote}"
                    </p>

                    {/* Name */}
                    <div className="text-center pt-3 border-t border-border/50">
                      <p className="font-semibold text-base truncate">{testimonial.name}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">Verified Client</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Bottom indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12"
        >
          <p className="text-sm text-muted-foreground flex items-center justify-center gap-2">
            <span className="inline-block w-2 h-2 bg-accent rounded-full animate-pulse"></span>
            {testimonials.length} Happy Clients & Counting
            <span className="inline-block w-2 h-2 bg-accent rounded-full animate-pulse"></span>
          </p>
        </motion.div>
      </div>
    </section>
  );
};