"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"

export default function AboutUsSection() {
  return (
    <section className="py-12 md:py-16 lg:py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Column - Images */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              {/* Main mechanic image */}
              <div className="col-span-2 sm:col-span-1">
                <div className="relative h-64 sm:h-80 lg:h-96 rounded-lg overflow-hidden">
                  <Image src="/assets/images/about_us/person.jpg" alt="Professional mechanic" fill className="object-cover" />
                </div>
              </div>

              {/* Car parts image */}
              <div className="col-span-2 sm:col-span-1">
                <div className="relative h-48 sm:h-80 lg:h-96 rounded-lg overflow-hidden">
                  <Image src="/assets/images/about_us/parts.jpg" alt="Car parts and tools" fill className="object-cover" />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Content */}
          <div className="space-y-6">
            <div>
              <p className="text-red-600 font-semibold text-sm md:text-base mb-2 uppercase tracking-wide">About Us</p>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
                We are qualified
                <br />
                {"& of experience"}
                <br />
                in this field
              </h2>
            </div>

            <div className="space-y-4 text-gray-600">
              <p className="text-sm md:text-base leading-relaxed">
                There Are Many Variations Of Passages Of Lorem Ipsum Available, But The Majority Have Suffered
                Alteration In Some Form, By Injected Humour, Or Randomised Words Which Don't Look Even Slightly
                Believable.
              </p>

              <p className="text-sm md:text-base leading-relaxed">
                The Majority Have Suffered Alteration In Some Form, By Injected Humour, Or Randomised Words Which Don't
                Look Even Slightly Believable. If You Are Going To Use A Passage Of Lorem Ipsum, You Need To Be Sure
                There Isn't Anything Embarrassing Hidden In The Middle Of Text. All The Lorem Ipsum Generators On The
                Internet Tend To Repeat Predefined Chunks As Necessary.
              </p>
            </div>

            <div className="pt-4">
              <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 text-base font-semibold">
                Get More Info
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
