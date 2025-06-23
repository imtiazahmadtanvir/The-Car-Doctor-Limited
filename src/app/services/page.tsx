import dbConnect, { collectionNameobj } from "@/lib/dbConnect"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
// import { FaArrowRight } from "react-icons/fa"
import { ArrowRight, Star, Clock, Shield } from "lucide-react"
export default async function ServiceSection() {
  const serviceCollection = await dbConnect(collectionNameobj.servicesCollection)
  const data = await serviceCollection.find({}).toArray()

return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-12 sm:mb-16 md:mb-20">
          <div className="max-w-4xl mx-auto">
            <Badge variant="secondary" className="mb-4 text-red-600 bg-red-50 border-red-200">
              Professional Services
            </Badge>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6">
              Our <span className="text-red-600">Services</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Discover our comprehensive range of professional services designed to meet all your needs with quality and
              reliability you can trust.
            </p>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
          {data.map((item) => (
            <Card
              key={item._id.toString()}
              className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-0 shadow-lg bg-white overflow-hidden"
            >
              <CardHeader className="p-0 relative">
                {item.featured && (
                  <Badge className="absolute top-4 left-4 z-10 bg-red-600 hover:bg-red-700">Featured</Badge>
                )}
                <div className="relative w-full h-48 sm:h-56 md:h-64 overflow-hidden">
                  <Image
                    src={item.img || "/placeholder.svg"}
                    fill
                    alt={item.title}
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </CardHeader>

              <CardContent className="p-4 sm:p-6">
                <div className="flex justify-between items-start mb-3 sm:mb-4">
                  <div className="flex-1">
                    <h2 className="font-bold text-lg sm:text-xl text-gray-900 mb-2 group-hover:text-red-600 transition-colors">
                      {item.title}
                    </h2>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium text-gray-700">{item.rating}</span>
                      </div>
                      <div className="flex items-center gap-1 text-gray-500">
                        <Clock className="w-4 h-4" />
                        <span className="text-sm">{item.duration}</span>
                      </div>
                    </div>
                    <p className="font-bold text-xl sm:text-2xl text-red-600">${item.price}</p>
                  </div>
                  <Button
                    asChild
                    size="sm"
                    variant="ghost"
                    className="text-red-600 hover:text-white hover:bg-red-600 transition-all duration-300 p-2 rounded-full"
                  >
                    <Link href={`/services/${item._id}`} aria-label={`View details for ${item.title}`}>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </Button>
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                  <Shield className="w-4 h-4" />
                  <span>Quality Guaranteed</span>
                </div>
              </CardContent>

              <CardFooter className="p-4 sm:p-6 pt-0">
                <Button
                  asChild
                  className="w-full bg-gray-900 hover:bg-red-600 text-white transition-all duration-300 hover:scale-105"
                >
                  <Link href={`/services/${item._id}`}>View Details</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-red-600 to-red-700 rounded-2xl sm:rounded-3xl p-8 sm:p-12 md:p-16 text-white">
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">Ready to Get Started?</h3>
          <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 opacity-90 max-w-2xl mx-auto">
            Book your service today and experience the difference of professional car care.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              asChild
              size="lg"
              variant="secondary"
              className="bg-white text-red-600 hover:bg-gray-100 px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-semibold transition-all duration-300 hover:scale-105"
            >
              <Link href="/bookings">View All Bookings</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-2 border-white text-white hover:bg-white hover:text-red-600 px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-semibold transition-all duration-300 hover:scale-105"
            >
              <Link  className="text-black" href="/about">About Us</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
