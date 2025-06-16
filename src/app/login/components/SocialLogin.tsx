"use client"
import type React from "react"
import { signIn } from "next-auth/react"
import { FaGithub, FaGoogle } from "react-icons/fa"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"

export default function SocialLogin(): React.JSX.Element {
  const router = useRouter()

  const handleSocialLogin = async (provider: "google" | "github"): Promise<void> => {
    try {
      toast("Signing in...")
      const result = await signIn(provider, {
        callbackUrl: "/",
        redirect: false,
      })

      if (result?.ok) {
        toast.success(`Signed in with ${provider} successfully`)
        router.push("/")
      } else {
        toast.error(`Failed to sign in with ${provider}`)
      }
    } catch (error) {
      console.error(`${provider} sign-in error:`, error)
      toast.error(`Failed to sign in with ${provider}`)
    }
  }

  return (
    <div className="flex gap-4 justify-center">
      <button
        type="button"
        onClick={() => handleSocialLogin("google")}
        className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
      >
        <FaGoogle className="text-red-500" />
        Google
      </button>
      <button
        type="button"
        onClick={() => handleSocialLogin("github")}
        className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
      >
        <FaGithub className="text-gray-800" />
        GitHub
      </button>
    </div>
  )
}
