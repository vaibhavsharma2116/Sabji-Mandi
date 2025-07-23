import { Users, ShoppingCart, MapPin, AlertTriangle } from "lucide-react";
import StatsCard from "@/components/dashboard/stats-card";
import SalesChart from "@/components/dashboard/sales-chart";
import TopProducts from "@/components/dashboard/top-products";
import RecentActivities from "@/components/dashboard/recent-activities";
import QuickActions from "@/components/dashboard/quick-actions";
import { useDashboardStats } from "@/hooks/use-dashboard";

export default function Dashboard() {
  const { data: stats, isLoading } = useDashboardStats();

  if (isLoading) {
    return (
      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-32 bg-slate-200 rounded-xl animate-pulse"></div>
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="h-80 bg-slate-200 rounded-xl animate-pulse"></div>
          <div className="h-80 bg-slate-200 rounded-xl animate-pulse"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Quick Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Vendors"
          value={stats?.totalVendors || 0}
          change="+12% from last month"
          changeType="positive"
          icon={Users}
          iconBgColor="bg-primary/10 text-primary"
          delay="0s"
        />
        <StatsCard
          title="Today's Sales"
          value={`₹${stats?.todayRevenue?.toLocaleString() || 0}`}
          change="+8% from yesterday"
          changeType="positive"
          icon={ShoppingCart}
          iconBgColor="bg-secondary/10 text-secondary"
          delay="0.1s"
        />
        <StatsCard
          title="Active Stalls"
          value={`${stats?.occupiedStalls || 0}/${stats?.totalStalls || 0}`}
          change={`${stats?.availableStalls || 0} stalls vacant`}
          changeType="neutral"
          icon={MapPin}
          iconBgColor="bg-accent/10 text-accent"
          delay="0.2s"
        />
        <StatsCard
          title="Low Stock Items"
          value={stats?.lowStockProducts || 0}
          change="Requires attention"
          changeType="negative"
          icon={AlertTriangle}
          iconBgColor="bg-destructive/10 text-destructive"
          delay="0.3s"
        />
      </div>

      {/* Charts and Tables Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <SalesChart />
        <TopProducts />
      </div>

      {/* Recent Activities and Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <RecentActivities />
        </div>
        <QuickActions />
      </div>
    </div>
  );
}
