import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";

const TermsAndService = () => {
  return (
    <Layout>
      <div className="py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-8">Terms & Services</h1>
            
            <div className="prose prose-lg max-w-none">
              <p className="text-muted-foreground mb-6">
                Last updated: {new Date().toLocaleDateString()}
              </p>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Booking & Appointments</h2>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li>Appointments can be booked online, by phone, or in person</li>
                  <li>We recommend booking at least 24 hours in advance</li>
                  <li>Please arrive 10 minutes before your scheduled appointment</li>
                  <li>Late arrivals may result in shortened treatment time to accommodate other clients</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Cancellation & Rescheduling</h2>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li>Cancellations or rescheduling must be made at least 24 hours in advance</li>
                  <li>Late cancellations (less than 24 hours) may incur a 50% charge</li>
                  <li>No-shows will be charged the full service amount</li>
                  <li>We understand emergencies happen and will work with you on a case-by-case basis</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Payment & Pricing</h2>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li>All prices are in USD and subject to change without notice</li>
                  <li>Payment is due at the time of service</li>
                  <li>We accept cash, credit cards, and gift vouchers</li>
                  <li>Gratuities are appreciated but not mandatory</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Health & Safety</h2>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li>Please inform us of any health conditions, injuries, or allergies</li>
                  <li>Pregnant clients should consult their doctor before booking certain treatments</li>
                  <li>We reserve the right to refuse service if a condition may be aggravated by treatment</li>
                  <li>All equipment and facilities are sanitized between each client</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Membership Terms</h2>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li>Memberships require a 3-month minimum commitment</li>
                  <li>Monthly membership fees are charged on the same day each month</li>
                  <li>Unused sessions may be rolled over according to your plan limits</li>
                  <li>Memberships can be cancelled with 30 days written notice after the initial commitment</li>
                  <li>Membership benefits are non-transferable</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Gift Vouchers</h2>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li>Gift vouchers are valid for 12 months from the date of purchase</li>
                  <li>Vouchers are non-refundable but transferable</li>
                  <li>Lost vouchers cannot be replaced</li>
                  <li>Any remaining balance will be kept on account for future use</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Liability</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Aroma Thai Spa is not responsible for loss or damage to personal belongings. We recommend 
                  leaving valuables at home. While we take every precaution to ensure your safety and comfort, 
                  massage therapy involves physical manipulation and carries inherent risks. By booking a service, 
                  you acknowledge these risks and agree to hold harmless Aroma Thai Spa and its employees.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Contact</h2>
                <p className="text-muted-foreground leading-relaxed">
                  For questions regarding these terms, please contact us at:
                </p>
                <p className="text-muted-foreground mt-4">
                  Email: info@aromathai.com<br />
                  Phone: +1 (234) 567-890
                </p>
              </section>
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default TermsAndService;
