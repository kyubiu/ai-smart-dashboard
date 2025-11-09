"use client";

import { Navbar } from "@/components/layout/navbar";
import { Sidebar } from "@/components/layout/sidebar";
import { Charts } from "@/components/dashboard/charts";
import { useDataStore } from "@/store/data-store";

export default function AnalyticsPage() {
  const { data } = useDataStore();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6 lg:p-8">
          <div className="max-w-7xl mx-auto space-y-6">
            <div>
              <h1 className="text-3xl font-bold gradient-text">Analytics</h1>
              <p className="text-muted-foreground mt-1">
                Visualize your data with interactive charts
              </p>
            </div>
            {data ? (
              <Charts />
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                <p>Upload data on the Dashboard to view analytics</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
