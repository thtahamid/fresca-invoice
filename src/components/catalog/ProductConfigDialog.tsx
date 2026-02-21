'use client';

import { useState, useEffect } from 'react';
import { Product, Unit, InvoiceItem } from '@/types';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { v4 as uuidv4 } from 'uuid';

interface ProductConfigDialogProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (item: InvoiceItem) => void;
  editingItem?: InvoiceItem | null;
}

export function ProductConfigDialog({ product, isOpen, onClose, onConfirm, editingItem }: ProductConfigDialogProps) {
  const [unit, setUnit] = useState<Unit>('kg');
  const [totalPrice, setTotalPrice] = useState<string>('');
  const [quantity, setQuantity] = useState<string>('1');

  useEffect(() => {
    if (editingItem) {
      setUnit(editingItem.unit);
      setTotalPrice(editingItem.totalPrice.toString());
      setQuantity(editingItem.quantity.toString());
    } else {
      setUnit('kg');
      setTotalPrice('');
      setQuantity('1');
    }
  }, [editingItem, isOpen]);

  const handleConfirm = () => {
    if (!product || !totalPrice || !quantity) return;

    const priceNum = parseFloat(totalPrice);
    const qtyNum = parseFloat(quantity);
    
    if (isNaN(priceNum) || isNaN(qtyNum) || qtyNum <= 0) return;

    const item: InvoiceItem = {
      id: editingItem?.id || uuidv4(),
      product,
      unit,
      totalPrice: priceNum,
      quantity: qtyNum,
      unitPrice: priceNum / qtyNum,
    };

    onConfirm(item);
    onClose();
  };

  if (!product) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] rounded-3xl border-none shadow-pop-hover bg-card p-8">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-primary">Configure Product</DialogTitle>
          <DialogDescription className="text-muted-foreground text-base">
            Configure {product.name} for the invoice.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-6 py-4">
          <div className="space-y-2">
            <Label htmlFor="unit" className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Unit</Label>
            <Select value={unit} onValueChange={(val) => setUnit(val as Unit)}>
              <SelectTrigger id="unit" className="h-12 bg-secondary border-none rounded-2xl focus:ring-2 focus:ring-primary/20">
                <SelectValue placeholder="Select unit" />
              </SelectTrigger>
              <SelectContent className="rounded-2xl border-none shadow-pop overflow-hidden">
                <SelectItem value="kg">kilograms (kg)</SelectItem>
                <SelectItem value="boxes">boxes</SelectItem>
                <SelectItem value="bags">bags</SelectItem>
                <SelectItem value="cartons">cartons</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="quantity" className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Quantity</Label>
              <Input
                id="quantity"
                type="number"
                placeholder="0.00"
                className="h-12 bg-secondary border-none rounded-2xl focus:ring-2 focus:ring-primary/20"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="price" className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Total Price ($)</Label>
              <Input
                id="price"
                type="number"
                placeholder="0.00"
                className="h-12 bg-secondary border-none rounded-2xl focus:ring-2 focus:ring-primary/20"
                value={totalPrice}
                onChange={(e) => setTotalPrice(e.target.value)}
              />
            </div>
          </div>

          <div className="bg-mint/30 dark:bg-mint/10 p-4 rounded-2xl">
            <div className="flex justify-between items-center">
              <span className="text-sm font-bold text-muted-foreground">Calculated Unit Price:</span>
              <span className="text-lg font-black text-primary">
                ${(parseFloat(totalPrice) / (parseFloat(quantity) || 1) || 0).toFixed(2)} / {unit}
              </span>
            </div>
          </div>
        </div>
        <DialogFooter className="mt-4 gap-2">
          <Button 
            variant="ghost" 
            onClick={onClose}
            className="rounded-2xl h-12 flex-1 font-bold"
          >
            Cancel
          </Button>
          <Button 
            onClick={handleConfirm}
            className="rounded-2xl h-12 flex-1 font-extrabold bg-primary hover:scale-[1.02] transition-transform active:scale-95 shadow-pop hover:shadow-pop-hover"
          >
            {editingItem ? 'Update Item' : 'Add to Invoice'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
