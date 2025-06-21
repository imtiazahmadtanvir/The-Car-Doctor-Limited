"use client"

import { Clock, Phone, MapPin } from "lucide-react"

export default function ContactHeader() {
  return (
    <section className="bg-gray-900 text-white py-4 md:py-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 items-center">
          {/* Opening Hours */}
          <div className="flex items-center justify-center md:justify-start space-x-3">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5 text-white" />
              </div>
            </div>
            <div className="text-center md:text-left">
              <p className="text-xs md:text-sm text-gray-300 mb-1">We are open monday-friday</p>
              <p className="text-sm md:text-base font-semibold">7:00 am - 9:00 pm</p>
            </div>
          </div>

          {/* Phone Number */}
          <div className="flex items-center justify-center space-x-3">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center">
                <Phone className="w-5 h-5 text-white" />
              </div>
            </div>
            <div className="text-center">
              <p className="text-xs md:text-sm text-gray-300 mb-1">Have a question?</p>
              <p className="text-sm md:text-base font-semibold">+2546 251 2658</p>
            </div>
          </div>

          {/* Address */}
          <div className="flex items-center justify-center md:justify-end space-x-3">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center">
                <MapPin className="w-5 h-5 text-white" />
              </div>
            </div>
            <div className="text-center md:text-right">
              <p className="text-xs md:text-sm text-gray-300 mb-1">Need a repair? our address</p>
              <p className="text-sm md:text-base font-semibold">Liza Street, New York</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
