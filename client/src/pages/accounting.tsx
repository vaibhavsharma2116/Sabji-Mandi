
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Plus, 
  FileText, 
  Calculator, 
  TrendingUp, 
  TrendingDown, 
  DollarSign,
  BarChart3,
  Download,
  Upload,
  Search,
  Filter,
  Edit,
  Trash2,
  Eye,
  Calendar,
  Clock
} from "lucide-react";

// Sample data for accounting features
const journalEntries = [
  {
    id: "JE-2024-001",
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
    id: "JE-2024-002",
    date: "2024-01-14",
    description: "Purchase of vegetables",
    reference: "PO-2024-001",
    totalDebit: 8500,
    totalCredit: 8500,
    status: "posted",
    createdBy: "Purchase Manager",
    accounts: [
      { account: "Inventory", accountCode: "1201", debit: 8500, credit: 0 },
      { account: "Accounts Payable", accountCode: "2001", debit: 0, credit: 8500 }
    ]
  }
];

const chartOfAccounts = [
  // Current Assets (1000-1999)
  { code: "1001", name: "Cash in Hand", type: "Asset", category: "Current Assets", balance: 145000, parentCode: "1000", description: "Physical cash on premises" },
  { code: "1002", name: "Cash at Bank - Current Account", type: "Asset", category: "Current Assets", balance: 89000, parentCode: "1000", description: "Primary bank account" },
  { code: "1003", name: "Cash at Bank - Savings Account", type: "Asset", category: "Current Assets", balance: 45000, parentCode: "1000", description: "Interest bearing savings" },
  { code: "1004", name: "Petty Cash", type: "Asset", category: "Current Assets", balance: 5000, parentCode: "1000", description: "Small cash fund for minor expenses" },
  { code: "1101", name: "Accounts Receivable - Trade", type: "Asset", category: "Current Assets", balance: 85000, parentCode: "1100", description: "Customer outstanding payments" },
  { code: "1102", name: "Accounts Receivable - Staff", type: "Asset", category: "Current Assets", balance: 12000, parentCode: "1100", description: "Staff advances and loans" },
  { code: "1103", name: "Allowance for Doubtful Debts", type: "Asset", category: "Current Assets", balance: -8500, parentCode: "1100", description: "Provision for bad debts" },
  { code: "1201", name: "Raw Material Inventory", type: "Asset", category: "Current Assets", balance: 65000, parentCode: "1200", description: "Fresh produce and raw materials" },
  { code: "1202", name: "Finished Goods Inventory", type: "Asset", category: "Current Assets", balance: 35000, parentCode: "1200", description: "Processed and packaged goods" },
  { code: "1203", name: "Packaging Materials", type: "Asset", category: "Current Assets", balance: 15000, parentCode: "1200", description: "Bags, containers, labels" },
  { code: "1204", name: "Work in Progress", type: "Asset", category: "Current Assets", balance: 8000, parentCode: "1200", description: "Items being processed" },
  { code: "1301", name: "Prepaid Insurance", type: "Asset", category: "Current Assets", balance: 18000, parentCode: "1300", description: "Insurance premiums paid in advance" },
  { code: "1302", name: "Prepaid Rent", type: "Asset", category: "Current Assets", balance: 25000, parentCode: "1300", description: "Rent paid in advance" },
  { code: "1303", name: "Prepaid Utilities", type: "Asset", category: "Current Assets", balance: 5000, parentCode: "1300", description: "Utility deposits and advances" },
  { code: "1401", name: "Security Deposits", type: "Asset", category: "Current Assets", balance: 50000, parentCode: "1400", description: "Refundable deposits" },
  { code: "1402", name: "Advance to Suppliers", type: "Asset", category: "Current Assets", balance: 22000, parentCode: "1400", description: "Payments made to suppliers in advance" },

  // Fixed Assets (2000-2999)
  { code: "2001", name: "Land", type: "Asset", category: "Fixed Assets", balance: 500000, parentCode: "2000", description: "Market land and property" },
  { code: "2101", name: "Buildings", type: "Asset", category: "Fixed Assets", balance: 800000, parentCode: "2100", description: "Market structures and buildings" },
  { code: "2102", name: "Accumulated Depreciation - Buildings", type: "Asset", category: "Fixed Assets", balance: -80000, parentCode: "2100", description: "Building depreciation" },
  { code: "2201", name: "Machinery & Equipment", type: "Asset", category: "Fixed Assets", balance: 320000, parentCode: "2200", description: "Processing and packaging equipment" },
  { code: "2202", name: "Accumulated Depreciation - Machinery", type: "Asset", category: "Fixed Assets", balance: -45000, parentCode: "2200", description: "Machinery depreciation" },
  { code: "2301", name: "Vehicles", type: "Asset", category: "Fixed Assets", balance: 450000, parentCode: "2300", description: "Delivery trucks and vehicles" },
  { code: "2302", name: "Accumulated Depreciation - Vehicles", type: "Asset", category: "Fixed Assets", balance: -85000, parentCode: "2300", description: "Vehicle depreciation" },
  { code: "2401", name: "Furniture & Fixtures", type: "Asset", category: "Fixed Assets", balance: 95000, parentCode: "2400", description: "Office and market furniture" },
  { code: "2402", name: "Accumulated Depreciation - Furniture", type: "Asset", category: "Fixed Assets", balance: -25000, parentCode: "2400", description: "Furniture depreciation" },
  { code: "2501", name: "Computer Equipment", type: "Asset", category: "Fixed Assets", balance: 125000, parentCode: "2500", description: "IT hardware and systems" },
  { code: "2502", name: "Accumulated Depreciation - Computer", type: "Asset", category: "Fixed Assets", balance: -35000, parentCode: "2500", description: "IT equipment depreciation" },

  // Intangible Assets (2900-2999)
  { code: "2901", name: "Software Licenses", type: "Asset", category: "Intangible Assets", balance: 45000, parentCode: "2900", description: "Software and licensing" },
  { code: "2902", name: "Goodwill", type: "Asset", category: "Intangible Assets", balance: 150000, parentCode: "2900", description: "Business goodwill value" },
  { code: "2903", name: "Trademarks & Patents", type: "Asset", category: "Intangible Assets", balance: 75000, parentCode: "2900", description: "Intellectual property" },

  // Current Liabilities (3000-3999)
  { code: "3001", name: "Accounts Payable - Trade", type: "Liability", category: "Current Liabilities", balance: 125000, parentCode: "3000", description: "Supplier outstanding payments" },
  { code: "3002", name: "Accounts Payable - Utilities", type: "Liability", category: "Current Liabilities", balance: 18000, parentCode: "3000", description: "Utility bills payable" },
  { code: "3003", name: "Accounts Payable - Others", type: "Liability", category: "Current Liabilities", balance: 32000, parentCode: "3000", description: "Other creditors" },
  { code: "3101", name: "Accrued Salaries", type: "Liability", category: "Current Liabilities", balance: 45000, parentCode: "3100", description: "Unpaid staff salaries" },
  { code: "3102", name: "Accrued Interest", type: "Liability", category: "Current Liabilities", balance: 8500, parentCode: "3100", description: "Interest payable on loans" },
  { code: "3103", name: "Accrued Expenses", type: "Liability", category: "Current Liabilities", balance: 15000, parentCode: "3100", description: "Other accrued expenses" },
  { code: "3201", name: "Sales Tax Payable", type: "Liability", category: "Current Liabilities", balance: 22000, parentCode: "3200", description: "GST/VAT collections" },
  { code: "3202", name: "Income Tax Payable", type: "Liability", category: "Current Liabilities", balance: 35000, parentCode: "3200", description: "Corporate tax liability" },
  { code: "3203", name: "Provident Fund Payable", type: "Liability", category: "Current Liabilities", balance: 18000, parentCode: "3200", description: "Employee PF contributions" },
  { code: "3204", name: "ESI Payable", type: "Liability", category: "Current Liabilities", balance: 8000, parentCode: "3200", description: "Employee State Insurance" },
  { code: "3301", name: "Short-term Loans", type: "Liability", category: "Current Liabilities", balance: 150000, parentCode: "3300", description: "Bank overdrafts and short-term loans" },
  { code: "3302", name: "Current Portion of Long-term Debt", type: "Liability", category: "Current Liabilities", balance: 85000, parentCode: "3300", description: "Current year portion of long-term loans" },
  { code: "3401", name: "Customer Deposits", type: "Liability", category: "Current Liabilities", balance: 25000, parentCode: "3400", description: "Advance payments from customers" },
  { code: "3402", name: "Security Deposits Received", type: "Liability", category: "Current Liabilities", balance: 35000, parentCode: "3400", description: "Refundable deposits from vendors" },

  // Long-term Liabilities (4000-4999)
  { code: "4001", name: "Bank Term Loans", type: "Liability", category: "Long-term Liabilities", balance: 650000, parentCode: "4000", description: "Long-term bank financing" },
  { code: "4002", name: "Vehicle Loans", type: "Liability", category: "Long-term Liabilities", balance: 285000, parentCode: "4000", description: "Vehicle financing" },
  { code: "4003", name: "Equipment Financing", type: "Liability", category: "Long-term Liabilities", balance: 175000, parentCode: "4000", description: "Equipment and machinery loans" },
  { code: "4101", name: "Mortgage Payable", type: "Liability", category: "Long-term Liabilities", balance: 450000, parentCode: "4100", description: "Property mortgage" },
  { code: "4201", name: "Deferred Tax Liability", type: "Liability", category: "Long-term Liabilities", balance: 45000, parentCode: "4200", description: "Future tax obligations" },

  // Owner's Equity (5000-5999)
  { code: "5001", name: "Owner's Capital", type: "Equity", category: "Owner's Equity", balance: 850000, parentCode: "5000", description: "Initial capital investment" },
  { code: "5002", name: "Additional Capital", type: "Equity", category: "Owner's Equity", balance: 200000, parentCode: "5000", description: "Additional investments" },
  { code: "5101", name: "Retained Earnings", type: "Equity", category: "Owner's Equity", balance: 385000, parentCode: "5100", description: "Accumulated profits" },
  { code: "5102", name: "Current Year Earnings", type: "Equity", category: "Owner's Equity", balance: 125000, parentCode: "5100", description: "Current period profit/loss" },
  { code: "5201", name: "Owner's Drawings", type: "Equity", category: "Owner's Equity", balance: -85000, parentCode: "5200", description: "Owner withdrawals" },

  // Revenue Accounts (6000-6999)
  { code: "6001", name: "Sales Revenue - Vegetables", type: "Revenue", category: "Operating Revenue", balance: 485000, parentCode: "6000", description: "Vegetable sales income" },
  { code: "6002", name: "Sales Revenue - Fruits", type: "Revenue", category: "Operating Revenue", balance: 325000, parentCode: "6000", description: "Fruit sales income" },
  { code: "6003", name: "Sales Revenue - Grains", type: "Revenue", category: "Operating Revenue", balance: 215000, parentCode: "6000", description: "Grain and cereal sales" },
  { code: "6004", name: "Sales Revenue - Dairy", type: "Revenue", category: "Operating Revenue", balance: 185000, parentCode: "6000", description: "Dairy product sales" },
  { code: "6005", name: "Sales Revenue - Spices", type: "Revenue", category: "Operating Revenue", balance: 145000, parentCode: "6000", description: "Spice sales income" },
  { code: "6101", name: "Rental Income", type: "Revenue", category: "Other Revenue", balance: 85000, parentCode: "6100", description: "Stall rental income" },
  { code: "6102", name: "Commission Income", type: "Revenue", category: "Other Revenue", balance: 45000, parentCode: "6100", description: "Sales commission from vendors" },
  { code: "6103", name: "Service Charges", type: "Revenue", category: "Other Revenue", balance: 25000, parentCode: "6100", description: "Processing and packaging charges" },
  { code: "6201", name: "Interest Income", type: "Revenue", category: "Financial Income", balance: 15000, parentCode: "6200", description: "Bank interest earned" },
  { code: "6202", name: "Investment Income", type: "Revenue", category: "Financial Income", balance: 8500, parentCode: "6200", description: "Returns on investments" },
  { code: "6301", name: "Other Income", type: "Revenue", category: "Miscellaneous Income", balance: 12000, parentCode: "6300", description: "Miscellaneous income" },

  // Cost of Goods Sold (7000-7999)
  { code: "7001", name: "Purchase - Vegetables", type: "Expense", category: "Cost of Goods Sold", balance: 285000, parentCode: "7000", description: "Vegetable procurement costs" },
  { code: "7002", name: "Purchase - Fruits", type: "Expense", category: "Cost of Goods Sold", balance: 195000, parentCode: "7000", description: "Fruit procurement costs" },
  { code: "7003", name: "Purchase - Grains", type: "Expense", category: "Cost of Goods Sold", balance: 125000, parentCode: "7000", description: "Grain procurement costs" },
  { code: "7004", name: "Purchase - Dairy", type: "Expense", category: "Cost of Goods Sold", balance: 95000, parentCode: "7000", description: "Dairy procurement costs" },
  { code: "7005", name: "Purchase - Spices", type: "Expense", category: "Cost of Goods Sold", balance: 85000, parentCode: "7000", description: "Spice procurement costs" },
  { code: "7101", name: "Direct Labor", type: "Expense", category: "Cost of Goods Sold", balance: 185000, parentCode: "7100", description: "Direct labor costs" },
  { code: "7102", name: "Processing Costs", type: "Expense", category: "Cost of Goods Sold", balance: 45000, parentCode: "7100", description: "Product processing expenses" },
  { code: "7103", name: "Packaging Costs", type: "Expense", category: "Cost of Goods Sold", balance: 35000, parentCode: "7100", description: "Packaging material costs" },
  { code: "7201", name: "Freight Inward", type: "Expense", category: "Cost of Goods Sold", balance: 65000, parentCode: "7200", description: "Inbound transportation" },
  { code: "7202", name: "Storage Costs", type: "Expense", category: "Cost of Goods Sold", balance: 25000, parentCode: "7200", description: "Warehouse and storage" },

  // Operating Expenses (8000-8999)
  { code: "8001", name: "Salaries & Wages", type: "Expense", category: "Personnel Expenses", balance: 385000, parentCode: "8000", description: "Staff compensation" },
  { code: "8002", name: "Employee Benefits", type: "Expense", category: "Personnel Expenses", balance: 65000, parentCode: "8000", description: "Health insurance, bonuses" },
  { code: "8003", name: "Provident Fund Contribution", type: "Expense", category: "Personnel Expenses", balance: 45000, parentCode: "8000", description: "Employer PF contribution" },
  { code: "8004", name: "Gratuity Provision", type: "Expense", category: "Personnel Expenses", balance: 25000, parentCode: "8000", description: "Gratuity fund provision" },
  { code: "8101", name: "Rent Expense", type: "Expense", category: "Facility Expenses", balance: 185000, parentCode: "8100", description: "Property rental costs" },
  { code: "8102", name: "Utilities - Electricity", type: "Expense", category: "Facility Expenses", balance: 45000, parentCode: "8100", description: "Electricity bills" },
  { code: "8103", name: "Utilities - Water", type: "Expense", category: "Facility Expenses", balance: 18000, parentCode: "8100", description: "Water and sewerage" },
  { code: "8104", name: "Utilities - Gas", type: "Expense", category: "Facility Expenses", balance: 12000, parentCode: "8100", description: "Gas supply" },
  { code: "8105", name: "Security Services", type: "Expense", category: "Facility Expenses", balance: 35000, parentCode: "8100", description: "Security guard services" },
  { code: "8106", name: "Cleaning & Maintenance", type: "Expense", category: "Facility Expenses", balance: 25000, parentCode: "8100", description: "Facility maintenance" },
  { code: "8201", name: "Vehicle Maintenance", type: "Expense", category: "Transportation Expenses", balance: 65000, parentCode: "8200", description: "Vehicle repairs and service" },
  { code: "8202", name: "Fuel Expenses", type: "Expense", category: "Transportation Expenses", balance: 85000, parentCode: "8200", description: "Vehicle fuel costs" },
  { code: "8203", name: "Vehicle Insurance", type: "Expense", category: "Transportation Expenses", balance: 25000, parentCode: "8200", description: "Vehicle insurance premiums" },
  { code: "8301", name: "Marketing & Advertising", type: "Expense", category: "Marketing Expenses", balance: 45000, parentCode: "8300", description: "Promotional activities" },
  { code: "8302", name: "Website & Digital Marketing", type: "Expense", category: "Marketing Expenses", balance: 18000, parentCode: "8300", description: "Online marketing costs" },
  { code: "8401", name: "Office Supplies", type: "Expense", category: "Administrative Expenses", balance: 15000, parentCode: "8400", description: "Stationery and office materials" },
  { code: "8402", name: "Telephone & Internet", type: "Expense", category: "Administrative Expenses", balance: 22000, parentCode: "8400", description: "Communication costs" },
  { code: "8403", name: "Professional Fees", type: "Expense", category: "Administrative Expenses", balance: 35000, parentCode: "8400", description: "Legal and consultancy" },
  { code: "8404", name: "Bank Charges", type: "Expense", category: "Administrative Expenses", balance: 8500, parentCode: "8400", description: "Banking fees and charges" },
  { code: "8405", name: "Insurance - General", type: "Expense", category: "Administrative Expenses", balance: 45000, parentCode: "8400", description: "Business insurance" },
  { code: "8501", name: "Depreciation - Buildings", type: "Expense", category: "Depreciation", balance: 85000, parentCode: "8500", description: "Building depreciation expense" },
  { code: "8502", name: "Depreciation - Machinery", type: "Expense", category: "Depreciation", balance: 45000, parentCode: "8500", description: "Equipment depreciation" },
  { code: "8503", name: "Depreciation - Vehicles", type: "Expense", category: "Depreciation", balance: 65000, parentCode: "8500", description: "Vehicle depreciation" },
  { code: "8504", name: "Depreciation - Furniture", type: "Expense", category: "Depreciation", balance: 15000, parentCode: "8500", description: "Furniture depreciation" },

  // Financial Expenses (9000-9999)
  { code: "9001", name: "Interest on Bank Loans", type: "Expense", category: "Financial Expenses", balance: 85000, parentCode: "9000", description: "Loan interest payments" },
  { code: "9002", name: "Interest on Vehicle Loans", type: "Expense", category: "Financial Expenses", balance: 35000, parentCode: "9000", description: "Vehicle loan interest" },
  { code: "9003", name: "Bank Overdraft Interest", type: "Expense", category: "Financial Expenses", balance: 15000, parentCode: "9000", description: "Overdraft interest charges" },
  { code: "9101", name: "Foreign Exchange Loss", type: "Expense", category: "Financial Expenses", balance: 8500, parentCode: "9100", description: "Currency conversion losses" },
  { code: "9201", name: "Bad Debt Expense", type: "Expense", category: "Other Expenses", balance: 25000, parentCode: "9200", description: "Uncollectible receivables" },
  { code: "9202", name: "Loss on Sale of Assets", type: "Expense", category: "Other Expenses", balance: 12000, parentCode: "9200", description: "Asset disposal losses" },
  { code: "9203", name: "Penalties & Fines", type: "Expense", category: "Other Expenses", balance: 5000, parentCode: "9200", description: "Regulatory penalties" }
];

