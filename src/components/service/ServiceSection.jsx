import dbConnect, { collectionNameobj } from "@/lib/dbConnect";
import Image from 'next/image';
import Link from "next/link";
import React from 'react';
import { FaArrowRight } from "react-icons/fa";

export default async function ServiceSection() {

  // const res = await fetch("/services.json")
  const serviceCollection = await dbConnect(collectionNameobj.servicesCollection);
  const data = await serviceCollection.find({}).toArray();

  return (
    <div>
              <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-red-800 mb-4">Our Services</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our comprehensive range of professional services designed to meet all your needs with quality and
            reliability you can trust.
          </p>
        </div>
    <div className="grid grid-cols-12 gap-4 container mx-auto pb-5">
      {data.map((item) => {
        return (
          <div
            className="col-span-12 md:col-span-6 lg:col-span-4 p-4 h-full border"
            key={item._id}
          >
  
            <figure className="w-full h-3/4 flex justify-center items-center">
              <Image
                className="w-full h-full object-fit"
                src={item.img}
                width={314}
                height={108}
                alt={item.title}
              />
            </figure>
            <div className="flex justify-between items-center mt-4">
              <div>
                <h2 className="font-bold text-xl">{item.title}</h2>
                <p className="font-bold text-xl text-orange-500">
                  Price : ${item.price}
                </p>
              </div>
              <div>
                <Link
                  href={`/services/${item._id}`}
                  className="text-orange-500"
                >
                  <FaArrowRight />
                </Link>
              </div>
            </div>
          </div>
        );
      })}
    </div>
   
  </div>
  );
}