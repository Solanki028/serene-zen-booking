import type { Metadata } from "next";
import AboutUsClient from "./AboutUsClient";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "default-no-store";

export async function generateMetadata(): Promise<Metadata> {
  const publicBase = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const title = "About Us - Velora Thai Spa | Premium Wellness Experience";
  const description =
    "Discover Velora Thai Spa's story - 16+ years of wellness excellence, serving 20K+ happy clients with 30+ signature treatments. Experience traditional Thai massage and modern healing therapies.";
  const canonical = `${publicBase}/aboutus`;
  const image = `${publicBase}/assets/hero-spa.jpg`;

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: "Velora Thai Spa",
      type: "website",
      images: [{ url: image, width: 1200, height: 630, alt: "About Velora Thai Spa - Premium Wellness Experience" }],
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
  return <AboutUsClient />;
}
