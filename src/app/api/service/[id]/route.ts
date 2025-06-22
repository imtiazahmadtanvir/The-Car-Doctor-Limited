import dbConnect, { collectionNameobj } from "@/lib/dbConnect"
import { ObjectId } from "mongodb"
import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params

    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid service ID" }, { status: 400 })
    }

    const serviceCollection = await dbConnect(collectionNameobj.servicesCollection)
    const service = await serviceCollection.findOne({ _id: new ObjectId(id) })

    if (!service) {
      return NextResponse.json({ error: "Service not found" }, { status: 404 })
    }

    return NextResponse.json(service)
  } catch (error) {
    console.error("Error fetching service:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
