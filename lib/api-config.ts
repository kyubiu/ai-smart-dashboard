// API Configuration
// Change this to your FastAPI backend URL
export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export const API_ENDPOINTS = {
  insights: `${API_BASE_URL}/api/insights`,
  chat: `${API_BASE_URL}/api/chat`,
  report: `${API_BASE_URL}/api/report`,
  health: `${API_BASE_URL}/health`,
};

