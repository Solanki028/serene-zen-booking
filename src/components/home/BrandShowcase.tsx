"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Award, Users, Heart, Sparkles, Crown, Calendar } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { BookingModal } from "@/components/ui/booking-modal";

const features = [
  {
    icon: Star,
    title: "Premium Quality",
    description: "Authentic Thai massage techniques passed down through generations",
    color: "text-yellow-500",
    bgColor: "bg-yellow-50",
  },
  {
    icon: Award,
    title: "Certified Therapists",
    description: "Professional therapists trained in traditional healing arts",
    color: "text-blue-500",
    bgColor: "bg-blue-50",
  },
  {
    icon: Users,
    title: "Personalized Care",
    description: "Customized treatments tailored to your unique wellness needs",
    color: "text-green-500",
    bgColor: "bg-green-50",
  },
  {
    icon: Heart,
    title: "Holistic Healing",
    description: "Complete mind, body, and spirit rejuvenation experience",
    color: "text-red-500",
    bgColor: "bg-red-50",
  },
];

const stats = [
  { number: "17+", label: "Years of Excellence" },
  { number: "10K+", label: "Happy Clients" },
  { number: "50+", label: "Expert Therapists" },
  { number: "4.9", label: "Average Rating" },
];

export const BrandShowcase = () => {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  const handleBookNow = () => {
    setIsBookingModalOpen(true);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-background via-muted/30 to-background relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 border border-primary rounded-full"></div>
        <div className="absolute top-20 right-20 w-24 h-24 border border-primary rounded-full"></div>
        <div className="absolute bottom-20 left-1/4 w-20 h-20 border border-primary rounded-full"></div>
        <div className="absolute bottom-10 right-10 w-16 h-16 border border-primary rounded-full"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-6">
            <Crown className="h-4 w-4" />
            <span className="text-sm font-medium">Why Choose Aroma Thai Spa</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Experience Excellence in Wellness
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover why thousands trust us with their wellness journey. Our commitment to authentic Thai healing traditions sets us apart.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
                  <CardContent className="p-8 text-center">
                    <div className={`w-16 h-16 ${feature.bgColor} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className={`h-8 w-8 ${feature.color}`} />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 rounded-3xl p-12"
        >
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4">
              <Sparkles className="h-4 w-4 mr-2" />
              Our Impact
            </Badge>
            <h3 className="text-3xl font-serif font-bold mb-4">Trusted by Thousands</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Join our community of satisfied clients who have discovered the transformative power of authentic Thai wellness.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                  {stat.number}
                </div>
                <div className="text-muted-foreground font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-lg text-muted-foreground mb-6">
            Ready to experience the difference? Book your transformative wellness journey today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleBookNow}
              className="bg-primary text-primary-foreground px-8 py-4 rounded-xl font-semibold hover:bg-primary/90 transition-colors duration-300 shadow-lg hover:shadow-xl gap-2 flex items-center justify-center"
            >
              <Calendar className="h-4 w-4" />
              Book Your Session
            </button>
            <Link href="/aboutus">
              <button className="border border-primary text-primary px-8 py-4 rounded-xl font-semibold hover:bg-primary/5 transition-colors duration-300">
                Learn More About Us
              </button>
            </Link>
          </div>
        </motion.div>
      </div>

      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
      />
    </section>
  );
};