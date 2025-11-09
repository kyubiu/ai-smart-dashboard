import { Navbar } from "@/components/layout/navbar";
import { Sidebar } from "@/components/layout/sidebar";

export default function ReportsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6 lg:p-8">
          <div className="max-w-7xl mx-auto space-y-6">
            <div>
              <h1 className="text-3xl font-bold gradient-text">Reports</h1>
              <p className="text-muted-foreground mt-1">
                Generate and download AI-powered reports
              </p>
            </div>
            <div className="text-center py-12 text-muted-foreground">
              <p>Generate reports from the Dashboard page</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
