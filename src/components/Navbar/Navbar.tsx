"use client"

import { signOut, useSession } from "next-auth/react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { Menu, User, LogOut, Calendar } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Skeleton } from "@/components/ui/skeleton"

interface NavItem {
  label: string
  href: string
}

const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Blogs", href: "/blogs" },
  // { label: "My Bookings", href: "/bookings" },
]

export default function Navbar() {
  const { data: session, status } = useSession()
  const [isOpen, setIsOpen] = useState(false)

  const handleSignOut = async () => {
    try {
      await signOut({ callbackUrl: "/" })
    } catch (error) {
      console.error("Error signing out:", error)
    }
  }

  const NavLinks = ({ mobile = false, onItemClick }: { mobile?: boolean; onItemClick?: () => void }) => (
    <>
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={`${
            mobile
              ? "block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 rounded-md transition-colors"
              : "text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
          }`}
          onClick={onItemClick}
        >
          {item.label}
        </Link>
      ))}
    </>
  )

  const AuthSection = ({ mobile = false }: { mobile?: boolean }) => {
    if (status === "loading") {
      return mobile ? (
        <div className="px-3 py-2">
          <Skeleton className="h-8 w-20" />
        </div>
      ) : (
        <Skeleton className="h-8 w-20" />
      )
    }

    if (status === "authenticated" && session?.user) {
      return mobile ? (
        <div className="border-t border-gray-200 pt-4 pb-3">
          <div className="flex items-center px-3 mb-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={session.user.image || ""} alt={session.user.name || "User"} />
              <AvatarFallback>
                <User className="h-4 w-4" />
              </AvatarFallback>
            </Avatar>
            <div className="ml-3">
              <div className="text-base font-medium text-gray-800">{session.user.name}</div>
              <div className="text-sm font-medium text-gray-500">{session.user.email}</div>
            </div>
          </div>
          <Button
            variant="ghost"
            className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
            onClick={handleSignOut}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Sign Out
          </Button>
        </div>
      ) : (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarImage src={session.user.image || ""} alt={session.user.name || "User"} />
                <AvatarFallback>
                  <User className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <div className="flex items-center justify-start gap-2 p-2">
              <div className="flex flex-col space-y-1 leading-none">
                {session.user.name && <p className="font-medium">{session.user.name}</p>}
                {session.user.email && (
                  <p className="w-[200px] truncate text-sm text-muted-foreground">{session.user.email}</p>
                )}
              </div>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/profile" className="cursor-pointer">
                <User className="mr-2 h-4 w-4" />
                Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/bookings" className="hidden cursor-pointer">
                <Calendar className="mr-2 h-4 w-4" />
                My Bookings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer text-red-600 focus:text-red-600" onClick={handleSignOut}>
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }

    return mobile ? (
      <div className="border-t border-gray-200 pt-4 pb-3 space-y-2">
        <Link href="/register" className="block px-3 py-2">
          <Button variant="outline" className="w-full">
            Register
          </Button>
        </Link>
        <Link href="/login" className="block px-3 py-2">
          <Button className="w-full">Login</Button>
        </Link>
      </div>
    ) : (
      <div className="flex items-center space-x-2">
        <Button variant="outline" asChild>
          <Link href="/register">Register</Link>
        </Button>
        <Button asChild>
          <Link href="/login">Login</Link>
        </Button>
      </div>
    )
  }

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="relative h-8 w-24 sm:h-10 sm:w-28">
                <Image src="/assets/logo.svg" fill alt="Brand Logo" className="object-contain" priority />
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <NavLinks />
            </div>
          </div>

          {/* Desktop Auth Section */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            <AuthSection />
            <Button variant="outline" asChild>
              <Link href="/bookings">
                <Calendar className="mr-2 h-4 w-4" />
                Appointment
              </Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open main menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <div className="flex flex-col space-y-4 mt-4">
                  <NavLinks mobile onItemClick={() => setIsOpen(false)} />
                  <div className="pt-4">
                    <Button variant="outline" className="w-full mb-3" asChild>
                      <Link href="/bookings" onClick={() => setIsOpen(false)}>
                        <Calendar className="mr-2 h-4 w-4" />
                        Appointment
                      </Link>
                    </Button>
                  </div>
                  <AuthSection mobile />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  )
}
