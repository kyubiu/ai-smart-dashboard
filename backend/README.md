# AI Smart Dashboard - FastAPI Backend

FastAPI backend for the AI Smart Dashboard application.

## Features

- **Insights Generation**: Generate AI-powered insights from business data
- **Chat Interface**: Interactive chat with AI about your data
- **Report Generation**: Create professional Markdown reports
- **CORS Enabled**: Configured for Next.js frontend integration

## Setup

### Prerequisites

- Python 3.8+
- OpenAI API key

### Installation

1. **Navigate to backend directory**

   ```bash
   cd backend
   ```

2. **Create virtual environment (recommended)**

   ```bash
   python -m venv venv

   # On Windows
   venv\Scripts\activate

   # On macOS/Linux
   source venv/bin/activate
   ```

3. **Install dependencies**

   ```bash
   pip install -r requirements.txt
   ```

4. **Set up environment variables**

   Copy `.env.example` to `.env`:

   ```bash
   cp .env.example .env
   ```

   Edit `.env` and add your OpenAI API key:

   ```env
   OPENAI_API_KEY=your-openai-api-key-here
   ```

### Running the Server

**Development mode:**

```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

**Production mode:**

```bash
uvicorn main:app --host 0.0.0.0 --port 8000
```

The API will be available at `http://localhost:8000`

### API Documentation

Once the server is running, you can access:

- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

## API Endpoints

### Health Check

- `GET /` - API status
- `GET /health` - Health check with OpenAI configuration status

### Insights

- `POST /api/insights` - Generate AI insights from data
  ```json
  {
    "data": [...],
    "context": "optional context"
  }
  ```

### Chat

- `POST /api/chat` - Chat with AI about your data
  ```json
  {
    "question": "What is the total revenue?",
    "data": [...]
  }
  ```

### Report

- `POST /api/report` - Generate a professional report
  ```json
  {
    "data": [...],
    "insights": "insights text"
  }
  ```

## Environment Variables

- `OPENAI_API_KEY` (required): Your OpenAI API key
- `HOST` (optional): Server host (default: 0.0.0.0)
- `PORT` (optional): Server port (default: 8000)

## Development

### Project Structure

```
backend/
├── main.py              # FastAPI application
├── requirements.txt     # Python dependencies
├── .env.example         # Environment variables template
└── README.md           # This file
```

### Adding New Endpoints

1. Define request/response models using Pydantic
2. Create the endpoint function
3. Add the route decorator
4. Update this README

## Troubleshooting

### OpenAI API Errors

- Verify your API key is correct in `.env`
- Check your OpenAI account has sufficient credits
- Ensure the API key has proper permissions

### CORS Issues

- Make sure the frontend URL is in the `allow_origins` list in `main.py`
- Check that the backend is running on the correct port

### Port Already in Use

- Change the port in the uvicorn command: `--port 8001`
- Or update the frontend API URL to match

## Production Deployment

For production, consider:

- Using a production ASGI server like Gunicorn with Uvicorn workers
- Setting up proper environment variable management
- Configuring HTTPS
- Adding rate limiting
- Setting up monitoring and logging

Example with Gunicorn:

```bash
gunicorn main:app -w 4 -k uvicorn.workers.UvicornWorker --bind 0.0.0.0:8000
```

