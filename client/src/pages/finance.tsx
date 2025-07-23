import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Plus, CreditCard, TrendingUp, TrendingDown, DollarSign, FileText, Calendar } from "lucide-react";

// Mock data for demonstration
const payments = [
  {
    id: 1,
    paymentNumber: "PAY-2024-001",
    type: "purchase_payment",
    entityName: "Fresh Farm Supplies",
    amount: 15000,
    paymentMethod: "bank_transfer",
    paymentDate: "2024-01-15",
    status: "completed",
    description: "Payment for vegetables purchase"
  },
  {
    id: 2,
    paymentNumber: "PAY-2024-002",
    type: "vendor_payment",
    entityName: "Rajesh Kumar (Vendor)",
    amount: 8500,
    paymentMethod: "cash",
    paymentDate: "2024-01-14",
    status: "completed",
    description: "Monthly stall rent payment"
  },
  {
    id: 3,
    paymentNumber: "PAY-2024-003",
    type: "expense",
    entityName: "Electricity Board",
    amount: 2200,
    paymentMethod: "upi",
    paymentDate: "2024-01-13",
    status: "pending",
    description: "Monthly electricity bill"
  }
];

const expenses = [
  {
    id: 1,
    category: "utilities",
    subcategory: "electricity",
    amount: 2200,
    description: "Monthly electricity bill",
    expenseDate: "2024-01-15",
    paymentMethod: "upi",
    vendor: "Electricity Board",
    createdBy: "Admin"
  },
  {
    id: 2,
    category: "transport",
    subcategory: "fuel",
    amount: 1800,
    description: "Fuel for delivery vehicles",
    expenseDate: "2024-01-14",
    paymentMethod: "cash",
    vendor: "Petrol Pump",
    createdBy: "Manager"
  },
  {
    id: 3,
    category: "maintenance",
    subcategory: "cleaning",
    amount: 800,
    description: "Market cleaning supplies",
    expenseDate: "2024-01-13",
    paymentMethod: "cash",
    vendor: "Clean Solutions",
    createdBy: "Supervisor"
  }
];

const financialSummary = {
  totalRevenue: 245000,
  totalExpenses: 89000,
  netProfit: 156000,
  pendingPayments: 12500,
  monthlyGrowth: 8.5
};

