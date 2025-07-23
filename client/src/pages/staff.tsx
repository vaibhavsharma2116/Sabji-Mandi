import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Plus, UserCheck, Users, Clock, Calendar, CheckCircle, XCircle } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Edit, Eye, MoreHorizontal, Trash2 } from "lucide-react";

// Mock data for demonstration
const staff = [
  {
    id: 1,
    employeeId: "EMP001",
    name: "Rajesh Kumar",
    phone: "+91 98765 43210",
    email: "rajesh@market.com",
    position: "manager",
    department: "admin",
    salary: 25000,
    joinDate: "2023-01-15",
    isActive: true,
    address: "123 Market Street, City",
    emergencyContact: "+91 98765 43211"
  },
  {
    id: 2,
    employeeId: "EMP002",
    name: "Priya Sharma",
    phone: "+91 87654 32109",
    email: "priya@market.com",
    position: "supervisor",
    department: "operations",
    salary: 18000,
    joinDate: "2023-03-20",
    isActive: true,
    address: "456 Garden Road, City",
    emergencyContact: "+91 87654 32108"
  },
  {
    id: 3,
    employeeId: "EMP003",
    name: "Amit Singh",
    phone: "+91 76543 21098",
    email: "amit@market.com",
    position: "security",
    department: "security",
    salary: 15000,
    joinDate: "2023-05-10",
    isActive: true,
    address: "789 Main Street, City",
    emergencyContact: "+91 76543 21097"
  },
  {
    id: 4,
    employeeId: "EMP004",
    name: "Sunita Devi",
    phone: "+91 65432 10987",
    email: "sunita@market.com",
    position: "cleaner",
    department: "maintenance",
    salary: 12000,
    joinDate: "2023-06-01",
    isActive: true,
    address: "321 Park Avenue, City",
    emergencyContact: "+91 65432 10986"
  }
];

const attendance = [
  {
    id: 1,
    staffId: 1,
    staffName: "Rajesh Kumar",
    date: "2024-01-15",
    checkIn: "09:00:00",
    checkOut: "18:00:00",
    hoursWorked: 9,
    status: "present",
    notes: ""
  },
  {
    id: 2,
    staffId: 2,
    staffName: "Priya Sharma",
    date: "2024-01-15",
    checkIn: "09:15:00",
    checkOut: "17:45:00",
    hoursWorked: 8.5,
    status: "late",
    notes: "Traffic delay"
  },
  {
    id: 3,
    staffId: 3,
    staffName: "Amit Singh",
    date: "2024-01-15",
    checkIn: "08:30:00",
    checkOut: "17:30:00",
    hoursWorked: 9,
    status: "present",
    notes: ""
  },
  {
    id: 4,
    staffId: 4,
    staffName: "Sunita Devi",
    date: "2024-01-15",
    checkIn: null,
    checkOut: null,
    hoursWorked: 0,
    status: "absent",
    notes: "Sick leave"
  }
];

