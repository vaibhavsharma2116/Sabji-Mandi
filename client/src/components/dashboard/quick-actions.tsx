import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserPlus, ShoppingCart, MapPin, FileText } from "lucide-react";
import { useState } from "react";
import AddVendorModal from "@/components/modals/add-vendor-modal";
import RecordSaleModal from "@/components/modals/record-sale-modal";

export default function QuickActions() {
  const [addVendorOpen, setAddVendorOpen] = useState(false);
  const [recordSaleOpen, setRecordSaleOpen] = useState(false);

  const currentTime = new Date().toLocaleTimeString('en-IN', { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: true 
  });

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <Button 
              onClick={() => setAddVendorOpen(true)}
              className="w-full flex items-center gap-3 justify-start bg-primary hover:bg-primary/90"
            >
              <UserPlus size={18} />
              Add New Vendor
            </Button>
            <Button 
              onClick={() => setRecordSaleOpen(true)}
              className="w-full flex items-center gap-3 justify-start bg-secondary hover:bg-secondary/90"
            >
              <ShoppingCart size={18} />
              Record Sale
            </Button>
            <Button 
              variant="outline"
              className="w-full flex items-center gap-3 justify-start bg-accent hover:bg-accent/90 text-white border-accent"
            >
              <MapPin size={18} />
              Manage Stalls
            </Button>
            <Button 
              variant="outline"
              className="w-full flex items-center gap-3 justify-start"
            >
              <FileText size={18} />
              Generate Report
            </Button>
          </div>

          {/* Market Status */}
          <div className="mt-8 p-4 bg-slate-50 rounded-lg">
            <h4 className="font-medium text-slate-900 mb-3">Market Status</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-600">Market Opens:</span>
                <span className="font-medium text-slate-900">5:00 AM</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Market Closes:</span>
                <span className="font-medium text-slate-900">8:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Current Time:</span>
                <span className="font-medium text-success">{currentTime} (Open)</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <AddVendorModal open={addVendorOpen} onOpenChange={setAddVendorOpen} />
      <RecordSaleModal open={recordSaleOpen} onOpenChange={setRecordSaleOpen} />
    </>
  );
}