const accountsPayable = [
  {
    id: 1,
    vendor: "ABC Vegetables Ltd",
    invoiceNumber: "INV-2024-001",
    invoiceDate: "2024-01-10",
    dueDate: "2024-02-10",
    amount: 25000,
    paidAmount: 0,
    status: "pending",
    description: "Fresh vegetables supply"
  },
  {
    id: 2,
    vendor: "XYZ Fruits Co",
    invoiceNumber: "INV-2024-002",
    invoiceDate: "2024-01-12",
    dueDate: "2024-02-12",
    amount: 18000,
    paidAmount: 18000,
    status: "paid",
    description: "Seasonal fruits delivery"
  }
];

const accountsReceivable = [
  {
    id: 1,
    customer: "Green Mart",
    invoiceNumber: "SI-2024-001",
    invoiceDate: "2024-01-08",
    dueDate: "2024-02-08",
    amount: 35000,
    receivedAmount: 20000,
    status: "partial",
    description: "Bulk vegetable order"
  },
  {
    id: 2,
    customer: "Fresh Foods Store",
    invoiceNumber: "SI-2024-002",
    invoiceDate: "2024-01-14",
    dueDate: "2024-02-14",
    amount: 22000,
    receivedAmount: 0,
    status: "pending",
    description: "Weekly supply contract"
  }
];

