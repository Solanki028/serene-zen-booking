"use client";

import Link from "next/link";
import { Layout } from "@/components/layout/Layout";
import { useEffect, useState } from "react";
import GalleryGrid from "./GalleryClientGridProxy"; // tiny proxy we’ll add below

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

export default function GalleryClient({
  initialTitle,
  initialSubtitle,
  initialHeroUrl,
}: {
  initialTitle: string;
  initialSubtitle: string;
  initialHeroUrl: string | null;
}) {
  const [settings, setSettings] = useState<Settings>({
    gallery_page_hero_title: initialTitle,
    gallery_page_hero_subtitle: initialSubtitle,
    gallery_page_hero_image: initialHeroUrl ?? undefined,
  });
  const [data, setData] = useState<GalleryResponse | null>(null);
  const [loading, setLoading] = useState(true);

  // fetch runtime data (settings + gallery)
  useEffect(() => {
    const loadData = async () => {
      try {
        const settingsRes = await fetch("/api/settings");
        if (settingsRes.ok) {
          const s = await settingsRes.json();
          setSettings((prev) => ({ ...prev, ...(s?.data ?? {}) }));
        }
      } catch {}

      try {
        const galleryRes = await fetch("/api/gallery/public?page=1&limit=30");
        if (galleryRes.ok) {
          const g = await galleryRes.json();
          setData(g);
        }
      } catch {}

      setLoading(false);
    };
    loadData();
  }, []);

  const heroUrl = settings.gallery_page_hero_image?.trim() || "";
  const heroTitle = (settings.gallery_page_hero_title || initialTitle).trim();
  const heroSubtitle =
    (settings.gallery_page_hero_subtitle || initialSubtitle).trim();

  const items = data?.data ?? [];
  const totalPages = data?.pagination?.totalPages ?? 1;
  const hasPrev = false;
  const hasNext = totalPages > 1;

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
          <div className="absolute inset-0 bg-black/45 backdrop-blur-[1.5px]" />
          <div className="absolute inset-0 pointer-events-none [mask-image:radial-gradient(ellipse_at_center,black_60%,transparent_100%)]" />
          <div className="absolute inset-0 flex items-center justify-center px-6">
            <div className="text-center text-white">
              <h1 className="playfair-heading text-5xl sm:text-6xl lg:text-7xl font-bold tracking-[-0.5px] drop-shadow-[0_8px_20px_rgba(0,0,0,0.45)]">
                {heroTitle}
              </h1>
              <div className="mx-auto mt-4 h-[2px] w-24 rounded-full bg-gradient-to-r from-transparent via-white/80 to-transparent" />
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
            <h1 className="text-3xl font-semibold tracking-tight">{heroTitle}</h1>
            <p className="text-muted-foreground mt-2">{heroSubtitle}</p>
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
                query: { page: hasNext ? 1 + 1 : totalPages },
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
