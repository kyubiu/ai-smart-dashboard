"use client";

import { useEffect, useState } from "react";
import { API_ENDPOINTS } from "@/lib/api-config";
import { CheckCircle2, XCircle, Loader2 } from "lucide-react";

export function BackendStatus() {
  const [status, setStatus] = useState<
    "checking" | "connected" | "disconnected"
  >("checking");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkBackend = async () => {
      try {
        const response = await fetch(API_ENDPOINTS.health, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          setStatus("connected");
          setError(null);
        } else {
          setStatus("disconnected");
          setError("Backend returned an error");
        }
      } catch (err: any) {
        setStatus("disconnected");
        setError(
          err.message ||
            "Cannot connect to backend. Make sure it's running on port 8000."
        );
      }
    };

    checkBackend();
    // Check every 10 seconds
    const interval = setInterval(checkBackend, 10000);
    return () => clearInterval(interval);
  }, []);

  if (status === "checking") {
    return (
      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
        <Loader2 className="h-4 w-4 animate-spin" />
        <span>Checking backend connection...</span>
      </div>
    );
  }

  if (status === "disconnected") {
    return (
      <div className="flex items-center space-x-2 text-sm text-destructive">
        <XCircle className="h-4 w-4" />
        <span>Backend disconnected: {error || "Backend not running"}</span>
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-2 text-sm text-green-500">
      <CheckCircle2 className="h-4 w-4" />
      <span>Backend connected</span>
    </div>
  );
}
