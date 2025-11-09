# AI Smart Dashboard

A modern, GPT-powered analytics web application that allows users to upload business data (CSV/XLSX) and generate AI-powered insights, charts, and natural-language summaries using OpenAI models.

## ✨ Features

- **Data Upload**: Upload CSV or XLSX files with drag-and-drop support
- **AI Insights**: Generate intelligent insights from your data using GPT-4
- **Interactive Charts**: Visualize your data with beautiful bar and line charts
- **Chat Interface**: Ask questions about your data and get AI-powered responses
- **Report Generation**: Download AI-generated reports in Markdown format
- **Authentication**: Sign in with GitHub or Email (NextAuth.js)
- **Modern UI**: Beautiful dark theme with glassmorphism effects and gradient accents

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS
- **Backend**: FastAPI (Python)
- **State Management**: Zustand
- **Data Fetching**: React Query (TanStack Query)
- **Charts**: Recharts
- **UI Components**: shadcn/ui + Radix UI
- **Icons**: Lucide React
- **Authentication**: NextAuth.js
- **File Parsing**: PapaParse (CSV), XLSX
- **AI Integration**: OpenAI API (GPT-4)

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm
- Python 3.8+ (for FastAPI backend)
- OpenAI API key
- (Optional) GitHub OAuth credentials
- (Optional) Email server credentials for email authentication

### Installation

1. **Clone the repository**

   ```bash
   git clone <your-repo-url>
   cd ai-smart-dashboard
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up Backend (FastAPI)**

   Navigate to the backend directory:

   ```bash
   cd backend
   ```

   Create a virtual environment (recommended):

   ```bash
   python -m venv venv

   # On Windows
   venv\Scripts\activate

   # On macOS/Linux
   source venv/bin/activate
   ```

   Install Python dependencies:

   ```bash
   pip install -r requirements.txt
   ```

   Set up backend environment variables:

   ```bash
   cp .env.example .env
   ```

   Edit `backend/.env` and add your OpenAI API key:

   ```env
   OPENAI_API_KEY=your-openai-api-key-here
   ```

   Start the FastAPI backend:

   ```bash
   uvicorn main:app --reload --host 0.0.0.0 --port 8000
   ```

   The backend will be available at `http://localhost:8000`

   - API Docs: http://localhost:8000/docs

4. **Set up Frontend (Next.js)**

   Return to the root directory:

   ```bash
   cd ..
   ```

   Set up frontend environment variables:

   Copy `.env.example` to `.env.local`:

   ```bash
   cp .env.example .env.local
   ```

   Fill in your environment variables:

   ```env
   # Required
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your-nextauth-secret-here

   # Backend API URL (optional, defaults to http://localhost:8000)
   NEXT_PUBLIC_API_URL=http://localhost:8000

   # Optional - GitHub OAuth
   GITHUB_CLIENT_ID=your-github-client-id
   GITHUB_CLIENT_SECRET=your-github-client-secret

   # Optional - Email Provider
   EMAIL_SERVER_HOST=smtp.example.com
   EMAIL_SERVER_PORT=587
   EMAIL_SERVER_USER=your-email
   EMAIL_SERVER_PASSWORD=your-password
   EMAIL_FROM=noreply@example.com
   ```

   Generate NextAuth Secret:

   ```bash
   openssl rand -base64 32
   ```

5. **Run the frontend development server**

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

6. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000)

   **Note**: Make sure both the FastAPI backend (port 8000) and Next.js frontend (port 3000) are running.

## 📁 Project Structure

```
ai-smart-dashboard/
├── backend/                        # FastAPI Backend
│   ├── main.py                     # FastAPI application
│   ├── requirements.txt            # Python dependencies
│   ├── .env.example               # Backend environment template
│   ├── README.md                  # Backend documentation
│   ├── run.sh                      # Linux/Mac startup script
│   └── run.bat                     # Windows startup script
├── app/
│   ├── api/
│   │   └── auth/
│   │       └── [...nextauth]/     # NextAuth configuration
│   ├── analytics/                  # Analytics page
│   ├── chat/                       # Chat page
│   ├── reports/                    # Reports page
│   ├── layout.tsx                  # Root layout
│   ├── page.tsx                    # Dashboard home page
│   ├── providers.tsx               # React Query & Session providers
│   └── globals.css                 # Global styles
├── components/
│   ├── chat/
│   │   └── chat-panel.tsx          # Chat interface component
│   ├── dashboard/
│   │   ├── charts.tsx              # Chart components
│   │   ├── data-table.tsx          # Data table component
│   │   ├── data-upload.tsx         # File upload component
│   │   ├── insights-card.tsx       # Insights display component
│   │   └── dashboard.tsx           # Main dashboard component
│   ├── layout/
│   │   ├── navbar.tsx              # Navigation bar
│   │   └── sidebar.tsx             # Sidebar navigation
│   └── ui/                         # shadcn/ui components
│       ├── button.tsx
│       ├── card.tsx
│       ├── input.tsx
│       └── tabs.tsx
├── lib/
│   ├── api-config.ts               # API configuration
│   ├── data-parser.ts              # CSV/XLSX parsing utilities
│   └── utils.ts                    # Utility functions
├── store/
│   └── data-store.ts               # Zustand store for data management
└── public/                         # Static assets
```

