import { Inter, Playfair_Display } from "next/font/google";
import { Metadata } from "next";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700"], // <-- add this
  display: "swap",
});

// Default metadata for the entire site
export const metadata: Metadata = {
  title: "Velora Thai Spa - Premium Wellness & Massage Services",
  description: "Experience ultimate relaxation at Velora Thai Spa. Book professional massage, wellness treatments, and spa services in a serene environment.",
  keywords: ["spa", "massage", "wellness", "thai massage", "relaxation", "beauty treatments"],
  authors: [{ name: "Velora Thai Spa" }],
  creator: "Velora Thai Spa",
  publisher: "Velora Thai Spa",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Velora Thai Spa - Premium Wellness & Massage Services",
    description: "Experience ultimate relaxation at Velora Thai Spa. Book professional massage, wellness treatments, and spa services in a serene environment.",
    url: "/",
    siteName: "Velora Thai Spa",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/assets/hero-spa.jpg",
        width: 1200,
        height: 630,
        alt: "Velora Thai Spa - Premium Wellness Services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Velora Thai Spa - Premium Wellness & Massage Services",
    description: "Experience ultimate relaxation at Velora Thai Spa. Book professional massage, wellness treatments, and spa services in a serene environment.",
    images: ["/assets/hero-spa.jpg"],
    creator: "@velorathaispa",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon.ico" />
        <meta name="theme-color" content="#0b132b" />
      </head>
      <body className={`${inter.variable} ${playfair.variable}`}>

        {children}
      </body>
    </html>
  );
}
