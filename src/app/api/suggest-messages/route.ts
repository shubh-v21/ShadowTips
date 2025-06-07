import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const userRequestData: Record<string, { count: number; timestamp: number }> =
  {};

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for") || "unknown";
  const currentTime = Date.now();
  const LOCK_DURATION = 60 * 60 * 1000; // 1 hour in milliseconds
  const MAX_REQUESTS = 10;
  
  // Get parameters from request
  const body = await request.json();
  const { tone = "neutral", topic = "digital", niche = "digital-identity", recipient = "user" } = body;

  if (!userRequestData[ip]) {
    userRequestData[ip] = { count: 0, timestamp: 0 };
  }

  let userData = userRequestData[ip];
  let count = userData.count

  // Check if user exceeded max requests and 1 hour has not passed
  if (
    userData.count >= MAX_REQUESTS &&
    currentTime - userData.timestamp < LOCK_DURATION
  ) {
    return NextResponse.json(
      { message: "Too many requests. Try again after 1 hour.", disabled: true , count},
      { status: 429 }
    );
  }

  // Reset count after 1 hour
  if (currentTime - userData.timestamp >= LOCK_DURATION) {
    userData.count = 0;
  }

  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash-lite-preview-02-05",
    });

    // Tone descriptions
    const toneDescriptions = {
      neutral: "straightforward, balanced",
      mysterious: "enigmatic, intriguing, leaving things unsaid",
      cryptic: "coded, hidden meanings, symbolic",
      friendly: "warm, approachable, inviting conversation",
      philosophical: "deep, thought-provoking, existential"
    };

    // Topic descriptions
    const topicDescriptions = {
      digital: "digital reality, online experiences, virtual connections",
      future: "future technologies, predictions, possible worlds",
      society: "social impacts of technology, digital communities, online culture",
      personal: "individual experiences in the digital age, digital identity",
      abstract: "abstract concepts, theoretical ideas, metaphysical questions"
    };

    // Niche descriptions
    const nicheDescriptions = {
      cybersecurity: "digital security, hacking, data protection, privacy",
      ai: "artificial intelligence, machine consciousness, human-AI relationships",
      "digital-identity": "online personas, digital footprints, virtual presence",
      "virtual-reality": "immersive experiences, simulated worlds, digital escape",
      "tech-ethics": "moral implications of technology, ethical dilemmas in the digital age"
    };

    // Build customized prompt based on parameters
    const prompt = `Create a list of three thought-provoking questions formatted as a single string with each question separated by '||'. 

These questions should be for an anonymous messaging platform called SHADOWTIPS with a cyberpunk aesthetic. 

Craft the questions with these specific parameters:
- Tone: ${toneDescriptions[tone as keyof typeof toneDescriptions]}
- Topic domain: ${topicDescriptions[topic as keyof typeof topicDescriptions]}
- Tech niche: ${nicheDescriptions[niche as keyof typeof nicheDescriptions]}
- They should be directed to someone with username "${recipient}"

The questions should reflect a futuristic digital world where technology, identity, and reality intersect. Use cyberpunk-inspired language with references to networks, digital shadows, encryption, virtual spaces, or technological concepts.

Examples of the style I'm looking for:
- "Have you ever wondered if your digital shadow knows more about you than you know about yourself?"
- "In a world where memories can be encrypted, which of yours would you lock away forever?"
- "If you could upload your consciousness to the net, would you still consider yourself human?"

Format your response strictly as three questions separated by the || delimiter without any additional text.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const message = response.text();

    userData.count++;
    userData.timestamp = currentTime;

    return NextResponse.json({ message, disabled: false });
  } catch (error) {
    console.error("Gemini API Error:", error);
    return NextResponse.json(
      { error: "Failed to generate message" },
      { status: 500 }
    );
  }
}
