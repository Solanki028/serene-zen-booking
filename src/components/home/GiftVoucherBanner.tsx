"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Gift, ArrowRight } from "lucide-react";

export const GiftVoucherBanner = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50">
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0]
          }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute top-1/4 -left-20 w-96 h-96 bg-gradient-to-br from-pink-300/20 to-purple-300/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ 
            scale: [1, 1.3, 1],
            rotate: [0, -90, 0]
          }}
          transition={{ duration: 25, repeat: Infinity }}
          className="absolute bottom-1/4 -right-20 w-[500px] h-[500px] bg-gradient-to-tl from-indigo-300/20 to-blue-300/20 rounded-full blur-3xl"
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto"
        >
          <div className="bg-white/90 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/50 p-8 md:p-12 lg:p-16 relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-40 h-40 bg-gradient-to-br from-pink-200/30 to-transparent rounded-full blur-2xl" />
            <div className="absolute bottom-0 right-0 w-56 h-56 bg-gradient-to-tl from-indigo-200/30 to-transparent rounded-full blur-2xl" />

            <div className="relative z-10">
              <div className="text-center">
                {/* Icon */}
                <motion.div
                  initial={{ rotate: -10 }}
                  whileInView={{ rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", stiffness: 200 }}
                  className="inline-flex mb-8"
                >
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-pink-400 to-purple-500 rounded-3xl blur-xl opacity-30 animate-pulse" />
                    <div className="relative w-28 h-28 rounded-3xl bg-gradient-to-br from-pink-400 via-purple-500 to-indigo-500 flex items-center justify-center shadow-2xl">
                      <Gift className="h-14 w-14 text-white" />
                    </div>
                  </div>
                </motion.div>

                {/* Title */}
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6 bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent leading-tight"
                >
                  Give the Gift of Wellness
                </motion.h2>

                {/* Description */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed"
                >
                  Share the joy of relaxation with our customizable gift vouchers. Perfect for every occasion and celebration.
                </motion.p>

                {/* Features Pills */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                  className="flex flex-wrap justify-center gap-3 mb-10"
                >
                  {["Instant Delivery", "Custom Amounts", "Never Expires"].map((feature, idx) => (
                    <div
                      key={feature}
                      className="bg-gradient-to-r from-pink-100 to-purple-100 px-5 py-2.5 rounded-full border border-pink-200 shadow-sm"
                    >
                      <span className="text-sm font-medium text-gray-700">{feature}</span>
                    </div>
                  ))}
                </motion.div>

                {/* CTA Button */}
                <Link href="/giftvoucher">
                  <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="group bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 hover:from-pink-600 hover:via-purple-600 hover:to-indigo-600 text-white font-bold px-10 py-5 rounded-2xl flex items-center gap-3 shadow-xl hover:shadow-2xl transition-all duration-300 mx-auto"
                  >
                    <span className="text-xl">Buy Gift Voucher</span>
                    <ArrowRight className="h-6 w-6 group-hover:translate-x-1 transition-transform" />
                  </motion.button>
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};