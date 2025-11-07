"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Calendar, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BookingModal } from "@/components/ui/booking-modal";

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

  // --- timer to prevent gap flicker on hover
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const handleArticlesEnter = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    setIsArticlesDropdownOpen(true);
  };
  const handleArticlesLeave = () => {
    closeTimerRef.current = setTimeout(() => {
      setIsArticlesDropdownOpen(false);
    }, 180);
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    };
  }, []);

  useEffect(() => {
    const loadArticleCategories = async () => {
      try {
        const response = await fetch("/api/article-categories");
        const result = await response.json();
        if (result && Array.isArray(result)) setArticleCategories(result);
      } catch (error) {
        console.error("Failed to load article categories:", error);
      }
    };
    loadArticleCategories();
  }, []);

  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const handleBookNow = () => setIsBookingModalOpen(true);

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/ourservices", label: "Our Services" },
    { to: "/membership", label: "Membership" },
    { to: "/giftvoucher", label: "Gift Vouchers" },
    { to: "/gallery", label: "Gallery" },
    { to: "/aboutus", label: "About Us" },
  ];

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/70 backdrop-blur-md shadow-sm py-3"
          : "bg-white/60 backdrop-blur-sm py-4"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Brand */}
          <Link href="/" className="flex items-center gap-2">
            <div className="playfair-heading text-2xl sm:text-[32px] font-bold text-primary tracking-[-0.2px]">
              Velora Thai Spa
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => {
              const active = pathname === link.to;
              return (
                <Link
                  key={link.to}
                  href={link.to}
                  className={[
                    // premium serif for top-level items
                    "playfair-heading text-[16.5px] tracking-[-0.15px] font-semibold",
                    "relative transition-colors",
                    active ? "text-primary" : "text-gray-700 hover:text-primary",
                    // soft underline
                    "after:absolute after:-bottom-1 after:left-1/2 after:-translate-x-1/2 after:h-[2px] after:w-0 after:rounded-full after:bg-gradient-to-r after:from-transparent after:via-primary after:to-transparent after:transition-all after:duration-300 hover:after:w-8",
                    active ? "after:w-8" : "",
                  ].join(" ")}
                >
                  {link.label}
                </Link>
              );
            })}

            {/* Articles Dropdown */}
            <div
              className="relative"
              onMouseEnter={handleArticlesEnter}
              onMouseLeave={handleArticlesLeave}
            >
              <button
                className={[
                  "playfair-heading text-[16.5px] tracking-[-0.15px] font-semibold",
                  "relative transition-colors flex items-center gap-1",
                  pathname.startsWith("/articles")
                    ? "text-primary"
                    : "text-gray-700 hover:text-primary",
                  "after:absolute after:-bottom-1 after:left-1/2 after:-translate-x-1/2 after:h-[2px] after:w-0 after:rounded-full after:bg-gradient-to-r after:from-transparent after:via-primary after:to-transparent after:transition-all after:duration-300 hover:after:w-8",
                  pathname.startsWith("/articles") ? "after:w-8" : "",
                ].join(" ")}
              >
                Articles
                <ChevronDown className="w-4 h-4" />
              </button>

              {/* Dropdown Menu */}
              {isArticlesDropdownOpen && (
                <div
                  className="absolute top-full left-0 mt-3 w-64 rounded-xl border border-gray-200/70 bg-white/90 backdrop-blur-md shadow-lg py-2 z-50"
                  onMouseEnter={handleArticlesEnter}
                  onMouseLeave={handleArticlesLeave}
                >
                  {articleCategories.length > 0 ? (
                    articleCategories.map((category) => (
                      <Link
                        key={category._id}
                        href={`/articles/${category.slug}`}
                        className="block px-4 py-2 text-[15px] text-gray-800 hover:bg-gray-50/80 hover:text-primary transition-colors"
                        onClick={() => setIsArticlesDropdownOpen(false)}
                      >
                        {category.name}
                      </Link>
                    ))
                  ) : (
                    <div className="px-4 py-2 text-sm text-gray-500">No categories available</div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <Button
              onClick={handleBookNow}
              className="rounded-full px-5 py-2.5 shadow-sm hover:shadow-md transition-shadow playfair-heading font-semibold tracking-[-0.1px]"
            >
              <Calendar className="h-4 w-4 mr-2" />
              Book Now
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 -mr-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden pt-4 pb-3 space-y-3 border-t border-gray-200 mt-4">
            {navLinks.map((link) => {
              const active = pathname === link.to;
              return (
                <Link
                  key={link.to}
                  href={link.to}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={[
                    "block py-2 playfair-heading text-[18px] tracking-[-0.15px] font-semibold",
                    active ? "text-primary" : "text-gray-700 hover:text-primary",
                  ].join(" ")}
                >
                  {link.label}
                </Link>
              );
            })}

            {/* Mobile Articles Section */}
            <div className="space-y-2">
              <div className="playfair-heading text-[14px] font-semibold text-gray-900 uppercase tracking-wider">
                Articles
              </div>
              {articleCategories.length > 0 ? (
                articleCategories.map((category) => (
                  <Link
                    key={category._id}
                    href={`/articles/${category.slug}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block py-2 pl-4 text-[15px] text-gray-700 hover:text-primary transition-colors"
                  >
                    {category.name}
                  </Link>
                ))
              ) : (
                <div className="py-2 pl-4 text-sm text-gray-500">No categories available</div>
              )}
            </div>

            <Button
              onClick={handleBookNow}
              className="w-full rounded-full py-2.5 playfair-heading font-semibold tracking-[-0.1px]"
            >
              <Calendar className="h-4 w-4 mr-2" />
              Book Now
            </Button>
          </div>
        )}
      </div>

      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
      />
    </nav>
  );
};
