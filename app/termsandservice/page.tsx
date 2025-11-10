"use client";

import { useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";

const TermsAndServicePage = () => {
  useEffect(() => {
    // Set page-specific metadata
    document.title = "Terms & Services - Velora Thai Spa | Service Terms & Conditions";

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
    updateMetaTag('description', "Read Velora Thai Spa's terms and services. Learn about booking policies, cancellation terms, health and safety guidelines, and membership conditions.");
    updateMetaTag('keywords', "terms and services, booking policy, cancellation policy, spa terms, service conditions");

    // Open Graph tags
    updateMetaTag('og:title', "Terms & Services - Velora Thai Spa | Service Terms & Conditions", true);
    updateMetaTag('og:description', "Read Velora Thai Spa's terms and services including booking policies, cancellation terms, and membership conditions.", true);
    updateMetaTag('og:url', "/termsandservice", true);
    updateMetaTag('og:site_name', "Velora Thai Spa", true);
    updateMetaTag('og:type', "website", true);

    // Twitter Card tags
    updateMetaTag('twitter:card', "summary");
    updateMetaTag('twitter:title', "Terms & Services - Velora Thai Spa | Service Terms & Conditions");
    updateMetaTag('twitter:description', "Read Velora Thai Spa's terms and services including booking policies, cancellation terms, and membership conditions.");

    // Cleanup function to reset to default when component unmounts
    return () => {
      document.title = "Velora Thai Spa - Premium Wellness & Massage Services";
    };
  }, []);

  return (
    <Layout>
      <div className="py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Terms & Services</h1>
            <p className="text-xl text-muted-foreground">
              Please read these terms carefully before using our services
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="prose prose-lg max-w-none">
              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Acceptance of Terms</h2>
                <p className="text-muted-foreground mb-4">
                  By accessing and using Velora Thai Spa's services, you accept and agree to be bound by
                  the terms and provision of this agreement. If you do not agree to abide by the above,
                  please do not use this service.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Service Description</h2>
                <p className="text-muted-foreground mb-4">
                  Velora Thai Spa provides traditional Thai massage and wellness services. All services
                  are performed by certified professionals in a clean and safe environment. Service
                  descriptions, pricing, and availability are subject to change without notice.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Booking and Cancellation</h2>
                <p className="text-muted-foreground mb-4">
                  Appointments must be booked in advance. We require 24 hours notice for cancellations
                  or rescheduling. Late cancellations or no-shows may be subject to a fee. We reserve
                  the right to cancel or reschedule appointments due to unforeseen circumstances.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Health and Safety</h2>
                <p className="text-muted-foreground mb-4">
                  Please inform us of any medical conditions, allergies, or pregnancy before your treatment.
                  Our therapists will discuss your health history to ensure safe and appropriate treatment.
                  We maintain the highest standards of hygiene and cleanliness.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Payment Terms</h2>
                <p className="text-muted-foreground mb-4">
                  Payment is due at the time of service unless other arrangements have been made.
                  We accept cash, credit cards, and other major payment methods. All prices are subject
                  to applicable taxes.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Membership Terms</h2>
                <p className="text-muted-foreground mb-4">
                  Membership benefits and pricing are subject to change. Memberships require a minimum
                  commitment period. Unused sessions may be subject to expiration terms as outlined
                  in your membership agreement.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Limitation of Liability</h2>
                <p className="text-muted-foreground mb-4">
                  Velora Thai Spa shall not be liable for any indirect, incidental, special, or consequential
                  damages arising out of or in connection with the use of our services. Our liability
                  shall not exceed the amount paid for the service in question.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
                <p className="text-muted-foreground">
                  For questions about these Terms & Services, please contact us at info@Velorathai.com
                  or call +1 (234) 567-890.
                </p>
              </section>
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
);
};

export default TermsAndServicePage;