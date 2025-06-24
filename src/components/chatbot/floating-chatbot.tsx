"use client"

import type React from "react"
import { useState, useCallback, memo, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { MessageCircle, X, Car } from "lucide-react"
import { cn } from "@/lib/utils"
import dynamic from "next/dynamic"

// Dynamically import the Chatbot component with no SSR to avoid hydration issues
const Chatbot = dynamic(() => import("./chatbot"), { ssr: false })

// Custom Modal Component
interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
  screenSize: "small" | "medium" | "large"
}

function Modal({ isOpen, onClose, children, screenSize }: ModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[100000] flex items-center justify-center" onClick={onClose}>
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" aria-hidden="true" />
      <div
        className={cn(
          "bg-white p-0 relative rounded-lg shadow-xl overflow-hidden",
          screenSize === "small"
            ? "w-[95vw] h-[90vh] max-w-none"
            : screenSize === "medium"
              ? "w-[85vw] h-[85vh] max-w-[800px] rounded-xl"
              : "w-[75vw] h-[85vh] max-w-[1200px] rounded-xl",
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className={cn(
            "absolute z-[100001] rounded-full backdrop-blur-sm",
            screenSize === "small"
              ? "right-2 top-2 p-1.5 bg-white/70 hover:bg-white"
              : screenSize === "medium"
                ? "right-3 top-3 p-2 bg-white/75 hover:bg-white shadow-md"
                : "right-4 top-4 p-2.5 bg-white/80 hover:bg-white shadow-lg",
          )}
          aria-label="Close"
        >
          <X
            className={cn(
              screenSize === "small" ? "h-4 w-4" : screenSize === "medium" ? "h-4.5 w-4.5" : "h-5 w-5",
              "text-orange-800",
            )}
          />
        </button>

        {children}
      </div>
    </div>
  )
}

function FloatingChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [screenSize, setScreenSize] = useState<"small" | "medium" | "large">("medium")

  // Check screen size
  useEffect(() => {
    const checkScreenSize = () => {
      if (window.innerWidth < 640) {
        setScreenSize("small")
      } else if (window.innerWidth < 1024) {
        setScreenSize("medium")
      } else {
        setScreenSize("large")
      }
    }

    checkScreenSize()
    window.addEventListener("resize", checkScreenSize)
    return () => window.removeEventListener("resize", checkScreenSize)
  }, [])

  const handleOpen = useCallback(() => setIsOpen(true), [])
  const handleClose = useCallback(() => setIsOpen(false), [])

  return (
    <>
      {/* Floating chat button */}
      <Button
        onClick={handleOpen}
        className={cn(
          "fixed rounded-full shadow-lg z-50",
          "flex items-center justify-center",
          "bg-orange-600 text-white hover:bg-orange-700 transition-all duration-300",
          screenSize === "small"
            ? "bottom-4 right-4 w-12 h-12 gap-1"
            : screenSize === "medium"
              ? "bottom-6 right-6 w-14 h-14 gap-1.5"
              : "bottom-8 right-8 w-16 h-16 gap-2",
          isOpen ? "scale-0 opacity-0" : "scale-100 opacity-100",
        )}
        aria-label="Open Car Doctor Assistant"
      >
        {screenSize !== "small" && <Car className={cn(screenSize === "medium" ? "h-4 w-4" : "h-5 w-5")} />}
        <MessageCircle
          className={cn(screenSize === "small" ? "h-5 w-5" : screenSize === "medium" ? "h-5.5 w-5.5" : "h-6 w-6")}
        />
      </Button>

      {/* Custom Modal */}
      <Modal isOpen={isOpen} onClose={handleClose} screenSize={screenSize}>
        {isOpen && <Chatbot />}
      </Modal>
    </>
  )
}

export default memo(FloatingChatbot)
