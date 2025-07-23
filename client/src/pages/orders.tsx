import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Plus, ShoppingBag, Truck, Package, MapPin, Clock, CheckCircle, XCircle } from "lucide-react";

// Mock data for demonstration
const orders = [
  {
    id: 1,
    orderNumber: "ORD-2024-001",
    customerName: "Rajesh Restaurant",
    customerPhone: "+91 98765 43210",
    deliveryAddress: "123 Restaurant Street, City",
    orderDate: "2024-01-15T10:30:00",
    deliveryDate: "2024-01-15T18:00:00",
    status: "delivered",
    totalAmount: 2500,
    deliveryCharge: 50,
    discount: 0,
    paymentMethod: "cash_on_delivery",
    paymentStatus: "paid",
    items: 5
  },
  {
    id: 2,
    orderNumber: "ORD-2024-002",
    customerName: "Priya Sharma",
    customerPhone: "+91 87654 32109",
    deliveryAddress: "456 Home Garden, City",
    orderDate: "2024-01-15T12:15:00",
    deliveryDate: "2024-01-15T20:00:00",
    status: "out_for_delivery",
    totalAmount: 850,
    deliveryCharge: 30,
    discount: 50,
    paymentMethod: "upi",
    paymentStatus: "paid",
    items: 3
  },
  {
    id: 3,
    orderNumber: "ORD-2024-003",
    customerName: "Metro Hotel",
    customerPhone: "+91 76543 21098",
    deliveryAddress: "789 Hotel Complex, City",
    orderDate: "2024-01-15T14:45:00",
    deliveryDate: "2024-01-16T08:00:00",
    status: "confirmed",
    totalAmount: 4200,
    deliveryCharge: 100,
    discount: 200,
    paymentMethod: "online",
    paymentStatus: "paid",
    items: 12
  },
  {
    id: 4,
    orderNumber: "ORD-2024-004",
    customerName: "Amit Singh",
    customerPhone: "+91 65432 10987",
    deliveryAddress: "321 Residential Area, City",
    orderDate: "2024-01-15T16:20:00",
    deliveryDate: "2024-01-15T22:00:00",
    status: "pending",
    totalAmount: 650,
    deliveryCharge: 25,
    discount: 0,
    paymentMethod: "cash_on_delivery",
    paymentStatus: "pending",
    items: 2
  }
];

const customers = [
  {
    id: 1,
    name: "Rajesh Restaurant",
    phone: "+91 98765 43210",
    email: "rajesh@restaurant.com",
    address: "123 Restaurant Street, City",
    customerType: "restaurant",
    totalOrders: 45,
    totalPurchases: 125000,
    outstandingAmount: 0,
    isActive: true
  },
  {
    id: 2,
    name: "Priya Sharma",
    phone: "+91 87654 32109",
    email: "priya@email.com",
    address: "456 Home Garden, City",
    customerType: "retail",
    totalOrders: 12,
    totalPurchases: 8500,
    outstandingAmount: 0,
    isActive: true
  },
  {
    id: 3,
    name: "Metro Hotel",
    phone: "+91 76543 21098",
    email: "orders@metrohotel.com",
    address: "789 Hotel Complex, City",
    customerType: "wholesale",
    totalOrders: 28,
    totalPurchases: 89000,
    outstandingAmount: 2500,
    isActive: true
  }
];

