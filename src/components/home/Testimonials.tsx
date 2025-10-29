import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Johnson",
    quote: "The most authentic Thai massage I've experienced outside of Thailand. The therapists are incredibly skilled.",
    rating: 5,
  },
  {
    name: "Michael Chen",
    quote: "I've been a member for 3 years. The quality of service and value is unmatched. Highly recommend!",
    rating: 5,
  },
  {
    name: "Emily Rodriguez",
    quote: "The deep tissue massage worked wonders on my chronic back pain. Clean, professional, and caring staff.",
    rating: 5,
  },
  {
    name: "David Thompson",
    quote: "Absolutely love the foot reflexology treatment. It's become my weekly ritual for stress relief.",
    rating: 5,
  },
];

export const Testimonials = () => {
  return (
    <section className="py-24 bg-muted/20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">What Our Clients Say</h2>
          <p className="text-xl text-muted-foreground">
            Trusted by thousands for authentic Thai wellness
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full">
                <CardContent className="p-6">
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-accent text-accent" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    "{testimonial.quote}"
                  </p>
                  <p className="font-semibold">{testimonial.name}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
