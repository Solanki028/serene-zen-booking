"use client";

import { useEffect, useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { Loader2, Check, Sparkles, Crown, Zap, Star, Shield } from "lucide-react";
import { apiService } from "@/lib/api";

interface Membership {
  _id: string;
  name: string;
  price: number;
  billingCycle: string;
  perks: string[];
  order: number;
  popular?: boolean;
}

const MembershipPage = () => {
  const [memberships, setMemberships] = useState<Membership[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Set page-specific metadata
    document.title = "Membership - Velora Thai Spa | Exclusive Wellness Membership Plans";

    // Update or create meta tags
    const updateMetaTag = (name: string, content: string, property = false) => {
      const attribute = property ? 'property' : 'name';
      let meta = document.querySelector(`meta[${attribute}="${name}"]`) as HTMLMetaElement;
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attribute, name);
        document.head.appendChild(meta);
      }
      meta.content = content;
    };

    // Basic meta tags
    updateMetaTag('description', "Join Velora Thai Spa's exclusive membership program for unlimited access to premium wellness treatments. Flexible plans, priority booking, and special member benefits.");
    updateMetaTag('keywords', "spa membership, wellness membership, thai spa membership, premium treatments, exclusive benefits");

    // Open Graph tags
    updateMetaTag('og:title', "Membership - Velora Thai Spa | Exclusive Wellness Membership Plans", true);
    updateMetaTag('og:description', "Join Velora Thai Spa's exclusive membership program for unlimited access to premium wellness treatments.", true);
    updateMetaTag('og:url', "/membership", true);
    updateMetaTag('og:site_name', "Velora Thai Spa", true);
    updateMetaTag('og:image', "/assets/hero-spa.jpg", true);
    updateMetaTag('og:image:width', "1200", true);
    updateMetaTag('og:image:height', "630", true);
    updateMetaTag('og:image:alt', "Velora Thai Spa Exclusive Membership Plans", true);

    // Twitter Card tags
    updateMetaTag('twitter:card', "summary_large_image");
    updateMetaTag('twitter:title', "Membership - Velora Thai Spa | Exclusive Wellness Membership Plans");
    updateMetaTag('twitter:description', "Join Velora Thai Spa's exclusive membership program for unlimited access to premium wellness treatments.");
    updateMetaTag('twitter:image', "/assets/hero-spa.jpg");

    // Cleanup function to reset to default when component unmounts
    return () => {
      document.title = "Velora Thai Spa - Premium Wellness & Massage Services";
    };
  }, []);

  useEffect(() => {
    const loadMemberships = async () => {
      try {
        const response = await apiService.getMemberships();
        if (response.success) {
          const sorted = response.data.sort((a: Membership, b: Membership) => a.order - b.order);
          const withPopular = sorted.map((m: Membership, idx: number) => ({
            ...m,
            popular: idx === Math.floor(sorted.length / 2),
          }));
          setMemberships(withPopular);
        }
      } catch (error) {
        console.error("Failed to load memberships:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadMemberships();
  }, []);

  if (isLoading) {
    return (
      <Layout>
        <div className="min-h-screen bg-gradient-to-br from-amber-50 via-rose-50 to-purple-50 flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="h-12 w-12 animate-spin text-amber-600 mx-auto mb-4" />
            <p className="text-gray-600 font-medium">Loading memberships...</p>
          </div>
        </div>
      </Layout>
    );
  };

 return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-rose-50 to-purple-50 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.2, 0.3] }}
            transition={{ duration: 8, repeat: Infinity }}
            className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-br from-amber-300/30 to-orange-300/30 rounded-full blur-3xl"
          />
          <motion.div
            animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.2, 0.3] }}
            transition={{ duration: 10, repeat: Infinity }}
            className="absolute bottom-20 right-20 w-[500px] h-[500px] bg-gradient-to-tl from-purple-300/30 to-pink-300/30 rounded-full blur-3xl"
          />
        </div>

        <div className="relative z-10 py-20 md:py-28">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-20"
            >
              <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full mb-6 shadow-lg border border-white/50">
                <Crown className="w-5 h-5 text-amber-600" />
                <span className="text-sm font-semibold text-gray-800 tracking-wide">PREMIUM WELLNESS</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 bg-gradient-to-r from-amber-700 via-rose-600 to-purple-700 bg-clip-text text-transparent leading-tight">
                Membership Plans
              </h1>
              <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
                Invest in your wellness journey with exceptional value and exclusive benefits
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto mb-20">
              {memberships.map((membership, index) => (
                <motion.div
                  key={membership._id}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.15, duration: 0.6 }}
                  className={membership.popular ? "md:-mt-6 md:mb-6 relative" : "relative"}
                >
                  <div
                    className={`h-full relative rounded-3xl overflow-hidden transition-all duration-500 hover:scale-105 ${
                      membership.popular
                        ? "bg-white/90 backdrop-blur-xl shadow-2xl border-[1.5px] border-[#E8C55C] ring-2 ring-[#E8C55C]/40"
                        : "bg-white/80 backdrop-blur-xl border border-white/50 shadow-lg hover:shadow-xl"
                    }`}
                  >
                    {membership.popular && (
                      <div className="absolute -top-7 left-1/2 -translate-x-1/2 z-20">
                        <motion.div
                          initial={{ y: -15, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.25, duration: 0.4 }}
                          className="relative"
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-[#E5C158] via-[#D5A93C] to-[#E8C55C] blur-xl opacity-50 rounded-full scale-110" />
                          <div className="relative bg-gradient-to-r from-[#E5C158] via-[#D5A93C] to-[#E8C55C] text-black px-7 py-1.5 rounded-full flex items-center gap-2 shadow-xl border border-white/30 backdrop-blur-sm">
                            <Sparkles className="w-3.5 h-3.5 text-black/80" />
                            <span className="text-xs font-bold tracking-wide uppercase">Most Popular</span>
                            <Sparkles className="w-3.5 h-3.5 text-black/80" />
                          </div>
                        </motion.div>
                      </div>
                    )}

                    <div className={`text-center px-6 ${membership.popular ? "pt-16 pb-8" : "pt-12 pb-8"}`}>
                      <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-100 to-rose-100 mb-4 shadow-md">
                        {index === 0 && <Shield className="w-8 h-8 text-amber-600" />}
                        {index === 1 && <Star className="w-8 h-8 text-orange-600" />}
                        {index === 2 && <Zap className="w-8 h-8 text-rose-600" />}
                      </div>
                      <h3 className="text-3xl font-bold text-gray-900 mb-4">{membership.name}</h3>
                      <div className="mb-2">
                        <span className="text-6xl font-bold bg-gradient-to-r from-amber-600 to-rose-600 bg-clip-text text-transparent">
                          ₹{membership.price}
                        </span>
                      </div>
                      <span className="text-gray-600 font-medium">per {membership.billingCycle}</span>
                    </div>

                    <div className="px-6 mb-6">
                      <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
                    </div>

                    <div className="px-6 pb-8">
                      <ul className="space-y-4">
                        {membership.perks.map((perk, perkIndex) => (
                          <motion.li
                            key={perk}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 + perkIndex * 0.1 }}
                            className="flex items-start gap-3"
                          >
                            <div className="flex-shrink-0 w-7 h-7 rounded-lg bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center shadow-sm mt-0.5">
                              <Check className="w-4 h-4 text-white font-bold" />
                            </div>
                            <span className="text-gray-700 leading-relaxed font-medium">{perk}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>

                    <div className="px-6 pb-8">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`w-full py-4 rounded-xl font-bold text-lg shadow-lg transition-all duration-300 ${
                          membership.popular
                            ? "bg-gradient-to-r from-[#E5C158] via-[#D5A93C] to-[#E8C55C] hover:from-[#D5A93C] hover:via-[#C79B37] hover:to-[#D5A93C] text-black"
                            : "bg-white hover:bg-gray-50 text-gray-900 border-2 border-gray-200"
                        }`}
                      >
                        Get Started
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="max-w-4xl mx-auto"
            >
              <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 overflow-hidden">
                <div className="bg-gradient-to-r from-amber-50 to-rose-50 px-8 py-6 border-b border-gray-200">
                  <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                    <Shield className="w-6 h-6 text-amber-600" />
                    Membership Terms
                  </h3>
                </div>
                <div className="p-8">
                  <ul className="space-y-4">
                    {[
                      "All memberships require a 3-month minimum commitment",
                      "Unused sessions can be rolled over according to your plan limits",
                      "Membership discounts cannot be combined with other promotions",
                      "Cancel anytime after the initial commitment period with 30 days notice",
                      "Membership benefits are non-transferable",
                    ].map((term, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-gray-700">
                        <div className="w-2 h-2 rounded-full bg-gradient-to-br from-amber-500 to-rose-500 mt-2 flex-shrink-0" />
                        <span className="leading-relaxed">{term}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MembershipPage;
