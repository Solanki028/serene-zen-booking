import type { Metadata, ResolvingMetadata } from "next";
import ArticleClient, { Article } from "./ArticleClient";

export const revalidate = 60; // optional

async function fetchArticle(categorySlug: string, articleSlug: string): Promise<Article | null> {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const res = await fetch(
    `${base}/api/articles/category/${encodeURIComponent(categorySlug)}/${encodeURIComponent(articleSlug)}`,
    { cache: "no-store" }
  );
  const json = await res.json().catch(() => null);
  if (!json || !json.success) return null;
  return json.data as Article;
}

type Params = { categorySlug: string; articleSlug: string };

// ✅ params is a Promise in Next 15+
export async function generateMetadata(
  { params }: { params: Promise<Params> },
  _parent: ResolvingMetadata
): Promise<Metadata> {
  const { categorySlug, articleSlug } = await params; // <-- await here
  const article = await fetchArticle(categorySlug, articleSlug);

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const url = `${siteUrl}/articles/${categorySlug}/${articleSlug}`;

  if (!article) {
    return {
      title: "Article Not Found - Velora Thai Spa",
      description: "The requested article could not be found.",
      alternates: { canonical: url },
      openGraph: {
        title: "Article Not Found - Velora Thai Spa",
        description: "The requested article could not be found.",
        url,
        type: "article",
        images: [{ url: `${siteUrl}/assets/hero-spa.jpg`, width: 1200, height: 630, alt: "Velora Thai Spa" }],
      },
      twitter: {
        card: "summary_large_image",
        title: "Article Not Found - Velora Thai Spa",
        description: "The requested article could not be found.",
        images: [`${siteUrl}/assets/hero-spa.jpg`],
      },
    };
  }

  const image = article.featuredImage?.startsWith("http")
    ? article.featuredImage
    : `${siteUrl}${article.featuredImage || "/assets/hero-spa.jpg"}`;

  return {
    title: `${article.title} - Velora Thai Spa`,
    description: article.excerpt || `Read ${article.title} by ${article.author} at Velora Thai Spa.`,
    keywords: ["wellness", "spa", article.category.name, ...(article.tags ?? []), article.author],
    alternates: { canonical: url },
    openGraph: {
      title: `${article.title} - Velora Thai Spa`,
      description: article.excerpt || `Read ${article.title} by ${article.author} at Velora Thai Spa.`,
      url,
      siteName: "Velora Thai Spa",
      type: "article",
      images: [{ url: image, width: 1200, height: 630, alt: `Article: ${article.title} - Velora Thai Spa` }],
      locale: "en_US",
      authors: [article.author],
      publishedTime: article.publishedAt,
    },
    twitter: {
      card: "summary_large_image",
      title: `${article.title} - Velora Thai Spa`,
      description: article.excerpt || `Read ${article.title} by ${article.author} at Velora Thai Spa.`,
      images: [image],
    },
  };
}

// ✅ params is a Promise here too
export default async function Page({ params }: { params: Promise<Params> }) {
  const { categorySlug, articleSlug } = await params; // <-- await here
  const article = await fetchArticle(categorySlug, articleSlug);

  if (!article) {
    return (
      <div className="min-h-screen bg-[#fdfbf7] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-serif font-bold text-gray-900 mb-4">Article Not Found</h1>
        </div>
      </div>
    );
  }

  return <ArticleClient article={article} />;
}
