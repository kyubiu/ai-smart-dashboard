from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional, Any
import os
from dotenv import load_dotenv
import openai

load_dotenv()

app = FastAPI(title="AI Smart Dashboard API", version="1.0.0")

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://localhost:3001",
        "http://127.0.0.1:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize OpenAI client
openai_client = None
if os.getenv("OPENAI_API_KEY"):
    openai_client = openai.OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
else:
    print("Warning: OPENAI_API_KEY is not set. AI features will not work.")


# Request/Response models
class InsightsRequest(BaseModel):
    data: List[dict]
    context: Optional[str] = None


class InsightsResponse(BaseModel):
    insights: str


class ChatRequest(BaseModel):
    question: str
    data: List[dict]


class ChatResponse(BaseModel):
    response: str


class ReportRequest(BaseModel):
    data: List[dict]
    insights: str


class ReportResponse(BaseModel):
    report: str


# Helper functions
async def generate_insights(data: List[dict], context: Optional[str] = None) -> str:
    """Generate AI insights from data"""
    if not openai_client:
        raise HTTPException(
            status_code=500,
            detail="OpenAI API key is not configured. Please set OPENAI_API_KEY in your environment variables.",
        )

    try:
        data_summary = str(data[:100])  # Limit to first 100 rows
        prompt = f"""You are an expert data analyst. Analyze the following business data and provide:
1. Key insights (3-5 bullet points)
2. Trends and patterns
3. Recommendations

Data sample:
{data_summary}

{context if context else ''}

Provide your analysis in a structured format with clear insights."""

        completion = openai_client.chat.completions.create(
            model="gpt-4-turbo-preview",
            messages=[
                {
                    "role": "system",
                    "content": "You are a professional business analyst. Provide clear, actionable insights from data.",
                },
                {"role": "user", "content": prompt},
            ],
            temperature=0.7,
            max_tokens=1000,
        )

        return completion.choices[0].message.content or "No insights generated"
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error generating insights: {str(e)}")


async def chat_with_data(question: str, data: List[dict]) -> str:
    """Chat with AI about the data"""
    if not openai_client:
        raise HTTPException(
            status_code=500,
            detail="OpenAI API key is not configured. Please set OPENAI_API_KEY in your environment variables.",
        )

    try:
        data_summary = str(data[:200])  # Limit to first 200 rows

        prompt = f"""You are an AI assistant helping analyze business data. Answer the following question based on the provided data.

Question: {question}

Data:
{data_summary}

Provide a clear, concise answer. If the question cannot be answered with the available data, say so."""

        completion = openai_client.chat.completions.create(
            model="gpt-4-turbo-preview",
            messages=[
                {
                    "role": "system",
                    "content": "You are a helpful data analyst assistant. Answer questions about the data clearly and accurately.",
                },
                {"role": "user", "content": prompt},
            ],
            temperature=0.7,
            max_tokens=500,
        )

        return completion.choices[0].message.content or "Unable to generate response"
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error in chat: {str(e)}")


async def generate_report(data: List[dict], insights: str) -> str:
    """Generate a professional report"""
    if not openai_client:
        raise HTTPException(
            status_code=500,
            detail="OpenAI API key is not configured. Please set OPENAI_API_KEY in your environment variables.",
        )

    try:
        prompt = f"""Create a professional business report in Markdown format based on the following data and insights.

Data summary: {str(data[:50])}
Insights: {insights}

Format the report with:
1. Executive Summary
2. Key Findings
3. Data Analysis
4. Recommendations
5. Conclusion

Use proper Markdown formatting with headers, lists, and emphasis."""

        completion = openai_client.chat.completions.create(
            model="gpt-4-turbo-preview",
            messages=[
                {
                    "role": "system",
                    "content": "You are a professional report writer. Create well-structured, professional business reports.",
                },
                {"role": "user", "content": prompt},
            ],
            temperature=0.7,
            max_tokens=2000,
        )

        return completion.choices[0].message.content or "Unable to generate report"
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error generating report: {str(e)}")


# API Endpoints
@app.get("/")
async def root():
    return {"message": "AI Smart Dashboard API", "status": "running"}


@app.get("/health")
async def health_check():
    return {"status": "healthy", "openai_configured": openai_client is not None}


@app.post("/api/insights", response_model=InsightsResponse)
async def get_insights(request: InsightsRequest):
    """Generate AI insights from uploaded data"""
    if not request.data or len(request.data) == 0:
        raise HTTPException(status_code=400, detail="Invalid data provided")

    insights = await generate_insights(request.data, request.context)
    return InsightsResponse(insights=insights)


@app.post("/api/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    """Chat with AI about the data"""
    if not request.question or not request.data:
        raise HTTPException(
            status_code=400, detail="Question and data are required"
        )

    if not request.data or len(request.data) == 0:
        raise HTTPException(status_code=400, detail="Invalid data provided")

    response = await chat_with_data(request.question, request.data)
    return ChatResponse(response=response)


@app.post("/api/report", response_model=ReportResponse)
async def get_report(request: ReportRequest):
    """Generate a professional report"""
    if not request.data or len(request.data) == 0:
        raise HTTPException(status_code=400, detail="Invalid data provided")

    if not request.insights:
        raise HTTPException(status_code=400, detail="Insights are required")

    report = await generate_report(request.data, request.insights)
    return ReportResponse(report=report)


