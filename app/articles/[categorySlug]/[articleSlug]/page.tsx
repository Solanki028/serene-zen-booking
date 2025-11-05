"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { marked } from "marked";
import { Calendar, Clock, User, ArrowLeft, Share2 } from "lucide-react";
import { Layout } from "@/components/layout/Layout";

interface Article {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage?: string;
  author: string;
  publishedAt: string;
  readTime?: number;
  category: {
    name: string;
    slug: string;
  };
  tags?: string[];
}

export default function ArticleDetailPage() {
  const params = useParams();
  const slug = params.articleSlug as string;
  const [article, setArticle] = useState<Article | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadArticle = async () => {
      try {
        const categorySlug = params.categorySlug as string;
        const articleSlug = params.articleSlug as string;
        const response = await fetch(`/api/articles/category/${categorySlug}/${articleSlug}`);
        const result = await response.json();
        if (result.success) {
          setArticle(result.data);
        }
      } catch (error) {
        console.error('Failed to load article:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (params.categorySlug && params.articleSlug) {
      loadArticle();
    }
  }, [params.categorySlug, params.articleSlug]);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: article?.title,
          text: article?.excerpt,
          url: window.location.href,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      // You could show a toast notification here
    }
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="min-h-screen bg-gradient-to-b from-amber-50 via-white to-emerald-50">
          <div className="max-w-4xl mx-auto px-6 py-24">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded mb-4 w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded mb-2 w-1/2"></div>
              <div className="h-64 bg-gray-200 rounded-lg mb-8"></div>
              <div className="space-y-4">
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!article) {
    return (
      <Layout>
        <div className="min-h-screen bg-gradient-to-b from-amber-50 via-white to-emerald-50 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Article Not Found</h1>
            <Link href="/articles" className="text-primary hover:underline">
              ← Back to Articles
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-b from-amber-50 via-white to-emerald-50">
        <article className="max-w-4xl mx-auto px-6 py-12">
          {/* Back Navigation */}
          <Link
            href={`/articles/${article.category.slug}`}
            className="inline-flex items-center text-primary hover:text-primary/80 mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to {article.category.name}
          </Link>

          {/* Article Header */}
          <motion.header
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            {/* Category Badge */}
            <Link
              href={`/articles/${article.category.slug}`}
              className="inline-block bg-primary text-white px-3 py-1 rounded-full text-sm font-medium mb-6 hover:bg-primary/90 transition-colors"
            >
              {article.category.name}
            </Link>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6 leading-tight">
              {article.title}
            </h1>

            {/* Excerpt */}
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              {article.excerpt}
            </p>

            {/* Meta Information */}
            <div className="flex flex-wrap items-center justify-between gap-4 py-6 border-y border-gray-200">
              <div className="flex items-center gap-6 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>{article.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(article.publishedAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}</span>
                </div>
                {article.readTime && (
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{article.readTime} min read</span>
                  </div>
                )}
              </div>

              <button
                onClick={handleShare}
                className="flex items-center gap-2 text-gray-600 hover:text-primary transition-colors"
              >
                <Share2 className="w-4 h-4" />
                <span className="text-sm">Share</span>
              </button>
            </div>
          </motion.header>

          {/* Featured Image */}
          {article.featuredImage && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="mb-12"
            >
              <img
                src={article.featuredImage}
                alt={article.title}
                className="w-full h-64 md:h-96 object-cover rounded-xl shadow-lg"
              />
            </motion.div>
          )}

          {/* Article Content */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:text-gray-900 prose-headings:font-bold prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-6 prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-900 prose-blockquote:border-primary prose-blockquote:text-gray-600 prose-img:mx-auto prose-img:block prose-img:my-8"
          >
            {/* Render markdown content */}
            <div
              dangerouslySetInnerHTML={{ __html: marked(article.content) }}
              className="text-left [&_img]:mx-auto [&_img]:block [&_img]:my-8 [&_p]:text-left [&_p]:mb-6 [&_ul]:text-left [&_ol]:text-left [&_li]:text-left [&_blockquote]:text-left [&_h1]:text-left [&_h1]:font-bold [&_h1]:text-3xl [&_h1]:mb-4 [&_h2]:text-left [&_h2]:font-bold [&_h2]:text-2xl [&_h2]:mb-3 [&_h3]:text-left [&_h3]:font-bold [&_h3]:text-xl [&_h3]:mb-2"
            />
          </motion.div>

          {/* Tags */}
          {article.tags && article.tags.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-12 pt-8 border-t border-gray-200"
            >
              <h3 className="text-sm font-semibold text-gray-900 mb-4">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {article.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          )}

          {/* Related Articles / Back to Category */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-16 pt-8 border-t border-gray-200"
          >
            <Link
              href={`/articles/${article.category.slug}`}
              className="inline-flex items-center text-primary hover:text-primary/80 font-medium transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              More articles in {article.category.name}
            </Link>
          </motion.div>
        </article>
      </div>
    </Layout>
  );
}