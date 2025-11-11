"use client";

import Link from "next/link";
import { Layout } from "@/components/layout/Layout";
import { useEffect, useState } from "react";

type GalleryImage = {
  _id: string;
  url: string;
  title?: string;
  caption?: string;
  alt?: string;
  width?: number;
  height?: number;
  tags?: string[];
  isPublished?: boolean;
  order?: number;
  createdAt?: string;
};

type GalleryResponse = {
  success: boolean;
  data: GalleryImage[];
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};

type Settings = {
  gallery_page_hero_image?: string;
  gallery_page_hero_title?: string;
  gallery_page_hero_subtitle?: string;
};

import GalleryGrid from "./GalleryGrid";

function GalleryPageContent() {
  const [settings, setSettings] = useState<Settings>({});
  const [data, setData] = useState<GalleryResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        // Fetch settings
        try {
          const settingsRes = await fetch('/api/settings');
          if (settingsRes.ok) {
            const settingsData = await settingsRes.json();
            setSettings(settingsData?.data ?? {});
          }
        } catch (error) {
          console.error('Settings fetch error:', error);
        }

        // Fetch gallery data
        try {
          const galleryRes = await fetch('/api/gallery/public?page=1&limit=30');
          if (galleryRes.ok) {
            const galleryData = await galleryRes.json();
            setData(galleryData);
          }
        } catch (error) {
          console.error('Gallery fetch error:', error);
        }
      } catch (error) {
        console.error('Data loading error:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const heroUrl = settings.gallery_page_hero_image?.trim() || "";
  const heroTitle = (settings.gallery_page_hero_title || "Gallery").trim();
  const heroSubtitle =
    (settings.gallery_page_hero_subtitle ||
      "Explore our ambience, rooms, and wellness experience.").trim();

  const items = data?.data ?? [];
  const totalPages = data?.pagination?.totalPages ?? 1;
  const hasPrev = false; // For page 1
  const hasNext = totalPages > 1;

  useEffect(() => {
    if (!loading) {
      // Set page-specific metadata
      document.title = heroTitle;

      // Update or create meta tags
      const updateMetaTag = (name: string, content: string, property = false) => {
        const attribute = property ? 'property' : 'name';
        let meta = document.querySelector(`meta[${attribute}="${name}"]`) as HTMLMetaElement;
        if (!meta) {
          meta = document.createElement('meta');
          meta.setAttribute(attribute, name);
          document.head.appendChild(meta);
        }
        meta.content = content;
      };

      // Basic meta tags
      updateMetaTag('description', heroSubtitle);
      updateMetaTag('keywords', 'spa gallery, wellness photos, massage rooms, spa ambience, velora thai spa');

      // Open Graph tags
      updateMetaTag('og:title', heroTitle, true);
      updateMetaTag('og:description', heroSubtitle, true);
      updateMetaTag('og:url', `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/gallery`, true);
      updateMetaTag('og:site_name', "Velora Thai Spa", true);
      updateMetaTag('og:image', heroUrl ? `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}${heroUrl}` : `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/assets/hero-spa.jpg`, true);
      updateMetaTag('og:image:width', "1200", true);
      updateMetaTag('og:image:height', "630", true);
      updateMetaTag('og:image:alt', `Velora Thai Spa Gallery - ${heroTitle}`, true);

      // Twitter Card tags
      updateMetaTag('twitter:card', "summary_large_image");
      updateMetaTag('twitter:title', heroTitle);
      updateMetaTag('twitter:description', heroSubtitle);
      updateMetaTag('twitter:image', heroUrl ? `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}${heroUrl}` : `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/assets/hero-spa.jpg`);

      // Cleanup function to reset to default when component unmounts
      return () => {
        document.title = "Velora Thai Spa - Premium Wellness & Massage Services";
      };
    }
  }, [heroTitle, heroSubtitle, heroUrl, loading]);

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Loading gallery...</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
     {heroUrl && (
  <section className="relative mb-12 w-full">
    <img
      src={heroUrl}
      alt={heroTitle || "Gallery hero"}
      className="block w-full h-[260px] sm:h-[400px] lg:h-[520px] object-cover"
      loading="eager"
      decoding="async"
    />

    {/* premium overlay: dark + blur + vignette */}
    <div className="absolute inset-0 bg-black/45 backdrop-blur-[1.5px]" />
    <div className="absolute inset-0 pointer-events-none [mask-image:radial-gradient(ellipse_at_center,black_60%,transparent_100%)]" />

    {/* content */}
    <div className="absolute inset-0 flex items-center justify-center px-6">
      <div className="text-center text-white">

        {/* soft halo icon */}
        {/* <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/20 backdrop-blur-sm mb-5">
          <svg viewBox="0 0 24 24" className="h-6 w-6 text-white/90">
            <path fill="currentColor" d="M12 2a1 1 0 0 1 1 1v2a1 1 0 1 1-2 0V3a1 1 0 0 1 1-1Zm8 9a1 1 0 1 1 0 2h-2a1 1 0 1 1 0-2h2ZM6 12a1 1 0 0 1-1 1H3a1 1 0 1 1 0-2h2a1 1 0 0 1 1 1Zm10.95 6.536a1 1 0 1 1-1.414 1.414l-1.415-1.414a1 1 0 0 1 1.415-1.415l1.414 1.415ZM9.88 6.464a1 1 0 1 1-1.415 1.414L7.05 6.464A1 1 0 1 1 8.465 5.05L9.88 6.464Zm6.657-1.414A1 1 0 1 1 18 6.464l-1.414 1.414A1 1 0 1 1 15.17 6.464L16.536 5.05ZM7.05 17.95a1 1 0 1 1-1.414-1.414l1.414-1.415a1 1 0 1 1 1.414 1.415L7.05 17.95ZM12 8a4 4 0 1 1 0 8 4 4 0 0 1 0-8Z"/>
          </svg>
        </span> */}

        {/* premium title */}
        <h1 className="playfair-heading text-5xl sm:text-6xl lg:text-7xl font-bold tracking-[-0.5px] drop-shadow-[0_8px_20px_rgba(0,0,0,0.45)]">
          {heroTitle}
        </h1>

        {/* elegant divider */}
        <div className="mx-auto mt-4 h-[2px] w-24 rounded-full bg-gradient-to-r from-transparent via-white/80 to-transparent" />

        {/* subtitle */}
        <p className="playfair-heading mt-4 text-base sm:text-lg lg:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
          {heroSubtitle}
        </p>
      </div>
    </div>
  </section>
)}


      <div className="container mx-auto px-4 py-10">
        {!heroUrl && (
          <>
            <h1 className="text-3xl font-semibold tracking-tight">Gallery</h1>
            <p className="text-muted-foreground mt-2">
              Explore our ambience, rooms, and wellness experience.
            </p>
          </>
        )}

        {!data && (
          <div className="mt-10 border rounded-xl p-10 text-center">
            <div className="text-lg font-medium">Couldn't load gallery</div>
            <div className="text-sm text-muted-foreground mt-1">
              Please refresh the page or try again later.
            </div>
          </div>
        )}

        {data && items.length === 0 && (
          <div className="mt-10 border rounded-xl p-10 text-center">
            <div className="text-lg font-medium">No images yet</div>
            <div className="text-sm text-muted-foreground mt-1">
              Add photos from CMS, and they’ll appear here automatically.
            </div>
          </div>
        )}

        {items.length > 0 && (
          <GalleryGrid
            items={items.map((img) => ({
              _id: img._id,
              url: img.url,
              alt: img.alt?.trim() || img.title?.trim() || "Spa gallery image",
            }))}
          />
        )}

        {data && totalPages > 1 && (
          <div className="mt-8 flex items-center justify-center gap-3">
            <Link
              href={{
                pathname: "/gallery",
                query: { page: hasPrev ? 1 - 1 : 1 },
              }}
              className={`px-4 py-2 rounded-md border text-sm ${
                hasPrev
                  ? "hover:bg-accent hover:text-accent-foreground"
                  : "opacity-50 cursor-not-allowed"
              }`}
              aria-disabled={!hasPrev}
            >
              Prev
            </Link>
            <span className="text-sm text-muted-foreground">
              Page 1 of {totalPages}
            </span>
            <Link
              href={{
                pathname: "/gallery",
                query: {
                  page: hasNext ? 1 + 1 : totalPages,
                },
              }}
              className={`px-4 py-2 rounded-md border text-sm ${
                hasNext
                  ? "hover:bg-accent hover:text-accent-foreground"
                  : "opacity-50 cursor-not-allowed"
              }`}
              aria-disabled={!hasNext}
            >
              Next
            </Link>
          </div>
        )}
      </div>
    </Layout>
  );
}

export default function GalleryPage() {
  return <GalleryPageContent />;
}