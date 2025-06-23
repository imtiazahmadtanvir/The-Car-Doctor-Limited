"use client"

import { useSession } from "next-auth/react"
import ProtectedRoute from "@/components/ProtectedRoute"

function UserProfileContent() {
  const { data: session } = useSession()

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">User Profile</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <p className="text-gray-900">{session?.user?.name}</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <p className="text-gray-900">{session?.user?.email}</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Role</label>
          <p className="text-gray-900"> User</p>
        </div>
      </div>
    </div>
  )
}

export default function UserProfile() {
  return (
    <ProtectedRoute>
      <UserProfileContent />
    </ProtectedRoute>
  )
}
