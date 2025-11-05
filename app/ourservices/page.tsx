"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Clock, Plus, Minus, Leaf } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { BookingModal } from "@/components/ui/booking-modal";

interface Category {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  order: number;
}

interface Service {
  _id: string;
  title: string;
  category: Category;
  shortDesc: string;
  longDesc?: string;
  benefits: string[];
  durations: { minutes: number; price: number }[];
  images: string[];
  featured: boolean;
}

interface CategorizedServices {
  category: Category;
  services: Service[];
}

export default function EnhancedServicesPage() {
  const [categorizedServices, setCategorizedServices] = useState<CategorizedServices[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [heroImage, setHeroImage] = useState<string>('');
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        // Load services
        const servicesResponse = await fetch('/api/services/grouped/categories');
        const servicesData = await servicesResponse.json();
        if (servicesData.success) {
          setCategorizedServices(servicesData.data);
        }

        // Load hero image from settings
        const settingsResponse = await fetch('/api/settings');
        const settingsData = await settingsResponse.json();
        if (settingsData.success && settingsData.data.service_page_hero_image) {
          setHeroImage(settingsData.data.service_page_hero_image);
        }
      } catch (error) {
        console.error('Failed to load data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const toggleCategory = (categoryId: string) => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
  };

  const handleBookNow = () => {
    setIsBookingModalOpen(true);
  };

  if (isLoading) {
    return (
      <>
        <Layout>
          <div className="min-h-screen bg-gradient-to-b from-amber-50 via-white to-emerald-50">
            <div className="max-w-7xl mx-auto px-6 py-24">
              <div className="text-center mb-20">
                <div className="h-16 bg-gray-200 rounded-lg mb-6 mx-auto w-96 animate-pulse"></div>
                <div className="h-6 bg-gray-200 rounded-lg mx-auto w-2/3 animate-pulse"></div>
              </div>
              <div className="space-y-6">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="h-24 bg-white rounded-lg shadow-sm animate-pulse"></div>
                ))}
              </div>
            </div>
          </div>
        </Layout>

        <BookingModal
          isOpen={isBookingModalOpen}
          onClose={() => setIsBookingModalOpen(false)}
        />
      </>
    );
  }

  return (
    <>
      <Layout>
        <div className="min-h-screen bg-gradient-to-b from-amber-50 via-white to-emerald-50">
          {/* Hero Section with Background Image */}
          <div className="relative overflow-hidden py-20" style={{ backgroundImage: `url(${heroImage || '/assets/service-traditional.jpg'})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <div className="absolute inset-0 bg-black/40"></div>
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-10 left-10 w-64 h-64 bg-amber-400 rounded-full blur-3xl"></div>
              <div className="absolute bottom-10 right-10 w-96 h-96 bg-emerald-400 rounded-full blur-3xl"></div>
            </div>
            
            <div className="relative max-w-7xl mx-auto px-6 text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="flex justify-center mb-6">
                  <Leaf className="w-16 h-16 text-white" />
                </div>
                <h1 className="text-6xl md:text-7xl font-serif font-bold text-white mb-6 tracking-tight drop-shadow-lg">
                  Our Services
                </h1>
                <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed drop-shadow-md">
                  Discover our range of authentic Thai wellness treatments designed to restore balance and harmony
                </p>
              </motion.div>
            </div>
          </div>

          {/* Services Section */}
          <div className="max-w-7xl mx-auto px-6 py-20">
            <div className="space-y-4">
              {categorizedServices.map((categoryGroup, index) => (
                <motion.div
                  key={categoryGroup.category._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
                >
                  {/* Category Header */}
                  <button
                    onClick={() => toggleCategory(categoryGroup.category._id)}
                    className="w-full px-8 py-6 flex items-center justify-between hover:bg-amber-50 transition-colors duration-300"
                  >
                    <h2 className="text-1xl md:text-2xl font-serif font-bold text-gray-900 tracking-tight">
                      {categoryGroup.category.name.toUpperCase()}
                    </h2>
                    <div className="w-12 h-12 rounded-full bg-amber-200 flex items-center justify-center hover:bg-amber-300 transition-colors duration-300">
                      {expandedCategory === categoryGroup.category._id ? (
                        <Minus className="w-6 h-6 text-amber-900" />
                      ) : (
                        <Plus className="w-6 h-6 text-amber-900" />
                      )}
                    </div>
                  </button>

                  {/* Expanded Services */}
                  <AnimatePresence>
                    {expandedCategory === categoryGroup.category._id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="px-8 pb-8 pt-4 space-y-8 bg-gradient-to-b from-white to-amber-50/30">
                          {categoryGroup.category.description && (
                            <p className="text-gray-600 text-lg max-w-3xl">
                              {categoryGroup.category.description}
                            </p>
                          )}
                          
                          {categoryGroup.services.map((service, serviceIndex) => (
                            <motion.div
                              key={service._id}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: serviceIndex * 0.1 }}
                              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-200"
                            >
                              <div className="grid md:grid-cols-3 gap-0">
                                {/* Service Image */}
                                <div className="relative h-72 md:h-full overflow-hidden">
                                  <img
                                    src={service.images[0] || '/assets/service-traditional.jpg'}
                                    alt={service.title}
                                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                                  />
                                  <div className="absolute inset-0 bg-gradient-to-r from-black/10 to-transparent"></div>
                                </div>

                                {/* Service Details */}
                                <div className="md:col-span-2 p-6 flex flex-col">
                                  <div className="flex-1">
                                    <h3 className="text-2xl font-serif font-bold text-gray-900 mb-3">
                                      {service.title}
                                    </h3>
                                    <p className="text-gray-600 text-base leading-relaxed mb-4">
                                      {service.shortDesc}
                                    </p>

                                    {/* Benefits */}
                                    {service.benefits.length > 0 && (
                                      <div className="mb-4">
                                        <h4 className="text-xs font-bold text-gray-900 mb-2 uppercase tracking-wider">
                                          Key Benefits
                                        </h4>
                                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                          {service.benefits.slice(0, 4).map((benefit, idx) => (
                                            <li key={idx} className="flex items-start text-sm">
                                              <span className="text-emerald-600 mr-2 mt-0.5">✓</span>
                                              <span className="text-gray-700">{benefit}</span>
                                            </li>
                                          ))}
                                        </ul>
                                      </div>
                                    )}
                                  </div>

                                  {/* Bottom Section: Pricing & Button */}
                                  <div className="mt-4 pt-4 border-t border-gray-100">
                                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                      {/* Pricing */}
                                      <div className="flex flex-wrap gap-2">
                                        {service.durations.map((duration, idx) => (
                                          <div
                                            key={idx}
                                            className="inline-flex items-center gap-2 bg-amber-50 px-4 py-2 rounded-lg border border-amber-200"
                                          >
                                            <Clock className="w-4 h-4 text-amber-600" />
                                            <span className="text-sm font-semibold text-gray-800">
                                              {duration.minutes} mins
                                            </span>
                                            <span className="text-gray-400">|</span>
                                            <span className="text-lg font-bold text-amber-700">
                                              ₹{duration.price}
                                            </span>
                                          </div>
                                        ))}
                                      </div>

                                      {/* Book Button */}
                                      <button
                                        onClick={handleBookNow}
                                        className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold px-6 py-2.5 rounded-lg flex items-center justify-center gap-2 transition-all duration-300 shadow-sm hover:shadow-md whitespace-nowrap"
                                      >
                                        <Calendar className="w-4 h-4" />
                                        BOOK NOW
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Decorative Footer Element */}
          <div className="relative h-32 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-emerald-100 to-transparent"></div>
          </div>
        </div>
      </Layout>

      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
      />
    </>
  );
}
