"use client";

import { useDataStore } from "@/store/data-store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, Database } from "lucide-react";

export function DataTable() {
  const { data } = useDataStore();

  if (!data) {
    return null;
  }

  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Database className="h-5 w-5" />
          <span>Data Preview</span>
          <span className="text-sm font-normal text-muted-foreground">
            ({data.rows.length} rows)
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10">
                {data.headers.map((header, index) => (
                  <th
                    key={index}
                    className="px-4 py-3 text-left font-medium text-muted-foreground"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.rows.slice(0, 10).map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  className="border-b border-white/5 hover:bg-white/5 transition-colors"
                >
                  {row.map((cell: any, cellIndex: number) => (
                    <td key={cellIndex} className="px-4 py-3">
                      {String(cell || "")}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          {data.rows.length > 10 && (
            <p className="text-xs text-muted-foreground mt-4 text-center">
              Showing first 10 of {data.rows.length} rows
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
