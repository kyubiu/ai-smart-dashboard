import OpenAI from "openai";

if (!process.env.OPENAI_API_KEY) {
  console.warn(
    "OPENAI_API_KEY is not set in environment variables. AI features will not work."
  );
}

export const openai = process.env.OPENAI_API_KEY
  ? new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    })
  : null;

export async function generateInsights(data: any[], context?: string) {
  if (!openai) {
    throw new Error(
      "OpenAI API key is not configured. Please set OPENAI_API_KEY in your environment variables."
    );
  }

  try {
    const dataSummary = JSON.stringify(data.slice(0, 100)); // Limit to first 100 rows for context
    const prompt = `You are an expert data analyst. Analyze the following business data and provide:
1. Key insights (3-5 bullet points)
2. Trends and patterns
3. Recommendations

Data sample:
${dataSummary}

${context ? `Additional context: ${context}` : ""}

Provide your analysis in a structured format with clear insights.`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4-turbo-preview",
      messages: [
        {
          role: "system",
          content:
            "You are a professional business analyst. Provide clear, actionable insights from data.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 1000,
    });

    return completion.choices[0]?.message?.content || "No insights generated";
  } catch (error) {
    console.error("Error generating insights:", error);
    throw error;
  }
}

export async function chatWithData(question: string, data: any[]) {
  if (!openai) {
    throw new Error(
      "OpenAI API key is not configured. Please set OPENAI_API_KEY in your environment variables."
    );
  }

  try {
    const dataSummary = JSON.stringify(data.slice(0, 200)); // Limit to first 200 rows

    const prompt = `You are an AI assistant helping analyze business data. Answer the following question based on the provided data.

Question: ${question}

Data:
${dataSummary}

Provide a clear, concise answer. If the question cannot be answered with the available data, say so.`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4-turbo-preview",
      messages: [
        {
          role: "system",
          content:
            "You are a helpful data analyst assistant. Answer questions about the data clearly and accurately.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    return (
      completion.choices[0]?.message?.content || "Unable to generate response"
    );
  } catch (error) {
    console.error("Error in chat:", error);
    throw error;
  }
}

export async function generateReport(data: any[], insights: string) {
  if (!openai) {
    throw new Error(
      "OpenAI API key is not configured. Please set OPENAI_API_KEY in your environment variables."
    );
  }

  try {
    const prompt = `Create a professional business report in Markdown format based on the following data and insights.

Data summary: ${JSON.stringify(data.slice(0, 50))}
Insights: ${insights}

Format the report with:
1. Executive Summary
2. Key Findings
3. Data Analysis
4. Recommendations
5. Conclusion

Use proper Markdown formatting with headers, lists, and emphasis.`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4-turbo-preview",
      messages: [
        {
          role: "system",
          content:
            "You are a professional report writer. Create well-structured, professional business reports.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 2000,
    });

    return (
      completion.choices[0]?.message?.content || "Unable to generate report"
    );
  } catch (error) {
    console.error("Error generating report:", error);
    throw error;
  }
}
