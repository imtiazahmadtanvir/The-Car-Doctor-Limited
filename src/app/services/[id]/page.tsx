import Image from "next/image"
import Link from "next/link"
import dbConnect, { collectionNameobj } from "@/lib/dbConnect"
import { ObjectId } from "mongodb"

interface ServiceDetailsPageProps {
  params: Promise<{ id: string }>
}

export default async function ServiceDetailsPage({ params }: ServiceDetailsPageProps) {
  const { id } = await params

  // Fetch data directly from database instead of API route
  const serviceCollection = await dbConnect(collectionNameobj.servicesCollection)
  const data = await serviceCollection.findOne({ _id: new ObjectId(id) })

  if (!data) {
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
    <div className="container mx-auto">
      <section className="flex justify-center mb-8">
        <figure className="relative w-full max-w-6xl">
          <Image
            src="/assets/images/checkout/checkout.png"
            width={1137}
            height={300}
            alt="banner"
            className="w-full h-[300px] object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center">
            <div className="w-full h-full font-bold text-2xl flex items-center ps-16">
              <div>
                <h1 className="text-white">{data.title}</h1>
              </div>
            </div>
          </div>
        </figure>
      </section>

      <section className="container mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 mt-4 px-4">
        {/* Left Side */}
        <div className="lg:col-span-9 space-y-6">
          <div className="relative w-full h-[400px]">
            <Image src={data.img || "/placeholder.svg"} fill alt={data.title} className="object-cover rounded-lg" />
          </div>
          <h1 className="font-bold text-3xl text-gray-800">{data.title}</h1>
          <p className="text-justify text-gray-600 leading-relaxed">{data.description}</p>
        </div>

        {/* Right Side */}
        <div className="lg:col-span-3 space-y-4">
          <div className="bg-gray-50 p-6 rounded-lg border">
            <p className="text-center text-2xl font-bold text-orange-500 mb-4">${data.price}</p>
            <Link href={`/checkout/${data._id}`}>
              <button className="w-full text-white py-3 bg-orange-500 hover:bg-orange-600 transition-colors rounded-lg font-semibold">
                Proceed to Checkout
              </button>
            </Link>
          </div>

          <div className="bg-white p-4 rounded-lg border">
            <h3 className="font-semibold text-gray-800 mb-2">Service Details</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Professional Service</li>
              <li>• Quality Guaranteed</li>
              <li>• Expert Support</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  )
}
