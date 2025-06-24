"use client"

import type React from "react"
import { useEffect, useState, useRef, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Send, AlertCircle, Loader2, Wrench, Car } from "lucide-react"
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
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Define predefined questions and answers for Car Doctor
  const predefinedQuestions: PredefinedQuestion[] = [
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
      try {
        // For demo purposes, we'll simulate the session initialization
        setTimeout(() => {
          if (isMounted) {
            setSessionId("car-doctor-session-" + Date.now())
            setIsLoading(false)
          }
        }, 1000)
      } catch (err: any) {
        if (isMounted) {
          setError("Failed to initialize chat: " + err.message)
          setIsLoading(false)
        }
      }
    }

    initChat()

    setTimeout(() => {
      inputRef.current?.focus()
    }, 100)

    return () => {
      isMounted = false
    }
  }, [])

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

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

  return (
    <div className="flex flex-col h-full w-full overflow-hidden">
      {/* Fixed Header */}
      <div className="bg-orange-600 text-white py-2 px-3 sm:py-3 sm:px-6 md:py-4 md:px-8 border-b border-orange-700 flex-shrink-0">
        <div className="flex items-center justify-between">
          <h2 className="text-xl sm:text-2xl md:text-3xl mx-auto font-bold text-center flex items-center gap-1 sm:gap-2 md:gap-3">
            <Car className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7" />
            Car Doctor Assistant
          </h2>
        </div>
      </div>

      {/* Scrollable Content Area */}
      <div className="flex-grow overflow-hidden relative">
        {error && (
          <Alert variant="destructive" className="m-2 sm:m-4 md:m-7">
            <AlertCircle className="h-5 w-5 sm:h-6 sm:w-6" />
            <AlertDescription className="text-sm sm:text-base md:text-lg">{error}</AlertDescription>
          </Alert>
        )}

        <div className="h-full overflow-y-auto bg-orange-50 pb-4">
          <div className="p-3 sm:p-4 md:p-6 lg:p-8">
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center text-center text-muted-foreground p-3 sm:p-6 md:p-8 lg:p-10">
                <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-medium mb-1 sm:mb-2 md:mb-3 text-orange-800">
                  Welcome to Car Doctor Assistant
                </h3>
                <p className="text-sm sm:text-base text-orange-700 mb-4">
                  Get instant answers about our automotive services, pricing, and appointments
                </p>
                <div className="mt-3 sm:mt-4 md:mt-6 lg:mt-8 space-y-2 md:space-y-3 w-full max-w-2xl">
                  {predefinedQuestions.map((item, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      onClick={() => handlePredefinedQuestionClick(item.question)}
                      className="bg-orange-100 hover:bg-orange-200 text-orange-800 border-orange-300 w-full text-left justify-start text-xs sm:text-sm md:text-base lg:text-lg py-2 px-3 md:py-3 md:px-4 h-auto min-h-[40px] md:min-h-[50px]"
                    >
                      {item.question}
                    </Button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-3 sm:space-y-4 md:space-y-5 w-full max-w-4xl mx-auto">
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={cn(
                      "flex flex-col rounded-lg cursor-pointer transition-all hover:opacity-90 hover:shadow-md",
                      "p-3 sm:p-4 md:p-5",
                      msg.role === "user"
                        ? "ml-auto bg-orange-600 text-white"
                        : "mr-auto bg-orange-100 text-orange-900",
                      "max-w-[85%] sm:max-w-[80%] md:max-w-[75%] lg:max-w-[70%]",
                    )}
                    onClick={() => handleMessageClick(msg)}
                  >
                    <div className="whitespace-pre-wrap text-sm sm:text-base md:text-lg">
                      {msg.text.length > 150 ? `${msg.text.substring(0, 150)}...` : msg.text}
                    </div>
                    <div className="flex items-center justify-between mt-1 sm:mt-2 md:mt-3">
                      <span
                        className={cn(
                          "text-[10px] sm:text-xs md:text-sm",
                          msg.role === "user" ? "text-orange-100" : "text-orange-700",
                        )}
                      >
                        {msg.role === "model" && <Wrench className="h-2 w-2 sm:h-3 sm:w-3 md:h-4 md:w-4 inline mr-1" />}
                        Click to expand
                      </span>
                      <span
                        className={cn(
                          "text-[10px] sm:text-xs md:text-sm",
                          msg.role === "user" ? "text-orange-100" : "text-orange-700",
                        )}
                      >
                        {format(msg.timestamp, "h:mm a")}
                      </span>
                    </div>
                  </div>
                ))}

                {isLoading && (
                  <div className="flex flex-col max-w-[85%] sm:max-w-[80%] md:max-w-[75%] lg:max-w-[70%] rounded-lg p-3 sm:p-4 md:p-5 mr-auto bg-orange-100 text-orange-900">
                    <div className="flex items-center gap-1 sm:gap-2 md:gap-3">
                      <Loader2 className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 animate-spin" />
                      <span className="text-sm sm:text-base md:text-lg">Analyzing your request...</span>
                    </div>
                  </div>
                )}

                {/* Show remaining questions after each bot response */}
                {showSuggestions && messages.length > 0 && messages[messages.length - 1].role === "model" && (
                  <div className="my-3 sm:my-4 md:my-5 p-2 sm:p-3 md:p-4 bg-orange-50 border border-orange-200 rounded-lg max-w-4xl mx-auto">
                    <p className="text-xs sm:text-sm md:text-base lg:text-lg font-medium text-orange-800 mb-1 sm:mb-2 md:mb-3">
                      You might also want to ask:
                    </p>
                    <div className="space-y-1.5 sm:space-y-2 md:space-y-3 grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3">
                      {getUnaskedQuestions()
                        .slice(0, 4)
                        .map((item, index) => (
                          <Button
                            key={index}
                            variant="outline"
                            size="sm"
                            onClick={() => handlePredefinedQuestionClick(item.question)}
                            className="bg-white hover:bg-orange-100 text-orange-800 border-orange-200 w-full text-left justify-start text-xs sm:text-sm md:text-base py-1.5 px-2 md:py-2 md:px-3 h-auto min-h-[32px] md:min-h-[40px]"
                          >
                            {item.question}
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
      <div className="p-2 sm:p-3 md:p-4 lg:p-6 border-t border-orange-200 bg-orange-50 flex-shrink-0">
        <div className="flex gap-1 sm:gap-2 md:gap-3 max-w-4xl mx-auto">
          <Input
            ref={inputRef}
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about our services, pricing, or book an appointment..."
            disabled={isLoading || !sessionId}
            className="flex-1 border-orange-300 focus-visible:ring-orange-500 text-sm sm:text-base md:text-lg h-9 sm:h-10 md:h-12"
          />
          <Button
            onClick={() => handleSendMessage()}
            disabled={isLoading || !userInput.trim() || !sessionId}
            size="icon"
            className="bg-orange-600 hover:bg-orange-700 h-9 w-9 sm:h-10 sm:w-10 md:h-12 md:w-12"
          >
            {isLoading ? (
              <Loader2 className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 animate-spin" />
            ) : (
              <Send className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Custom Modal */}
      <MessageModal isOpen={isModalOpen} onClose={closeModal} message={selectedMessage} screenSize={screenSize} />
    </div>
  )
}
