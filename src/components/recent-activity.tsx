import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useDashboardStore } from "@/store/dashboard-store";
import { Badge } from "./ui/badge";

export function RecentActivity() {
  const recentUsers = useDashboardStore((state) => state.recentUsers);
  if (!recentUsers) {
    return "Loading recent users";
  }
  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>Recent Users</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {recentUsers.map((user, index) => (
            <div key={index} className="flex items-center">
              <Avatar className="h-9 w-9">
                <AvatarImage
                  src={user.avatar || "/placeholder.svg"}
                  alt="Avatar"
                />
                <AvatarFallback>
                  {user.full_name.substring(0, 2)}
                </AvatarFallback>
              </Avatar>
              <div className="ml-4 space-y-1">
                <p className="text-sm font-medium leading-none">
                  {user.full_name}
                </p>
                <p className="text-sm text-muted-foreground">{user.email}</p>
              </div>
              <div className="ml-auto font-small">
                {" "}
                <Badge
                  variant={user.is_active === true ? "default" : "destructive"}
                >
                  {user.is_active ? "active" : "block"}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
