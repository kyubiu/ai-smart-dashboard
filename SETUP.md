# Quick Setup Guide

## Prerequisites

1. Node.js 18+ installed
2. npm, yarn, or pnpm
3. OpenAI API key

## Installation Steps

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Set up environment variables**

   Create a `.env.local` file in the root directory:

   ```env
   # Required for AI features
   OPENAI_API_KEY=your-openai-api-key-here

   # Required for NextAuth (generate a secret)
   NEXTAUTH_SECRET=your-nextauth-secret-here
   NEXTAUTH_URL=http://localhost:3000

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

3. **Generate NextAuth Secret**

   ```bash
   openssl rand -base64 32
   ```

4. **Run development server**

   ```bash
   npm run dev
   ```

5. **Open browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Getting OpenAI API Key

1. Go to [OpenAI Platform](https://platform.openai.com/)
2. Sign up or log in
3. Navigate to API Keys section
4. Create a new API key
5. Copy the key to your `.env.local` file

## Testing the Application

1. **Upload a CSV file**

   - Create a sample CSV with headers and data
   - Example:
     ```csv
     Name,Revenue,Date
     Product A,1000,2024-01-01
     Product B,1500,2024-01-02
     Product C,2000,2024-01-03
     ```

2. **Generate Insights**

   - Click the "Generate" button in the Insights card
   - Wait for AI to analyze your data

3. **View Charts**

   - Charts will automatically appear if your data has numeric columns

4. **Chat with Data**

   - Navigate to the Chat page
   - Ask questions about your data
   - Example: "What is the total revenue?"

5. **Download Report**
   - After generating insights, click "Download Report"
   - Report will be downloaded as a Markdown file

## Troubleshooting

### OpenAI API Errors

- Verify your API key is correct
- Check your OpenAI account has credits
- Ensure the API key has the right permissions

### File Upload Issues

- Ensure files are in CSV or XLSX format
- Check file size (large files may take time to process)
- Verify file is not corrupted

### Authentication Issues

- If using GitHub OAuth, verify credentials are correct
- If using Email, check SMTP server settings
- For development, the app includes a demo credentials provider

### Chart Not Displaying

- Ensure your data has at least one numeric column
- Check that data is properly parsed
- Verify data format is correct

## Next Steps

1. Configure authentication providers (GitHub or Email)
2. Customize the UI theme in `app/globals.css`
3. Add more chart types in `components/dashboard/charts.tsx`
4. Enhance AI prompts in `lib/openai.ts`
5. Deploy to Vercel for production

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import repository in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

The app is optimized for Vercel deployment.
