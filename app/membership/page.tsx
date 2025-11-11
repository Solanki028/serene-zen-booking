import type { Metadata } from "next";
import MembershipClient from "./MembershipClient";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "default-no-store";

export async function generateMetadata(): Promise<Metadata> {
  const publicBase = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const title = "Membership - Velora Thai Spa | Exclusive Wellness Membership Plans";
  const description =
    "Join Velora Thai Spa's exclusive membership program for unlimited access to premium wellness treatments. Flexible plans, priority booking, and special member benefits.";
  const canonical = `${publicBase}/membership`;
  const image = `${publicBase}/assets/service-traditional.jpg`;

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
      images: [{ url: image, width: 1200, height: 630, alt: "Velora Thai Spa Exclusive Membership Plans" }],
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
  return <MembershipClient />;
}
