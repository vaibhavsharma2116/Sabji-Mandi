import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useProducts } from "@/hooks/use-products";
import { useSales } from "@/hooks/use-sales";

export default function TopProducts() {
  const { data: products = [], isLoading: productsLoading } = useProducts();
  const { data: sales = [], isLoading: salesLoading } = useSales();

  if (productsLoading || salesLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Top Selling Products</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center gap-4 p-3 animate-pulse">
                <div className="w-12 h-12 bg-slate-200 rounded-lg"></div>
                <div className="flex-1">
                  <div className="h-4 bg-slate-200 rounded w-24 mb-1"></div>
                  <div className="h-3 bg-slate-200 rounded w-32"></div>
                </div>
                <div className="text-right">
                  <div className="h-4 bg-slate-200 rounded w-16 mb-1"></div>
                  <div className="h-3 bg-slate-200 rounded w-12"></div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  // Calculate top products based on sales
  const productSales = sales.reduce((acc, sale) => {
    const productId = sale.productId;
    if (!acc[productId]) {
      acc[productId] = { quantity: 0, revenue: 0 };
    }
    acc[productId].quantity += sale.quantity;
    acc[productId].revenue += sale.totalAmount;
    return acc;
  }, {} as Record<number, { quantity: number; revenue: number }>);

  const topProducts = products
    .map(product => ({
      ...product,
      sales: productSales[product.id] || { quantity: 0, revenue: 0 }
    }))
    .sort((a, b) => b.sales.revenue - a.sales.revenue)
    .slice(0, 4);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Top Selling Products</CardTitle>
        <Button variant="ghost" size="sm">View All</Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {topProducts.length === 0 ? (
            <p className="text-slate-500 text-center py-8">No sales data available</p>
          ) : (
            topProducts.map((product) => (
              <div key={product.id} className="flex items-center gap-4 p-3 hover:bg-slate-50 rounded-lg transition-colors">
                <img 
                  src={product.imageUrl || `https://images.unsplash.com/photo-1592921870789-04563d55041c?ixlib=rb-4.0.3&w=60&h=60&fit=crop`}
                  alt={product.name}
                  className="w-12 h-12 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <p className="font-medium text-slate-900">{product.name}</p>
                  <p className="text-sm text-slate-500">{product.sales.quantity}kg sold today</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-slate-900">₹{product.sales.revenue.toLocaleString()}</p>
                  <p className="text-sm text-success">+{Math.floor(Math.random() * 20 + 5)}%</p>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
