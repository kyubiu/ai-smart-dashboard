import Papa from "papaparse";
import * as XLSX from "xlsx";

export interface ParsedData {
  headers: string[];
  rows: any[];
  rawData: any[];
}

export async function parseCSV(file: File): Promise<ParsedData> {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        if (results.errors.length > 0) {
          reject(
            new Error(
              `CSV parsing errors: ${results.errors
                .map((e) => e.message)
                .join(", ")}`
            )
          );
          return;
        }

        const data = results.data as any[];
        if (data.length === 0) {
          reject(new Error("CSV file is empty"));
          return;
        }

        const headers = Object.keys(data[0]);
        const rows = data.map((row) =>
          headers.map((header) => row[header] || "")
        );

        resolve({
          headers,
          rows,
          rawData: data,
        });
      },
      error: (error) => {
        reject(error);
      },
    });
  });
}

export async function parseXLSX(file: File): Promise<ParsedData> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: "array" });

        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);

        if (jsonData.length === 0) {
          reject(new Error("Excel file is empty"));
          return;
        }

        const headers = Object.keys(jsonData[0] as any);
        const rows = jsonData.map((row) =>
          headers.map((header) => (row as any)[header] || "")
        );

        resolve({
          headers,
          rows,
          rawData: jsonData,
        });
      } catch (error) {
        reject(error);
      }
    };

    reader.onerror = () => {
      reject(new Error("Failed to read Excel file"));
    };

    reader.readAsArrayBuffer(file);
  });
}

export function parseFile(file: File): Promise<ParsedData> {
  const fileName = file.name.toLowerCase();

  if (fileName.endsWith(".csv")) {
    return parseCSV(file);
  } else if (fileName.endsWith(".xlsx") || fileName.endsWith(".xls")) {
    return parseXLSX(file);
  } else {
    throw new Error("Unsupported file type. Please upload a CSV or XLSX file.");
  }
}
