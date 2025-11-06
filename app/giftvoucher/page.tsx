"use client";

import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Gift, Heart, Sparkles, Calendar, CreditCard, Mail, User, MessageSquare, Check } from "lucide-react";

const GiftVoucherPage = () => {
  const [selectedAmount, setSelectedAmount] = useState<number>(100);

  const denominations = [50, 100, 150, 200, 250, 300];

  const handleBuyVoucher = () => {
    window.open("https://Velorathaispa.zenoti.com", "_blank");
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 90, 0],
              opacity: [0.3, 0.2, 0.3]
            }}
            transition={{ duration: 15, repeat: Infinity }}
            className="absolute top-20 -left-20 w-96 h-96 bg-gradient-to-br from-pink-300/30 to-purple-300/30 rounded-full blur-3xl"
          />
          <motion.div
            animate={{ 
              scale: [1, 1.3, 1],
              rotate: [0, -90, 0],
              opacity: [0.3, 0.2, 0.3]
            }}
            transition={{ duration: 20, repeat: Infinity }}
            className="absolute bottom-20 -right-20 w-[500px] h-[500px] bg-gradient-to-tl from-indigo-300/30 to-blue-300/30 rounded-full blur-3xl"
          />
        </div>

        <div className="relative z-10 py-20 md:py-28">
          <div className="container mx-auto px-4">
            {/* Header Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              {/* Icon */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                className="inline-flex mb-8"
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-pink-400 to-purple-500 rounded-3xl blur-2xl opacity-40 animate-pulse" />
                  <div className="relative w-24 h-24 rounded-3xl bg-gradient-to-br from-pink-400 via-purple-500 to-indigo-500 flex items-center justify-center shadow-2xl">
                    <Gift className="h-12 w-12 text-white" />
                  </div>
                </div>
              </motion.div>

              <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent leading-tight">
                Gift Vouchers
              </h1>
              <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
                Share the gift of wellness with our beautifully designed gift vouchers
              </p>
            </motion.div>

            <div className="max-w-5xl mx-auto space-y-8">
              {/* Main Voucher Card */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                <div className="bg-white/90 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/50 overflow-hidden">
                  {/* Decorative Header */}
                  <div className="relative bg-gradient-to-r from-pink-100 via-purple-100 to-indigo-100 px-8 py-6 border-b border-purple-200">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-pink-300/30 to-transparent rounded-full blur-2xl" />
                    <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-3 relative z-10">
                      <Sparkles className="w-7 h-7 text-purple-600" />
                      Create Your Gift Voucher
                    </h2>
                  </div>

                  <div className="p-8 md:p-12">
                    {/* Amount Selection */}
                    <div className="mb-10">
                      <label className="flex items-center gap-2 text-lg font-bold text-gray-900 mb-5">
                        <CreditCard className="w-5 h-5 text-purple-600" />
                        Choose Your Amount
                      </label>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {denominations.map((amount, idx) => (
                          <motion.button
                            key={amount}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.4 + idx * 0.05 }}
                            onClick={() => setSelectedAmount(amount)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className={`relative p-6 rounded-2xl text-center transition-all duration-300 ${
                              selectedAmount === amount
                                ? "bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-500 text-white shadow-xl scale-105"
                                : "bg-gradient-to-br from-gray-50 to-gray-100 hover:from-pink-50 hover:to-purple-50 border-2 border-gray-200 hover:border-purple-300 text-gray-900"
                            }`}
                          >
                            {selectedAmount === amount && (
                              <div className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg">
                                <Check className="w-5 h-5 text-purple-600" />
                              </div>
                            )}
                            <div className="text-4xl font-bold mb-1">₹{amount}</div>
                            <div className={`text-sm ${selectedAmount === amount ? 'text-white/80' : 'text-gray-500'}`}>
                              Gift Card
                            </div>
                          </motion.button>
                        ))}
                      </div>
                    </div>

                    {/* Recipient Details */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                      className="bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 rounded-2xl p-8 mb-8 border border-purple-200"
                    >
                      <h3 className="font-bold text-xl text-gray-900 mb-6 flex items-center gap-2">
                        <Heart className="w-5 h-5 text-pink-600" />
                        Personalize Your Gift
                      </h3>
                      <div className="space-y-5">
                        <div>
                          <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                            <User className="w-4 h-4 text-purple-600" />
                            Recipient Name
                          </label>
                          <input
                            type="text"
                            className="w-full p-4 border-2 border-purple-200 rounded-xl bg-white focus:border-purple-400 focus:ring-4 focus:ring-purple-100 transition-all outline-none text-gray-900"
                            placeholder="Enter recipient name"
                          />
                        </div>
                        <div>
                          <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                            <Mail className="w-4 h-4 text-purple-600" />
                            Your Name
                          </label>
                          <input
                            type="text"
                            className="w-full p-4 border-2 border-purple-200 rounded-xl bg-white focus:border-purple-400 focus:ring-4 focus:ring-purple-100 transition-all outline-none text-gray-900"
                            placeholder="Your name"
                          />
                        </div>
                        <div>
                          <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                            <MessageSquare className="w-4 h-4 text-purple-600" />
                            Personal Message (Optional)
                          </label>
                          <textarea
                            rows={4}
                            className="w-full p-4 border-2 border-purple-200 rounded-xl bg-white focus:border-purple-400 focus:ring-4 focus:ring-purple-100 transition-all outline-none resize-none text-gray-900"
                            placeholder="Add a heartfelt message..."
                          />
                        </div>
                      </div>
                    </motion.div>

                    {/* Purchase Button */}
                    <motion.button
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7 }}
                      onClick={handleBuyVoucher}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 hover:from-pink-600 hover:via-purple-600 hover:to-indigo-600 text-white font-bold text-xl px-8 py-6 rounded-2xl flex items-center justify-center gap-3 shadow-2xl hover:shadow-3xl transition-all duration-300"
                    >
                      <Gift className="w-6 h-6" />
                      Purchase Gift Voucher - ₹{selectedAmount}
                    </motion.button>
                  </div>
                </div>
              </motion.div>

              {/* Benefits Card */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                <div className="bg-white/90 backdrop-blur-2xl rounded-3xl shadow-xl border border-white/50 overflow-hidden">
                  <div className="bg-gradient-to-r from-emerald-50 to-teal-50 px-8 py-6 border-b border-emerald-200">
                    <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                      <Sparkles className="w-6 h-6 text-emerald-600" />
                      Gift Voucher Benefits
                    </h3>
                  </div>
                  <div className="p-8">
                    <ul className="grid md:grid-cols-2 gap-5">
                      {[
                        { icon: Calendar, text: "Valid for any service in our complete menu" },
                        { icon: Heart, text: "No expiration date - use at your convenience" },
                        { icon: Gift, text: "Beautifully designed, printable voucher" },
                        { icon: Sparkles, text: "Perfect for birthdays, anniversaries, or thank you gifts" },
                        { icon: Check, text: "Can be used for multiple visits if desired" },
                        { icon: Mail, text: "Instant digital delivery via email" },
                      ].map((benefit, idx) => (
                        <motion.li
                          key={idx}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.6 + idx * 0.1 }}
                          className="flex items-start gap-4 bg-gradient-to-br from-emerald-50 to-teal-50 p-4 rounded-xl border border-emerald-200"
                        >
                          <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center shadow-md">
                            <benefit.icon className="w-5 h-5 text-white" />
                          </div>
                          <span className="text-gray-700 leading-relaxed font-medium pt-1">{benefit.text}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default GiftVoucherPage;