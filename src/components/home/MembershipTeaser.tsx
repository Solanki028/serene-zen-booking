"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight, Sparkles } from "lucide-react";
import { apiService } from "@/lib/api";

const defaultBenefits = [
  "Priority booking",
  "Exclusive discounts up to 30%",
  "Complimentary add-ons",
  "Rollover unused sessions",
];

export const MembershipTeaser = () => {
  const [content, setContent] = useState({
    title: "Wellness Made Affordable",
    description: "Join our membership program and enjoy premium spa experiences at exceptional value",
    benefits: defaultBenefits,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadContent = async () => {
      try {
        const response = await apiService.getHomepageContent();
        if (response.success && response.data.membershipTeaser) {
          setContent(response.data.membershipTeaser);
        }
      } catch (error) {
        console.error('Failed to load membership teaser:', error);
        // Keep default content on error
      } finally {
        setIsLoading(false);
      }
    };

    loadContent();
  }, []);

  if (isLoading) {
    return (
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="animate-pulse">
            <Card className="overflow-hidden border-2 border-secondary/20 bg-gradient-to-br from-secondary/5 to-accent/5">
              <CardContent className="p-8 md:p-12">
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="flex-1">
                    <div className="h-6 bg-gray-300 rounded-full w-48 mb-4"></div>
                    <div className="h-10 bg-gray-300 rounded mb-4"></div>
                    <div className="h-6 bg-gray-300 rounded mb-6"></div>
                    <div className="space-y-3 mb-8">
                      {[...Array(4)].map((_, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
                          <div className="h-4 bg-gray-300 rounded w-48"></div>
                        </div>
                      ))}
                    </div>
                    <div className="h-12 bg-gray-300 rounded w-40"></div>
                  </div>
                  <div className="flex-1 flex justify-center">
                    <div className="w-64 h-48 bg-gray-300 rounded-2xl"></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Card className="overflow-hidden border-2 border-secondary/20 bg-gradient-to-br from-secondary/5 to-accent/5">
            <CardContent className="p-8 md:p-12">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="flex-1">
                  <div className="inline-flex items-center gap-2 bg-secondary/20 text-secondary px-4 py-2 rounded-full mb-4">
                    <Sparkles className="h-4 w-4" />
                    <span className="text-sm font-medium">Members Exclusive</span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
                    {content.title}
                  </h2>
                  <p className="text-lg text-muted-foreground mb-6">
                    {content.description}
                  </p>
                  <ul className="space-y-3 mb-8">
                    {content.benefits.map((benefit) => (
                      <li key={benefit} className="flex items-center gap-3">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-secondary/20 flex items-center justify-center">
                          <Check className="h-4 w-4 text-secondary" />
                        </div>
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                  <Link href="/membership">
                    <Button size="lg" className="gap-2">
                      View Memberships
                      <ArrowRight className="h-5 w-5" />
                    </Button>
                  </Link>
                </div>
                <div className="flex-1 flex justify-center">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-secondary/30 to-accent/30 rounded-3xl blur-3xl" />
                    <div className="relative bg-card p-8 rounded-2xl shadow-xl">
                      <div className="text-center">
                        <div className="text-5xl font-bold text-primary mb-2">30%</div>
                        <div className="text-muted-foreground">Average Savings</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};
