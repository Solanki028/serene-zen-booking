import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Sparkles } from "lucide-react";

const tiers = [
  {
    name: "Silver",
    price: 99,
    billing: "monthly",
    popular: false,
    perks: [
      "4 massages per month",
      "10% discount on additional services",
      "Priority booking",
      "Rollover 1 unused session",
    ],
  },
  {
    name: "Gold",
    price: 179,
    billing: "monthly",
    popular: true,
    perks: [
      "8 massages per month",
      "20% discount on additional services",
      "Priority booking",
      "Rollover up to 2 unused sessions",
      "Complimentary aromatherapy upgrade",
      "Birthday gift voucher",
    ],
  },
  {
    name: "Platinum",
    price: 299,
    billing: "monthly",
    popular: false,
    perks: [
      "Unlimited massages",
      "30% discount on additional services",
      "VIP priority booking",
      "Bring a guest once per month",
      "All premium add-ons included",
      "Complimentary spa products",
      "Birthday gift voucher",
      "Free parking",
    ],
  },
];

const Membership = () => {
  const handleJoinNow = () => {
    window.open("https://aromathaispa.zenoti.com", "_blank");
  };

  return (
    <Layout>
      <div className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Membership Plans</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Invest in your wellness journey with exceptional value and exclusive benefits
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {tiers.map((tier, index) => (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={tier.popular ? "md:-mt-4 md:mb-4" : ""}
              >
                <Card className={`h-full relative ${tier.popular ? "border-2 border-secondary shadow-xl" : ""}`}>
                  {tier.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <div className="bg-secondary text-secondary-foreground px-6 py-2 rounded-full flex items-center gap-2 shadow-lg">
                        <Sparkles className="h-4 w-4" />
                        <span className="text-sm font-semibold">Most Popular</span>
                      </div>
                    </div>
                  )}
                  <CardHeader className="text-center pb-8 pt-10">
                    <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>
                    <div className="mb-2">
                      <span className="text-5xl font-bold">${tier.price}</span>
                      <span className="text-muted-foreground">/{tier.billing}</span>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <ul className="space-y-4">
                      {tier.perks.map((perk) => (
                        <li key={perk} className="flex items-start gap-3">
                          <div className="flex-shrink-0 w-6 h-6 rounded-full bg-secondary/20 flex items-center justify-center mt-0.5">
                            <Check className="h-4 w-4 text-secondary" />
                          </div>
                          <span className="text-sm leading-relaxed">{perk}</span>
                        </li>
                      ))}
                    </ul>
                    <Button 
                      onClick={handleJoinNow}
                      className="w-full"
                      variant={tier.popular ? "default" : "outline"}
                    >
                      Join {tier.name}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-16 max-w-3xl mx-auto"
          >
            <Card>
              <CardContent className="p-8">
                <h3 className="text-xl font-semibold mb-4">Membership Terms</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• All memberships require a 3-month minimum commitment</li>
                  <li>• Unused sessions can be rolled over according to your plan limits</li>
                  <li>• Membership discounts cannot be combined with other promotions</li>
                  <li>• Cancel anytime after the initial commitment period with 30 days notice</li>
                  <li>• Membership benefits are non-transferable</li>
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default Membership;
