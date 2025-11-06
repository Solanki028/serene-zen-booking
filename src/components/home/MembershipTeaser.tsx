"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Check, ArrowRight, Sparkles, Star, Heart, Zap } from "lucide-react";
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
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-rose-50 to-purple-50">
          <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-amber-200/30 to-transparent rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-gradient-to-tl from-purple-200/30 to-transparent rounded-full blur-3xl animate-pulse" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 overflow-hidden animate-pulse">
            <div className="flex flex-col lg:flex-row">
              <div className="flex-1 p-8 md:p-12 lg:p-16">
                <div className="h-10 bg-gray-300 rounded-full w-48 mb-6"></div>
                <div className="h-12 bg-gray-300 rounded mb-5"></div>
                <div className="h-6 bg-gray-300 rounded mb-8"></div>
                <div className="space-y-4 mb-10">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-7 h-7 bg-gray-300 rounded-lg"></div>
                      <div className="h-4 bg-gray-300 rounded w-48"></div>
                    </div>
                  ))}
                </div>
                <div className="h-14 bg-gray-300 rounded-xl w-56"></div>
              </div>
              <div className="flex-1 bg-gradient-to-br from-amber-100 via-rose-100 to-purple-100 p-8 md:p-12 lg:p-16 flex items-center justify-center">
                <div className="w-64 h-64 bg-gray-300 rounded-3xl"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-rose-50 to-purple-50">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-amber-200/30 to-transparent rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-gradient-to-tl from-purple-200/30 to-transparent rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 overflow-hidden">
            <div className="flex flex-col lg:flex-row">
              {/* Left Content Section */}
              <div className="flex-1 p-8 md:p-12 lg:p-16">
                {/* Badge */}
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3, type: "spring" }}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-100 to-rose-100 px-5 py-2.5 rounded-full mb-6 shadow-sm"
                >
                  <Sparkles className="h-5 w-5 text-amber-600" />
                  <span className="text-sm font-semibold text-gray-800 tracking-wide">
                    MEMBERS EXCLUSIVE
                  </span>
                </motion.div>

                {/* Title */}
                <h2 className="text-4xl md:text-5xl font-serif font-bold mb-5 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent leading-tight">
                  {content.title}
                </h2>

                {/* Description */}
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  {content.description}
                </p>

                {/* Benefits Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
                  {content.benefits.map((benefit, index) => (
                    <motion.div
                      key={benefit}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                      className="flex items-start gap-3"
                    >
                      <div className="flex-shrink-0 w-7 h-7 rounded-lg bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center shadow-sm">
                        <Check className="h-4 w-4 text-white font-bold" />
                      </div>
                      <span className="text-gray-700 font-medium pt-0.5">{benefit}</span>
                    </motion.div>
                  ))}
                </div>

                {/* CTA Button */}
                <Link href="/membership">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="group bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 hover:from-amber-600 hover:via-orange-600 hover:to-rose-600 text-white font-bold px-8 py-4 rounded-xl flex items-center gap-3 shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <span className="text-lg">View Memberships</span>
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </motion.button>
                </Link>
              </div>

              {/* Right Visual Section */}
              <div className="flex-1 bg-gradient-to-br from-amber-100 via-rose-100 to-purple-100 p-8 md:p-12 lg:p-16 flex items-center justify-center relative">
                {/* Floating Elements */}
                <motion.div
                  animate={{ y: [0, -20, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute top-12 right-12 w-20 h-20 bg-gradient-to-br from-amber-300 to-orange-400 rounded-2xl opacity-20 blur-xl"
                />
                <motion.div
                  animate={{ y: [0, 20, 0] }}
                  transition={{ duration: 5, repeat: Infinity }}
                  className="absolute bottom-12 left-12 w-32 h-32 bg-gradient-to-br from-purple-300 to-pink-400 rounded-full opacity-20 blur-2xl"
                />

                {/* Main Card */}
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                  className="relative"
                >
                  <div className="bg-white rounded-3xl shadow-2xl p-10 relative overflow-hidden">
                    {/* Decorative corner */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-amber-200/50 to-transparent rounded-bl-full" />
                    
                    {/* Stats */}
                    <div className="text-center relative z-10">
                      <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-amber-100 to-rose-100 mb-6">
                        <Star className="w-10 h-10 text-amber-600" />
                      </div>
                      <div className="text-7xl font-bold bg-gradient-to-r from-amber-600 via-orange-600 to-rose-600 bg-clip-text text-transparent mb-3">
                        30%
                      </div>
                      <div className="text-gray-600 font-semibold text-lg mb-6">
                        Average Savings
                      </div>
                      
                      {/* Mini features */}
                      <div className="flex gap-3 justify-center">
                        <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl px-4 py-2 border border-emerald-200">
                          <Zap className="w-5 h-5 text-emerald-600 mx-auto mb-1" />
                          <div className="text-xs font-medium text-gray-700">Priority</div>
                        </div>
                        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl px-4 py-2 border border-purple-200">
                          <Heart className="w-5 h-5 text-purple-600 mx-auto mb-1" />
                          <div className="text-xs font-medium text-gray-700">Exclusive</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};