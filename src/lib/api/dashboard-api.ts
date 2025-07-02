import request from "@/lib/api/request";
import type { IDashboardResponse } from "@/types/dashboard-type";

export const dashboardRequest = () => {
  const DASHBOARD_ANALYTICS = async (): Promise<IDashboardResponse> => {
    return await request({
      url: "/dashboard/analytics",
      method: "GET",
    });
  };
  return {
    DASHBOARD_ANALYTICS,
  };
};
