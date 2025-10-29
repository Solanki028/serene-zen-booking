import { motion } from "framer-motion";
import { Award, Users, Shield, Heart } from "lucide-react";

const badges = [
  {
    icon: Award,
    title: "Since 2008",
    description: "17 years of excellence",
  },
  {
    icon: Users,
    title: "Expert Therapists",
    description: "Certified Thai practitioners",
  },
  {
    icon: Shield,
    title: "Highest Hygiene",
    description: "Premium cleanliness standards",
  },
  {
    icon: Heart,
    title: "Personalized Care",
    description: "Tailored to your needs",
  },
];

export const TrustBadges = () => {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {badges.map((badge, index) => {
            const Icon = badge.icon;
            return (
              <motion.div
                key={badge.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary/20 text-secondary mb-4">
                  <Icon className="h-8 w-8" />
                </div>
                <h3 className="font-semibold text-lg mb-1">{badge.title}</h3>
                <p className="text-sm text-muted-foreground">{badge.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
