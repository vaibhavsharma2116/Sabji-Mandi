import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import type { Sale, InsertSale } from "@shared/schema";

export function useSales() {
  const query = useQuery<Sale[]>({
    queryKey: ["/api/sales"],
  });

  const createSale = useMutation({
    mutationFn: async (sale: InsertSale) => {
      const response = await apiRequest("POST", "/api/sales", sale);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/sales"] });
      queryClient.invalidateQueries({ queryKey: ["/api/products"] });
      queryClient.invalidateQueries({ queryKey: ["/api/dashboard/stats"] });
    },
  });

  return {
    ...query,
    createSale,
  };
}

export function useTodaySales() {
  return useQuery<Sale[]>({
    queryKey: ["/api/sales/today"],
  });
}

export function useSalesByVendor(vendorId: number) {
  return useQuery<Sale[]>({
    queryKey: ["/api/sales/vendor", vendorId],
    enabled: !!vendorId,
  });
}
