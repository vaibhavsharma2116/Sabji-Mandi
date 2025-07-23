import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, AlertTriangle, Package, TrendingDown } from "lucide-react";
import { useProducts } from "@/hooks/use-products";
import { useVendors } from "@/hooks/use-vendors";

export default function Inventory() {
  const [searchTerm, setSearchTerm] = useState("");
  const { data: products = [], isLoading } = useProducts();
  const { data: vendors = [] } = useVendors();

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getVendorName = (vendorId: number | null) => {
    if (!vendorId) return "No vendor";
    const vendor = vendors.find(v => v.id === vendorId);
    return vendor?.name || "Unknown vendor";
  };

  const isLowStock = (product: any) => {
    return (product.quantityInStock || 0) <= (product.lowStockThreshold || 10);
  };

  const isOutOfStock = (product: any) => {
    return (product.quantityInStock || 0) === 0;
  };

  const lowStockProducts = products.filter(isLowStock);
  const outOfStockProducts = products.filter(isOutOfStock);
  const totalValue = products.reduce((sum, product) => 
    sum + (product.quantityInStock || 0) * product.pricePerKg, 0
  );

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
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Inventory Management</h1>
        <p className="text-slate-500">Monitor stock levels and inventory value</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Total Products</p>
                <p className="text-2xl font-bold text-slate-900 mt-1">{products.length}</p>
              </div>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Package className="text-primary" size={20} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Low Stock Items</p>
                <p className="text-2xl font-bold text-slate-900 mt-1">{lowStockProducts.length}</p>
                <p className="text-sm text-warning flex items-center gap-1 mt-2">
                  <AlertTriangle size={12} />
                  Requires attention
                </p>
              </div>
              <div className="w-12 h-12 bg-warning/10 rounded-lg flex items-center justify-center">
                <AlertTriangle className="text-warning" size={20} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Out of Stock</p>
                <p className="text-2xl font-bold text-slate-900 mt-1">{outOfStockProducts.length}</p>
                <p className="text-sm text-destructive flex items-center gap-1 mt-2">
                  <TrendingDown size={12} />
                  Critical
                </p>
              </div>
              <div className="w-12 h-12 bg-destructive/10 rounded-lg flex items-center justify-center">
                <TrendingDown className="text-destructive" size={20} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Inventory Overview</CardTitle>
            <div className="flex items-center gap-4">
              <div className="text-sm">
                <span className="text-slate-600">Total Value: </span>
                <span className="font-semibold">₹{totalValue.toLocaleString()}</span>
              </div>
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={16} />
                <Input
                  placeholder="Search inventory..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {filteredProducts.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-slate-500">
                {searchTerm ? "No products found matching your search." : "No products in inventory."}
              </p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Current Stock</TableHead>
                  <TableHead>Low Stock Alert</TableHead>
                  <TableHead>Price/Kg</TableHead>
                  <TableHead>Stock Value</TableHead>
                  <TableHead>Vendor</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <img 
                          src={product.imageUrl || `https://images.unsplash.com/photo-1592921870789-04563d55041c?ixlib=rb-4.0.3&w=40&h=40&fit=crop`}
                          alt={product.name}
                          className="w-10 h-10 rounded-lg object-cover"
                        />
                        <span className="font-medium">{product.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="capitalize">
                        {product.category}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <span className={isLowStock(product) ? "text-warning font-medium" : ""}>
                        {product.quantityInStock || 0}kg
                      </span>
                    </TableCell>
                    <TableCell>{product.lowStockThreshold || 10}kg</TableCell>
                    <TableCell>₹{product.pricePerKg}</TableCell>
                    <TableCell>
                      ₹{((product.quantityInStock || 0) * product.pricePerKg).toLocaleString()}
                    </TableCell>
                    <TableCell>{getVendorName(product.vendorId)}</TableCell>
                    <TableCell>
                      <Badge variant={
                        isOutOfStock(product) ? "destructive" : 
                        isLowStock(product) ? "secondary" : "default"
                      }>
                        {isOutOfStock(product) ? "Out of Stock" : 
                         isLowStock(product) ? "Low Stock" : "In Stock"}
                      </Badge>
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
