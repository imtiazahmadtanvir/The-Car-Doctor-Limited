"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Calendar, User, Search, ArrowRight } from "lucide-react"
import Image from "next/image"
import { useState } from "react"

const blogPosts = [
  {
    id: 1,
    title: "10 Essential Car Maintenance Tips for Winter",
    excerpt:
      "Prepare your vehicle for the cold season with these expert maintenance tips that will keep you safe on the road.",
    image: "/assets/images/banner/1.jpg?height=300&width=400",
    category: "Maintenance",
    author: "John Smith",
    date: "2024-01-15",
    readTime: "5 min read",
  },
  {
    id: 2,
    title: "Signs Your Brakes Need Immediate Attention",
    excerpt:
      "Learn to recognize the warning signs that indicate your brake system requires professional inspection and repair.",
    image: "/assets/images/banner/2.jpg?height=300&width=400",
    category: "Safety",
    author: "Sarah Johnson",
    date: "2024-01-12",
    readTime: "4 min read",
  },
  {
    id: 3,
    title: "How to Extend Your Engine's Lifespan",
    excerpt:
      "Simple practices and regular maintenance routines that can significantly extend your engine's operational life.",
    image: "/assets/images/banner/3.jpg?height=300&width=400",
    category: "Engine Care",
    author: "Mike Wilson",
    date: "2024-01-10",
    readTime: "6 min read",
  },
  {
    id: 4,
    title: "Understanding Your Car's Warning Lights",
    excerpt: "A comprehensive guide to dashboard warning lights and what they mean for your vehicle's health.",
    image: "/assets/images/banner/4.jpg?height=300&width=400",
    category: "Diagnostics",
    author: "Emily Davis",
    date: "2024-01-08",
    readTime: "7 min read",
  },
  {
    id: 5,
    title: "The Importance of Regular Oil Changes",
    excerpt: "Why consistent oil changes are crucial for your engine's performance and longevity.",
    image: "/assets/images/banner/5.jpg?height=300&width=400",
    category: "Maintenance",
    author: "David Brown",
    date: "2024-01-05",
    readTime: "3 min read",
  },
  {
    id: 6,
    title: "Electric Vehicle Maintenance: What's Different?",
    excerpt: "Discover how EV maintenance differs from traditional vehicles and what owners need to know.",
    image: "/assets/images/banner/6.jpg?height=300&width=400",
    category: "Electric Vehicles",
    author: "Lisa Chen",
    date: "2024-01-03",
    readTime: "8 min read",
  },
]

const categories = ["All", "Maintenance", "Safety", "Engine Care", "Diagnostics", "Electric Vehicles"]

const featuredPost = {
  id: 7,
  title: "Complete Guide to Seasonal Car Care",
  excerpt:
    "Everything you need to know about maintaining your vehicle throughout the year, from spring cleaning to winter preparation.",
  image: "/assets/images/banner/5.jpg?height=400&width=800",
  category: "Seasonal Care",
  author: "Car Doctor Team",
  date: "2024-01-20",
  readTime: "12 min read",
}

export default function BlogPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")

  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gray-900 text-white py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">Car Care Blog</h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-8">
            Expert tips, maintenance guides, and automotive insights to keep your vehicle running smoothly
          </p>

          {/* Search Bar */}
          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-white text-gray-900"
            />
          </div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">Featured Article</h2>
          <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <div className="grid lg:grid-cols-2 gap-0">
              <div className="relative h-64 lg:h-full">
                <Image
                  src={featuredPost.image || "/assets/images/banner/5.jpg"}
                  alt={featuredPost.title}
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="p-6 lg:p-8 flex flex-col justify-center">
                <div className="flex items-center space-x-4 mb-4">
                  <Badge variant="secondary" className="bg-red-100 text-red-800">
                    {featuredPost.category}
                  </Badge>
                  <span className="text-sm text-gray-500">{featuredPost.readTime}</span>
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">{featuredPost.title}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">{featuredPost.excerpt}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center">
                      <User className="w-4 h-4 mr-1" />
                      {featuredPost.author}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {new Date(featuredPost.date).toLocaleDateString()}
                    </div>
                  </div>
                  <Button variant="outline" className="border-red-600 text-red-600 hover:bg-red-600 hover:text-white">
                    Read More <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </div>
          </Card>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className={selectedCategory === category ? "bg-red-600 hover:bg-red-700" : ""}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <Card key={post.id} className="overflow-hidden hover:shadow-xl transition-shadow duration-300 bg-white">
                <div className="relative h-48">
                  <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant="secondary" className="bg-red-100 text-red-800 text-xs">
                      {post.category}
                    </Badge>
                    <span className="text-xs text-gray-500">{post.readTime}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 line-clamp-2">{post.title}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">{post.excerpt}</p>
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                    <div className="flex items-center">
                      <User className="w-3 h-3 mr-1" />
                      {post.author}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-3 h-3 mr-1" />
                      {new Date(post.date).toLocaleDateString()}
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full border-red-600 text-red-600 hover:bg-red-600 hover:text-white"
                  >
                    Read Article <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No articles found matching your search criteria.</p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-12 md:py-16 bg-gray-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter for the latest automotive tips, maintenance guides, and industry insights
          </p>
          <div className="max-w-md mx-auto flex gap-4">
            <Input type="email" placeholder="Enter your email" className="flex-1 bg-white text-gray-900" />
            <Button className="bg-red-600 hover:bg-red-700">Subscribe</Button>
          </div>
        </div>
      </section>
    </main>
  )
}
