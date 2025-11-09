"use client";

import { useDataStore } from "@/store/data-store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, TrendingUp } from "lucide-react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export function Charts() {
  const { data } = useDataStore();

  if (!data || data.rawData.length === 0) {
    return null;
  }

  // Try to identify numeric columns for charting
  const numericColumns = data.headers.filter((header) => {
    const sample = data.rawData[0]?.[header];
    return !isNaN(Number(sample)) && sample !== null && sample !== "";
  });

  // Try to identify date/category columns
  const categoryColumns = data.headers.filter(
    (header) => !numericColumns.includes(header)
  );

  // Create chart data from first numeric column vs first category column
  const chartData =
    categoryColumns.length > 0 && numericColumns.length > 0
      ? data.rawData.slice(0, 20).map((row) => ({
          category: String(row[categoryColumns[0]] || ""),
          value: Number(row[numericColumns[0]] || 0),
        }))
      : [];

  if (chartData.length === 0) {
    return (
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BarChart3 className="h-5 w-5" />
            <span>Charts</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            No chartable data available. Ensure your data has numeric and
            category columns.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BarChart3 className="h-5 w-5" />
            <span>Bar Chart</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(255,255,255,0.1)"
              />
              <XAxis
                dataKey="category"
                stroke="rgba(255,255,255,0.5)"
                fontSize={12}
              />
              <YAxis stroke="rgba(255,255,255,0.5)" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(0,0,0,0.8)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "8px",
                }}
              />
              <Legend />
              <Bar dataKey="value" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5" />
            <span>Line Chart</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(255,255,255,0.1)"
              />
              <XAxis
                dataKey="category"
                stroke="rgba(255,255,255,0.5)"
                fontSize={12}
              />
              <YAxis stroke="rgba(255,255,255,0.5)" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(0,0,0,0.8)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "8px",
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#8b5cf6"
                strokeWidth={2}
                dot={{ fill: "#8b5cf6", r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
