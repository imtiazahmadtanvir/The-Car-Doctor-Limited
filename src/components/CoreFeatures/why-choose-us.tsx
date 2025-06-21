"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Users, Award, Headphones, Wrench, Shield, Clock } from "lucide-react"

const features = [
  {
    id: 1,
    title: "Expert Team",
    description: "Professional mechanics with years of experience",
    icon: Users,
    color: "bg-red-600",
  },
  {
    id: 2,
    title: "Quality Products",
    description: "Only the best parts and materials for your vehicle",
    icon: Award,
    color: "bg-red-600",
  },
  {
    id: 3,
    title: "24/7 Support",
    description: "Round-the-clock customer service and assistance",
    icon: Headphones,
    color: "bg-red-600",
  },
  {
    id: 4,
    title: "Best Equipment",
    description: "State-of-the-art tools and diagnostic equipment",
    icon: Wrench,
    color: "bg-red-600",
  },
  {
    id: 5,
    title: "100% Guarantee",
    description: "Complete satisfaction guarantee on all services",
    icon: Shield,
    color: "bg-red-600",
  },
  {
    id: 6,
    title: "Timely Delivery",
    description: "Fast and efficient service completion",
    icon: Clock,
    color: "bg-red-600",
  },
]

export default function WhyChooseUs() {
  return (
    <section className="py-12 md:py-16 lg:py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <p className="text-red-600 font-semibold text-sm md:text-base mb-2 uppercase tracking-wide">Our Features</p>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Why Choose Us</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            The Majority Have Suffered Alteration In Some Form, By Injected Humour, Or Randomised Words Which Don't Look
            Even Slightly Believable.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature) => {
            const IconComponent = feature.icon
            return (
              <Card
                key={feature.id}
                className="group hover:shadow-lg transition-all duration-300 border-0 bg-white hover:-translate-y-1"
              >
                <CardContent className="p-6 text-center">
                  {/* Icon */}
                  <div className="mb-4 flex justify-center">
                    <div
                      className={`w-16 h-16 ${feature.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                    >
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>

                  {/* Description */}
                  <p className="text-gray-600 text-sm md:text-base leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
