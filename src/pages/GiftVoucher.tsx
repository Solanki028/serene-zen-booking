import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Gift, Heart, Mail, Sparkles } from "lucide-react";

const denominations = [50, 100, 150, 200, 300];

const GiftVoucher = () => {
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
            className="text-center mb-16"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-accent/20 mb-6">
              <Gift className="h-10 w-10 text-accent" />
            </div>
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Gift Vouchers</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Share the gift of wellness and relaxation with your loved ones
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto space-y-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card>
                <CardContent className="p-8">
                  <h2 className="text-2xl font-semibold mb-6">Why Choose Our Gift Vouchers?</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary/20 mb-4">
                        <Heart className="h-8 w-8 text-secondary" />
                      </div>
                      <h3 className="font-semibold mb-2">Perfect for Any Occasion</h3>
                      <p className="text-sm text-muted-foreground">
                        Birthdays, anniversaries, gratitude, or just because
                      </p>
                    </div>
                    <div className="text-center">
                      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary/20 mb-4">
                        <Sparkles className="h-8 w-8 text-secondary" />
                      </div>
                      <h3 className="font-semibold mb-2">Flexible & Customizable</h3>
                      <p className="text-sm text-muted-foreground">
                        Choose any amount and add a personal message
                      </p>
                    </div>
                    <div className="text-center">
                      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary/20 mb-4">
                        <Mail className="h-8 w-8 text-secondary" />
                      </div>
                      <h3 className="font-semibold mb-2">Instant Delivery</h3>
                      <p className="text-sm text-muted-foreground">
                        Email delivery or beautiful printed vouchers
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card>
                <CardContent className="p-8">
                  <h2 className="text-2xl font-semibold mb-6">Select Your Voucher Amount</h2>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
                    {denominations.map((amount) => (
                      <button
                        key={amount}
                        className="border-2 border-border hover:border-primary rounded-xl p-6 transition-all hover:shadow-lg group"
                      >
                        <div className="text-3xl font-bold group-hover:text-primary transition-colors">
                          ${amount}
                        </div>
                      </button>
                    ))}
                  </div>
                  <div className="bg-muted/50 rounded-lg p-6 mb-6">
                    <h3 className="font-semibold mb-3">Add a Personal Message</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Make your gift extra special with a custom message (optional)
                    </p>
                    <textarea
                      className="w-full min-h-[100px] p-4 rounded-lg border border-border bg-background resize-none"
                      placeholder="Write your heartfelt message here..."
                    />
                  </div>
                  <Button onClick={handleBuyVoucher} size="lg" className="w-full gap-2">
                    <Gift className="h-5 w-5" />
                    Purchase Gift Voucher
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <Card>
                <CardContent className="p-8">
                  <h3 className="text-xl font-semibold mb-4">Terms & Conditions</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Gift vouchers are valid for 12 months from the date of purchase</li>
                    <li>• Vouchers can be used for any service or product</li>
                    <li>• Vouchers are non-refundable but transferable</li>
                    <li>• Any remaining balance will be kept on account for future use</li>
                    <li>• Lost vouchers cannot be replaced, please keep your voucher code safe</li>
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

export default GiftVoucher;
