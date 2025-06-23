"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Home, Search, Phone, Mail, Clock } from "lucide-react"
import { useState, useEffect } from "react"

export default function NotFound() {
  const [isVisible, setIsVisible] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    setIsVisible(true)
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-red-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-yellow-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      {/* Interactive Mouse Follower */}
      <div
        className="fixed w-6 h-6 bg-red-500/20 rounded-full pointer-events-none z-50 transition-all duration-300 ease-out"
        style={{
          left: mousePosition.x - 12,
          top: mousePosition.y - 12,
          transform: `scale(${isVisible ? 1 : 0})`,
        }}
      />

      <div className="relative z-10 flex items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          {/* Main 404 Content */}
          <div
            className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            {/* Animated 404 Number */}
            <div className="relative mb-8">
              <div className="text-8xl sm:text-9xl md:text-[12rem] font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-red-700 to-red-800 animate-gradient leading-none">
                404
              </div>
              <div className="absolute inset-0 text-8xl sm:text-9xl md:text-[12rem] font-bold text-red-600/10 animate-pulse leading-none">
                404
              </div>
            </div>

            {/* Error Message */}
            <div
              className={`mb-8 transition-all duration-1000 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
            >
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">Oops! Page Not Found</h1>
              <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                The page you're looking for seems to have taken a detour. Don't worry, even the best GPS gets confused
                sometimes!
              </p>
            </div>

            {/* Action Buttons */}
            <div
              className={`flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 transition-all duration-1000 delay-400 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
            >
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-8 py-4 text-base font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl"
              >
                <Link href="/" className="flex items-center gap-2">
                  <Home className="w-5 h-5" />
                  Back to Home
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-2 border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 px-8 py-4 text-base font-semibold transition-all duration-300 hover:scale-105"
              >
                <Link href="/services" className="flex items-center gap-2">
                  <Search className="w-5 h-5" />
                  Browse Services
                </Link>
              </Button>
            </div>
          </div>

          {/* Quick Links Grid */}
          <div
            className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12 transition-all duration-1000 delay-600 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <Card className="group hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Home className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Home Page</h3>
                <p className="text-sm text-gray-600 mb-4">Return to our main page and explore our services</p>
                <Button
                  asChild
                  variant="ghost"
                  size="sm"
                  className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                >
                  <Link href="/">Visit Home</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Search className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Our Services</h3>
                <p className="text-sm text-gray-600 mb-4">Discover our comprehensive range of professional services</p>
                <Button
                  asChild
                  variant="ghost"
                  size="sm"
                  className="text-green-600 hover:text-green-700 hover:bg-green-50"
                >
                  <Link href="/services">View Services</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border-0 shadow-lg bg-white/80 backdrop-blur-sm sm:col-span-2 lg:col-span-1">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Contact Us</h3>
                <p className="text-sm text-gray-600 mb-4">Get in touch with our support team for assistance</p>
                <Button
                  asChild
                  variant="ghost"
                  size="sm"
                  className="text-purple-600 hover:text-purple-700 hover:bg-purple-50"
                >
                  <Link href="/contact">Contact Support</Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <div
            className={`transition-all duration-1000 delay-800 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
          >
            <Card className="bg-gradient-to-r from-red-600 to-red-700 text-white border-0 shadow-2xl">
              <CardContent className="p-8">
                <h3 className="text-xl font-bold mb-6 text-center">Need Immediate Help?</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
                  <div className="flex flex-col items-center space-y-2">
                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-semibold">Call Us</p>
                      <p className="text-sm opacity-90">+1 (555) 123-4567</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-center space-y-2">
                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-semibold">Email Us</p>
                      <p className="text-sm opacity-90">support@company.com</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-center space-y-2">
                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-semibold">Hours</p>
                      <p className="text-sm opacity-90">24/7 Support</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Fun Message */}
          <div
            className={`mt-8 transition-all duration-1000 delay-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
          >
            <p className="text-sm text-gray-500 italic">
              "Not all who wander are lost, but this page definitely is!" 🗺️
            </p>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-4 h-4 bg-red-400 rounded-full animate-bounce opacity-60"></div>
      <div
        className="absolute top-40 right-20 w-3 h-3 bg-blue-400 rounded-full animate-bounce opacity-60"
        style={{ animationDelay: "0.5s" }}
      ></div>
      <div
        className="absolute bottom-20 left-20 w-5 h-5 bg-yellow-400 rounded-full animate-bounce opacity-60"
        style={{ animationDelay: "1s" }}
      ></div>
      <div
        className="absolute bottom-40 right-10 w-2 h-2 bg-green-400 rounded-full animate-bounce opacity-60"
        style={{ animationDelay: "1.5s" }}
      ></div>
    </div>
  )
}
