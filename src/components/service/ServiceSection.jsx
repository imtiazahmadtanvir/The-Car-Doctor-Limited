import dbConnect from "@/lib/dbConnect";
import Image from 'next/image';
import React from 'react';

export default async function ServiceSection() {
    
   // const res = await fetch("/services.json")
        const serviceCollection = await dbConnect("test_service");
        const data = await serviceCollection.find({}).toArray();

    return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {data.map((item) => (
        <div key={item._id} className="bg-white rounded-xl shadow-md p-4">
          <Image
            src={item.img}
            width={314}
            height={248}
            alt={item.title}
            className="rounded-md mb-4 object-cover"
          />
          <h2 className="text-xl font-semibold mb-2">{item.title}</h2>
          <p className="text-sm text-gray-600 mb-2">${item.price}</p>
          <p className="text-gray-500 text-sm line-clamp-3">
            {item.description}
          </p>
        </div>
      ))}
    </div>
  );
};