export default function Orders() {
  const [searchTerm, setSearchTerm] = useState("");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "warning";
      case "confirmed": return "default";
      case "packed": return "secondary";
      case "out_for_delivery": return "primary";
      case "delivered": return "success";
      case "cancelled": return "destructive";
      default: return "secondary";
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case "paid": return "success";
      case "pending": return "warning";
      case "failed": return "destructive";
      default: return "secondary";
    }
  };

  const getCustomerTypeColor = (type: string) => {
    switch (type) {
      case "retail": return "primary";
      case "wholesale": return "secondary";
      case "restaurant": return "accent";
      case "online": return "success";
      default: return "default";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-IN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Order Management</h1>
          <p className="text-slate-500">Manage customer orders and deliveries</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Truck size={16} className="mr-2" />
            Delivery Report
          </Button>
          <Button>
            <Plus size={16} className="mr-2" />
            New Order
          </Button>
        </div>
      </div>

      {/* Order Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Total Orders</p>
                <p className="text-2xl font-bold text-slate-900 mt-1">{orders.length}</p>
                <p className="text-sm text-primary flex items-center gap-1 mt-2">
                  <ShoppingBag size={12} />
                  Today
                </p>
              </div>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <ShoppingBag className="text-primary" size={20} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Pending</p>
                <p className="text-2xl font-bold text-slate-900 mt-1">
                  {orders.filter(order => order.status === "pending").length}
                </p>
                <p className="text-sm text-warning flex items-center gap-1 mt-2">
                  <Clock size={12} />
                  Awaiting confirmation
                </p>
              </div>
              <div className="w-12 h-12 bg-warning/10 rounded-lg flex items-center justify-center">
                <Clock className="text-warning" size={20} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Out for Delivery</p>
                <p className="text-2xl font-bold text-slate-900 mt-1">
                  {orders.filter(order => order.status === "out_for_delivery").length}
                </p>
                <p className="text-sm text-primary flex items-center gap-1 mt-2">
                  <Truck size={12} />
                  In transit
                </p>
              </div>
              <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center">
                <Truck className="text-secondary" size={20} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Delivered</p>
                <p className="text-2xl font-bold text-slate-900 mt-1">
                  {orders.filter(order => order.status === "delivered").length}
                </p>
                <p className="text-sm text-success flex items-center gap-1 mt-2">
                  <CheckCircle size={12} />
                  Completed
                </p>
              </div>
              <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center">
                <CheckCircle className="text-success" size={20} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Revenue</p>
                <p className="text-2xl font-bold text-slate-900 mt-1">
                  ₹{orders.reduce((sum, order) => sum + order.totalAmount, 0).toLocaleString()}
                </p>
                <p className="text-sm text-success flex items-center gap-1 mt-2">
                  <Package size={12} />
                  Today's total
                </p>
              </div>
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                <Package className="text-accent" size={20} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="orders" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="customers">Customers</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="orders">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Order Management</CardTitle>
                <div className="flex items-center gap-3">
                  <div className="relative w-64">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={16} />
                    <Input
                      placeholder="Search orders..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Button size="sm">
                    <Plus size={16} className="mr-2" />
                    New Order
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order Details</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Order Date</TableHead>
                    <TableHead>Delivery Date</TableHead>
                    <TableHead>Items</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Payment</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{order.orderNumber}</p>
                          <p className="text-sm text-slate-500 flex items-center gap-1">
                            <MapPin size={12} />
                            {order.deliveryAddress.substring(0, 30)}...
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{order.customerName}</p>
                          <p className="text-sm text-slate-500">{order.customerPhone}</p>
                        </div>
                      </TableCell>
                      <TableCell>{formatDate(order.orderDate)}</TableCell>
                      <TableCell>{formatDate(order.deliveryDate)}</TableCell>
                      <TableCell>{order.items} items</TableCell>
                      <TableCell>
                        <div>
                          <p className="font-semibold">₹{order.totalAmount.toLocaleString()}</p>
                          {order.discount > 0 && (
                            <p className="text-sm text-success">-₹{order.discount} discount</p>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <Badge variant={getPaymentStatusColor(order.paymentStatus) as any} className="mb-1">
                            {order.paymentStatus}
                          </Badge>
                          <p className="text-xs text-slate-500 capitalize">
                            {order.paymentMethod.replace("_", " ")}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={getStatusColor(order.status) as any}>
                          {order.status.replace("_", " ")}
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

        <TabsContent value="customers">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Customer Directory</CardTitle>
                <Button size="sm">
                  <Plus size={16} className="mr-2" />
                  Add Customer
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Customer Details</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Orders</TableHead>
                    <TableHead>Total Purchases</TableHead>
                    <TableHead>Outstanding</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {customers.map((customer) => (
                    <TableRow key={customer.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{customer.name}</p>
                          <p className="text-sm text-slate-500">{customer.address.substring(0, 30)}...</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="text-sm">{customer.phone}</p>
                          <p className="text-sm text-slate-500">{customer.email}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={getCustomerTypeColor(customer.customerType) as any} className="capitalize">
                          {customer.customerType}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-medium">{customer.totalOrders}</TableCell>
                      <TableCell className="font-semibold">₹{customer.totalPurchases.toLocaleString()}</TableCell>
                      <TableCell>
                        {customer.outstandingAmount > 0 ? (
                          <span className="font-semibold text-destructive">
                            ₹{customer.outstandingAmount.toLocaleString()}
                          </span>
                        ) : (
                          <span className="text-success">Clear</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <Badge variant={customer.isActive ? "default" : "secondary"}>
                          {customer.isActive ? "Active" : "Inactive"}
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

        <TabsContent value="analytics">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Order Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 border rounded-lg bg-success/5">
                    <div>
                      <p className="font-medium text-success">Today's Orders</p>
                      <p className="text-sm text-slate-500">Total orders received</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-success">{orders.length}</p>
                      <p className="text-sm text-success">+25% vs yesterday</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">Average Order Value</p>
                      <p className="text-sm text-slate-500">Per order amount</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold">
                        ₹{Math.round(orders.reduce((sum, order) => sum + order.totalAmount, 0) / orders.length).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">Delivery Success Rate</p>
                      <p className="text-sm text-slate-500">Orders delivered on time</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold text-success">95%</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Customer Insights</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">Restaurant Orders</p>
                      <p className="text-sm text-slate-500">Business customers</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">60%</p>
                      <p className="text-sm text-slate-500">₹1,25,000</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">Retail Orders</p>
                      <p className="text-sm text-slate-500">Individual customers</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">25%</p>
                      <p className="text-sm text-slate-500">₹8,500</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">Wholesale Orders</p>
                      <p className="text-sm text-slate-500">Bulk purchases</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">15%</p>
                      <p className="text-sm text-slate-500">₹89,000</p>
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