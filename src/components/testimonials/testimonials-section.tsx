"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react"
import Image from "next/image"
import { useState } from "react"

const testimonials = [
  {
    id: 1,
    name: "Awlad Hossain",
    role: "Businessman",
    image: "/assets/images/team/2.jpg?height=80&width=80",
    rating: 5,
    text: "There Are Many Variations Of Passages Of Lorem Ipsum Available, But The Majority Have Suffered Alteration In Some Form, By Injected Humour, Or Randomised Words Which Don't Look Even Slightly Believable.",
  },
  {
    id: 2,
    name: "Awlad Hossain",
    role: "Businessman",
    image: "/assets/images/team/1.jpg?height=80&width=80",
    rating: 5,
    text: "There Are Many Variations Of Passages Of Lorem Ipsum Available, But The Majority Have Suffered Alteration In Some Form, By Injected Humour, Or Randomised Words Which Don't Look Even Slightly Believable.",
  },
  {
    id: 3,
    name: "Sarah Johnson",
    role: "Marketing Director",
    image: "/assets/images/team/3.jpg?height=80&width=80",
    rating: 5,
    text: "Excellent service and professional staff. They fixed my car quickly and efficiently. I highly recommend their services to anyone looking for quality automotive repair.",
  },
  {
    id: 4,
    name: "Michael Chen",
    role: "Software Engineer",
    image: "/assets/images/team/1.jpg?height=80&width=80",
    rating: 5,
    text: "Outstanding customer service and fair pricing. The team was very knowledgeable and explained everything clearly. Will definitely return for future maintenance.",
  },
]

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center space-x-1">
      {[...Array(5)].map((_, index) => (
        <Star
          key={index}
          className={`w-5 h-5 ${index < rating ? "fill-orange-400 text-orange-400" : "fill-gray-200 text-gray-200"}`}
        />
      ))}
    </div>
  )
}

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev === testimonials.length - 2 ? 0 : prev + 1))
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 2 : prev - 1))
  }

  const visibleTestimonials = testimonials.slice(currentIndex, currentIndex + 2)
  if (visibleTestimonials.length === 1) {
    visibleTestimonials.push(testimonials[0])
  }

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-white relative overflow-hidden">
      {/* Background Quote Icons */}
      <div className="absolute top-20 left-10 opacity-10">
        <Quote className="w-24 h-24 md:w-32 md:h-32 text-gray-300 rotate-180" />
      </div>
      <div className="absolute top-20 right-10 opacity-10">
        <Quote className="w-24 h-24 md:w-32 md:h-32 text-gray-300" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          <p className="text-red-600 font-semibold text-sm md:text-base mb-2 uppercase tracking-wide">Testimonial</p>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">What Customer Says</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            The Majority Have Suffered Alteration In Some Form, By Injected Humour, Or Randomised Words Which Don't Look
            Even Slightly Believable.
          </p>
        </div>

        {/* Testimonials Container */}
        <div className="relative max-w-6xl mx-auto">
          {/* Desktop View - Two Cards */}
          <div className="hidden md:grid md:grid-cols-2 gap-8 lg:gap-12">
            {visibleTestimonials.map((testimonial, index) => (
              <Card
                key={`${testimonial.id}-${index}`}
                className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <CardContent className="p-6 lg:p-8">
                  {/* Customer Info */}
                  <div className="flex items-center mb-6">
                    <div className="relative w-16 h-16 mr-4">
                      <Image
                        src={testimonial.image || "/placeholder.svg"}
                        alt={testimonial.name}
                        fill
                        className="object-cover rounded-full"
                      />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{testimonial.name}</h3>
                      <p className="text-gray-600 text-sm">{testimonial.role}</p>
                    </div>
                    {/* Large Quote Icon */}
                    <div className="ml-auto">
                      <Quote className="w-12 h-12 text-red-200" />
                    </div>
                  </div>

                  {/* Testimonial Text */}
                  <p className="text-gray-700 text-sm md:text-base leading-relaxed mb-6">{testimonial.text}</p>

                  {/* Star Rating */}
                  <StarRating rating={testimonial.rating} />
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Mobile View - Single Card Slider */}
          <div className="md:hidden">
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-300 ease-in-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                {testimonials.map((testimonial) => (
                  <div key={testimonial.id} className="w-full flex-shrink-0 px-4">
                    <Card className="border-0 shadow-lg">
                      <CardContent className="p-6">
                        {/* Customer Info */}
                        <div className="flex items-center mb-6">
                          <div className="relative w-16 h-16 mr-4">
                            <Image
                              src={testimonial.image || "/placeholder.svg"}
                              alt={testimonial.name}
                              fill
                              className="object-cover rounded-full"
                            />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900">{testimonial.name}</h3>
                            <p className="text-gray-600 text-sm">{testimonial.role}</p>
                          </div>
                          <div className="ml-auto">
                            <Quote className="w-10 h-10 text-red-200" />
                          </div>
                        </div>

                        {/* Testimonial Text */}
                        <p className="text-gray-700 text-sm leading-relaxed mb-6">{testimonial.text}</p>

                        {/* Star Rating */}
                        <StarRating rating={testimonial.rating} />
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-6 w-12 h-12 bg-gray-100 hover:bg-red-600 hover:text-white rounded-full flex items-center justify-center transition-all duration-200 shadow-lg z-10"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-6 w-12 h-12 bg-red-600 hover:bg-red-700 text-white rounded-full flex items-center justify-center transition-all duration-200 shadow-lg z-10"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </section>
  )
}