export default function Finance() {
  const [searchTerm, setSearchTerm] = useState("");

  const getPaymentTypeColor = (type: string) => {
    switch (type) {
      case "purchase_payment": return "destructive";
      case "vendor_payment": return "warning";
      case "expense": return "secondary";
      case "income": return "success";
      default: return "default";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "success";
      case "pending": return "warning";
      case "failed": return "destructive";
      default: return "secondary";
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "utilities": return "primary";
      case "transport": return "secondary";
      case "maintenance": return "accent";
      case "staff": return "warning";
      case "marketing": return "success";
      default: return "default";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Finance Management</h1>
          <p className="text-slate-500">Track payments, expenses and financial reports</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <FileText size={16} className="mr-2" />
            Financial Report
          </Button>
          <Button>
            <Plus size={16} className="mr-2" />
            Record Payment
          </Button>
        </div>
      </div>

      {/* Financial Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Total Revenue</p>
                <p className="text-2xl font-bold text-slate-900 mt-1">₹{financialSummary.totalRevenue.toLocaleString()}</p>
                <p className="text-sm text-success flex items-center gap-1 mt-2">
                  <TrendingUp size={12} />
                  +{financialSummary.monthlyGrowth}% this month
                </p>
              </div>
              <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center">
                <TrendingUp className="text-success" size={20} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Total Expenses</p>
                <p className="text-2xl font-bold text-slate-900 mt-1">₹{financialSummary.totalExpenses.toLocaleString()}</p>
                <p className="text-sm text-destructive flex items-center gap-1 mt-2">
                  <TrendingDown size={12} />
                  Monthly outflow
                </p>
              </div>
              <div className="w-12 h-12 bg-destructive/10 rounded-lg flex items-center justify-center">
                <TrendingDown className="text-destructive" size={20} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Net Profit</p>
                <p className="text-2xl font-bold text-slate-900 mt-1">₹{financialSummary.netProfit.toLocaleString()}</p>
                <p className="text-sm text-success flex items-center gap-1 mt-2">
                  <DollarSign size={12} />
                  {((financialSummary.netProfit / financialSummary.totalRevenue) * 100).toFixed(1)}% margin
                </p>
              </div>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <DollarSign className="text-primary" size={20} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Pending Payments</p>
                <p className="text-2xl font-bold text-slate-900 mt-1">₹{financialSummary.pendingPayments.toLocaleString()}</p>
                <p className="text-sm text-warning flex items-center gap-1 mt-2">
                  <Calendar size={12} />
                  {payments.filter(p => p.status === "pending").length} pending
                </p>
              </div>
              <div className="w-12 h-12 bg-warning/10 rounded-lg flex items-center justify-center">
                <CreditCard className="text-warning" size={20} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Cash Flow</p>
                <p className="text-2xl font-bold text-slate-900 mt-1">+₹1.56L</p>
                <p className="text-sm text-success flex items-center gap-1 mt-2">
                  <TrendingUp size={12} />
                  Positive flow
                </p>
              </div>
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                <TrendingUp className="text-accent" size={20} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="payments" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="payments">Payments</TabsTrigger>
          <TabsTrigger value="expenses">Expenses</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="payments">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Payment Records</CardTitle>
                <div className="flex items-center gap-3">
                  <div className="relative w-64">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={16} />
                    <Input
                      placeholder="Search payments..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Button size="sm">
                    <Plus size={16} className="mr-2" />
                    Add Payment
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Payment ID</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Entity</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Payment Method</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {payments.map((payment) => (
                    <TableRow key={payment.id}>
                      <TableCell className="font-medium">{payment.paymentNumber}</TableCell>
                      <TableCell>
                        <Badge variant={getPaymentTypeColor(payment.type) as any}>
                          {payment.type.replace("_", " ")}
                        </Badge>
                      </TableCell>
                      <TableCell>{payment.entityName}</TableCell>
                      <TableCell className="font-semibold">₹{payment.amount.toLocaleString()}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="capitalize">
                          {payment.paymentMethod.replace("_", " ")}
                        </Badge>
                      </TableCell>
                      <TableCell>{payment.paymentDate}</TableCell>
                      <TableCell>
                        <Badge variant={getStatusColor(payment.status) as any}>
                          {payment.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="max-w-xs truncate">
                        {payment.description}
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

        <TabsContent value="expenses">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Expense Tracking</CardTitle>
                <Button size="sm">
                  <Plus size={16} className="mr-2" />
                  Add Expense
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Category</TableHead>
                    <TableHead>Subcategory</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Payment Method</TableHead>
                    <TableHead>Vendor</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Created By</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {expenses.map((expense) => (
                    <TableRow key={expense.id}>
                      <TableCell>
                        <Badge variant={getCategoryColor(expense.category) as any}>
                          {expense.category}
                        </Badge>
                      </TableCell>
                      <TableCell className="capitalize">{expense.subcategory}</TableCell>
                      <TableCell className="max-w-xs truncate">{expense.description}</TableCell>
                      <TableCell className="font-semibold">₹{expense.amount.toLocaleString()}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="capitalize">
                          {expense.paymentMethod.replace("_", " ")}
                        </Badge>
                      </TableCell>
                      <TableCell>{expense.vendor}</TableCell>
                      <TableCell>{expense.expenseDate}</TableCell>
                      <TableCell>{expense.createdBy}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">Edit</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Financial Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium text-success">Total Income</p>
                      <p className="text-sm text-slate-500">Sales + Other revenue</p>
                    </div>
                    <p className="text-xl font-bold text-success">₹2,45,000</p>
                  </div>
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium text-destructive">Total Expenses</p>
                      <p className="text-sm text-slate-500">All categories</p>
                    </div>
                    <p className="text-xl font-bold text-destructive">₹89,000</p>
                  </div>
                  <div className="flex items-center justify-between p-4 border rounded-lg bg-primary/5">
                    <div>
                      <p className="font-medium text-primary">Net Profit</p>
                      <p className="text-sm text-slate-500">Income - Expenses</p>
                    </div>
                    <p className="text-2xl font-bold text-primary">₹1,56,000</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Expense Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-primary rounded-full"></div>
                      <span className="text-sm">Utilities</span>
                    </div>
                    <span className="text-sm font-medium">₹25,000 (28%)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-secondary rounded-full"></div>
                      <span className="text-sm">Transport</span>
                    </div>
                    <span className="text-sm font-medium">₹20,000 (22%)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-accent rounded-full"></div>
                      <span className="text-sm">Maintenance</span>
                    </div>
                    <span className="text-sm font-medium">₹18,000 (20%)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-warning rounded-full"></div>
                      <span className="text-sm">Staff</span>
                    </div>
                    <span className="text-sm font-medium">₹15,000 (17%)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-success rounded-full"></div>
                      <span className="text-sm">Marketing</span>
                    </div>
                    <span className="text-sm font-medium">₹11,000 (12%)</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analytics">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Payment Methods Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">Cash Payments</p>
                      <p className="text-sm text-slate-500">Direct cash transactions</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">45%</p>
                      <p className="text-sm text-slate-500">₹1,10,250</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">Bank Transfer</p>
                      <p className="text-sm text-slate-500">Electronic transfers</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">35%</p>
                      <p className="text-sm text-slate-500">₹85,750</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">UPI Payments</p>
                      <p className="text-sm text-slate-500">Digital payments</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">20%</p>
                      <p className="text-sm text-slate-500">₹49,000</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Cash Flow Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 border rounded-lg bg-success/5">
                    <div>
                      <p className="font-medium text-success">This Month</p>
                      <p className="text-sm text-slate-500">Net cash flow</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold text-success">+₹1,56,000</p>
                      <p className="text-sm text-success">+8.5% growth</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">Last Month</p>
                      <p className="text-sm text-slate-500">Previous period</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold">+₹1,44,000</p>
                      <p className="text-sm text-slate-500">+2.1% growth</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">Average Monthly</p>
                      <p className="text-sm text-slate-500">Last 6 months</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold">+₹1,38,500</p>
                      <p className="text-sm text-primary">Consistent growth</p>
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