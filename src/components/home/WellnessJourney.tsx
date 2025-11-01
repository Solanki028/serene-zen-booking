"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const services = [
  {
    iconUrl: "/assets/massage_8686087.png",
    title: "Body Treatments",
    subtitle: "Revitalize & Rejuvenate",
    description: "Indulge in Body Massages, Scrubs and Mask. Enjoy health benefits, improved skin elasticity & softness along with revived body luster.",
    color: "from-rose-100 to-pink-50",
    accentColor: "text-rose-600"
  },
  {
    iconUrl: "/assets/face.png",
    title: "Face & Head",
    subtitle: "Glow & Clarity",
    description: "Stimulate circulation and rejuvenation of your facial skin. Surrender to our traditional head massages for mind clarity and stress release via herbal oils and skilled therapists.",
    color: "from-amber-100 to-yellow-50",
    accentColor: "text-amber-600"
  },
  {
    iconUrl: "/assets/foot.png",
    title: "Foot Therapies",
    subtitle: "Balance & Bounce",
    description: "India's unmatched Thai foot massages using unique sequences of therapeutic steps, magically instilling balance in your entire body and bounce to your feet.",
    color: "from-emerald-100 to-green-50",
    accentColor: "text-emerald-600"
  },
  {
    iconUrl: "/assets/manicure.png",
    title: "Manicure & Pedicure",
    subtitle: "Polish & Perfection",
    description: "Our services go beyond regular grooming of your nails. Give new life to your nails & skin and enjoy a relaxing foot massage.",
    color: "from-violet-100 to-purple-50",
    accentColor: "text-violet-600"
  }
];

export const WellnessJourney = () => {
  return (
    <section className="py-24 px-4 bg-gradient-to-b from-amber-50/30 via-white to-rose-50/20">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-serif text-gray-800 mb-4">
            Our Signature Services
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-rose-400 to-amber-400 mx-auto rounded-full"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.6 }}
              className="group relative"
            >
              <div className={`relative rounded-3xl bg-gradient-to-br ${service.color} p-8 h-full shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-white/50`}>
                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/30 rounded-full blur-3xl -translate-y-16 translate-x-16 group-hover:scale-150 transition-transform duration-700"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/20 rounded-full blur-2xl translate-y-12 -translate-x-12 group-hover:scale-150 transition-transform duration-700"></div>

                {/* Content */}
                <div className="relative z-10 flex flex-col items-center text-center h-full">
                  {/* Icon with animated background */}
                  <div className="mb-6 relative">
                    <div className={`absolute inset-0 bg-gradient-to-br ${service.color} rounded-full blur-xl opacity-60 group-hover:opacity-100 transition-opacity duration-500`}></div>
                    <div className="relative w-24 h-24 flex items-center justify-center bg-white rounded-full shadow-md group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                      <Image
                        src={service.iconUrl}
                        alt={service.title}
                        width={56}
                        height={56}
                        className="w-14 h-14 object-contain"
                      />
                    </div>
                  </div>

                  {/* Title with beautiful typography */}
                  <h3 className={`text-2xl font-serif font-bold mb-2 ${service.accentColor} tracking-wide`}>
                    {service.title}
                  </h3>

                  {/* Subtitle */}
                  <p className="text-xs font-medium tracking-widest uppercase text-gray-600 mb-4 opacity-80">
                    {service.subtitle}
                  </p>

                  {/* Divider */}
                  <div className={`w-16 h-0.5 bg-gradient-to-r ${service.color} mb-5 group-hover:w-24 transition-all duration-500`}></div>

                  {/* Description */}
                  <p className="text-sm leading-relaxed text-gray-700 flex-grow group-hover:text-gray-900 transition-colors duration-300">
                    {service.description}
                  </p>

                  {/* Hover effect - Learn more */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 0, y: 10 }}
                    whileHover={{ opacity: 1, y: 0 }}
                    className="mt-6 opacity-0 group-hover:opacity-100 transition-all duration-300"
                  >
                    <span className={`text-sm font-semibold ${service.accentColor} flex items-center justify-center gap-2 cursor-pointer`}>
                      Learn More
                      <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}