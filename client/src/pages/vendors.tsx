import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Plus, Edit, Trash2, Phone, Store } from "lucide-react";
import { useVendors } from "@/hooks/use-vendors";
import AddVendorModal from "@/components/modals/add-vendor-modal";
import { useToast } from "@/hooks/use-toast";

export default function Vendors() {
  const [searchTerm, setSearchTerm] = useState("");
  const [addVendorOpen, setAddVendorOpen] = useState(false);
  const { data: vendors = [], isLoading, deleteVendor } = useVendors();
  const { toast } = useToast();

  const filteredVendors = vendors.filter(vendor =>
    vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vendor.phone.includes(searchTerm) ||
    vendor.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteVendor = async (id: number, name: string) => {
    if (window.confirm(`Are you sure you want to delete vendor "${name}"?`)) {
      try {
        await deleteVendor.mutateAsync(id);
        toast({
          title: "Success",
          description: "Vendor deleted successfully",
        });
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to delete vendor",
          variant: "destructive",
        });
      }
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="h-8 bg-slate-200 rounded w-48 animate-pulse"></div>
        <div className="h-96 bg-slate-200 rounded-xl animate-pulse"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Vendors</h1>
          <p className="text-slate-500">Manage market vendors and their information</p>
        </div>
        <Button onClick={() => setAddVendorOpen(true)}>
          <Plus size={16} className="mr-2" />
          Add Vendor
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>All Vendors ({vendors.length})</CardTitle>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={16} />
              <Input
                placeholder="Search vendors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {filteredVendors.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-slate-500">
                {searchTerm ? "No vendors found matching your search." : "No vendors available."}
              </p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Stall</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredVendors.map((vendor) => (
                  <TableRow key={vendor.id}>
                    <TableCell className="font-medium">{vendor.name}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Phone size={14} className="text-slate-400" />
                        {vendor.phone}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="capitalize">
                        {vendor.category}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {vendor.stallNumber ? (
                        <div className="flex items-center gap-2">
                          <Store size={14} className="text-slate-400" />
                          Stall {vendor.stallNumber}
                        </div>
                      ) : (
                        <span className="text-slate-400">No stall assigned</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge variant={vendor.isActive ? "default" : "secondary"}>
                        {vendor.isActive ? "Active" : "Inactive"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="ghost" size="sm">
                          <Edit size={14} />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleDeleteVendor(vendor.id, vendor.name)}
                          disabled={deleteVendor.isPending}
                        >
                          <Trash2 size={14} />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <AddVendorModal open={addVendorOpen} onOpenChange={setAddVendorOpen} />
    </div>
  );
}
