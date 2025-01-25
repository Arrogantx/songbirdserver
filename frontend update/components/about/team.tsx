"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Users } from "lucide-react";

const team = [
  {
    role: "Strategic Communications Director",
    description: "Leading our communications strategy and client success initiatives.",
  },
  {
    role: "Advocacy Campaign Manager",
    description: "Developing and executing impactful advocacy campaigns.",
  },
  {
    role: "Content Strategy Lead",
    description: "Creating compelling content strategies that drive results.",
  },
];

export function AboutTeam() {
  return (
    <section className="container mx-auto px-4">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Our Team</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Meet the experts behind Songbird Strategies.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
        {team.map((member, index) => (
          <motion.div
            key={member.role}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{member.role}</h3>
                <p className="text-muted-foreground text-sm">{member.description}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}