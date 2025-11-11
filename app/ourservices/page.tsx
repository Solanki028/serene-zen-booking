import type { Metadata } from "next";
import OurServicesClient from "./OurServicesClient";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "default-no-store";

export async function generateMetadata(): Promise<Metadata> {
  const publicBase = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const title = "Our Services - SpaFort | Professional Massage & Wellness Treatments";
  const description =
    "Explore our comprehensive range of professional massage and wellness services at SpaFort. Traditional Thai massage, aromatherapy, deep tissue massage, foot reflexology, and signature spa treatments.";
  const canonical = `${publicBase}/ourservices`;
  const image = `${publicBase}/assets/service-traditional.jpg`;

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: "SpaFort",
      type: "website",
      images: [{ url: image, width: 1200, height: 630, alt: "Professional Massage & Wellness Services at SpaFort" }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export default async function Page() {
  return <OurServicesClient />;
}
