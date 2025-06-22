"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useState, useEffect } from "react"

const bannerImages = [
  "/assets/images/banner/1.jpg",
  "/assets/images/banner/2.jpg",
  "/assets/images/banner/3.jpg",
  "/assets/images/banner/4.jpg",
  "/assets/images/banner/5.jpg",
  "/assets/images/banner/6.jpg",
]

export default function HeroBanner() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex === bannerImages.length - 1 ? 0 : prevIndex + 1))
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative lg-mt-10 w-full h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden">
      {/* Background Image Slider */}
      <div className="absolute inset-0">
        {bannerImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentImageIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={image || "/placeholder.svg"}
              alt={`Car service ${index + 1}`}
              fill
              className="object-cover"
              priority={index === 0}
            />
          </div>
        ))}
      </div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
        <div className="max-w-2xl text-white">
          <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight mb-4">
            Affordable
            <br />
            Price For Car
            <br />
            Servicing
          </h1>

          <p className="text-base md:text-lg lg:text-xl mb-8 text-gray-200 max-w-lg">
            There Are Many Variations Of Passages Of Available But The Majority Have Suffered Alteration In Some Form
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 text-base font-semibold">
              Discover More
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-2 border-white text-white hover:bg-white hover:text-black px-8 py-3 text-base font-semibold bg-transparent"
            >
              Latest Projects
            </Button>
          </div>
        </div>
      </div>

      {/* Image Indicators */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
        {bannerImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentImageIndex ? "bg-red-600 scale-110" : "bg-white/50 hover:bg-white/70"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  )
}
