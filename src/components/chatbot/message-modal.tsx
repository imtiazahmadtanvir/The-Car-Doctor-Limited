"use client"

import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { ScrollArea } from "@/components/ui/scroll-area"

interface Message {
  text: string
  role: "user" | "model"
  timestamp: Date
}

interface MessageModalProps {
  isOpen: boolean
  onClose: () => void
  message: Message | null
  screenSize: "small" | "medium" | "large"
}

export function MessageModal({ isOpen, onClose, message, screenSize }: MessageModalProps) {
  if (!isOpen || !message) return null

  return (
    <div className="fixed inset-0 z-[100000] flex items-center justify-center" onClick={onClose}>
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" aria-hidden="true" />
      <div
        className={cn(
          "bg-white relative rounded-lg shadow-xl flex flex-col",
          screenSize === "small"
            ? "w-[95vw] h-[80vh] max-w-none m-4"
            : "w-[95vw] sm:w-[90vw] md:w-[80vw] lg:w-[70vw] xl:w-[60vw] max-w-3xl max-h-[90vh]",
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className={cn(
            "absolute rounded-full transition-colors z-[100001]",
            screenSize === "small"
              ? "right-2 top-2 p-2 bg-orange-100 hover:bg-orange-200"
              : "right-2 top-2 sm:right-4 sm:top-4 md:right-6 md:top-6 p-1.5 sm:p-2 md:p-2.5 bg-orange-100 hover:bg-orange-200",
          )}
          aria-label="Close"
        >
          <X
            className={cn(
              screenSize === "small" ? "h-5 w-5" : "h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5",
              "text-orange-800",
            )}
          />
        </button>

        {/* Header */}
        <div
          className={cn(
            "pb-0 border-b border-gray-200",
            screenSize === "small" ? "p-4" : "p-3 sm:p-6 md:p-8 sm:pb-2 md:pb-4",
          )}
        >
          <h2
            className={cn(
              "flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 md:gap-3 font-semibold",
              screenSize === "small" ? "text-lg" : "text-base sm:text-lg md:text-xl lg:text-2xl",
              message.role === "user" ? "text-orange-700" : "text-orange-800",
            )}
          >
            {message.role === "user" ? "Your Message" : "Car Doctor Assistant"}
            <span
              className={cn(
                "font-normal text-gray-500",
                screenSize === "small" ? "text-sm" : "text-xs sm:text-sm md:text-base",
              )}
            >
              {format(message.timestamp, "MMM d, yyyy h:mm a")}
            </span>
          </h2>
        </div>

        {/* Content */}
        <ScrollArea className={cn("flex-1", screenSize === "small" ? "p-4" : "p-3 sm:p-6 md:p-8 pt-2 sm:pt-2 md:pt-2")}>
          <div
            className={cn(
              "text-black whitespace-pre-wrap leading-relaxed",
              screenSize === "small" ? "text-base" : "text-sm sm:text-base md:text-lg lg:text-xl",
            )}
          >
            {message.text}
          </div>
        </ScrollArea>

        {/* Bottom close button */}
        <div
          className={cn(
            "flex justify-center border-t border-gray-200",
            screenSize === "small" ? "p-4" : "p-3 sm:p-6 md:p-8 pt-2 sm:pt-4 md:pt-4",
          )}
        >
          <Button
            variant="outline"
            onClick={onClose}
            className={cn(
              "bg-orange-100 hover:bg-orange-200 text-orange-800 border-orange-300 h-auto",
              screenSize === "small"
                ? "text-base py-3 px-6"
                : "text-sm sm:text-base md:text-lg py-1.5 sm:py-2 md:py-2.5 px-4 sm:px-6 md:px-8",
            )}
          >
            Close
          </Button>
        </div>
      </div>
    </div>
  )
}
