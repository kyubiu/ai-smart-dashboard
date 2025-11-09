import { Navbar } from "@/components/layout/navbar";
import { Sidebar } from "@/components/layout/sidebar";
import { ChatPanel } from "@/components/chat/chat-panel";

export default function ChatPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6 lg:p-8">
          <div className="max-w-4xl mx-auto">
            <div className="mb-6">
              <h1 className="text-3xl font-bold gradient-text">AI Chat</h1>
              <p className="text-muted-foreground mt-1">
                Ask questions about your data and get AI-powered insights
              </p>
            </div>
            <div className="h-[calc(100vh-200px)]">
              <ChatPanel />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
