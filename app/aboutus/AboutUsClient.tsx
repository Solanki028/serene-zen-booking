"use client";

import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

export default function AboutUsClient() {
  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-rose-50 to-purple-50 py-20 md:py-28 relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 relative z-10"
        >
          <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6 bg-gradient-to-r from-amber-700 via-rose-600 to-purple-700 bg-clip-text text-transparent">
            About SpaFort
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 max-w-2xl mx-auto leading-relaxed">
            A sanctuary of calm, crafted for those who take their wellness seriously.
          </p>
        </motion.div>

        <div className="container mx-auto px-4 max-w-5xl relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.8 }}>
            <Card className="bg-white/80 backdrop-blur-xl border border-white/40 shadow-lg rounded-3xl">
              <CardContent className="p-8 md:p-12">
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-lg md:text-xl text-gray-700 text-center leading-relaxed max-w-3xl mx-auto"
                >
                  We’re here for one purpose — to help you pause, breathe, and reconnect with yourself.
                  From traditional Thai techniques to modern healing therapies, every session is designed
                  to melt stress, restore balance, and elevate your well-being.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.45 }}
                  className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12"
                >
                  <div className="text-center">
                    <h3 className="text-4xl font-bold bg-gradient-to-r from-amber-600 to-rose-600 bg-clip-text text-transparent mb-2">
                      16+
                    </h3>
                    <p className="text-gray-600 font-medium text-sm">Years of Wellness</p>
                  </div>
                  <div className="text-center">
                    <h3 className="text-4xl font-bold bg-gradient-to-r from-amber-600 to-rose-600 bg-clip-text text-transparent mb-2">
                      20K+
                    </h3>
                    <p className="text-gray-600 font-medium text-sm">Happy Clients</p>
                  </div>
                  <div className="text-center">
                    <h3 className="text-4xl font-bold bg-gradient-to-r from-amber-600 to-rose-600 bg-clip-text text-transparent mb-2">
                      30+
                    </h3>
                    <p className="text-gray-600 font-medium text-sm">Signature Treatments</p>
                  </div>
                </motion.div>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="text-lg text-gray-700 mt-12 text-center leading-relaxed max-w-3xl mx-auto"
                >
                  It’s more than a spa — it’s a lifestyle of balance, beauty, and inner peace.
                  Step into a world that’s designed to slow you down and lift you up.
                </motion.p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
}
