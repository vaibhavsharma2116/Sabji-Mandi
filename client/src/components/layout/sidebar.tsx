import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { 
  Store, 
  BarChart3, 
  Users, 
  Package, 
  Warehouse, 
  ShoppingCart, 
  MapPin, 
  FileText, 
  Settings,
  X,
  Truck,
  CreditCard,
  UserCheck,
  ShoppingBag,
  ClipboardCheck
} from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const navigation = [
  { name: "Dashboard", href: "/", icon: BarChart3 },
  { name: "Vendors", href: "/vendors", icon: Users },
  { name: "Products", href: "/products", icon: Package },
  { name: "Inventory", href: "/inventory", icon: Warehouse },
  { name: "Sales", href: "/sales", icon: ShoppingCart },
  { name: "Stall Management", href: "/stalls", icon: MapPin },
  { name: "Procurement", href: "/procurement", icon: Truck },
  { name: "Finance", href: "/finance", icon: CreditCard },
  { name: "Staff", href: "/staff", icon: UserCheck },
  { name: "Orders", href: "/orders", icon: ShoppingBag },
  { name: "Quality Control", href: "/quality", icon: ClipboardCheck },
  { name: "Reports", href: "/reports", icon: FileText },
  { name: "Settings", href: "/settings", icon: Settings },
];

export default function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  const [location] = useLocation();

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 lg:hidden z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <aside className={cn(
        "fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-200 shadow-sm transform transition-transform duration-300 lg:transform-none",
        isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}>
        <div className="flex items-center gap-3 px-6 py-4 border-b border-slate-200">
          <div className="w-10 h-10 bg-gradient-to-br from-primary to-success rounded-lg flex items-center justify-center">
            <Store className="text-white" size={20} />
          </div>
          <div className="flex-1">
            <h1 className="text-lg font-semibold text-slate-900">Sabji Mandi</h1>
            <p className="text-xs text-slate-500">Management System</p>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className="lg:hidden text-slate-400 hover:text-slate-600"
          >
            <X size={20} />
          </button>
        </div>
        
        <nav className="flex-1 px-4 py-6 custom-scrollbar overflow-y-auto">
          <div className="space-y-2">
            {navigation.map((item) => {
              const isActive = location === item.href || (item.href === "/" && location === "/dashboard");
              return (
                <Link key={item.name} href={item.href}>
                  <div 
                    className={cn(
                      "flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors cursor-pointer",
                      isActive 
                        ? "bg-primary/10 text-primary" 
                        : "text-slate-600 hover:bg-slate-100"
                    )}
                    onClick={() => setIsOpen(false)}
                  >
                    <item.icon size={18} />
                    {item.name}
                  </div>
                </Link>
              );
            })}
          </div>
        </nav>
      </aside>
    </>
  );
}
