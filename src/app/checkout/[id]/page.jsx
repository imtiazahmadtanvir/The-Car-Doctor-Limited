import Image from "next/image"
import Link from "next/link"
import dbConnect, { collectionNameobj } from "@/lib/dbConnect"
import { ObjectId } from "mongodb"
import BookingForm from '../../../components/booking/BookingForm';


export default async function CheckoutPage({ params }) {
  const { id } = await params

  // Fetch service details
  const serviceCollection = await dbConnect(collectionNameobj.servicesCollection)
  const service = await serviceCollection.findOne({ _id: new ObjectId(id) })

  if (!service) {
    return (
      <div className="container mx-auto py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600">Service Not Found</h1>
          <Link href="/services" className="text-blue-600 hover:underline mt-4 inline-block">
            Back to Services
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Book Your Service</h1>
        <p className="text-gray-600">Complete the form below to confirm your booking</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {/* Service Details */}
        <div className="bg-white rounded-lg shadow-md p-6 border">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Service Details</h2>

          <div className="relative w-full h-48 mb-4 rounded-lg overflow-hidden">
            <Image src={service.img || "/placeholder.svg"} fill alt={service.title} className="object-cover" />
          </div>

          <h3 className="text-lg font-semibold text-gray-800 mb-2">{service.title}</h3>
          <p className="text-gray-600 mb-4 text-sm">{service.description}</p>

          <div className="border-t pt-4">
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold text-gray-700">Total Price:</span>
              <span className="text-2xl font-bold text-orange-500">${service.price}</span>
            </div>
          </div>
        </div>

        {/* Booking Form */}
        <div className="bg-white rounded-lg shadow-md p-6 border">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Booking Information</h2>
          <BookingForm service={service} />
        </div>
      </div>
    </div>
  )
}
