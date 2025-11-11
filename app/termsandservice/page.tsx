import type { Metadata } from "next";
import TermsAndServiceClient from "./TermsAndServiceClient";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "default-no-store";

export async function generateMetadata(): Promise<Metadata> {
  const publicBase = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const title = "Terms & Services - SpaFort | Service Terms & Conditions";
  const description =
    "Read SpaFort's terms and services. Learn about booking policies, cancellation terms, health and safety guidelines, and membership conditions.";
  const canonical = `${publicBase}/termsandservice`;

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
      images: [
        {
          url: `${publicBase}/assets/hero-spa.jpg`,
          width: 1200,
          height: 630,
          alt: "SpaFort - Terms & Services",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${publicBase}/assets/hero-spa.jpg`],
    },
  };
}

export default async function Page() {
  return <TermsAndServiceClient />;
}
