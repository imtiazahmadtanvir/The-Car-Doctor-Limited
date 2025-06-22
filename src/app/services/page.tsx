import dbConnect, { collectionNameobj } from "@/lib/dbConnect"
import Image from "next/image"
import Link from "next/link"
import { FaArrowRight } from "react-icons/fa"

export default async function ServiceSection() {
  const serviceCollection = await dbConnect(collectionNameobj.servicesCollection)
  const data = await serviceCollection.find({}).toArray()

  return (
    <div className="py-12">
      <div className="text-center mb-12">
        <div className="flex justify-between items-center mb-4">
          <div className="flex-1">
            <h1 className="text-4xl font-bold text-red-800 mb-4">Our Services</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover our comprehensive range of professional services designed to meet all your needs with quality and
              reliability you can trust.
            </p>
          </div>
          
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 container mx-auto px-4">
        {data.map((item) => (
          <div
            className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden border"
            key={item._id.toString()}
          >
            <figure className="relative w-full h-48">
              <Image src={item.img || "/placeholder.svg"} fill alt={item.title} className="object-cover" />
            </figure>

            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <h2 className="font-bold text-xl text-gray-800 mb-2">{item.title}</h2>
                  <p className="font-bold text-xl text-orange-500">${item.price}</p>
                </div>
                <Link
                  href={`/services/${item._id}`}
                  className="text-orange-500 hover:text-orange-600 transition-colors p-2 rounded-full hover:bg-orange-50"
                  aria-label={`View details for ${item.title}`}
                >
                  <FaArrowRight size={18} />
                </Link>
              </div>

              <Link href={`/services/${item._id}`}>
                <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 px-4 rounded-lg transition-colors font-medium">
                  View Details
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
      <div className="lg:mt-10 text-center">
         <Link
            href="/bookings"
            className="bg-orange-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
          >
            View All Bookings
          </Link>
      </div>
    </div>
  )
}
