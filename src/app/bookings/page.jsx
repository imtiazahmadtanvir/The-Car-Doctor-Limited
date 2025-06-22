import { getAllBookings } from "@/lib/actions/booking"
import Link from "next/link"
import BookingsList from "../../components/booking/BookingsList"

export default async function BookingsPage() {
  const bookings = await getAllBookings()

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">All Bookings</h1>
          <p className="text-gray-600">Manage and view all service bookings</p>
        </div>
        <Link
          href="/services"
          className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
        >
          Back to Services
        </Link>
      </div>

      {bookings.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No bookings found</h3>
          <p className="text-gray-500">There are no bookings to display at the moment.</p>
        </div>
      ) : (
        <BookingsList  bookings={bookings} />
      )}
    </div>
  )
}
