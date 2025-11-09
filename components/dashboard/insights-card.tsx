"use client";

import { useDataStore } from "@/store/data-store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, Loader2, RefreshCw } from "lucide-react";
import { useState } from "react";

export function InsightsCard() {
  const { data, insights, loading, setInsights, setLoading, setError } =
    useDataStore();
  const [generating, setGenerating] = useState(false);

  const generateInsights = async () => {
    if (!data) return;

    setGenerating(true);
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/insights", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: data.rawData }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate insights");
      }

      const result = await response.json();
      setInsights(result.insights);
    } catch (error: any) {
      setError(error.message || "Failed to generate insights");
      console.error("Error generating insights:", error);
    } finally {
      setGenerating(false);
      setLoading(false);
    }
  };

  if (!data) {
    return null;
  }

  return (
    <Card className="glass-card">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <Sparkles className="h-5 w-5 text-yellow-400" />
            <span>AI Insights</span>
          </CardTitle>
          <Button
            variant="outline"
            size="sm"
            onClick={generateInsights}
            disabled={generating || loading}
          >
            {generating ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <RefreshCw className="h-4 w-4 mr-2" />
                Generate
              </>
            )}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {insights ? (
          <div className="prose prose-invert max-w-none">
            <div className="whitespace-pre-wrap text-sm leading-relaxed">
              {insights.split("\n").map((line, index) => (
                <p key={index} className="mb-2">
                  {line}
                </p>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            <Sparkles className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>Click "Generate" to get AI-powered insights from your data</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
