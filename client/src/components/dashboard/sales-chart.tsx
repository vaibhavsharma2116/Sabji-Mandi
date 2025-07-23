import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

const salesData = [
  { day: 'Mon', sales: 32000 },
  { day: 'Tue', sales: 38000 },
  { day: 'Wed', sales: 35000 },
  { day: 'Thu', sales: 42000 },
  { day: 'Fri', sales: 45000 },
  { day: 'Sat', sales: 48000 },
  { day: 'Sun', sales: 45230 },
];

export default function SalesChart() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Weekly Sales Trend</CardTitle>
        <Select defaultValue="7days">
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7days">Last 7 days</SelectItem>
            <SelectItem value="30days">Last 30 days</SelectItem>
            <SelectItem value="3months">Last 3 months</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="day" stroke="#64748b" />
              <YAxis 
                stroke="#64748b"
                tickFormatter={(value) => `₹${(value / 1000)}k`}
              />
              <Line 
                type="monotone" 
                dataKey="sales" 
                stroke="hsl(142, 70%, 45%)" 
                strokeWidth={3}
                dot={{ fill: "hsl(142, 70%, 45%)", strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: "hsl(142, 70%, 45%)", strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
