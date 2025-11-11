"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Calendar, Clock, User, ArrowLeft } from "lucide-react";
import { Layout } from "@/components/layout/Layout";

export interface Article {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  featuredImage?: string;
  author: string;
  publishedAt: string;
  readTime?: number;
}

export interface Category {
  _id: string;
  name: string;
  slug: string;
  description?: string;
}

export interface CategoryData {
  category: Category;
  articles: Article[];
}

export default function CategoryClient({ data }: { data: CategoryData | null }) {
  if (!data) {
    return (
      <Layout>
        <div className="min-h-screen bg-[#fdfbf7] flex items-center justify-center px-6">
          <div className="text-center">
            <h1 className="text-3xl font-serif font-bold text-gray-900 mb-4">Category Not Found</h1>
            <Link href="/articles" className="text-[#b48c52] hover:underline">
              ← Back to Articles
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  const { category, articles } = data;

  return (
    <Layout>
      <div className="min-h-screen bg-[#fdfbf7]">
        <div className="border-b border-[#e8dfcf] bg-white">
          <div className="max-w-6xl mx-auto px-6 py-14">
            <Link
              href="/articles"
              className="inline-flex items-center text-[#b48c52] hover:text-black mb-6 transition-colors font-medium"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Articles
            </Link>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
              <h1 className="text-5xl font-serif font-bold text-gray-900 mb-4 tracking-tight">
                {category.name}
              </h1>
              {category.description && (
                <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                  {category.description}
                </p>
              )}
            </motion.div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-6 py-16">
          {articles.length === 0 ? (
            <div className="text-center py-20">
              <h2 className="text-2xl font-serif font-semibold text-gray-900 mb-4">No Articles Yet</h2>
              <p className="text-gray-600">Check back soon for articles in this category.</p>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
            >
              {articles.map((article, index) => (
                <motion.article
                  key={article._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.08 }}
                  className="bg-white border border-[#f0e8da] rounded-2xl shadow-[0_3px_12px_rgba(0,0,0,0.05)] hover:shadow-[0_6px_18px_rgba(0,0,0,0.08)] transition-all duration-300 overflow-hidden group"
                >
                  <Link href={`/articles/${category.slug}/${article.slug}`}>
                    <div className="relative h-52 overflow-hidden">
                      <img
                        src={article.featuredImage || "/assets/service-traditional.jpg"}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-all duration-300" />
                    </div>
                  </Link>

                  <div className="p-6">
                    <Link href={`/articles/${category.slug}/${article.slug}`}>
                      <h2 className="text-xl font-serif font-semibold text-gray-900 mb-3 group-hover:text-[#b48c52] transition-colors line-clamp-2">
                        {article.title}
                      </h2>
                    </Link>

                    <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                      {article.excerpt}
                    </p>

                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1">
                          <User className="w-4 h-4" />
                          <span>{article.author}</span>
                        </div>
                        {article.readTime && (
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            <span>{article.readTime} min</span>
                          </div>
                        )}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </Layout>
  );
}
