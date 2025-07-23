import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Search, Plus, ClipboardCheck, CheckCircle, XCircle, AlertTriangle, Star, Eye } from "lucide-react";

// Mock data for demonstration
const qualityChecks = [
  {
    id: 1,
    productName: "Tomatoes",
    supplier: "Fresh Farm Supplies",
    purchaseOrderId: 1,
    checkDate: "2024-01-15T09:30:00",
    qualityGrade: "A",
    freshness: 9,
    appearance: 8,
    overallScore: 8.5,
    approved: true,
    checkedBy: "Quality Inspector",
    notes: "Excellent quality, fresh and vibrant color",
    quantity: 50,
    rejectedQuantity: 0
  },
  {
    id: 2,
    productName: "Onions",
    supplier: "Wholesale Veggie Hub",
    purchaseOrderId: 2,
    checkDate: "2024-01-14T11:15:00",
    qualityGrade: "B",
    freshness: 7,
    appearance: 7,
    overallScore: 7.0,
    approved: true,
    checkedBy: "Quality Inspector",
    notes: "Good quality, minor browning on outer layers",
    quantity: 30,
    rejectedQuantity: 2
  },
  {
    id: 3,
    productName: "Potatoes",
    supplier: "Metro Distributors",
    purchaseOrderId: 3,
    checkDate: "2024-01-13T14:20:00",
    qualityGrade: "C",
    freshness: 5,
    appearance: 6,
    overallScore: 5.5,
    approved: false,
    checkedBy: "Quality Inspector",
    notes: "Below standard quality, sprouting and soft spots detected",
    quantity: 40,
    rejectedQuantity: 15
  },
  {
    id: 4,
    productName: "Carrots",
    supplier: "Fresh Farm Supplies",
    purchaseOrderId: 4,
    checkDate: "2024-01-12T16:45:00",
    qualityGrade: "A",
    freshness: 9,
    appearance: 9,
    overallScore: 9.0,
    approved: true,
    checkedBy: "Senior Inspector",
    notes: "Premium quality, crisp and fresh",
    quantity: 25,
    rejectedQuantity: 0
  }
];

const qualityStandards = [
  {
    id: 1,
    productCategory: "Vegetables",
    subcategory: "Leafy Greens",
    minFreshness: 8,
    minAppearance: 7,
    minOverallScore: 7.5,
    requiredGrade: "B",
    checkpoints: ["Color vibrancy", "Leaf texture", "No wilting", "No pest damage"]
  },
  {
    id: 2,
    productCategory: "Vegetables",
    subcategory: "Root Vegetables",
    minFreshness: 7,
    minAppearance: 7,
    minOverallScore: 7.0,
    requiredGrade: "B",
    checkpoints: ["Firmness", "No sprouting", "Skin condition", "Size consistency"]
  },
  {
    id: 3,
    productCategory: "Fruits",
    subcategory: "Citrus",
    minFreshness: 8,
    minAppearance: 8,
    minOverallScore: 8.0,
    requiredGrade: "A",
    checkpoints: ["Juice content", "Skin color", "No blemishes", "Aroma"]
  }
];

