"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Calendar, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ArticleCategory {
  _id: string;
  name: string;
  slug: string;
}

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isArticlesDropdownOpen, setIsArticlesDropdownOpen] = useState(false);
  const [articleCategories, setArticleCategories] = useState<ArticleCategory[]>([]);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const loadArticleCategories = async () => {
      try {
        const response = await fetch('/api/article-categories');
        const result = await response.json();
        if (result && Array.isArray(result)) {
          setArticleCategories(result);
        }
      } catch (error) {
        console.error('Failed to load article categories:', error);
      }
    };

    loadArticleCategories();
  }, []);

  const handleBookNow = () => {
    window.open("https://aromathaispa.zenoti.com", "_blank");
  };

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/ourservices", label: "Our Services" },
    { to: "/membership", label: "Membership" },
    { to: "/giftvoucher", label: "Gift Vouchers" },
    { to: "/aboutus", label: "About Us" },
  ];

  return (
    <nav 
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? "bg-card/95 backdrop-blur-md shadow-md py-3" 
          : "bg-card py-4"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="text-2xl font-serif font-bold text-primary">
              Aroma Thai Spa
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                href={link.to}
                className={`text-sm font-medium transition-colors hover:text-primary relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full ${
                  pathname === link.to
                    ? "text-primary after:w-full"
                    : "text-muted-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}

            {/* Articles Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setIsArticlesDropdownOpen(true)}
              onMouseLeave={() => setIsArticlesDropdownOpen(false)}
            >
              <button
                className={`text-sm font-medium transition-colors hover:text-primary relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full flex items-center gap-1 ${
                  pathname.startsWith('/articles')
                    ? "text-primary after:w-full"
                    : "text-muted-foreground"
                }`}
              >
                Articles
                <ChevronDown className="w-4 h-4" />
              </button>

              {/* Dropdown Menu */}
              {isArticlesDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                  {articleCategories.length > 0 ? (
                    articleCategories.map((category) => (
                      <Link
                        key={category._id}
                        href={`/articles/${category.slug}`}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors"
                        onClick={() => setIsArticlesDropdownOpen(false)}
                      >
                        {category.name}
                      </Link>
                    ))
                  ) : (
                    <div className="px-4 py-2 text-sm text-gray-500">
                      No categories available
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
 
          <div className="hidden lg:flex items-center gap-4">
            <Button onClick={handleBookNow} className="gap-2">
              <Calendar className="h-4 w-4" />
              Book Now
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden pt-4 pb-3 space-y-3 border-t border-border mt-4">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                href={link.to}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block py-2 text-base font-medium transition-colors ${
                  pathname === link.to
                    ? "text-primary"
                    : "text-muted-foreground hover:text-primary"
                }`}
              >
                {link.label}
              </Link>
            ))}

            {/* Mobile Articles Section */}
            <div className="space-y-2">
              <div className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
                Articles
              </div>
              {articleCategories.length > 0 ? (
                articleCategories.map((category) => (
                  <Link
                    key={category._id}
                    href={`/articles/${category.slug}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block py-2 pl-4 text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {category.name}
                  </Link>
                ))
              ) : (
                <div className="py-2 pl-4 text-sm text-gray-500">
                  No categories available
                </div>
              )}
            </div>

            <Button onClick={handleBookNow} className="w-full gap-2">
              <Calendar className="h-4 w-4" />
              Book Now
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};
