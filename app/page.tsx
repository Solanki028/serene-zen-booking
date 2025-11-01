import { Layout } from "@/components/layout/Layout";
import { Hero } from "@/components/home/Hero";
import { BrandShowcase } from "@/components/home/BrandShowcase";
import { WellnessJourney } from "@/components/home/WellnessJourney";
import { ServiceGallery } from "@/components/home/ServiceGallery";
// import { FeaturedServices } from "@/components/home/FeaturedServices";
import { MembershipTeaser } from "@/components/home/MembershipTeaser";
import { GiftVoucherBanner } from "@/components/home/GiftVoucherBanner";
import { Testimonials } from "@/components/home/Testimonials";
import { CTABand } from "@/components/home/CTABand";

export default function HomePage() {
  return (
    <Layout>
      <Hero />
      <BrandShowcase />
      <WellnessJourney />
      <ServiceGallery />
      {/* <FeaturedServices /> */}
      <MembershipTeaser />
      <GiftVoucherBanner />
      <Testimonials />
      <CTABand />
    </Layout>
  );
}