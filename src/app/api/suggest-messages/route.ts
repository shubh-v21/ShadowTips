import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const userRequestData: Record<string, { count: number; timestamp: number }> =
  {};

export async function POST(request: Request) {
  console.log(request);
  
  const ip = request.headers.get("x-forwarded-for") || "unknown";
  const currentTime = Date.now();
  const LOCK_DURATION = 60 * 60 * 1000; // 1 hour in milliseconds
  const MAX_REQUESTS = 1000;

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

    const prompt =
      "Create a list of three open-ended and engaging questions formatted as a single string. Each question should be separated by '||'. These questions are for an anonymous social messaging platform, like Qooh.me, and should be suitable for a diverse audience. Avoid personal or sensitive topics, focusing instead on universal themes that encourage friendly interaction. For example, your output should be structured like this: 'What’s a hobby you’ve recently started?||If you could have dinner with any historical figure, who would it be?||What’s a simple thing that makes you happy?'. Ensure the questions are intriguing, foster curiosity, and contribute to a positive and welcoming conversational environment.";

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const message = response.text();

    userData.count++;
    userData.timestamp = currentTime;

    return NextResponse.json({ message , disabled: false });
  } catch (error) {
    console.error("Gemini API Error:", error);
    return NextResponse.json(
      { error: "Failed to generate message" },
      { status: 500 }
    );
  }
}
