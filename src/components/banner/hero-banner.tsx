"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState, useEffect, useCallback, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"

const bannerData = [
    {
    image: "/assets/images/banner/6.jpg",
    title: "Customer First",
    subtitle: "Your Satisfaction Guaranteed",
    description: "We prioritize your needs with personalized service and transparent communication throughout.",
    accent: "bg-gradient-to-r from-indigo-600 to-blue-600",
  },
  {
    image: "/assets/images/banner/1.jpg",
    title: "Premium Auto Care",
    subtitle: "Excellence in Every Detail",
    description:
      "Experience unparalleled automotive service with our state-of-the-art facilities and expert technicians.",
    accent: "bg-gradient-to-r from-blue-600 to-purple-600",
  },
  {
    image: "/assets/images/banner/2.jpg",
    title: "Affordable Luxury",
    subtitle: "Quality Without Compromise",
    description: "Get premium car servicing at competitive prices with our comprehensive maintenance packages.",
    accent: "bg-gradient-to-r from-red-600 to-orange-600",
  },
  {
    image: "/assets/images/banner/3.jpg",
    title: "Expert Technicians",
    subtitle: "Certified Professionals",
    description: "Our ASE-certified mechanics bring decades of experience to every vehicle that enters our shop.",
    accent: "bg-gradient-to-r from-green-600 to-teal-600",
  },
  {
    image: "/assets/images/banner/4.jpg",
    title: "Modern Equipment",
    subtitle: "Latest Technology",
    description: "Utilizing cutting-edge diagnostic tools and equipment for precise and efficient service.",
    accent: "bg-gradient-to-r from-purple-600 to-pink-600",
  },
  {
    image: "/assets/images/banner/5.jpg",
    title: "Quick Service",
    subtitle: "Fast & Reliable",
    description: "Get back on the road quickly with our streamlined service process and efficient workflow.",
    accent: "bg-gradient-to-r from-yellow-600 to-red-600",
  },

]

