import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Plus, CreditCard, TrendingUp, TrendingDown, DollarSign, FileText, Calendar, BookOpen, Calculator, BarChart3, PieChart } from "lucide-react";

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

// Journal Entries for Double-Entry Accounting
const journalEntries = [
  {
    id: 1,
    entryNumber: "JE-2024-001",
    date: "2024-01-15",
    description: "Cash sales recorded",
    reference: "Sales-001",
    totalDebit: 15000,
    totalCredit: 15000,
    status: "posted",
    createdBy: "Finance Manager",
    accounts: [
      { account: "Cash", accountCode: "1001", debit: 15000, credit: 0 },
      { account: "Sales Revenue", accountCode: "4001", debit: 0, credit: 15000 }
    ]
  },
  {
    id: 2,
    entryNumber: "JE-2024-002", 
    date: "2024-01-14",
    description: "Purchase of vegetables from supplier",
    reference: "PO-2024-001",
    totalDebit: 8500,
    totalCredit: 8500,
    status: "posted",
    createdBy: "Finance Manager",
    accounts: [
      { account: "Inventory", accountCode: "1201", debit: 8500, credit: 0 },
      { account: "Accounts Payable", accountCode: "2001", debit: 0, credit: 8500 }
    ]
  },
  {
    id: 3,
    entryNumber: "JE-2024-003",
    date: "2024-01-13", 
    description: "Payment of electricity bill",
    reference: "UTIL-001",
    totalDebit: 2200,
    totalCredit: 2200,
    status: "draft",
    createdBy: "Admin Manager",
    accounts: [
      { account: "Utilities Expense", accountCode: "5001", debit: 2200, credit: 0 },
      { account: "Cash", accountCode: "1001", debit: 0, credit: 2200 }
    ]
  }
];

// Chart of Accounts
const chartOfAccounts = [
  // Assets
  { code: "1001", name: "Cash", type: "Asset", category: "Current Assets", balance: 145000, parentCode: "1000" },
  { code: "1002", name: "Bank Account", type: "Asset", category: "Current Assets", balance: 89000, parentCode: "1000" },
  { code: "1201", name: "Inventory", type: "Asset", category: "Current Assets", balance: 65000, parentCode: "1200" },
  { code: "1301", name: "Equipment", type: "Asset", category: "Fixed Assets", balance: 120000, parentCode: "1300" },
  { code: "1302", name: "Accumulated Depreciation", type: "Asset", category: "Fixed Assets", balance: -25000, parentCode: "1300" },
  
  // Liabilities
  { code: "2001", name: "Accounts Payable", type: "Liability", category: "Current Liabilities", balance: 32000, parentCode: "2000" },
  { code: "2002", name: "Accrued Expenses", type: "Liability", category: "Current Liabilities", balance: 8500, parentCode: "2000" },
  { code: "2101", name: "Long-term Debt", type: "Liability", category: "Long-term Liabilities", balance: 50000, parentCode: "2100" },
  
  // Equity
  { code: "3001", name: "Owner's Capital", type: "Equity", category: "Owner's Equity", balance: 200000, parentCode: "3000" },
  { code: "3002", name: "Retained Earnings", type: "Equity", category: "Owner's Equity", balance: 103500, parentCode: "3000" },
  
  // Revenue
  { code: "4001", name: "Sales Revenue", type: "Revenue", category: "Operating Revenue", balance: 245000, parentCode: "4000" },
  { code: "4002", name: "Other Income", type: "Revenue", category: "Other Revenue", balance: 5000, parentCode: "4000" },
  
  // Expenses
  { code: "5001", name: "Utilities Expense", type: "Expense", category: "Operating Expenses", balance: 15000, parentCode: "5000" },
  { code: "5002", name: "Rent Expense", type: "Expense", category: "Operating Expenses", balance: 24000, parentCode: "5000" },
  { code: "5003", name: "Salaries Expense", type: "Expense", category: "Operating Expenses", balance: 45000, parentCode: "5000" },
  { code: "5004", name: "Cost of Goods Sold", type: "Expense", category: "Cost of Sales", balance: 98000, parentCode: "5000" }
];

// Trial Balance Data
const trialBalance = chartOfAccounts.map(account => ({
  ...account,
  debit: account.type === "Asset" || account.type === "Expense" ? Math.abs(account.balance) : 0,
  credit: account.type === "Liability" || account.type === "Equity" || account.type === "Revenue" ? Math.abs(account.balance) : 0
}));

