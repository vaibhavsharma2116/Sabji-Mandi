import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import type { Vendor, InsertVendor } from "@shared/schema";

export function useVendors() {
  const query = useQuery<Vendor[]>({
    queryKey: ["/api/vendors"],
  });

  const createVendor = useMutation({
    mutationFn: async (vendor: InsertVendor) => {
      const response = await apiRequest("POST", "/api/vendors", vendor);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/vendors"] });
      queryClient.invalidateQueries({ queryKey: ["/api/dashboard/stats"] });
    },
  });

  const updateVendor = useMutation({
    mutationFn: async ({ id, vendor }: { id: number; vendor: Partial<InsertVendor> }) => {
      const response = await apiRequest("PUT", `/api/vendors/${id}`, vendor);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/vendors"] });
      queryClient.invalidateQueries({ queryKey: ["/api/dashboard/stats"] });
    },
  });

  const deleteVendor = useMutation({
    mutationFn: async (id: number) => {
      await apiRequest("DELETE", `/api/vendors/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/vendors"] });
      queryClient.invalidateQueries({ queryKey: ["/api/dashboard/stats"] });
    },
  });

  return {
    ...query,
    createVendor,
    updateVendor,
    deleteVendor,
  };
}
