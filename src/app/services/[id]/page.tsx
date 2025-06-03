import Navbar from "@/components/Navbar/Navbar"
import dbConnect, { collectionNameobj } from "@/lib/dbConnect"
import { ObjectId } from "mongodb"
import Image from "next/image"
import Link from "next/link"
import { FaArrowLeft, FaShoppingCart, FaStar } from "react-icons/fa"

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

type Props = {
  params: {
    id: string
  }
}

export default async function ServiceDetailsPage({ params }: Props) {
  const serviceCollection = await dbConnect(collectionNameobj.servicesCollection)
  const service: Service | null = (await serviceCollection.findOne({ _id: new ObjectId(params.id) })) as any

  // Handle case where service is not found
  if (!service) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center py-20">
          <h2 className="text-2xl font-bold">Service not found</h2>
          <Link href="/services" className="text-orange-500 flex items-center justify-center gap-2 mt-4">
            <FaArrowLeft /> Back to services
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar/>
      {/* Hero Banner Section */}
      <section className="relative">
        <figure className="relative w-full overlay-bg">
          <Image
            src="/assets/images/checkout/checkout.png"
            width={1137}
            height={300}
            alt="banner"
            className="w-full h-64 md:h-80 object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center">
            <div className="container mx-auto px-4">
              <div className="max-w-2xl">
                <Link
                  href="/services"
                  className="text-white flex items-center gap-2 mb-4 hover:text-orange-300 transition-colors"
                >
                  <FaArrowLeft /> Back to Services
                </Link>
                <h1 className="text-white text-3xl md:text-4xl font-bold">{service.title}</h1>
                <div className="flex items-center mt-2">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} className="w-4 h-4" />
                    ))}
                  </div>
                  <span className="text-white ml-2">(4.8/5)</span>
                </div>
              </div>
            </div>
          </div>
        </figure>
      </section>

      {/* Main Content */}
      <section className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Side - Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <Image
                className="w-full h-64 md:h-80 object-cover"
                src={service.img || "/placeholder.svg?height=320&width=600"}
                width={600}
                height={320}
                alt={service.title}
              />
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="font-bold text-2xl md:text-3xl mb-4 text-gray-800">{service.title}</h2>
              <div className="prose max-w-none">
                <p className="text-gray-600 leading-relaxed text-justify">
                  {service.description ||
                    "This premium service offers exceptional quality and value. Our team of professionals ensures that every detail is handled with care and precision to meet your specific needs."}
                </p>
              </div>
            </div>

            {/* Features Section - Using actual facility data */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="font-bold text-xl mb-4 text-gray-800">Service Facilities</h3>
              {service.facility && service.facility.length > 0 ? (
                <div className="space-y-4">
                  {service.facility.map((facility: any, index: number) => (
                    <div key={index} className="border-l-4 border-orange-500 pl-4">
                      <h4 className="font-semibold text-lg text-gray-800 mb-2">{facility.name}</h4>
                      <p className="text-gray-600 text-sm">{facility.details}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <span className="text-gray-600">Professional consultation</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <span className="text-gray-600">Quality guarantee</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <span className="text-gray-600">24/7 support</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <span className="text-gray-600">Fast delivery</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Side - Booking Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
              <div className="text-center mb-6">
                <div className="text-3xl font-bold text-gray-800 mb-2">${service.price}</div>
                <div className="text-gray-500">One-time payment</div>
              </div>

              <Link href={`/checkout/${service._id}`} className="block">
                <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2">
                  <FaShoppingCart />
                  Proceed to Checkout
                </button>
              </Link>

              <div className="mt-6 space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">Service Type</span>
                  <span className="font-medium">Premium</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">Delivery Time</span>
                  <span className="font-medium">3-5 days</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">Revisions</span>
                  <span className="font-medium">Unlimited</span>
                </div>
              </div>

              <div className="mt-6 p-4 bg-green-50 rounded-lg">
                <div className="flex items-center text-green-700">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-sm font-medium">Money-back guarantee</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
