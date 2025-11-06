"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { apiService } from "@/lib/api";

interface Service {
  _id: string;
  title: string;
  slug: string;
  shortDesc: string;
  images: string[];
}

const defaultServices = [
  {
    title: "Veloratherapy Massage",
    description: "Essential oils and gentle strokes for deep relaxation and stress relief.",
    image: "/assets/service-Veloratherapy.jpg",
  },
  {
    title: "Foot Reflexology",
    description: "Pressure point therapy targeting organs and systems through foot massage.",
    image: "/assets/service-foot.jpg",
  },
  {
    title: "Deep Tissue Massage",
    description: "Intensive muscle work to release chronic tension and knots.",
    image: "/assets/service-deep-tissue.jpg",
  },
  {
    title: "Traditional Thai Massage",
    description: "Ancient stretching techniques combined with acupressure for full-body wellness.",
    image: "/assets/service-traditional.jpg",
  },
];

export const FeaturedServices = () => {
  const [services, setServices] = useState(defaultServices);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadServices = async () => {
      try {
        const response = await apiService.getFeaturedServices();
        if (response.success && response.data.length > 0) {
          const featuredServices = response.data.slice(0, 4).map(service => ({
            title: service.title,
            description: service.shortDesc,
            image: service.images[0] || '/assets/service-traditional.jpg',
          }));
          setServices(featuredServices);
        }
      } catch (error) {
        console.error('Failed to load featured services:', error);
        // Keep default services on error
      } finally {
        setIsLoading(false);
      }
    };

    loadServices();
  }, []);

  if (isLoading) {
    return (
      <section id="services" className="py-24 bg-gradient-to-b from-background to-muted/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="h-12 bg-gray-300 rounded mb-4 mx-auto w-96"></div>
            <div className="h-6 bg-gray-300 rounded mx-auto w-2/3"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-300 aspect-square rounded mb-4"></div>
                <div className="h-6 bg-gray-300 rounded mb-2"></div>
                <div className="h-4 bg-gray-300 rounded mb-1"></div>
                <div className="h-4 bg-gray-300 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="services" className="py-24 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">Our Signature Services</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover authentic Thai healing traditions tailored to your wellness journey
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="overflow-hidden group hover:shadow-lg transition-all duration-300 h-full">
                <div className="relative overflow-hidden aspect-square">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                  <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                    {service.description}
                  </p>
                  <Link href="/ourservices">
                    <Button variant="link" className="p-0 h-auto gap-2 group/btn">
                      View details
                      <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link href="/ourservices">
            <Button size="lg" variant="outline" className="gap-2">
              View All Services
              <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};
