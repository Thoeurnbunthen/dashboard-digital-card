// store/dashboard-store.ts
import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface Metric {
  title: string;
  value: number;
  icon: string;
  changeType?: "increase" | "decrease";
  change?: string;
}

interface RevenueItem {
  date: string;
  count: number;
}

interface RecentUsers {
  id: string;
  full_name: string;
  email: string;
  avatar: string;
  created_at: Date;
  is_active: boolean;
}

interface DashboardStore {
  summary: Metric[];
  revenue: RevenueItem[];
  recentUsers: RecentUsers[];
  setSummary: (data: Metric[]) => void;
  setRevenue: (data: RevenueItem[]) => void;
  setRecentUsers: (data: RecentUsers[]) => void;
}

export const useDashboardStore = create<DashboardStore>()(
  devtools((set) => ({
    summary: [],
    revenue: [],
    recentUsers: [],
    setSummary: (data) => set({ summary: data }),
    setRevenue: (data) => set({ revenue: data }),
    setRecentUsers: (data) => set({ recentUsers: data }),
  }))
);
