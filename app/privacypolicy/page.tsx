"use client";

import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";

const PrivacyPolicyPage = () => {
  return (
    <Layout>
      <div className="py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Privacy Policy</h1>
            <p className="text-xl text-muted-foreground">
              Your privacy and trust are important to us
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="prose prose-lg max-w-none">
              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Information We Collect</h2>
                <p className="text-muted-foreground mb-4">
                  We collect information you provide directly to us, such as when you make a booking,
                  create an account, or contact us for support. This may include your name, email address,
                  phone number, and payment information.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">How We Use Your Information</h2>
                <p className="text-muted-foreground mb-4">
                  We use the information we collect to provide, maintain, and improve our services,
                  process transactions, send you technical notices and support messages, and respond
                  to your comments and questions.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Information Sharing</h2>
                <p className="text-muted-foreground mb-4">
                  We do not sell, trade, or otherwise transfer your personal information to third parties
                  without your consent, except as described in this policy. We may share your information
                  with trusted third parties who assist us in operating our website or conducting our business.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Data Security</h2>
                <p className="text-muted-foreground mb-4">
                  We implement appropriate security measures to protect your personal information against
                  unauthorized access, alteration, disclosure, or destruction. However, no method of
                  transmission over the internet is 100% secure.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
                <p className="text-muted-foreground">
                  If you have any questions about this Privacy Policy, please contact us at
                  info@Velorathai.com or call us at +1 (234) 567-890.
                </p>
              </section>
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default PrivacyPolicyPage;