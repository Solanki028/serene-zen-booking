import type { Metadata } from "next";
import CategoryClient, { CategoryData } from "./CategoryClient";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "default-no-store";

type Params = { categorySlug: string };

async function fetchCategory(publicBase: string, categorySlug: string): Promise<CategoryData | null> {
  const res = await fetch(
    `${publicBase}/api/articles/category/${encodeURIComponent(categorySlug)}`,
    { cache: "no-store" }
  );
  if (!res.ok) return null;
  const json = await res.json().catch(() => null);
  if (!json || !json.success) return null;
  return json.data as CategoryData;
}

export async function generateMetadata(
  { params }: { params: Promise<Params> },
): Promise<Metadata> {
  const { categorySlug } = await params;

  const publicBase =
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const data = await fetchCategory(publicBase, categorySlug);
  const categoryName =
    data?.category?.name ??
    categorySlug.replace(/-/g, " ").replace(/^\w/, (c) => c.toUpperCase());

  const title = `${categoryName} Articles - Velora Thai Spa`;
  const description = `Explore curated articles on ${categoryName} from Velora Thai Spa—wellness insights, spa tips, and healthy living.`;
  const canonical = `${publicBase}/articles/${categorySlug}`;
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
      images: [{ url: image, width: 1200, height: 630, alt: `${categoryName} Articles - Velora Thai Spa` }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const { categorySlug } = await params;

  const publicBase =
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const data = await fetchCategory(publicBase, categorySlug);

  return <CategoryClient data={data} />;
}
