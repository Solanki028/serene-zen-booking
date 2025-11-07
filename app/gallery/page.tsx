import Link from "next/link";
import { Layout } from "@/components/layout/Layout";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata = {
  title: "Gallery | Velora Thai Spa",
  description: "Relaxing ambiance and spa interiors — photo gallery.",
};

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

async function fetchJSON(url: string) {
  const res = await fetch(url, { cache: "no-store", next: { revalidate: 0 } });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const text = await res.text();
  return JSON.parse(text);
}

async function fetchSettings(): Promise<Settings> {
  try {
    const j = await fetchJSON(`/api/settings`);
    return (j?.data ?? {}) as Settings;
  } catch {
    const BACKEND =
      process.env.BACKEND_URL?.replace(/\/+$/, "") || "http://localhost:5000";
    const j = await fetchJSON(`${BACKEND}/api/settings`);
    return (j?.data ?? {}) as Settings;
  }
}

async function fetchGallery(page: number, limit: number, tag?: string) {
  const qs = new URLSearchParams();
  qs.set("page", String(page));
  qs.set("limit", String(limit));
  if (tag) qs.set("tag", tag);

  try {
    return (await fetchJSON(
      `/api/gallery/public?${qs.toString()}`
    )) as GalleryResponse;
  } catch {
    const BACKEND =
      process.env.BACKEND_URL?.replace(/\/+$/, "") || "http://localhost:5000";
    return (await fetchJSON(
      `${BACKEND}/api/gallery/public?${qs.toString()}`
    )) as GalleryResponse;
  }
}

import GalleryGrid from "./GalleryGrid";

export default async function GalleryPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; tag?: string }>;
}) {
  const sp = await searchParams;
  const page = Math.max(Number(sp?.page ?? 1) || 1, 1);
  const limit = 30;
  const tag = sp?.tag;

  const [settings, data] = await Promise.all([
    fetchSettings(),
    fetchGallery(page, limit, tag).catch(() => null),
  ]);

  const heroUrl = settings.gallery_page_hero_image?.trim() || "";
  const heroTitle = (settings.gallery_page_hero_title || "Gallery").trim();
  const heroSubtitle =
    (settings.gallery_page_hero_subtitle ||
      "Explore our ambience, rooms, and wellness experience.").trim();

  const items = data?.data ?? [];
  const totalPages = data?.pagination?.totalPages ?? 1;
  const hasPrev = page > 1;
  const hasNext = page < totalPages;

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
            <div className="text-lg font-medium">Couldn&apos;t load gallery</div>
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
                query: { ...(tag ? { tag } : {}), page: hasPrev ? page - 1 : 1 },
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
              Page {page} of {totalPages}
            </span>
            <Link
              href={{
                pathname: "/gallery",
                query: {
                  ...(tag ? { tag } : {}),
                  page: hasNext ? page + 1 : totalPages,
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
