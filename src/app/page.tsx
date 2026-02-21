'use client';

import { useState } from 'react';
import { Product, InvoiceItem, CompanyInfo, CustomerInfo, Invoice } from '@/types';
import { COMPANY_DEFAULT } from '@/lib/data';
import { ProductCatalog } from '@/components/catalog/ProductCatalog';
import { ProductConfigDialog } from '@/components/catalog/ProductConfigDialog';
import { InvoiceSummary } from '@/components/invoice/InvoiceSummary';
import { InvoiceInfoForm } from '@/components/invoice/InvoiceInfoForm';
import { InvoicePreview } from '@/components/invoice/InvoicePreview';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, Printer, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

type Step = 'selection' | 'review' | 'preview';

export default function InvoicingApp() {
  const [step, setStep] = useState<Step>('selection');
  const [items, setItems] = useState<InvoiceItem[]>([]);
  const [companyInfo, setCompanyInfo] = useState<CompanyInfo>(COMPANY_DEFAULT);
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    name: '',
    address: '',
    phone: '',
    email: '',
  });
  
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [editingItem, setEditingItem] = useState<InvoiceItem | null>(null);
  const [isConfigOpen, setIsConfigOpen] = useState(false);

  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    setEditingItem(null);
    setIsConfigOpen(true);
  };

  const handleEditItem = (item: InvoiceItem) => {
    setSelectedProduct(item.product);
    setEditingItem(item);
    setIsConfigOpen(true);
  };

  const handleConfirmItem = (item: InvoiceItem) => {
    if (editingItem) {
      setItems(items.map((i) => (i.id === item.id ? item : i)));
    } else {
      setItems([...items, item]);
    }
  };

  const handleDeleteItem = (id: string) => {
    setItems(items.filter((i) => i.id !== id));
  };

  const handlePrint = () => {
    window.print();
  };

  const invoice: Invoice = {
    id: `INV-${Math.floor(1000 + Math.random() * 9000)}`,
    date: new Date().toLocaleDateString(),
    companyInfo,
    customerInfo,
    items,
    subtotal: items.reduce((sum, i) => sum + i.totalPrice, 0),
    tax: 0,
    total: items.reduce((sum, i) => sum + i.totalPrice, 0),
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-8 lg:p-12 transition-colors duration-500">
      {/* Header / Stepper */}
      <div className="max-w-7xl mx-auto mb-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
          <div>
            <h1 className="text-5xl font-black tracking-tighter text-primary">
              Fresca<span className="text-sky">Invoice</span>
            </h1>
            <p className="text-muted-foreground font-medium mt-2">Create beautiful invoices in seconds.</p>
          </div>
          
          <div className="flex items-center gap-4 bg-card p-2 rounded-3xl shadow-pop">
            <StepIndicator 
              active={step === 'selection'} 
              completed={items.length > 0 && step !== 'selection'} 
              label="Select" 
              onClick={() => setStep('selection')}
            />
            <div className="w-8 h-1 bg-muted rounded-full" />
            <StepIndicator 
              active={step === 'review'} 
              completed={step === 'preview'} 
              label="Details" 
              onClick={() => items.length > 0 && setStep('review')}
            />
            <div className="w-8 h-1 bg-muted rounded-full" />
            <StepIndicator 
              active={step === 'preview'} 
              completed={false} 
              label="Preview" 
              onClick={() => items.length > 0 && setStep('preview')}
            />
          </div>
        </div>

        {/* Content */}
        <div className="transition-all duration-500 animate-in fade-in slide-in-from-bottom-4">
          {step === 'selection' && (
            <div className="space-y-8">
              <div className="flex justify-between items-end">
                <h2 className="text-3xl font-black text-foreground">Product Catalog</h2>
                <Button 
                  disabled={items.length === 0}
                  onClick={() => setStep('review')}
                  className="rounded-2xl h-14 px-8 bg-sky text-sky-foreground hover:bg-sky/90 font-black shadow-pop hover:scale-105 transition-all text-lg"
                >
                  Review Invoice ({items.length} items) <ArrowRight className="ml-2 w-6 h-6" />
                </Button>
              </div>
              <ProductCatalog onSelectProduct={handleSelectProduct} />
            </div>
          )}

          {step === 'review' && (
            <div className="space-y-12">
              <div className="flex justify-between items-end">
                <h2 className="text-3xl font-black text-foreground">Invoice Review</h2>
                <div className="flex gap-4">
                  <Button 
                    variant="ghost"
                    onClick={() => setStep('selection')}
                    className="rounded-2xl h-14 px-8 font-black text-lg"
                  >
                    <ArrowLeft className="mr-2 w-6 h-6" /> Back to Catalog
                  </Button>
                  <Button 
                    onClick={() => setStep('preview')}
                    className="rounded-2xl h-14 px-8 bg-lavender text-lavender-foreground hover:bg-lavender/90 font-black shadow-pop hover:scale-105 transition-all text-lg"
                  >
                    Generate Preview <ArrowRight className="ml-2 w-6 h-6" />
                  </Button>
                </div>
              </div>

              <InvoiceSummary 
                items={items} 
                onEditItem={handleEditItem} 
                onDeleteItem={handleDeleteItem}
                onAddMore={() => setStep('selection')}
              />

              <InvoiceInfoForm 
                companyInfo={companyInfo} 
                customerInfo={customerInfo}
                onCompanyChange={setCompanyInfo}
                onCustomerChange={setCustomerInfo}
              />
            </div>
          )}

          {step === 'preview' && (
            <div className="space-y-12">
              <div className="flex justify-between items-end print:hidden">
                <h2 className="text-3xl font-black text-foreground">Invoice Preview</h2>
                <div className="flex gap-4">
                  <Button 
                    variant="ghost"
                    onClick={() => setStep('review')}
                    className="rounded-2xl h-14 px-8 font-black text-lg"
                  >
                    <ArrowLeft className="mr-2 w-6 h-6" /> Edit Details
                  </Button>
                  <Button 
                    onClick={handlePrint}
                    className="rounded-2xl h-14 px-8 bg-primary text-primary-foreground hover:bg-primary/90 font-black shadow-pop hover:scale-105 transition-all text-lg"
                  >
                    <Printer className="mr-2 w-6 h-6" /> Print Invoice
                  </Button>
                </div>
              </div>

              <div id="printable-invoice" className="flex justify-center bg-muted/20 p-8 md:p-12 rounded-[3rem] shadow-inner">
                <InvoicePreview invoice={invoice} />
              </div>
            </div>
          )}
        </div>
      </div>

      <ProductConfigDialog
        product={selectedProduct}
        isOpen={isConfigOpen}
        onClose={() => setIsConfigOpen(false)}
        onConfirm={handleConfirmItem}
        editingItem={editingItem}
      />
    </div>
  );
}

function StepIndicator({ active, completed, label, onClick }: { active: boolean, completed: boolean, label: string, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "flex items-center gap-3 px-6 py-3 rounded-2xl font-black transition-all",
        active ? "bg-primary text-primary-foreground shadow-pop scale-105" : 
        completed ? "text-primary bg-primary/10" : "text-muted-foreground hover:bg-muted/50"
      )}
    >
      <div className={cn(
        "w-8 h-8 rounded-full flex items-center justify-center text-sm",
        active ? "bg-white text-primary" : completed ? "bg-primary text-white" : "bg-muted text-muted-foreground"
      )}>
        {completed ? <CheckCircle2 className="w-5 h-5" /> : null}
        {!completed && <span>{label[0]}</span>}
      </div>
      <span className="hidden sm:inline">{label}</span>
    </button>
  );
}
