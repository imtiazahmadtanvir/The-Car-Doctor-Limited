"use server"

import dbConnect, { collectionNameobj } from "@/lib/dbConnect"
import { ObjectId } from "mongodb"
import { revalidatePath } from "next/cache"

export async function createBooking(formData) {
  try {
    const serviceId = formData.get("serviceId")
    const customerName = formData.get("customerName")
    const customerEmail = formData.get("customerEmail")
    const customerPhone = formData.get("customerPhone")
    const bookingDate = formData.get("bookingDate")
    const bookingTime = formData.get("bookingTime")
    const specialRequests = formData.get("specialRequests")

    // Validate required fields
    if (!serviceId || !customerName || !customerEmail || !customerPhone || !bookingDate || !bookingTime) {
      return {
        success: false,
        message: "Please fill in all required fields",
      }
    }

    // Get service details
    const serviceCollection = await dbConnect(collectionNameobj.servicesCollection)
    const service = await serviceCollection.findOne({ _id: new ObjectId(serviceId) })

    if (!service) {
      return {
        success: false,
        message: "Service not found",
      }
    }

    // Create booking object
    const booking = {
      serviceId: new ObjectId(serviceId),
      serviceName: service.title,
      servicePrice: service.price,
      customerName,
      customerEmail,
      customerPhone,
      bookingDate,
      bookingTime,
      specialRequests: specialRequests || "",
      status: "confirmed",
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    // Save booking to database
    const bookingCollection = await dbConnect(collectionNameobj.bookingCollection)
    const result = await bookingCollection.insertOne(booking)

    if (result.insertedId) {
      revalidatePath("/bookings")
      return {
        success: true,
        message: "Booking confirmed successfully!",
        bookingId: result.insertedId.toString(),
      }
    } else {
      return {
        success: false,
        message: "Failed to create booking. Please try again.",
      }
    }
  } catch (error) {
    console.error("Booking error:", error)
    return {
      success: false,
      message: "An error occurred while processing your booking. Please try again.",
    }
  }
}

export async function updateBooking(formData) {
  try {
    const bookingId = formData.get("bookingId")
    const customerName = formData.get("customerName")
    const customerEmail = formData.get("customerEmail")
    const customerPhone = formData.get("customerPhone")
    const bookingDate = formData.get("bookingDate")
    const bookingTime = formData.get("bookingTime")
    const specialRequests = formData.get("specialRequests")
    const status = formData.get("status")

    // Validate required fields
    if (!bookingId || !customerName || !customerEmail || !customerPhone || !bookingDate || !bookingTime) {
      return {
        success: false,
        message: "Please fill in all required fields",
      }
    }

    // Update booking
    const bookingCollection = await dbConnect(collectionNameobj.bookingCollection)
    const result = await bookingCollection.updateOne(
      { _id: new ObjectId(bookingId) },
      {
        $set: {
          customerName,
          customerEmail,
          customerPhone,
          bookingDate,
          bookingTime,
          specialRequests: specialRequests || "",
          status: status || "confirmed",
          updatedAt: new Date(),
        },
      },
    )

    if (result.modifiedCount > 0) {
      revalidatePath("/bookings")
      return {
        success: true,
        message: "Booking updated successfully!",
      }
    } else {
      return {
        success: false,
        message: "No changes were made or booking not found.",
      }
    }
  } catch (error) {
    console.error("Update booking error:", error)
    return {
      success: false,
      message: "An error occurred while updating the booking. Please try again.",
    }
  }
}

export async function deleteBooking(bookingId) {
  try {
    if (!bookingId) {
      return {
        success: false,
        message: "Booking ID is required",
      }
    }

    const bookingCollection = await dbConnect(collectionNameobj.bookingCollection)
    const result = await bookingCollection.deleteOne({ _id: new ObjectId(bookingId) })

    if (result.deletedCount > 0) {
      revalidatePath("/bookings")
      return {
        success: true,
        message: "Booking deleted successfully!",
      }
    } else {
      return {
        success: false,
        message: "Booking not found or already deleted.",
      }
    }
  } catch (error) {
    console.error("Delete booking error:", error)
    return {
      success: false,
      message: "An error occurred while deleting the booking. Please try again.",
    }
  }
}

export async function getAllBookings() {
  try {
    const bookingCollection = await dbConnect(collectionNameobj.bookingCollection)
    const bookings = await bookingCollection.find({}).sort({ createdAt: -1 }).toArray()

    // Convert ObjectId to string for client-side usage
    return bookings.map((booking) => ({
      ...booking,
      _id: booking._id.toString(),
      serviceId: booking.serviceId.toString(),
    }))
  } catch (error) {
    console.error("Get bookings error:", error)
    return []
  }
}