// Financial Ratios
const financialRatios = {
  profitability: {
    grossProfitMargin: ((245000 - 98000) / 245000 * 100).toFixed(2),
    netProfitMargin: (156000 / 245000 * 100).toFixed(2),
    returnOnAssets: (156000 / 419000 * 100).toFixed(2),
    returnOnEquity: (156000 / 303500 * 100).toFixed(2)
  },
  liquidity: {
    currentRatio: (299000 / 40500).toFixed(2),
    quickRatio: (234000 / 40500).toFixed(2),
    cashRatio: (234000 / 40500).toFixed(2)
  },
  efficiency: {
    inventoryTurnover: (98000 / 65000).toFixed(2),
    receivablesTurnover: "N/A",
    assetTurnover: (245000 / 419000).toFixed(2)
  }
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
        <TabsList className="grid w-full grid-cols-7">
          <TabsTrigger value="payments">Payments</TabsTrigger>
          <TabsTrigger value="expenses">Expenses</TabsTrigger>
          <TabsTrigger value="journal">Journal</TabsTrigger>
          <TabsTrigger value="ledger">Ledger</TabsTrigger>
          <TabsTrigger value="trial-balance">Trial Balance</TabsTrigger>
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
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 size={20} />
                  Balance Sheet Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium text-primary">Total Assets</p>
                      <p className="text-sm text-slate-500">Current + Fixed Assets</p>
                    </div>
                    <p className="text-xl font-bold text-primary">₹4,19,000</p>
                  </div>
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium text-warning">Total Liabilities</p>
                      <p className="text-sm text-slate-500">Current + Long-term</p>
                    </div>
                    <p className="text-xl font-bold text-warning">₹90,500</p>
                  </div>
                  <div className="flex items-center justify-between p-4 border rounded-lg bg-success/5">
                    <div>
                      <p className="font-medium text-success">Owner's Equity</p>
                      <p className="text-sm text-slate-500">Capital + Retained Earnings</p>
                    </div>
                    <p className="text-2xl font-bold text-success">₹3,28,500</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart size={20} />
                  Financial Ratios
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-sm mb-2">Profitability Ratios</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">Gross Profit Margin</span>
                        <span className="text-sm font-medium">{financialRatios.profitability.grossProfitMargin}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Net Profit Margin</span>
                        <span className="text-sm font-medium">{financialRatios.profitability.netProfitMargin}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Return on Assets</span>
                        <span className="text-sm font-medium">{financialRatios.profitability.returnOnAssets}%</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm mb-2">Liquidity Ratios</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">Current Ratio</span>
                        <span className="text-sm font-medium">{financialRatios.liquidity.currentRatio}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Quick Ratio</span>
                        <span className="text-sm font-medium">{financialRatios.liquidity.quickRatio}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Income Statement Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium text-success">Total Revenue</p>
                      <p className="text-sm text-slate-500">Sales + Other Income</p>
                    </div>
                    <p className="text-xl font-bold text-success">₹2,50,000</p>
                  </div>
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium text-destructive">Cost of Goods Sold</p>
                      <p className="text-sm text-slate-500">Direct costs</p>
                    </div>
                    <p className="text-xl font-bold text-destructive">₹98,000</p>
                  </div>
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium text-primary">Gross Profit</p>
                      <p className="text-sm text-slate-500">Revenue - COGS</p>
                    </div>
                    <p className="text-xl font-bold text-primary">₹1,52,000</p>
                  </div>
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium text-warning">Operating Expenses</p>
                      <p className="text-sm text-slate-500">Salaries + Utilities + Rent</p>
                    </div>
                    <p className="text-xl font-bold text-warning">₹84,000</p>
                  </div>
                  <div className="flex items-center justify-between p-4 border rounded-lg bg-success/5">
                    <div>
                      <p className="font-medium text-success">Net Income</p>
                      <p className="text-sm text-slate-500">After all expenses</p>
                    </div>
                    <p className="text-2xl font-bold text-success">₹68,000</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Cash Flow Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium text-success">Operating Cash Flow</p>
                      <p className="text-sm text-slate-500">From operations</p>
                    </div>
                    <p className="text-xl font-bold text-success">₹1,25,000</p>
                  </div>
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium text-warning">Investing Cash Flow</p>
                      <p className="text-sm text-slate-500">Equipment purchases</p>
                    </div>
                    <p className="text-xl font-bold text-warning">-₹15,000</p>
                  </div>
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium text-primary">Financing Cash Flow</p>
                      <p className="text-sm text-slate-500">Loans & capital</p>
                    </div>
                    <p className="text-xl font-bold text-primary">₹25,000</p>
                  </div>
                  <div className="flex items-center justify-between p-4 border rounded-lg bg-primary/5">
                    <div>
                      <p className="font-medium text-primary">Net Cash Flow</p>
                      <p className="text-sm text-slate-500">Total change</p>
                    </div>
                    <p className="text-2xl font-bold text-primary">₹1,35,000</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="journal">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <BookOpen size={20} />
                  Journal Entries
                </CardTitle>
                <div className="flex items-center gap-3">
                  <Select defaultValue="all">
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="posted">Posted</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button size="sm">
                    <Plus size={16} className="mr-2" />
                    New Entry
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Entry Number</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Reference</TableHead>
                    <TableHead>Total Debit</TableHead>
                    <TableHead>Total Credit</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Created By</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {journalEntries.map((entry) => (
                    <TableRow key={entry.id}>
                      <TableCell className="font-medium">{entry.entryNumber}</TableCell>
                      <TableCell>{entry.date}</TableCell>
                      <TableCell className="max-w-xs truncate">{entry.description}</TableCell>
                      <TableCell>{entry.reference}</TableCell>
                      <TableCell className="font-semibold">₹{entry.totalDebit.toLocaleString()}</TableCell>
                      <TableCell className="font-semibold">₹{entry.totalCredit.toLocaleString()}</TableCell>
                      <TableCell>
                        <Badge variant={entry.status === "posted" ? "success" : "warning" as any}>
                          {entry.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{entry.createdBy}</TableCell>
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

        <TabsContent value="ledger">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <BookOpen size={20} />
                  General Ledger
                </CardTitle>
                <div className="flex items-center gap-3">
                  <Select defaultValue="all">
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Select Account" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Accounts</SelectItem>
                      {chartOfAccounts.map((account) => (
                        <SelectItem key={account.code} value={account.code}>
                          {account.code} - {account.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button size="sm" variant="outline">
                    <FileText size={16} className="mr-2" />
                    Export
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Account Code</TableHead>
                    <TableHead>Account Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead className="text-right">Balance</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {chartOfAccounts.map((account) => (
                    <TableRow key={account.code}>
                      <TableCell className="font-medium">{account.code}</TableCell>
                      <TableCell>{account.name}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{account.type}</Badge>
                      </TableCell>
                      <TableCell>{account.category}</TableCell>
                      <TableCell className={`text-right font-semibold ${account.balance < 0 ? 'text-destructive' : 'text-success'}`}>
                        ₹{Math.abs(account.balance).toLocaleString()}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">Details</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trial-balance">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Calculator size={20} />
                  Trial Balance
                </CardTitle>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-slate-500">As of January 31, 2024</span>
                  <Button size="sm" variant="outline">
                    <FileText size={16} className="mr-2" />
                    Export PDF
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Account Code</TableHead>
                    <TableHead>Account Name</TableHead>
                    <TableHead className="text-right">Debit</TableHead>
                    <TableHead className="text-right">Credit</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {trialBalance.map((account) => (
                    <TableRow key={account.code}>
                      <TableCell className="font-medium">{account.code}</TableCell>
                      <TableCell>{account.name}</TableCell>
                      <TableCell className="text-right">
                        {account.debit > 0 ? `₹${account.debit.toLocaleString()}` : '-'}
                      </TableCell>
                      <TableCell className="text-right">
                        {account.credit > 0 ? `₹${account.credit.toLocaleString()}` : '-'}
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow className="border-t-2 font-semibold bg-slate-50">
                    <TableCell colSpan={2}>TOTALS</TableCell>
                    <TableCell className="text-right">
                      ₹{trialBalance.reduce((sum, acc) => sum + acc.debit, 0).toLocaleString()}
                    </TableCell>
                    <TableCell className="text-right">
                      ₹{trialBalance.reduce((sum, acc) => sum + acc.credit, 0).toLocaleString()}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
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