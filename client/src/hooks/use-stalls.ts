import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import type { Stall, InsertStall } from "@shared/schema";

export function useStalls() {
  const query = useQuery<Stall[]>({
    queryKey: ["/api/stalls"],
  });

  const createStall = useMutation({
    mutationFn: async (stall: InsertStall) => {
      const response = await apiRequest("POST", "/api/stalls", stall);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/stalls"] });
      queryClient.invalidateQueries({ queryKey: ["/api/dashboard/stats"] });
    },
  });

  const assignStall = useMutation({
    mutationFn: async ({ stallId, vendorId }: { stallId: number; vendorId: number }) => {
      const response = await apiRequest("POST", `/api/stalls/${stallId}/assign/${vendorId}`);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/stalls"] });
      queryClient.invalidateQueries({ queryKey: ["/api/vendors"] });
      queryClient.invalidateQueries({ queryKey: ["/api/dashboard/stats"] });
    },
  });

  const releaseStall = useMutation({
    mutationFn: async (stallId: number) => {
      const response = await apiRequest("POST", `/api/stalls/${stallId}/release`);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/stalls"] });
      queryClient.invalidateQueries({ queryKey: ["/api/vendors"] });
      queryClient.invalidateQueries({ queryKey: ["/api/dashboard/stats"] });
    },
  });

  return {
    ...query,
    createStall,
    assignStall,
    releaseStall,
  };
}

export function useAvailableStalls() {
  return useQuery<Stall[]>({
    queryKey: ["/api/stalls/available"],
  });
}
