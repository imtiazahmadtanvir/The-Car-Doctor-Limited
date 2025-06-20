"use client"
import type React from "react"
import Link from "next/link"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"
import SocialLogin from "./SocialLogin"

export default function LoginForm(): React.JSX.Element {
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    const form = e.target as HTMLFormElement
    const formData = new FormData(form)
    const email = formData.get("email") as string
    const password = formData.get("password") as string
    toast("Submitting .... ")

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      })

    if (result?.ok) {
      // Wait for 10 seconds before showing success toast
      await new Promise(resolve => setTimeout(resolve, 10000));
      toast.success("Login Successfully");
      router.push("/");
    } else {
      // Wait for 10 seconds before showing error toast
      await new Promise(resolve => setTimeout(resolve, 10000));
      toast.error("Failed in Login");
      console.log("Invalid credentials. Please try again.");
    }

    } catch (error) {
      console.log(error)
      alert("Authentication Failed")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-lg space-y-8">
      <label className="form-control w-full">
        <div className="label w-full">
          <span className="label-text font-bold">Email</span>
        </div>
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          className="input input-bordered w-full"
          required
        />
      </label>
      <label className="form-control w-full">
        <div className="label w-full">
          <span className="label-text font-bold">Password</span>
        </div>
        <input
          type="password"
          name="password"
          placeholder="Enter your password"
          className="input input-bordered w-full"
          required
        />
      </label>
      <button
        type="submit"
        className="w-full h-12 bg-orange-500 text-white font-bold hover:bg-orange-600 transition-colors"
      >
        Sign In
      </button>
      <p className="text-center">Or Sign In with</p>
      <SocialLogin/>
      <p className="text-center">
        Do not have an account?{" "}
        <Link href="/register" className="text-orange-500 font-bold hover:underline">
          Register
        </Link>
      </p>
    </form>
  )
}
