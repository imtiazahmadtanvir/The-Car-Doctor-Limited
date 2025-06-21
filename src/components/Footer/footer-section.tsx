"use client"

import { Facebook, Twitter, Instagram, Youtube } from "lucide-react"
import Image from "next/image"

const footerLinks = {
  about: [
    { name: "Home", href: "/" },
    { name: "Service", href: "/service" },
    { name: "Contact", href: "/contact" },
  ],
  company: [
    { name: "Why Car Doctor", href: "/why-us" },
    { name: "About", href: "/about" },
  ],
  support: [
    { name: "Support Center", href: "/support" },
    { name: "Feedback", href: "/feedback" },
    { name: "Accessibility", href: "/accessibility" },
  ],
}

const socialLinks = [
  { name: "Facebook", icon: Facebook, href: "#", color: "hover:text-blue-600" },
  { name: "Twitter", icon: Twitter, href: "#", color: "hover:text-blue-400" },
  { name: "Instagram", icon: Instagram, href: "#", color: "hover:text-pink-600" },
  { name: "YouTube", icon: Youtube, href: "#", color: "hover:text-red-600" },
]

export default function FooterSection() {
  return (
    <footer className="bg-gray-900 text-white py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Company Info */}
          <div className="lg:col-span-1">
            {/* Logo */}
             {/* Logo */}
            <div className="flex items-center mb-6">
              <div className="relative w-10 h-10 mr-3">
                <Image src="/assets/logo.svg" alt="Car Doctor Logo" fill className="object-contain" />
              </div>
              <span className="text-xl font-bold">Car Doctor</span>
            </div>

            {/* Company Description */}
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Edwin Diaz is a software and web technologies engineer, a life coach trainer who is also a serial
              entrepreneur.
            </p>

            {/* Social Media Icons */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const IconComponent = social.icon
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    className={`w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 transition-all duration-200 ${social.color} hover:bg-gray-700`}
                    aria-label={social.name}
                  >
                    <IconComponent className="w-5 h-5" />
                  </a>
                )
              })}
            </div>
          </div>

          {/* About Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">About</h3>
            <ul className="space-y-3">
              {footerLinks.about.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Support</h3>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Border */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">© 2024 Car Doctor. All rights reserved.</p>
            <div className="flex space-x-6">
              <a href="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors duration-200">
                Privacy Policy
              </a>
              <a href="/terms" className="text-gray-400 hover:text-white text-sm transition-colors duration-200">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