export default function Quality() {
  const [searchTerm, setSearchTerm] = useState("");

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case "A": return "success";
      case "B": return "warning";
      case "C": return "destructive";
      default: return "secondary";
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 8) return "text-success";
    if (score >= 6) return "text-warning";
    return "text-destructive";
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

  const approvedChecks = qualityChecks.filter(check => check.approved);
  const rejectedChecks = qualityChecks.filter(check => !check.approved);
  const averageScore = qualityChecks.reduce((sum, check) => sum + check.overallScore, 0) / qualityChecks.length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Quality Control</h1>
          <p className="text-slate-500">Monitor product quality and inspection reports</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Eye size={16} className="mr-2" />
            Quality Report
          </Button>
          <Button>
            <Plus size={16} className="mr-2" />
            New Inspection
          </Button>
        </div>
      </div>

      {/* Quality Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Total Inspections</p>
                <p className="text-2xl font-bold text-slate-900 mt-1">{qualityChecks.length}</p>
                <p className="text-sm text-primary flex items-center gap-1 mt-2">
                  <ClipboardCheck size={12} />
                  This week
                </p>
              </div>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <ClipboardCheck className="text-primary" size={20} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Approved</p>
                <p className="text-2xl font-bold text-slate-900 mt-1">{approvedChecks.length}</p>
                <p className="text-sm text-success flex items-center gap-1 mt-2">
                  <CheckCircle size={12} />
                  {Math.round((approvedChecks.length / qualityChecks.length) * 100)}% pass rate
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
                <p className="text-sm font-medium text-slate-600">Rejected</p>
                <p className="text-2xl font-bold text-slate-900 mt-1">{rejectedChecks.length}</p>
                <p className="text-sm text-destructive flex items-center gap-1 mt-2">
                  <XCircle size={12} />
                  {Math.round((rejectedChecks.length / qualityChecks.length) * 100)}% rejection
                </p>
              </div>
              <div className="w-12 h-12 bg-destructive/10 rounded-lg flex items-center justify-center">
                <XCircle className="text-destructive" size={20} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Avg. Score</p>
                <p className="text-2xl font-bold text-slate-900 mt-1">{averageScore.toFixed(1)}/10</p>
                <p className="text-sm text-success flex items-center gap-1 mt-2">
                  <Star size={12} />
                  Quality rating
                </p>
              </div>
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                <Star className="text-accent" size={20} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="inspections" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="inspections">Inspections</TabsTrigger>
          <TabsTrigger value="standards">Quality Standards</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="inspections">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Quality Inspection Reports</CardTitle>
                <div className="flex items-center gap-3">
                  <div className="relative w-64">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={16} />
                    <Input
                      placeholder="Search inspections..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Button size="sm">
                    <Plus size={16} className="mr-2" />
                    New Inspection
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product Details</TableHead>
                    <TableHead>Supplier</TableHead>
                    <TableHead>Inspection Date</TableHead>
                    <TableHead>Quality Scores</TableHead>
                    <TableHead>Grade</TableHead>
                    <TableHead>Quantity Check</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Inspector</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {qualityChecks.map((check) => (
                    <TableRow key={check.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{check.productName}</p>
                          <p className="text-sm text-slate-500">PO #{check.purchaseOrderId}</p>
                        </div>
                      </TableCell>
                      <TableCell>{check.supplier}</TableCell>
                      <TableCell>{formatDate(check.checkDate)}</TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span>Freshness:</span>
                            <span className={getScoreColor(check.freshness)}>{check.freshness}/10</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Appearance:</span>
                            <span className={getScoreColor(check.appearance)}>{check.appearance}/10</span>
                          </div>
                          <div className="flex justify-between text-sm font-medium">
                            <span>Overall:</span>
                            <span className={getScoreColor(check.overallScore)}>{check.overallScore}/10</span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={getGradeColor(check.qualityGrade) as any} className="text-sm">
                          Grade {check.qualityGrade}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="text-sm font-medium">{check.quantity - check.rejectedQuantity}/{check.quantity} kg</p>
                          {check.rejectedQuantity > 0 && (
                            <p className="text-xs text-destructive">{check.rejectedQuantity} kg rejected</p>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={check.approved ? "default" : "destructive"}>
                          {check.approved ? "Approved" : "Rejected"}
                        </Badge>
                      </TableCell>
                      <TableCell>{check.checkedBy}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">View Details</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="standards">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Quality Standards & Guidelines</CardTitle>
                <Button size="sm">
                  <Plus size={16} className="mr-2" />
                  Add Standard
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {qualityStandards.map((standard) => (
                  <Card key={standard.id} className="border">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="font-semibold text-lg">{standard.productCategory} - {standard.subcategory}</h3>
                          <p className="text-sm text-slate-500 mt-1">
                            Minimum required grade: <Badge variant={getGradeColor(standard.requiredGrade) as any} className="ml-1">
                              Grade {standard.requiredGrade}
                            </Badge>
                          </p>
                        </div>
                        <Button variant="outline" size="sm">Edit</Button>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div className="space-y-2">
                          <p className="text-sm font-medium">Minimum Freshness</p>
                          <div className="flex items-center gap-2">
                            <Progress value={(standard.minFreshness / 10) * 100} className="flex-1" />
                            <span className="text-sm font-medium">{standard.minFreshness}/10</span>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <p className="text-sm font-medium">Minimum Appearance</p>
                          <div className="flex items-center gap-2">
                            <Progress value={(standard.minAppearance / 10) * 100} className="flex-1" />
                            <span className="text-sm font-medium">{standard.minAppearance}/10</span>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <p className="text-sm font-medium">Minimum Overall</p>
                          <div className="flex items-center gap-2">
                            <Progress value={(standard.minOverallScore / 10) * 100} className="flex-1" />
                            <span className="text-sm font-medium">{standard.minOverallScore}/10</span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <p className="text-sm font-medium mb-2">Quality Checkpoints:</p>
                        <div className="flex flex-wrap gap-2">
                          {standard.checkpoints.map((checkpoint, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {checkpoint}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Quality Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg bg-success/5">
                    <div>
                      <p className="font-medium text-success">Grade A Products</p>
                      <p className="text-sm text-slate-500">Premium quality</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-success">
                        {Math.round((qualityChecks.filter(q => q.qualityGrade === "A").length / qualityChecks.length) * 100)}%
                      </p>
                      <p className="text-sm text-slate-500">
                        {qualityChecks.filter(q => q.qualityGrade === "A").length} products
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">Grade B Products</p>
                      <p className="text-sm text-slate-500">Good quality</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-warning">
                        {Math.round((qualityChecks.filter(q => q.qualityGrade === "B").length / qualityChecks.length) * 100)}%
                      </p>
                      <p className="text-sm text-slate-500">
                        {qualityChecks.filter(q => q.qualityGrade === "B").length} products
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">Grade C Products</p>
                      <p className="text-sm text-slate-500">Below standard</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-destructive">
                        {Math.round((qualityChecks.filter(q => q.qualityGrade === "C").length / qualityChecks.length) * 100)}%
                      </p>
                      <p className="text-sm text-slate-500">
                        {qualityChecks.filter(q => q.qualityGrade === "C").length} products
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Supplier Quality Comparison</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Array.from(new Set(qualityChecks.map(q => q.supplier))).map((supplier) => {
                    const supplierChecks = qualityChecks.filter(q => q.supplier === supplier);
                    const avgScore = supplierChecks.reduce((sum, check) => sum + check.overallScore, 0) / supplierChecks.length;
                    const approvalRate = (supplierChecks.filter(q => q.approved).length / supplierChecks.length) * 100;
                    
                    return (
                      <div key={supplier} className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <p className="font-medium">{supplier}</p>
                          <Badge variant={avgScore >= 8 ? "default" : avgScore >= 6 ? "secondary" : "destructive"}>
                            {avgScore.toFixed(1)}/10
                          </Badge>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Quality Score:</span>
                            <Progress value={(avgScore / 10) * 100} className="w-24" />
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Approval Rate:</span>
                            <span className={approvalRate >= 80 ? "text-success" : approvalRate >= 60 ? "text-warning" : "text-destructive"}>
                              {Math.round(approvalRate)}%
                            </span>
                          </div>
                          <p className="text-xs text-slate-500">{supplierChecks.length} inspections</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}