export default function Staff() {
  const [searchTerm, setSearchTerm] = useState("");

  const getPositionColor = (position: string) => {
    switch (position) {
      case "manager": return "primary";
      case "supervisor": return "secondary";
      case "worker": return "default";
      case "security": return "warning";
      case "cleaner": return "accent";
      default: return "secondary";
    }
  };

  const getDepartmentColor = (department: string) => {
    switch (department) {
      case "admin": return "primary";
      case "operations": return "secondary";
      case "security": return "warning";
      case "maintenance": return "accent";
      default: return "default";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "present": return "success";
      case "absent": return "destructive";
      case "half_day": return "warning";
      case "late": return "secondary";
      default: return "default";
    }
  };

  const openEditDialog = (employee: any) => {
    console.log('Edit employee:', employee.id);
  };

  const handleDeleteEmployee = (employeeId: any) => {
    console.log('Delete employee:', employeeId);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Staff Management</h1>
          <p className="text-slate-500">Manage employees, attendance and performance</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Calendar size={16} className="mr-2" />
            Attendance Report
          </Button>
          <Button>
            <Plus size={16} className="mr-2" />
            Add Employee
          </Button>
        </div>
      </div>

      {/* Staff Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Total Staff</p>
                <p className="text-2xl font-bold text-slate-900 mt-1">{staff.length}</p>
                <p className="text-sm text-success flex items-center gap-1 mt-2">
                  <UserCheck size={12} />
                  {staff.filter(s => s.isActive).length} active
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
                <p className="text-sm font-medium text-slate-600">Present Today</p>
                <p className="text-2xl font-bold text-slate-900 mt-1">
                  {attendance.filter(a => a.status === "present" || a.status === "late").length}
                </p>
                <p className="text-sm text-success flex items-center gap-1 mt-2">
                  <CheckCircle size={12} />
                  75% attendance
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
                <p className="text-sm font-medium text-slate-600">Absent Today</p>
                <p className="text-2xl font-bold text-slate-900 mt-1">
                  {attendance.filter(a => a.status === "absent").length}
                </p>
                <p className="text-sm text-destructive flex items-center gap-1 mt-2">
                  <XCircle size={12} />
                  1 sick leave
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
                <p className="text-sm font-medium text-slate-600">Average Hours</p>
                <p className="text-2xl font-bold text-slate-900 mt-1">
                  {(attendance.reduce((acc, a) => acc + a.hoursWorked, 0) / attendance.length).toFixed(1)}h
                </p>
                <p className="text-sm text-primary flex items-center gap-1 mt-2">
                  <Clock size={12} />
                  Per employee
                </p>
              </div>
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                <Clock className="text-accent" size={20} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="employees" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="employees">Employees</TabsTrigger>
          <TabsTrigger value="attendance">Attendance</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="employees">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Employee Directory</CardTitle>
                <div className="flex items-center gap-3">
                  <div className="relative w-64">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={16} />
                    <Input
                      placeholder="Search employees..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Button size="sm">
                    <Plus size={16} className="mr-2" />
                    Add Employee
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Employee Details</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Position</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Salary</TableHead>
                    <TableHead>Join Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {staff.map((employee) => (
                    <TableRow key={employee.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{employee.name}</p>
                          <p className="text-sm text-slate-500">{employee.employeeId}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="text-sm">{employee.phone}</p>
                          <p className="text-sm text-slate-500">{employee.email}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={getPositionColor(employee.position) as any} className="capitalize">
                          {employee.position}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={getDepartmentColor(employee.department) as any} className="capitalize">
                          {employee.department}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-medium">₹{employee.salary?.toLocaleString()}</TableCell>
                      <TableCell>{employee.joinDate}</TableCell>
                      <TableCell>
                        <Badge variant={employee.isActive ? "default" : "secondary"}>
                          {employee.isActive ? "Active" : "Inactive"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal size={16} />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => openEditDialog(employee)}>
                              <Edit size={14} className="mr-2" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => console.log('View employee:', employee.id)}>
                              <Eye size={14} className="mr-2" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => handleDeleteEmployee(employee.id)}
                              className="text-red-600"
                            >
                              <Trash2 size={14} className="mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="attendance">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Today's Attendance</CardTitle>
                <div className="flex items-center gap-3">
                  <Input type="date" defaultValue="2024-01-15" className="w-40" />
                  <Button size="sm">
                    <Clock size={16} className="mr-2" />
                    Mark Attendance
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Employee</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Check In</TableHead>
                    <TableHead>Check Out</TableHead>
                    <TableHead>Hours Worked</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Notes</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {attendance.map((record) => (
                    <TableRow key={record.id}>
                      <TableCell className="font-medium">{record.staffName}</TableCell>
                      <TableCell>{record.date}</TableCell>
                      <TableCell>
                        {record.checkIn ? (
                          <span className="text-success">{record.checkIn}</span>
                        ) : (
                          <span className="text-slate-400">Not checked in</span>
                        )}
                      </TableCell>
                      <TableCell>
                        {record.checkOut ? (
                          <span className="text-destructive">{record.checkOut}</span>
                        ) : (
                          <span className="text-slate-400">Not checked out</span>
                        )}
                      </TableCell>
                      <TableCell>{record.hoursWorked}h</TableCell>
                      <TableCell>
                        <Badge variant={getStatusColor(record.status) as any}>
                          {record.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="max-w-xs truncate">
                        {record.notes || "-"}
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal size={16} />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => console.log('Edit attendance:', record.id)}>
                              <Edit size={14} className="mr-2" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => console.log('Delete attendance:', record.id)}>
                              <Trash2 size={14} className="mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
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
                <CardTitle>Department Wise Staff</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">Administration</p>
                      <p className="text-sm text-slate-500">Management & admin</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">1 employee</p>
                      <p className="text-sm text-success">100% attendance</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">Operations</p>
                      <p className="text-sm text-slate-500">Market operations</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">1 employee</p>
                      <p className="text-sm text-warning">100% attendance</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">Security</p>
                      <p className="text-sm text-slate-500">Market security</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">1 employee</p>
                      <p className="text-sm text-success">100% attendance</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">Maintenance</p>
                      <p className="text-sm text-slate-500">Cleaning & maintenance</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">1 employee</p>
                      <p className="text-sm text-destructive">0% attendance</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Monthly Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 border rounded-lg bg-success/5">
                    <div>
                      <p className="font-medium text-success">Average Attendance</p>
                      <p className="text-sm text-slate-500">This month</p>
                    </div>
                    <p className="text-2xl font-bold text-success">87%</p>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">Total Working Hours</p>
                      <p className="text-sm text-slate-500">All employees</p>
                    </div>
                    <p className="text-xl font-bold">672h</p>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">Overtime Hours</p>
                      <p className="text-sm text-slate-500">Extra hours worked</p>
                    </div>
                    <p className="text-xl font-bold">24h</p>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">Leave Days</p>
                      <p className="text-sm text-slate-500">Total leaves taken</p>
                    </div>
                    <p className="text-xl font-bold">8 days</p>
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