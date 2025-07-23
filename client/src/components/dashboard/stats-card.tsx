import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  icon: LucideIcon;
  iconBgColor: string;
  delay?: string;
}

export default function StatsCard({ 
  title, 
  value, 
  change, 
  changeType = "positive",
  icon: Icon, 
  iconBgColor,
  delay = "0s"
}: StatsCardProps) {
  return (
    <Card className="animate-slide-up" style={{ animationDelay: delay }}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-600">{title}</p>
            <p className="text-2xl font-bold text-slate-900 mt-1">{value}</p>
            {change && (
              <p className={cn(
                "text-sm flex items-center gap-1 mt-2",
                changeType === "positive" && "text-success",
                changeType === "negative" && "text-destructive",
                changeType === "neutral" && "text-warning"
              )}>
                <span>{change}</span>
              </p>
            )}
          </div>
          <div className={cn("w-12 h-12 rounded-lg flex items-center justify-center", iconBgColor)}>
            <Icon size={20} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
