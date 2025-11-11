import type { Metadata } from "next";
import GiftVoucherClient from "./GiftVoucherClient";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "default-no-store";

export async function generateMetadata(): Promise<Metadata> {
  const publicBase = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const title = "Gift Vouchers - SpaFort | Perfect Wellness Gifts";
  const description =
    "Give the perfect gift of wellness with SpaFort gift vouchers. Beautifully designed, flexible amounts, and never expire. Perfect for birthdays, anniversaries, and special occasions.";
  const canonical = `${publicBase}/giftvoucher`;
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
      images: [{ url: image, width: 1200, height: 630, alt: "SpaFort Gift Vouchers - Perfect Wellness Gifts" }],
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
  return <GiftVoucherClient />;
}
