'use client';

import { CompanyInfo, CustomerInfo } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface InvoiceInfoFormProps {
  companyInfo: CompanyInfo;
  customerInfo: CustomerInfo;
  onCompanyChange: (info: CompanyInfo) => void;
  onCustomerChange: (info: CustomerInfo) => void;
}

export function InvoiceInfoForm({ companyInfo, customerInfo, onCompanyChange, onCustomerChange }: InvoiceInfoFormProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <Card className="border-none shadow-pop rounded-3xl bg-card">
        <CardHeader className="bg-peach/30 dark:bg-peach/10 p-8">
          <CardTitle className="text-xl font-black text-primary">Company Information</CardTitle>
        </CardHeader>
        <CardContent className="p-8 space-y-4">
          <div className="space-y-2">
            <Label className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Company Name</Label>
            <Input 
              value={companyInfo.name} 
              onChange={(e) => onCompanyChange({ ...companyInfo, name: e.target.value })}
              className="h-12 bg-secondary border-none rounded-2xl focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Address</Label>
            <Input 
              value={companyInfo.address} 
              onChange={(e) => onCompanyChange({ ...companyInfo, address: e.target.value })}
              className="h-12 bg-secondary border-none rounded-2xl focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Phone</Label>
              <Input 
                value={companyInfo.phone} 
                onChange={(e) => onCompanyChange({ ...companyInfo, phone: e.target.value })}
                className="h-12 bg-secondary border-none rounded-2xl focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Email</Label>
              <Input 
                value={companyInfo.email} 
                onChange={(e) => onCompanyChange({ ...companyInfo, email: e.target.value })}
                className="h-12 bg-secondary border-none rounded-2xl focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-none shadow-pop rounded-3xl bg-card">
        <CardHeader className="bg-lavender/30 dark:bg-lavender/10 p-8">
          <CardTitle className="text-xl font-black text-primary">Customer Information</CardTitle>
        </CardHeader>
        <CardContent className="p-8 space-y-4">
          <div className="space-y-2">
            <Label className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Customer Name</Label>
            <Input 
              value={customerInfo.name} 
              onChange={(e) => onCustomerChange({ ...customerInfo, name: e.target.value })}
              className="h-12 bg-secondary border-none rounded-2xl focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Address</Label>
            <Input 
              value={customerInfo.address} 
              onChange={(e) => onCustomerChange({ ...customerInfo, address: e.target.value })}
              className="h-12 bg-secondary border-none rounded-2xl focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Phone</Label>
              <Input 
                value={customerInfo.phone} 
                onChange={(e) => onCustomerChange({ ...customerInfo, phone: e.target.value })}
                className="h-12 bg-secondary border-none rounded-2xl focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Email</Label>
              <Input 
                value={customerInfo.email} 
                onChange={(e) => onCustomerChange({ ...customerInfo, email: e.target.value })}
                className="h-12 bg-secondary border-none rounded-2xl focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