## 🎨 Features in Detail

### Data Upload

- Drag-and-drop file upload
- Support for CSV and XLSX formats
- Real-time file parsing and validation
- Data preview table

### AI Insights

- Generate insights with a single click
- GPT-4 powered analysis
- Key findings, trends, and recommendations
- Context-aware insights

### Interactive Charts

- Automatic chart generation from numeric data
- Bar charts and line charts
- Responsive and interactive
- Dark theme optimized

### Chat Interface

- Natural language queries about your data
- Context-aware responses
- Conversation history
- Real-time streaming (can be enhanced)

### Report Generation

- AI-generated Markdown reports
- Executive summary and recommendations
- Downloadable reports
- Professional formatting

## 🔒 Authentication

The app supports two authentication methods:

1. **GitHub OAuth**: Set up GitHub OAuth app and add credentials to `.env.local`
2. **Email**: Configure email server settings in `.env.local`

## 🚢 Deployment

### Frontend Deployment (Vercel)

1. Push your code to GitHub
2. Import your repository in Vercel
3. Add environment variables in Vercel dashboard:
   - `NEXTAUTH_URL` (your production URL)
   - `NEXTAUTH_SECRET`
   - `NEXT_PUBLIC_API_URL` (your FastAPI backend URL)
   - OAuth credentials (if using)
4. Deploy!

The frontend is optimized for Vercel deployment with Next.js 14.

### Backend Deployment (FastAPI)

The FastAPI backend can be deployed to various platforms:

**Option 1: Railway / Render / Fly.io**

- Push backend code to repository
- Set environment variables (OPENAI_API_KEY)
- Deploy with platform-specific configuration

**Option 2: Docker**

```bash
cd backend
docker build -t ai-dashboard-backend .
docker run -p 8000:8000 -e OPENAI_API_KEY=your-key ai-dashboard-backend
```

**Option 3: Traditional Server**

- Use Gunicorn with Uvicorn workers
- Set up reverse proxy (Nginx)
- Configure environment variables

### Environment Variables for Production

**Frontend:**

- `NEXTAUTH_URL` (your production URL)
- `NEXTAUTH_SECRET`
- `NEXT_PUBLIC_API_URL` (your FastAPI backend URL)
- OAuth credentials (if using)

**Backend:**

- `OPENAI_API_KEY` (required)
- `HOST` (optional, default: 0.0.0.0)
- `PORT` (optional, default: 8000)

## 📝 Usage

1. **Sign In**: Use GitHub or Email to sign in
2. **Upload Data**: Drag and drop or browse for a CSV/XLSX file
3. **View Data**: Preview your uploaded data in the table
4. **Generate Insights**: Click "Generate" to get AI-powered insights
5. **View Charts**: Automatically generated charts based on your data
6. **Chat**: Ask questions about your data in the Chat page
7. **Download Report**: Generate and download a comprehensive report

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Charts by [Recharts](https://recharts.org/)
- Icons from [Lucide](https://lucide.dev/)
- Powered by [OpenAI](https://openai.com/)

## 🐛 Troubleshooting

### Common Issues

1. **OpenAI API Errors**: Make sure your API key is valid and has sufficient credits
2. **File Upload Issues**: Ensure files are in CSV or XLSX format and not corrupted
3. **Authentication Errors**: Verify your NextAuth configuration and secrets
4. **Chart Not Displaying**: Check that your data has numeric columns for charting

## 📧 Support

For support, please open an issue in the GitHub repository.

---

Built with ❤️ using Next.js and OpenAI
