import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Gift, ArrowRight } from "lucide-react";

export const GiftVoucherBanner = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-accent/10 to-secondary/10">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-accent/20 mb-6">
            <Gift className="h-10 w-10 text-accent" />
          </div>
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
            Give the Gift of Wellness
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Share the joy of relaxation with our customizable gift vouchers. Perfect for every occasion.
          </p>
          <Link to="/giftvoucher">
            <Button size="lg" className="gap-2">
              Buy Gift Voucher
              <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};
