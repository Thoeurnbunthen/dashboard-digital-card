import type { LucideIcon } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { iconMap } from "@/lib/icon-map";
import { useDashboardStore } from "@/store/dashboard-store";

export function MetricsCards() {
  const summary = useDashboardStore((state) => state.summary);

  if (!summary.length) return "Loading metrics...";
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {summary.map((metric) => {
        const Icon: LucideIcon = iconMap[metric.icon] || iconMap["user"];
        return (
          <Card key={metric.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {metric.title}
              </CardTitle>
              <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <div className="flex items-center text-xs text-muted-foreground">
                {/* {metric.changeType === "increase" ? (
                <ArrowUpIcon className="mr-1 h-3 w-3 text-green-500" />
              ) : (
                <ArrowDownIcon className="mr-1 h-3 w-3 text-red-500" />
              )}
              <span
                className={
                  metric.changeType === "increase"
                    ? "text-green-500"
                    : "text-red-500"
                }
              >
                {metric.change}
              </span> */}
                {/* <span className="ml-1">from last month</span> */}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
