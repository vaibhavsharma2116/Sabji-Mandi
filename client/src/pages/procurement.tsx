import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Plus, Truck, Package, Users, FileText, AlertCircle, CheckCircle, Clock } from "lucide-react";

// Mock data for demonstration
const suppliers = [
  {
    id: 1,
    name: "Fresh Farm Supplies",
    contactPerson: "Rajesh Kumar",
    phone: "+91 98765 43210",
    email: "rajesh@freshfarm.com",
    supplierType: "farmer",
    paymentTerms: "cash",
    isActive: true,
    totalOrders: 25,
    totalValue: 125000
  },
  {
    id: 2,
    name: "Wholesale Veggie Hub",
    contactPerson: "Priya Sharma",
    phone: "+91 87654 32109",
    email: "priya@veggiehub.com",
    supplierType: "wholesaler",
    paymentTerms: "credit_15",
    isActive: true,
    totalOrders: 18,
    totalValue: 89000
  },
  {
    id: 3,
    name: "Metro Distributors",
    contactPerson: "Amit Singh",
    phone: "+91 76543 21098",
    email: "amit@metrodist.com",
    supplierType: "distributor",
    paymentTerms: "credit_30",
    isActive: true,
    totalOrders: 12,
    totalValue: 156000
  }
];

const purchaseOrders = [
  {
    id: 1,
    orderNumber: "PO-2024-001",
    supplier: "Fresh Farm Supplies",
    orderDate: "2024-01-15",
    expectedDelivery: "2024-01-17",
    status: "pending",
    totalAmount: 15000,
    items: 5
  },
  {
    id: 2,
    orderNumber: "PO-2024-002",
    supplier: "Wholesale Veggie Hub",
    orderDate: "2024-01-14",
    expectedDelivery: "2024-01-16",
    status: "delivered",
    totalAmount: 8500,
    items: 3
  },
  {
    id: 3,
    orderNumber: "PO-2024-003",
    supplier: "Metro Distributors",
    orderDate: "2024-01-13",
    expectedDelivery: "2024-01-15",
    status: "confirmed",
    totalAmount: 22000,
    items: 8
  }
];

const qualityChecks = [
  {
    id: 1,
    productName: "Tomatoes",
    supplier: "Fresh Farm Supplies",
    checkDate: "2024-01-15",
    qualityGrade: "A",
    freshness: 9,
    appearance: 8,
    overallScore: 8.5,
    approved: true,
    checkedBy: "Quality Inspector"
  },
  {
    id: 2,
    productName: "Onions",
    supplier: "Wholesale Veggie Hub",
    checkDate: "2024-01-14",
    qualityGrade: "B",
    freshness: 7,
    appearance: 7,
    overallScore: 7.0,
    approved: true,
    checkedBy: "Quality Inspector"
  },
  {
    id: 3,
    productName: "Potatoes",
    supplier: "Metro Distributors",
    checkDate: "2024-01-13",
    qualityGrade: "C",
    freshness: 5,
    appearance: 6,
    overallScore: 5.5,
    approved: false,
    checkedBy: "Quality Inspector"
  }
];

