import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, MapPin, Users, Building, UserCheck, UserX } from "lucide-react";
import { useStalls } from "@/hooks/use-stalls";
import { useVendors } from "@/hooks/use-vendors";
import { useToast } from "@/hooks/use-toast";

export default function Stalls() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sectionFilter, setSectionFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const { data: stalls = [], isLoading, assignStall, releaseStall } = useStalls();
  const { data: vendors = [] } = useVendors();
  const { toast } = useToast();

  const filteredStalls = stalls.filter(stall => {
    const matchesSearch = stall.stallNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         stall.section.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSection = sectionFilter === "all" || stall.section.toLowerCase() === sectionFilter.toLowerCase();
    const matchesStatus = statusFilter === "all" || 
                         (statusFilter === "occupied" && stall.isOccupied) ||
                         (statusFilter === "vacant" && !stall.isOccupied);
    return matchesSearch && matchesSection && matchesStatus;
  });

  const getVendorName = (vendorId: number | null) => {
    if (!vendorId) return null;
    const vendor = vendors.find(v => v.id === vendorId);
    return vendor?.name || "Unknown vendor";
  };

  const availableVendors = vendors.filter(vendor => !vendor.stallNumber);
  const sections = Array.from(new Set(stalls.map(stall => stall.section)));

  const handleAssignStall = async (stallId: number, vendorId: number) => {
    try {
      await assignStall.mutateAsync({ stallId, vendorId });
      toast({
        title: "Success",
        description: "Stall assigned successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to assign stall",
        variant: "destructive",
      });
    }
  };

  const handleReleaseStall = async (stallId: number) => {
    if (window.confirm("Are you sure you want to release this stall?")) {
      try {
        await releaseStall.mutateAsync(stallId);
        toast({
          title: "Success",
          description: "Stall released successfully",
        });
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to release stall",
          variant: "destructive",
        });
      }
    }
  };

  const totalStalls = stalls.length;
  const occupiedStalls = stalls.filter(s => s.isOccupied).length;
  const vacantStalls = totalStalls - occupiedStalls;
  const totalRent = stalls.filter(s => s.isOccupied).reduce((sum, stall) => sum + stall.monthlyRent, 0);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="h-8 bg-slate-200 rounded w-48 animate-pulse"></div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-32 bg-slate-200 rounded-xl animate-pulse"></div>
          ))}
        </div>
        <div className="h-96 bg-slate-200 rounded-xl animate-pulse"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Stall Management</h1>
        <p className="text-slate-500">Manage market stalls and vendor assignments</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Total Stalls</p>
                <p className="text-2xl font-bold text-slate-900 mt-1">{totalStalls}</p>
              </div>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Building className="text-primary" size={20} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Occupied Stalls</p>
                <p className="text-2xl font-bold text-slate-900 mt-1">{occupiedStalls}</p>
                <p className="text-sm text-success flex items-center gap-1 mt-2">
                  <UserCheck size={12} />
                  Active vendors
                </p>
              </div>
              <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center">
                <UserCheck className="text-success" size={20} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Vacant Stalls</p>
                <p className="text-2xl font-bold text-slate-900 mt-1">{vacantStalls}</p>
                <p className="text-sm text-warning flex items-center gap-1 mt-2">
                  <UserX size={12} />
                  Available
                </p>
              </div>
              <div className="w-12 h-12 bg-warning/10 rounded-lg flex items-center justify-center">
                <MapPin className="text-warning" size={20} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Monthly Rent</p>
                <p className="text-2xl font-bold text-slate-900 mt-1">₹{totalRent.toLocaleString()}</p>
                <p className="text-sm text-secondary flex items-center gap-1 mt-2">
                  <Users size={12} />
                  From occupied stalls
                </p>
              </div>
              <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center">
                <Users className="text-secondary" size={20} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <CardTitle>Stall Overview ({stalls.length} stalls)</CardTitle>
            <div className="flex flex-col md:flex-row gap-3">
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={16} />
                <Input
                  placeholder="Search stalls..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={sectionFilter} onValueChange={setSectionFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="All Sections" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Sections</SelectItem>
                  {sections.map((section) => (
                    <SelectItem key={section} value={section.toLowerCase()}>
                      {section}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-36">
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="occupied">Occupied</SelectItem>
                  <SelectItem value="vacant">Vacant</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {filteredStalls.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-slate-500">
                {searchTerm || sectionFilter !== "all" || statusFilter !== "all" 
                  ? "No stalls found matching your filters." 
                  : "No stalls available."}
              </p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Stall Number</TableHead>
                  <TableHead>Section</TableHead>
                  <TableHead>Monthly Rent</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Assigned Vendor</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStalls.map((stall) => (
                  <TableRow key={stall.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <MapPin size={16} className="text-slate-400" />
                        Stall {stall.stallNumber}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">
                        {stall.section}
                      </Badge>
                    </TableCell>
                    <TableCell>₹{stall.monthlyRent.toLocaleString()}</TableCell>
                    <TableCell>
                      <Badge variant={stall.isOccupied ? "default" : "secondary"}>
                        {stall.isOccupied ? "Occupied" : "Vacant"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {stall.isOccupied ? (
                        <span className="text-slate-900">
                          {getVendorName(stall.vendorId) || "Unknown vendor"}
                        </span>
                      ) : (
                        <span className="text-slate-400">No vendor assigned</span>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        {stall.isOccupied ? (
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleReleaseStall(stall.id)}
                            disabled={releaseStall.isPending}
                          >
                            <UserX size={14} className="mr-1" />
                            Release
                          </Button>
                        ) : (
                          <Select onValueChange={(vendorId) => handleAssignStall(stall.id, parseInt(vendorId))}>
                            <SelectTrigger className="w-32 h-8">
                              <SelectValue placeholder="Assign" />
                            </SelectTrigger>
                            <SelectContent>
                              {availableVendors.length === 0 ? (
                                <SelectItem value="none" disabled>
                                  No vendors available
                                </SelectItem>
                              ) : (
                                availableVendors.map((vendor) => (
                                  <SelectItem key={vendor.id} value={vendor.id.toString()}>
                                    {vendor.name}
                                  </SelectItem>
                                ))
                              )}
                            </SelectContent>
                          </Select>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
