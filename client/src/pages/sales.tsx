import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Plus, Calendar, TrendingUp, IndianRupee } from "lucide-react";
import { useSales, useTodaySales } from "@/hooks/use-sales";
import { useProducts } from "@/hooks/use-products";
import { useVendors } from "@/hooks/use-vendors";
import RecordSaleModal from "@/components/modals/record-sale-modal";
import { format } from "date-fns";

export default function Sales() {
  const [searchTerm, setSearchTerm] = useState("");
  const [recordSaleOpen, setRecordSaleOpen] = useState(false);
  const { data: sales = [], isLoading } = useSales();
  const { data: todaySales = [] } = useTodaySales();
  const { data: products = [] } = useProducts();
  const { data: vendors = [] } = useVendors();

  const filteredSales = sales.filter(sale => {
    const product = products.find(p => p.id === sale.productId);
    const vendor = vendors.find(v => v.id === sale.vendorId);
    return (
      product?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vendor?.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const getProductName = (productId: number) => {
    const product = products.find(p => p.id === productId);
    return product?.name || "Unknown product";
  };

  const getVendorName = (vendorId: number) => {
    const vendor = vendors.find(v => v.id === vendorId);
    return vendor?.name || "Unknown vendor";
  };

  const todayRevenue = todaySales.reduce((sum, sale) => sum + sale.totalAmount, 0);
  const todayQuantity = todaySales.reduce((sum, sale) => sum + sale.quantity, 0);
  const totalRevenue = sales.reduce((sum, sale) => sum + sale.totalAmount, 0);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="h-8 bg-slate-200 rounded w-48 animate-pulse"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-32 bg-slate-200 rounded-xl animate-pulse"></div>
          ))}
        </div>
        <div className="h-96 bg-slate-200 rounded-xl animate-pulse"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Sales Management</h1>
          <p className="text-slate-500">Track and record sales transactions</p>
        </div>
        <Button onClick={() => setRecordSaleOpen(true)}>
          <Plus size={16} className="mr-2" />
          Record Sale
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Today's Revenue</p>
                <p className="text-2xl font-bold text-slate-900 mt-1">₹{todayRevenue.toLocaleString()}</p>
                <p className="text-sm text-success flex items-center gap-1 mt-2">
                  <TrendingUp size={12} />
                  {todaySales.length} transactions
                </p>
              </div>
              <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center">
                <IndianRupee className="text-success" size={20} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Today's Quantity</p>
                <p className="text-2xl font-bold text-slate-900 mt-1">{todayQuantity}kg</p>
                <p className="text-sm text-primary flex items-center gap-1 mt-2">
                  <Calendar size={12} />
                  Products sold
                </p>
              </div>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Calendar className="text-primary" size={20} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Total Revenue</p>
                <p className="text-2xl font-bold text-slate-900 mt-1">₹{totalRevenue.toLocaleString()}</p>
                <p className="text-sm text-secondary flex items-center gap-1 mt-2">
                  <TrendingUp size={12} />
                  All time
                </p>
              </div>
              <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center">
                <TrendingUp className="text-secondary" size={20} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Sales History ({sales.length} transactions)</CardTitle>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={16} />
              <Input
                placeholder="Search sales..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {filteredSales.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-slate-500">
                {searchTerm ? "No sales found matching your search." : "No sales recorded yet."}
              </p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date & Time</TableHead>
                  <TableHead>Product</TableHead>
                  <TableHead>Vendor</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Price/Kg</TableHead>
                  <TableHead>Total Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSales.map((sale) => (
                  <TableRow key={sale.id}>
                    <TableCell>
                      {sale.saleDate && format(new Date(sale.saleDate), "MMM dd, yyyy HH:mm")}
                    </TableCell>
                    <TableCell className="font-medium">
                      {getProductName(sale.productId)}
                    </TableCell>
                    <TableCell>{getVendorName(sale.vendorId)}</TableCell>
                    <TableCell>{sale.quantity}kg</TableCell>
                    <TableCell>₹{sale.pricePerKg}</TableCell>
                    <TableCell className="font-semibold">
                      ₹{sale.totalAmount.toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <RecordSaleModal open={recordSaleOpen} onOpenChange={setRecordSaleOpen} />
    </div>
  );
}
