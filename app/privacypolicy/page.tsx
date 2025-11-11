import type { Metadata } from "next";
import PrivacyPolicyClient from "./PrivacyPolicyClient";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "default-no-store";

export async function generateMetadata(): Promise<Metadata> {
  const publicBase = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const title = "Privacy Policy - SpaFort | Data Protection & Privacy";
  const description =
    "Learn about SpaFort's privacy policy and how we protect your personal information. We are committed to safeguarding your data and maintaining your trust.";
  const canonical = `${publicBase}/privacypolicy`;
  const image = `${publicBase}/assets/hero-spa.jpg`;

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
      images: [{ url: image, width: 1200, height: 630, alt: "SpaFort - Privacy Policy" }],
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
  return <PrivacyPolicyClient />;
}
