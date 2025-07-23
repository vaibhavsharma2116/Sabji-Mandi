import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Layout from "@/components/layout/layout";
import Dashboard from "@/pages/dashboard";
import Vendors from "@/pages/vendors";
import Products from "@/pages/products";
import Inventory from "@/pages/inventory";
import Sales from "@/pages/sales";
import Stalls from "@/pages/stalls";
import Procurement from "@/pages/procurement";
import Finance from "@/pages/finance";
import Staff from "@/pages/staff";
import Orders from "@/pages/orders";
import Quality from "@/pages/quality";
import NotFound from "@/pages/not-found";
import Accounting from "@/pages/accounting";

function Router() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Dashboard} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/vendors" component={Vendors} />
        <Route path="/products" component={Products} />
        <Route path="/inventory" component={Inventory} />
        <Route path="/sales" component={Sales} />
        <Route path="/stalls" component={Stalls} />
        <Route path="/procurement" component={Procurement} />
        <Route path="/finance" component={Finance} />
        <Route path="/accounting" component={Accounting} />
        <Route path="/staff" component={Staff} />
        <Route path="/orders" component={Orders} />
        <Route path="/quality" component={Quality} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;