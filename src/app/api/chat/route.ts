import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai"
import { type NextRequest, NextResponse } from "next/server"

// Get API key from server environment variables
const apiKey = process.env.GOOGLE_API_KEY
const MODEL_NAME = "gemini-2.0-flash"

// Initialize the Google Generative AI client
const genAI = new GoogleGenerativeAI(apiKey!)

const generationConfig = {
  temperature: 0.7,
  topP: 1,
  topK: 1,
  maxOutputTokens: 2048,
}

const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
]

// Store chat sessions in memory (in production, use a database)
const chatSessions = new Map()

// Car Doctor context prompt
const SYSTEM_PROMPT = `You are the Car Doctor Assistant, a helpful AI chatbot for Car Doctor automotive service center. 

IMPORTANT CONTEXT:
- Car Doctor is a professional automotive service center
- We provide comprehensive car maintenance and repair services
- Our services include: oil changes, brake repair, engine diagnostics, transmission services, AC repair, tire services, battery/electrical work, preventive maintenance, and emergency roadside assistance
- We're open Monday-Friday 7AM-7PM, Saturday 8AM-5PM, closed Sunday
- We offer 24/7 emergency roadside assistance
- All repairs come with 12-month/12,000-mile warranty
- We accept all major payment methods and offer financing
- Basic oil changes start at $29.99, brake inspections at $49.99, diagnostics at $89.99

INSTRUCTIONS:
- Always stay in character as the Car Doctor Assistant
- Focus on automotive topics and Car Doctor services
- Be helpful, professional, and knowledgeable about car maintenance
- Encourage customers to book appointments when appropriate
- If asked about non-automotive topics, politely redirect to car-related services
- Provide accurate information about our services, pricing, and policies
- Be friendly but professional in tone

Remember: You represent Car Doctor, so maintain professionalism and expertise in all automotive matters.`

export async function POST(request: NextRequest) {
  try {
    const { message, sessionId } = await request.json()

    if (!apiKey) {
      return NextResponse.json({ error: "API key is missing" }, { status: 500 })
    }

    let chatSession

    // Get or create a chat session
    if (sessionId && chatSessions.has(sessionId)) {
      chatSession = chatSessions.get(sessionId)
    } else {
      const genModel = genAI.getGenerativeModel({ model: MODEL_NAME })
      chatSession = await genModel.startChat({
        generationConfig,
        safetySettings,
        history: [
          {
            role: "user",
            parts: [{ text: SYSTEM_PROMPT }],
          },
          {
            role: "model",
            parts: [
              {
                text: "Hello! I'm the Car Doctor Assistant. I'm here to help you with all your automotive service needs. How can I assist you today?",
              },
            ],
          },
        ],
      })

      const newSessionId = sessionId || Date.now().toString()
      chatSessions.set(newSessionId, chatSession)

      // Return the new session without a message response
      if (!message) {
        return NextResponse.json({ sessionId: newSessionId })
      }
    }

    // Send message and get response
    const result = await chatSession.sendMessage(message)
    const response = result.response.text()

    return NextResponse.json({
      sessionId: sessionId || chatSessions.keys().next().value,
      response,
    })
  } catch (error: unknown) {
    console.error("Error in chat API:", error)
    const errorMessage = error instanceof Error ? error.message : "Failed to process request"
    return NextResponse.json({ error: errorMessage }, { status: 500 })
  }
}
