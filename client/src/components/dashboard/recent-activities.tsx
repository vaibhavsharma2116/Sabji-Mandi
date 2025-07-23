import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserPlus, AlertTriangle, TrendingUp, Store } from "lucide-react";

const activities = [
  {
    id: 1,
    type: "vendor",
    icon: UserPlus,
    iconBg: "bg-primary/10 text-primary",
    description: "New vendor Rajesh Kumar registered for Stall #23",
    timestamp: "2 hours ago"
  },
  {
    id: 2,
    type: "alert",
    icon: AlertTriangle,
    iconBg: "bg-warning/10 text-warning",
    description: "Low stock alert for Green Chilies (Only 5kg remaining)",
    timestamp: "3 hours ago"
  },
  {
    id: 3,
    type: "achievement",
    icon: TrendingUp,
    iconBg: "bg-success/10 text-success",
    description: "Daily sales target achieved (₹45,230 / ₹40,000)",
    timestamp: "4 hours ago"
  },
  {
    id: 4,
    type: "payment",
    icon: Store,
    iconBg: "bg-secondary/10 text-secondary",
    description: "Stall payment received from Vendor ID #156 (₹2,500)",
    timestamp: "5 hours ago"
  }
];

export default function RecentActivities() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Recent Activities</CardTitle>
        <Button variant="ghost" size="sm">View All</Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start gap-4 p-4 hover:bg-slate-50 rounded-lg transition-colors">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${activity.iconBg}`}>
                <activity.icon size={16} />
              </div>
              <div className="flex-1">
                <p className="text-sm text-slate-900">{activity.description}</p>
                <p className="text-xs text-slate-500 mt-1">{activity.timestamp}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