export default function HeroBanner() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [progress, setProgress] = useState(0)
  const [mousePosition] = useState({ x: 0, y: 0 })
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const progressRef = useRef<NodeJS.Timeout | null>(null)

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev === bannerData.length - 1 ? 0 : prev + 1))
    setProgress(0)
  }, [])

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? bannerData.length - 1 : prev - 1))
    setProgress(0)
  }, [])

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index)
    setProgress(0)
  }, [])

  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying)
    setProgress(0)
  }

  useEffect(() => {
    if (isAutoPlaying) {
      intervalRef.current = setInterval(nextSlide, 6000)

      // Progress animation
      progressRef.current = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            return 0
          }
          return prev + 100 / 600 // 6000ms / 10ms intervals
        })
      }, 10)
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current)
      if (progressRef.current) clearInterval(progressRef.current)
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
      if (progressRef.current) clearInterval(progressRef.current)
    }
  }, [isAutoPlaying, nextSlide])


  const currentSlide = bannerData[currentIndex]

  return (
    <section className="relative mr-0 w-full h-screen overflow-hidden bg-black" >
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20" />
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              "radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.3) 0%, transparent 50%)",
              "radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%)",
              "radial-gradient(circle at 40% 80%, rgba(119, 255, 198, 0.3) 0%, transparent 50%)",
            ],
          }}
          transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        />
      </div>

      {/* Image Slider with Parallax */}
      <div className="absolute inset-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <motion.div
              className="absolute inset-0"
              animate={{
                x: mousePosition.x * 20,
                y: mousePosition.y * 20,
              }}
              transition={{ type: "spring", stiffness: 100, damping: 30 }}
            >
              <Image
                src={currentSlide.image || "/placeholder.svg"}
                alt={currentSlide.title}
                fill
                className="object-cover"
                priority={currentIndex === 0}
                sizes="100vw"
              />
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Dynamic Gradient Overlay */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            "linear-gradient(135deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.6) 100%)",
            "linear-gradient(225deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.8) 50%, rgba(0,0,0,0.4) 100%)",
            "linear-gradient(315deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.6) 50%, rgba(0,0,0,0.8) 100%)",
          ],
        }}
        transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      />

      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full"
            animate={{
              x: [0, 100, 0],
              y: [0, -100, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 4 + i,
              repeat: Number.POSITIVE_INFINITY,
              delay: i * 0.5,
              ease: "easeInOut",
            }}
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + i * 10}%`,
            }}
          />
        ))}
      </div>

      {/* Navigation Controls */}
      <div className="absolute lg:block hidden left-6 top-1/2 -translate-y-1/2 z-30">
        <motion.button
          onClick={prevSlide}
          className="group relative p-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-all duration-300"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <ChevronLeft className="w-6 h-6" />
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </motion.button>
      </div>

      <div className="absolute lg:block hidden right-6 top-1/2 -translate-y-1/2 z-30">
        <motion.button
          onClick={nextSlide}
          className="group relative p-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-all duration-300"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <ChevronRight className="w-6 h-6" />
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </motion.button>
      </div>

      {/* Main Content */}
      <div className="relative z-20 container mx-auto px-6 h-full flex items-center">
        <div className="max-w-4xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="space-y-8"
            >
              {/* Accent Line */}
              <motion.div
                className={`h-1 w-20 rounded-full ${currentSlide.accent}`}
                initial={{ width: 0 }}
                animate={{ width: 80 }}
                transition={{ duration: 1, delay: 0.3 }}
              />

              {/* Subtitle */}
              <motion.p
                className="text-lg md:text-xl text-blue-300 font-medium tracking-wide uppercase"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                {currentSlide.subtitle}
              </motion.p>

              {/* Main Title */}
              <motion.h1
                className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white leading-tight"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                {currentSlide.title.split(" ").map((word, index) => (
                  <motion.span
                    key={index}
                    className="inline-block mr-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  >
                    {word}
                  </motion.span>
                ))}
              </motion.h1>

              {/* Description */}
              <motion.p
                className="text-lg md:text-xl text-gray-300 max-w-2xl leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                {currentSlide.description}
              </motion.p>

              {/* Action Buttons */}
              <motion.div
                className="flex flex-col sm:flex-row gap-4 pt-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                <Button
                  asChild
                  size="lg"
                  className="group relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold rounded-full transition-all duration-300 hover:scale-105 shadow-2xl"
                >
                  <Link href="/services">
                    <span className="relative z-10">Discover More</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </Link>
                </Button>

                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="group relative overflow-hidden border-2 border-white/30 text-white hover:bg-white hover:text-black px-8 py-4 text-lg font-semibold rounded-full transition-all duration-300 hover:scale-105 bg-white/10 backdrop-blur-md"
                >
                  <Link href="/projects">
                    <span className="relative z-10">View Projects</span>
                  </Link>
                </Button>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Advanced Slide Indicators */}
      <div className="absolute bottom-20 lg:block hidden left-1/2 transform -translate-x-1/2 z-30">
        <div className="flex items-center space-x-4 bg-white/10 backdrop-blur-md rounded-full px-6 py-3 border border-white/20">
          {bannerData.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => goToSlide(index)}
              className="relative group"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            >
              <div
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex ? "bg-white shadow-lg" : "bg-white/40 group-hover:bg-white/70"
                }`}
              />
              {index === currentIndex && (
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-white"
                  initial={{ scale: 1 }}
                  animate={{ scale: 1.5 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </motion.button>
          ))}

          {/* Auto-play Control */}
          <div className="w-px h-6 bg-white/30 mx-2" />
          <motion.button
            onClick={toggleAutoPlay}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all duration-300"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {isAutoPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </motion.button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-white/10">
        <motion.div
          className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
          style={{ width: `${progress}%` }}
          transition={{ duration: 0.1 }}
        />
      </div>

      {/* Slide Counter */}
      <div className="absolute hidden top-8 right-8 z-30">
        <div className="bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
          <span className="text-white font-medium">
            {String(currentIndex + 1).padStart(2, "0")} / {String(bannerData.length).padStart(2, "0")}
          </span>
        </div>
      </div>
    </section>
  )
}
