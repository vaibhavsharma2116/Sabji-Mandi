import { useQuery } from "@tanstack/react-query";

interface DashboardStats {
  totalVendors: number;
  activeVendors: number;
  totalStalls: number;
  occupiedStalls: number;
  availableStalls: number;
  lowStockProducts: number;
  todayRevenue: number;
  todaySalesCount: number;
}

export function useDashboardStats() {
  return useQuery<DashboardStats>({
    queryKey: ["/api/dashboard/stats"],
  });
}
