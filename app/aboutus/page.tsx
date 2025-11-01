"use client";

import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

const AboutUsPage = () => {
  const milestones = [
    {
      year: "2008",
      title: "Founded",
      description: "Aroma Thai Spa opened its doors with a vision to bring authentic Thai wellness traditions to our community."
    },
    {
      year: "2012",
      title: "Expansion",
      description: "Expanded our facility and added specialized treatment rooms for enhanced guest experience."
    },
    {
      year: "2016",
      title: "Certification",
      description: "Achieved recognition for excellence in traditional Thai massage techniques and holistic wellness."
    },
    {
      year: "2020",
      title: "Digital Transformation",
      description: "Launched online booking system and expanded our digital presence to serve more clients."
    },
    {
      year: "2024",
      title: "Community Impact",
      description: "Celebrated 16 years of wellness excellence and community service."
    }
  ];

  const values = [
    {
      title: "Authenticity",
      description: "We maintain the purity of traditional Thai healing practices passed down through generations."
    },
    {
      title: "Excellence",
      description: "Every treatment is performed with the highest standards of care and professionalism."
    },
    {
      title: "Harmony",
      description: "We create a serene environment where body, mind, and spirit can find perfect balance."
    },
    {
      title: "Community",
      description: "We are proud to be part of our local community, contributing to wellness and well-being."
    }
  ];

  return (
    <Layout>
      <div className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">About Aroma Thai Spa</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              For over 16 years, we've been dedicated to bringing the healing traditions of Thailand to our community,
              creating a sanctuary of wellness and tranquility.
            </p>
          </motion.div>

          {/* Story Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-16"
          >
            <Card>
              <CardContent className="p-8 md:p-12">
                <h2 className="text-3xl font-serif font-bold mb-6">Our Story</h2>
                <div className="prose prose-lg max-w-none text-muted-foreground">
                  <p className="mb-4">
                    Founded in 2008, Aroma Thai Spa has been a beacon of authentic Thai wellness in our community.
                    Our journey began with a simple mission: to share the ancient healing traditions of Thailand with
                    those seeking genuine wellness and relaxation.
                  </p>
                  <p className="mb-4">
                    Our certified therapists bring decades of combined experience in traditional Thai massage,
                    aromatherapy, and holistic healing practices. Each treatment is performed with the utmost care,
                    respect for tradition, and dedication to your well-being.
                  </p>
                  <p>
                    Today, we continue to uphold the highest standards of service while embracing modern wellness
                    practices. Our commitment to authenticity, excellence, and community remains as strong as ever,
                    ensuring that every guest leaves feeling renewed, balanced, and cared for.
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Milestones */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-16"
          >
            <h2 className="text-3xl font-serif font-bold text-center mb-12">Our Journey</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={milestone.year}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <Card>
                    <CardContent className="p-6">
                      <div className="text-3xl font-bold text-primary mb-2">{milestone.year}</div>
                      <h3 className="text-xl font-semibold mb-3">{milestone.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">{milestone.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Values */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mb-16"
          >
            <h2 className="text-3xl font-serif font-bold text-center mb-12">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {values.map((value, index) => {
                return (
                  <motion.div
                    key={value.title}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                  >
                    <Card>
                      <CardContent className="p-6">
                        <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                        <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Mission Statement */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <Card className="bg-gradient-to-br from-secondary/5 to-accent/5">
              <CardContent className="p-8 md:p-12 text-center">
                <h2 className="text-3xl font-serif font-bold mb-6">Our Mission</h2>
                <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
                  To provide exceptional, authentic Thai wellness experiences that promote healing, relaxation,
                  and balance. We are committed to preserving traditional healing arts while creating a sanctuary
                  where every individual can discover their path to wellness and inner harmony.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default AboutUsPage;