const financialReports = {
  profitLoss: {
    revenue: {
      salesRevenue: 245000,
      otherIncome: 5000,
      total: 250000
    },
    expenses: {
      costOfGoodsSold: 98000,
      operatingExpenses: 45000,
      utilities: 15000,
      salaries: 35000,
      total: 193000
    },
    netIncome: 57000
  },
  balanceSheet: {
    assets: {
      currentAssets: 299000,
      fixedAssets: 95000,
      total: 394000
    },
    liabilities: {
      currentLiabilities: 40500,
      longTermLiabilities: 50000,
      total: 90500
    },
    equity: {
      ownersEquity: 303500,
      total: 303500
    }
  }
};

export default function Accounting() {
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [journalEntriesData, setJournalEntriesData] = useState(journalEntries);
  const [chartOfAccountsData, setChartOfAccountsData] = useState(chartOfAccounts);
  const [accountsPayableData, setAccountsPayableData] = useState(accountsPayable);
  const [accountsReceivableData, setAccountsReceivableData] = useState(accountsReceivable);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isAddAccountDialogOpen, setIsAddAccountDialogOpen] = useState(false);
  const [isAddPayableDialogOpen, setIsAddPayableDialogOpen] = useState(false);
  const [isAddReceivableDialogOpen, setIsAddReceivableDialogOpen] = useState(false);
  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false);
  const [selectedPayable, setSelectedPayable] = useState(null);
  const [selectedReceivable, setSelectedReceivable] = useState(null);
  const [editingEntry, setEditingEntry] = useState(null);
  const [newEntry, setNewEntry] = useState({
    date: "",
    reference: "",
    description: "",
    accounts: [
      { accountCode: "", description: "", debit: 0, credit: 0 }
    ]
  });
  const [newAccount, setNewAccount] = useState({
    code: "",
    name: "",
    type: "",
    category: "",
    description: "",
    parentCode: ""
  });
  const [newPayable, setNewPayable] = useState({
    vendor: "",
    invoiceNumber: "",
    invoiceDate: "",
    dueDate: "",
    amount: 0,
    description: ""
  });
  const [newReceivable, setNewReceivable] = useState({
    customer: "",
    invoiceNumber: "",
    invoiceDate: "",
    dueDate: "",
    amount: 0,
    description: ""
  });
  const [paymentForm, setPaymentForm] = useState({
    amount: 0,
    paymentDate: "",
    paymentMethod: "",
    reference: "",
    notes: ""
  });

  const addAccountLine = () => {
    setNewEntry(prev => ({
      ...prev,
      accounts: [...prev.accounts, { accountCode: "", description: "", debit: 0, credit: 0 }]
    }));
  };

  const updateAccountLine = (index, field, value) => {
    setNewEntry(prev => ({
      ...prev,
      accounts: prev.accounts.map((acc, i) => 
        i === index ? { ...acc, [field]: value } : acc
      )
    }));
  };

  const removeAccountLine = (index) => {
    if (newEntry.accounts.length > 1) {
      setNewEntry(prev => ({
        ...prev,
        accounts: prev.accounts.filter((_, i) => i !== index)
      }));
    }
  };

  const handleSaveEntry = () => {
    const totalDebit = newEntry.accounts.reduce((sum, acc) => sum + (parseFloat(acc.debit) || 0), 0);
    const totalCredit = newEntry.accounts.reduce((sum, acc) => sum + (parseFloat(acc.credit) || 0), 0);
    
    if (totalDebit !== totalCredit) {
      alert("Total debits must equal total credits");
      return;
    }

    const entryToSave = {
      id: editingEntry ? editingEntry.id : `JE-2024-${String(journalEntriesData.length + 1).padStart(3, '0')}`,
      date: newEntry.date,
      description: newEntry.description,
      reference: newEntry.reference,
      totalDebit: totalDebit,
      totalCredit: totalCredit,
      status: "posted",
      createdBy: "User",
      accounts: newEntry.accounts.map(acc => ({
        account: chartOfAccounts.find(coa => coa.code === acc.accountCode)?.name || "",
        accountCode: acc.accountCode,
        debit: parseFloat(acc.debit) || 0,
        credit: parseFloat(acc.credit) || 0
      }))
    };

    if (editingEntry) {
      setJournalEntriesData(prev => 
        prev.map(entry => entry.id === editingEntry.id ? entryToSave : entry)
      );
      setIsEditDialogOpen(false);
      setEditingEntry(null);
    } else {
      setJournalEntriesData(prev => [entryToSave, ...prev]);
      setIsAddDialogOpen(false);
    }

    setNewEntry({
      date: "",
      reference: "",
      description: "",
      accounts: [{ accountCode: "", description: "", debit: 0, credit: 0 }]
    });
  };

  const handleEditEntry = (entry) => {
    setEditingEntry(entry);
    setNewEntry({
      date: entry.date,
      reference: entry.reference,
      description: entry.description,
      accounts: entry.accounts.map(acc => ({
        accountCode: acc.accountCode,
        description: acc.account,
        debit: acc.debit,
        credit: acc.credit
      }))
    });
    setIsEditDialogOpen(true);
  };

  const handleDeleteEntry = (entryId) => {
    if (confirm("Are you sure you want to delete this journal entry?")) {
      setJournalEntriesData(prev => prev.filter(entry => entry.id !== entryId));
    }
  };

  const handleViewEntry = (entry) => {
    setSelectedEntry(entry);
  };

  const filteredEntries = journalEntriesData.filter(entry => {
    const matchesSearch = entry.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         entry.reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         entry.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === "all" || entry.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "posted": return "success";
      case "draft": return "warning";
      case "pending": return "secondary";
      case "paid": return "success";
      case "partial": return "warning";
      default: return "default";
    }
  };

  // Account Management Functions
  const handleAddAccount = () => {
    const accountToAdd = {
      ...newAccount,
      balance: 0
    };
    setChartOfAccountsData(prev => [...prev, accountToAdd]);
    setNewAccount({
      code: "",
      name: "",
      type: "",
      category: "",
      description: "",
      parentCode: ""
    });
    setIsAddAccountDialogOpen(false);
  };

  const handleDeleteAccount = (accountCode) => {
    if (confirm("Are you sure you want to delete this account?")) {
      setChartOfAccountsData(prev => prev.filter(acc => acc.code !== accountCode));
    }
  };

  // Accounts Payable Functions
  const handleAddPayable = () => {
    const payableToAdd = {
      id: accountsPayableData.length + 1,
      ...newPayable,
      paidAmount: 0,
      status: "pending"
    };
    setAccountsPayableData(prev => [...prev, payableToAdd]);
    setNewPayable({
      vendor: "",
      invoiceNumber: "",
      invoiceDate: "",
      dueDate: "",
      amount: 0,
      description: ""
    });
    setIsAddPayableDialogOpen(false);
  };

  const handlePayablePayment = () => {
    if (!selectedPayable) return;
    
    const updatedPayable = {
      ...selectedPayable,
      paidAmount: selectedPayable.paidAmount + parseFloat(paymentForm.amount),
      status: (selectedPayable.paidAmount + parseFloat(paymentForm.amount)) >= selectedPayable.amount ? "paid" : "partial"
    };

    setAccountsPayableData(prev => 
      prev.map(payable => payable.id === selectedPayable.id ? updatedPayable : payable)
    );

    // Create journal entry for payment
    const journalEntry = {
      id: `JE-2024-${String(journalEntriesData.length + 1).padStart(3, '0')}`,
      date: paymentForm.paymentDate,
      description: `Payment to ${selectedPayable.vendor} - ${paymentForm.reference}`,
      reference: paymentForm.reference,
      totalDebit: parseFloat(paymentForm.amount),
      totalCredit: parseFloat(paymentForm.amount),
      status: "posted",
      createdBy: "User",
      accounts: [
        { account: "Accounts Payable", accountCode: "3001", debit: parseFloat(paymentForm.amount), credit: 0 },
        { account: "Cash", accountCode: "1001", debit: 0, credit: parseFloat(paymentForm.amount) }
      ]
    };

    setJournalEntriesData(prev => [journalEntry, ...prev]);
    setPaymentForm({ amount: 0, paymentDate: "", paymentMethod: "", reference: "", notes: "" });
    setSelectedPayable(null);
    setIsPaymentDialogOpen(false);
  };

  // Accounts Receivable Functions
  const handleAddReceivable = () => {
    const receivableToAdd = {
      id: accountsReceivableData.length + 1,
      ...newReceivable,
      receivedAmount: 0,
      status: "pending"
    };
    setAccountsReceivableData(prev => [...prev, receivableToAdd]);
    setNewReceivable({
      customer: "",
      invoiceNumber: "",
      invoiceDate: "",
      dueDate: "",
      amount: 0,
      description: ""
    });
    setIsAddReceivableDialogOpen(false);
  };

  const handleReceivablePayment = () => {
    if (!selectedReceivable) return;
    
    const updatedReceivable = {
      ...selectedReceivable,
      receivedAmount: selectedReceivable.receivedAmount + parseFloat(paymentForm.amount),
      status: (selectedReceivable.receivedAmount + parseFloat(paymentForm.amount)) >= selectedReceivable.amount ? "paid" : "partial"
    };

    setAccountsReceivableData(prev => 
      prev.map(receivable => receivable.id === selectedReceivable.id ? updatedReceivable : receivable)
    );

    // Create journal entry for receipt
    const journalEntry = {
      id: `JE-2024-${String(journalEntriesData.length + 1).padStart(3, '0')}`,
      date: paymentForm.paymentDate,
      description: `Payment received from ${selectedReceivable.customer} - ${paymentForm.reference}`,
      reference: paymentForm.reference,
      totalDebit: parseFloat(paymentForm.amount),
      totalCredit: parseFloat(paymentForm.amount),
      status: "posted",
      createdBy: "User",
      accounts: [
        { account: "Cash", accountCode: "1001", debit: parseFloat(paymentForm.amount), credit: 0 },
        { account: "Accounts Receivable", accountCode: "1101", debit: 0, credit: parseFloat(paymentForm.amount) }
      ]
    };

    setJournalEntriesData(prev => [journalEntry, ...prev]);
    setPaymentForm({ amount: 0, paymentDate: "", paymentMethod: "", reference: "", notes: "" });
    setSelectedReceivable(null);
    setIsPaymentDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Advanced Accounting</h1>
          <p className="text-muted-foreground">
            Complete accounting management with double-entry bookkeeping
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Download size={16} className="mr-2" />
            Export Reports
          </Button>
          <Button onClick={() => setIsAddDialogOpen(true)}>
            <Plus size={16} className="mr-2" />
            New Entry
          </Button>
        </div>
      </div>

      <Tabs defaultValue="dashboard" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="journal">Journal Entries</TabsTrigger>
          <TabsTrigger value="ledger">General Ledger</TabsTrigger>
          <TabsTrigger value="payables">Accounts Payable</TabsTrigger>
          <TabsTrigger value="receivables">Accounts Receivable</TabsTrigger>
          <TabsTrigger value="reports">Financial Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Assets</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₹3,94,000</div>
                <p className="text-xs text-muted-foreground">+8.2% from last month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Liabilities</CardTitle>
                <TrendingDown className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₹90,500</div>
                <p className="text-xs text-muted-foreground">-2.1% from last month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Net Income</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₹57,000</div>
                <p className="text-xs text-muted-foreground">+12.5% from last month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Outstanding Receivables</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₹37,000</div>
                <p className="text-xs text-muted-foreground">2 pending invoices</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Common accounting tasks</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  className="w-full justify-start" 
                  variant="outline"
                  onClick={() => setIsAddDialogOpen(true)}
                >
                  <Plus size={16} className="mr-2" />
                  Create Journal Entry
                </Button>

                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="w-full justify-start" variant="outline">
                      <FileText size={16} className="mr-2" />
                      Record Payment
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-lg">
                    <DialogHeader>
                      <DialogTitle>Record Payment</DialogTitle>
                      <DialogDescription>
                        Record a payment transaction
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="paymentDate">Payment Date</Label>
                          <Input id="paymentDate" type="date" />
                        </div>
                        <div>
                          <Label htmlFor="paymentAmount">Amount</Label>
                          <Input id="paymentAmount" type="number" placeholder="0.00" />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="paymentType">Payment Type</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select payment type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="vendor_payment">Vendor Payment</SelectItem>
                            <SelectItem value="customer_receipt">Customer Receipt</SelectItem>
                            <SelectItem value="expense_payment">Expense Payment</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="paymentMethod">Payment Method</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select method" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="cash">Cash</SelectItem>
                            <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                            <SelectItem value="upi">UPI</SelectItem>
                            <SelectItem value="cheque">Cheque</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="paymentDescription">Description</Label>
                        <Textarea id="paymentDescription" placeholder="Payment description" />
                      </div>
                      <div className="flex justify-end space-x-2">
                        <Button variant="outline">Cancel</Button>
                        <Button>Record Payment</Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>

                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="w-full justify-start" variant="outline">
                      <Calculator size={16} className="mr-2" />
                      Generate Trial Balance
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl">
                    <DialogHeader>
                      <DialogTitle>Trial Balance</DialogTitle>
                      <DialogDescription>
                        Trial balance as of current date
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-semibold">Trial Balance as of {new Date().toLocaleDateString()}</span>
                        <Button size="sm" variant="outline">
                          <Download size={16} className="mr-2" />
                          Export PDF
                        </Button>
                      </div>
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
                          {chartOfAccounts.map((account) => {
                            const debit = account.type === "Asset" || account.type === "Expense" ? Math.abs(account.balance) : 0;
                            const credit = account.type === "Liability" || account.type === "Equity" || account.type === "Revenue" ? Math.abs(account.balance) : 0;
                            return (
                              <TableRow key={account.code}>
                                <TableCell className="font-medium">{account.code}</TableCell>
                                <TableCell>{account.name}</TableCell>
                                <TableCell className="text-right font-mono">
                                  {debit > 0 ? `₹${debit.toLocaleString()}` : "-"}
                                </TableCell>
                                <TableCell className="text-right font-mono">
                                  {credit > 0 ? `₹${credit.toLocaleString()}` : "-"}
                                </TableCell>
                              </TableRow>
                            );
                          })}
                          <TableRow className="border-t-2 font-bold">
                            <TableCell colSpan={2}>Total</TableCell>
                            <TableCell className="text-right">
                              ₹{chartOfAccounts.reduce((sum, acc) => 
                                sum + (acc.type === "Asset" || acc.type === "Expense" ? Math.abs(acc.balance) : 0), 0
                              ).toLocaleString()}
                            </TableCell>
                            <TableCell className="text-right">
                              ₹{chartOfAccounts.reduce((sum, acc) => 
                                sum + (acc.type === "Liability" || acc.type === "Equity" || acc.type === "Revenue" ? Math.abs(acc.balance) : 0), 0
                              ).toLocaleString()}
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>
                  </DialogContent>
                </Dialog>

                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="w-full justify-start" variant="outline">
                      <BarChart3 size={16} className="mr-2" />
                      View P&L Statement
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Profit & Loss Statement</DialogTitle>
                      <DialogDescription>
                        Income statement for current period
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-6">
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-semibold">P&L Statement - {new Date().toLocaleDateString()}</span>
                        <Button size="sm" variant="outline">
                          <Download size={16} className="mr-2" />
                          Export PDF
                        </Button>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold text-green-600 text-lg">Revenue</h4>
                          <div className="ml-4 space-y-2">
                            <div className="flex justify-between">
                              <span>Sales Revenue</span>
                              <span className="font-mono">₹{financialReports.profitLoss.revenue.salesRevenue.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Other Income</span>
                              <span className="font-mono">₹{financialReports.profitLoss.revenue.otherIncome.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between font-semibold border-t pt-2">
                              <span>Total Revenue</span>
                              <span className="font-mono">₹{financialReports.profitLoss.revenue.total.toLocaleString()}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold text-red-600 text-lg">Expenses</h4>
                          <div className="ml-4 space-y-2">
                            <div className="flex justify-between">
                              <span>Cost of Goods Sold</span>
                              <span className="font-mono">₹{financialReports.profitLoss.expenses.costOfGoodsSold.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Operating Expenses</span>
                              <span className="font-mono">₹{financialReports.profitLoss.expenses.operatingExpenses.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Utilities</span>
                              <span className="font-mono">₹{financialReports.profitLoss.expenses.utilities.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Salaries</span>
                              <span className="font-mono">₹{financialReports.profitLoss.expenses.salaries.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between font-semibold border-t pt-2">
                              <span>Total Expenses</span>
                              <span className="font-mono">₹{financialReports.profitLoss.expenses.total.toLocaleString()}</span>
                            </div>
                          </div>
                        </div>

                        <div className="border-t-2 pt-4">
                          <div className="flex justify-between text-xl font-bold">
                            <span>Net Income</span>
                            <span className="text-green-600 font-mono">₹{financialReports.profitLoss.netIncome.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Activities</CardTitle>
                <CardDescription>Latest accounting transactions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {journalEntries.slice(0, 3).map((entry) => (
                    <div key={entry.id} className="flex items-center justify-between border-b pb-2">
                      <div>
                        <p className="font-medium">{entry.description}</p>
                        <p className="text-sm text-muted-foreground">{entry.date}</p>
                      </div>
                      <Badge variant={getStatusColor(entry.status)}>{entry.status}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="journal" className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search journal entries..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-80"
                />
              </div>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="posted">Posted</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button onClick={() => setIsAddDialogOpen(true)}>
              <Plus size={16} className="mr-2" />
              New Journal Entry
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Journal Entries</CardTitle>
              <CardDescription>Double-entry accounting transactions</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Entry ID</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Reference</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredEntries.map((entry) => (
                    <TableRow key={entry.id}>
                      <TableCell className="font-medium">{entry.id}</TableCell>
                      <TableCell>{entry.date}</TableCell>
                      <TableCell>{entry.description}</TableCell>
                      <TableCell>{entry.reference}</TableCell>
                      <TableCell className="text-right font-semibold">
                        ₹{entry.totalDebit.toLocaleString()}
                      </TableCell>
                      <TableCell>
                        <Badge variant={getStatusColor(entry.status)}>{entry.status}</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-1">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleViewEntry(entry)}
                          >
                            <Eye size={14} />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleEditEntry(entry)}
                          >
                            <Edit size={14} />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleDeleteEntry(entry.id)}
                          >
                            <Trash2 size={14} />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ledger" className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">Chart of Accounts</h3>
              <p className="text-sm text-muted-foreground">Manage your accounting structure</p>
            </div>
            <Button onClick={() => setIsAddAccountDialogOpen(true)}>
              <Plus size={16} className="mr-2" />
              Add Account
            </Button>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Chart of Accounts</CardTitle>
              <CardDescription>Complete list of all accounting accounts</CardDescription>
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
                  {chartOfAccountsData.map((account) => (
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
                        <div className="flex justify-end space-x-1">
                          <Button variant="ghost" size="sm">
                            <Eye size={14} />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit size={14} />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleDeleteAccount(account.code)}
                          >
                            <Trash2 size={14} />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payables" className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">Accounts Payable</h3>
              <p className="text-sm text-muted-foreground">Manage vendor bills and payments</p>
            </div>
            <Button onClick={() => setIsAddPayableDialogOpen(true)}>
              <Plus size={16} className="mr-2" />
              Add Bill
            </Button>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Accounts Payable</CardTitle>
              <CardDescription>Track vendor bills and payments</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Vendor</TableHead>
                    <TableHead>Invoice No.</TableHead>
                    <TableHead>Invoice Date</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                    <TableHead className="text-right">Paid</TableHead>
                    <TableHead className="text-right">Balance</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {accountsPayableData.map((payable) => (
                    <TableRow key={payable.id}>
                      <TableCell className="font-medium">{payable.vendor}</TableCell>
                      <TableCell>{payable.invoiceNumber}</TableCell>
                      <TableCell>{payable.invoiceDate}</TableCell>
                      <TableCell>{payable.dueDate}</TableCell>
                      <TableCell className="text-right">₹{payable.amount.toLocaleString()}</TableCell>
                      <TableCell className="text-right">₹{payable.paidAmount.toLocaleString()}</TableCell>
                      <TableCell className="text-right font-semibold">₹{(payable.amount - payable.paidAmount).toLocaleString()}</TableCell>
                      <TableCell>
                        <Badge variant={getStatusColor(payable.status)}>{payable.status}</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-1">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => {
                              setSelectedPayable(payable);
                              setIsPaymentDialogOpen(true);
                            }}
                            disabled={payable.status === "paid"}
                          >
                            Pay
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Eye size={14} />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="receivables" className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">Accounts Receivable</h3>
              <p className="text-sm text-muted-foreground">Manage customer invoices and collections</p>
            </div>
            <Button onClick={() => setIsAddReceivableDialogOpen(true)}>
              <Plus size={16} className="mr-2" />
              Add Invoice
            </Button>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Accounts Receivable</CardTitle>
              <CardDescription>Track customer invoices and collections</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Customer</TableHead>
                    <TableHead>Invoice No.</TableHead>
                    <TableHead>Invoice Date</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                    <TableHead className="text-right">Received</TableHead>
                    <TableHead className="text-right">Balance</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {accountsReceivableData.map((receivable) => (
                    <TableRow key={receivable.id}>
                      <TableCell className="font-medium">{receivable.customer}</TableCell>
                      <TableCell>{receivable.invoiceNumber}</TableCell>
                      <TableCell>{receivable.invoiceDate}</TableCell>
                      <TableCell>{receivable.dueDate}</TableCell>
                      <TableCell className="text-right">₹{receivable.amount.toLocaleString()}</TableCell>
                      <TableCell className="text-right">₹{receivable.receivedAmount.toLocaleString()}</TableCell>
                      <TableCell className="text-right font-semibold">₹{(receivable.amount - receivable.receivedAmount).toLocaleString()}</TableCell>
                      <TableCell>
                        <Badge variant={getStatusColor(receivable.status)}>{receivable.status}</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-1">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => {
                              setSelectedReceivable(receivable);
                              setIsPaymentDialogOpen(true);
                            }}
                            disabled={receivable.status === "paid"}
                          >
                            Collect
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Eye size={14} />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Profit & Loss Statement</CardTitle>
                <CardDescription>Income statement for current period</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-success">Revenue</h4>
                  <div className="ml-4 space-y-1">
                    <div className="flex justify-between">
                      <span>Sales Revenue</span>
                      <span>₹{financialReports.profitLoss.revenue.salesRevenue.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Other Income</span>
                      <span>₹{financialReports.profitLoss.revenue.otherIncome.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between font-semibold border-t pt-1">
                      <span>Total Revenue</span>
                      <span>₹{financialReports.profitLoss.revenue.total.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-destructive">Expenses</h4>
                  <div className="ml-4 space-y-1">
                    <div className="flex justify-between">
                      <span>Cost of Goods Sold</span>
                      <span>₹{financialReports.profitLoss.expenses.costOfGoodsSold.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Operating Expenses</span>
                      <span>₹{financialReports.profitLoss.expenses.operatingExpenses.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Utilities</span>
                      <span>₹{financialReports.profitLoss.expenses.utilities.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Salaries</span>
                      <span>₹{financialReports.profitLoss.expenses.salaries.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between font-semibold border-t pt-1">
                      <span>Total Expenses</span>
                      <span>₹{financialReports.profitLoss.expenses.total.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Net Income</span>
                    <span className="text-success">₹{financialReports.profitLoss.netIncome.toLocaleString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Balance Sheet</CardTitle>
                <CardDescription>Financial position as of current date</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold">Assets</h4>
                  <div className="ml-4 space-y-1">
                    <div className="flex justify-between">
                      <span>Current Assets</span>
                      <span>₹{financialReports.balanceSheet.assets.currentAssets.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Fixed Assets</span>
                      <span>₹{financialReports.balanceSheet.assets.fixedAssets.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between font-semibold border-t pt-1">
                      <span>Total Assets</span>
                      <span>₹{financialReports.balanceSheet.assets.total.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold">Liabilities</h4>
                  <div className="ml-4 space-y-1">
                    <div className="flex justify-between">
                      <span>Current Liabilities</span>
                      <span>₹{financialReports.balanceSheet.liabilities.currentLiabilities.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Long-term Liabilities</span>
                      <span>₹{financialReports.balanceSheet.liabilities.longTermLiabilities.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between font-semibold border-t pt-1">
                      <span>Total Liabilities</span>
                      <span>₹{financialReports.balanceSheet.liabilities.total.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold">Equity</h4>
                  <div className="ml-4 space-y-1">
                    <div className="flex justify-between font-semibold border-t pt-1">
                      <span>Owner's Equity</span>
                      <span>₹{financialReports.balanceSheet.equity.total.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total Liabilities & Equity</span>
                    <span>₹{(financialReports.balanceSheet.liabilities.total + financialReports.balanceSheet.equity.total).toLocaleString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex justify-center space-x-4">
            <Button variant="outline">
              <Download size={16} className="mr-2" />
              Export P&L
            </Button>
            <Button variant="outline">
              <Download size={16} className="mr-2" />
              Export Balance Sheet
            </Button>
            <Button variant="outline">
              <Download size={16} className="mr-2" />
              Export Trial Balance
            </Button>
          </div>
        </TabsContent>
      </Tabs>

      {/* Add Journal Entry Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Create Journal Entry</DialogTitle>
            <DialogDescription>
              Record a new accounting transaction with debit and credit entries
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="entryDate">Date</Label>
                <Input 
                  id="entryDate" 
                  type="date" 
                  value={newEntry.date}
                  onChange={(e) => setNewEntry(prev => ({ ...prev, date: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="reference">Reference</Label>
                <Input 
                  id="reference" 
                  placeholder="Reference number"
                  value={newEntry.reference}
                  onChange={(e) => setNewEntry(prev => ({ ...prev, reference: e.target.value }))}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea 
                id="description" 
                placeholder="Transaction description"
                value={newEntry.description}
                onChange={(e) => setNewEntry(prev => ({ ...prev, description: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label>Account Entries</Label>
              <div className="border rounded-lg p-4 space-y-3">
                <div className="grid grid-cols-5 gap-2 text-sm font-medium">
                  <span>Account</span>
                  <span>Description</span>
                  <span>Debit</span>
                  <span>Credit</span>
                  <span>Action</span>
                </div>
                {newEntry.accounts.map((account, index) => (
                  <div key={index} className="grid grid-cols-5 gap-2">
                    <Select 
                      value={account.accountCode}
                      onValueChange={(value) => updateAccountLine(index, 'accountCode', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select account" />
                      </SelectTrigger>
                      <SelectContent>
                        {chartOfAccounts.map((acc) => (
                          <SelectItem key={acc.code} value={acc.code}>
                            {acc.code} - {acc.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Input 
                      placeholder="Description" 
                      value={account.description}
                      onChange={(e) => updateAccountLine(index, 'description', e.target.value)}
                    />
                    <Input 
                      placeholder="0.00" 
                      type="number" 
                      value={account.debit}
                      onChange={(e) => updateAccountLine(index, 'debit', e.target.value)}
                    />
                    <Input 
                      placeholder="0.00" 
                      type="number" 
                      value={account.credit}
                      onChange={(e) => updateAccountLine(index, 'credit', e.target.value)}
                    />
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => removeAccountLine(index)}
                      disabled={newEntry.accounts.length === 1}
                    >
                      <Trash2 size={14} />
                    </Button>
                  </div>
                ))}
                <Button variant="outline" size="sm" onClick={addAccountLine}>
                  <Plus size={14} className="mr-1" />
                  Add Line
                </Button>
                <div className="border-t pt-2">
                  <div className="flex justify-between text-sm">
                    <span>Total Debits: ₹{newEntry.accounts.reduce((sum, acc) => sum + (parseFloat(acc.debit) || 0), 0).toLocaleString()}</span>
                    <span>Total Credits: ₹{newEntry.accounts.reduce((sum, acc) => sum + (parseFloat(acc.credit) || 0), 0).toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleSaveEntry}>Post Entry</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Journal Entry Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Journal Entry</DialogTitle>
            <DialogDescription>
              Modify the journal entry details
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="editEntryDate">Date</Label>
                <Input 
                  id="editEntryDate" 
                  type="date" 
                  value={newEntry.date}
                  onChange={(e) => setNewEntry(prev => ({ ...prev, date: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="editReference">Reference</Label>
                <Input 
                  id="editReference" 
                  placeholder="Reference number"
                  value={newEntry.reference}
                  onChange={(e) => setNewEntry(prev => ({ ...prev, reference: e.target.value }))}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="editDescription">Description</Label>
              <Textarea 
                id="editDescription" 
                placeholder="Transaction description"
                value={newEntry.description}
                onChange={(e) => setNewEntry(prev => ({ ...prev, description: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label>Account Entries</Label>
              <div className="border rounded-lg p-4 space-y-3">
                <div className="grid grid-cols-5 gap-2 text-sm font-medium">
                  <span>Account</span>
                  <span>Description</span>
                  <span>Debit</span>
                  <span>Credit</span>
                  <span>Action</span>
                </div>
                {newEntry.accounts.map((account, index) => (
                  <div key={index} className="grid grid-cols-5 gap-2">
                    <Select 
                      value={account.accountCode}
                      onValueChange={(value) => updateAccountLine(index, 'accountCode', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select account" />
                      </SelectTrigger>
                      <SelectContent>
                        {chartOfAccounts.map((acc) => (
                          <SelectItem key={acc.code} value={acc.code}>
                            {acc.code} - {acc.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Input 
                      placeholder="Description" 
                      value={account.description}
                      onChange={(e) => updateAccountLine(index, 'description', e.target.value)}
                    />
                    <Input 
                      placeholder="0.00" 
                      type="number" 
                      value={account.debit}
                      onChange={(e) => updateAccountLine(index, 'debit', e.target.value)}
                    />
                    <Input 
                      placeholder="0.00" 
                      type="number" 
                      value={account.credit}
                      onChange={(e) => updateAccountLine(index, 'credit', e.target.value)}
                    />
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => removeAccountLine(index)}
                      disabled={newEntry.accounts.length === 1}
                    >
                      <Trash2 size={14} />
                    </Button>
                  </div>
                ))}
                <Button variant="outline" size="sm" onClick={addAccountLine}>
                  <Plus size={14} className="mr-1" />
                  Add Line
                </Button>
                <div className="border-t pt-2">
                  <div className="flex justify-between text-sm">
                    <span>Total Debits: ₹{newEntry.accounts.reduce((sum, acc) => sum + (parseFloat(acc.debit) || 0), 0).toLocaleString()}</span>
                    <span>Total Credits: ₹{newEntry.accounts.reduce((sum, acc) => sum + (parseFloat(acc.credit) || 0), 0).toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleSaveEntry}>Update Entry</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* View Journal Entry Dialog */}
      <Dialog open={!!selectedEntry} onOpenChange={() => setSelectedEntry(null)}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Journal Entry Details</DialogTitle>
            <DialogDescription>
              View journal entry information
            </DialogDescription>
          </DialogHeader>
          {selectedEntry && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Entry ID</Label>
                  <p className="font-medium">{selectedEntry.id}</p>
                </div>
                <div>
                  <Label>Date</Label>
                  <p className="font-medium">{selectedEntry.date}</p>
                </div>
                <div>
                  <Label>Reference</Label>
                  <p className="font-medium">{selectedEntry.reference}</p>
                </div>
                <div>
                  <Label>Status</Label>
                  <Badge variant={getStatusColor(selectedEntry.status)}>{selectedEntry.status}</Badge>
                </div>
              </div>
              <div>
                <Label>Description</Label>
                <p className="font-medium">{selectedEntry.description}</p>
              </div>
              <div>
                <Label>Account Entries</Label>
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
                    {selectedEntry.accounts.map((account, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{account.accountCode}</TableCell>
                        <TableCell>{account.account}</TableCell>
                        <TableCell className="text-right font-mono">
                          {account.debit > 0 ? `₹${account.debit.toLocaleString()}` : "-"}
                        </TableCell>
                        <TableCell className="text-right font-mono">
                          {account.credit > 0 ? `₹${account.credit.toLocaleString()}` : "-"}
                        </TableCell>
                      </TableRow>
                    ))}
                    <TableRow className="border-t-2 font-bold">
                      <TableCell colSpan={2}>Total</TableCell>
                      <TableCell className="text-right">₹{selectedEntry.totalDebit.toLocaleString()}</TableCell>
                      <TableCell className="text-right">₹{selectedEntry.totalCredit.toLocaleString()}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setSelectedEntry(null)}>Close</Button>
                <Button onClick={() => {
                  setSelectedEntry(null);
                  handleEditEntry(selectedEntry);
                }}>Edit Entry</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Add Account Dialog */}
      <Dialog open={isAddAccountDialogOpen} onOpenChange={setIsAddAccountDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Add New Account</DialogTitle>
            <DialogDescription>
              Create a new account in the chart of accounts
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="accountCode">Account Code</Label>
                <Input 
                  id="accountCode" 
                  placeholder="e.g., 1001"
                  value={newAccount.code}
                  onChange={(e) => setNewAccount(prev => ({ ...prev, code: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="accountType">Account Type</Label>
                <Select value={newAccount.type} onValueChange={(value) => setNewAccount(prev => ({ ...prev, type: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Asset">Asset</SelectItem>
                    <SelectItem value="Liability">Liability</SelectItem>
                    <SelectItem value="Equity">Equity</SelectItem>
                    <SelectItem value="Revenue">Revenue</SelectItem>
                    <SelectItem value="Expense">Expense</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label htmlFor="accountName">Account Name</Label>
              <Input 
                id="accountName" 
                placeholder="Enter account name"
                value={newAccount.name}
                onChange={(e) => setNewAccount(prev => ({ ...prev, name: e.target.value }))}
              />
            </div>
            <div>
              <Label htmlFor="accountCategory">Category</Label>
              <Input 
                id="accountCategory" 
                placeholder="e.g., Current Assets"
                value={newAccount.category}
                onChange={(e) => setNewAccount(prev => ({ ...prev, category: e.target.value }))}
              />
            </div>
            <div>
              <Label htmlFor="accountDescription">Description</Label>
              <Textarea 
                id="accountDescription" 
                placeholder="Account description"
                value={newAccount.description}
                onChange={(e) => setNewAccount(prev => ({ ...prev, description: e.target.value }))}
              />
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsAddAccountDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleAddAccount}>Add Account</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Add Payable Dialog */}
      <Dialog open={isAddPayableDialogOpen} onOpenChange={setIsAddPayableDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Add Vendor Bill</DialogTitle>
            <DialogDescription>
              Record a new bill from vendor
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="vendor">Vendor Name</Label>
              <Input 
                id="vendor" 
                placeholder="Enter vendor name"
                value={newPayable.vendor}
                onChange={(e) => setNewPayable(prev => ({ ...prev, vendor: e.target.value }))}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="invoiceNumber">Invoice Number</Label>
                <Input 
                  id="invoiceNumber" 
                  placeholder="INV-001"
                  value={newPayable.invoiceNumber}
                  onChange={(e) => setNewPayable(prev => ({ ...prev, invoiceNumber: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="amount">Amount</Label>
                <Input 
                  id="amount" 
                  type="number" 
                  placeholder="0.00"
                  value={newPayable.amount}
                  onChange={(e) => setNewPayable(prev => ({ ...prev, amount: parseFloat(e.target.value) || 0 }))}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="invoiceDate">Invoice Date</Label>
                <Input 
                  id="invoiceDate" 
                  type="date"
                  value={newPayable.invoiceDate}
                  onChange={(e) => setNewPayable(prev => ({ ...prev, invoiceDate: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="dueDate">Due Date</Label>
                <Input 
                  id="dueDate" 
                  type="date"
                  value={newPayable.dueDate}
                  onChange={(e) => setNewPayable(prev => ({ ...prev, dueDate: e.target.value }))}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea 
                id="description" 
                placeholder="Bill description"
                value={newPayable.description}
                onChange={(e) => setNewPayable(prev => ({ ...prev, description: e.target.value }))}
              />
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsAddPayableDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleAddPayable}>Add Bill</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Add Receivable Dialog */}
      <Dialog open={isAddReceivableDialogOpen} onOpenChange={setIsAddReceivableDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Add Customer Invoice</DialogTitle>
            <DialogDescription>
              Create a new customer invoice
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="customer">Customer Name</Label>
              <Input 
                id="customer" 
                placeholder="Enter customer name"
                value={newReceivable.customer}
                onChange={(e) => setNewReceivable(prev => ({ ...prev, customer: e.target.value }))}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="invoiceNumber">Invoice Number</Label>
                <Input 
                  id="invoiceNumber" 
                  placeholder="SI-001"
                  value={newReceivable.invoiceNumber}
                  onChange={(e) => setNewReceivable(prev => ({ ...prev, invoiceNumber: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="amount">Amount</Label>
                <Input 
                  id="amount" 
                  type="number" 
                  placeholder="0.00"
                  value={newReceivable.amount}
                  onChange={(e) => setNewReceivable(prev => ({ ...prev, amount: parseFloat(e.target.value) || 0 }))}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="invoiceDate">Invoice Date</Label>
                <Input 
                  id="invoiceDate" 
                  type="date"
                  value={newReceivable.invoiceDate}
                  onChange={(e) => setNewReceivable(prev => ({ ...prev, invoiceDate: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="dueDate">Due Date</Label>
                <Input 
                  id="dueDate" 
                  type="date"
                  value={newReceivable.dueDate}
                  onChange={(e) => setNewReceivable(prev => ({ ...prev, dueDate: e.target.value }))}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea 
                id="description" 
                placeholder="Invoice description"
                value={newReceivable.description}
                onChange={(e) => setNewReceivable(prev => ({ ...prev, description: e.target.value }))}
              />
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsAddReceivableDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleAddReceivable}>Add Invoice</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Payment Dialog */}
      <Dialog open={isPaymentDialogOpen} onOpenChange={setIsPaymentDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Record Payment</DialogTitle>
            <DialogDescription>
              {selectedPayable ? `Record payment to ${selectedPayable.vendor}` : 
               selectedReceivable ? `Record payment from ${selectedReceivable.customer}` : "Record payment"}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="paymentAmount">Payment Amount</Label>
                <Input 
                  id="paymentAmount" 
                  type="number" 
                  placeholder="0.00"
                  value={paymentForm.amount}
                  onChange={(e) => setPaymentForm(prev => ({ ...prev, amount: parseFloat(e.target.value) || 0 }))}
                />
              </div>
              <div>
                <Label htmlFor="paymentDate">Payment Date</Label>
                <Input 
                  id="paymentDate" 
                  type="date"
                  value={paymentForm.paymentDate}
                  onChange={(e) => setPaymentForm(prev => ({ ...prev, paymentDate: e.target.value }))}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="paymentMethod">Payment Method</Label>
              <Select value={paymentForm.paymentMethod} onValueChange={(value) => setPaymentForm(prev => ({ ...prev, paymentMethod: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select payment method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cash">Cash</SelectItem>
                  <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                  <SelectItem value="upi">UPI</SelectItem>
                  <SelectItem value="cheque">Cheque</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="reference">Reference</Label>
              <Input 
                id="reference" 
                placeholder="Reference number"
                value={paymentForm.reference}
                onChange={(e) => setPaymentForm(prev => ({ ...prev, reference: e.target.value }))}
              />
            </div>
            <div>
              <Label htmlFor="notes">Notes</Label>
              <Textarea 
                id="notes" 
                placeholder="Payment notes"
                value={paymentForm.notes}
                onChange={(e) => setPaymentForm(prev => ({ ...prev, notes: e.target.value }))}
              />
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsPaymentDialogOpen(false)}>Cancel</Button>
              <Button onClick={selectedPayable ? handlePayablePayment : handleReceivablePayment}>
                Record Payment
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
