import { NextRequest, NextResponse } from "next/server";
import { chatWithData } from "@/lib/openai";

export async function POST(request: NextRequest) {
  try {
    const { question, data } = await request.json();

    if (!question || !data) {
      return NextResponse.json(
        { error: "Question and data are required" },
        { status: 400 }
      );
    }

    if (!Array.isArray(data) || data.length === 0) {
      return NextResponse.json(
        { error: "Invalid data provided" },
        { status: 400 }
      );
    }

    const response = await chatWithData(question, data);

    return NextResponse.json({ response });
  } catch (error: any) {
    console.error("Error in chat:", error);
    return NextResponse.json(
      { error: error.message || "Failed to process chat message" },
      { status: 500 }
    );
  }
}
