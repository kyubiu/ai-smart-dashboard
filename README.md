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

3. **Set up environment variables**

   Copy `.env.example` to `.env.local`:

   ```bash
   cp .env.example .env.local
   ```

   Fill in your environment variables:

   ```env
   # Required
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your-nextauth-secret-here
   OPENAI_API_KEY=your-openai-api-key-here

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

4. **Generate NextAuth Secret**

   You can generate a secret using:

   ```bash
   openssl rand -base64 32
   ```

5. **Run the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

6. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
ai-smart-dashboard/
├── app/
│   ├── api/
│   │   ├── auth/
│   │   │   └── [...nextauth]/     # NextAuth configuration
│   │   ├── chat/                   # Chat API endpoint
│   │   ├── insights/               # Insights API endpoint
│   │   └── report/                 # Report generation API
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
│   ├── data-parser.ts              # CSV/XLSX parsing utilities
│   ├── openai.ts                   # OpenAI API integration
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

### Deploy to Vercel

1. Push your code to GitHub
2. Import your repository in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

The app is optimized for Vercel deployment with Next.js 14.

### Environment Variables for Production

Make sure to set all required environment variables in your production environment:

- `NEXTAUTH_URL` (your production URL)
- `NEXTAUTH_SECRET`
- `OPENAI_API_KEY`
- OAuth credentials (if using)

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
