'use client';

import { InvoiceItem } from '@/types';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Edit2, Trash2, Plus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface InvoiceSummaryProps {
  items: InvoiceItem[];
  onEditItem: (item: InvoiceItem) => void;
  onDeleteItem: (id: string) => void;
  onAddMore: () => void;
}

export function InvoiceSummary({ items, onEditItem, onDeleteItem, onAddMore }: InvoiceSummaryProps) {
  const subtotal = items.reduce((sum, item) => sum + item.totalPrice, 0);

  return (
    <Card className="border-none shadow-pop rounded-3xl overflow-hidden bg-card">
      <CardHeader className="bg-sky/30 dark:bg-sky/10 p-8 flex flex-row items-center justify-between space-y-0">
        <CardTitle className="text-2xl font-black text-primary">Invoice Items</CardTitle>
        <Button 
          onClick={onAddMore}
          className="rounded-2xl bg-primary hover:scale-[1.02] shadow-pop transition-all font-bold"
        >
          <Plus className="w-5 h-5 mr-2" /> Add More
        </Button>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-secondary/50">
              <TableRow className="hover:bg-transparent border-none">
                <TableHead className="py-6 px-8 font-bold text-muted-foreground uppercase text-xs tracking-widest">Product</TableHead>
                <TableHead className="py-6 px-8 font-bold text-muted-foreground uppercase text-xs tracking-widest">Unit</TableHead>
                <TableHead className="py-6 px-8 font-bold text-muted-foreground uppercase text-xs tracking-widest text-right">Qty</TableHead>
                <TableHead className="py-6 px-8 font-bold text-muted-foreground uppercase text-xs tracking-widest text-right">Unit Price</TableHead>
                <TableHead className="py-6 px-8 font-bold text-muted-foreground uppercase text-xs tracking-widest text-right">Total</TableHead>
                <TableHead className="py-6 px-8 font-bold text-muted-foreground uppercase text-xs tracking-widest text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((item) => (
                <TableRow key={item.id} className="hover:bg-secondary/30 transition-colors border-b border-muted/20">
                  <TableCell className="py-6 px-8 font-semibold">
                    <div>
                      <div className="text-lg text-foreground">{item.product.name}</div>
                      <div className="text-xs text-muted-foreground">{item.product.category}</div>
                    </div>
                  </TableCell>
                  <TableCell className="py-6 px-8 capitalize">{item.unit}</TableCell>
                  <TableCell className="py-6 px-8 text-right font-medium">{item.quantity}</TableCell>
                  <TableCell className="py-6 px-8 text-right font-medium">${item.unitPrice.toFixed(2)}</TableCell>
                  <TableCell className="py-6 px-8 text-right">
                    <span className="text-lg font-bold text-primary">${item.totalPrice.toFixed(2)}</span>
                  </TableCell>
                  <TableCell className="py-6 px-8 text-right">
                    <div className="flex justify-end gap-2">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => onEditItem(item)}
                        className="rounded-xl hover:bg-sky/30 text-sky-foreground"
                      >
                        <Edit2 className="w-5 h-5" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => onDeleteItem(item.id)}
                        className="rounded-xl hover:bg-destructive/10 text-destructive"
                      >
                        <Trash2 className="w-5 h-5" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {items.length === 0 && (
          <div className="text-center py-12 px-8">
            <p className="text-muted-foreground italic">No items added yet. Start by selecting products from the catalog.</p>
          </div>
        )}

        <div className="p-8 bg-secondary/30">
          <div className="flex justify-end">
            <div className="w-full max-w-xs space-y-4">
              <div className="flex justify-between items-center text-muted-foreground font-semibold">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center text-muted-foreground font-semibold">
                <span>Tax (0%)</span>
                <span>$0.00</span>
              </div>
              <div className="pt-4 border-t border-muted-foreground/20 flex justify-between items-center">
                <span className="text-xl font-black text-foreground">Total</span>
                <span className="text-3xl font-black text-primary">${subtotal.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
