import { NextRequest, NextResponse } from "next/server";
import { generateReport } from "@/lib/openai";

export async function POST(request: NextRequest) {
  try {
    const { data, insights } = await request.json();

    if (!data || !Array.isArray(data) || data.length === 0) {
      return NextResponse.json(
        { error: "Invalid data provided" },
        { status: 400 }
      );
    }

    if (!insights) {
      return NextResponse.json(
        { error: "Insights are required" },
        { status: 400 }
      );
    }

    const report = await generateReport(data, insights);

    return NextResponse.json({ report });
  } catch (error: any) {
    console.error("Error generating report:", error);
    return NextResponse.json(
      { error: error.message || "Failed to generate report" },
      { status: 500 }
    );
  }
}
