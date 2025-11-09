"use client";

import { useState, useRef } from "react";
import { useDataStore } from "@/store/data-store";
import { parseFile } from "@/lib/data-parser";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Upload, File, X, Loader2 } from "lucide-react";

export function DataUpload() {
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { setData, setLoading, setError, clearData } = useDataStore();

  const handleFile = async (file: File) => {
    setUploading(true);
    setLoading(true);
    setError(null);

    try {
      const parsedData = await parseFile(file);
      setData(parsedData);
    } catch (error: any) {
      setError(error.message || "Failed to parse file");
      console.error("Error parsing file:", error);
    } finally {
      setUploading(false);
      setLoading(false);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Upload className="h-5 w-5" />
          <span>Upload Data</span>
        </CardTitle>
        <CardDescription>
          Upload a CSV or XLSX file to analyze your business data
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          className={`
            relative border-2 border-dashed rounded-lg p-8 text-center transition-colors
            ${
              dragActive
                ? "border-primary bg-primary/10"
                : "border-muted-foreground/30"
            }
            ${
              uploading
                ? "opacity-50 cursor-not-allowed"
                : "cursor-pointer hover:border-primary/50"
            }
          `}
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".csv,.xlsx,.xls"
            onChange={handleChange}
            className="hidden"
            disabled={uploading}
          />
          {uploading ? (
            <div className="flex flex-col items-center space-y-4">
              <Loader2 className="h-12 w-12 animate-spin text-primary" />
              <p className="text-sm text-muted-foreground">
                Processing file...
              </p>
            </div>
          ) : (
            <div className="flex flex-col items-center space-y-4">
              <File className="h-12 w-12 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">
                  Drag and drop your file here, or click to browse
                </p>
                <p className="text-xs text-muted-foreground mt-2">
                  Supports CSV and XLSX files
                </p>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
