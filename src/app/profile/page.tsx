"use client"

import { withAuth } from "@/components/withAuth"
import { useSession } from "next-auth/react"
import {
  UserIcon,
  MailIcon,
  CalendarIcon,
  EditIcon,
  SettingsIcon,
  ShieldIcon,
  TrophyIcon,
  ActivityIcon,
  MapPinIcon,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import Image from "next/image"

function ProfilePage() {
  const { data: session } = useSession()
  const user = session?.user

  // Mock data for demonstration
  const profileStats = [
    { label: "Projects", value: "12", icon: TrophyIcon },
    { label: "Contributions", value: "48", icon: ActivityIcon },
    { label: "Followers", value: "156", icon: UserIcon },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8 lg:py-12">
        {/* Header */}
        <div className="text-center mb-8 lg:mb-12">
          <h1 className="text-3xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            My Profile
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">Manage your account and preferences</p>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Main Profile Card */}
          <div className="lg:col-span-2">
            <Card className="overflow-hidden border-0 shadow-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
              {/* Cover Background */}
              <div className="h-32 lg:h-40 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 relative">
                <div className="absolute inset-0 bg-black/20"></div>
                <Button
                  size="sm"
                  variant="secondary"
                  className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 text-white border-white/30"
                >
                  <EditIcon className="w-4 h-4 mr-2" />
                  Edit Cover
                </Button>
              </div>

              <CardContent className="relative px-6 lg:px-8 pb-8">
                {/* Profile Picture */}
                <div className="flex flex-col sm:flex-row items-center sm:items-end gap-6 -mt-16 lg:-mt-20">
                  <div className="relative">
                    <div className="w-24 h-24 lg:w-32 lg:h-32 rounded-full overflow-hidden border-4 border-white dark:border-gray-800 shadow-xl bg-white">
                      <Image
                        src={user?.image || "/placeholder.svg?height=128&width=128"}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <Button
                      size="sm"
                      className="absolute -bottom-2 -right-2 rounded-full w-8 h-8 p-0 bg-blue-500 hover:bg-blue-600"
                    >
                      <EditIcon className="w-4 h-4" />
                    </Button>
                  </div>

                  <div className="flex-1 text-center sm:text-left">
                    <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                      {user?.name || "Anonymous User"}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-3">{user?.email || "No email provided"}</p>
                    <div className="flex flex-wrap justify-center sm:justify-start gap-2">
                      <Badge
                        variant="secondary"
                        className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                      >
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                        Active
                      </Badge>
                      <Badge variant="outline">Premium Member</Badge>
                    </div>
                  </div>

                  <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg">
                    <EditIcon className="w-4 h-4 mr-2" />
                    Edit Profile
                  </Button>
                </div>

                <Separator className="my-8" />

                {/* Profile Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50">
                      <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                        <UserIcon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Full Name</p>
                        <p className="font-semibold text-gray-900 dark:text-white">{user?.name || "Not provided"}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50">
                      <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                        <MailIcon className="w-5 h-5 text-green-600 dark:text-green-400" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Email Address</p>
                        <p className="font-semibold text-gray-900 dark:text-white">{user?.email || "Not provided"}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50">
                      <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
                        <CalendarIcon className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Member Since</p>
                        <p className="font-semibold text-gray-900 dark:text-white">January 2024</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50">
                      <div className="w-10 h-10 rounded-full bg-orange-100 dark:bg-orange-900 flex items-center justify-center">
                        <MapPinIcon className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Location</p>
                        <p className="font-semibold text-gray-900 dark:text-white">Bangladesh</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bio Section */}
                <div className="mt-8">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">About</h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    Passionate developer with a love for creating innovative solutions. Always learning new technologies
                    and contributing to open source projects.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Stats Card */}
            <Card className="border-0 shadow-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Statistics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {profileStats.map((stat, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 rounded-lg bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                        <stat.icon className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      </div>
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{stat.label}</span>
                    </div>
                    <span className="text-xl font-bold text-gray-900 dark:text-white">{stat.value}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="border-0 shadow-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full justify-start bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <SettingsIcon className="w-4 h-4 mr-3" />
                  Account Settings
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <ShieldIcon className="w-4 h-4 mr-3" />
                  Privacy & Security
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <ActivityIcon className="w-4 h-4 mr-3" />
                  Activity Log
                </Button>
              </CardContent>
            </Card>

            {/* Achievement Badge */}
            <Card className="border-0 shadow-xl bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 flex items-center justify-center">
                  <TrophyIcon className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Top Contributor</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  You're in the top 10% of active users this month!
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default withAuth(ProfilePage)
