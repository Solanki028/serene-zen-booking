import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Award, Users, Heart, Sparkles } from "lucide-react";

const milestones = [
  { year: "2008", event: "Opened our first spa in Downtown District" },
  { year: "2012", event: "Expanded to 3 locations, serving 10,000+ clients" },
  { year: "2015", event: "Introduced membership programs and gift vouchers" },
  { year: "2018", event: "Awarded 'Best Thai Spa' by Wellness Magazine" },
  { year: "2020", event: "Launched enhanced hygiene protocols and online booking" },
  { year: "2025", event: "Celebrating 17 years of authentic Thai wellness" },
];

const values = [
  {
    icon: Heart,
    title: "Authentic Thai Traditions",
    description: "We honor ancient healing practices passed down through generations, bringing you the most authentic Thai wellness experience.",
  },
  {
    icon: Users,
    title: "Expert Therapists",
    description: "Our therapists are certified in traditional Thai massage techniques and undergo continuous training to maintain the highest standards.",
  },
  {
    icon: Sparkles,
    title: "Personalized Care",
    description: "Every treatment is tailored to your unique needs, ensuring you receive the perfect therapeutic experience every visit.",
  },
  {
    icon: Award,
    title: "Excellence & Quality",
    description: "We maintain premium cleanliness standards and use only the finest natural products for your safety and comfort.",
  },
];

const AboutUs = () => {
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
              Bringing authentic Thai healing traditions to our community since 2008
            </p>
          </motion.div>

          {/* Mission Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-16"
          >
            <Card>
              <CardContent className="p-8 md:p-12">
                <h2 className="text-3xl font-serif font-bold mb-6 text-center">Our Mission</h2>
                <p className="text-lg text-muted-foreground text-center max-w-3xl mx-auto leading-relaxed">
                  To provide our community with authentic Thai massage and holistic wellness treatments 
                  in a serene, professional environment. We believe in the transformative power of 
                  traditional Thai healing and are committed to helping every client achieve optimal 
                  physical and mental well-being through personalized, expert care.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Timeline Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-16"
          >
            <h2 className="text-3xl font-serif font-bold mb-12 text-center">Our Journey</h2>
            <div className="max-w-3xl mx-auto">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={milestone.year}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex gap-8 mb-8 last:mb-0"
                >
                  <div className="flex-shrink-0 w-20 text-right">
                    <span className="text-2xl font-bold text-primary">{milestone.year}</span>
                  </div>
                  <div className="flex-grow border-l-2 border-primary/20 pl-8 pb-8">
                    <p className="text-lg">{milestone.event}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Values Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-3xl font-serif font-bold mb-12 text-center">Our Core Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {values.map((value, index) => {
                const Icon = value.icon;
                return (
                  <motion.div
                    key={value.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card>
                      <CardContent className="p-6">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary/20 mb-4">
                          <Icon className="h-8 w-8 text-secondary" />
                        </div>
                        <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                        <p className="text-muted-foreground leading-relaxed">
                          {value.description}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Certifications */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-16"
          >
            <Card className="bg-gradient-to-br from-secondary/5 to-accent/5">
              <CardContent className="p-8 md:p-12 text-center">
                <h3 className="text-2xl font-semibold mb-4">Awards & Recognition</h3>
                <p className="text-muted-foreground mb-6">
                  Our commitment to excellence has been recognized by industry leaders
                </p>
                <div className="flex flex-wrap justify-center gap-6">
                  <div className="text-center">
                    <Award className="h-12 w-12 text-accent mx-auto mb-2" />
                    <p className="text-sm font-medium">Best Thai Spa 2018</p>
                  </div>
                  <div className="text-center">
                    <Award className="h-12 w-12 text-accent mx-auto mb-2" />
                    <p className="text-sm font-medium">Excellence in Service</p>
                  </div>
                  <div className="text-center">
                    <Award className="h-12 w-12 text-accent mx-auto mb-2" />
                    <p className="text-sm font-medium">Customer Choice Award</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default AboutUs;
