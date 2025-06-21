"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Award, Users, Wrench, Shield, Target, Heart } from "lucide-react"
import Image from "next/image"

const stats = [
  { number: "15+", label: "Years Experience" },
  { number: "5000+", label: "Happy Customers" },
  { number: "50+", label: "Expert Mechanics" },
  { number: "24/7", label: "Emergency Service" },
]

const values = [
  {
    icon: Award,
    title: "Quality Excellence",
    description:
      "We maintain the highest standards in every service we provide, ensuring your vehicle receives the best care possible.",
  },
  {
    icon: Users,
    title: "Customer First",
    description:
      "Our customers are at the heart of everything we do. We build lasting relationships through trust and reliability.",
  },
  {
    icon: Wrench,
    title: "Expert Craftsmanship",
    description:
      "Our certified technicians bring years of experience and continuous training to every repair and maintenance job.",
  },
  {
    icon: Shield,
    title: "Integrity & Trust",
    description:
      "We believe in honest communication, fair pricing, and transparent service recommendations for all our customers.",
  },
]

const milestones = [
  { year: "2008", event: "Car Doctor founded with a vision to revolutionize automotive service" },
  { year: "2012", event: "Expanded to multiple locations across the city" },
  { year: "2016", event: "Introduced state-of-the-art diagnostic equipment" },
  { year: "2020", event: "Launched 24/7 emergency roadside assistance" },
  { year: "2024", event: "Celebrating 15+ years of exceptional service" },
]

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gray-900 text-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">About Car Doctor</h1>
              <p className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed">
                For over 15 years, Car Doctor has been the trusted name in automotive service and repair. We combine
                traditional craftsmanship with modern technology to keep your vehicle running at its best.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-2xl md:text-3xl font-bold text-red-500 mb-1">{stat.number}</div>
                    <div className="text-sm text-gray-400">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative h-64 md:h-96 lg:h-[500px]">
              <Image
                src="/assets/images/banner/1.jpg?height=500&width=600"
                alt="Car Doctor Workshop"
                fill
                className="object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                To provide exceptional automotive service that exceeds customer expectations while building lasting
                relationships based on trust, quality, and reliability. We strive to keep your vehicle safe, reliable,
                and performing at its peak.
              </p>

              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">Our Vision</h3>
                  <p className="text-gray-600">To be the most trusted automotive service provider in the region</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">Our Commitment</h3>
                  <p className="text-gray-600">Delivering honest, reliable service with a personal touch</p>
                </div>
              </div>
            </div>
            <div className="relative h-64 md:h-96">
              <Image
                src="/assets/images/banner/4.jpg?height=400&width=500"
                alt="Our Mission"
                fill
                className="object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Our Core Values</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              These fundamental principles guide every decision we make and every service we provide
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const IconComponent = value.icon
              return (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-6">
                    <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">{value.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{value.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Company Timeline */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Our Journey</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              From humble beginnings to becoming a trusted automotive service leader
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {milestones.map((milestone, index) => (
              <div key={index} className="flex items-start mb-8 last:mb-0">
                <div className="flex-shrink-0 w-20 text-right mr-6">
                  <span className="text-lg font-bold text-red-600">{milestone.year}</span>
                </div>
                <div className="flex-shrink-0 w-4 h-4 bg-red-600 rounded-full mt-2 mr-6"></div>
                <div className="flex-1">
                  <p className="text-gray-700 leading-relaxed">{milestone.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
