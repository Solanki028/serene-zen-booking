"use client";

import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const GiftVoucherPage = () => {
  const [selectedAmount, setSelectedAmount] = useState<number>(100);

  const denominations = [50, 100, 150, 200, 250, 300];

  const handleBuyVoucher = () => {
    window.open("https://aromathaispa.zenoti.com", "_blank");
  };

  return (
    <Layout>
      <div className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Gift Vouchers</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Share the gift of wellness with our beautifully designed gift vouchers
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto space-y-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card>
                <CardContent className="p-8">
                  <h2 className="text-2xl font-semibold mb-6">Choose Your Amount</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                    {denominations.map((amount) => (
                      <button
                        key={amount}
                        onClick={() => setSelectedAmount(amount)}
                        className={`p-4 border-2 rounded-lg text-center transition-all ${
                          selectedAmount === amount
                            ? "border-primary bg-primary/5 text-primary"
                            : "border-muted hover:border-primary/50"
                        }`}
                      >
                        <div className="text-2xl font-bold">${amount}</div>
                      </button>
                    ))}
                  </div>
                  <div className="bg-muted/50 rounded-lg p-6 mb-6">
                    <h3 className="font-semibold mb-4">Selected Amount: ${selectedAmount}</h3>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium mb-2">Recipient Name</label>
                        <input
                          type="text"
                          className="w-full p-3 border border-input rounded-md bg-background"
                          placeholder="Enter recipient name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Your Name</label>
                        <input
                          type="text"
                          className="w-full p-3 border border-input rounded-md bg-background"
                          placeholder="Your name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Personal Message (Optional)</label>
                        <textarea
                          rows={3}
                          className="w-full p-3 border border-input rounded-md bg-background resize-none"
                          placeholder="Add a personal message..."
                        />
                      </div>
                    </div>
                  </div>
                  <Button onClick={handleBuyVoucher} size="lg" className="w-full gap-2">
                    Purchase Gift Voucher - ${selectedAmount}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card>
                <CardContent className="p-8">
                  <h3 className="text-xl font-semibold mb-4">Gift Voucher Benefits</h3>
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                      <span>Valid for any service in our complete menu</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                      <span>No expiration date - use at your convenience</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                      <span>Beautifully designed, printable voucher</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                      <span>Perfect for birthdays, anniversaries, or thank you gifts</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                      <span>Can be used for multiple visits if desired</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default GiftVoucherPage;