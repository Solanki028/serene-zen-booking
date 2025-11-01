"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const services = [
  {
    image: "/assets/1.jpg",
    title: "Body Massage",
    subtitle: "Relax & Restore",
    alt: "body Massage",
    gradient: "from-rose-500/90 via-pink-500/80 to-transparent"
  },
  {
    image: "/assets/2.jpg",
    title: "Footer Therapies",
    subtitle: "Step into Wellness",
    alt: "footer therapies",
    gradient: "from-emerald-500/90 via-teal-500/80 to-transparent"
  },
  {
    image: "/assets/3.jpg",
    title: "Head & Face",
    subtitle: "Rejuvenate & Glow",
    alt: "head & face",
    gradient: "from-amber-500/90 via-orange-500/80 to-transparent"
  },
  {
    image: "/assets/4.jpg",
    title: "Manicure & Pedicure",
    subtitle: "Polish & Pamper",
    alt: "manicure & pedicure",
    gradient: "from-violet-500/90 via-purple-500/80 to-transparent"
  }
];

export const ServiceGallery = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-white via-amber-50/20 to-rose-50/20">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-4xl md:text-5xl font-serif text-gray-800 mb-3">
            Explore Our Services
          </h2>
          <p className="text-gray-600 text-lg">Discover the perfect treatment for your wellness journey</p>
          <div className="w-24 h-1 bg-gradient-to-r from-rose-400 via-amber-400 to-violet-400 mx-auto rounded-full mt-4"></div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.12, duration: 0.6 }}
              className="group cursor-pointer h-full"
            >
              <Link href="/ourservices">
                <div className="relative overflow-hidden rounded-2xl shadow-xl group-hover:shadow-2xl transition-all duration-500 h-80 md:h-96">
                  {/* Image */}
                  <Image
                    src={service.image}
                    alt={service.alt}
                    width={400}
                    height={500}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  
                  {/* Gradient Overlay - Always visible */}
                  <div className={`absolute inset-0 bg-gradient-to-t ${service.gradient} opacity-60 group-hover:opacity-75 transition-opacity duration-500`}></div>
                  
                  {/* Decorative shine effect on hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  </div>

                  {/* Content - Always visible */}
                  <div className="absolute inset-0 flex flex-col justify-end p-6">
                    {/* Decorative element */}
                    <div className="mb-3 flex items-center gap-2">
                      <div className="w-12 h-0.5 bg-white/80 group-hover:w-16 transition-all duration-500"></div>
                      <div className="w-2 h-2 bg-white/80 rounded-full"></div>
                    </div>

                    {/* Title - Always visible with beautiful typography */}
                    <h3 className="text-2xl md:text-3xl font-serif font-bold text-white mb-2 tracking-wide drop-shadow-lg group-hover:translate-y-0 transition-transform duration-500">
                      {service.title}
                    </h3>
                    
                    {/* Subtitle - Always visible */}
                    <p className="text-sm font-light tracking-widest uppercase text-white/90 mb-4 drop-shadow-md">
                      {service.subtitle}
                    </p>

                    {/* CTA Button - Appears on hover */}
                    <div className="opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                      <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full border border-white/30 text-white text-sm font-medium hover:bg-white/30 transition-colors">
                        <span>Explore More</span>
                        <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Corner accent */}
                  <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-white/40 opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:scale-110"></div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="text-center mt-12"
        >
          <Link href="/ourservices">
            <button className="px-8 py-3 bg-gradient-to-r from-rose-500 to-violet-500 text-white font-semibold rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
              View All Services
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};