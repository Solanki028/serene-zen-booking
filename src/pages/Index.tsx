import { Layout } from "@/components/layout/Layout";
import { Hero } from "@/components/home/Hero";
import { TrustBadges } from "@/components/home/TrustBadges";
import { FeaturedServices } from "@/components/home/FeaturedServices";
import { MembershipTeaser } from "@/components/home/MembershipTeaser";
import { GiftVoucherBanner } from "@/components/home/GiftVoucherBanner";
import { Testimonials } from "@/components/home/Testimonials";
import { CTABand } from "@/components/home/CTABand";

const Index = () => {
  return (
    <Layout>
      <Hero />
      <TrustBadges />
      <FeaturedServices />
      <MembershipTeaser />
      <GiftVoucherBanner />
      <Testimonials />
      <CTABand />
    </Layout>
  );
};

export default Index;
