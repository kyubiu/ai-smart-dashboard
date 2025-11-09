import { create } from "zustand";

export interface ParsedData {
  headers: string[];
  rows: any[];
  rawData: any[];
}

interface DataStore {
  data: ParsedData | null;
  insights: string | null;
  loading: boolean;
  error: string | null;
  setData: (data: ParsedData) => void;
  setInsights: (insights: string) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearData: () => void;
}

export const useDataStore = create<DataStore>((set) => ({
  data: null,
  insights: null,
  loading: false,
  error: null,
  setData: (data) => set({ data, error: null }),
  setInsights: (insights) => set({ insights }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  clearData: () => set({ data: null, insights: null, error: null }),
}));
