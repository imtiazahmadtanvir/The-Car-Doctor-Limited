"use client"

import type React from "react"
import { useEffect, useState, useRef, useCallback, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Send, AlertCircle, Loader2, Wrench, Car, Minimize2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { MessageModal } from "./message-modal"

interface Message {
  text: string
  role: "user" | "model"
  timestamp: Date
}

interface PredefinedQuestion {
  question: string
  answer: string
}

interface ChatData {
  messages: Message[]
  sessionId: string
  timestamp: number
}

const STORAGE_KEY = "car-doctor-chat-data"
const STORAGE_DURATION = 10 * 60 * 1000 // 10 minutes in milliseconds

// Move this outside the component, before the export
const PREDEFINED_QUESTIONS: PredefinedQuestion[] = [
  {
    question: "What is Car Doctor?",
    answer:
      "Car Doctor is your trusted automotive service center providing comprehensive car maintenance and repair services. We specialize in professional diagnostics, preventive maintenance, and quality repairs to keep your vehicle running smoothly and safely. Our certified technicians use state-of-the-art equipment and genuine parts to ensure the highest service standards.",
  },
  {
    question: "What services do you offer?",
    answer:
      "We offer a complete range of automotive services including: Oil changes and fluid services, Brake repair and replacement, Engine diagnostics and tune-ups, Transmission services, Air conditioning repair, Tire installation and balancing, Battery and electrical system services, Preventive maintenance packages, Emergency roadside assistance, and comprehensive vehicle inspections.",
  },
  {
    question: "How do I book an appointment?",
    answer:
      "Booking an appointment is easy! You can schedule online through our website, call us directly, or use our mobile app. We offer flexible scheduling with same-day appointments available for urgent repairs. You can also view available time slots, select your preferred technician, and receive confirmation via email or SMS.",
  },
  {
    question: "Do you provide warranties on your work?",
    answer:
      "Yes! We stand behind our work with comprehensive warranties. All repairs come with a 12-month/12,000-mile warranty on parts and labor. We use only high-quality, genuine or OEM-equivalent parts. Our warranty covers both the parts installed and the labor performed, giving you peace of mind and confidence in our services.",
  },
  {
    question: "What are your operating hours?",
    answer:
      "We're open Monday through Friday from 7:00 AM to 7:00 PM, and Saturdays from 8:00 AM to 5:00 PM. We're closed on Sundays but offer 24/7 emergency roadside assistance for our customers. You can also schedule appointments online anytime, and we'll confirm your booking during business hours.",
  },
  {
    question: "Do you offer emergency services?",
    answer:
      "Yes, we provide 24/7 emergency roadside assistance including jump-starts, tire changes, lockout assistance, and emergency towing. Our mobile service unit can handle minor repairs on-site. For major emergencies, we'll tow your vehicle to our facility and prioritize urgent repairs to get you back on the road quickly.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept all major payment methods including cash, credit cards (Visa, MasterCard, American Express), debit cards, and digital payments (Apple Pay, Google Pay). We also offer financing options for major repairs through our partnership with leading automotive finance companies. Ask about our maintenance packages and loyalty program discounts!",
  },
  {
    question: "How much do your services cost?",
    answer:
      "Our pricing is competitive and transparent. Basic services start from $29.99 for oil changes, brake inspections from $49.99, and comprehensive diagnostics from $89.99. We provide detailed estimates before any work begins, with no hidden fees. Check our website for current promotions and seasonal discounts. We also offer maintenance packages that can save you up to 20% on regular services.",
  },
]

export default function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([])
  const [userInput, setUserInput] = useState("")
  const [sessionId, setSessionId] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(true)
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [screenSize, setScreenSize] = useState<"small" | "medium" | "large">("medium")
  const [isMinimized, setIsMinimized] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Use useMemo for predefinedQuestions
  const predefinedQuestions = useMemo(() => PREDEFINED_QUESTIONS, [])

  // Load data from localStorage
  const loadChatData = useCallback(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const data: ChatData = JSON.parse(stored)
        const now = Date.now()

        // Check if data is still valid (within 10 minutes)
        if (now - data.timestamp < STORAGE_DURATION) {
          // Convert timestamp strings back to Date objects
          const messagesWithDates = data.messages.map((msg) => ({
            ...msg,
            timestamp: new Date(msg.timestamp),
          }))

          setMessages(messagesWithDates)
          setSessionId(data.sessionId)
          return true
        } else {
          // Data expired, clear it
          localStorage.removeItem(STORAGE_KEY)
        }
      }
    } catch (error) {
      console.error("Error loading chat data:", error)
      localStorage.removeItem(STORAGE_KEY)
    }
    return false
  }, [])

  // Save data to localStorage
  const saveChatData = useCallback((messages: Message[], sessionId: string) => {
    try {
      const data: ChatData = {
        messages,
        sessionId,
        timestamp: Date.now(),
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
    } catch (error) {
      console.error("Error saving chat data:", error)
    }
  }, [])

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

  // Initialize chat session
  useEffect(() => {
    let isMounted = true

    const initChat = async () => {
      if (!isMounted) return

      setIsLoading(true)

      // Try to load existing data first
      const hasExistingData = loadChatData()

      if (!hasExistingData) {
        // Create new session if no existing data
        try {
          setTimeout(() => {
            if (isMounted) {
              const newSessionId = "car-doctor-session-" + Date.now()
              setSessionId(newSessionId)
              setIsLoading(false)
            }
          }, 1000)
        } catch (err: unknown) {
          if (isMounted) {
            const errorMessage = err instanceof Error ? err.message : "Unknown error occurred"
            setError("Failed to initialize chat: " + errorMessage)
            setIsLoading(false)
          }
        }
      } else {
        setIsLoading(false)
      }
    }

    initChat()

    setTimeout(() => {
      inputRef.current?.focus()
    }, 100)

    return () => {
      isMounted = false
    }
  }, [loadChatData])

  // Save messages whenever they change
  useEffect(() => {
    if (messages.length > 0 && sessionId) {
      saveChatData(messages, sessionId)
    }
  }, [messages, sessionId, saveChatData])

  // Scroll to bottom when messages change
  useEffect(() => {
    if (!isMinimized) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages, isMinimized])

  // Function to handle predefined questions directly
  const handlePredefinedQuestion = useCallback(
    (question: string) => {
      const predefinedQuestion = predefinedQuestions.find((item) => item.question.trim() === question.trim())

      if (!predefinedQuestion) return false

      const userMessage: Message = {
        text: question,
        role: "user",
        timestamp: new Date(),
      }

      setMessages((prevMessages) => [...prevMessages, userMessage])
      setUserInput("")
      setIsLoading(true)

      setTimeout(() => {
        const botMessage: Message = {
          text: predefinedQuestion.answer,
          role: "model",
          timestamp: new Date(),
        }

        setMessages((prevMessages) => [...prevMessages, botMessage])
        setIsLoading(false)
        setShowSuggestions(true)

        setTimeout(() => {
          messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
        }, 100)
      }, 800)

      return true
    },
    [predefinedQuestions],
  )

  const handleSendMessage = useCallback(
    async (input?: string) => {
      const messageToSend = input || userInput
      if (!messageToSend.trim() || !sessionId) return

      setShowSuggestions(false)

      // Check if it's a predefined question first
      const isPredefined = handlePredefinedQuestion(messageToSend)
      if (isPredefined) return

      const userMessage: Message = {
        text: messageToSend,
        role: "user",
        timestamp: new Date(),
      }

      setMessages((prevMessages) => [...prevMessages, userMessage])
      setUserInput("")
      setIsLoading(true)

      // For non-predefined questions, provide automotive-related responses
      setTimeout(() => {
        let response = ""
        const lowerMessage = messageToSend.toLowerCase()

        if (lowerMessage.includes("oil") || lowerMessage.includes("change")) {
          response =
            "For oil changes, we recommend every 3,000-5,000 miles depending on your vehicle and oil type. We use high-quality synthetic and conventional oils. Would you like to schedule an oil change appointment?"
        } else if (lowerMessage.includes("brake") || lowerMessage.includes("stop")) {
          response =
            "Brake issues should never be ignored! Common signs include squeaking, grinding, or a soft brake pedal. We offer comprehensive brake inspections and can replace pads, rotors, and brake fluid. Would you like to book a brake inspection?"
        } else if (lowerMessage.includes("engine") || lowerMessage.includes("check engine")) {
          response =
            "A check engine light can indicate various issues. We use advanced diagnostic equipment to identify the exact problem. Our engine services include tune-ups, diagnostics, and repairs. Schedule a diagnostic appointment to get to the root of the issue."
        } else if (lowerMessage.includes("tire") || lowerMessage.includes("wheel")) {
          response =
            "We provide tire installation, balancing, rotation, and alignment services. Proper tire maintenance improves safety and fuel efficiency. We carry major tire brands and can help you choose the right tires for your vehicle and driving needs."
        } else if (
          lowerMessage.includes("price") ||
          lowerMessage.includes("cost") ||
          lowerMessage.includes("how much")
        ) {
          response =
            "Our pricing varies by service. Basic oil changes start at $29.99, brake inspections at $49.99, and diagnostics at $89.99. We provide detailed estimates before any work begins. Contact us for a specific quote on your vehicle's needs."
        } else if (
          lowerMessage.includes("appointment") ||
          lowerMessage.includes("schedule") ||
          lowerMessage.includes("book")
        ) {
          response =
            "You can easily book an appointment online, call us, or use our mobile app. We offer same-day appointments for urgent repairs and flexible scheduling to fit your needs. What service would you like to schedule?"
        } else {
          response = `Thank you for your question about "${messageToSend}". While I don't have specific information about that topic, our certified technicians at Car Doctor can help with all automotive needs. Please call us at (555) 123-4567 or visit our service center for personalized assistance.`
        }

        const botMessage: Message = {
          text: response,
          role: "model",
          timestamp: new Date(),
        }

        setMessages((prevMessages) => [...prevMessages, botMessage])
        setIsLoading(false)
        setShowSuggestions(true)

        setTimeout(() => {
          inputRef.current?.focus()
          setTimeout(() => {
            messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
          }, 100)
        }, 100)
      }, 1000)
    },
    [sessionId, userInput, handlePredefinedQuestion],
  )

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault()
        handleSendMessage()
      }
    },
    [handleSendMessage],
  )

  const handlePredefinedQuestionClick = useCallback(
    (question: string) => {
      handlePredefinedQuestion(question)
    },
    [handlePredefinedQuestion],
  )

  const handleMessageClick = useCallback((message: Message) => {
    setSelectedMessage(message)
    setIsModalOpen(true)
  }, [])

  const closeModal = useCallback(() => {
    setIsModalOpen(false)
  }, [])

  const getUnaskedQuestions = useCallback(() => {
    const askedQuestions = messages.filter((msg) => msg.role === "user").map((msg) => msg.text)
    return predefinedQuestions.filter((item) => !askedQuestions.includes(item.question))
  }, [messages, predefinedQuestions])

  const toggleMinimize = useCallback(() => {
    setIsMinimized(!isMinimized)
  }, [isMinimized])

  return (
    <div
      className={cn(
        "flex flex-col w-full overflow-hidden transition-all duration-300",
        screenSize === "small" ? (isMinimized ? "h-12" : "h-full") : "h-full",
      )}
    >
      {/* Fixed Header */}
      <div className="bg-orange-600 text-white border-b border-orange-700 flex-shrink-0 ">
        <div className="flex items-center justify-center px-4 py-2 sm:px-4 sm:py-3">
          <h2
            className={cn(
              "font-bold flex items-center gap-1 sm:gap-2 ",
              screenSize === "small" ? "text-sm" : "text-lg sm:text-xl md:text-2xl",
            )}
          >
            <Car className={cn(screenSize === "small" ? "h-4 w-4" : "h-5 w-5 sm:h-6 sm:w-6")} />
            <span className={screenSize === "small" ? "hidden xs:inline" : ""}>Car Doctor Assistant</span>
            {screenSize === "small" && <span className="xs:hidden">Car Doctor Assistant</span>}
          </h2>

        </div>
      </div>

      {/* Collapsible Content */}
      <div
        className={cn(
          "flex-grow overflow-hidden transition-all duration-300",
          screenSize === "small" && isMinimized ? "h-0 opacity-0" : "h-full opacity-100",
        )}
      >
        {error && (
          <Alert variant="destructive" className="m-2">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="text-sm">{error}</AlertDescription>
          </Alert>
        )}

        <div className="h-full overflow-y-auto bg-orange-50 pb-2">
          <div className={cn("p-2 sm:p-4", screenSize === "small" ? "space-y-2" : "space-y-4")}>
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center text-center text-muted-foreground p-2 sm:p-4">
                <h3
                  className={cn(
                    "font-medium mb-2 text-orange-800",
                    screenSize === "small" ? "text-sm" : "text-base sm:text-lg",
                  )}
                >
                  Welcome to Car Doctor Assistant
                </h3>
                <p className={cn("text-orange-700 mb-3", screenSize === "small" ? "text-xs" : "text-sm")}>
                  Get instant answers about our automotive services
                </p>
                <div className={cn("w-full max-w-2xl", screenSize === "small" ? "space-y-1" : "space-y-2")}>
                  {predefinedQuestions.slice(0, screenSize === "small" ? 4 : 8).map((item, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      onClick={() => handlePredefinedQuestionClick(item.question)}
                      className={cn(
                        "bg-orange-100 hover:bg-orange-200 text-orange-800 border-orange-300 w-full text-left justify-start h-auto",
                        screenSize === "small" ? "text-xs py-1.5 px-2 min-h-[32px]" : "text-sm py-2 px-3 min-h-[40px]",
                      )}
                    >
                      {item.question}
                    </Button>
                  ))}
                </div>
              </div>
            ) : (
              <div className={cn("w-full max-w-4xl mx-auto", screenSize === "small" ? "space-y-2" : "space-y-3")}>
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={cn(
                      "flex flex-col rounded-lg cursor-pointer transition-all hover:opacity-90 hover:shadow-md",
                      screenSize === "small" ? "p-2" : "p-3 sm:p-4",
                      msg.role === "user"
                        ? "ml-auto bg-orange-600 text-white max-w-[90%] sm:max-w-[85%]"
                        : "mr-auto bg-orange-100 text-orange-900 max-w-[90%] sm:max-w-[85%]",
                    )}
                    onClick={() => handleMessageClick(msg)}
                  >
                    <div
                      className={cn("whitespace-pre-wrap", screenSize === "small" ? "text-xs" : "text-sm sm:text-base")}
                    >
                      {screenSize === "small" && msg.text.length > 100
                        ? `${msg.text.substring(0, 100)}...`
                        : msg.text.length > 150
                          ? `${msg.text.substring(0, 150)}...`
                          : msg.text}
                    </div>
                    <div className="flex items-center justify-between mt-1">
                      <span
                        className={cn(
                          screenSize === "small" ? "text-[9px]" : "text-[10px] sm:text-xs",
                          msg.role === "user" ? "text-orange-100" : "text-orange-700",
                        )}
                      >
                        {msg.role === "model" && <Wrench className="h-2 w-2 inline mr-1" />}
                        Tap to expand
                      </span>
                      <span
                        className={cn(
                          screenSize === "small" ? "text-[9px]" : "text-[10px] sm:text-xs",
                          msg.role === "user" ? "text-orange-100" : "text-orange-700",
                        )}
                      >
                        {format(msg.timestamp, "h:mm a")}
                      </span>
                    </div>
                  </div>
                ))}

                {isLoading && (
                  <div
                    className={cn(
                      "flex flex-col max-w-[90%] sm:max-w-[85%] rounded-lg mr-auto bg-orange-100 text-orange-900",
                      screenSize === "small" ? "p-2" : "p-3",
                    )}
                  >
                    <div className="flex items-center gap-2">
                      <Loader2 className={cn("animate-spin", screenSize === "small" ? "h-3 w-3" : "h-4 w-4")} />
                      <span className={screenSize === "small" ? "text-xs" : "text-sm"}>Analyzing...</span>
                    </div>
                  </div>
                )}

                {/* Show remaining questions after each bot response */}
                {showSuggestions && messages.length > 0 && messages[messages.length - 1].role === "model" && (
                  <div
                    className={cn(
                      "p-2 bg-orange-50 border border-orange-200 rounded-lg max-w-4xl mx-auto",
                      screenSize === "small" ? "my-2" : "my-3",
                    )}
                  >
                    <p
                      className={cn("font-medium text-orange-800 mb-2", screenSize === "small" ? "text-xs" : "text-sm")}
                    >
                      You might also ask:
                    </p>
                    <div
                      className={cn(
                        "grid gap-1",
                        screenSize === "small" ? "grid-cols-1" : "grid-cols-1 md:grid-cols-2",
                      )}
                    >
                      {getUnaskedQuestions()
                        .slice(0, screenSize === "small" ? 2 : 4)
                        .map((item, index) => (
                          <Button
                            key={index}
                            variant="outline"
                            size="sm"
                            onClick={() => handlePredefinedQuestionClick(item.question)}
                            className={cn(
                              "bg-white hover:bg-orange-100 text-orange-800 border-orange-200 w-full text-left justify-start h-auto",
                              screenSize === "small"
                                ? "text-xs py-1 px-2 min-h-[28px]"
                                : "text-sm py-1.5 px-2 min-h-[32px]",
                            )}
                          >
                            {screenSize === "small" && item.question.length > 30
                              ? `${item.question.substring(0, 30)}...`
                              : item.question}
                          </Button>
                        ))}
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Fixed Input Area */}
      {(!isMinimized || screenSize !== "small") && (
        <div
          className={cn(
            "border-t border-orange-200 bg-orange-50 flex-shrink-0",
            screenSize === "small" ? "p-2" : "p-3 sm:p-4",
          )}
        >
          <div className={cn("flex max-w-4xl mx-auto", screenSize === "small" ? "gap-1" : "gap-2")}>
            <Input
              ref={inputRef}
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={
                screenSize === "small"
                  ? "Ask about services..."
                  : "Ask about our services, pricing, or book an appointment..."
              }
              disabled={isLoading || !sessionId}
              className={cn(
                "flex-1 border-orange-300 focus-visible:ring-orange-500",
                screenSize === "small" ? "text-sm h-8" : "text-sm sm:text-base h-9 sm:h-10",
              )}
            />
            <Button
              onClick={() => handleSendMessage()}
              disabled={isLoading || !userInput.trim() || !sessionId}
              size="icon"
              className={cn(
                "bg-orange-600 hover:bg-orange-700",
                screenSize === "small" ? "h-8 w-8" : "h-9 w-9 sm:h-10 sm:w-10",
              )}
            >
              {isLoading ? (
                <Loader2 className={cn("animate-spin", screenSize === "small" ? "h-3 w-3" : "h-4 w-4")} />
              ) : (
                <Send className={cn(screenSize === "small" ? "h-3 w-3" : "h-4 w-4")} />
              )}
            </Button>
          </div>
        </div>
      )}

      {/* Custom Modal */}
      <MessageModal isOpen={isModalOpen} onClose={closeModal} message={selectedMessage} screenSize={screenSize} />
    </div>
  )
}
