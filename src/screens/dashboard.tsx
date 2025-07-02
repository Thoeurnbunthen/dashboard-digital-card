import { MetricsCards } from "@/components/metric-card";
import { RecentActivity } from "@/components/recent-activity";
import { RevenueChart } from "@/components/revenue-chart";

import { dashboardRequest } from "@/lib/api/dashboard-api";
import { useDashboardStore } from "@/store/dashboard-store";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

const Dashboard = () => {
  const { DASHBOARD_ANALYTICS } = dashboardRequest();
  const setSummary = useDashboardStore((state) => state.setSummary);
  const setRevenue = useDashboardStore((state) => state.setRevenue);
  const setRecentUsers = useDashboardStore((state) => state.setRecentUsers);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["dashboard_analytics"],
    queryFn: async () => DASHBOARD_ANALYTICS(),
    staleTime: 1000 * 60 * 5, // 5 mins
  });

  useEffect(() => {
    if (data?.data) {
      setSummary(data.data.summary);
      setRevenue(data.data.userGrowth);
      setRecentUsers(data.data.recentUsers);
    }
  }, [data, setSummary, setRevenue, setRecentUsers]);

  if (isLoading) return <p>Loading dashboard...</p>;
  if (isError) return <p>Error loading dashboard</p>;

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      </div>
      <div className="space-y-4">
        <MetricsCards />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <RevenueChart />
          <RecentActivity />
        </div>
        {/* <div className="grid gap-4 md:grid-cols-2">
          <TopProducts />
        </div> */}
      </div>
    </div>
  );
};

export default Dashboard;
