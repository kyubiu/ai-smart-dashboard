import { NextRequest, NextResponse } from "next/server";
import { generateInsights } from "@/lib/openai";

export async function POST(request: NextRequest) {
  try {
    const { data } = await request.json();

    if (!data || !Array.isArray(data) || data.length === 0) {
      return NextResponse.json(
        { error: "Invalid data provided" },
        { status: 400 }
      );
    }

    const insights = await generateInsights(data);

    return NextResponse.json({ insights });
  } catch (error: any) {
    console.error("Error generating insights:", error);
    return NextResponse.json(
      { error: error.message || "Failed to generate insights" },
      { status: 500 }
    );
  }
}
