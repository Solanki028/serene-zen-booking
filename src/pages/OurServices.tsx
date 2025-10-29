import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock } from "lucide-react";
import aromatherapyImg from "@/assets/service-aromatherapy.jpg";
import footImg from "@/assets/service-foot.jpg";
import deepTissueImg from "@/assets/service-deep-tissue.jpg";
import traditionalImg from "@/assets/service-traditional.jpg";

const services = [
  {
    id: 1,
    title: "Aromatherapy Massage",
    category: "Massage",
    description: "Essential oils and gentle strokes for deep relaxation and stress relief.",
    benefits: ["Reduces stress", "Improves mood", "Enhances sleep quality"],
    durations: [
      { name: "60 min", price: 89 },
      { name: "90 min", price: 129 },
    ],
    image: aromatherapyImg,
    focus: "Relax",
  },
  {
    id: 2,
    title: "Foot Reflexology",
    category: "Massage",
    description: "Pressure point therapy targeting organs and systems through foot massage.",
    benefits: ["Improves circulation", "Reduces tension", "Boosts energy"],
    durations: [
      { name: "30 min", price: 49 },
      { name: "60 min", price: 79 },
    ],
    image: footImg,
    focus: "Relax",
  },
  {
    id: 3,
    title: "Deep Tissue Massage",
    category: "Massage",
    description: "Intensive muscle work to release chronic tension and knots.",
    benefits: ["Relieves chronic pain", "Breaks down scar tissue", "Improves mobility"],
    durations: [
      { name: "60 min", price: 99 },
      { name: "90 min", price: 139 },
    ],
    image: deepTissueImg,
    focus: "Deep Tissue",
  },
  {
    id: 4,
    title: "Traditional Thai Massage",
    category: "Massage",
    description: "Ancient stretching techniques combined with acupressure for full-body wellness.",
    benefits: ["Increases flexibility", "Relieves muscle tension", "Balances energy"],
    durations: [
      { name: "60 min", price: 89 },
      { name: "90 min", price: 129 },
      { name: "120 min", price: 169 },
    ],
    image: traditionalImg,
    focus: "Relax",
  },
];

const OurServices = () => {
  const [selectedFocus, setSelectedFocus] = useState<string>("All");
  const [selectedDuration, setSelectedDuration] = useState<string>("All");

  const focusOptions = ["All", "Relax", "Deep Tissue"];
  const durationOptions = ["All", "30 min", "60 min", "90 min"];

  const filteredServices = services.filter((service) => {
    const matchesFocus = selectedFocus === "All" || service.focus === selectedFocus;
    const matchesDuration =
      selectedDuration === "All" ||
      service.durations.some((d) => d.name === selectedDuration);
    return matchesFocus && matchesDuration;
  });

  const handleBookNow = () => {
    window.open("https://aromathaispa.zenoti.com", "_blank");
  };

  return (
    <Layout>
      <div className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Our Services</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover our range of authentic Thai wellness treatments
            </p>
          </motion.div>

          {/* Filters */}
          <div className="mb-12 space-y-4">
            <div>
              <h3 className="text-sm font-medium mb-3">Focus</h3>
              <div className="flex flex-wrap gap-2">
                {focusOptions.map((focus) => (
                  <Badge
                    key={focus}
                    variant={selectedFocus === focus ? "default" : "outline"}
                    className="cursor-pointer px-4 py-2"
                    onClick={() => setSelectedFocus(focus)}
                  >
                    {focus}
                  </Badge>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium mb-3">Duration</h3>
              <div className="flex flex-wrap gap-2">
                {durationOptions.map((duration) => (
                  <Badge
                    key={duration}
                    variant={selectedDuration === duration ? "default" : "outline"}
                    className="cursor-pointer px-4 py-2"
                    onClick={() => setSelectedDuration(duration)}
                  >
                    {duration}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredServices.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="overflow-hidden h-full flex flex-col">
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-6 flex-grow flex flex-col">
                    <h3 className="text-2xl font-semibold mb-3">{service.title}</h3>
                    <p className="text-muted-foreground mb-4">{service.description}</p>
                    
                    <div className="mb-4">
                      <h4 className="text-sm font-medium mb-2">Key Benefits:</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        {service.benefits.map((benefit) => (
                          <li key={benefit}>• {benefit}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="mb-6 mt-auto">
                      <h4 className="text-sm font-medium mb-3">Durations & Pricing:</h4>
                      <div className="flex flex-wrap gap-3">
                        {service.durations.map((duration) => (
                          <div
                            key={duration.name}
                            className="flex items-center gap-2 bg-muted px-4 py-2 rounded-lg"
                          >
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm font-medium">{duration.name}</span>
                            <span className="text-sm text-muted-foreground">-</span>
                            <span className="text-sm font-semibold">${duration.price}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Button onClick={handleBookNow} className="w-full gap-2">
                      <Calendar className="h-4 w-4" />
                      Book This Service
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default OurServices;
