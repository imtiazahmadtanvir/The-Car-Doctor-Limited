import Image from "next/image"
import RegisterForm from "./components/RegisterForm"
import Link from "next/link"

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">


      {/* Main Content */}
      <div className="container mx-auto px-4 pb-8">
        <div className="flex flex-col lg:flex-row min-h-[calc(100vh-120px)]">
          {/* Left Section - Image */}
          <div className="hidden lg:flex lg:w-1/2 items-center justify-center p-8">
            <div className="relative w-full max-w-md">
              <Image
                src="/assets/images/login/login.svg"
                width={500}
                height={500}
                alt="Authentication Illustration"
                className="w-full h-auto"
                priority
              />
            </div>
          </div>

          {/* Right Section - Form */}
          <div className="w-full lg:w-1/2 flex items-center justify-center p-4 lg:p-8">
            <div className="w-full max-w-md">
              {/* Mobile Image */}
              <div className="lg:hidden text-center mb-8">
                <div className="relative w-32 h-32 mx-auto mb-4">
                  <Image
                    src="/assets/images/login/login.svg"
                    fill
                    alt="Authentication Illustration"
                    className="object-contain"
                  />
                </div>
              </div>

              {/* Form Header */}
              <div className="text-center mb-8">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">Create Account</h1>
                <p className="text-sm sm:text-base text-gray-600">Join us today and get started</p>
              </div>

              {/* Register Form */}
              <RegisterForm />

              {/* Footer Links */}
              <div className="mt-8 text-center">
                <p className="text-sm text-gray-600">
                  Already have an account?{" "}
                  <Link href="/login" className="font-semibold text-orange-600 hover:text-orange-500 transition-colors">
                    Sign in here
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
