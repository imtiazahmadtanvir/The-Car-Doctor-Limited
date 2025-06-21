"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Facebook, Twitter, Instagram, Linkedin, ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"
import { useState } from "react"

const teamMembers = [
  {
    id: 1,
    name: "Car Engine Plug",
    role: "Senior Mechanic",
    image: "/assets/images/team/1.jpg",
    social: {
      facebook: "#",
      twitter: "#",
      instagram: "#",
      linkedin: "#",
    },
  },
  {
    id: 2,
    name: "Car Engine Plug",
    role: "Lead Technician",
    image: "/assets/images/team/2.jpg",
    social: {
      facebook: "#",
      twitter: "#",
      instagram: "#",
      linkedin: "#",
    },
  },
  {
    id: 3,
    name: "Car Engine Plug",
    role: "Auto Specialist",
    image: "/assets/images/team/3.jpg",
    social: {
      facebook: "#",
      twitter: "#",
      instagram: "#",
      linkedin: "#",
    },
  },
]

export default function MeetOurTeam() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === teamMembers.length - 1 ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? teamMembers.length - 1 : prev - 1))
  }

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <p className="text-red-600 font-semibold text-sm md:text-base mb-2 uppercase tracking-wide">Team</p>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            The Majority Have Suffered Alteration In Some Form, By Injected Humour, Or Randomised Words Which Don't Look
            Even Slightly Believable.
          </p>
        </div>

        {/* Team Members - Desktop Grid */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {teamMembers.map((member) => (
            <Card key={member.id} className="group hover:shadow-xl transition-all duration-300 border-0 bg-white">
              <CardContent className="p-0">
                {/* Member Image */}
                <div className="relative h-64 lg:h-80 overflow-hidden rounded-t-lg">
                  <Image
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Member Info */}
                <div className="p-6 text-center">
                  <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-2">{member.name}</h3>
                  <p className="text-gray-600 text-sm md:text-base mb-4">{member.role}</p>

                  {/* Social Icons */}
                  <div className="flex justify-center space-x-3">
                    <a
                      href={member.social.facebook}
                      className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-blue-700 transition-colors duration-200"
                      aria-label="Facebook"
                    >
                      <Facebook className="w-4 h-4" />
                    </a>
                    <a
                      href={member.social.twitter}
                      className="w-8 h-8 bg-blue-400 rounded-full flex items-center justify-center text-white hover:bg-blue-500 transition-colors duration-200"
                      aria-label="Twitter"
                    >
                      <Twitter className="w-4 h-4" />
                    </a>
                    <a
                      href={member.social.instagram}
                      className="w-8 h-8 bg-pink-600 rounded-full flex items-center justify-center text-white hover:bg-pink-700 transition-colors duration-200"
                      aria-label="Instagram"
                    >
                      <Instagram className="w-4 h-4" />
                    </a>
                    <a
                      href={member.social.linkedin}
                      className="w-8 h-8 bg-blue-700 rounded-full flex items-center justify-center text-white hover:bg-blue-800 transition-colors duration-200"
                      aria-label="LinkedIn"
                    >
                      <Linkedin className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Team Members - Mobile Slider */}
        <div className="md:hidden relative">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-300 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {teamMembers.map((member) => (
                <div key={member.id} className="w-full flex-shrink-0 px-4">
                  <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-white">
                    <CardContent className="p-0">
                      {/* Member Image */}
                      <div className="relative h-64 overflow-hidden rounded-t-lg">
                        <Image
                          src={member.image || "/placeholder.svg"}
                          alt={member.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>

                      {/* Member Info */}
                      <div className="p-6 text-center">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">{member.name}</h3>
                        <p className="text-gray-600 text-sm mb-4">{member.role}</p>

                        {/* Social Icons */}
                        <div className="flex justify-center space-x-3">
                          <a
                            href={member.social.facebook}
                            className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-blue-700 transition-colors duration-200"
                            aria-label="Facebook"
                          >
                            <Facebook className="w-4 h-4" />
                          </a>
                          <a
                            href={member.social.twitter}
                            className="w-8 h-8 bg-blue-400 rounded-full flex items-center justify-center text-white hover:bg-blue-500 transition-colors duration-200"
                            aria-label="Twitter"
                          >
                            <Twitter className="w-4 h-4" />
                          </a>
                          <a
                            href={member.social.instagram}
                            className="w-8 h-8 bg-pink-600 rounded-full flex items-center justify-center text-white hover:bg-pink-700 transition-colors duration-200"
                            aria-label="Instagram"
                          >
                            <Instagram className="w-4 h-4" />
                          </a>
                          <a
                            href={member.social.linkedin}
                            className="w-8 h-8 bg-blue-700 rounded-full flex items-center justify-center text-white hover:bg-blue-800 transition-colors duration-200"
                            aria-label="LinkedIn"
                          >
                            <Linkedin className="w-4 h-4" />
                          </a>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-10 h-10 bg-red-600 rounded-full flex items-center justify-center text-white hover:bg-red-700 transition-colors duration-200 shadow-lg"
            aria-label="Previous team member"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-10 h-10 bg-red-600 rounded-full flex items-center justify-center text-white hover:bg-red-700 transition-colors duration-200 shadow-lg"
            aria-label="Next team member"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-6 space-x-2">
            {teamMembers.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-200 ${
                  index === currentSlide ? "bg-red-600 scale-110" : "bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Go to team member ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
