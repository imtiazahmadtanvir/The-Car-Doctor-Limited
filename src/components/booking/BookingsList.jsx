"use client"

import { useState } from "react"
import { deleteBooking } from "@/lib/actions/booking"
import { toast, Toaster } from "react-hot-toast"
import EditBookingModal from "./EditBookingModal"

export default function BookingsList({ bookings }) {
  const [isDeleting, setIsDeleting] = useState(null)
  const [editingBooking, setEditingBooking] = useState(null)

  const handleDelete = async (bookingId) => {
    if (!confirm("Are you sure you want to delete this booking? This action cannot be undone.")) {
      return
    }

    setIsDeleting(bookingId)

    try {
      const result = await deleteBooking(bookingId)

      if (result.success) {
        toast.success(result.message)
        // Refresh the page to show updated data
        window.location.reload()
      } else {
        toast.error(result.message)
      }
    } catch (error) {
      toast.error("An error occurred while deleting the booking")
    } finally {
      setIsDeleting(null)
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      case "completed":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const formatTime = (timeString) => {
    const [hours, minutes] = timeString.split(":")
    const hour = Number.parseInt(hours)
    const ampm = hour >= 12 ? "PM" : "AM"
    const displayHour = hour % 12 || 12
    return `${displayHour}:${minutes} ${ampm}`
  }

  return (
    <>
      <Toaster />
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Service
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date & Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {bookings.map((booking) => (
                <tr key={booking._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{booking.customerName}</div>
                      <div className="text-sm text-gray-500">{booking.customerEmail}</div>
                      <div className="text-sm text-gray-500">{booking.customerPhone}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{booking.serviceName}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{formatDate(booking.bookingDate)}</div>
                    <div className="text-sm text-gray-500">{formatTime(booking.bookingTime)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">${booking.servicePrice}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                        booking.status,
                      )}`}
                    >
                      {booking.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button
                      onClick={() => setEditingBooking(booking)}
                      className="text-indigo-600 hover:text-indigo-900 bg-indigo-50 hover:bg-indigo-100 px-3 py-1 rounded-md transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(booking._id)}
                      disabled={isDeleting === booking._id}
                      className="text-red-600 hover:text-red-900 bg-red-50 hover:bg-red-100 px-3 py-1 rounded-md transition-colors disabled:opacity-50"
                    >
                      {isDeleting === booking._id ? "Deleting..." : "Delete"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Show booking details in mobile view */}
      <div className="md:hidden space-y-4 mt-6">
        {bookings.map((booking) => (
          <div key={booking._id} className="bg-white border rounded-lg p-4 shadow-sm">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="font-semibold text-gray-900">{booking.customerName}</h3>
                <p className="text-sm text-gray-600">{booking.serviceName}</p>
              </div>
              <span
                className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(booking.status)}`}
              >
                {booking.status}
              </span>
            </div>

            <div className="space-y-2 text-sm text-gray-600 mb-4">
              <p>📧 {booking.customerEmail}</p>
              <p>📞 {booking.customerPhone}</p>
              <p>
                📅 {formatDate(booking.bookingDate)} at {formatTime(booking.bookingTime)}
              </p>
              <p>💰 ${booking.servicePrice}</p>
              {booking.specialRequests && <p>📝 {booking.specialRequests}</p>}
            </div>

            <div className="flex space-x-2">
              <button
                onClick={() => setEditingBooking(booking)}
                className="flex-1 text-indigo-600 hover:text-indigo-900 bg-indigo-50 hover:bg-indigo-100 px-3 py-2 rounded-md transition-colors text-sm font-medium"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(booking._id)}
                disabled={isDeleting === booking._id}
                className="flex-1 text-red-600 hover:text-red-900 bg-red-50 hover:bg-red-100 px-3 py-2 rounded-md transition-colors disabled:opacity-50 text-sm font-medium"
              >
                {isDeleting === booking._id ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {editingBooking && <EditBookingModal booking={editingBooking} onClose={() => setEditingBooking(null)} />}
    </>
  )
}
