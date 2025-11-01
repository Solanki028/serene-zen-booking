"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Award, Users, Shield, Heart } from "lucide-react";
import { apiService } from "@/lib/api";

interface TrustBadge {
  icon: string;
  title: string;
  description: string;
}

const defaultBadges = [
  {
    icon: "Award",
    title: "Since 2008",
    description: "17 years of excellence",
  },
  {
    icon: "Users",
    title: "Expert Therapists",
    description: "Certified Thai practitioners",
  },
  {
    icon: "Shield",
    title: "Highest Hygiene",
    description: "Premium cleanliness standards",
  },
  {
    icon: "Heart",
    title: "Personalized Care",
    description: "Tailored to your needs",
  },
];

const iconMap = {
  Award,
  Users,
  Shield,
  Heart,
};

export const TrustBadges = () => {
  const [badges, setBadges] = useState(defaultBadges);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadBadges = async () => {
      try {
        const response = await apiService.getHomepageContent();
        if (response.success && response.data.trustBadges) {
          setBadges(response.data.trustBadges);
        }
      } catch (error) {
        console.error('Failed to load trust badges:', error);
        // Keep default badges on error
      } finally {
        setIsLoading(false);
      }
    };

    loadBadges();
  }, []);

  if (isLoading) {
    return (
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="text-center animate-pulse">
                <div className="w-16 h-16 bg-gray-300 rounded-full mx-auto mb-4"></div>
                <div className="h-6 bg-gray-300 rounded mb-2 mx-auto w-24"></div>
                <div className="h-4 bg-gray-300 rounded mx-auto w-32"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {badges.map((badge, index) => {
            const Icon = iconMap[badge.icon as keyof typeof iconMap] || Award;
            return (
              <motion.div
                key={badge.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary/20 text-secondary mb-4">
                  <Icon className="h-8 w-8" />
                </div>
                <h3 className="font-semibold text-lg mb-1">{badge.title}</h3>
                <p className="text-sm text-muted-foreground">{badge.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
