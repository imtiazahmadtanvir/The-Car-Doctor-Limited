import Navbar from "@/components/Navbar/Navbar"
import dbConnect, { collectionNameobj } from "@/lib/dbConnect"
import Image from "next/image"
import Link from "next/link"
import { FaArrowRight, FaStar } from "react-icons/fa"

interface ServiceFacility {
  name: string
  details: string
}

interface Service {
  _id: string
  service_id: string
  title: string
  img: string
  price: string
  description: string
  facility: ServiceFacility[]
}

export default async function ServicesPage() {
  const serviceCollection = await dbConnect(collectionNameobj.servicesCollection)
  const services = await serviceCollection.find({}).toArray()

  return (
 <div>

       <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Our Services</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our comprehensive range of professional services designed to meet all your needs with quality and
            reliability you can trust.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((item) => (
            <div
              key={item._id.toString()}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden group"
            >
              {/* Service Image */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  src={item.img || "/placeholder.svg?height=192&width=314"}
                  width={314}
                  height={192}
                  alt={item.title}
                />
                <div className="absolute top-4 right-4 bg-white px-2 py-1 rounded-full text-sm font-semibold text-orange-500">
                  ${item.price}
                </div>
              </div>

              {/* Service Content */}
              <div className="p-6">
                <div className="flex items-center mb-2">
                  <div className="flex text-yellow-400 text-sm">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} className="w-3 h-3" />
                    ))}
                  </div>
                  <span className="text-gray-500 text-sm ml-2">(4.8)</span>
                </div>

                <h2 className="font-bold text-xl text-gray-800 mb-3 line-clamp-2">{item.title}</h2>

                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {item.description || "Professional service with quality guarantee and expert support."}
                </p>

                {/* Service Features */}
                {item.facility && item.facility.length > 0 && (
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-1">
                      {item.facility.slice(0, 2).map((facility: ServiceFacility, index: number) => (
                        <span key={index} className="bg-orange-100 text-orange-600 text-xs px-2 py-1 rounded-full">
                          {facility.name}
                        </span>
                      ))}
                      {item.facility.length > 2 && (
                        <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
                          +{item.facility.length - 2} more
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {/* Price and Action */}
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-2xl font-bold text-gray-800">${item.price}</span>
                    <span className="text-gray-500 text-sm ml-1">/ service</span>
                  </div>
                  <Link
                    href={`/services/${item._id}`}
                    className="bg-orange-500 hover:bg-orange-600 text-white p-3 rounded-full transition-colors duration-200 group"
                  >
                    <FaArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {services.length === 0 && (
          <div className="text-center py-20">
            <div className="text-gray-400 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No services available</h3>
            <p className="text-gray-500">Check back later for new services.</p>
          </div>
        )}

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-white rounded-lg shadow-md p-8 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Need a Custom Service?</h2>
            <p className="text-gray-600 mb-6">
              Can't find what you're looking for? Contact us for a personalized service solution tailored to your
              specific requirements.
            </p>
            <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200">
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </div>
 </div>
  )
}