export default function Procurement() {
  const [searchTerm, setSearchTerm] = useState("");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "warning";
      case "confirmed": return "default";
      case "delivered": return "success";
      case "cancelled": return "destructive";
      default: return "secondary";
    }
  };

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case "A": return "success";
      case "B": return "warning";
      case "C": return "destructive";
      default: return "secondary";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Procurement Management</h1>
          <p className="text-slate-500">Manage suppliers, purchase orders and quality control</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <FileText size={16} className="mr-2" />
            Export Report
          </Button>
          <Button>
            <Plus size={16} className="mr-2" />
            New Purchase Order
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Active Suppliers</p>
                <p className="text-2xl font-bold text-slate-900 mt-1">{suppliers.length}</p>
                <p className="text-sm text-success flex items-center gap-1 mt-2">
                  <CheckCircle size={12} />
                  All verified
                </p>
              </div>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Users className="text-primary" size={20} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Purchase Orders</p>
                <p className="text-2xl font-bold text-slate-900 mt-1">{purchaseOrders.length}</p>
                <p className="text-sm text-warning flex items-center gap-1 mt-2">
                  <Clock size={12} />
                  {purchaseOrders.filter(po => po.status === "pending").length} pending
                </p>
              </div>
              <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center">
                <FileText className="text-secondary" size={20} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Quality Checks</p>
                <p className="text-2xl font-bold text-slate-900 mt-1">{qualityChecks.length}</p>
                <p className="text-sm text-destructive flex items-center gap-1 mt-2">
                  <AlertCircle size={12} />
                  {qualityChecks.filter(qc => !qc.approved).length} failed
                </p>
              </div>
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                <Package className="text-accent" size={20} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Total Procurement</p>
                <p className="text-2xl font-bold text-slate-900 mt-1">₹3.7L</p>
                <p className="text-sm text-success flex items-center gap-1 mt-2">
                  <Truck size={12} />
                  This month
                </p>
              </div>
              <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center">
                <Truck className="text-success" size={20} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="suppliers" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="suppliers">Suppliers</TabsTrigger>
          <TabsTrigger value="orders">Purchase Orders</TabsTrigger>
          <TabsTrigger value="quality">Quality Control</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="suppliers">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Supplier Directory</CardTitle>
                <div className="flex items-center gap-3">
                  <div className="relative w-64">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={16} />
                    <Input
                      placeholder="Search suppliers..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Button size="sm">
                    <Plus size={16} className="mr-2" />
                    Add Supplier
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Supplier Details</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Payment Terms</TableHead>
                    <TableHead>Performance</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {suppliers.map((supplier) => (
                    <TableRow key={supplier.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{supplier.name}</p>
                          <p className="text-sm text-slate-500">{supplier.contactPerson}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="text-sm">{supplier.phone}</p>
                          <p className="text-sm text-slate-500">{supplier.email}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="capitalize">
                          {supplier.supplierType}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="capitalize">
                          {supplier.paymentTerms.replace("_", " ")}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="text-sm font-medium">{supplier.totalOrders} orders</p>
                          <p className="text-sm text-slate-500">₹{supplier.totalValue.toLocaleString()}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={supplier.isActive ? "default" : "secondary"}>
                          {supplier.isActive ? "Active" : "Inactive"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">View</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="orders">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Purchase Orders</CardTitle>
                <Button size="sm">
                  <Plus size={16} className="mr-2" />
                  Create Order
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order Number</TableHead>
                    <TableHead>Supplier</TableHead>
                    <TableHead>Order Date</TableHead>
                    <TableHead>Expected Delivery</TableHead>
                    <TableHead>Items</TableHead>
                    <TableHead>Total Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {purchaseOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.orderNumber}</TableCell>
                      <TableCell>{order.supplier}</TableCell>
                      <TableCell>{order.orderDate}</TableCell>
                      <TableCell>{order.expectedDelivery}</TableCell>
                      <TableCell>{order.items} items</TableCell>
                      <TableCell>₹{order.totalAmount.toLocaleString()}</TableCell>
                      <TableCell>
                        <Badge variant={getStatusColor(order.status) as any}>
                          {order.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">View</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="quality">
          <Card>
            <CardHeader>
              <CardTitle>Quality Control Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead>Supplier</TableHead>
                    <TableHead>Check Date</TableHead>
                    <TableHead>Grade</TableHead>
                    <TableHead>Freshness</TableHead>
                    <TableHead>Appearance</TableHead>
                    <TableHead>Overall Score</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Checked By</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {qualityChecks.map((check) => (
                    <TableRow key={check.id}>
                      <TableCell className="font-medium">{check.productName}</TableCell>
                      <TableCell>{check.supplier}</TableCell>
                      <TableCell>{check.checkDate}</TableCell>
                      <TableCell>
                        <Badge variant={getGradeColor(check.qualityGrade) as any}>
                          Grade {check.qualityGrade}
                        </Badge>
                      </TableCell>
                      <TableCell>{check.freshness}/10</TableCell>
                      <TableCell>{check.appearance}/10</TableCell>
                      <TableCell className="font-medium">{check.overallScore}/10</TableCell>
                      <TableCell>
                        <Badge variant={check.approved ? "default" : "destructive"}>
                          {check.approved ? "Approved" : "Rejected"}
                        </Badge>
                      </TableCell>
                      <TableCell>{check.checkedBy}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Supplier Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {suppliers.map((supplier) => (
                    <div key={supplier.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">{supplier.name}</p>
                        <p className="text-sm text-slate-500">{supplier.totalOrders} orders</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">₹{supplier.totalValue.toLocaleString()}</p>
                        <p className="text-sm text-success">95% on-time</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quality Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">Average Quality Score</p>
                      <p className="text-sm text-slate-500">Last 30 days</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-success">7.0/10</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">Approval Rate</p>
                      <p className="text-sm text-slate-500">Quality checks passed</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-success">67%</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">Grade A Products</p>
                      <p className="text-sm text-slate-500">Premium quality</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-primary">33%</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}