"use client"
import type React from "react"
import { useState } from "react"
import { signIn } from "next-auth/react"
import { FaGithub, FaGoogle } from "react-icons/fa"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"

export default function SocialLogin(): React.JSX.Element {
  const router = useRouter()
  const [loadingProvider, setLoadingProvider] = useState<string | null>(null)

  const handleSocialLogin = async (provider: "google" | "github"): Promise<void> => {
    if (loadingProvider) return

    setLoadingProvider(provider)

    try {
      toast.loading(`Signing in with ${provider}...`, { id: provider })

      const result = await signIn(provider, {
        callbackUrl: "/",
        redirect: false,
      })

      if (result?.error) {
        toast.error(`Failed to sign in with ${provider}: ${result.error}`, { id: provider })
      } else if (result?.ok) {
        toast.success(`Successfully signed in with ${provider}!`, { id: provider })
        router.push(result.url || "/")
      } else if (result?.url) {
        toast.success(`Redirecting...`, { id: provider })
        window.location.href = result.url
      }
    } catch (error) {
      console.error(`${provider} sign-in error:`, error)
      toast.error(`An unexpected error occurred with ${provider} sign-in`, { id: provider })
    } finally {
      setLoadingProvider(null)
    }
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      <button
        type="button"
        onClick={() => handleSocialLogin("google")}
        disabled={loadingProvider !== null}
        className="w-full inline-flex justify-center items-center px-4 py-3 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {loadingProvider === "google" ? (
          <Loader2 className="animate-spin h-4 w-4" />
        ) : (
          <FaGoogle className="h-4 w-4 text-red-500" />
        )}
        <span className="ml-2">{loadingProvider === "google" ? "Signing in..." : "Google"}</span>
      </button>

      <button
        type="button"
        onClick={() => handleSocialLogin("github")}
        disabled={loadingProvider !== null}
        className="w-full inline-flex justify-center items-center px-4 py-3 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {loadingProvider === "github" ? (
          <Loader2 className="animate-spin h-4 w-4" />
        ) : (
          <FaGithub className="h-4 w-4 text-gray-800" />
        )}
        <span className="ml-2">{loadingProvider === "github" ? "Signing in..." : "GitHub"}</span>
      </button>
    </div>
  )
}
