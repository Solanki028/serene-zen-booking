import { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "SpaFort - Premium Wellness & Massage Services",
  description: "Experience ultimate relaxation at SpaFort. Book professional massage, wellness treatments, and spa services in a serene environment. Traditional Thai massage, aromatherapy, deep tissue massage, and more.",
  keywords: ["spa", "massage", "wellness", "thai massage", "relaxation", "beauty treatments", "aromatherapy", "deep tissue massage"],
  openGraph: {
    title: "SpaFort - Premium Wellness & Massage Services",
    description: "Experience ultimate relaxation at SpaFort. Book professional massage, wellness treatments, and spa services in a serene environment.",
    url: "/",
    siteName: "SpaFort",
    images: [
      {
        url: "/assets/hero-spa.jpg",
        width: 1200,
        height: 630,
        alt: "SpaFort - Premium Wellness Services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SpaFort - Premium Wellness & Massage Services",
    description: "Experience ultimate relaxation at SpaFort. Book professional massage, wellness treatments, and spa services in a serene environment.",
    images: ["/assets/hero-spa.jpg"],
  },
};

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