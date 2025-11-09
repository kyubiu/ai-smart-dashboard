"use client";

import { Navbar } from "@/components/layout/navbar";
import { Sidebar } from "@/components/layout/sidebar";
import { DataUpload } from "./data-upload";
import { DataTable } from "./data-table";
import { InsightsCard } from "./insights-card";
import { Charts } from "./charts";
import { useDataStore } from "@/store/data-store";
import { Button } from "@/components/ui/button";
import { Download, FileText } from "lucide-react";
import { useState } from "react";

export function Dashboard() {
  const { data, insights } = useDataStore();
  const [generatingReport, setGeneratingReport] = useState(false);

  const downloadReport = async () => {
    if (!data || !insights) return;

    setGeneratingReport(true);
    try {
      const response = await fetch("/api/report", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: data.rawData,
          insights,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate report");
      }

      const result = await response.json();
      const reportContent = result.report;

      // Create and download markdown file
      const blob = new Blob([reportContent], { type: "text/markdown" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `ai-report-${new Date().toISOString().split("T")[0]}.md`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading report:", error);
      alert("Failed to generate report. Please try again.");
    } finally {
      setGeneratingReport(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6 lg:p-8">
          <div className="max-w-7xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold gradient-text">Dashboard</h1>
                <p className="text-muted-foreground mt-1">
                  Upload and analyze your business data with AI
                </p>
              </div>
              {data && insights && (
                <Button
                  onClick={downloadReport}
                  disabled={generatingReport}
                  className="glow-effect"
                >
                  {generatingReport ? (
                    <>
                      <FileText className="h-4 w-4 mr-2 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Download className="h-4 w-4 mr-2" />
                      Download Report
                    </>
                  )}
                </Button>
              )}
            </div>

            <DataUpload />

            {data && (
              <>
                <DataTable />
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <InsightsCard />
                  <div className="space-y-6">
                    {/* Additional stats or cards can go here */}
                  </div>
                </div>
                <Charts />
              </>
            )}

            {!data && (
              <div className="text-center py-12 text-muted-foreground">
                <p className="text-lg">
                  Get started by uploading your data file
                </p>
                <p className="text-sm mt-2">Supported formats: CSV, XLSX</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
