"use client"

import { useState } from "react"
import { createBooking } from "@/lib/actions/booking"
import { toast, Toaster } from "react-hot-toast"

export default function BookingForm({ service }) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(formData) {
    setIsSubmitting(true)

    try {
      const result = await createBooking(formData)

      if (result.success) {
        toast.success(result.message, {
          duration: 4000,
          position: "top-center",
        })

        // Reset form
        document.getElementById("booking-form").reset()

        // Optional: Redirect after success
        setTimeout(() => {
          window.location.href = "/services"
        }, 2000)
      } else {
        toast.error(result.message, {
          duration: 4000,
          position: "top-center",
        })
      }
    } catch (error) {
      toast.error("An unexpected error occurred. Please try again.", {
        duration: 4000,
        position: "top-center",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  // Get today's date for min date validation
  const today = new Date().toISOString().split("T")[0]

  return (
    <>
      <Toaster />
      <form id="booking-form" action={handleSubmit} className="space-y-4">
        <input type="hidden" name="serviceId" value={service._id} />

        {/* Customer Name */}
        <div>
          <label htmlFor="customerName" className="block text-sm font-medium text-gray-700 mb-1">
            Full Name *
          </label>
          <input
            type="text"
            id="customerName"
            name="customerName"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            placeholder="Enter your full name"
          />
        </div>

        {/* Customer Email */}
        <div>
          <label htmlFor="customerEmail" className="block text-sm font-medium text-gray-700 mb-1">
            Email Address *
          </label>
          <input
            type="email"
            id="customerEmail"
            name="customerEmail"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            placeholder="Enter your email address"
          />
        </div>

        {/* Customer Phone */}
        <div>
          <label htmlFor="customerPhone" className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number *
          </label>
          <input
            type="tel"
            id="customerPhone"
            name="customerPhone"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            placeholder="Enter your phone number"
          />
        </div>

        {/* Booking Date */}
        <div>
          <label htmlFor="bookingDate" className="block text-sm font-medium text-gray-700 mb-1">
            Preferred Date *
          </label>
          <input
            type="date"
            id="bookingDate"
            name="bookingDate"
            required
            min={today}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
        </div>

        {/* Booking Time */}
        <div>
          <label htmlFor="bookingTime" className="block text-sm font-medium text-gray-700 mb-1">
            Preferred Time *
          </label>
          <select
            id="bookingTime"
            name="bookingTime"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          >
            <option value="">Select a time</option>
            <option value="09:00">9:00 AM</option>
            <option value="10:00">10:00 AM</option>
            <option value="11:00">11:00 AM</option>
            <option value="12:00">12:00 PM</option>
            <option value="13:00">1:00 PM</option>
            <option value="14:00">2:00 PM</option>
            <option value="15:00">3:00 PM</option>
            <option value="16:00">4:00 PM</option>
            <option value="17:00">5:00 PM</option>
          </select>
        </div>

        {/* Special Requests */}
        <div>
          <label htmlFor="specialRequests" className="block text-sm font-medium text-gray-700 mb-1">
            Special Requests (Optional)
          </label>
          <textarea
            id="specialRequests"
            name="specialRequests"
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            placeholder="Any special requirements or notes..."
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center"
        >
          {isSubmitting ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Processing...
            </>
          ) : (
            `Confirm Booking - $${service.price}`
          )}
        </button>
      </form>
    </>
  )
}
