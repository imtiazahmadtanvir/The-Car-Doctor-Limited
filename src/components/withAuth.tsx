"use client"

import type React from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

interface WithAuthOptions {
  requiredRoles?: string[]
  redirectTo?: string
  loadingComponent?: React.ComponentType
}

export function withAuth<P extends object>(WrappedComponent: React.ComponentType<P>, options: WithAuthOptions = {}) {
  const { requiredRoles = [], redirectTo = "/login", loadingComponent: LoadingComponent } = options

  return function AuthenticatedComponent(props: P) {
    const { data: session, status } = useSession()
    const router = useRouter()

    useEffect(() => {
      if (status === "loading") return

      if (!session) {
        router.push(redirectTo)
        return
      }

      if (requiredRoles.length > 0) {
        const userRole = "user"
        if (!requiredRoles.includes(userRole)) {
          router.push("/unauthorized")
          return
        }
      }
    }, [session, status, router])

    if (status === "loading") {
      if (LoadingComponent) {
        return <LoadingComponent />
      }
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-500"></div>
        </div>
      )
    }

    if (!session) {
      return null
    }

    if (requiredRoles.length > 0) {
      const userRole = "user"
      if (!requiredRoles.includes(userRole)) {
        return null
      }
    }

    return <WrappedComponent {...props} />
  }
}
