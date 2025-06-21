"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"
import Image from "next/image"

const products = [
  {
    id: 1,
    name: "Car Engine Plug",
    price: "$20.00",
    image: "/assets/images/products/1.png",
    rating: 5,
  },
  {
    id: 2,
    name: "Car Air Filter",
    price: "$20.00",
    image: "/assets/images/products/2.png",
    rating: 5,
  },
  {
    id: 3,
    name: "Cools Led Light",
    price: "$20.00",
    image: "/assets/images/products/3.png",
    rating: 5,
  },
  {
    id: 4,
    name: "Cools Led Light",
    price: "$20.00",
    image: "/assets/images/products/4.png",
    rating: 5,
  },
  {
    id: 5,
    name: "Cools Led Light",
    price: "$20.00",
    image: "/assets/images/products/5.png",
    rating: 5,
  },
  {
    id: 6,
    name: "Cools Led Light",
    price: "$20.00",
    image: "/assets/images/products/6.png",
    rating: 5,
  },
]

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center justify-center space-x-1 mb-3">
      {[...Array(5)].map((_, index) => (
        <Star
          key={index}
          className={`w-4 h-4 ${index < rating ? "fill-orange-400 text-orange-400" : "fill-gray-200 text-gray-200"}`}
        />
      ))}
    </div>
  )
}

export default function PopularProducts() {
  return (
    <section className="py-12 md:py-16 lg:py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <p className="text-red-600 font-semibold text-sm md:text-base mb-2 uppercase tracking-wide">
            Popular Products
          </p>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Browse Our Products</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            The Majority Have Suffered Alteration In Some Form, By Injected Humour, Or Randomised Words Which Don't Look
            Even Slightly Believable.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12">
          {products.map((product) => (
            <Card key={product.id} className="group hover:shadow-lg transition-all duration-300 border-0 bg-white">
              <CardContent className="p-6">
                {/* Product Image */}
                <div className="relative h-48 md:h-56 mb-6 bg-gray-100 rounded-lg overflow-hidden">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Star Rating */}
                <StarRating rating={product.rating} />

                {/* Product Name */}
                <h3 className="text-lg md:text-xl font-semibold text-gray-900 text-center mb-2">{product.name}</h3>

                {/* Product Price */}
                <p className="text-red-600 font-bold text-lg md:text-xl text-center">{product.price}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* More Products Button */}
        <div className="text-center">
          <Button
            variant="outline"
            size="lg"
            className="border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white px-8 py-3 text-base font-semibold bg-transparent"
          >
            More Products
          </Button>
        </div>
      </div>
    </section>
  )
}
